import { getToken } from "firebase/messaging";
import { messaging } from "../firebase";
import { MethodPost } from "../config/Service";
import { getBrowserName } from "./getBrowserName";

// Ya no necesitamos recibir un 'userId' como parámetro,
// el backend sabrá quién es la usuaria gracias a la cookie HttpOnly.
export const requestNotificationPermission = async () => {
  try {
    if (!messaging) {
      console.warn(
        "⚠️ Firebase Messaging no está disponible en este navegador",
      );
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.log("❌ Permiso de notificaciones denegado");
      return;
    }

    /**
     * 🧠 ID único por navegador
     */
    let browserId = localStorage.getItem("browser_id");
    if (!browserId) {
      browserId = crypto.randomUUID();
      localStorage.setItem("browser_id", browserId);
    }

    /**
     * 🔧 Registro EXPLÍCITO del Service Worker
     */
    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js",
    );

    /**
     * 🔑 Obtener token FCM
     */
    const currentToken = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: registration,
    });

    if (!currentToken) {
      console.log("❌ No se pudo obtener el token FCM");
      return;
    }

    const storedToken = localStorage.getItem("fcm_token");
    const device = getBrowserName();

    /**
     * 🛑 Solo omitir la petición si el token FCM es exactamente el mismo guardado previamente
     */
    if (currentToken === storedToken) {
      console.log("ℹ️ El token FCM ya está vinculado en este dispositivo.");
      return;
    }

    // 🚀 Enviar al backend.
    // Al usar MethodPost (que internamente usa tu clienteAxios con withCredentials: true),
    // la cookie HttpOnly viajará automáticamente sin necesidad de headers manuales.
    await MethodPost(`/save-notification-token`, {
      token: currentToken,
      device,
      browserId,
    });

    // Guardar el token en localStorage para evitar peticiones repetidas innecesarias
    localStorage.setItem("fcm_token", currentToken);

    console.log(
      "✅ Token FCM registrado/actualizado en el backend exitosamente.",
    );
  } catch (error) {
    console.error("🔥 Error en requestNotificationPermission:", error);
  }
};
