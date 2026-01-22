import React, { useState, useEffect, useRef, useContext } from "react";
import Hls from "hls.js";
import axios from "axios";
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
  const progressRef = useRef(0);
  const completedRef = useRef(false);

  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleTogglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play();
      setIsPlaying(true);
    }
  };
  const handlePause = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      saveProgress(videoRef.current.currentTime);
    }
  };
  // 🔹 Inicializar HLS
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
    } else {
      console.error("Tu navegador no soporta HLS");
    }
  }, [src]);

  // 🔹 Obtener progreso inicial desde el backend
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const { data } = await MethodGet(
          `/progress-video/${userId}/${courseId}`,
        );

        // Convertir string a número
        const percent = parseFloat(data.progress || 0);

        // Completado si existe completedAt o percent >= 100
        const isCompleted = !!data.completed || percent >= 100;

        setProgress(percent);
        setCompleted(isCompleted);
        progressRef.current = data.lastWatchedSeconds || 0;
        completedRef.current = isCompleted;

        // Reanudar video desde donde quedó
        if (videoRef.current && progressRef.current >= 5) {
          saveProgress(videoRef.current.currentTime);
        }
      } catch (error) {
        console.error("Error al cargar progreso:", error);
      }
    };
    fetchProgress();
  }, [userId, courseId]);

  // 🔹 Guardar progreso automáticamente
  const saveProgress = async (secondsWatched) => {
    try {
      const duration = videoRef.current?.duration || 0;
      await MethodPost(`/progress-video/${userId}/${courseId}`, {
        secondsWatched,
        totalSeconds: duration,
      });
    } catch (error) {
      console.error("Error al guardar progreso:", error);
    }
  };

  // 🔹 Actualizar progreso cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      const video = videoRef.current;
      if (!video || completedRef.current) return;

      const newProgressPercent = durationToPercent(
        video.currentTime,
        video.duration,
      );

      // Solo actualizar si avanzó
      if (video.currentTime > progressRef.current) {
        setProgress(newProgressPercent);
        progressRef.current = video.currentTime;
        saveProgress(video.currentTime);
      }

      // Marcar completado
      if (newProgressPercent >= 100 && !completedRef.current) {
        setCompleted(true);
        completedRef.current = true;
        saveProgress(video.duration);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 🔹 Función para calcular porcentaje
  const durationToPercent = (secondsWatched, totalSeconds) => {
    if (!totalSeconds || totalSeconds === 0) return 0;
    return Math.floor((secondsWatched / totalSeconds) * 100);
  };
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleSeeking = () => {
      if (video.currentTime > progressRef.current) {
        video.currentTime = progressRef.current;
      }
    };

    video.addEventListener("seeking", handleSeeking);
    return () => video.removeEventListener("seeking", handleSeeking);
  }, []);

  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: "auto",
        mt: { xs: 2, md: 4 },
        px: { xs: 1.5, md: 0 },
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          borderRadius: { xs: "18px", md: "20px" },
          overflow: "hidden",
          backgroundColor: "#000",
          boxShadow: {
            xs: "0 8px 20px rgba(229,56,136,0.18)",
            md: "0 12px 30px rgba(229,56,136,0.15)",
          },
        }}
      >
        {/* 🎬 Video */}
        <video
          ref={videoRef}
          controls
          controlsList='nodownload noremoteplayback'
          disablePictureInPicture
          onPlay={() => setIsPlaying(true)}
          onPause={handlePause}
          onEnded={() => setIsPlaying(false)}
          poster={poster}
          style={{
            width: "100%",
            aspectRatio: "16 / 9",
            objectFit: "contain",
          }}
        >
          <source src={src} type='video/mp4' />
          Tu navegador no soporta el video.
        </video>

        {/* ▶️ / ⏸️ Botón Play-Pause centrado */}
        {!isPlaying && !completed && (
          <IconButton
            onClick={handleTogglePlay}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "rgba(255,255,255,0.9)",
              width: { xs: 64, md: 80 },
              height: { xs: 64, md: 80 },
              "&:hover": {
                backgroundColor: "#fff",
              },
            }}
          >
            <PlayArrowIcon sx={{ fontSize: 48, color: "#E53888" }} />
          </IconButton>
        )}
      </Box>

      {/* Barra de progreso */}
      <Box
        sx={{
          mt: 3,
          p: { xs: 2, md: 2.5 },
          mb: 1,
          borderRadius: "16px",
          backgroundColor: "#FFF6F9",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: { xs: "1rem", md: "1.2rem" },
            mb: 0.5,
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            fontSize: "0.85rem",
            color: "#DC4485",
            mb: 1.2,
          }}
        >
          Has avanzado un {progress}% 🌸
        </Typography>

        <LinearProgress
          variant='determinate'
          value={progress}
          sx={{
            height: 6,
            borderRadius: 10,
            backgroundColor: "#F3D6DF",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#E53888",
            },
          }}
        />
      </Box>

      {/* Certificado */}
      {completed && (
        <Box
          sx={{
            mt: 4,
            p: { xs: 2.5, md: 3 },
            borderRadius: "18px",
            backgroundColor: "#F8FFF9",
            textAlign: "center",
            animation: "fadeIn 0.6s ease-out",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "1.6rem", md: "2rem" },
              fontWeight: 700,
              color: "#4CAF50",
            }}
          >
            ¡Has florecido! 🌸
          </Typography>

          <Typography sx={{ mt: 1, color: "text.secondary" }}>
            Completaste este curso y diste un paso más en tu crecimiento.
          </Typography>
          {hasCertificate && (
            <Button
              variant='contained'
              fullWidth
              sx={{
                mt: 2,
                py: 1.2,
                backgroundColor: "#F7CDD9",
                color: "#DC4485",
                borderRadius: "14px",
                fontWeight: 600,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#F5BCCC",
                },
              }}
              onClick={() => downloadCertificate(courseId, usuario.name)}
              disabled={loading}
            >
              {loading ? "Generando certificado..." : "Descargar certificado"}
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

export default VideoPlayer;
