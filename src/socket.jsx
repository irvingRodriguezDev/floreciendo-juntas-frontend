// src/socket.js
import { io } from "socket.io-client";

// ✅ Usamos la variable de entorno que será la URL de ngrok (https://....)
// 💡 NOTA: Asegúrate de que tu archivo .env tenga REACT_APP_SOCKET_URL="https://abcd1234.ngrok-free.app"
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || "http://localhost:3000";

let socket;

export const initSocket = (token) => {
  if (socket) return socket;

  socket = io(SOCKET_URL, {
    auth: { token }, // ✅ Correcto para enviar un token de autenticación

    // 💡 Recomendación: Quitar 'transports' para permitir el fallback a long-polling
    // transports: ["websocket"],

    autoConnect: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000, // Opcional: añade un delay para reconexión
  });

  socket.on("connect_error", (err) => {
    // ⚠️ Muestra el error de manera más detallada
    console.error("Socket connect_error:", err.message);
    console.error("Detalles del error:", err.description);
  });

  socket.on("connect", () => {
    console.log("🔗 Socket conectado:", socket.id);
  });

  // Opcional: Añadir un listener para cuando el token falle
  socket.on("connect_error", (err) => {
    if (err.data && err.data.type === "AuthError") {
      console.error("Fallo de autenticación Socket.IO:", err.data.message);
      // Aquí podrías redirigir al login
    }
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log("❌ Socket desconectado.");
  }
};
