import { useEffect, useRef } from "react";
import { initSocket, getSocket, disconnectSocket } from "../socket";

const useSocket = ({
  onPostCreated,
  onCommentCreated,
  onReactionUpdated,
  token,
} = {}) => {
  const socketRef = useRef(null);

  useEffect(() => {
    // Inicializa socket (envía token si existe)
    socketRef.current = initSocket(token);

    const s = socketRef.current;
    if (!s) return;

    if (onPostCreated) s.on("postCreated", onPostCreated);
    if (onCommentCreated) s.on("commentCreated", onCommentCreated);
    if (onReactionUpdated) s.on("reactionUpdated", onReactionUpdated);

    // opcionales: reconexión, estado, errores
    s.on("connect", () => console.log("socket connect:", s.id));
    s.on("disconnect", (reason) => console.log("socket disconnect:", reason));
    s.on("reconnect_attempt", (n) => console.log("reconnect attempt:", n));

    return () => {
      if (onPostCreated) s.off("postCreated", onPostCreated);
      if (onCommentCreated) s.off("commentCreated", onCommentCreated);
      if (onReactionUpdated) s.off("reactionUpdated", onReactionUpdated);
      // NOT disconnect here if you want socket global across app.
      // If you want to cleanup completely when component unmounts:
      // disconnectSocket();
    };
  }, [onPostCreated, onCommentCreated, onReactionUpdated, token]);

  const emit = (event, payload) => {
    const s = getSocket();
    if (!s || !s.connected) {
      console.warn("Socket no conectado, evento no emitido:", event);
      return;
    }
    s.emit(event, payload);
  };

  return { emit, socket: socketRef.current };
};

export default useSocket;
