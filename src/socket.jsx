import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;
let socket = null;

export const initSocket = (token, usuario = null) => {
  if (!token) {
    disconnectSocket();
    return null;
  }

  // 1. Si ya existe el socket y está conectado, solo actualizamos el token
  if (socket?.connected) {
    socket.auth = { token, userId: usuario?.id };
    return socket;
  }

  // 2. Si existe pero está desconectado, lo limpiamos para crear uno fresco
  if (socket) {
    socket.disconnect();
  }

  socket = io(SOCKET_URL, {
    path: "/socket.io",
    transports: ["websocket"],
    // Quitamos forceNew para permitir que la librería gestione la eficiencia
    auth: { token },
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 10,
    timeout: 10000, // Bajamos un poco el timeout para fallar rápido
  });

  // Listeners básicos
  socket.on("connect", () => console.log("🟢 Conectado:", socket.id));

  socket.on("connect_error", (err) => {
    console.error("🔴 Error:", err.message);
    if (err.message.includes("AuthError") || err.message.includes("token")) {
      disconnectSocket();
      window.dispatchEvent(new CustomEvent("socket-auth-error"));
    }
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.off(); // Es más limpio que removeAllListeners()
    socket.disconnect();
    socket = null;
  }
};
