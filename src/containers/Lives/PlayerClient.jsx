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
import Snowfall from "react-snowfall"; // 🎄 Importamos Snowfall para modo fullscreen

import DetailsInfoLive from "./DetailsInfoLive";
import MutedOptions from "./MutedOptions";
import AlertNetwordConnection from "./AlertNetwordConnection";
import ToggleCommentsBtn from "./ToggleCommentsBtn";
import { useIvsLivePlayer } from "../../hooks/useIvsLivePlayer";
import { useHoliday } from "../../context/Holiday/HolidayContext"; // 🎄 Hook navideño

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
  isReconnecting = false,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { isHolidayMode } = useHoliday(); // 🎄 Estado global de navidad

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

  useEffect(() => {
    if (!isReconnecting && ivsPlayerRef.current) {
      handleReloadPlayer();
    }
  }, [isReconnecting, handleReloadPlayer]);

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
  const [snowflakeImage, setSnowflakeImage] = useState(null);
  useEffect(() => {
    // Creamos un elemento de imagen en memoria con un SVG limpio o una URL de tu CDN
    const image = document.createElement("img");
    // Puedes usar un enlace SVG en base64 de un copo estilizado o una URL de tu CDN
    image.src = "https://www.svgrepo.com/show/184599/snowflake-snow.svg"; // Ejemplo: Emoji oficial de copo de nieve en alta calidad

    image.onload = () => {
      setSnowflakeImage(image);
    };
  }, []);
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
      {/* 🎄 EFECTO DE NIEVE DENTRO DEL REPRODUCTOR (Se activa en Fullscreen si el modo navideño está prendido) */}
      {isHolidayMode && isFullscreen && (
        <Snowfall
          snowflakeCount={85} // Cantidad equilibrada para que se vea elegante y no sature
          images={snowflakeImage ? [snowflakeImage] : undefined} // Usamos nuestra imagen personalizada
          radius={[8, 18]} // Tamaño variable de los copos (mínimo y máximo en pixeles)
          speed={[0.5, 2.0]} // Velocidad de caída suave y relajada
          wind={[-0.5, 1.5]} // Ligero movimiento de viento lateral realista
          style={{
            position: "fixed",
            width: "100%",
            height: "100%",
            zIndex: 1500, // Por debajo de modales y menús importantes, pero visible en la app
            pointerEvents: "none", // Permite hacer clic en los botones y cursos a través de la nieve
          }}
        />
      )}

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
