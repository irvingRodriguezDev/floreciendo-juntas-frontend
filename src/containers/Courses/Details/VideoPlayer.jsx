import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import WorkbookSection from "../../../components/courses/WorkbookSection";
import RecognitionSection from "../../../components/courses/RecognitionSection";
import { useCourseProgress } from "../../../hooks/useCourseProgress";
import ProgressCourse from "../../../components/courses/ProgressCourse";
import VideoJSPlayer from "./VideoJSPlayer";

const VideoPlayer = ({
  userId,
  courseId,
  src,
  poster,
  usuario,
  title,
  hasCertificate,
  workbookUrl,
  allVideos = [],
  activeVideo,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerInstanceRef = useRef(null);
  const apiTickCounterRef = useRef(0);

  const {
    progress,
    certificateEnabled,
    syncCurrentProgress,
    handleTick,
    updateBackendProgress,
    getGlobalProgress,
  } = useCourseProgress({ userId, courseId, allVideos, activeVideo });

  // Cronómetro para sincornizar y guardar el progreso en background
  useEffect(() => {
    if (certificateEnabled || !userId || !courseId) return;

    const interval = setInterval(() => {
      const player = playerInstanceRef.current;
      // Validamos que el reproductor esté activo y reproduciendo
      if (!player || player.paused() || player.ended()) return;

      // Extraemos de forma segura el tag <video> nativo manejado por Video.js
      const rawVideo = player.tech({ IWillNotUseThisInPlugins: true })?.el_;
      if (rawVideo) {
        handleTick(rawVideo);
      }

      apiTickCounterRef.current += 5;
      if (apiTickCounterRef.current >= 15) {
        const { globalPercent, totalSeconds } = getGlobalProgress();
        updateBackendProgress(totalSeconds, globalPercent, false);
        apiTickCounterRef.current = 0;
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [
    certificateEnabled,
    userId,
    courseId,
    handleTick,
    getGlobalProgress,
    updateBackendProgress,
  ]);

  // Handler cuando la instancia de Video.js está lista
  const handlePlayerReady = (player) => {
    playerInstanceRef.current = player;
  };

  // Evento Play
  const handlePlay = () => {
    setIsPlaying(true);
  };

  // Evento Pause (Sincroniza progreso inmediatamente)
  const handlePause = () => {
    setIsPlaying(false);
    const rawVideo = playerInstanceRef.current?.tech({
      IWillNotUseThisInPlugins: true,
    })?.el_;
    if (rawVideo) {
      syncCurrentProgress(rawVideo, false);
    }
  };

  // Evento Ended (Marca el video como completado)
  const handleEnded = () => {
    setIsPlaying(false);
    const rawVideo = playerInstanceRef.current?.tech({
      IWillNotUseThisInPlugins: true,
    })?.el_;
    if (rawVideo) {
      syncCurrentProgress(rawVideo, true);
    }
  };

  const safeUserName = usuario?.name ?? "";

  return (
    <Box sx={{ maxWidth: "100%", mx: "auto", mt: 4 }}>
      <Box
        sx={{
          position: "relative",
          borderRadius: 3,
          overflow: "hidden",
          backgroundColor: "#000",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          minHeight: { xs: 220, sm: 380, md: 450 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {src ? (
          <VideoJSPlayer
            src={src}
            poster={poster}
            onReady={handlePlayerReady}
            onPlay={handlePlay}
            onPause={handlePause}
            onEnded={handleEnded}
          />
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              color: "#fff",
            }}
          >
            <CircularProgress size={40} sx={{ color: "#D62D78" }} />
            <Typography variant='body2' sx={{ color: "rgba(255,255,255,0.7)" }}>
              Cargando lección...
            </Typography>
          </Box>
        )}
      </Box>

      {/* Información del Video y Progreso del Curso */}
      <Box sx={{ mt: 3, p: 2.5, borderRadius: 3, backgroundColor: "#FFF6F9" }}>
        <Typography
          fontWeight={700}
          variant='h6'
          sx={{ mb: 1, color: "#1F2937" }}
        >
          {title}
        </Typography>
        <ProgressCourse progress={progress} />
      </Box>

      {/* Secciones adicionales */}
      {workbookUrl !== null && <WorkbookSection workbookUrl={workbookUrl} />}

      {certificateEnabled && hasCertificate && safeUserName && (
        <RecognitionSection safeUserName={safeUserName} courseId={courseId} />
      )}
    </Box>
  );
};

export default VideoPlayer;
