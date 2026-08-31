import { useEffect, useRef, useState, useCallback } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css";

export const useIvsLivePlayer = (playbackUrl) => {
  const videoRef = useRef(null);
  const ivsPlayerRef = useRef(null);
  const plyrRef = useRef(null);
  const bufferTimeoutRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [videoOrientation, setVideoOrientation] = useState("landscape");
  const [isSlowConnection, setIsSlowConnection] = useState(false);

  // Auxiliar para limpiar el timer de conexión lenta
  const clearBufferTimer = () => {
    if (bufferTimeoutRef.current) {
      clearTimeout(bufferTimeoutRef.current);
      bufferTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    let timerId = null;

    const initPlayer = () => {
      if (!window.IVSPlayer || !videoRef.current || !playbackUrl) return;

      try {
        // Si ya existía una instancia previa, la limpiamos antes de crear una nueva
        if (ivsPlayerRef.current) {
          ivsPlayerRef.current.delete();
        }

        const ivsPlayer = window.IVSPlayer.create();
        ivsPlayerRef.current = ivsPlayer;

        ivsPlayer.attachHTMLVideoElement(videoRef.current);
        ivsPlayer.load(playbackUrl);

        ivsPlayer.setMuted(true);
        ivsPlayer.setVolume(1.0);
        ivsPlayer.play();

        const { PlayerState, PlayerEventType } = window.IVSPlayer;

        // Detectar cambio de calidad para ajustar la orientación (Portrait vs Landscape)
        const updateOrientation = () => {
          const quality = ivsPlayer.getQuality();
          if (quality && quality.height && quality.width) {
            setVideoOrientation(
              quality.height > quality.width ? "portrait" : "landscape",
            );
          }
        };

        ivsPlayer.addEventListener(
          PlayerEventType.QUALITY_CHANGED,
          updateOrientation,
        );

        // Control de buffering sin acumular timers
        ivsPlayer.addEventListener(PlayerState.BUFFERING, () => {
          clearBufferTimer();
          bufferTimeoutRef.current = setTimeout(() => {
            setIsSlowConnection(true);
          }, 3000);
        });

        ivsPlayer.addEventListener(PlayerState.PLAYING, () => {
          clearBufferTimer();
          setIsSlowConnection(false);
          updateOrientation();
        });

        ivsPlayer.addEventListener(PlayerEventType.ERROR, (err) => {
          console.warn("IVS Network/Playback Error:", err);
          setIsSlowConnection(true);

          // Si el error es recuperable, intenta auto-reproducir
          if (err?.type === "ErrorMasterPlaylist" || err?.code === 2) {
            setTimeout(() => {
              if (ivsPlayerRef.current) {
                ivsPlayerRef.current.load(playbackUrl);
                ivsPlayerRef.current.play();
              }
            }, 2000);
          }
        });

        // Plyr únicamente como wrapper de controles UI limpios
        if (!plyrRef.current) {
          plyrRef.current = new Plyr(videoRef.current, {
            controls: [],
            autoplay: true,
            clickToPlay: false,
          });
        }

        setLoading(false);
      } catch (err) {
        console.error("IVS Player initialization error:", err);
      }
    };

    timerId = setTimeout(initPlayer, 300);

    return () => {
      clearTimeout(timerId);
      clearBufferTimer();

      if (plyrRef.current) {
        plyrRef.current.destroy();
        plyrRef.current = null;
      }

      if (ivsPlayerRef.current) {
        ivsPlayerRef.current.pause();
        ivsPlayerRef.current.delete();
        ivsPlayerRef.current = null;
      }
    };
  }, [playbackUrl]);

  // Recarga optimizada para forzar salto al Live Edge
  const handleReloadPlayer = useCallback(() => {
    const player = ivsPlayerRef.current;
    if (player && playbackUrl) {
      clearBufferTimer();
      setIsSlowConnection(false);

      try {
        player.load(playbackUrl);
        const playPromise = player.play();

        // Verificar si playPromise es una Promesa antes de encadenar .catch()
        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch((err) => {
            console.warn("Autoplay bloqueado o interrupción al recargar:", err);
          });
        }
      } catch (err) {
        console.warn(
          "Excepción capturada al recargar el reproductor IVS:",
          err,
        );
      }
    }
  }, [playbackUrl]);

  return {
    videoRef,
    ivsPlayerRef,
    loading,
    videoOrientation,
    isSlowConnection,
    handleReloadPlayer,
  };
};
