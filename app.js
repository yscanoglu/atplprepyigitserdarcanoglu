/* ============================================================
   CHECKRIDE & INTERVIEW PREPARATION — UYGULAMA MOTORU
   İçerik (kartlar, uçaklar, W&B verisi) data/ klasöründe.
   ============================================================ */
'use strict';

const APP_VERSION = 'v0.6';

/* ---------- VERİ KAYDI (data/*.js dosyaları bunları çağırır) ---------- */
const AIRCRAFT = [];
const THEORY = { decks: [], comingSoon: [] };
const DECKS = {}; // key -> { ...deck, parentRoute, cards(normalized) }

function registerAircraft(a) { AIRCRAFT.push(a); }
function registerTheory(t) {
  THEORY.decks.push(...(t.decks || []));
  THEORY.comingSoon.push(...(t.comingSoon || []));
}

/* Kartları içeride kullanılacak hale getir: numaraları otomatik ver */
function normalizeDeck(deck, parentRoute, parentLabel) {
  const seen = new Set();
  const cards = deck.cards.map(c => {
    let n = 0;
    // Aynı başlık destede iki kez geçiyorsa (ör. CAS: Warning + Caution) ilerleme ayrı tutulsun
    let key = c.title;
    if (seen.has(key)) key = c.title + '|' + (c.category || seen.size);
    seen.add(key);
    return {
      key,
      title: c.title,
      keepGroups: !!c.keepGroups,
      category: c.category || null,
      notes: c.notes || [],
      groups: c.groups.map(g => {
        if (g.restart) n = 0; // basılı checklistteki gibi numara 1'den yeniden başlar
        return {
          header: g.header || '',
          mask: g.mask || g.header || '',
          items: g.items.map(it => typeof it === 'string'
            ? { text: it, n: ++n }
            : { label: it.label, val: it.val, sub: it.sub, mask: it.mask })
        };
      })
    };
  });
  DECKS[deck.key] = { ...deck, cards, parentRoute, parentLabel };
}

/* ---------- YARDIMCILAR ---------- */
const $ = id => document.getElementById(id);
const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const round1 = x => Math.round(x * 10) / 10;
const fmt1 = x => round1(x).toFixed(1);
const fmtW = x => (Math.round(x * 10) / 10).toString();
const fmtArm = x => (Math.round(x * 100) / 100).toString();
const fmtAxis = x => (Number.isInteger(x) ? String(x) : x.toFixed(1));

function store(key, val) {
  try {
    if (val === undefined) return JSON.parse(localStorage.getItem(key));
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) { return null; }
}

let toastTimer;
function toast(msg) {
  const t = $('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 1800);
}

/* ---------- İLERLEME (Bildim / Bilemedim) ---------- */
const Progress = {
  KEY: 'ckp.progress.v1',
  data: {},
  load() { this.data = store(this.KEY) || {}; },
  save() { store(this.KEY, this.data); },
  id(deckKey, title) { return deckKey + '|' + title; },
  get(deckKey, title) { return this.data[this.id(deckKey, title)] || null; },
  set(deckKey, title, s) { this.data[this.id(deckKey, title)] = s; this.save(); },
  summary(deckKey) {
    const deck = DECKS[deckKey];
    let known = 0, weak = 0;
    deck.cards.forEach(c => {
      const s = this.get(deckKey, c.key);
      if (s === 'known') known++; else if (s === 'weak') weak++;
    });
    return { known, weak, total: deck.cards.length };
  },
  reset(deckKey) {
    Object.keys(this.data).forEach(k => { if (k.startsWith(deckKey + '|')) delete this.data[k]; });
    this.save();
  }
};

/* ---------- YÖNLENDİRME (telefonun geri tuşu da çalışır) ---------- */
function go(route) { location.hash = '#/' + route; }
function currentRoute() { return location.hash.replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent); }

let activeView = '';
function render() {
  const r = currentRoute();
  const view = $('view');
  activeView = '';
  $('toast').classList.remove('show');
  if (r[0] === 'aircraft' && r[1] && r[2] === 'wb') return renderWB(view, r[1]);
  if (r[0] === 'aircraft' && r[1]) return renderAircraftDash(view, r[1]);
  if (r[0] === 'aircraft') return renderAircraftList(view);
  if (r[0] === 'theory') return renderTheory(view);
  if (r[0] === 'deck' && DECKS[r[1]]) return renderDrill(view, r[1]);
  if (r[0] === 'soon') return renderSoon(view, +r[1]);
  renderRoot(view);
}

