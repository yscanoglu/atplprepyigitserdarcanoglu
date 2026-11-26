/* ============================================================
   PERFORMANS MODÜLÜ — POH performans chartları
   Kullanıcı girişleri → hesap → chartların üzerine çizim → yazdırılabilir rapor
   Chart verileri: data/<uçak>-perf.js  (registerPerformance)
   ============================================================ */
'use strict';

const PERF = {};
function registerPerformance(id, def) { PERF[id] = def; }

/* ---------- matematik ---------- */
const PM = {
  pv(c, x) { let r = 0; for (const a of c) r = r * x + a; return r; },
  der(c) { const n = c.length - 1; return c.slice(0, -1).map((a, i) => a * (n - i)); },
  // polinom, aralık dışında teğet doğrultusunda devam eder
  cv(c, x, rng) {
    if (!rng || (x >= rng[0] && x <= rng[1])) return this.pv(c, x);
    const e = x < rng[0] ? rng[0] : rng[1];
    return this.pv(c, e) + this.pv(this.der(c), e) * (x - e);
  },
  seg(vals, v) {
    let i = 0;
    if (v <= vals[0]) i = 0; else if (v >= vals[vals.length - 1]) i = vals.length - 2;
    else while (!(v >= vals[i] && v <= vals[i + 1])) i++;
    return { i, f: (v - vals[i]) / (vals[i + 1] - vals[i]) };
  },
  // eğri ailesi: verilen değerin (ör. basınç irtifası) x'teki y'si
  fam(curves, levels, x, v, rngs) {
    const arr = levels.map((lv, k) => ({ lv, y: this.cv(curves[k], x, rngs ? rngs[k] : null) })).sort((a, b) => a.lv - b.lv);
    const { i, f } = this.seg(arr.map(a => a.lv), v);
    return arr[i].y + f * (arr[i + 1].y - arr[i].y);
  },
  // kılavuz çizgilere paralel ilerleme (ağırlık / rüzgar panelleri)
  fanFrac(guides, xref, y) {
    const g = guides.map(c => ({ c, y0: this.pv(c, xref) })).sort((a, b) => a.y0 - b.y0);
    const { i, f } = this.seg(g.map(a => a.y0), y);
    return { a: g[i].c, b: g[i + 1].c, f };
  },
  fanY(fr, x) { const a = this.pv(fr.a, x), b = this.pv(fr.b, x); return a + fr.f * (b - a); },
  interpPts(pts, y) {  // pts [[x,y],...]  → x at y
    const P = pts.slice().sort((p, q) => p[1] - q[1]);
    if (y <= P[0][1]) { const [a, b] = P; return a[0] + (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]); }
    if (y >= P[P.length - 1][1]) { const a = P[P.length - 2], b = P[P.length - 1]; return a[0] + (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]); }
    for (let k = 0; k < P.length - 1; k++) if (y >= P[k][1] && y <= P[k + 1][1]) {
      const a = P[k], b = P[k + 1]; return a[0] + (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]);
    }
  }
};

