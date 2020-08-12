const urlToCache= [
    "/",
    "/db.js",
    "/index.js",
    "/manifest.json",
    "/styles.css",
    "icons/icon-192x192.png",
    "icons/icon-512x512.png",
  ];

  const cacheName = "My_site_cache1";
  const dataCache = "Data_cache1";

  self.addEventListener("install", event => {
    event.waitUntil(
      caches.open(cacheName)
        .then(cache => cache.addAll(urlToCache))
        .then(self.skipWaiting())
    );
  });


  self.addEventListener("fetch", event => {
    if (event.request.url.startsWith(self.location.origin)) {
      event.respondWith(
        caches.match(event.request).then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }
  
          return caches.open(dataCache).then(cache => {
            return fetch(event.request).then(response => {
              return cache.put(event.request, response.clone()).then(() => {
                return response;
              });
            });
          });
        })
      );

      }
    })
