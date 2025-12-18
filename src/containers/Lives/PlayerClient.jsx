import React, { useEffect, useRef, useState, useCallback } from "react";
import LiveCommentsOverlay from "./LiveCommentsOverlay";
import LivePlayerOverlay from "./LivePlayerOverlay";
import LiveWatermark from "./LiveWatermark";
import { useLiveComments } from "../../hooks/useLiveComments";
import MethodGet from "../../config/Service";
import { Box } from "@mui/material";

const TOKEN_REFRESH_INTERVAL = 4 * 60 * 1000; // 4 min

const IVSPlayerComponent = ({ playbackUrl, liveId, usuario }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const refreshTimerRef = useRef(null);
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
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
      .catch(() => setError("No se pudo validar tu acceso al live"));
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

        if (playerRef.current) {
          playerRef.current.load(`${playbackUrl}?token=${newToken}`);
        }
      } catch {
        setError("Se perdió la conexión con el live");
      }
    }, TOKEN_REFRESH_INTERVAL);

    return () => clearInterval(refreshTimerRef.current);
  }, [tokenIvs, fetchToken, playbackUrl]);

  // ==========================
  // 3️⃣ Esperar SDK
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
  // 4️⃣ Inicializar Player IVS
  // ==========================
  useEffect(() => {
    if (!isReady || !tokenIvs || playerRef.current) return;

    setUiState("loading");

    const player = window.IVSPlayer.create();
    playerRef.current = player;

    player.attachHTMLVideoElement(videoRef.current);

    // Eventos IVS
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
  // 5️⃣ Escuchar VIDEO real (FIX CLAVE)
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
    <div style={{ position: "relative", width: "100%" }}>
      {uiState !== "playing" && (
        <LivePlayerOverlay
          status={uiState}
          message={
            error ||
            (uiState === "loading"
              ? "Conectando al live…"
              : "Reconectando transmisión…")
          }
        />
      )}

      <video
        ref={videoRef}
        playsInline
        controls
        sx={{
          width: "100%",
          height: isMobile ? "100vh" : "auto",
          objectFit: isMobile ? "cover" : "contain",
          backgroundColor: "#000",
        }}
      />
      {isMobile && (
        <Box
          sx={{
            position: "absolute",
            top: 12,
            left: "50%",
            transform: "translateX(-50%)",
            px: 2.5,
            py: 0.8,
            borderRadius: "999px",
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(8px)",
            color: "#fff",
            fontSize: "0.8rem",
            zIndex: 30,
          }}
        >
          📱 Toca ⛶ para pantalla completa
        </Box>
      )}

      {/* 💧 Watermark */}
      {/* <LiveWatermark text={`${usuario?.email} • Floreciendo Juntas`} /> */}

      {/* 💬 Comentarios */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <LiveCommentsOverlay comments={comments} onSend={sendComment} />
      </div>
    </div>
  );
};

export default IVSPlayerComponent;
