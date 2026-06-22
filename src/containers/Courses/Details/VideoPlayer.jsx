import React, { useState, useEffect, useRef, useContext } from "react";
import Hls from "hls.js";
import {
  Box,
  Typography,
  LinearProgress,
  Button,
  IconButton,
  Stack,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import MethodGet, { MethodPost } from "../../../config/Service";
import CoursesContext from "../../../context/Courses/CoursesContext";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import { Link } from "react-router-dom";
const VideoPlayer = ({
  userId,
  courseId,
  src,
  poster,
  usuario,
  title,
  hasCertificate,
  workbookUrl,
}) => {
  const { downloadCertificate } = useContext(CoursesContext);

  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const intervalRef = useRef(null);
  const alreadySentRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [certificateEnabled, setCertificateEnabled] = useState(true);

  const LOCAL_KEY = `video-progress-${userId}-${courseId}`;

  /* ==============================
     LocalStorage helpers
  ============================== */
  const saveLocalProgress = (seconds) => {
    localStorage.setItem(LOCAL_KEY, String(seconds));
  };

  const getLocalProgress = () => {
    return Number(localStorage.getItem(LOCAL_KEY) || 0);
  };

  const clearLocalProgress = () => {
    localStorage.removeItem(LOCAL_KEY);
  };

  /* ==============================
     Init HLS (OPTIMIZADO)
  ============================== */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Safari (HLS nativo)
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      return;
    }

    // Otros navegadores
    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: false,
        backBufferLength: 30, // 🔥 reduce consumo
        maxBufferLength: 60, // 🔥 evita cache gigante
        maxMaxBufferLength: 120,
      });

      hls.loadSource(src);
      hls.attachMedia(video);
      hlsRef.current = hls;
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [src]);

  /* ==============================
     Obtener estado backend (1 vez)
  ============================== */

  // useEffect(() => {
  //   const fetchProgress = async () => {
  //     try {
  //       const { data } = await MethodGet(
  //         `/progress-video/${userId}/${courseId}`,
  //       );

  //       if (data?.certificate_enabled) {
  //         setCertificateEnabled(true);
  //         setProgress(100);
  //         alreadySentRef.current = true;
  //         clearLocalProgress();
  //       }
  //     } catch (error) {
  //       console.error("Error obteniendo progreso:", error);
  //     }
  //   };

  //   fetchProgress();
  // }, [userId, courseId]);

  /* ==============================
     Restaurar progreso local
  ============================== */
  // useEffect(() => {
  //   const video = videoRef.current;
  //   if (!video || certificateEnabled) return;

  //   const seconds = getLocalProgress();
  //   if (seconds > 5) {
  //     video.currentTime = seconds;
  //   }
  // }, [certificateEnabled]);

  /* ==============================
     Progreso (cada 5s 🔥)
  ============================== */
  // useEffect(() => {
  //   if (certificateEnabled) return;

  //   intervalRef.current = setInterval(() => {
  //     const video = videoRef.current;
  //     if (!video || !video.duration) return;

  //     const percent = Math.floor((video.currentTime / video.duration) * 100);

  //     setProgress(percent);
  //     saveLocalProgress(video.currentTime);

  //     if (percent >= 80 && !alreadySentRef.current) {
  //       unlockCertificate(video);
  //     }
  //   }, 5000); // ⬅️ antes era 1000ms

  //   return () => {
  //     clearInterval(intervalRef.current);
  //     intervalRef.current = null;
  //   };
  // }, [certificateEnabled]);

  /* ==============================
     Backend call (UNA sola vez)
  ============================== */
  // const unlockCertificate = async (video) => {
  //   if (alreadySentRef.current) return;

  //   alreadySentRef.current = true;
  //   setCertificateEnabled(true);
  //   clearLocalProgress();

  //   try {
  //     await MethodPost(`/progress-video/${userId}/${courseId}`, {
  //       secondsWatched: Math.floor(video.currentTime),
  //       totalSeconds: Math.floor(video.duration),
  //       progress: 100,
  //       certificate_enabled: true,
  //     });
  //   } catch (error) {
  //     console.error("Error habilitando certificado:", error);
  //   }
  // };

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
          preload='metadata' // 🔥 CLAVE
          controls
          controlsList='nodownload noremoteplayback'
          disablePictureInPicture
          poster={poster}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={handleEnded}
          style={{ width: "100%", aspectRatio: "16/9" }}
        />

        <IconButton
          onClick={handlePlayPause}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(255,255,255,0.9)",
            "&:hover": { backgroundColor: "#fff" },
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
        <Typography fontWeight={700}>{title} </Typography>
        {/* <Typography fontSize='0.85rem' color='#DC4485'>
          Has avanzado un {progress}%
        </Typography> */}
        {/* 
        <LinearProgress
          variant='determinate'
          value={progress}
          sx={{
            height: 6,
            borderRadius: 10,
            backgroundColor: "#F3D6DF",
            "& .MuiLinearProgress-bar": { backgroundColor: "#E53888" },
          }}
        /> */}
      </Box>
      {/* 📚 BLOQUE MATERIAL DE TRABAJO (WORKBOOK) */}
      {workbookUrl !== null && (
        <Box
          sx={{
            mt: 3,
            p: 2.5,
            borderRadius: "20px",
            backgroundColor: "#F9FAFB", // Fondo neutro limpio para diferenciarlo del premio
            border: "1px solid #F3F4F6",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Stack direction='row' alignItems='center' spacing={1.5}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "12px",
                backgroundColor: "#FFF5F7",
                color: "#E53888",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
                flexShrink: 0,
              }}
            >
              📖
            </Box>
            <Box>
              <Typography
                variant='subtitle2'
                sx={{ fontWeight: "800", color: "#1F2937", lineHeight: 1.2 }}
              >
                Material didáctico disponible
              </Typography>
              <Typography
                variant='caption'
                sx={{ color: "#6B7280", fontWeight: 500 }}
              >
                Este curso contiene un cuaderno de trabajo complementario en
                PDF.
              </Typography>
            </Box>
          </Stack>

          <Button
            variant='outlined'
            component='a' // Cambiado a ancla nativa segura para archivos de S3
            href={workbookUrl}
            target='_blank'
            rel='noopener noreferrer'
            sx={{
              width: { xs: "100%", sm: "auto" },
              borderColor: "#E53888",
              color: "#E53888",
              fontWeight: "bold",
              fontSize: "0.85rem",
              textTransform: "none",
              borderRadius: "12px",
              px: 3,
              py: 1,
              "&:hover": {
                borderColor: "#C2185B",
                backgroundColor: "#FFF5F7",
              },
            }}
          >
            Descargar Workbook
          </Button>
        </Box>
      )}

      {/* 🌸 BLOQUE RECONOCIMIENTO OFICIAL */}
      {certificateEnabled && hasCertificate && safeUserName && (
        <Box
          sx={{
            mt: 3.5, // Ajustado para un espaciado armónico si coexisten ambos
            p: { xs: 3, md: 4 },
            borderRadius: "24px",
            backgroundColor: "#FFF4FA",
            border: "1px dashed #E53888",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              width: 54,
              height: 54,
              borderRadius: "50%",
              backgroundColor: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.6rem",
              mb: 2,
              border: "1px solid #FCE7F3",
            }}
          >
            🌸
          </Box>

          <Typography
            variant='h6'
            sx={{
              fontWeight: 900,
              color: "#1F2937",
              letterSpacing: "-0.5px",
              mb: 0.5,
            }}
          >
            ¡Tu reconocimiento está listo!
          </Typography>

          <Typography
            variant='body2'
            sx={{
              color: "#6B7280",
              maxWidth: "400px",
              mb: 3,
              lineHeight: 1.5,
            }}
          >
            Felicidades por concluir tus horas de práctica. Ya puedes descargar
            tu reconocimiento oficial firmado por las instructoras de Wapizima.
          </Typography>

          <Button
            variant='contained'
            onClick={() => downloadCertificate(courseId, safeUserName || "")}
            endIcon={<SimCardDownloadIcon sx={{ fontSize: "18px" }} />}
            sx={{
              width: { xs: "100%", sm: "auto" },
              minWidth: "240px",
              backgroundColor: "#E53888",
              color: "#ffffff",
              fontWeight: "bold",
              fontSize: "0.9rem",
              textTransform: "none",
              borderRadius: "14px",
              px: 4,
              py: 1.4,
              boxShadow: "none",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                backgroundColor: "#C2185B",
                boxShadow: "none",
              },
            }}
          >
            Descargar Reconocimiento
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default VideoPlayer;
