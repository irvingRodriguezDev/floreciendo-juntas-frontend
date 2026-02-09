import React, { useState, useEffect, useRef, useContext } from "react";
import Hls from "hls.js";
import {
  Box,
  Typography,
  LinearProgress,
  Button,
  IconButton,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import MethodGet, { MethodPost } from "../../../config/Service";
import CoursesContext from "../../../context/Courses/CoursesContext";

const VideoPlayer = ({
  userId,
  courseId,
  src,
  poster,
  usuario,
  title,
  hasCertificate,
}) => {
  const { downloadCertificate } = useContext(CoursesContext);
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [certificateEnabled, setCertificateEnabled] = useState(false);

  // 🔒 evita múltiples requests
  const alreadySentRef = useRef(false);

  const LOCAL_KEY = `video-progress-${userId}-${courseId}`;

  /* ==============================
     localStorage helpers
  ============================== */
  const saveLocalProgress = (seconds) => {
    localStorage.setItem(LOCAL_KEY, seconds);
  };

  const getLocalProgress = () => {
    return Number(localStorage.getItem(LOCAL_KEY) || 0);
  };

  const clearLocalProgress = () => {
    localStorage.removeItem(LOCAL_KEY);
  };

  /* ==============================
     HLS Init
  ============================== */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    } else if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      return () => hls.destroy();
    }
  }, [src]);

  /* ==============================
     Get backend state (solo 1 vez)
  ============================== */
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const { data } = await MethodGet(
          `/progress-video/${userId}/${courseId}`,
        );

        if (data?.certificate_enabled) {
          setCertificateEnabled(true);
          alreadySentRef.current = true;
          setProgress(100);
          clearLocalProgress();
        }
      } catch (error) {
        console.error("Error obteniendo progreso:", error);
      }
    };

    fetchProgress();
  }, [userId, courseId]);

  /* ==============================
     Restore local progress
  ============================== */
  useEffect(() => {
    const video = videoRef.current;
    if (!video || certificateEnabled) return;

    const localSeconds = getLocalProgress();
    if (localSeconds > 5) {
      video.currentTime = localSeconds;
    }
  }, [certificateEnabled]);

  /* ==============================
     UI progress updater + threshold
  ============================== */
  useEffect(() => {
    const interval = setInterval(() => {
      const video = videoRef.current;
      if (!video || certificateEnabled || !video.duration) return;

      const percent = Math.floor((video.currentTime / video.duration) * 100);

      setProgress(percent);
      saveLocalProgress(video.currentTime);

      // 🎯 Cruza el 80% → UNA SOLA PETICIÓN
      if (percent >= 80 && !alreadySentRef.current) {
        unlockCertificate(video);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [certificateEnabled]);

  /* ==============================
     Backend call (única)
  ============================== */
  const unlockCertificate = async (video) => {
    alreadySentRef.current = true;
    setCertificateEnabled(true);
    clearLocalProgress();

    try {
      await MethodPost(`/progress-video/${userId}/${courseId}`, {
        secondsWatched: video.currentTime,
        totalSeconds: video.duration,
        progress: Math.floor((video.currentTime / video.duration) * 100),
        certificate_enabled: true,
      });
    } catch (error) {
      console.error("Error habilitando certificado:", error);
    }
  };

  /* ==============================
     Video ended (fallback)
  ============================== */
  const handleEnded = () => {
    const video = videoRef.current;
    if (!video) return;

    setProgress(100);

    if (!alreadySentRef.current) {
      unlockCertificate(video);
    }
  };

  /* ==============================
     Play / Pause overlay
  ============================== */
  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    video.paused ? video.play() : video.pause();
  };

  /* ==============================
     UI
  ============================== */
  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
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
          controls
          controlsList='nodownload noremoteplayback'
          disablePictureInPicture
          poster={poster}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={handleEnded}
          style={{ width: "100%", aspectRatio: "16/9" }}
        />

        {/* 🎬 Overlay Play / Pause */}
        <IconButton
          onClick={handlePlayPause}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(255,255,255,0.9)",
            "&:hover": {
              backgroundColor: "#fff",
            },
          }}
        >
          {isPlaying ? (
            <PauseIcon sx={{ fontSize: 42, color: "#E53888" }} />
          ) : (
            <PlayArrowIcon sx={{ fontSize: 42, color: "#E53888" }} />
          )}
        </IconButton>
      </Box>

      <Box sx={{ mt: 3, p: 2, borderRadius: 2, backgroundColor: "#FFF6F9" }}>
        <Typography fontWeight={700}>{title}</Typography>
        <Typography fontSize='0.85rem' color='#DC4485'>
          Has avanzado un {progress}%
        </Typography>

        <LinearProgress
          variant='determinate'
          value={progress}
          sx={{
            height: 6,
            borderRadius: 10,
            backgroundColor: "#F3D6DF",
            "& .MuiLinearProgress-bar": { backgroundColor: "#E53888" },
          }}
        />
      </Box>

      {certificateEnabled && hasCertificate && usuario?.name && (
        <Box
          sx={{
            mt: 4,
            p: 3,
            borderRadius: 2,
            backgroundColor: "#F8FFF9",
            textAlign: "center",
          }}
        >
          <Typography fontSize='1.8rem' fontWeight={700} color='#4CAF50'>
            ¡Certificado disponible! 🌸
          </Typography>

          <Button
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: "#F7CDD9",
              color: "#DC4485",
              fontWeight: 600,
              textTransform: "none",
            }}
            onClick={() => downloadCertificate(courseId, usuario?.name || "")}
          >
            Descargar certificado
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default VideoPlayer;
