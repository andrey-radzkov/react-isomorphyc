const OFFLINE_URL = '/app/offline-page.html';
//TODO: copy images
//TODO: prod urls
self.addEventListener('install', function (event) {
  event.waitUntil(
    //TODO: production mode
    caches.open('mysite-dynamic').then(function (cache) {
      return cache.addAll([
        '/app/',
        OFFLINE_URL,
        '/app/favicon.ico',
        '/app/manifest.json',
      ]);
    })
  );
});
self.addEventListener('fetch', event => {
    if (event.request.mode === 'navigate' ||
      (event.request.method === 'GET' &&
      event.request.headers.get('accept').includes('text/html'))) {
      event.respondWith(
        fetch(event.request).catch(error => {
          console.log('Fetch failed; returning offline page instead.', error);
          return caches.match(OFFLINE_URL);
        })
      );
    }
  }
);
