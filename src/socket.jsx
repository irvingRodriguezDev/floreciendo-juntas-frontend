// src/socket.js
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

let socket = null;

export const initSocket = (token) => {
  if (socket) return socket;

  socket = io(SOCKET_URL, {
    path: "/socket.io",
    auth: {
      token,
    },
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  socket.on("connect", () => {
    console.log("🔗 Socket conectado:", socket.id);
  });

  socket.on("connect_error", (err) => {
    console.error("❌ Socket connect_error:", err.message);
    if (err.data?.type === "AuthError") {
      console.error("⚠️ Error de autenticación socket");
    }
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log("❌ Socket desconectado");
  }
};
