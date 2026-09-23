import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export const VideoJSPlayer = ({
  src,
  poster,
  onReady,
  onPlay,
  onPause,
  onEnded,
}) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    // Si no hay URL de video válida aún, no instanciar
    if (!src) return;

    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");
      videoElement.classList.add(
        "vjs-big-play-centered",
        "custom-wapizima-theme",
      );
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(
        videoElement,
        {
          controls: true,
          responsive: true,
          fluid: true,
          preload: "auto",
          poster: poster,
          sources: [
            {
              src: src,
              type: "application/x-mpegURL",
            },
            {
              src: src,
              type: "application/vnd.apple.mpegurl",
            },
          ],
          controlBar: {
            children: [
              "playToggle",
              "volumePanel",
              "currentTimeDisplay",
              "timeDivider",
              "durationDisplay",
              "progressControl",
              "remainingTimeDisplay",
              "playbackRateMenuButton",
              "fullscreenToggle",
            ],
          },
          playbackRates: [0.5, 1, 1.25, 1.5, 2],
        },
        () => {
          if (onReady) onReady(player);
        },
      ));

      player.on("play", () => onPlay && onPlay());
      player.on("pause", () => onPause && onPause());
      player.on("ended", () => onEnded && onEnded());
    } else {
      // Actualización limpia cuando cambia la lección/video
      const player = playerRef.current;
      player.poster(poster || "");
      player.src([
        { src: src, type: "application/x-mpegURL" },
        { src: src, type: "application/vnd.apple.mpegurl" },
      ]);
    }
  }, [src, poster]);

  // Limpieza al desmontar el componente
  useEffect(() => {
    const player = playerRef.current;
    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div data-vjs-player style={{ width: "100%" }}>
      <style>{`
  /* 💖 TEMA WAPIZIMA / FLORECIENDO JUNTAS - DISTRIBUIDO & SIN GLASS */
  .custom-wapizima-theme {
    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
    border-radius: 12px !important;
    overflow: hidden !important;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3) !important;
  }

  /* 🔘 Botón de Play Central */
  .custom-wapizima-theme .vjs-big-play-button {
    background: linear-gradient(135deg, #d62d78 0%, #c32393 100%) !important;
    border: 2px solid #ffffff !important;
    border-radius: 50% !important;
    width: 1.6em !important;
    height: 1.6em !important;
    line-height: 1.4em !important;
    margin-top: -1.3em !important;
    margin-left: -1.3em !important;
    box-shadow: 0 8px 20px rgba(214, 45, 120, 0.5) !important;
    transition: transform 0.2s ease, box-shadow 0.2s ease !important;
  }

  .custom-wapizima-theme:hover .vjs-big-play-button {
    transform: scale(1.1) !important;
    box-shadow: 0 12px 28px rgba(214, 45, 120, 0.7) !important;
  }

  /* 📊 Barra de Control Inferior (Distribuida y Fondo Sólido/Degradado Limpio) */
  .custom-wapizima-theme .vjs-control-bar {
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !alignment;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(10, 10, 14, 0.95) 80%) !important;
    height: 4em !important;
    padding: 0 16px !important;
  }

  /* 🎚️ Barra de Progreso en la Parte Superior de la Barra de Controles */
  .custom-wapizima-theme .vjs-progress-control {
    position: absolute !important;
    top: -8px !important;
    left: 0 !important;
    right: 0 !important;
    width: 100% !important;
    height: 8px !important;
  }

  .custom-wapizima-theme .vjs-progress-holder {
    height: 4px !important;
    background-color: rgba(255, 255, 255, 0.25) !important;
    border-radius: 4px !important;
    margin: 0 !important;
    transition: height 0.2s ease !important;
  }

  .custom-wapizima-theme .vjs-progress-control:hover .vjs-progress-holder {
    height: 7px !important;
  }

  .custom-wapizima-theme .vjs-play-progress {
    background: linear-gradient(90deg, #f48fb1 0%, #d62d78 50%, #c32393 100%) !important;
    border-radius: 4px !important;
  }

  /* Indicador Circular de Progreso */
  .custom-wapizima-theme .vjs-play-progress:before {
    content: "" !important;
    width: 12px !important;
    height: 12px !important;
    background-color: #ffffff !important;
    border: 2px solid #d62d78 !important;
    border-radius: 50% !important;
    top: -3px !important;
    right: -6px !important;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5) !important;
  }

  /* 📐 Ajuste de Distribución de los Grupos de Botones */
  
  /* Grupo Izquierdo: Play/Pausa + Volumen */
  .custom-wapizima-theme .vjs-play-toggle,
  .custom-wapizima-theme .vjs-volume-panel {
    margin-right: 8px !important;
  }

  /* Grupo Central: Tiempos */
  .custom-wapizima-theme .vjs-time-control {
    font-size: 12px !important;
    font-weight: 600 !important;
    color: #ffffff !important;
    line-height: 4em !important;
    padding: 0 2px !important;
  }

  /* Separador y Muestra del Tiempo Restante/Total */
  .custom-wapizima-theme .vjs-time-divider {
    min-width: 12px !important;
    text-align: center;
  }

  /* Grupo Derecho: Velocidad + Pantalla Completa */
  .custom-wapizima-theme .vjs-playback-rate {
    margin-left: auto !important; /* Empuja los elementos siguientes a la extrema derecha */
  }

  .custom-wapizima-theme .vjs-playback-rate .vjs-playback-rate-value {
    font-weight: 700 !important;
    font-size: 12px !important;
    line-height: 3.8em !important;
    color: #ffffff !important;
  }

  /* ⚡ Estilo de Íconos y Botones */
  .custom-wapizima-theme .vjs-button > .vjs-icon-placeholder:before {
    color: #ffffff !important;
    font-size: 20px !important;
    line-height: 2.2 !important;
    transition: color 0.15s ease, transform 0.15s ease !important;
  }

  .custom-wapizima-theme .vjs-button:hover > .vjs-icon-placeholder:before,
  .custom-wapizima-theme .vjs-playback-rate:hover .vjs-playback-rate-value {
    color: #f48fb1 !important;
    transform: scale(1.1);
  }

  /* 📜 Menús Desplegables de Velocidad (Fondo Oscuro Sólido) */
  .custom-wapizima-theme .vjs-menu-button-popup .vjs-menu .vjs-menu-content {
    background: #d7c2d021 !important;
    width: 50px !important;
    border: 1px solid rgba(255, 255, 255, 0.15) !important;
    border-radius: 8px !important;
    padding: 2px !important;
    bottom: 1.5em !important;
    font-size: 12px !important;
    font-weight: 900 !important;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6) !important;
  }

  .custom-wapizima-theme .vjs-menu-item {
    border-radius: 4px !important;
    font-weight: 600 !important;
    font-size: 12px !important;
    padding: 8px 12px !important;
    color: #e0e0e0 !important;
  }

  .custom-wapizima-theme .vjs-menu-item:hover,
  .custom-wapizima-theme .vjs-menu-item.vjs-selected {
    background: #d62d78 !important;
    color: #ffffff !important;
  }

  /* 🔊 Control de Volumen Horizontal */
  .custom-wapizima-theme .vjs-volume-bar.vjs-slider-horizontal {
        margin-top: 20px !important;
    height: 5px !important;
    border-radius: 5px !important;
    background-color: rgba(255, 255, 255, 0.3) !important;
  }

  .custom-wapizima-theme .vjs-volume-level {
    background: #d62d78 !important;
    height: 100% !important;
    border-radius: 5px !important;
  }
`}</style>
      <div ref={videoRef} />
    </div>
  );
};

export default VideoJSPlayer;