/* ---------- MENÜ PARÇALARI ---------- */
function navBar(backRoute, backLabel, title, rightHTML = '') {
  return `<div class="nav-top-bar">
    <button class="nav-back-btn" data-go="${esc(backRoute)}">❮ ${esc(backLabel)}</button>
    <div class="current-nav-title">${esc(title)}</div>
    <div class="nav-right">${rightHTML}</div>
  </div>`;
}

function menuCard({ icon, title, badge, route, sub = '', soon = false }) {
  return `<div class="menu-card" data-go="${esc(route)}">
    <div class="menu-card-left">
      <div class="menu-card-icon">${icon}</div>
      <div class="menu-card-text"><h3>${esc(title)}</h3>${sub ? `<div class="menu-card-sub">${sub}</div>` : ''}</div>
    </div>
    <div class="menu-card-badge${soon ? ' soon' : ''}">${esc(badge)}</div>
  </div>`;
}

function deckMenuCard(deckKey) {
  const d = DECKS[deckKey];
  const p = Progress.summary(deckKey);
  let sub = '';
  if (p.known || p.weak) {
    sub = `<span class="ok">✓ ${p.known} bildim</span>${p.weak ? ` · <span class="bad">✗ ${p.weak} tekrar</span>` : ''}`;
  }
  return menuCard({ icon: d.icon, title: d.menuTitle, badge: `${d.cards.length} ${d.unit} ❯`, route: 'deck/' + deckKey, sub });
}

function footer(text, withVersion = false) {
  return `<div class="footer-disclaimer">${esc(text)}${withVersion ? `<span class="version-tag">${APP_VERSION}</span>` : ''}</div>`;
}

/* ---------- EKRANLAR ---------- */
function renderRoot(view) {
  const aircraftCount = AIRCRAFT.length;
  view.innerHTML = `<main class="view-container">
    <div class="main-header">
      <div class="main-title">Checkride &amp; Interview Preparation</div>
      <div class="main-sub">Created by Yiğit Serdar Canoğlu TR.FCL.A. 25544</div>
    </div>
    <div class="menu-grid">
      ${menuCard({ icon: '✈️', title: 'Aircrafts', badge: `${aircraftCount} Uçak ❯`, route: 'aircraft' })}
      ${menuCard({ icon: '📚', title: 'General Aviation Knowledge', badge: 'Teori ❯', route: 'theory' })}
    </div>
    ${footer('Prepared for personal study. For actual operations, consult your flight instructor and your school. This is not an official document.', true)}
  </main>`;
}

function renderAircraftList(view) {
  view.innerHTML = `<section class="view-container">
    ${navBar('', 'Ana Menü', 'AIRCRAFTS')}
    <div class="menu-grid">
      ${AIRCRAFT.map(a => menuCard({
        icon: a.icon, title: a.name,
        badge: `${a.decks.length + (a.wb ? 1 : 0)} Modül ❯`,
        route: 'aircraft/' + a.id
      })).join('')}
    </div>
    ${footer('Fleet Preparation')}
  </section>`;
}

function renderAircraftDash(view, id) {
  const a = AIRCRAFT.find(x => x.id === id);
  if (!a) return go('aircraft');
  view.innerHTML = `<section class="view-container">
    ${navBar('aircraft', 'Uçaklar', a.name)}
    <div class="menu-grid">
      ${a.decks.map(d => deckMenuCard(d.key)).join('')}
      ${a.wb ? menuCard({ icon: '⚖️', title: 'Center of Gravity', badge: 'W&B Zarfı ❯', route: `aircraft/${a.id}/wb` }) : ''}
    </div>
    ${footer(a.footer || a.name)}
  </section>`;
}

function renderTheory(view) {
  view.innerHTML = `<section class="view-container">
    ${navBar('', 'Ana Menü', 'GENERAL AVIATION KNOWLEDGE')}
    <div class="menu-grid">
      ${THEORY.decks.map(d => deckMenuCard(d.key)).join('')}
      ${THEORY.comingSoon.map((s, i) => menuCard({ icon: s.icon, title: s.title, badge: 'Yapım Aşamasında', route: 'soon/' + i, soon: true })).join('')}
    </div>
    ${footer('Theoretical Knowledge, Formulas and Weather Systems')}
  </section>`;
}

function renderSoon(view, i) {
  const s = THEORY.comingSoon[i];
  if (!s) return go('theory');
  view.innerHTML = `<section class="view-container">
    ${navBar('theory', 'Teori', s.title.toUpperCase())}
    <div class="wip-box">
      <div class="wip-icon">🚧</div>
      <div class="wip-title">${esc(s.title)} (Yapım Aşamasında)</div>
      <div class="wip-desc">Bu modülün içerikleri ve interaktif çalışma kartları hazırlanmaktadır. Çok yakında burada aktif olacaktır.</div>
    </div>
    ${footer('Checkride & Interview Preparation Suite')}
  </section>`;
}

