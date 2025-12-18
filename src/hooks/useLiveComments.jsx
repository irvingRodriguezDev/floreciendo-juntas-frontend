import { useEffect, useState } from "react";
import { getSocket, initSocket } from "../socket";

export const useLiveComments = (liveId) => {
  const [comments, setComments] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const socket = initSocket(token);
    if (!socket || !liveId) return;

    // Unirse al live
    socket.emit("join-live", liveId);

    // Historial inicial
    socket.on("load_comments", (initialComments) => {
      setComments(initialComments);
    });

    // Comentarios en tiempo real
    socket.on("new_comment", (comment) => {
      setComments((prev) => [...prev.slice(-14), comment]);
    });

    return () => {
      socket.emit("leave-live", liveId);
      socket.off("load_comments");
      socket.off("new_comment");
    };
  }, [liveId]);

  const sendComment = (message) => {
    const socket = getSocket();
    if (!socket) return;

    socket.emit("send_comment", { liveId, message });
  };

  return { comments, sendComment };
};
