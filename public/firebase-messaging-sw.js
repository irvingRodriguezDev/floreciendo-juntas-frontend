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
  // 💡 Extraemos datos priorizando el bloque 'notification' y respaldando con 'data'
  const notificationTitle =
    payload.notification?.title ||
    payload.data?.title ||
    "Nueva interacción en Floreciendo Juntas 🌸";

  const notificationBody =
    payload.notification?.body ||
    payload.data?.body ||
    "Tienes una nueva notificación";

  const url = payload.data?.url || payload.fcmOptions?.link || "/";

  // En iOS/Safari, si el payload ya traía 'webpush.notification',
  // APNs muestra la alerta automáticamente. Esto sirve como fallback seguro.
  const notificationOptions = {
    body: notificationBody,
    icon: "/foto.png",
    badge: "/foto.png",
    data: { url },
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions,
  );
});

/**
 * 👉 Click en la notificación
 */
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const urlToOpen = event.notification.data?.url || "/";

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        // Si la PWA ya está abierta en esa URL, le damos foco
        for (const client of clientList) {
          if (client.url.includes(urlToOpen) && "focus" in client) {
            return client.focus();
          }
        }
        // Si no está abierta, la abrimos
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      }),
  );
});
