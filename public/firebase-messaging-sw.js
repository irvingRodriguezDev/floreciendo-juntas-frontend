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
  console.log("🌸 Push recibido en background:", payload);
  // 💡 NO llamamos a self.registration.showNotification
  // porque el bloque 'webpush.notification' del backend
  // ya hace que iOS / Android la pinten automáticamente.
});

/**
 * 👉 Click en la notificación (Mantenlo intacto, está perfecto)
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
