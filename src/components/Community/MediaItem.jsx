import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useMediaReady } from "../../hooks/useMediaReady";

const MediaItem = ({ item, index }) => {
  const ready = useMediaReady(item.url, item.type);
  const videoRef = useRef(null);
  const [isActive, setIsActive] = useState(index === 0);
  const [unmuted, setUnmuted] = useState(false);

  // Escuchar cambio de slide
  useEffect(() => {
    const handler = (e) => {
      setIsActive(e.detail === index);
    };
    window.addEventListener("slideChange", handler);
    return () => window.removeEventListener("slideChange", handler);
  }, [index]);

  // Control real de reproducción (Safari-safe)
  useEffect(() => {
    if (item.type !== "video" || !videoRef.current) return;

    const video = videoRef.current;

    video.muted = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    if (isActive) {
      const p = video.play();
      if (p) p.catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isActive, item.type]);

  if (!ready) return null;

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setUnmuted(!video.muted);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {item.type === "image" ? (
        <Box
          component='img'
          src={item.url}
          alt=''
          sx={{
            width: "100%",
            height: "auto",
            display: "block",
            objectFit: "contain",
            imageOrientation: "from-image",
            borderRadius: 2,
          }}
        />
      ) : (
        <Box
          sx={{ position: "relative", cursor: "pointer" }}
          onClick={toggleMute}
        >
          <Box
            component='video'
            ref={videoRef}
            src={item.url}
            loop
            muted
            playsInline
            preload='metadata'
            controls={false}
            sx={{
              width: "100%",
              height: "auto",
              display: "block",
              objectFit: "contain",
              borderRadius: 2,
              pointerEvents: "none", // swipe SIEMPRE fluido
            }}
          />

          {!unmuted && (
            <Box
              sx={{
                position: "absolute",
                bottom: 12,
                right: 12,
                backgroundColor: "rgba(0,0,0,0.6)",
                color: "#fff",
                borderRadius: "50%",
                p: 1,
                fontSize: 12,
              }}
            >
              🔇
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default MediaItem;
