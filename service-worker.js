const CACHE_NAME = 'js-testing-academy-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/lessonsData.js'
];
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache=>cache.addAll(ASSETS))
  );
});
self.addEventListener('fetch', event=>{
  event.respondWith(
    caches.match(event.request).then(response=> response || fetch(event.request))
  );
});
