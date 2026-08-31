import { useState, useEffect } from "react";

export const useLiveState = (liveStatus) => {
  const [livePhase, setLivePhase] = useState("scheduled");

  useEffect(() => {
    if (!liveStatus) return;

    if (liveStatus === "live" && livePhase !== "live") {
      setLivePhase("live");
      return;
    }

    if (liveStatus === "ended" && livePhase === "live") {
      setLivePhase("ending");
      const timer = setTimeout(() => setLivePhase("ended"), 900);
      return () => clearTimeout(timer);
    }

    if (liveStatus === "ended" && livePhase === "scheduled") {
      setLivePhase("ended");
    }
  }, [liveStatus, livePhase]);

  return livePhase;
};
