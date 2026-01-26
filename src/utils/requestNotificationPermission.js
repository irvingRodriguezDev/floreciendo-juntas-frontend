import { getToken } from "firebase/messaging";
import { messaging } from "../firebase";
import { MethodPost } from "../config/Service";
import { getBrowserName } from "./getBrowserName";

export const requestNotificationPermission = async (tokenAuth) => {
  try {
    console.log("🔔 Solicitando permiso de notificaciones...");

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.log("❌ Permiso denegado");
      return;
    }

    // 🧠 ID único por navegador
    let browserId = localStorage.getItem("browser_id");
    if (!browserId) {
      browserId = crypto.randomUUID();
      localStorage.setItem("browser_id", browserId);
    }

    const currentToken = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    });

    if (!currentToken) {
      console.log("❌ No se pudo obtener token FCM");
      return;
    }

    const storedToken = localStorage.getItem("fcm_token");
    const device = getBrowserName();

    // 🛑 CLAVE: solo enviar si CAMBIÓ
    if (currentToken === storedToken) {
      console.log("🔁 Token sin cambios, no se envía");
      return;
    }

    await MethodPost(`/save-notification-token`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenAuth}`,
      },
      token: currentToken,
      device,
      browserId,
    });

    localStorage.setItem("fcm_token", currentToken);
    console.log("✅ Token FCM enviado y guardado correctamente");
  } catch (error) {
    console.error("🔥 Error en requestNotificationPermission:", error);
  }
};