/* ============================================================
   FLASHCARD DRILL
   ============================================================ */
const S = {
  deckKey: null, deck: null, filter: 'ALL',
  list: [], order: [], pos: 0, revealed: false,
  shuffle: store('ckp.shuffle') !== false
};

function renderDrill(view, deckKey) {
  activeView = 'drill';
  S.deckKey = deckKey;
  S.deck = DECKS[deckKey];
  S.filter = 'ALL';

  view.innerHTML = `<section class="view-container">
    ${navBar(S.deck.parentRoute, 'Geri', S.deck.name.toUpperCase())}
    <div class="filter-bar"><div class="filter-group" id="filterGroup"></div></div>
    <main class="card" id="cardArea">
      <div class="card-meta">
        <div class="meta-left"><span id="typeBadge" class="type-badge"></span><span id="markBadge" class="mark-badge"></span></div>
        <div class="meta-right"><span id="cadenceCount" class="count-badge"></span><span id="itemCount" class="count-badge"></span></div>
      </div>
      <div id="cardTitle" class="title"></div>
      <div id="contentArea" class="items-container"></div>
      <div id="notesContainer"></div>
    </main>
    <footer class="bottom-dock">
      <div id="answerRow"></div>
      <section class="nav-controls">
        <button class="nav-btn" data-act="prev">← Geri</button>
        <button id="shuffleBtn" class="nav-btn shuffle" data-act="shuffle"></button>
        <button class="nav-btn next-btn" data-act="next">İleri →</button>
      </section>
      <div class="status-text"><span id="statusIndicator"></span><span id="deckSummary"></span><button class="link-btn" data-act="reset">↺ Sıfırla</button></div>
    </footer>
  </section>`;

  updateShuffleBtn();
  applyFilter();
}

function renderFilters() {
  const weakCount = S.deck.cards.filter(c => Progress.get(S.deckKey, c.key) === 'weak').length;
  const filters = [{ id: 'ALL', label: 'Tümü' }, ...(S.deck.filters || []), { id: 'WEAK', label: `✗ Tekrar (${weakCount})`, cls: 'weak' }];
  $('filterGroup').innerHTML = filters.map(f =>
    `<button class="filter-btn ${f.cls || ''} ${S.filter === f.id ? 'active' : ''}" data-filter="${esc(f.id)}">${esc(f.label)}</button>`
  ).join('');
}

function applyFilter() {
  const all = S.deck.cards;
  if (S.filter === 'ALL') S.list = all.slice();
  else if (S.filter === 'WEAK') S.list = all.filter(c => Progress.get(S.deckKey, c.key) === 'weak');
  else S.list = all.filter(c => c.category === S.filter);
  S.order = buildOrder();
  S.pos = 0;
  renderFilters();
  renderCard();
}

function buildOrder(firstIdx) {
  const idx = S.list.map((_, i) => i);
  if (S.shuffle) {
    for (let i = idx.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [idx[i], idx[j]] = [idx[j], idx[i]];
    }
  }
  if (firstIdx !== undefined) {
    if (S.shuffle) { idx.splice(idx.indexOf(firstIdx), 1); idx.unshift(firstIdx); }
    else return idx.slice(firstIdx).concat(idx.slice(0, firstIdx));
  }
  return idx;
}

function currentCard() { return S.list[S.order[S.pos]]; }

function splitGroupsForColumns(card) {
  const total = card.groups.reduce((a, g) => a + g.items.length, 0);
  if (total <= 6) return { isTwoColumn: false, left: card.groups, right: [] };
  const half = Math.ceil(total / 2);
  const left = [], right = [];
  let count = 0;
  for (const g of card.groups) {
    if (count >= half) { right.push(g); count += g.items.length; }
    else if (count + g.items.length <= half) { left.push(g); count += g.items.length; }
    else {
      const take = half - count;
      if (!card.keepGroups && ((count === 0 && g.items.length > half) || (take >= 2 && g.items.length - take >= 2))) {
        left.push({ ...g, items: g.items.slice(0, take) });
        right.push({ header: '', mask: '', items: g.items.slice(take) });
        count += take;
      } else if (Math.abs(count + g.items.length - half) <= Math.abs(count - half)) { left.push(g); count += g.items.length; }
      else { right.push(g); count += g.items.length; }
    }
  }
  return { isTwoColumn: true, left, right };
}

