self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('mycache').then(function(cache){
      return cache.addAll([
	      '/',
              "/?utm_source=homescreen",
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

