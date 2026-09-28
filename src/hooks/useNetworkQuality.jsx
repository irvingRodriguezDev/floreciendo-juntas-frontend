import { useState, useEffect } from "react";

export const useNetworkQuality = (videoRef) => {
  const [isSlowConnection, setIsSlowConnection] = useState(false);

  useEffect(() => {
    const video = videoRef?.current;
    if (!video) return;

    let bufferTimeout;

    // Se dispara cuando el reproductor se queda sin buffer y se detiene
    const handleWaiting = () => {
      // Damos 2.5s de margen antes de mostrar la alerta para no alarmar por un micro-lag
      bufferTimeout = setTimeout(() => {
        setIsSlowConnection(true);
      }, 2500);
    };

    // Se dispara cuando el video vuelve a reproducir fluidamente
    const handlePlaying = () => {
      clearTimeout(bufferTimeout);
      setIsSlowConnection(false);
    };

    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("playing", handlePlaying);

    // Detección nativa del navegador (si está disponible)
    const checkNativeConnection = () => {
      if ("connection" in navigator) {
        const conn = navigator.connection;
        if (conn?.effectiveType === "2g" || conn?.rtt > 600) {
          setIsSlowConnection(true);
        }
      }
    };

    checkNativeConnection();

    return () => {
      clearTimeout(bufferTimeout);
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("playing", handlePlaying);
    };
  }, [videoRef]);

  return { isSlowConnection, setIsSlowConnection };
};