function groupHTML(g, masked) {
  const head = masked ? g.mask : g.header;
  return `<div class="group-block">
    ${head ? `<div class="condition-header">${esc(head)}</div>` : ''}
    ${g.items.map(it => {
      const num = it.n ? `<span class="item-num">${it.n}-</span>` : '';
      const label = it.label ? `<span class="item-label">${esc(it.label)}</span>` : '';
      const content = masked
        ? `<span class="item-masked">${esc(it.mask || '…')}</span>`
        : `<span class="item-content">${esc(it.text !== undefined ? it.text : it.val)}</span>`;
      const sub = (it.sub && !masked) ? `<span class="item-subtext">${esc(it.sub)}</span>` : '';
      return `<div class="item-row">${num}${label}${content}${sub}</div>`;
    }).join('')}
  </div>`;
}

function contentHTML(card, masked) {
  const { isTwoColumn, left, right } = splitGroupsForColumns(card);
  const div = '<div class="stage-divider"><span>*</span></div>';
  const col = gs => gs.map(g => groupHTML(g, masked)).join(div);
  return isTwoColumn
    ? `<div class="two-column-layout"><div class="grid-col">${col(left)}</div><div class="grid-col">${col(right)}</div></div>`
    : `<div class="single-column-layout">${col(left)}</div>`;
}

function renderCard() {
  S.revealed = false;
  const card = currentCard();
  const content = $('contentArea');
  const sum = Progress.summary(S.deckKey);
  $('deckSummary').innerHTML = `<span class="ok">✓${sum.known}</span> <span class="bad">✗${sum.weak}</span>`;

  if (!card) {
    $('typeBadge').textContent = S.deck.name.toUpperCase();
    $('typeBadge').className = 'type-badge';
    $('markBadge').textContent = ''; $('markBadge').className = 'mark-badge';
    $('cadenceCount').textContent = ''; $('itemCount').textContent = '';
    $('cardTitle').textContent = '';
    content.innerHTML = `<div class="empty-state">${S.filter === 'WEAK' ? 'Bilemediğin kart kalmadı 👏<br>“Tümü” sekmesinden devam edebilirsin.' : 'Bu filtrede kart yok.'}</div>`;
    $('notesContainer').innerHTML = '';
    $('answerRow').innerHTML = `<button class="reveal-btn" disabled>Cevabı Gör</button>`;
    $('statusIndicator').textContent = `0 / 0 ${S.deck.unit}`;
    return;
  }

  const badge = $('typeBadge');
  if (card.category) { badge.textContent = card.category; badge.className = 'type-badge ' + card.category.toLowerCase(); }
  else { badge.textContent = S.deck.name.toUpperCase(); badge.className = 'type-badge'; }

  const mark = Progress.get(S.deckKey, card.key);
  const mb = $('markBadge');
  mb.className = 'mark-badge ' + (mark || '');
  mb.textContent = mark === 'known' ? '✓ Biliniyor' : mark === 'weak' ? '✗ Tekrar' : '';

  const totalItems = card.groups.reduce((a, g) => a + g.items.length, 0);
  $('cadenceCount').textContent = `${card.groups.length} Kademe`;
  $('itemCount').textContent = `${totalItems} Madde`;
  $('cardTitle').textContent = card.title;
  content.classList.toggle('compact-mode', totalItems >= 12);
  content.innerHTML = contentHTML(card, true);
  content.scrollTop = 0;

  $('notesContainer').innerHTML = card.notes.length
    ? `<div class="notes-box masked">${card.notes.map((_, i) => `<div>⚠️ <b>NOT${card.notes.length > 1 ? ' ' + (i + 1) : ''}:</b> …</div>`).join('')}</div>`
    : '';

  $('answerRow').innerHTML = `<button class="reveal-btn" data-act="reveal">Cevabı Gör</button>`;
  $('statusIndicator').textContent = `${S.pos + 1} / ${S.order.length} ${S.deck.unit}`;
}

function reveal() {
  const card = currentCard();
  if (!card) return;
  if (S.revealed) return renderCard();
  S.revealed = true;
  $('contentArea').innerHTML = contentHTML(card, false);
  $('notesContainer').innerHTML = card.notes.length
    ? `<div class="notes-box revealed">${card.notes.map(n => `<div>⚠️ <b>${esc(n)}</b></div>`).join('')}</div>`
    : '';
  $('answerRow').innerHTML = `<div class="grade-row">
    <button class="grade-btn weak" data-act="weak">✗ Bilemedim</button>
    <button class="grade-btn hide" data-act="reveal" aria-label="Gizle">🙈</button>
    <button class="grade-btn known" data-act="known">✓ Bildim</button>
  </div>`;
}

