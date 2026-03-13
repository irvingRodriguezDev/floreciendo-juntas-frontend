import { useEffect, useState } from "react";
import { getSocket } from "../socket";

export const useLiveComments = (liveId) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket || !liveId) return;

    // 🔗 Unirse al live
    // Quitamos joinedRef porque si el socket se reconecta,
    // NECESITAMOS volver a emitir "join-live" para que el servidor nos meta en la room.
    socket.emit("join-live", liveId);

    const handleLoad = (initialComments = []) => {
      // Tomamos los últimos 14
      setComments(initialComments.slice(-19));
    };

    const handleNew = (comment) => {
      setComments((prev) => {
        // Evitar duplicados por ID (por si el socket re-emite)
        const exists = prev.some((c) => c.id === comment.id);
        if (exists) return prev;

        const next = [...prev, comment];
        return next.slice(-19); // Mantenemos la ventana de 14
      });
    };

    // Escuchar eventos
    socket.on("load_comments", handleLoad);
    socket.on("new_comment", handleNew);

    // 🔄 Manejo de reconexión automática
    const handleReconnect = () => {
      socket.emit("join-live", liveId);
    };
    socket.on("connect", handleReconnect);

    return () => {
      socket.emit("leave-live", liveId);
      socket.off("load_comments", handleLoad);
      socket.off("new_comment", handleNew);
      socket.off("connect", handleReconnect);
    };
    // getSocket() en dependencias asegura que si la instancia cambia, el hook se refresca
  }, [liveId]);

  const sendComment = (message) => {
    const socket = getSocket();
    if (!socket || !message?.trim()) return;

    socket.emit("send_comment", { liveId, message: message.trim() }, (ack) => {
      if (!ack?.ok) {
        console.warn("❌ Comentario no enviado");
      }
    });
  };

  return { comments, sendComment };
};
