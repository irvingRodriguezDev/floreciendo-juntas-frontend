import React, { useEffect, useRef, useState, useCallback } from "react";
import { Box, useMediaQuery, Fade } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

import LiveCommentsOverlay from "./LiveCommentsOverlay";
import LivePlayerOverlay from "./LivePlayerOverlay";
import LiveWatermark from "./LiveWatermark";
import { useLiveComments } from "../../hooks/useLiveComments";
import MethodGet from "../../config/Service";

const TOKEN_REFRESH_INTERVAL = 4 * 60 * 1000; // 4 min

const IVSPlayerComponent = ({ playbackUrl, liveId, usuario }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const refreshTimerRef = useRef(null);

  const isMobile = useMediaQuery("(max-width:768px)");

  const [uiState, setUiState] = useState("loading"); // loading | playing | reconnecting
  const [tokenIvs, setTokenIvs] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);

  const { comments, sendComment } = useLiveComments(liveId);

  // ==========================
  // 1️⃣ Obtener token
  // ==========================
  const fetchToken = useCallback(async () => {
    const res = await MethodGet("/generate-token-ivs");
    return res.data.token;
  }, []);

  useEffect(() => {
    fetchToken()
      .then(setTokenIvs)
      .catch(() => setError("No pudimos validar tu acceso al live 😔"));
  }, [fetchToken]);

  // ==========================
  // 2️⃣ Refresh silencioso
  // ==========================
  useEffect(() => {
    if (!tokenIvs) return;

    refreshTimerRef.current = setInterval(async () => {
      try {
        setUiState("reconnecting");
        const newToken = await fetchToken();
        setTokenIvs(newToken);

        playerRef.current?.load(`${playbackUrl}?token=${newToken}`);
      } catch {
        setError("Se perdió la conexión con el live");
      }
    }, TOKEN_REFRESH_INTERVAL);

    return () => clearInterval(refreshTimerRef.current);
  }, [tokenIvs, fetchToken, playbackUrl]);

  // ==========================
  // 3️⃣ Esperar SDK IVS
  // ==========================
  useEffect(() => {
    const checkSDK = () => {
      if (window.IVSPlayer?.isPlayerSupported) {
        setIsReady(true);
      } else {
        setTimeout(checkSDK, 100);
      }
    };
    checkSDK();
  }, []);

  // ==========================
  // 4️⃣ Inicializar Player
  // ==========================
  useEffect(() => {
    if (!isReady || !tokenIvs || playerRef.current) return;

    setUiState("loading");

    const player = window.IVSPlayer.create();
    playerRef.current = player;
    player.attachHTMLVideoElement(videoRef.current);

    player.addEventListener(window.IVSPlayer.PlayerEventType.PLAYING, () =>
      setUiState("playing")
    );

    player.addEventListener(window.IVSPlayer.PlayerEventType.BUFFERING, () =>
      setUiState("reconnecting")
    );

    player.addEventListener(window.IVSPlayer.PlayerEventType.ERROR, () =>
      setError("Ocurrió un problema con la transmisión")
    );

    player.load(`${playbackUrl}?token=${tokenIvs}`);
    player.play();

    return () => {
      player.pause();
      player.delete();
      playerRef.current = null;
    };
  }, [isReady, tokenIvs, playbackUrl]);

  // ==========================
  // 5️⃣ Eventos reales del <video>
  // ==========================
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlaying = () => setUiState("playing");
    const onWaiting = () => setUiState("reconnecting");
    const onLoadStart = () => setUiState("loading");

    video.addEventListener("playing", onPlaying);
    video.addEventListener("waiting", onWaiting);
    video.addEventListener("loadstart", onLoadStart);

    return () => {
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("waiting", onWaiting);
      video.removeEventListener("loadstart", onLoadStart);
    };
  }, []);

  // ==========================
  // Render
  // ==========================
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: isMobile ? "100vh" : "auto",
        background: "#000",
        overflow: "hidden",
        borderRadius: { xs: 0, md: 4 },
      }}
    >
      {/* 🎥 OVERLAY ESTADO */}
      <AnimatePresence>
        {uiState !== "playing" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 20,
            }}
          >
            <LivePlayerOverlay
              status={uiState}
              message={
                error ||
                (uiState === "loading"
                  ? "Conectando al live…"
                  : "Reconectando transmisión…")
              }
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🎬 VIDEO */}
      <video
        ref={videoRef}
        playsInline
        controls={!isMobile}
        style={{
          width: "100%",
          height: isMobile ? "100vh" : "auto",
          objectFit: isMobile ? "cover" : "contain",
          backgroundColor: "#000",
        }}
      />

      {/* 📱 TIP MOBILE */}
      {isMobile && (
        <Fade in>
          <Box
            sx={{
              position: "absolute",
              top: 14,
              left: "50%",
              transform: "translateX(-50%)",
              px: 2.5,
              py: 0.7,
              borderRadius: 999,
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(6px)",
              color: "#fff",
              fontSize: "0.75rem",
              zIndex: 30,
            }}
          >
            ⛶ Pantalla completa recomendada
          </Box>
        </Fade>
      )}

      {/* 💧 WATERMARK */}

      {/* 💬 COMENTARIOS */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 15,
          pointerEvents: "none",
        }}
      >
        <LiveCommentsOverlay comments={comments} onSend={sendComment} />
      </Box>
    </Box>
  );
};

export default IVSPlayerComponent;