function nextCard() {
  if (!S.order.length) return;
  S.pos++;
  if (S.pos >= S.order.length) {
    const last = S.order[S.order.length - 1];
    S.order = buildOrder();
    if (S.shuffle && S.order.length > 1 && S.order[0] === last) [S.order[0], S.order[1]] = [S.order[1], S.order[0]];
    S.pos = 0;
    toast(S.shuffle ? 'Tur tamamlandı 🔁 Yeniden karıştırıldı' : 'Tur tamamlandı 🔁 Başa dönüldü');
  }
  renderCard();
}

function prevCard() {
  if (S.pos > 0) { S.pos--; renderCard(); }
  else toast('Turun başındasın');
}

function grade(state) {
  const card = currentCard();
  if (!card) return;
  Progress.set(S.deckKey, card.key, state);
  if (state === 'weak' && S.order.length > 1) {
    // Bilemediğin kart birkaç kart sonra tekrar gelir
    const at = Math.min(S.pos + 4, S.order.length);
    S.order.splice(at, 0, S.order[S.pos]);
  }
  renderFilters();
  nextCard();
}

function updateShuffleBtn() {
  const b = $('shuffleBtn');
  if (!b) return;
  b.className = 'nav-btn shuffle ' + (S.shuffle ? 'active' : 'inactive');
  b.textContent = S.shuffle ? '🔀 Karışık: AÇIK' : '➡️ Sıralı: AÇIK';
}

function toggleShuffle() {
  S.shuffle = !S.shuffle;
  store('ckp.shuffle', S.shuffle);
  const cur = S.order[S.pos];
  S.order = buildOrder(cur);
  S.pos = 0;
  updateShuffleBtn();
  renderCard();
}

function resetDeck() {
  if (!confirm(`"${S.deck.menuTitle}" destesindeki Bildim/Bilemedim işaretleri silinsin mi?`)) return;
  Progress.reset(S.deckKey);
  S.filter = 'ALL';
  applyFilter();
  toast('İlerleme sıfırlandı');
}

/* ============================================================
   AĞIRLIK & DENGE (W&B) — her uçak kendi wb verisini getirir
   ============================================================ */
let WB = null; // { a, cfg }

