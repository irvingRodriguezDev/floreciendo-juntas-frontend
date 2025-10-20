import React, { useState, useEffect, useRef } from "react";
import Hls from "hls.js";
import axios from "axios";
import { Box, Typography, LinearProgress, Button } from "@mui/material";
import MethodGet, { MethodPost } from "../../../config/Service";

const VideoPlayer = ({ userId, courseId, src, poster }) => {
  const videoRef = useRef(null);
  const progressRef = useRef(0);
  const completedRef = useRef(false);

  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(false);

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
          `/progress-video/${userId}/${courseId}`
        );
        console.log(data, "la dataaaaa");

        // Convertir string a número
        const percent = parseFloat(data.progress || 0);

        // Completado si existe completedAt o percent >= 100
        const isCompleted = !!data.completed || percent >= 100;

        setProgress(percent);
        setCompleted(isCompleted);
        progressRef.current = data.lastWatchedSeconds || 0;
        completedRef.current = isCompleted;

        // Reanudar video desde donde quedó
        if (videoRef.current && progressRef.current > 0) {
          videoRef.current.currentTime = progressRef.current;
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
        video.duration
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

  // 🔹 Obtener certificado
  const fetchCertificate = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${API_URL}/certificate/${userId}/${courseId}`
      );
      setCertificate(data);
    } catch (error) {
      console.error("Error al obtener certificado:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: 900,
          mx: "auto",
          mt: 4,
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          backgroundColor: "#000",
        }}
      >
        <video
          ref={videoRef}
          controls
          controlsList='nodownload noremoteplayback nofullscreen' // evita algunas acciones
          disablePictureInPicture
          style={{ width: "100%", height: "500px", objectFit: "contain" }}
          poster={poster}
        />
      </Box>

      {/* Barra de progreso */}
      <Box sx={{ mt: 2 }}>
        <Typography variant='body1' color='#DC4485'>
          Progreso del curso: {progress}%
        </Typography>
        <LinearProgress
          variant='determinate'
          value={progress}
          sx={{
            height: 10,
            borderRadius: 5,
            mt: 1,
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#DC4485", // color de la barra
            },
            backgroundColor: "#F0F0F0", // color de fondo
          }}
        />
      </Box>

      {/* Certificado */}
      {completed && (
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant='h3' color='success.main'>
            ¡Curso completado! 🎉
          </Typography>
          <Button
            variant='contained'
            sx={{
              mt: 2,
              backgroundColor: "#F7CDD9",
              color: "#DC4485",
              borderRadius: "12px",
            }}
            onClick={fetchCertificate}
            disabled={loading}
          >
            {loading ? "Generando certificado..." : "Descargar certificado"}
          </Button>

          {certificate && (
            <Box sx={{ mt: 3 }}>
              <Typography variant='body2' color='text.secondary'>
                Certificado disponible desde:{" "}
                {new Date(certificate.date).toLocaleDateString()}
              </Typography>
              <a
                href={certificate.certificateUrl}
                target='_blank'
                rel='noopener noreferrer'
              >
                <Button variant='outlined' sx={{ mt: 1 }}>
                  Descargar certificado
                </Button>
              </a>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default VideoPlayer;
