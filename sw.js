/* Offline çalışma: dosyaları telefona kaydeder.
   İnternet varsa her zaman en güncel sürümü alır, yoksa kayıtlı sürümü açar.
   YENİ DOSYA EKLENİNCE (ör. data/pa44.js) aşağıdaki listeye ekle ve CACHE adını değiştir. */
const CACHE = 'ckp-v0.8';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './perf.js',
  './data/pa28r201.js',
  './data/pa44180.js',
  './data/pa44180-perf.js',
  './data/perf/pa44/159.png',
  './data/perf/pa44/160.png',
  './data/perf/pa44/161.png',
  './data/perf/pa44/163.png',
  './data/perf/pa44/165.png',
  './data/perf/pa44/167.png',
  './data/perf/pa44/168.png',
  './data/perf/pa44/169.png',
  './data/perf/pa44/175.png',
  './data/perf/pa44/176.png',
  './data/perf/pa44/177.png',
  './data/perf/pa44/178.png',
  './data/theory.js',
  './manifest.webmanifest',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function fromCache(req) {
  return caches.match(req, { ignoreSearch: true })
    .then(r => r || (req.mode === 'navigate' ? caches.match('./index.html') : undefined));
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;

  e.respondWith(new Promise(resolve => {
    let done = false;
    const finish = r => { if (!done && r) { done = true; resolve(r); } };
    // Zayıf internette 3 sn bekle, sonra kayıtlı sürümü aç
    const timer = setTimeout(() => fromCache(req).then(finish), 3000);
    fetch(req, { cache: 'no-cache' }).then(res => {
      clearTimeout(timer);
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      finish(res);
    }).catch(() => {
      clearTimeout(timer);
      fromCache(req).then(r => finish(r || Response.error()));
    });
  }));
});
