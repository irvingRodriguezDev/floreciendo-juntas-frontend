import React, { useEffect, useRef, useState } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import {
  Box,
  CircularProgress,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import LiveCommentsOverlay from "./LiveCommentsOverlay";

const PlayerCliente = ({ playbackUrl, liveId }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [videoOrientation, setVideoOrientation] = useState("landscape");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    let ivsPlayer = null;
    let plyrPlayer = null;

    const initPlayer = () => {
      if (!window.IVSPlayer || !videoRef.current) return;

      try {
        ivsPlayer = window.IVSPlayer.create();
        ivsPlayer.attachHTMLVideoElement(videoRef.current);
        ivsPlayer.load(playbackUrl);
        ivsPlayer.play();
        ivsPlayer.setVolume(1.0);

        ivsPlayer.addEventListener(
          window.IVSPlayer.PlayerEventType.INITIALIZED,
          () => {
            const quality = ivsPlayer.getQuality();
            // Si el alto es mayor al ancho, es vertical
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
        console.error(err);
      }
    };

    const handleFSChange = () => {
      setIsFullscreen(
        !!(document.fullscreenElement || document.webkitFullscreenElement),
      );
    };

    document.addEventListener("fullscreenchange", handleFSChange);
    document.addEventListener("webkitfullscreenchange", handleFSChange);
    const timer = setTimeout(initPlayer, 500);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("fullscreenchange", handleFSChange);
      document.removeEventListener("webkitfullscreenchange", handleFSChange);
      if (plyrPlayer) plyrPlayer.destroy();
      if (ivsPlayer) {
        ivsPlayer.pause();
        ivsPlayer.delete();
      }
    };
  }, [playbackUrl]);

  const toggleFullscreen = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const elem = isMobile ? videoRef.current : containerRef.current;
    if (!elem) return;
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      if (elem.requestFullscreen) elem.requestFullscreen();
      else if (elem.webkitEnterFullscreen) elem.webkitEnterFullscreen();
    } else {
      document.exitFullscreen
        ? document.exitFullscreen()
        : document.webkitExitFullscreen();
    }
  };

  const isPortraitMobile = isMobile && videoOrientation === "portrait";
  const isChatBelow =
    isMobile && videoOrientation === "landscape" && !isFullscreen;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        bgcolor: "#000",
        // Si es vertical, forzamos que el fondo sea negro total para que no se note corte
        minHeight: isPortraitMobile ? "60vh" : "auto",
      }}
    >
      <Box
        ref={containerRef}
        sx={{
          position: "relative",
          width: "100%",
          // CLAVE: Si es vertical, eliminamos el aspecto 16/9 y usamos 9/16 o automático
          aspectRatio: isPortraitMobile ? "9/16" : "16/9",
          bgcolor: "#000",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!loading && (
          <IconButton
            onClick={toggleFullscreen}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              zIndex: 1200,
              color: "white",
              bgcolor: "rgba(0,0,0,0.5)",
            }}
          >
            {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>
        )}

        <div key={playbackUrl} style={{ width: "100%", height: "100%" }}>
          <video
            ref={videoRef}
            playsInline
            autoPlay
            style={{
              width: "100%",
              height: "100%",
              // 'cover' asegura que NO haya barras negras laterales en vertical
              objectFit: isPortraitMobile ? "cover" : "contain",
              transform:
                videoOrientation === "portrait" ? "scale(1.7)" : "scale(1)",
              backgroundColor: "black",
            }}
          />
        </div>

        {/* Overlay para Vertical o Web */}
        {!loading && (!isChatBelow || isFullscreen) && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              zIndex: 10,
              pointerEvents: "none",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              pb: isPortraitMobile ? 4 : 0,
            }}
          >
            <LiveCommentsOverlay liveId={liveId} isMobile={isMobile} />
          </Box>
        )}
      </Box>

      {/* Espacio para chat cuando el video es horizontal (YouTube style) */}
      {isChatBelow && !loading && (
        <Box
          sx={{
            flexGrow: 1,
            mt: -20,
            height: "33vh",
            bgcolor: "transparent",
            position: "relative",
          }}
        >
          <LiveCommentsOverlay liveId={liveId} isMobile={true} />
        </Box>
      )}
    </Box>
  );
};

export default PlayerCliente;