function renderWB(view, id) {
  const a = AIRCRAFT.find(x => x.id === id);
  if (!a || !a.wb) return go('aircraft');
  activeView = 'wb';
  const cfg = a.wb;
  WB = { a, cfg };
  const saved = store('ckp.wb.' + a.id) || {};

  view.innerHTML = `<section class="view-container view-scroll">
    ${navBar('aircraft/' + a.id, 'Geri', 'WEIGHT & BALANCE')}

    <div class="cg-card">
      <div class="cg-card-title"><span>⚖️ Ağırlık Girişleri</span><button class="mini-btn" data-act="wbclear">Temizle</button></div>
      <div class="cg-grid">
        <div class="cg-group">
          <label>${esc(cfg.emptyLabel)} (lbs)</label>
          <input type="text" value="${cfg.emptyWeight} lbs" disabled>
        </div>
        <div class="cg-group">
          <label>${esc(cfg.emptyLabel)} Kolu (inç)</label>
          <input type="text" value="${cfg.emptyArm != null ? fmtArm(cfg.emptyArm) + '&quot;' : '—'}" disabled>
        </div>
        ${cfg.stations.map(st => `<div class="cg-group${st.wide ? ' wide' : ''}">
          <label>${esc(st.label)} (${st.unit ? esc(st.unit) : 'lbs'}${st.max ? ' - Max ' + st.max : ''}) [${fmt1(st.arm)}"${st.lbsPerUnit ? ' · ' + st.lbsPerUnit + ' lbs/' + esc(st.unit) : ''}]</label>
          <input type="number" inputmode="decimal" min="0" data-st="${esc(st.id)}" placeholder="${esc(st.placeholder || '0')}" value="${saved[st.id] != null ? esc(saved[st.id]) : ''}">
        </div>`).join('')}
      </div>
    </div>

    <div class="cg-result-bar">
      <div class="cg-res-item"><span class="cg-res-label">KALKIŞ AĞIRLIĞI</span><span class="cg-res-val" id="wbTow"></span></div>
      <div class="cg-res-item"><span class="cg-res-label">C.G. KONUMU</span><span class="cg-res-val" id="wbCg"></span></div>
      <div class="cg-res-item"><span class="cg-res-label">ÖN / ARKA LİMİT</span><span class="cg-res-val" id="wbLimits"></span></div>
    </div>

    <div class="cg-card">
      <div class="cg-card-title"><span>C.G. Zarfı (Envelope)</span><span id="wbStatus" class="status-pill"></span></div>
      <div class="chart-container-box" id="wbChart"></div>
      <div class="cg-legend-box" id="wbLegend"></div>
    </div>

    <div class="cg-card">
      <div class="cg-card-title"><span>📊 Moment Tablosu</span></div>
      <table class="moment-table" id="wbTable"></table>
    </div>
  </section>`;

  runWB();
}

/* Zarfın verilen ağırlıktaki ön ve arka C.G. limitleri */
function envelopeLimitsAt(env, w) {
  const xs = [];
  for (let i = 0; i < env.length; i++) {
    const [x1, y1] = env[i], [x2, y2] = env[(i + 1) % env.length];
    if (w < Math.min(y1, y2) || w > Math.max(y1, y2)) continue;
    if (y1 === y2) xs.push(x1, x2);
    else xs.push(x1 + (x2 - x1) * (w - y1) / (y2 - y1));
  }
  return xs.length ? { fwd: Math.min(...xs), aft: Math.max(...xs) } : null;
}

function runWB() {
  if (!WB) return;
  const { a, cfg } = WB;
  const saved = {};
  const bemW = cfg.emptyWeight;
  const bemArm = cfg.emptyArm != null ? cfg.emptyArm : null;
  const rows = [{ label: cfg.emptyLabel, w: bemW, arm: bemArm }];

  document.querySelectorAll('[data-st]').forEach(inp => {
    const st = cfg.stations.find(s => s.id === inp.dataset.st);
    let v = parseFloat(inp.value);
    if (inp.value !== '') saved[st.id] = inp.value;
    if (!isFinite(v) || v < 0) v = 0;
    const over = st.max != null && v > st.max;
    inp.classList.toggle('over', over);
    if (over) v = st.max;
    const w = st.lbsPerUnit ? v * st.lbsPerUnit : v;
    rows.push({ label: st.label + (st.unit ? ` (${fmtW(v)} ${st.unit})` : ''), w, arm: st.arm, capped: over });
  });
  store('ckp.wb.' + a.id, saved);

  const total = rows.reduce((s, r) => s + r.w, 0);
  const noArm = bemArm == null;
  const moment = noArm ? NaN : rows.reduce((s, r) => s + r.w * r.arm, 0);
  const cg = moment / total;
  // Ön limit ağırlığa göre değişir (POH: noktalar arası doğrusal). Ağırlık zarfın dışındaysa
  // (ör. MTOW aşımı) en yakın zarf ağırlığındaki limit gösterilir.
  const envW = cfg.envelope.map(p => p[1]);
  const limW = Math.min(Math.max(total, Math.min(...envW)), Math.max(...envW));
  const lim = envelopeLimitsAt(cfg.envelope, limW);
  const cgR = round1(cg);
  const weightOk = total <= cfg.maxWeight;
  const cgOk = !noArm && !!lim && limW === total && cgR >= round1(lim.fwd) && cgR <= round1(lim.aft);
  const ok = weightOk && cgOk;
  const dash = v => (isFinite(v) ? v : '—');

  const towEl = $('wbTow');
  towEl.textContent = `${fmtW(total)} lbs`;
  towEl.className = 'cg-res-val' + (weightOk ? '' : ' alert');
  const cgEl = $('wbCg');
  cgEl.textContent = noArm ? '—' : `${fmt1(cg)}"`;
  cgEl.className = 'cg-res-val' + (cgOk ? '' : ' alert');
  $('wbLimits').innerHTML = lim ? `${fmt1(lim.fwd)}" - ${fmt1(lim.aft)}"` + (limW !== total ? `<span class="cg-res-sub">${fmtW(limW)} lbs için</span>` : '') : '—';

  const st = $('wbStatus');
  st.className = 'status-pill ' + (ok ? 'ok' : 'bad');
  st.textContent = ok ? 'LİMİTLER İÇİNDE' : (!weightOk ? 'AĞIRLIK AŞIMI (MTOW)!' : noArm ? 'BEM KOLU GİRİLMEDİ' : 'C.G. LİMİT DIŞI!');

  $('wbTable').innerHTML = `<tr><th>İstasyon</th><th>Ağırlık</th><th>Kol</th><th>Moment</th></tr>` +
    rows.map(r => `<tr><td${r.capped ? ' class="capped"' : ''}>${esc(r.label)}${r.capped ? ' ⚠︎ max' : ''}</td><td>${fmtW(r.w)}</td><td>${r.arm == null ? '—' : fmt1(r.arm)}</td><td>${r.arm == null ? '—' : Math.round(r.w * r.arm)}</td></tr>`).join('') +
    `<tr class="total"><td>TOPLAM</td><td>${fmtW(total)}</td><td>${noArm ? '—' : fmt1(cg)}</td><td>${noArm ? '—' : Math.round(moment)}</td></tr>`;

  $('wbChart').innerHTML = envelopeSVG(cfg, cg, total, lim, ok);
  $('wbLegend').innerHTML = noArm
    ? `<b style="color:var(--condition)">${esc(cfg.emptyLabel)} kolu girilmedi.</b> Bu uçağın verisine boş ağırlık kolu eklenmeli; C.G. hesabı ondan sonra yapılır.` + (cfg.note ? `<br>${esc(cfg.note)}` : '')
    : `<b>${fmtW(total)} lbs</b> | C.G. <b>${fmt1(cg)}"</b> | Ön limit ${lim ? fmt1(lim.fwd) + '"' : '—'} · Arka limit ${lim ? fmt1(lim.aft) + '"' : '—'} → <b style="color:${ok ? 'var(--normal)' : 'var(--emergency)'}">${ok ? 'Emniyetli bölgede' : 'LİMİT DIŞI!'}</b>` +
    (cfg.note ? `<br>${esc(cfg.note)}` : '');
}

function envelopeSVG(cfg, cg, total, lim, ok) {
  const env = cfg.envelope;
  const W = 540, H = 380, L = 64, R = 514, T = 26, B = 312;
  const envX = env.map(p => p[0]), envY = env.map(p => p[1]);
  const xMin = Math.floor((Math.min(...envX) - 3) / 2) * 2;
  const xMax = Math.ceil((Math.max(...envX) + 2) / 2) * 2;
  const yMin = Math.floor(Math.min(...envY) / 200) * 200;
  const yMax = Math.ceil((cfg.maxWeight + 120) / 100) * 100;
  const sx = x => L + (x - xMin) / (xMax - xMin) * (R - L);
  const sy = y => B - (y - yMin) / (yMax - yMin) * (B - T);
  const clampX = x => Math.max(L, Math.min(R, x)), clampY = y => Math.max(T, Math.min(B, y));

  const specialX = [...new Set(envX)];
  const specialY = [...new Set(envY.filter(y => y !== yMin))];
  let s = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="-apple-system, Segoe UI, Roboto, sans-serif">`;
  s += `<rect width="${W}" height="${H}" fill="#080d1a" rx="8"/>`;

  // ızgara + eksen etiketleri
  for (let x = xMin; x <= xMax; x += 1) {
    s += `<line x1="${sx(x)}" y1="${T}" x2="${sx(x)}" y2="${B}" stroke="#131e33" stroke-width="${x % 2 ? 0.5 : 1}"/>`;
    if (x % 2 === 0 && !specialX.some(v => Math.abs(v - x) < 1.3))
      s += `<text x="${sx(x)}" y="${B + 19}" fill="#94a3b8" font-size="13" text-anchor="middle">${fmtAxis(x)}</text>`;
  }
  for (let y = yMin; y <= yMax; y += 100) {
    s += `<line x1="${L}" y1="${sy(y)}" x2="${R}" y2="${sy(y)}" stroke="#131e33" stroke-width="${y % 200 ? 0.5 : 1}"/>`;
    if (y % 200 === 0 && !specialY.some(v => Math.abs(v - y) < 70))
      s += `<text x="${L - 6}" y="${sy(y) + 3}" fill="#94a3b8" font-size="13" text-anchor="end">${y}</text>`;
  }
  specialX.forEach(x => s += `<text x="${sx(x)}" y="${B + 19}" fill="#38bdf8" font-size="13" font-weight="bold" text-anchor="middle">${fmtAxis(x)}</text>`);
  // Birbirine çok yakın zarf ağırlıklarını atla (etiketler üst üste binmesin); max ağırlık her zaman yazılır
  let lastY = -1e9;
  specialY.slice().sort((p, q) => q - p).forEach(y => {
    if (y !== cfg.maxWeight && Math.abs(sy(y) - lastY) < 19) return;
    lastY = sy(y);
    s += `<text x="${L - 6}" y="${sy(y) + 3}" fill="${y === cfg.maxWeight ? '#ef4444' : '#f59e0b'}" font-size="13" font-weight="bold" text-anchor="end">${y}</text>`;
  });
  s += `<rect x="${L}" y="${T}" width="${R - L}" height="${B - T}" fill="none" stroke="#334155" stroke-width="1.5"/>`;
  s += `<text x="14" y="${(T + B) / 2}" fill="#38bdf8" font-size="12" font-weight="bold" transform="rotate(-90 14 ${(T + B) / 2})" text-anchor="middle">AĞIRLIK (LBS)</text>`;
  s += `<text x="${(L + R) / 2}" y="${H - 12}" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">C.G. KONUMU (INCHES AFT OF DATUM)</text>`;

  // zarf
  s += `<polygon points="${env.map(p => sx(p[0]) + ',' + sy(p[1])).join(' ')}" fill="rgba(56,189,248,0.12)" stroke="#38bdf8" stroke-width="2.5"/>`;
  s += `<line x1="${L}" y1="${sy(cfg.maxWeight)}" x2="${R}" y2="${sy(cfg.maxWeight)}" stroke="#ef4444" stroke-width="1.3" stroke-dasharray="4,3"/>`;
  s += `<text x="${R - 4}" y="${sy(cfg.maxWeight) - 5}" fill="#ef4444" font-size="12" font-weight="bold" text-anchor="end">MAX GROSS WT: ${cfg.maxWeight} LBS</text>`;

  // hesaplanan nokta
  if (!isFinite(cg)) return s + '</svg>';
  const py = clampY(sy(total)), px = clampX(sx(cg));
  const col = ok ? '#10b981' : '#ef4444';
  s += `<line x1="${L}" y1="${py}" x2="${R}" y2="${py}" stroke="#475569" stroke-width="1" stroke-dasharray="3,3"/>`;
  if (lim) {
    s += `<line x1="${sx(lim.fwd)}" y1="${py}" x2="${sx(lim.aft)}" y2="${py}" stroke="${col}" stroke-width="4" stroke-linecap="round"/>`;
  }
  s += `<line x1="${px - 12}" y1="${py}" x2="${px + 12}" y2="${py}" stroke="#fff" stroke-width="2"/>`;
  s += `<line x1="${px}" y1="${py - 12}" x2="${px}" y2="${py + 12}" stroke="#fff" stroke-width="2"/>`;
  s += `<circle cx="${px}" cy="${py}" r="5" fill="${col}" stroke="#fff" stroke-width="2"/>`;
  const bw = 158, bh = 26;
  let bx = px + 14; if (bx + bw > R - 2) bx = px - 14 - bw;
  const by = Math.max(T + 2, Math.min(B - bh - 2, py - bh - 6));
  s += `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" fill="#1e293b" stroke="${col}" rx="4"/>`;
  s += `<text x="${bx + bw / 2}" y="${by + 18}" fill="#fff" font-size="13" font-weight="bold" text-anchor="middle">${fmt1(cg)}" @ ${fmtW(total)} lbs</text>`;
  return s + '</svg>';
}

/* ============================================================
   OLAYLAR
   ============================================================ */
document.addEventListener('click', e => {
  const goEl = e.target.closest('[data-go]');
  if (goEl) return go(goEl.dataset.go);

  const f = e.target.closest('[data-filter]');
  if (f) { S.filter = f.dataset.filter; return applyFilter(); }

  const act = e.target.closest('[data-act]');
  if (act) {
    const a = act.dataset.act;
    if (a === 'reveal') return reveal();
    if (a === 'next') return nextCard();
    if (a === 'prev') return prevCard();
    if (a === 'shuffle') return toggleShuffle();
    if (a === 'known') return grade('known');
    if (a === 'weak') return grade('weak');
    if (a === 'reset') return resetDeck();
    if (a === 'wbclear') {
      document.querySelectorAll('[data-st]').forEach(i => i.value = '');
      return runWB();
    }
  }

  // Karta dokunmak da cevabı açar
  if (activeView === 'drill' && !S.revealed && e.target.closest('#cardArea')) reveal();
});

document.addEventListener('input', e => { if (e.target.matches('[data-st]')) runWB(); });

window.addEventListener('keydown', e => {
  if (e.target.matches('input')) return;
  if (activeView === 'drill') {
    if (e.code === 'Space') { e.preventDefault(); reveal(); }
    else if (e.code === 'ArrowRight') nextCard();
    else if (e.code === 'ArrowLeft') prevCard();
    else if (e.code === 'KeyS') toggleShuffle();
    else if (e.code === 'Digit1' && S.revealed) grade('weak');
    else if (e.code === 'Digit2' && S.revealed) grade('known');
    else if (e.code === 'Escape') go(S.deck.parentRoute);
  } else if (activeView === 'wb' && e.code === 'Escape') go('aircraft/' + WB.a.id);
});

window.addEventListener('hashchange', render);

document.addEventListener('DOMContentLoaded', () => {
  Progress.load();
  AIRCRAFT.forEach(a => a.decks.forEach(d => normalizeDeck(d, 'aircraft/' + a.id, a.name)));
  THEORY.decks.forEach(d => normalizeDeck(d, 'theory', 'Teori'));
  render();
});

/* Offline çalışma (sadece gerçek sunucuda: Netlify vb.) */
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}
