// SW minimal per GitHub Pages shell PWA
const CACHE_NAME = 'campo-anspi-shell-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  '../assets/icon-192.png',
  '../assets/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Cache-first per la shell, lasciamo pass-through per l'iframe (dominio differente)
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  const isSameOrigin = url.origin === self.location.origin;
  if (!isSameOrigin) {
    // Lascia passare le richieste all'Apps Script per evitare CORS/opaque
    return;
  }
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});



