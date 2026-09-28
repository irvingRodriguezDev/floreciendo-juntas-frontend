import { useEffect, useRef, useState, useCallback } from "react";
import MethodGet from "../config/Service";

const TOKEN_REFRESH_INTERVAL = 4 * 60 * 1000;

export const useIVSPlayer = (playbackUrl) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [uiState, setUiState] = useState("loading");
  const [tokenIvs, setTokenIvs] = useState(null);
  const [error, setError] = useState(null);

  const fetchToken = useCallback(async () => {
    try {
      const res = await MethodGet("/generate-token-ivs");
      return res.data.token;
    } catch (err) {
      setError("Error al validar acceso");
      return null;
    }
  }, []);

  // 1. Carga inicial del Token
  useEffect(() => {
    fetchToken().then((token) => {
      if (token) setTokenIvs(token);
    });
  }, [fetchToken]);

  // 2. Inicialización ÚNICA del Player
  useEffect(() => {
    if (!tokenIvs || !playbackUrl || playerRef.current) return;

    // Verificar si el SDK está cargado
    if (!window.IVSPlayer) {
      setError("SDK de Amazon IVS no encontrado");
      return;
    }

    const { PlayerState, PlayerEventType } = window.IVSPlayer;
    const player = window.IVSPlayer.create();
    playerRef.current = player;
    player.attachHTMLVideoElement(videoRef.current);

    // Eventos de estado
    player.addEventListener(PlayerState.PLAYING, () => setUiState("playing"));
    player.addEventListener(PlayerState.BUFFERING, () => setUiState("loading"));
    player.addEventListener(PlayerState.ENDED, () => setUiState("ended"));
    player.addEventListener(PlayerEventType.ERROR, (err) => {
      console.error("IVS Error:", err);
      setError("Error en la transmisión");
    });

    // Cargar y reproducir
    player.load(`${playbackUrl}?token=${tokenIvs}`);
    player.play();

    return () => {
      if (playerRef.current) {
        playerRef.current.pause();
        playerRef.current.delete();
        playerRef.current = null;
      }
    };
  }, [tokenIvs, playbackUrl]); // Solo se ejecuta la primera vez que tenemos token y url

  // 3. Refresh del Token SIN destruir el player
  useEffect(() => {
    const timer = setInterval(async () => {
      const newToken = await fetchToken();
      if (newToken && playerRef.current) {
        console.log("Renovando sesión de IVS...");
        // IVS permite actualizar el stream cargando la nueva URL con el nuevo token
        // sin necesidad de borrar los listeners
        playerRef.current.load(`${playbackUrl}?token=${newToken}`);
      }
    }, TOKEN_REFRESH_INTERVAL);

    return () => clearInterval(timer);
  }, [playbackUrl, fetchToken]);

  return { videoRef, uiState, error };
};
