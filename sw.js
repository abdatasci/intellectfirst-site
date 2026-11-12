const MERGED_PATHS = ["/a/taboo/","/a/vocab-movers/", "/a/kazakh-a1/", "/a/vocab-a1/", "/a/ielts-arena/", "/a/vocab-b1/", "/a/vocab-flyers/", "/a/vocab-ket/", "/a/vocab-a2/", "/a/vocab-pet/", "/a/vocab-teens-b1/", "/a/vocab-c1/", "/a/vocab-teens-b2/", "/a/vocab-b2/"];
/* IF Academy offline support: pages you have opened keep working without internet. */
const CACHE = 'if-original-brand-v3';
const CORE = ['./', 'academy.css', 'academy.js', 'academy-catalog.js', 'brand/if-shield-256.webp', 'app/index.html', 'login/index.html', 'materials/index.html', 'if-ui.css', 'if-lock.js', 'if-runtime.js', 'if-bar.js', 'keys.json', 'manifest.webmanifest', 'brand/logo-shield.png', 'brand/logo-160.png', 'brand/favicon-64.png', 'brand/icon-192.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE.map(p => new Request(p, { cache: 'reload' })))).catch(() => {})); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.open(CACHE).then(async c => { for (const r of await c.keys()) { if (MERGED_PATHS.some(p => new URL(r.url).pathname.startsWith(p))) await c.delete(r); } }).then(() => caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()))); });
self.addEventListener('fetch', e => {
  const r = e.request; if (r.method !== 'GET') return;
  const u = new URL(r.url);
  /* Live data and sign-in are never cached. */
  if (u.origin === location.origin && (u.pathname.startsWith('/api/') || u.pathname.startsWith('/.netlify/'))) return;
  if (u.origin !== location.origin) {
    if (/fonts\.(googleapis|gstatic)\.com|cdnjs\.cloudflare\.com/.test(u.host)) e.respondWith(caches.open(CACHE).then(c => c.match(r).then(m => m || fetch(r).then(res => { c.put(r, res.clone()); return res; }))));
    return;
  }
  if (r.mode === 'navigate' || r.headers.get('accept')?.includes('text/html') || u.pathname.endsWith('.json')) {
    e.respondWith(fetch(r).then(res => { const cp = res.clone(); caches.open(CACHE).then(c => c.put(r, cp)); return res; }).catch(() => caches.match(r).then(m => m || caches.match('app/index.html'))));
  } else {
    /* Serve the saved copy at once, and refresh it in the background so updates arrive on the next visit. */
    e.respondWith(caches.open(CACHE).then(c => c.match(r).then(m => { const net = fetch(r).then(res => { if (res.ok && res.status === 200) c.put(r, res.clone()); return res; }); if (m) { net.catch(() => {}); return m; } return net; })));
  }
});
