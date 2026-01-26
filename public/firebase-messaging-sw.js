importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js",
);

firebase.initializeApp({
  apiKey: "AIzaSyDy-Z2hOKpo_5PQ6eOgghEkbbQp0F6kIeA",
  authDomain: "floreciendo-juntas-web.firebaseapp.com",
  projectId: "floreciendo-juntas-web",
  messagingSenderId: "953865000932",
  appId: "1:953865000932:web:ff4608c63f07733d17d9f1",
});

const messaging = firebase.messaging();

/**
 * 🔔 Notificación en background
 */
messaging.onBackgroundMessage((payload) => {
  const title =
    payload.data?.title || "Nueva interacción en Floreciendo Juntas 🌸";

  const body = payload.data?.body || "Tienes una nueva notificación";

  const url = payload.data?.url || "/";

  self.registration.showNotification(title, {
    body,
    icon: "/foto.png",
    badge: "/foto.png",
    data: {
      url,
    },
  });
});

/**
 * 🖱️ Click en la notificación
 */
