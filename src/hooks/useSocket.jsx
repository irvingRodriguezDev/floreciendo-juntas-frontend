import { useEffect, useRef, useCallback } from "react";
import { initSocket, getSocket } from "../socket";

const useSocket = ({
  onPostCreated,
  onCommentCreated,
  onReactionUpdated,
} = {}) => {
  const socketRef = useRef(null);

  useEffect(() => {
    // 1. Inicialización global con la cookie HttpOnly automática
    socketRef.current = initSocket();
    const s = socketRef.current;
    if (!s) return;

    // 2. Registro de eventos
    if (onPostCreated) s.on("postCommunityCreated", onPostCreated);
    if (onCommentCreated) s.on("createCommentPostCommunity", onCommentCreated);
    if (onReactionUpdated) s.on("postLikeToggled", onReactionUpdated);

    // 3. Limpieza (Cleanup) de los listeners específicos al desmontar el componente
    return () => {
      if (s) {
        if (onPostCreated) s.off("postCommunityCreated", onPostCreated);
        if (onCommentCreated)
          s.off("createCommentPostCommunity", onCommentCreated);
        if (onReactionUpdated) s.off("postLikeToggled", onReactionUpdated);
        // Mantenemos la decisión correcta: NO desconectamos la instancia
        // global aquí para que siga viva en las demás vistas de la app.
      }
    };
  }, [onPostCreated, onCommentCreated, onReactionUpdated]);

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
