// src/socket.js
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

let socket = null;

export const initSocket = (token) => {
  // 🔥 SIEMPRE crea uno nuevo en ECS
  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
  }

  socket = io(SOCKET_URL, {
    path: "/socket.io",
    transports: ["websocket"],
    forceNew: true, // ⭐ CLAVE
    auth: { token },
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: Infinity, // ⭐
    reconnectionDelay: 1000,
    timeout: 20000,
  });

  socket.on("connect", () => {
    console.log("🟢 Socket conectado limpio:", socket.id);
  });

  socket.on("disconnect", (reason) => {
    console.warn("🟡 Socket desconectado:", reason);
  });

  socket.on("connect_error", (err) => {
    console.error("🔴 connect_error:", err.message);

    // 🔁 Auth inválida → reconectar con token nuevo
    if (err.data?.type === "AuthError") {
      socket.disconnect();
    }
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
    console.log("❌ Socket destruido");
  }
};
