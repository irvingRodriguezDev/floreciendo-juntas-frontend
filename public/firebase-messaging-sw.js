importScripts("/firebase-config.js");
importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js",
);

firebase.initializeApp(self.__FIREBASE_CONFIG__);
const messaging = firebase.messaging();

/**
 * 🔔 Push cuando la app está en background o cerrada
 */
messaging.onBackgroundMessage((payload) => {
  const data = payload.data || {};

  const title = data.title || "Nueva interacción en Floreciendo Juntas 🌸";
  const body = data.body || "Tienes una nueva notificación";
  const url = data.url || "/";

  self.registration.showNotification(title, {
    body,
    icon: "/foto.png",
    badge: "/foto.png",
    data: { url },
  });
});

/**
 * 👉 Click en la notificación
 */
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const url = event.notification.data?.url || "/";

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url === url && "focus" in client) {
            return client.focus();
          }
        }

        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      }),
  );
});
