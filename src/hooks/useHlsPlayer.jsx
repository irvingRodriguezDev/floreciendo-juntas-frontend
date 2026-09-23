import { useEffect, useRef } from "react";
import Hls from "hls.js";

export const useHlsPlayer = (src) => {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const currentSrcRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    // 🛑 1. Previene re-instanciar HLS si el src no ha cambiado
    if (currentSrcRef.current === src && hlsRef.current) {
      return;
    }

    currentSrcRef.current = src;

    // Si cambió el video (ej. avanzaste de clase), destruye la instancia previa
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    // 🍏 Safari (HLS Nativo)
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      return;
    }

    // 🌐 Chrome / Edge / Firefox (HLS.js via MSE)
    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: false,
        backBufferLength: 30,
        maxBufferLength: 60,
        maxMaxBufferLength: 120,
        forceKeyFrameOnDiscontinuity: true,
      });

      hls.loadSource(src);
      hls.attachMedia(video);
      hlsRef.current = hls;

      // 🛡️ Manejo de errores para evitar que Chromium aborte el stream
      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.warn("⚠️ Error de red en HLS, reintentando...");
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.warn(
                "⚠️ Error de renderizado en Chromium, recuperando buffer...",
              );
              hls.recoverMediaError();
              break;
            default:
              console.error("❌ Error fatal HLS no recuperable:", data);
              hls.destroy();
              break;
          }
        }
      });
    }

    return () => {
      // Limpieza unicamente cuando el componente se desmonta por completo
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
        currentSrcRef.current = null;
      }
    };
  }, [src]);

  return videoRef;
};
