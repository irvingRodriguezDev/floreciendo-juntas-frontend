import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import WifiOffRoundedIcon from "@mui/icons-material/WifiOffRounded";

import DetailsInfoLive from "./DetailsInfoLive";
import MutedOptions from "./MutedOptions";
import AlertNetwordConnection from "./AlertNetwordConnection";
import ToggleCommentsBtn from "./ToggleCommentsBtn";
import { useIvsLivePlayer } from "../../hooks/useIvsLivePlayer";

const COMMENTS_DRAWER_WIDTH = 340;

const hudBtnStyle = {
  color: "#FFF",
  bgcolor: "rgba(15, 23, 42, 0.65)",
  backdropFilter: "blur(8px)",
  border: "1px solid rgba(255, 255, 255, 0.18)",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    bgcolor: "rgba(15, 23, 42, 0.85)",
    transform: "scale(1.05)",
  },
};

const PlayerCliente = ({
  playbackUrl,
  liveId,
  isFullscreen,
  onFullscreen,
  commentsVisible,
  onToggleComments,
  viewers,
  isReconnecting = false, // Prop para sincronizar con la fase reconnecting de LiveDetalle
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [muted, setMuted] = useState(true);
  const [showMuteNotice, setShowMuteNotice] = useState(true);
  const muteTimerRef = useRef(null);

  const {
    videoRef,
    ivsPlayerRef,
    loading,
    videoOrientation,
    isSlowConnection,
    handleReloadPlayer,
  } = useIvsLivePlayer(playbackUrl);

  // Manejar el reinicio/sincronización del reproductor al reconectar la señal
  useEffect(() => {
    if (!isReconnecting && ivsPlayerRef.current) {
      // Re-sincronizar el player con el borde en vivo cuando vuelve la señal
      handleReloadPlayer();
    }
  }, [isReconnecting, handleReloadPlayer]);

  // Manejo de temporizador del aviso de mute
  const startMuteNoticeTimer = () => {
    if (muteTimerRef.current) clearTimeout(muteTimerRef.current);
    setShowMuteNotice(true);
    muteTimerRef.current = setTimeout(() => {
      setShowMuteNotice(false);
    }, 7000);
  };

  useEffect(() => {
    startMuteNoticeTimer();
    return () => {
      if (muteTimerRef.current) clearTimeout(muteTimerRef.current);
    };
  }, []);

  const toggleMute = () => {
    const player = ivsPlayerRef.current;
    if (!player) return;

    const nextMuteState = !muted;
    player.setMuted(nextMuteState);
    setMuted(nextMuteState);

    if (nextMuteState) {
      startMuteNoticeTimer();
    } else {
      if (muteTimerRef.current) clearTimeout(muteTimerRef.current);
      setShowMuteNotice(false);
    }
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

  const isPortraitMobile = isMobile && videoOrientation === "portrait";
  const boxAspectRatio = isFullscreen
    ? "unset"
    : isPortraitMobile
      ? "9/16"
      : "16/9";

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
        userSelect: "none",
      }}
    >
      <div key={playbackUrl} style={{ width: "100%", height: "100%" }}>
        <video
          ref={videoRef}
          playsInline
          autoPlay
          muted
          style={{
            width: "100%",
            height: "100%",
            objectFit: isFullscreen || isPortraitMobile ? "cover" : "contain",
            transform:
              videoOrientation === "portrait" && isMobile
                ? "scale(1.7)"
                : "scale(1)",
            backgroundColor: "black",
          }}
        />
      </div>

      {/* Overlay cuando el host pierde la conexión (Grace Period) */}
      <AnimatePresence>
        {isReconnecting && (
          <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            sx={{
              position: "absolute",
              inset: 0,
              zIndex: 10,
              bgcolor: "rgba(0, 0, 0, 0.65)",
              backdropFilter: "blur(8px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              px: 3,
              textAlign: "center",
            }}
          >
            <Box sx={{ position: "relative", display: "inline-flex" }}>
              <CircularProgress
                size={56}
                sx={{ color: "primary.main" }}
                thickness={4}
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <WifiOffRoundedIcon sx={{ color: "#FFF", fontSize: 22 }} />
              </Box>
            </Box>
            <Typography
              variant='subtitle1'
              sx={{ color: "#FFF", fontWeight: 600 }}
            >
              Conexión inestable del anfitrión...
            </Typography>
            <Typography
              variant='caption'
              sx={{ color: "rgba(255, 255, 255, 0.7)", maxWidth: 300 }}
            >
              Reconectando con la transmisión. Por favor espera un momento.
            </Typography>
          </Box>
        )}
      </AnimatePresence>

      <AlertNetwordConnection
        isSlowConnection={isSlowConnection}
        handleReloadPlayer={handleReloadPlayer}
      />

      {!loading && (
        <>
          <MutedOptions
            muted={muted}
            toggleMute={toggleMute}
            hudBtn={hudBtnStyle}
            showMuteNotice={showMuteNotice}
          />

          {isFullscreen && !isMobile && (
            <ToggleCommentsBtn
              commentsVisible={commentsVisible}
              onToggleComments={onToggleComments}
              hudBtn={hudBtnStyle}
            />
          )}

          <DetailsInfoLive
            isFullscreen={isFullscreen}
            viewers={viewers}
            COMMENTS_DRAWER_WIDTH={COMMENTS_DRAWER_WIDTH}
            handleFullscreen={handleFullscreen}
            hudBtn={hudBtnStyle}
            commentsVisible={commentsVisible}
          />
        </>
      )}
    </Box>
  );
};

export default PlayerCliente;
