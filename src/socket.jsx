// src/socket.js
import { io } from "socket.io-client";

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || "http://localhost:3000";

let socket;

export const initSocket = (token) => {
  if (socket) return socket;

  socket = io(SOCKET_URL, {
    auth: { token }, // opcional: enviar token para autenticación
    transports: ["websocket"],
    autoConnect: true,
    reconnectionAttempts: 5,
  });

  socket.on("connect_error", (err) => {
    console.error("Socket connect_error:", err);
  });

  socket.on("connect", () => {
    console.log("Socket conectado:", socket.id);
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
