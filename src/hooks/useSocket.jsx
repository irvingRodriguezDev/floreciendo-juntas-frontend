import { useEffect, useRef, useCallback } from "react";
import { initSocket, getSocket, disconnectSocket } from "../socket";

const useSocket = ({
  onPostCreated,
  onCommentCreated,
  onReactionUpdated,
  token,
} = {}) => {
  const socketRef = useRef(null);

  useEffect(() => {
    // 1. Inicialización
    if (token) {
      socketRef.current = initSocket(token);
    }

    const s = socketRef.current;
    if (!s) return;

    // 2. Registro de eventos (usando los nombres que coinciden con tu backend)
    // Nota: Asegúrate que los nombres sean los mismos que emite el server
    if (onPostCreated) s.on("postCommunityCreated", onPostCreated);
    if (onCommentCreated) s.on("createCommentPostCommunity", onCommentCreated);
    if (onReactionUpdated) s.on("postLikeToggled", onReactionUpdated);

    s.on("connect", () => console.log("🟢 Socket conectado:", s.id));
    s.on("connect_error", (err) => {
      console.error("🔴 Socket Error:", err.message);
      // Si el error es de Auth, initSocket ya debería manejar el disconnect
    });

    // 3. Limpieza (Cleanup)
    return () => {
      if (s) {
        s.off("postCommunityCreated", onPostCreated);
        s.off("createCommentPostCommunity", onCommentCreated);
        s.off("postLikeToggled", onReactionUpdated);
        s.off("connect");
        s.off("connect_error");
        // No desconectamos aquí para que el socket persista entre navegaciones
      }
    };
    // 💡 IMPORTANTE: Si onPostCreated no viene de un useCallback,
    // este efecto se ejecutará en CADA render.
  }, [token, onPostCreated, onCommentCreated, onReactionUpdated]);

  // 4. Emitir usando useCallback para que la función sea estable
  const emit = useCallback((event, payload) => {
    const s = getSocket();
    if (s?.connected) {
      s.emit(event, payload);
    } else {
      console.warn("⚠️ Socket no conectado, no se pudo emitir:", event);
    }
  }, []);

  return { emit, socket: socketRef.current };
};

export default useSocket;
