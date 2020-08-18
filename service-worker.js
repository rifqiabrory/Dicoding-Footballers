const CACHE_NAME = "footballers-v2";

var urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/assets/css/materialize.min.css",
  "/assets/css/main.css",
  "/assets/img/favicon.png",
  "/assets/img/favicon-16x16.png",
  "/assets/img/favicon-32x32.png",
  "/assets/img/android-chrome-192x192.png",
  "/assets/img/android-chrome-512x512.png",
  "/assets/img/apple-touch-icon.png",
  "/navigation/navigation.html",
  "/assets/img/logo.jpg",
  "/assets/img/logo-white.png",
  "/pages/home.html",
  "/pages/trends.html",
  "/pages/saved.html",
  "/pages/about.html",
  "/assets/js/materialize.min.js",
  "/assets/js/initialize.js",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