/* ---------- chart hesapları: değer + çizim yolları ---------- */
const PC = {
  T(C, oat, pa, w, wind) {
    const [, , R, B] = C.frame;
    const x1 = C.oat[0] + C.oat[1] * oat;
    const y1 = PM.fam(C.alt.c, C.alt.lv, x1, pa, C.alt.r);
    const xw = C.w.ref + (C.w.max - w) * C.w.k;
    const fw = PM.fanFrac(C.w.g, C.w.ref, y1);
    const y2 = PM.fanY(fw, xw);
    const wfam = wind >= 0 ? C.wind.head : C.wind.tail;
    const xv = C.wind.ref + Math.abs(wind) * C.wind.k;
    let y3 = y2, windPath = [];
    if (Math.abs(wind) > 0.05) {
      const fv = PM.fanFrac(wfam, C.wind.ref, y2);
      y3 = PM.fanY(fv, xv);
      windPath = sample(C.wind.ref, xv, x => PM.fanY(fv, x));
    }
    const value = (C.y[0] - y3) / C.y[1];
    const paths = [
      [[x1, B], [x1, y1], [C.w.ref, y1], ...sample(C.w.ref, xw, x => PM.fanY(fw, x)), [xw, y2], [C.wind.ref, y2], ...windPath, [R, y3]]
    ];
    const marks = [[[xw, B], [xw, y2]]];
    if (windPath.length) marks.push([[xv, B], [xv, y3]]);
    return { value, paths, marks, end: [R, y3] };
  },
  C(C, oat, pa, w) {
    const B = C.frame[3];
    const x1 = C.oat[0] + C.oat[1] * oat;
    const y1 = PM.fam(C.alt.c, C.alt.lv, x1, pa, C.alt.r);
    const W = C.wl.map(l => ({ w: l[0], x: PM.pv(l[1], y1) })).sort((a, b) => a.w - b.w);
    const { i, f } = PM.seg(W.map(a => a.w), w);
    const x2 = W[i].x + f * (W[i + 1].x - W[i].x);
    const value = (x2 - C.out[0]) / C.out[1];
    return { value, paths: [[[x1, B], [x1, y1], [x2, y1], [x2, B]]], marks: [], end: [x2, B] };
  },
  F(C, oat, pa) {
    const base = C.base;
    const x1 = C.oat[0] + C.oat[1] * oat;
    const curves = [[0, 0, base], ...C.alt.c], lv = [0, ...C.alt.lv], rr = [null, ...(C.alt.r || C.alt.c.map(() => null))];
    let y1 = PM.fam(curves, lv, x1, pa, rr);
    y1 = Math.min(y1, base);
    const out = {}, xs = {};
    for (const k of ['fuel', 'time', 'dist']) { xs[k] = PM.interpPts(C.f[k], y1); out[k] = Math.max(0, (xs[k] - C.out[0]) / C.out[1]); }
    const xmax = Math.max(xs.fuel, xs.time, xs.dist);
    return { value: out, paths: [[[x1, base], [x1, y1], [xmax, y1]]], marks: ['fuel', 'time', 'dist'].map(k => [[xs[k], y1], [xs[k], base]]), end: [xmax, y1] };
  },
  RE(C, pa) {
    const y = C.pa[0] - pa * C.pa[1];
    const xr = PM.interpPts(C.range.pts, y), xe = PM.interpPts(C.endur.pts, y);
    const [L, , , B] = C.frame;
    return {
      value: { range: C.range.v0 + (xr - C.range.x0) / C.range.k, endur: C.endur.v0 + (xe - C.endur.x0) / C.endur.k },
      paths: [[[L, y], [xe, y]]], marks: [[[xr, y], [xr, B]], [[xe, y], [xe, B]]], end: [xe, y]
    };
  },
  W(C, hw, xw) {
    const [ox, oy] = C.o, h = Math.min(Math.abs(hw), C.max), x = Math.min(Math.abs(xw), C.max);
    const px = ox + x * C.kx, py = oy - h * C.ky;
    return { paths: [[[ox, py], [px, py], [px, oy]]], marks: [[[ox, oy], [px, py]]], end: [px, py] };
  }
};
function sample(xa, xb, fy, n = 14) {
  const out = [];
  for (let k = 1; k <= n; k++) { const x = xa + (xb - xa) * k / n; out.push([x, fy(x)]); }
  return out;
}

/* ---------- uçuş hesabı ---------- */
const PERF_KEYS = ['pilotName', 'pilotLic', 'fiName', 'fiLic', 'callsign',
  'pilot', 'fi', 'rear', 'bag', 'fuel',
  'toElev', 'toRwy', 'toWdir', 'toWspd', 'toOat', 'toQnh',
  'ldElev', 'ldRwy', 'ldWdir', 'ldWspd', 'ldOat', 'ldQnh',
  'sortie', 'cruiseAlt'];

function perfDefaults(def) {
  return { callsign: def.defaults.callsign, toElev: def.defaults.elev, ldElev: def.defaults.elev, cruiseAlt: def.defaults.cruiseAlt };
}

function rwyHdg(v) { v = +v; if (!isFinite(v)) return NaN; return v <= 36 ? v * 10 : v; }
function windComp(rwy, wdir, wspd) {
  const h = rwyHdg(rwy); let d = +wdir, s = +wspd || 0;
  if (!isFinite(h) || !isFinite(d)) return { hw: 0, xw: 0, ang: 0, side: '' };
  let a = ((d - h + 540) % 360) - 180;          // -180..180
  const rad = a * Math.PI / 180;
  return { hw: s * Math.cos(rad), xw: Math.abs(s * Math.sin(rad)), ang: Math.abs(a), side: a > 0 ? 'Sağdan' : a < 0 ? 'Soldan' : '' };
}
function atmos(elev, qnh, oat, hpaFt) {
  const pa = (+elev || 0) + (1013 - (+qnh || 1013)) * hpaFt;
  const isa = 15 - 2 * pa / 1000;
  const da = pa + 120 * ((+oat) - isa);
  return { pa, isa, da };
}

