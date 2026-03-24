import { useEffect, useState } from "react";
import { getSocket } from "../socket";

export const useLiveComments = (liveId) => {
  const [comments, setComments] = useState([]);
  const [viewers, setViewers] = useState(0);
  const [appViewers, setAppViewers] = useState(0);
  const [health, setHealth] = useState(null);

  useEffect(() => {
    const socket = getSocket();
    if (!socket || !liveId) return;

    socket.emit("join-live", liveId);

    // ── Comentarios ────────────────────────────────
    const handleLoad = (initialComments = []) => {
      setComments(initialComments.slice(-19));
    };

    const handleNew = (comment) => {
      setComments((prev) => {
        const exists = prev.some((c) => c.id === comment.id);
        if (exists) return prev;
        return [...prev, comment].slice(-19);
      });
    };

    // ── Viewers ────────────────────────────────────
    const handleViewerCount = (data) => {
      if (String(data.liveId) !== String(liveId)) return;
      setViewers(data.viewers);
      setHealth(data.health ?? null);
    };

    const handleAppViewers = (data) => {
      if (String(data.liveId) !== String(liveId)) return;
      setAppViewers(data.count);
    };

    // ── Reconexión ─────────────────────────────────
    const handleReconnect = () => {
      socket.emit("join-live", liveId);
    };

    socket.on("load_comments", handleLoad);
    socket.on("new_comment", handleNew);
    socket.on("live_viewer_count", handleViewerCount);
    socket.on("live_app_viewers", handleAppViewers);
    socket.on("connect", handleReconnect);

    return () => {
      socket.emit("leave-live", liveId);
      socket.off("load_comments", handleLoad);
      socket.off("new_comment", handleNew);
      socket.off("live_viewer_count", handleViewerCount);
      socket.off("live_app_viewers", handleAppViewers);
      socket.off("connect", handleReconnect);
    };
  }, [liveId]);

  const sendComment = (message) => {
    const socket = getSocket();
    if (!socket || !message?.trim()) return;

    socket.emit("send_comment", { liveId, message: message.trim() }, (ack) => {
      if (!ack?.ok) console.warn("❌ Comentario no enviado");
    });
  };

  return { comments, sendComment, viewers, appViewers, health };
};
