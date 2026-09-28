import { getToken } from "firebase/messaging";
import { messaging } from "../firebase";
import { MethodPost } from "../config/Service";
import { getBrowserName } from "./getBrowserName";

export const requestNotificationPermission = async (
  tokenAuth,
  userId = null,
) => {
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
    const storedUserId = localStorage.getItem("fcm_user_id");
    const device = getBrowserName();

    /**
     * 🛑 Solo omitir la petición si:
     * 1. El token es idéntico
     * 2. Y ADEMÁS el usuario guardado es EXACTAMENTE el mismo
     */
    if (
      currentToken === storedToken &&
      String(userId) === String(storedUserId)
    ) {
      console.log("ℹ️ El token FCM ya está vinculado al usuario actual.");
      return;
    }

    // 🚀 Enviar al backend para vincular o reasignar el token al usuario actual
    await MethodPost(`/save-notification-token`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenAuth}`,
      },
      token: currentToken,
      device,
      browserId,
    });

    // Guardar tanto el token como el ID del usuario para el cual se registró
    localStorage.setItem("fcm_token", currentToken);
    if (userId) {
      localStorage.setItem("fcm_user_id", userId);
    }

    console.log(
      "✅ Token FCM registrado/actualizado en el backend para el usuario:",
      userId,
    );
  } catch (error) {
    console.error("🔥 Error en requestNotificationPermission:", error);
  }
};
