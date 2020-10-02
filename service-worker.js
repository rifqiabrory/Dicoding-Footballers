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
  "/pages/match.html",
  "/pages/favorite.html",
  "/pages/about.html",
  "/detail-team.html",
  "/assets/js/materialize.min.js",
  "/assets/js/lib/moment.js",
  "/assets/js/navigation.js",
  "/push.js",
  "/assets/js/api.js",
  "/assets/js/db.js",
  "/assets/js/lib/idb.js",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  var base_url = "https://api.football-data.org/v2/";
  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function (cache) {
        return fetch(event.request).then(function (response) {
          cache.put(event.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    event.respondWith(
      caches
        .match(event.request, { ignoreSearch: true })
        .then(function (response) {
          return response || fetch(event.request);
        })
    );
  }
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

self.addEventListener("push", function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }

  var options = {
    body: body,
    icon: "./assets/img/android-chrome-512x512.png",
    vibration: [100, 50, 100],
    data: {
      dataOfArrival: Date.now(),
      primaryKey: 1,
    },
  };

  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});
