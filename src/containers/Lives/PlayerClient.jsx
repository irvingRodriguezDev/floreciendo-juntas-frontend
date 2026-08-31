import React, { useEffect, useRef, useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";

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
