import React, { useEffect, useRef, useState, useCallback } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import PeopleIcon from "@mui/icons-material/People";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import SyncIcon from "@mui/icons-material/Sync";
import { getSocket } from "../../socket";

const PlayerCliente = ({
  playbackUrl,
  liveId,
  isFullscreen,
  onFullscreen,
  commentsVisible,
  onToggleComments,
  viewers,
}) => {
  const videoRef = useRef(null);
  const ivsPlayerRef = useRef(null);
  const reconnectIntervalRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [isReconnecting, setIsReconnecting] = useState(false);
  const [videoOrientation, setVideoOrientation] = useState("landscape");
  const [muted, setMuted] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // ── Función para forzar recarga del manifiesto HLS ───────────────────────
  const reloadStream = useCallback(() => {
    const player = ivsPlayerRef.current;
    if (!player || !playbackUrl) return;

    try {
      console.log("🔄 Re-cargando manifiesto IVS...");
      player.load(playbackUrl);
      player.play();
    } catch (err) {
      console.error("❌ Error recargando IVS Stream:", err);
    }
  }, [playbackUrl]);

  // ── Iniciar/Detener reintentos continuos de HLS ──────────────────────────
  const startHlsReconnectionLoop = useCallback(() => {
    if (reconnectIntervalRef.current) return;

    setIsReconnecting(true);
    // Intenta recargar el manifiesto HLS cada 5 segundos hasta que el stream vuelva
    reconnectIntervalRef.current = setInterval(() => {
      reloadStream();
    }, 5000);
  }, [reloadStream]);

  const stopHlsReconnectionLoop = useCallback(() => {
    if (reconnectIntervalRef.current) {
      clearInterval(reconnectIntervalRef.current);
      reconnectIntervalRef.current = null;
    }
    setIsReconnecting(false);
  }, []);

  // ── Escucha de Sockets (live_reconnecting / live_reconnected) ───────────
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleReconnecting = (data) => {
      if (String(data?.liveId) === String(liveId)) {
        console.warn("⚠️ Evento Socket: Transmisión reconectando...");
        startHlsReconnectionLoop();
      }
    };

    const handleReconnected = (data) => {
      if (String(data?.liveId) === String(liveId)) {
        console.log("✅ Evento Socket: Transmisión reanudada.");
        stopHlsReconnectionLoop();
        reloadStream();
      }
    };

    socket.on("live_reconnecting", handleReconnecting);
    socket.on("live_reconnected", handleReconnected);

    return () => {
      socket.off("live_reconnecting", handleReconnecting);
      socket.off("live_reconnected", handleReconnected);
    };
  }, [liveId, startHlsReconnectionLoop, stopHlsReconnectionLoop, reloadStream]);

  // ── IVS + Plyr Setup ────────────────────────────────────────────────────
  useEffect(() => {
    let plyrPlayer = null;

    const initPlayer = () => {
      if (!window.IVSPlayer || !videoRef.current) return;
      try {
        const { PlayerState, PlayerEventType } = window.IVSPlayer;
        const ivsPlayer = window.IVSPlayer.create();
        ivsPlayerRef.current = ivsPlayer;

        ivsPlayer.attachHTMLVideoElement(videoRef.current);
        ivsPlayer.load(playbackUrl);
        ivsPlayer.setMuted(false);
        ivsPlayer.setVolume(1.0);
        ivsPlayer.play();

        // Detectar orientación del video
        ivsPlayer.addEventListener(PlayerEventType.INITIALIZED, () => {
          const quality = ivsPlayer.getQuality();
          if (quality) {
            setVideoOrientation(
              quality.height > quality.width ? "portrait" : "landscape"
            );
          }
        });

        // Manejo de eventos de salud / estado del reproductor IVS
        ivsPlayer.addEventListener(PlayerEventType.STATE_CHANGED, (state) => {
          if (state === PlayerState.PLAYING) {
            // Si el video volvió a reproducirse correctamente, cancelamos el loop de reintento
            stopHlsReconnectionLoop();
          } else if (state === PlayerState.ENDED) {
            // El reproductor llegó al final del stream por microcorte
            startHlsReconnectionLoop();
          }
        });

        ivsPlayer.addEventListener(PlayerEventType.ERROR, (err) => {
          console.warn("⚠️ IVS Player Error:", err);
          // Errores de red o de carga del manifiesto activan la reconexión
          startHlsReconnectionLoop();
        });

        plyrPlayer = new Plyr(videoRef.current, {
          controls: [],
          autoplay: true,
          clickToPlay: false,
        });

        setLoading(false);
      } catch (err) {
        console.error("IVS Player initialization error:", err);
      }
    };

    const timer = setTimeout(initPlayer, 500);

    return () => {
      clearTimeout(timer);
      stopHlsReconnectionLoop();
      if (plyrPlayer) plyrPlayer.destroy();
      if (ivsPlayerRef.current) {
        ivsPlayerRef.current.pause();
        ivsPlayerRef.current.delete();
      }
    };
  }, [playbackUrl, startHlsReconnectionLoop, stopHlsReconnectionLoop]);

  // ── Handlers ────────────────────────────────────────────────────────────
  const toggleMute = () => {
    const player = ivsPlayerRef.current;
    if (!player) return;
    player.setMuted(!muted);
    setMuted((prev) => !prev);
  };

  const handleFullscreen = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (isMobile) {
      const video = videoRef.current;
      if (!video) return;
      if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        video.requestFullscreen?.() ?? video.webkitEnterFullscreen?.();
      } else {
        document.exitFullscreen?.() ?? document.webkitExitFullscreen?.();
      }
      return;
    }
    onFullscreen?.();
  };

  // ── Derivados ────────────────────────────────────────────────────────────
  const isPortraitMobile = isMobile && videoOrientation === "portrait";
  const isPortraitVideo = videoOrientation === "portrait";
  const boxAspectRatio = isFullscreen
    ? "unset"
    : isPortraitMobile
    ? "9/16"
    : "16/9";

  const hudBtn = {
    color: "white",
    bgcolor: "rgba(0,0,0,0.55)",
    border: "1px solid rgba(255,255,255,0.15)",
    "&:hover": { bgcolor: "rgba(0,0,0,0.75)" },
  };

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        aspectRatio: boxAspectRatio,
        height: isFullscreen ? "100vh" : "auto",
        bgcolor: "#000",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Video */}
      <div key={playbackUrl} style={{ width: "100%", height: "100%" }}>
        <video
          ref={videoRef}
          playsInline
          autoPlay
          style={{
            width: "100%",
            height: "100%",
            objectFit: isFullscreen || isPortraitMobile ? "cover" : "contain",
            transform: isPortraitVideo && isMobile ? "scale(1.7)" : "scale(1)",
            backgroundColor: "black",
          }}
        />
      </div>

      {/* ── Overlay de Reconexión (Grace Period) ── */}
      {isReconnecting && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: "rgba(0, 0, 0, 0.65)",
            backdropFilter: "blur(4px)",
            zIndex: 1300,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 1.5,
            px: 2,
            textAlign: "center",
          }}
        >
          <CircularProgress size={38} sx={{ color: "#E53888" }} />
          <Typography
            variant='body2'
            sx={{
              color: "white",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <SyncIcon
              sx={{ animation: "spin 2s linear infinite", fontSize: 18 }}
            />
            Transmisión inestable. Intentando reconectar...
          </Typography>
        </Box>
      )}

      {/* ── HUD — solo cuando cargó ── */}
      {!loading && (
        <>
          {/* Mute */}
          <Tooltip
            title={muted ? "Activar sonido" : "Silenciar"}
            placement='right'
          >
            <IconButton
              onClick={toggleMute}
              size='small'
              sx={{
                ...hudBtn,
                position: "absolute",
                top: 10,
                left: 10,
                zIndex: 1200,
              }}
            >
              {muted ? (
                <VolumeOffIcon fontSize='small' />
              ) : (
                <VolumeUpIcon fontSize='small' />
              )}
            </IconButton>
          </Tooltip>

          {/* Toggle comentarios — solo fullscreen desktop */}
          {isFullscreen && !isMobile && (
            <Tooltip
              title={
                commentsVisible ? "Ocultar comentarios" : "Mostrar comentarios"
              }
              placement='right'
            >
              <IconButton
                onClick={onToggleComments}
                size='small'
                sx={{
                  ...hudBtn,
                  position: "absolute",
                  top: 54,
                  left: 10,
                  zIndex: 1200,
                  ...(commentsVisible && {
                    bgcolor: "rgba(229,56,136,0.25)",
                    borderColor: "rgba(229,56,136,0.4)",
                  }),
                }}
              >
                {commentsVisible ? (
                  <ChatBubbleIcon sx={{ fontSize: 16 }} />
                ) : (
                  <ChatBubbleOutlineIcon sx={{ fontSize: 16 }} />
                )}
              </IconButton>
            </Tooltip>
          )}

          {/* Viewers */}
          {viewers >= 0 && (
            <Box
              sx={{
                position: "absolute",
                top: 10,
                right: 54,
                zIndex: 1250,
                display: "flex",
                alignItems: "center",
                gap: 0.75,
                px: 1.5,
                py: 0.5,
                borderRadius: "20px",
                bgcolor: "rgba(0,0,0,0.55)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <PeopleIcon
                sx={{ fontSize: 15, color: "rgba(255,255,255,0.6)" }}
              />
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  lineHeight: 1,
                }}
              >
                {viewers}
              </Typography>
            </Box>
          )}

          {/* Fullscreen */}
          <Tooltip
            title={
              isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"
            }
            placement='bottom'
          >
            <IconButton
              onClick={handleFullscreen}
              size='small'
              sx={{
                ...hudBtn,
                position: "absolute",
                top: 10,
                right: 10,
                zIndex: 1200,
              }}
            >
              {isFullscreen ? (
                <FullscreenExitIcon fontSize='small' />
              ) : (
                <FullscreenIcon fontSize='small' />
              )}
            </IconButton>
          </Tooltip>
        </>
      )}
    </Box>
  );
};

export default PlayerCliente;