function perfCompute(a, v) {
  const def = PERF[a.id], C = def.charts, wb = a.wb, D = def.defaults;
  const n = k => { const x = parseFloat(v[k]); return isFinite(x) ? x : 0; };
  const warn = [];

  // --- ağırlık & denge
  const rows = [{ w: wb.emptyWeight, arm: wb.emptyArm }];
  for (const st of wb.stations) {
    let val = n(st.id); if (st.max != null && val > st.max) { warn.push(`${st.label} max ${st.max} — ${st.max} alındı`); val = st.max; }
    rows.push({ w: st.lbsPerUnit ? val * st.lbsPerUnit : val, arm: st.arm });
  }
  const tow = rows.reduce((s, r) => s + r.w, 0);
  const cg = rows.reduce((s, r) => s + r.w * r.arm, 0) / tow;
  const envW = wb.envelope.map(p => p[1]);
  const limW = Math.min(Math.max(tow, Math.min(...envW)), Math.max(...envW));
  const lim = envelopeLimitsAt(wb.envelope, limW);
  const cgOk = lim && tow <= wb.maxWeight && round1(cg) >= round1(lim.fwd) && round1(cg) <= round1(lim.aft);
  if (tow > wb.maxWeight) warn.push(`Kalkış ağırlığı MTOW'u (${wb.maxWeight} lbs) ${Math.round(tow - wb.maxWeight)} lbs aşıyor`);

  // --- yakıt / iniş ağırlığı
  const sortieH = n('sortie') / 60;
  const burnGal = sortieH * D.gph;
  const fuelGal = n('fuel');
  if (burnGal > fuelGal) warn.push(`Sorti için ${burnGal.toFixed(1)} gal gerekiyor, depoda ${fuelGal} gal var`);
  const lw = tow - burnGal * 6;
  const ldFuel = fuelGal - burnGal;
  const ldCg = (rows.reduce((s, r) => s + r.w * r.arm, 0) - burnGal * 6 * 95.0) / lw;

  // --- atmosfer & rüzgar
  const to = { ...atmos(v.toElev, v.toQnh, n('toOat'), D.hpaFt), oat: n('toOat'), ...windComp(v.toRwy, v.toWdir, v.toWspd) };
  const ld = { ...atmos(v.ldElev, v.ldQnh, n('ldOat'), D.hpaFt), oat: n('ldOat'), ...windComp(v.ldRwy, v.ldWdir, v.ldWspd) };
  const crPa = n('cruiseAlt') || D.cruiseAlt;
  const crOat = to.oat - 2 * (crPa - to.pa) / 1000;   // ISA düşüş oranı (2°C / 1000 ft)
  if (to.xw > 17) warn.push(`Kalkış crosswind ${to.xw.toFixed(0)} kt — max demonstrated 17 kt`);
  if (ld.xw > 17) warn.push(`İniş crosswind ${ld.xw.toFixed(0)} kt — max demonstrated 17 kt`);

  // --- chartlar
  const r = {};
  r.tgr = PC.T(C.tgr, to.oat, to.pa, tow, to.hw);
  r.t50 = PC.T(C.t50, to.oat, to.pa, tow, to.hw);
  r.asd = PC.T(C.asd, to.oat, to.pa, tow, Math.max(-15, Math.min(15, to.hw)));
  r.oei = PC.C(C.oei, to.oat, to.pa, tow);
  r.gd = PC.C(C.gd, to.oat, to.pa, tow);
  r.gu = PC.C(C.gu, to.oat, to.pa, tow);
  const fcA = PC.F(C.fclimb, crOat, crPa), fcB = PC.F(C.fclimb, to.oat, to.pa);
  r.fclimb = { value: sub(fcA.value, fcB.value), parts: [fcA, fcB] };
  r.re = PC.RE(C.re, crPa);
  const fdA = PC.F(C.fdesc, crOat, crPa), fdB = PC.F(C.fdesc, ld.oat, ld.pa);
  r.fdesc = { value: sub(fdA.value, fdB.value), parts: [fdA, fdB] };
  r.lgr = PC.T(C.lgr, ld.oat, ld.pa, lw, ld.hw);
  r.l50 = PC.T(C.l50, ld.oat, ld.pa, lw, ld.hw);
  r.windTo = PC.W(C.wind, to.hw, to.xw);
  r.windLd = PC.W(C.wind, ld.hw, ld.xw);

  // chart sınırları
  const chk = (lbl, oat, pa, paMax) => {
    if (oat < -40 || oat > 50) warn.push(`${lbl}: OAT ${oat}°C chart aralığı dışında`);
    if (pa > paMax) warn.push(`${lbl}: basınç irtifası ${Math.round(pa)} ft chart aralığı dışında`);
  };
  chk('Kalkış', to.oat, to.pa, 8000); chk('İniş', ld.oat, ld.pa, 8000);
  if (to.hw < -10 || ld.hw < -10) warn.push('Tailwind 10 kt üzeri — chartlar sadece 10 kt tailwind gösterir');
  if (Math.abs(to.hw) > 15) warn.push('Accelerate-Stop chartı en fazla 15 kt rüzgar gösterir; 15 kt alındı');

  const oeiClean = r.oei.value;
  return {
    tow, cg, lim, limW, cgOk, lw, ldCg, burnGal, ldFuel, sortieH, to, ld, crPa, crOat, r, warn,
    oeiCfg: { clean: oeiClean, gear010: oeiClean - 250, gear25: oeiClean - 490, gearFull: oeiClean - 525, windmill: oeiClean - 200 }
  };
}
function sub(a, b) { const o = {}; for (const k in a) o[k] = Math.max(0, a[k] - b[k]); return o; }

