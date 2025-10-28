// src/socket.js
import { io } from "socket.io-client";

// ✅ Usamos la variable de entorno que será la URL de ngrok (https://....)
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

if (!SOCKET_URL) {
  console.warn(
    "⚠️ VITE_SOCKET_URL no está definido en el archivo .env. Revisa tu configuración."
  );
}

let socket;

/**
 * Inicializa el socket solo una vez (singleton)
 * @param {string} token - JWT del usuario para autenticación
 * @returns {SocketIOClient.Socket} socket
 */
export const initSocket = (token) => {
  if (socket) return socket;

  socket = io(SOCKET_URL, {
    path: "/socket.io", // 👈 path coincide con el backend
    auth: { token },
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  // 🔹 Conexión exitosa
  socket.on("connect", () => {
    console.log("🔗 Socket conectado:", socket.id);
  });

  // 🔹 Manejo de errores de conexión
  socket.on("connect_error", (err) => {
    console.error("Socket connect_error:", err.message);
    if (err.data) {
      console.error("Detalles del error:", err.data);
      if (err.data.type === "AuthError") {
        console.error("⚠️ Fallo de autenticación Socket.IO:", err.data.message);
        // Aquí podrías redirigir al login
      }
    }
  });

  return socket;
};

/**
 * Obtiene el socket inicializado
 * @returns {SocketIOClient.Socket | null}
 */
export const getSocket = () => socket;

/**
 * Desconecta el socket y limpia la instancia
 */
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log("❌ Socket desconectado.");
  }
};
