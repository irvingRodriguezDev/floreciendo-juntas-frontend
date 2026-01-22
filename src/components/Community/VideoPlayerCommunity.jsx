import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";

const VideoPlayerCommunity = ({ src, isActive }) => {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // 🔹 Setup video + HLS
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.setAttribute("x5-playsinline", ""); // Para WeChat/QQ browsers
    video.setAttribute("x5-video-player-type", "h5");

    const handleLoadedMetadata = () => {
      setIsLoaded(true);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    // Safari (HLS nativo)
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    }
    // Chrome / Android
    else if (Hls.isSupported()) {
      const hls = new Hls({
        lowLatencyMode: true,
        enableWorker: true,
        maxBufferLength: 10,
        maxMaxBufferLength: 20,
      });
      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsLoaded(true);
      });

      hlsRef.current = hls;
    }

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [src]);

  // 🔹 Play / pause según slide activo
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isLoaded) return;

    if (isActive) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Error de reproducción automática - ignorar
        });
      }
    } else {
      video.pause();
      video.currentTime = 0;
      video.muted = true;
      setMuted(true);
    }
  }, [isActive, isLoaded]);

  // 🔊 Toggle audio (user gesture)
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setMuted(nextMuted);
  };

  return (
    <Box
      sx={{
        position: "relative",
        cursor: "pointer",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "300px",
      }}
      onClick={toggleMute}
    >
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload='metadata'
        style={{
          width: "100%",
          height: "auto",
          minHeight: "300px",
          maxHeight: "80vh",
          objectFit: "contain",
          display: "block",
          borderRadius: "8px",
        }}
      />

      {/* 🔇 Overlay mute */}
      {muted && (
        <Box
          sx={{
            position: "absolute",
            bottom: 12,
            right: 12,
            backgroundColor: "rgba(0,0,0,0.6)",
            color: "#fff",
            borderRadius: "50%",
            px: 1,
            py: 0.5,
            fontSize: 12,
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          🔇
        </Box>
      )}
    </Box>
  );
};

export default VideoPlayerCommunity;