/* ---------- SVG çizimi ---------- */
const PCOL = { to: '#d90429', ld: '#0057d9', mark: '#d90429' };
function svgChart(C, layers, labels = []) {
  const [x0, y0, w, h] = C.crop;
  const sw = w / 260;          // çizgi kalınlığı (görsel genişliğine oranlı)
  let s = `<svg class="pchart" viewBox="${x0} ${y0} ${w} ${h}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">`;
  s += `<image href="${C.img}" x="${x0}" y="${y0}" width="${w}" height="${h}" preserveAspectRatio="none"/>`;
  for (const L of layers) {
    const col = L.color;
    for (const p of L.paths || []) s += `<polyline points="${p.map(q => q[0].toFixed(1) + ',' + q[1].toFixed(1)).join(' ')}" fill="none" stroke="${col}" stroke-width="${sw}" stroke-dasharray="${sw * 3.2} ${sw * 1.6}" stroke-linejoin="round"/>`;
    for (const m of L.marks || []) s += `<polyline points="${m.map(q => q[0].toFixed(1) + ',' + q[1].toFixed(1)).join(' ')}" fill="none" stroke="${col}" stroke-width="${sw * 0.75}" stroke-dasharray="${sw * 1.2} ${sw * 1.2}"/>`;
    if (L.end) s += `<circle cx="${L.end[0]}" cy="${L.end[1]}" r="${sw * 2.2}" fill="${col}" stroke="#fff" stroke-width="${sw * 0.6}"/>`;
  }
  for (const t of labels) {
    const fs = w / 52, pad = fs * 0.35, tw = t.text.length * fs * 0.58 + pad * 2;
    let x = t.x, y = t.y;
    x = Math.min(Math.max(x, x0 + 4), x0 + w - tw - 4); y = Math.min(Math.max(y, y0 + fs * 1.4), y0 + h - 6);
    s += `<rect x="${x}" y="${y - fs * 1.1}" width="${tw}" height="${fs * 1.45}" rx="${fs * 0.25}" fill="#fff" stroke="${t.color}" stroke-width="${sw * 0.6}"/>`;
    s += `<text x="${x + pad}" y="${y}" font-size="${fs}" font-weight="700" font-family="Arial, Helvetica, sans-serif" fill="${t.color}">${esc(t.text)}</text>`;
  }
  return s + '</svg>';
}

/* ---------- ekranlar ---------- */
let PERF_STATE = null;

function perfLoad(a) {
  const def = PERF[a.id];
  return Object.assign(perfDefaults(def), store('ckp.perf.' + a.id) || {});
}
function perfSave(a, v) { store('ckp.perf.' + a.id, v); }

function perfField(k, label, v, opts = {}) {
  const type = opts.text ? 'text' : 'number';
  return `<div class="cg-group${opts.wide ? ' wide' : ''}">
    <label>${label}</label>
    <input type="${type}" ${type === 'number' ? 'inputmode="decimal"' : ''} data-pf="${k}" placeholder="${esc(opts.ph || '')}" value="${v[k] != null ? esc(v[k]) : ''}">
  </div>`;
}

