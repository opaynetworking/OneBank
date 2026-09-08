const CACHE_NAME = 'sterling-bank-v2';
const urlsToCache = [
  './',
  './index.html',
  './sterlinglog.html',
  './sterling.html',
  './sterlinghist.html',
  './transaction.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// CHANGE: Network First Strategy (Checks server for updates)
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
    .then(response => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
      return response;
    })
    .catch(() => caches.match(event.request))
  );
});