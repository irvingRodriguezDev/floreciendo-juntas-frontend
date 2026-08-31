import React, { useContext, useEffect, useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";

// Contexts & Hooks
import AuthContext from "../../context/Auth/AuthContext";
import LivesContext from "../../context/Lives/LivesContext";
import { useLiveComments } from "../../hooks/useLiveComments";
import { useIvsViewers } from "../../hooks/useIvsViewers";
import { useLiveState } from "../../hooks/useLiveState";
import { useFullscreenHandler } from "../../hooks/useFullscreenHandler";

// Components
import Layout from "../../components/Layout/Layout";
import PinkSpinner from "../../components/Loading/PinkSpinner";
import PlayerCliente from "./PlayerClient";
import LiveCountdown from "../../components/lives/Counter";
import LiveHeader from "../../components/lives/LiveHeader";
import LiveInfoCard from "../../components/lives/LiveInfoCard";
import LiveBlocked from "../../components/lives/LiveBlocked";
import LiveEndedOverlayContainer from "../../components/lives/LiveEndedOverlayContainer";
import ChatBlockedState from "../../components/lives/ChatBlockedState";
import LiveCommentsSidebar from "./LiveCommentsSidebar";
const videoVariants = {
  live: { scale: 1, filter: "blur(0px)" },
  ending: {
    scale: 1.05,
    filter: "blur(15px) brightness(0.7)",
    transition: { duration: 0.8 },
  },
  ended: { scale: 1.05, filter: "blur(20px) brightness(0.5)" },
};

const fullscreenContainerSx = (commentsVisible, isLiveActive) => ({
  display: "grid",
  // 🎯 Si el live NO está activo (finalizó), obligamos a 1 sola columna ("1fr")
  gridTemplateColumns: isLiveActive
    ? { xs: "1fr", md: commentsVisible ? "3fr 1fr" : "1fr" }
    : "1fr",
  borderRadius: { xs: 0, sm: 4 },
  overflow: "hidden",
  bgcolor: "#000",
  position: "relative",
  border: "1px solid rgba(255,255,255,0.08)",
  transition: "grid-template-columns 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

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

  // ── Contexts ──
  const { getLiveById, live } = useContext(LivesContext);
  const { usuario, isAuthenticating, autenticado } = useContext(AuthContext);

  // ── Custom Hooks ──
  const { containerRef, isFullscreen, handleFullscreen } =
    useFullscreenHandler();
  const livePhase = useLiveState(live?.status);
  const [commentsVisible, setCommentsVisible] = useState(true);

  // ── IVS Viewers & Comentarios ──
  const viewers = useIvsViewers(id, live?.aws_channel_arn);
  const tokenAuth = localStorage.getItem("token");
  const { comments, sendComment, isConnected } = useLiveComments(
    live?.id,
    live?.chatRoomArn || import.meta.env.VITE_AWS_IVS_CHAT_ROOM_ARN,
    tokenAuth,
  );

  // ── Fetch Inicial ──
  useEffect(() => {
    if (id && (!live || String(live.id) !== String(id))) {
      getLiveById(id);
    }
  }, [id, live, getLiveById]);

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
        {/* Encabezado */}
        <Box sx={{ px: { xs: 2, sm: 0 }, mt: { xs: 2, sm: 0 } }}>
          <LiveHeader live={live} onFullscreen={handleFullscreen} />
        </Box>

        {/* Reproductor / Contenido Principal */}
        <Box
          sx={{
            mt: { xs: 2, sm: 3 },
            width: "100%",
            borderRadius: { xs: 0, sm: 4 },
            overflow: "hidden",
          }}
        >
          {isScheduled && (
            <Box sx={{ py: 8, display: "flex", justifyContent: "center" }}>
              <LiveCountdown startTime={live.start_time} />
            </Box>
          )}

          {isActive && (
            <Box
              ref={containerRef}
              sx={fullscreenContainerSx(commentsVisible, livePhase === "live")}
            >
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

                {/* Paywall Overlay */}
                {live.status === "live" && (!autenticado || !isSubscribed) && (
                  <LiveBlocked autenticado={autenticado} usuario={usuario} />
                )}

                {/* Overlay transmisión finalizada */}
                <LiveEndedOverlayContainer
                  livePhase={livePhase}
                  onGoHome={() => navigate("/lives")}
                />
              </Box>

              {/* Sidebar de comentarios o Paywall State */}
              {livePhase === "live" && (
                <Box className='comments-sidebar'>
                  {!autenticado || !isSubscribed ? (
                    <ChatBlockedState autenticado={autenticado} />
                  ) : (
                    <LiveCommentsSidebar
                      liveId={live.id}
                      comments={comments}
                      sendComment={sendComment}
                      isConnected={isConnected}
                      isFullscreen={isFullscreen}
                      commentsVisible={commentsVisible}
                    />
                  )}
                </Box>
              )}
            </Box>
          )}
        </Box>

        {/* Información adicional */}
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