function renderPerf(view, id) {
  const a = AIRCRAFT.find(x => x.id === id);
  if (!a || !PERF[id]) return go('aircraft');
  activeView = 'perf';
  const v = perfLoad(a);
  PERF_STATE = { a, v };
  const wb = a.wb;
  view.innerHTML = `<section class="view-container view-scroll">
    ${navBar('aircraft/' + a.id, 'Geri', 'PERFORMANS')}

    <div class="cg-card">
      <div class="cg-card-title"><span>👨‍✈️ Uçuş Bilgileri</span><button class="mini-btn" data-act="pfclear">Temizle</button></div>
      <div class="cg-grid">
        ${perfField('pilotName', 'Pilot Adı Soyadı', v, { text: true })}
        ${perfField('pilotLic', 'Pilot Lisans No', v, { text: true })}
        ${perfField('fiName', 'Kontrol / Öğretmen Pilot', v, { text: true })}
        ${perfField('fiLic', 'Kontrol Pilotu Lisans No', v, { text: true })}
        ${perfField('callsign', 'Callsign', v, { text: true })}
        ${perfField('sortie', 'Sorti Süresi (dakika)', v, { ph: 'Örn: 90' })}
      </div>
    </div>

    <div class="cg-card">
      <div class="cg-card-title"><span>⚖️ Ağırlık & Denge</span><span class="pf-note">BEM ${wb.emptyWeight} lbs @ ${fmtArm(wb.emptyArm)}"</span></div>
      <div class="cg-grid">
        ${wb.stations.map(st => perfField(st.id, `${st.label} (${st.unit || 'lbs'}${st.max ? ' - Max ' + st.max : ''})`, v, { ph: st.placeholder, wide: st.wide })).join('')}
      </div>
    </div>

    <div class="cg-card">
      <div class="cg-card-title"><span>🛫 Kalkış</span></div>
      <div class="cg-grid">
        ${perfField('toElev', 'Meydan Elevasyonu (ft)', v)}
        ${perfField('toRwy', 'Pist Yönü (örn: 11 veya 112)', v, { ph: '11' })}
        ${perfField('toWdir', 'Rüzgar Yönü (°)', v, { ph: '090' })}
        ${perfField('toWspd', 'Rüzgar Şiddeti (kt)', v, { ph: '8' })}
        ${perfField('toOat', 'Sıcaklık (°C)', v, { ph: '15' })}
        ${perfField('toQnh', 'QNH (hPa)', v, { ph: '1013' })}
      </div>
    </div>

    <div class="cg-card">
      <div class="cg-card-title"><span>🛬 İniş</span><button class="mini-btn" data-act="pfcopy">Kalkıştan Kopyala</button></div>
      <div class="cg-grid">
        ${perfField('ldElev', 'Meydan Elevasyonu (ft)', v)}
        ${perfField('ldRwy', 'Pist Yönü (örn: 29 veya 292)', v, { ph: '29' })}
        ${perfField('ldWdir', 'Rüzgar Yönü (°)', v, { ph: '090' })}
        ${perfField('ldWspd', 'Rüzgar Şiddeti (kt)', v, { ph: '8' })}
        ${perfField('ldOat', 'Sıcaklık (°C)', v, { ph: '15' })}
        ${perfField('ldQnh', 'QNH (hPa)', v, { ph: '1013' })}
      </div>
    </div>

    <div class="cg-card">
      <div class="cg-card-title"><span>✈️ Seyir</span></div>
      <div class="cg-grid">
        ${perfField('cruiseAlt', 'Seyir İrtifası (ft)', v, { ph: '7500' })}
        <div class="cg-group"><label>Kabuller</label><div class="pf-fixed">%55 güç · ${PERF[id].defaults.gph} gal/h · 1 hPa = ${PERF[id].defaults.hpaFt} ft</div></div>
      </div>
    </div>

    <div class="cg-card" id="pfSummary"></div>

    <button class="reveal-btn pf-report-btn" data-go="aircraft/${a.id}/perf/report">📄 Çizili Raporu Göster</button>
    <div class="footer-disclaimer">Chart okumaları POH grafiklerinden sayısallaştırılmıştır; elle okumaya benzer ±%2-3 fark olabilir. Gerçek operasyon için POH'u esas alın.</div>
  </section>`;
  perfUpdate();
}

function perfReadInputs() {
  const v = PERF_STATE.v;
  document.querySelectorAll('[data-pf]').forEach(i => { v[i.dataset.pf] = i.value; });
  perfSave(PERF_STATE.a, v);
}

const f0 = x => Math.round(x).toString();
const f1 = x => (Math.round(x * 10) / 10).toFixed(1);

