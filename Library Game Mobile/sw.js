const CACHE_NAME = 'library-manager-cache-v1';
// Assets to cache for offline use. Add additional files here as needed.
const ASSETS = [
  '/',
  '/idle_game_prototype.html',
  '/library_background.png',
  '/modern_background.png',
  '/fantasy_background.png',
  '/book_stack.png',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', event => {
  // Clean up old caches if needed
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});