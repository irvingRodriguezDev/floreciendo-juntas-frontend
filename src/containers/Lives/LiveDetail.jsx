import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";

// Contexts & Hooks
import AuthContext from "../../context/Auth/AuthContext";
import LivesContext from "../../context/Lives/LivesContext";
import { useLiveComments } from "../../hooks/useLiveComments";
import { useIvsViewers } from "../../hooks/useIvsViewers";

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

// ─── Estilos integrados para la vista de video y Fullscreen ─────────────────
const fullscreenContainerSx = (commentsVisible) => ({
  display: "grid",
  gridTemplateColumns: { xs: "1fr", md: "3fr 1fr" },
  borderRadius: { xs: 0, sm: 4 },
  overflow: "hidden",
  bgcolor: "#000",
  position: "relative",

  // Fullscreen Estándar y Webkit
  "&:fullscreen, &:-webkit-full-screen": {
    height: "100vh",
    width: "100vw",
    borderRadius: 0,
    display: "block",
    position: "relative",
    backgroundColor: "#000",

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

    // Sidebar Flotante translúcido en pantalla completa
    "& .comments-sidebar": {
      position: "absolute",
      top: 0,
      right: commentsVisible ? 0 : "-340px",
      width: "340px",
      height: "100vh",
      zIndex: 100,
      backgroundColor: "rgba(10, 10, 10, 0.82)",
      backdropFilter: "blur(16px)",
      borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
      transition: "right 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      "@media (max-width: 768px)": {
        display: "none",
      },
    },
  },
});

const LiveDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // ── Contexts ──
  const { getLiveById, live } = useContext(LivesContext);
  const { usuario, isAuthenticating, autenticado } = useContext(AuthContext);

  // ── States ──
  const [livePhase, setLivePhase] = useState("scheduled");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [commentsVisible, setCommentsVisible] = useState(true);

  // ── Hooks de IVR Viewers & Comentarios ──
  const viewers = useIvsViewers(id, live?.aws_channel_arn);
  const { comments, sendComment } = useLiveComments(id);

  // ── Refs ──
  const containerRef = useRef(null);

  // ── Cargar live de forma segura ──
  useEffect(() => {
    if (id && (!live || String(live.id) !== String(id))) {
      getLiveById(id);
    }
  }, [id, live, getLiveById]);

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

  // ── Escuchador de Fullscreen ──
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFull = Boolean(
        document.fullscreenElement || document.webkitFullscreenElement,
      );
      setIsFullscreen(isFull);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange,
      );
    };
  }, []);

  // ── Alternar Fullscreen ──
  const handleFullscreen = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      if (el.requestFullscreen) {
        el.requestFullscreen();
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }, []);

  // ── Guard de carga inicial ──
  if (isAuthenticating || !live) {
    return (
      <PinkSpinner
        label={
          isAuthenticating
            ? "Verificando acceso..."
            : "Cargando evento en vivo..."
        }
      />
    );
  }

  // ── Datos derivados ──
  const isSubscribed = Boolean(usuario?.isSubscribed);
  const isScheduled = live.status === "scheduled";
  const isActive = live.status === "live" || live.status === "ended";

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
        {/* ── Encabezado ── */}
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
          {/* Estado: Programado */}
          {isScheduled && (
            <Box sx={{ py: 8, display: "flex", justifyContent: "center" }}>
              <LiveCountdown startTime={live.start_time} />
            </Box>
          )}

          {/* Estado: En Vivo o Finalizado */}
          {isActive && (
            <Box ref={containerRef} sx={fullscreenContainerSx(commentsVisible)}>
              {/* Columna Player de Video */}
              <Box
                className='player-col'
                sx={{ position: "relative", width: "100%" }}
              >
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
                  />
                </motion.div>

                {/* Bloqueo para no suscriptoras */}
                {live.status === "live" && (!autenticado || !isSubscribed) && (
                  <LiveBlocked autenticado={autenticado} usuario={usuario} />
                )}

                {/* Overlay al finalizar transmisión */}
                <AnimatePresence>
                  {(livePhase === "ending" || livePhase === "ended") && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{
                        position: "absolute",
                        inset: 0,
                        zIndex: 1000,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgba(0, 0, 0, 0.75)",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      <LiveEndedOverlay onGoHome={() => navigate("/lives")} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Box>

              {/* Sidebar de comentarios */}
              <Box className='comments-sidebar'>
                <LiveCommentsSidebar
                  liveId={live.id}
                  comments={comments}
                  sendComment={sendComment}
                />
              </Box>
            </Box>
          )}
        </Box>

        {/* ── Detalles e Información adicional ── */}
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
