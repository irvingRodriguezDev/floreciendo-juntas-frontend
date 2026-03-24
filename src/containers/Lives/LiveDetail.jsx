import React, { useContext, useEffect, useState, useRef } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";

// Contexts & Hooks
import AuthContext from "../../context/Auth/AuthContext";
import LivesContext from "../../context/Lives/LivesContext";
import { useLiveComments } from "../../hooks/useLiveComments";

// Components
import Layout from "../../components/Layout/Layout";
import PinkSpinner from "../../components/Loading/PinkSpinner";
import PlayerCliente from "./PlayerClient";
import LiveCountdown from "../../components/lives/Counter";
import LiveEndedOverlay from "../../components/lives/LiveEndedOverlay";
import LiveHeader from "../../components/lives/LiveHeader";
import LiveInfoCard from "../../components/lives/LiveInfoCard";
import LiveBlocked from "../../components/lives/LiveBlocked";
import LiveCommentsSidebar from "./LiveCommentsSidebar";

// ─── Variantes de animación del player ───────────────────────────────────────
const videoVariants = {
  live: { scale: 1, filter: "blur(0px)" },
  ending: {
    scale: 1.05,
    filter: "blur(15px) brightness(0.7)",
    transition: { duration: 0.8 },
  },
  ended: { scale: 1.05, filter: "blur(20px) brightness(0.5)" },
};

