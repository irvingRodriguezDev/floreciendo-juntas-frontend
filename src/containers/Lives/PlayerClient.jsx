import React, { useEffect, useRef, useState } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import LiveCommentsOverlay from "./LiveCommentsOverlay";

const PlayerCliente = ({ playbackUrl, liveId }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const ivsPlayerRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [videoOrientation, setVideoOrientation] = useState("landscape");
  const [muted, setMuted] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    let plyrPlayer = null;

    const initPlayer = () => {
      if (!window.IVSPlayer || !videoRef.current) return;

      try {
        const ivsPlayer = window.IVSPlayer.create();
        ivsPlayerRef.current = ivsPlayer;

        ivsPlayer.attachHTMLVideoElement(videoRef.current);
        ivsPlayer.load(playbackUrl);

        ivsPlayer.setMuted(false); // 🔊 audio activo
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
      if (ivsPlayerRef.current) {
        ivsPlayerRef.current.pause();
        ivsPlayerRef.current.delete();
      }
    };
  }, [playbackUrl]);

  const toggleMute = () => {
    const ivsPlayer = ivsPlayerRef.current;
    if (!ivsPlayer) return;

    ivsPlayer.setMuted(!muted);
    setMuted(!muted);
  };

  const toggleFullscreen = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const elem = isMobile ? videoRef.current : containerRef.current;
    if (!elem) return;

    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      elem.requestFullscreen
        ? elem.requestFullscreen()
        : elem.webkitEnterFullscreen();
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
      }}
    >
      <Box
        ref={containerRef}
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: isPortraitMobile ? "9/16" : "16/9",
          bgcolor: "#000",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!loading && (
          <>
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

            <IconButton
              onClick={toggleMute}
              sx={{
                position: "absolute",
                top: 10,
                left: 10,
                zIndex: 1200,
                color: "white",
                bgcolor: "rgba(0,0,0,0.5)",
              }}
            >
              {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
            </IconButton>
          </>
        )}

        <div key={playbackUrl} style={{ width: "100%", height: "100%" }}>
          <video
            ref={videoRef}
            playsInline
            autoPlay
            style={{
              width: "100%",
              height: "100%",
              objectFit: isPortraitMobile ? "cover" : "contain",
              transform:
                videoOrientation === "portrait" ? "scale(1.7)" : "scale(1)",
              backgroundColor: "black",
            }}
          />
        </div>

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

      {isChatBelow && !loading && (
        <Box sx={{ height: "33vh", position: "relative" }}>
          <LiveCommentsOverlay liveId={liveId} isMobile />
        </Box>
      )}
    </Box>
  );
};

export default PlayerCliente;
