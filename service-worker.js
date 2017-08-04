self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('mycache').then(function(cache){
      return cache.addAll([
	      '/',
              "?utm_source=homescreen",
      ]);
    })
  );
});
