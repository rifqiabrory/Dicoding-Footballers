importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute(
  [
    { url: "/", revision: '1' },
    { url: "/index.html", revision: '1' },
    { url: "/manifest.json", revision: '1' },
    { url: "/assets/css/materialize.min.css", revision: '1' },
    { url: "/assets/css/main.css", revision: '1' },
    { url: "/assets/img/favicon.png", revision: '1' },
    { url: "/assets/img/favicon-16x16.png", revision: '1' },
    { url: "/assets/img/favicon-32x32.png", revision: '1' },
    { url: "/assets/img/android-chrome-192x192.png", revision: '1' },
    { url: "/assets/img/android-chrome-512x512.png", revision: '1' },
    { url: "/assets/img/apple-touch-icon.png", revision: '1' },
    { url: "/navigation/navigation.html", revision: '1' },
    { url: "/assets/img/logo.jpg", revision: '1' },
    { url: "/assets/img/logo-white.png", revision: '1' },
    { url: "/pages/home.html", revision: '1' },
    { url: "/pages/match.html", revision: '1' },
    { url: "/pages/favorite.html", revision: '1' },
    { url: "/pages/about.html", revision: '1' },
    { url: "/detail-team.html", revision: '1' },
    { url: "/assets/js/materialize.min.js", revision: '1' },
    { url: "/assets/js/lib/moment.js", revision: '1' },
    { url: "/assets/js/navigation.js", revision: '1' },
    { url: "/push.js", revision: '1' },
    { url: "/assets/js/api.js", revision: '1' },
    { url: "/assets/js/db.js", revision: '1' },
    { url: "/assets/js/lib/idb.js", revision: '1' },
  ], {
      ignoreUrlParametersMatching: [/.*/]
    }
  );

workbox.routing.registerRoute(
  new RegExp('/'),
  workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
  workbox.strategies.staleWhileRevalidate()
)

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
