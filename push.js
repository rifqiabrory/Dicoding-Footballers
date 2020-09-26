var webPush = require("web-push");

const vapidKeys = {
  publicKey:
    "BNQ_zBQ-ECox8JN1DeqFNZmHw1phQA5rtyuAeQPSKWsjgzAnKrKeioOIWCUylqEwiX4uXdUlUOYaKRUqjuqcPh4",
  privateKey: "2m5p1a65B2bX0s_M604SE7LcNjPxg48MOo2ZYpsI8jA",
};

webPush.setVapidDetails(
  "mailto:rifqi.upm@gmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

var pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/eLqhIgWtvYo:APA91bHBqI-ltGHNfXFrJtzszUuMqILVkpNdC9xtmVvulnTm2wkWEPdhAi5pJfEf8VxjPSYenlKci_fL9G3a9FWRTA7ZTchtcyvZpa0ubiV1hzOehU2CmG03OeoZDIspddDFIXWErIdH",
  keys: {
    p256dh:
      "BO0C6NOxOTqv0RVBHYUdOh89VZ3EA2srlcZ3Ba/5yWviUKnsqcAyycZhRmUNDWLImBAcx7hzPNLn1Awj46trBXc=",
    auth: "nEtjNJFwoBeywT9YAsm0nQ==",
  },
};
var payload = "Welcome to Push Notification Footballers App";
var options = {
  gcmAPIKey: "456469480760",
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);
