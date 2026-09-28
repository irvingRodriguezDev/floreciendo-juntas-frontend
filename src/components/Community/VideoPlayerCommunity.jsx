import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

const VideoPlayerCommunity = ({ src, isActive }) => {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Setup video + HLS
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.setAttribute("x5-playsinline", "");
    video.setAttribute("x5-video-player-type", "h5");

    const handleLoadedMetadata = () => {
      setIsLoaded(true);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    } else if (Hls.isSupported()) {
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

  // Reproducción por slide activo
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isLoaded) return;

    if (isActive) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else {
      video.pause();
      video.currentTime = 0;
      video.muted = true;
      setMuted(true);
    }
  }, [isActive, isLoaded]);

  // Toggle de Mute
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
        borderRadius: "14px",
        overflow: "hidden",
        backgroundColor: "#000000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
          maxHeight: "75vh",
          objectFit: "contain",
          display: "block",
        }}
      />

      {/* Indicador de Audio */}
      <Box
        sx={{
          position: "absolute",
          bottom: 12,
          right: 12,
          backgroundColor: "rgba(0, 0, 0, 0.65)",
          color: "#FFFFFF",
          borderRadius: "50%",
          p: 0.8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          transition: "transform 0.15s ease",
        }}
      >
        {muted ? (
          <VolumeOffIcon sx={{ fontSize: 18 }} />
        ) : (
          <VolumeUpIcon sx={{ fontSize: 18 }} />
        )}
      </Box>
    </Box>
  );
};

export default VideoPlayerCommunity;