// ─── Estilos del contenedor fullscreen ───────────────────────────────────────
const fullscreenGridSx = {
  "&:fullscreen": {
    height: "100vh",
    width: "100vw",
    borderRadius: 0,
    gridTemplateColumns: "3fr 1fr",
    "& .player-col": {
      height: "100vh",
      display: "flex",
      flexDirection: "column",
    },
    "& .player-motion": {
      flex: 1,
      height: "100%",
      "& > div": { height: "100%" }, // Box interno de PlayerCliente
    },
    "& video": {
      objectFit: "cover",
      height: "100% !important",
      aspectRatio: "unset !important",
    },
  },
  "&:-webkit-full-screen": {
    height: "100vh",
    width: "100vw",
    borderRadius: 0,
    gridTemplateColumns: "3fr 1fr",
    "& .player-col": {
      height: "100vh",
      display: "flex",
      flexDirection: "column",
    },
    "& .player-motion": {
      flex: 1,
      height: "100%",
      "& > div": { height: "100%" },
    },
    "& video": {
      objectFit: "cover",
      height: "100% !important",
      aspectRatio: "unset !important",
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────

const LiveDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // ── Contexts ──
  const { getLiveById, live } = useContext(LivesContext);
  const { usuario, isAuthenticating, autenticado } = useContext(AuthContext);

  // ── State ──
  const [livePhase, setLivePhase] = useState("scheduled");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [commentsVisible, setCommentsVisible] = useState(true);

  const handleClickHiddenComments = () => {
    setCommentsVisible(false);
  };
  const handleClickShowComments = () => {
    setCommentsVisible(true);
  };
  // ── Refs ──
  const containerRef = useRef(null);
  useEffect(() => {
    console.log("commentsVisible cambió a:", commentsVisible);
  }, [commentsVisible]);

  // ── Cargar live ──
  useEffect(() => {
    if (id && (!live || live.id !== id)) {
      getLiveById(id);
    }
  }, [id, live?.id]);

  // ── Máquina de estados del live ──
  useEffect(() => {
    if (!live?.status) return;

    if (live.status === "live" && livePhase !== "live") {
      setLivePhase("live");
      return;
    }

    if (live.status === "ended" && livePhase === "live") {
      setLivePhase("ending");
      const timer = setTimeout(() => setLivePhase("ended"), 900);
      return () => clearTimeout(timer);
    }

    if (live.status === "ended" && livePhase === "scheduled") {
      setLivePhase("ended");
    }
  }, [live?.status, livePhase]);

  // ── Listener fullscreen ──
  useEffect(() => {
    const handler = () => {
      setIsFullscreen(
        !!(document.fullscreenElement || document.webkitFullscreenElement),
      );
    };
    document.addEventListener("fullscreenchange", handler);
    document.addEventListener("webkitfullscreenchange", handler);
    return () => {
      document.removeEventListener("fullscreenchange", handler);
      document.removeEventListener("webkitfullscreenchange", handler);
    };
  }, []);

  // ── Comentarios ──
  const { comments, sendComment, viewers, appViewers } = useLiveComments(id);

  // ── Acciones ──
  const handleFullscreen = () => {
    const el = containerRef.current;
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      el?.requestFullscreen?.() ?? el?.webkitRequestFullscreen?.();
    } else {
      document.exitFullscreen?.() ?? document.webkitExitFullscreen?.();
    }
  };

  // ── Guard de carga ──
  if (isAuthenticating || !live) {
    return (
      <PinkSpinner
        label={isAuthenticating ? "Verificando acceso..." : "Cargando live..."}
      />
    );
  }

  // ── Derivados ──
  const isSubscribed = Boolean(usuario?.isSubscribed);
  const isScheduled = live.status === "scheduled";
  const isActive = live.status === "live" || live.status === "ended";

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <Layout>
      <Box
        sx={{
          maxWidth: "xl",
          mx: "auto",
          px: { xs: 0, sm: 3 },
          py: { xs: 0, sm: 2 },
        }}
      >
        {/* ── Header ── */}
        <Box sx={{ px: { xs: 2, sm: 0 }, mt: { xs: 2, sm: 0 } }}>
          <LiveHeader live={live} onFullscreen={handleFullscreen} />
        </Box>

        {/* ── Área principal ── */}
        <Box
          sx={{
            mt: { xs: 2, sm: 3 },
            width: "100%",
            borderRadius: { xs: 0, sm: 4 },
            overflow: "hidden",
          }}
        >
          {/* Estado: programado */}
          {isScheduled && (
            <Box sx={{ py: 8, display: "flex", justifyContent: "center" }}>
              <LiveCountdown startTime={live.start_time} />
            </Box>
          )}

          {/* Estado: en vivo o finalizado */}
          {isActive && (
            <Box
              ref={containerRef}
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "3fr 1fr" },
                borderRadius: { xs: 0, sm: 4 },
                overflow: "hidden",
                bgcolor: "#000",

                // Fullscreen: video ocupa TODO, comentarios flotan encima a la derecha
                "&:fullscreen": {
                  height: "100vh",
                  width: "100vw",
                  borderRadius: 0,
                  display: "block", // ← deja de ser grid, el player ocupa todo
                  position: "relative",

                  // Columna del player ocupa todo
                  "& .player-col": {
                    width: "100%",
                    height: "100vh",
                  },
                  "& .player-motion": {
                    height: "100%",
                    "& > div": { height: "100%" },
                  },
                  "& video": {
                    objectFit: "cover",
                    height: "100vh !important",
                    aspectRatio: "unset !important",
                  },

                  // Sidebar flota sobre el video
                  "& .comments-sidebar": {
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "320px",
                    height: "100vh",
                    zIndex: 100,
                    bgcolor: "rgba(10,10,10,0.75)",
                    backdropFilter: "blur(12px)",
                    borderLeft: "1px solid rgba(255,255,255,0.08)",
                    // En mobile se oculta
                    "@media (max-width: 768px)": {
                      display: "none",
                    },
                  },
                },

                "&:-webkit-full-screen": {
                  height: "100vh",
                  width: "100vw",
                  borderRadius: 0,
                  display: "block",
                  position: "relative",
                  "& .player-col": { width: "100%", height: "100vh" },
                  "& .player-motion": {
                    height: "100%",
                    "& > div": { height: "100%" },
                  },
                  "& video": {
                    objectFit: "cover",
                    height: "100vh !important",
                    aspectRatio: "unset !important",
                  },
                  "& .comments-sidebar": {
                    position: "absolute",
                    top: 0,
                    right: commentsVisible ? 0 : "-320px",
                    width: "320px",
                    height: "100vh",
                    zIndex: 100,
                    bgcolor: "rgba(10,10,10,0.75)",
                    backdropFilter: "blur(12px)",
                    "@media (max-width: 768px)": { display: "none" },
                  },
                },
              }}
            >
              {/* Columna izquierda: player */}
              <Box className='player-col' sx={{ position: "relative" }}>
                <motion.div
                  className='player-motion'
                  animate={livePhase}
                  variants={videoVariants}
                >
                  <PlayerCliente
                    usuario={usuario}
                    liveId={live.id}
                    playbackUrl={live.aws_playback_url}
                    commentsVisible={commentsVisible}
                    isFullscreen={isFullscreen}
                    onFullscreen={handleFullscreen}
                    onToggleComments={() => setCommentsVisible((prev) => !prev)}
                    viewers={viewers}
                    appViewers={appViewers}
                  />
                </motion.div>

                {/* Bloqueo para no suscritos */}
                {live.status === "live" && (!autenticado || !isSubscribed) && (
                  <LiveBlocked autenticado={autenticado} usuario={usuario} />
                )}

                {/* Overlay de finalización */}
                <AnimatePresence>
                  {(livePhase === "ending" || livePhase === "ended") && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{
                        position: "absolute",
                        inset: 0,
                        zIndex: 10000,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgba(0,0,0,0.6)",
                      }}
                    >
                      <LiveEndedOverlay onGoHome={() => navigate("/lives")} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Box>

              {/* Columna derecha: comentarios */}

              <LiveCommentsSidebar
                liveId={live.id}
                comments={comments}
                sendComment={sendComment} // ← bug fix: faltaba ={sendComment}
              />
            </Box>
          )}
        </Box>

        {/* ── Info extra ── */}
        <Box sx={{ mt: 4, px: { xs: 2, sm: 0 }, pb: 4 }}>
          <LiveInfoCard
            title='Qué aprenderás en este live'
            html={live.description}
          />
        </Box>
      </Box>
    </Layout>
  );
};

export default LiveDetalle;
