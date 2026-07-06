import React, { useEffect, useRef, useState } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  Tooltip,
} from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import PeopleIcon from "@mui/icons-material/People";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { getSocket } from "../../socket";
import MethodGet from "../../config/Service";
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

  // const [viewerCount, setViewerCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [videoOrientation, setVideoOrientation] = useState("landscape");
  const [muted, setMuted] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // ── IVS + Plyr ──────────────────────────────────────────────────────────
  useEffect(() => {
    let plyrPlayer = null;

    const initPlayer = () => {
      if (!window.IVSPlayer || !videoRef.current) return;
      try {
        const ivsPlayer = window.IVSPlayer.create();
        ivsPlayerRef.current = ivsPlayer;

        ivsPlayer.attachHTMLVideoElement(videoRef.current);
        ivsPlayer.load(playbackUrl);
        ivsPlayer.setMuted(false);
        ivsPlayer.setVolume(1.0);
        ivsPlayer.play();

        ivsPlayer.addEventListener(
          window.IVSPlayer.PlayerEventType.INITIALIZED,
          () => {
            const quality = ivsPlayer.getQuality();
            setVideoOrientation(
              quality.height > quality.width ? "portrait" : "landscape",
            );
          },
        );

        plyrPlayer = new Plyr(videoRef.current, {
          controls: [],
          autoplay: true,
          clickToPlay: false,
        });

        setLoading(false);
      } catch (err) {
        console.error("IVS Player error:", err);
      }
    };

    const timer = setTimeout(initPlayer, 500);

    return () => {
      clearTimeout(timer);
      if (plyrPlayer) plyrPlayer.destroy();
      if (ivsPlayerRef.current) {
        ivsPlayerRef.current.pause();
        ivsPlayerRef.current.delete();
      }
    };
  }, [playbackUrl]);

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

  // Cuánto espacio necesita la esquina derecha según lo que está visible
  // [fullscreen_btn=36] + gap=8 + [viewers_pill~=70] + gap=8 = ~122
  // Si además hay toggle de comentarios: + 36 + 8 = ~166
  const rightOffsetViewers = isFullscreen ? 166 : 56;

  // ── Estilos compartidos de los botones HUD ───────────────────────────────
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

      {/* ── HUD — solo cuando cargó ── */}
      {!loading && (
        <>
          {/* ── Columna izquierda (top: mute / abajo: toggle comentarios) ── */}

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

          {/* Toggle comentarios — debajo de la bocina, solo fullscreen desktop */}
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
                  top: 54, // 10 (top) + 36 (botón) + 8 (gap)
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

          {/* ── Columna derecha (viewers + fullscreen) ── */}

          {/* Viewers — esquina superior derecha */}
          {viewers >= 0 && (
            <Box
              sx={{
                position: "absolute",
                top: 10,
                right: 54, // deja espacio al botón fullscreen (36 + 8 + 10)
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

          {/* Fullscreen — esquina superior derecha */}
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
