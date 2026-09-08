/* ===== Basic Service Worker for Offline Caching ===== */
const CACHE_NAME = 'sterling-bank-v1';
const urlsToCache = [
  './',
  './index.html',
  './sterlinglog.html',
  './sterling.html',
  './sterlinghist.html',
  './transaction.html'
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch Assets (Network falling back to cache)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
    .then(response => response || fetch(event.request))
  );
});