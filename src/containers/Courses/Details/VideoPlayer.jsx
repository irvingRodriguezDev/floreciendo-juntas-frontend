import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

const VideoPlayer = ({ src, poster }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
        // ✅ Safari soporta HLS nativamente
        videoRef.current.src = src;
      } else if (Hls.isSupported()) {
        // ✅ Otros navegadores (Chrome, Edge, Firefox)
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(videoRef.current);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          console.log("HLS listo para reproducirse");
        });

        return () => {
          hls.destroy();
        };
      } else {
        console.error("Tu navegador no soporta HLS");
      }
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      controls
      // muted // 👈 importante
      autoPlay // 👈 para que arranque solo
      poster={poster}
      style={{
        maxWidth: "100%",
        height: "auto",
        objectFit: "contain",
        width: "100%",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      }}
    />
  );
};

export default VideoPlayer;
