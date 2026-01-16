import { useEffect, useRef, useState } from "react";
import { getSocket } from "../socket";

export const useLiveComments = (liveId) => {
  const [comments, setComments] = useState([]);
  const joinedRef = useRef(false);

  useEffect(() => {
    const socket = getSocket();
    if (!socket || !liveId || joinedRef.current) return;

    // 🔗 Unirse al live (una sola vez)
    socket.emit("join-live", liveId);
    joinedRef.current = true;

    // 📥 Historial inicial
    const handleLoad = (initialComments = []) => {
      setComments(initialComments.slice(-14));
    };

    // 💬 Nuevo comentario
    const handleNew = (comment) => {
      setComments((prev) => [...prev.slice(-13), comment]);
    };

    socket.on("load_comments", handleLoad);
    socket.on("new_comment", handleNew);

    return () => {
      socket.emit("leave-live", liveId);
      socket.off("load_comments", handleLoad);
      socket.off("new_comment", handleNew);
      joinedRef.current = false;
    };
  }, [liveId]);

  // ✉️ Enviar comentario
  const sendComment = (message) => {
    const socket = getSocket();
    if (!socket || !message?.trim()) return;

    socket.emit("send_comment", { liveId, message: message.trim() }, (ack) => {
      if (!ack?.ok) {
        console.warn("❌ Comentario no enviado");
      }
    });
  };

  return {
    comments,
    sendComment,
  };
};
