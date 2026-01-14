import { useEffect, useState } from "react";
import { getSocket } from "../socket";

export const useLiveComments = (liveId) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket || !liveId) return;

    // 🔗 Unirse al live
    socket.emit("join-live", liveId);

    // 📥 Historial
    const handleLoad = (initialComments) => {
      setComments(initialComments);
    };

    // 💬 Nuevo comentario
    const handleNew = (comment) => {
      setComments((prev) => [...prev.slice(-14), comment]);
    };

    socket.on("load_comments", handleLoad);
    socket.on("new_comment", handleNew);

    return () => {
      socket.emit("leave-live", liveId);
      socket.off("load_comments", handleLoad);
      socket.off("new_comment", handleNew);
    };
  }, [liveId]);

  const sendComment = (message) => {
    const socket = getSocket();
    if (!socket || !message?.trim()) return;

    socket.emit("send_comment", { liveId, message });
  };

  return { comments, sendComment };
};
