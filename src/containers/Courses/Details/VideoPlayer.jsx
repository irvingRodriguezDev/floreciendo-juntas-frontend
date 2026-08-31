import React, { useState, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import WorkbookSection from "../../../components/courses/WorkbookSection";
import RecognitionSection from "../../../components/courses/RecognitionSection";
import ActionsButtonsCourse from "../../../components/courses/ActionsButtons";
import { useCourseProgress } from "../../../hooks/useCourseProgress";
import { useHlsPlayer } from "../../../hooks/useHlsPlayer";
import ProgressCourse from "../../../components/courses/ProgressCourse";

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
  const videoRef = useHlsPlayer(src);
  const apiTickCounterRef = useRef(0);

  const {
    progress,
    certificateEnabled,
    syncCurrentProgress,
    handleTick,
    updateBackendProgress,
    getGlobalProgress,
  } = useCourseProgress({ userId, courseId, allVideos, activeVideo });

  // Cronómetro de guardado periódico (5s Local, 15s API)
  useEffect(() => {
    if (certificateEnabled || !userId || !courseId) return;

    const interval = setInterval(() => {
      const video = videoRef.current;
      if (!video || video.paused) return;

      handleTick(video);

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
    videoRef,
  ]);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    video.paused ? video.play() : video.pause();
  };

  const handlePause = () => {
    setIsPlaying(false);
    syncCurrentProgress(videoRef.current, false);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    syncCurrentProgress(videoRef.current, true);
  };

  const safeUserName = usuario?.name ?? "";

  return (
    <Box sx={{ maxWidth: "100%", mx: "auto", mt: 4 }}>
      <Box
        sx={{
          position: "relative",
          borderRadius: 2,
          overflow: "hidden",
          backgroundColor: "#000",
        }}
      >
        <video
          ref={videoRef}
          preload='metadata'
          controls
          controlsList='nodownload noremoteplayback'
          disablePictureInPicture
          poster={poster}
          onPlay={() => setIsPlaying(true)}
          onPause={handlePause}
          onEnded={handleEnded}
          style={{ width: "100%", aspectRatio: "16/9", display: "block" }}
        />

        <ActionsButtonsCourse
          handlePlayPause={handlePlayPause}
          isPlaying={isPlaying}
        />
      </Box>

      <Box sx={{ mt: 3, p: 2, borderRadius: 3, backgroundColor: "#FFF6F9" }}>
        <Typography fontWeight={700} sx={{ mb: 1, color: "#1F2937" }}>
          {title}
        </Typography>
        <ProgressCourse progress={progress} />
      </Box>

      {workbookUrl !== null && <WorkbookSection workbookUrl={workbookUrl} />}

      {certificateEnabled && hasCertificate && safeUserName && (
        <RecognitionSection safeUserName={safeUserName} courseId={courseId} />
      )}
    </Box>
  );
};

export default VideoPlayer;