function perfUpdate() {
  if (!PERF_STATE) return;
  const { a, v } = PERF_STATE;
  const R = perfCompute(a, v), r = R.r;
  const row = (l, val, cls = '') => `<tr><td>${l}</td><td class="${cls}">${val}</td></tr>`;
  $('pfSummary').innerHTML = `<div class="cg-card-title"><span>📊 Sonuçlar</span><span class="status-pill ${R.cgOk ? 'ok' : 'bad'}">${R.cgOk ? 'W&B LİMİT İÇİ' : 'W&B LİMİT DIŞI'}</span></div>
    ${R.warn.length ? `<div class="pf-warn">${R.warn.map(w => '⚠️ ' + esc(w)).join('<br>')}</div>` : ''}
    <table class="moment-table pf-table">
      ${row('Takeoff Weight', f0(R.tow) + ' lbs', R.tow > a.wb.maxWeight ? 'capped' : '')}
      ${row('CG Position / Limits', `${f1(R.cg)}" · ${f1(R.lim.fwd)}" - ${f1(R.lim.aft)}"`)}
      ${row('Takeoff PA / DA', `${f0(R.to.pa)} / ${f0(R.to.da)} ft`)}
      ${row('Takeoff HW / XW', `${f0(R.to.hw)} / ${f0(R.to.xw)} kt ${R.to.side}`)}
      ${row('Takeoff Ground Roll', f0(r.tgr.value) + ' ft')}
      ${row('Takeoff Distance Over 50 ft', f0(r.t50.value) + ' ft')}
      ${row('Accelerate Stop Distance', f0(r.asd.value) + ' ft')}
      ${row('Gear Up One Engine INOP', f0(r.oei.value) + ' fpm')}
      ${row('Gear Down Dual Engine Climb', f0(r.gd.value) + ' fpm')}
      ${row('Gear Up Dual Engine Climb', f0(r.gu.value) + ' fpm')}
      ${row('Climb (Fuel / Time / Dist)', `${f1(r.fclimb.value.fuel)} gal / ${f1(r.fclimb.value.time)} min / ${f1(r.fclimb.value.dist)} NM`)}
      ${row('Endurance / Range', `${f1(r.re.value.endur)} h / ${f0(r.re.value.range)} NM`)}
      ${row('Descent (Fuel / Time / Dist) — 165 KIAS için', `${f1(r.fdesc.value.fuel)} gal / ${f1(r.fdesc.value.time)} min / ${f1(r.fdesc.value.dist)} NM`)}
      ${row('Landing Weight', `${f0(R.lw)} lbs (−${f1(R.burnGal)} gal)`)}
      ${row('Landing PA / DA', `${f0(R.ld.pa)} / ${f0(R.ld.da)} ft`)}
      ${row('Landing HW / XW', `${f0(R.ld.hw)} / ${f0(R.ld.xw)} kt ${R.ld.side}`)}
      ${row('Landing Ground Roll', f0(r.lgr.value) + ' ft')}
      ${row('Landing Distance Over 50 ft', f0(r.l50.value) + ' ft')}
    </table>`;
}

/* ---------- rapor (yazdırılabilir) ---------- */
function renderPerfReport(view, id) {
  const a = AIRCRAFT.find(x => x.id === id);
  if (!a || !PERF[id]) return go('aircraft');
  activeView = 'perfReport';
  const v = perfLoad(a), def = PERF[id], C = def.charts;
  const R = perfCompute(a, v), r = R.r;
  const TO = PCOL.to, LD = PCOL.ld;
  const L = (x, y, text, color = TO) => ({ x, y, text, color });
  const T1 = (key, res, txt) => svgChart(C[key], [{ color: TO, ...res }], [L(res.end[0] - C[key].crop[2] * 0.16, res.end[1] - 34, txt)]);
  const today = new Date().toLocaleDateString('tr-TR');

  const kv = (k, val) => `<div class="rp-kv"><span>${k}:</span><b>${val}</b></div>`;
  const blk = (...items) => `<div class="rp-blk">${items.join('')}</div>`;

  const climbFig = (key, res) => svgChart(C[key], [
    { color: TO, paths: res.parts[0].paths, marks: res.parts[0].marks, end: res.parts[0].end },
    { color: LD, paths: res.parts[1].paths, marks: res.parts[1].marks, end: res.parts[1].end }
  ]);
  const windFig = svgChart(C.wind, [{ color: TO, ...r.windTo }, { color: LD, ...r.windLd }],
    [L(r.windTo.end[0] + 15, r.windTo.end[1] - 15, 'T/O', TO), L(r.windLd.end[0] + 15, r.windLd.end[1] + 45, 'LDG', LD)]);

  const fc = r.fclimb.value, fd = r.fdesc.value;
  const fig = (svg, cap) => `<figure class="rp-fig">${svg}<figcaption>${cap}</figcaption></figure>`;

  view.innerHTML = `<section class="view-container view-scroll rp-wrap">
    <div class="rp-toolbar no-print">
      ${navBar('aircraft/' + a.id + '/perf', 'Geri', 'PERFORMANS RAPORU', '<button class="mini-btn" data-act="pfprint">🖨️ Yazdır / PDF</button>')}
      ${R.warn.length ? `<div class="pf-warn">${R.warn.map(w => '⚠️ ' + esc(w)).join('<br>')}</div>` : ''}
      <div class="pf-legend"><span style="color:${TO}">━ ━</span> Kalkış / Seyir &nbsp; <span style="color:${LD}">━ ━</span> İniş / Meydan</div>
    </div>

    <div class="rp-page rp-form">
      <div class="rp-head">
        <div class="rp-title">VİZYON HAVACILIK<br>PERFORMANS CHARTLARI VE HESAPLAMALARI</div>
        <div class="rp-meta">
          <div>${kv('Pilot Adı ve Soyadı', esc(v.pilotName || ''))}${kv('Pilot Lisans Numarası', esc(v.pilotLic || ''))}</div>
          <div>${kv('Kontrol Pilotu / Öğretmen Pilot Adı ve Soyadı', esc(v.fiName || ''))}${kv('Kontrol Pilotu / Öğretmen Pilot Lisans Numarası', esc(v.fiLic || ''))}</div>
          <div>${kv('Aircraft Type', 'Piper PA 44-180')}${kv('Callsign', esc(v.callsign || ''))}${kv('Tarih', today)}</div>
        </div>
      </div>
      <div class="rp-grid">
        <div>
          ${blk(kv('Takeoff Weight', f0(R.tow) + ' lbs'), kv('Takeoff Ground Roll', f0(r.tgr.value) + ' ft'), kv('Takeoff Distance Over 50ft', f0(r.t50.value) + ' ft'), kv('Accelerate Stop Distance', f0(r.asd.value) + ' ft'))}
          ${blk(kv('Takeoff Wind', `${esc(v.toWdir || '—')}° / ${esc(v.toWspd || 0)} kt (RWY ${esc(v.toRwy || '—')})`), kv('Takeoff Head Wind', f0(R.to.hw) + ' kt'), kv('Takeoff Cross Wind', f0(R.to.xw) + ' kt ' + R.to.side))}
          ${blk(kv('Takeoff Temp', f0(R.to.oat) + ' °C'), kv('Takeoff Pressure Altitude', f0(R.to.pa) + ' ft'), kv('Takeoff Density Altitude', f0(R.to.da) + ' ft'))}
          ${blk(kv('Gear Up One Engine INOP FPM', f0(r.oei.value)), kv('Gear Down Duel Engine Climb FPM', f0(r.gd.value)), kv('Gear Up Duel Engine Climb FPM', f0(r.gu.value)))}
        </div>
        <div>
          ${blk(kv('Fuel for Climb', f1(fc.fuel) + ' gal'), kv('Time for Climb', f1(fc.time) + ' min'), kv('Distance for Climb', f1(fc.dist) + ' NM'))}
          ${blk(kv('Endurance Hours', f1(r.re.value.endur) + ' h'), kv('Range NM', f0(r.re.value.range) + ' NM'))}
          ${blk(kv('Fuel for Descent', f1(fd.fuel) + ' gal'), kv('Time for Descent', f1(fd.time) + ' min'), kv('Distance for Descent', f1(fd.dist) + ' NM'))}
          ${blk(kv('Landing Weight', f0(R.lw) + ' lbs'), kv('Landing Ground Roll', f0(r.lgr.value) + ' ft'), kv('Landing Distance Over 50ft', f0(r.l50.value) + ' ft'))}
        </div>
        <div>
          ${blk(kv('Landing Wind', `${esc(v.ldWdir || '—')}° / ${esc(v.ldWspd || 0)} kt (RWY ${esc(v.ldRwy || '—')})`), kv('Landing Head Wind', f0(R.ld.hw) + ' kt'), kv('Landing Cross Wind', f0(R.ld.xw) + ' kt ' + R.ld.side))}
          ${blk(kv('Landing Temp', f0(R.ld.oat) + ' °C'), kv('Landing Pressure Altitude', f0(R.ld.pa) + ' ft'), kv('Landing Density Altitude', f0(R.ld.da) + ' ft'))}
          ${blk(kv('CG Limits', `${f1(R.lim.fwd)}" - ${f1(R.lim.aft)}"`), kv('CG Position', `${f1(R.cg)}" ${R.cgOk ? '✓' : '✗'}`))}
          ${blk(kv('QNH', `T/O ${esc(v.toQnh || '—')} / LDG ${esc(v.ldQnh || '—')} hPa`))}
        </div>
      </div>
      <div class="rp-foot">Seyir: ${f0(R.crPa)} ft, OAT ${f0(R.crOat)} °C (ISA düşüşü) · %55 güç · Sorti ${esc(v.sortie || 0)} dk × ${def.defaults.gph} gal/h = ${f1(R.burnGal)} gal · 1 hPa = ${def.defaults.hpaFt} ft · DA = PA + 120 × (OAT − ISA)</div>
    </div>

    <div class="rp-page rp-charts">
      ${fig(T1('tgr', r.tgr, f0(r.tgr.value) + ' ft'), `Takeoff Ground Roll: <b>${f0(r.tgr.value)} ft</b>`)}
      ${fig(T1('asd', r.asd, f0(r.asd.value) + ' ft'), `Accelerate Stop Distance: <b>${f0(r.asd.value)} ft</b>`)}
      ${fig(T1('t50', r.t50, f0(r.t50.value) + ' ft'), `Takeoff Distance Over 50ft: <b>${f0(r.t50.value)} ft</b>`)}
      ${fig(svgChart(C.oei, [{ color: TO, ...r.oei }], [L(r.oei.end[0] + 10, r.oei.end[1] - 60, f0(r.oei.value) + ' fpm')]),
        `Clean Configuration One Engine INOP FPM: <b>${f0(R.oeiCfg.clean)}</b><br>L.G. DOWN + 0/10 Flap: <b>${f0(R.oeiCfg.gear010)}</b> · + 25 Flap: <b>${f0(R.oeiCfg.gear25)}</b> · + Full Flap: <b>${f0(R.oeiCfg.gearFull)}</b> · Windmilling: <b>${f0(R.oeiCfg.windmill)}</b> FPM`)}
    </div>

    <div class="rp-page rp-charts">
      ${fig(svgChart(C.gd, [{ color: TO, ...r.gd }], [L(r.gd.end[0] + 10, r.gd.end[1] - 60, f0(r.gd.value) + ' fpm')]), `Gear Down Duel Engine Climb FPM: <b>${f0(r.gd.value)}</b>`)}
      ${fig(climbFig('fclimb', r.fclimb), `Fuel for Climb: <b>${f1(fc.fuel)} gal</b> · Time for Climb: <b>${f1(fc.time)} min</b> · Distance for Climb: <b>${f1(fc.dist)} NM</b>`)}
      ${fig(svgChart(C.gu, [{ color: TO, ...r.gu }], [L(r.gu.end[0] + 10, r.gu.end[1] - 60, f0(r.gu.value) + ' fpm')]), `Gear Up Duel Engine Climb FPM: <b>${f0(r.gu.value)}</b>`)}
      ${fig(svgChart(C.re, [{ color: TO, ...r.re }]), `Endurance Hours: <b>${f1(r.re.value.endur)}</b> · Range NM: <b>${f0(r.re.value.range)}</b> (%55 güç, ${f0(R.crPa)} ft)`)}
    </div>

    <div class="rp-page rp-charts">
      ${fig(climbFig('fdesc', r.fdesc), `Fuel for Descent: <b>${f1(fd.fuel)} gal</b> · Time for Descent: <b>${f1(fd.time)} min</b> · Distance for Descent: <b>${f1(fd.dist)} NM</b> <span style="font-size:0.8em">(POH: 165 KIAS, 500 fpm için)</span>`)}
      ${fig(svgChart(C.lgr, [{ color: LD, ...r.lgr }], [L(r.lgr.end[0] - C.lgr.crop[2] * 0.16, r.lgr.end[1] - 34, f0(r.lgr.value) + ' ft', LD)]), `Landing Ground Roll: <b>${f0(r.lgr.value)} ft</b>`)}
      ${fig(windFig, `<span style="color:${TO}">Takeoff</span> HW <b>${f0(R.to.hw)}</b> / XW <b>${f0(R.to.xw)}</b> kt · <span style="color:${LD}">Landing</span> HW <b>${f0(R.ld.hw)}</b> / XW <b>${f0(R.ld.xw)}</b> kt`)}
      ${fig(svgChart(C.l50, [{ color: LD, ...r.l50 }], [L(r.l50.end[0] - C.l50.crop[2] * 0.16, r.l50.end[1] - 34, f0(r.l50.value) + ' ft', LD)]), `Landing Distance Over 50ft: <b>${f0(r.l50.value)} ft</b>`)}
    </div>
  </section>`;
}

/* ---------- olaylar ---------- */
let perfTimer;
document.addEventListener('input', e => {
  if (e.target.matches('[data-pf]')) { perfReadInputs(); clearTimeout(perfTimer); perfTimer = setTimeout(perfUpdate, 150); }
});
document.addEventListener('click', e => {
  const act = e.target.closest('[data-act]');
  if (!act || !PERF_STATE) return;
  const k = act.dataset.act;
  if (k === 'pfprint') { window.print(); }
  if (k === 'pfcopy') {
    const v = PERF_STATE.v;
    for (const f of ['Elev', 'Rwy', 'Wdir', 'Wspd', 'Oat', 'Qnh']) v['ld' + f] = v['to' + f];
    perfSave(PERF_STATE.a, v); renderPerf($('view'), PERF_STATE.a.id);
  }
  if (k === 'pfclear') {
    if (!confirm('Bütün performans girişleri silinsin mi? (İsimler ve callsign kalır)')) return;
    const v = PERF_STATE.v, keep = ['pilotName', 'pilotLic', 'fiName', 'fiLic', 'callsign'];
    const nv = perfDefaults(PERF[PERF_STATE.a.id]); keep.forEach(k2 => nv[k2] = v[k2]);
    perfSave(PERF_STATE.a, nv); renderPerf($('view'), PERF_STATE.a.id);
  }
});
