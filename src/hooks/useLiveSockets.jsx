import { useEffect, useState } from "react";
import { getSocket } from "../socket";

export const useLiveSockets = (id, initialStatus) => {
  const [livePhase, setLivePhase] = useState(initialStatus || "scheduled");

  // Actualizar la fase si el status inicial cambia desde la DB
  useEffect(() => {
    if (!initialStatus) return;
    if (initialStatus === "live" && livePhase !== "live") {
      setLivePhase("live");
    } else if (initialStatus === "ended" && livePhase !== "ended") {
      setLivePhase("ended");
    }
  }, [initialStatus, livePhase]);

  // Manejo de eventos en tiempo real
  useEffect(() => {
    const socket = getSocket();
    if (!socket || !id) return;

    socket.emit("join_room", { room: `live_${id}` });

    const handleLiveStarted = (data) => {
      if (String(data?.liveId) === String(id)) {
        setLivePhase("live");
      }
    };

    const handleLiveReconnecting = (data) => {
      if (String(data?.liveId) === String(id)) {
        setLivePhase("reconnecting");
      }
    };

    const handleLiveEnded = (data) => {
      if (String(data?.liveId) === String(id)) {
        setLivePhase("ending");
        setTimeout(() => setLivePhase("ended"), 900);
      }
    };

    const handleLiveError = (data) => {
      if (String(data?.liveId) === String(id)) {
        setLivePhase("ending");
        setTimeout(() => setLivePhase("ended"), 900);
      }
    };

    socket.on("live_started", handleLiveStarted);
    socket.on("live_reconnecting", handleLiveReconnecting);
    socket.on("live_ended", handleLiveEnded);
    socket.on("live_error", handleLiveError);

    return () => {
      socket.emit("leave_room", { room: `live_${id}` });
      socket.off("live_started", handleLiveStarted);
      socket.off("live_reconnecting", handleLiveReconnecting);
      socket.off("live_ended", handleLiveEnded);
      socket.off("live_error", handleLiveError);
    };
  }, [id]);

  return livePhase;
};
