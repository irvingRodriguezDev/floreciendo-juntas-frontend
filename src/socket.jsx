import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;
let socket = null;

// Ya no necesitamos recibir 'usuario' ni 'token' como parámetro
export const initSocket = () => {
  disconnectSocket();

  // 1. Si ya existe el socket y está conectado, no necesitamos recrearlo
  if (socket?.connected) {
    return socket;
  }

  // 2. Si existe pero está desconectado, lo limpiamos para crear uno fresco
  if (socket) {
    socket.disconnect();
  }

  socket = io(SOCKET_URL, {
    path: "/socket.io",
    transports: ["websocket"],
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 10,
    timeout: 10000,
    withCredentials: true, // 👈 CRUCIAL: Obligatorio para que el navegador mande la cookie HttpOnly
  });

  // Listeners básicos
  socket.on("connect", () => console.log("🟢 Conectado:", socket.id));

  socket.on("connect_error", (err) => {
    console.log(err, "el error del websocket");

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
    socket.off(); // Limpia los listeners de forma segura
    socket.disconnect();
    socket = null;
  }
};
