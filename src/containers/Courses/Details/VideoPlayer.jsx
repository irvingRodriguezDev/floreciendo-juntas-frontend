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
          videoRef.current.play();
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
      // poster={poster}
      style={{
        // 1. Establecer el tamaño fijo deseado para el contenedor y el póster
        maxWidth: "100%", // Limita el ancho máximo a 600px
        height: "auto", // Fija la altura a 300px
        objectFit: "contain", // Muestra toda la imagen del póster, manteniendo su relación de aspecto.
        width: "100%", // Permite que sea responsivo hasta 600px
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      }}
    />
  );
};

export default VideoPlayer;
