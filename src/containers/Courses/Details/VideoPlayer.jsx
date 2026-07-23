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
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
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
  workbookUrl,
  allVideos = [],
  activeVideo,
}) => {
  const { downloadCertificate } = useContext(CoursesContext);

  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const intervalRef = useRef(null);
  const alreadySentRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [certificateEnabled, setCertificateEnabled] = useState(true);

  const COURSE_KEY = `course-progress-${userId}-${courseId}`;
  const activeVideoKey = activeVideo?.id || activeVideo?.cloudfrontUrl;

  /* ==============================
     LocalStorage helpers
  ============================== */
  /* ==============================
     LocalStorage helpers (Optimizados)
  ============================== */
  const saveVideoProgress = (seconds, currentPercent) => {
    if (!activeVideoKey) return;

    let data = {};
    try {
      data = JSON.parse(localStorage.getItem(COURSE_KEY) || "{}");
    } catch (e) {
      console.error("Error al leer progreso local:", e);
    }

    const existing = data[activeVideoKey] || { seconds: 0, percent: 0 };

    // Siempre guardamos el valor máximo alcanzado (Math.max) tanto en % como en segundos
    const newPercent = Math.max(currentPercent, existing.percent);
    const newSeconds = Math.max(seconds, existing.seconds);

    // Solo escribimos en localStorage si realmente hubo un incremento
    if (newPercent > existing.percent || newSeconds > existing.seconds) {
      data[activeVideoKey] = {
        seconds: newSeconds,
        percent: newPercent,
      };

      try {
        localStorage.setItem(COURSE_KEY, JSON.stringify(data));
      } catch (e) {
        console.error("Error al guardar progreso local:", e);
      }
    }
  };

  const getGlobalProgress = () => {
    if (!allVideos || allVideos.length === 0) {
      return { globalPercent: 0, totalSeconds: 0 };
    }

    let data = {};
    try {
      data = JSON.parse(localStorage.getItem(COURSE_KEY) || "{}");
    } catch (e) {
      console.error("Error al obtener progreso global local:", e);
    }

    let totalPercent = 0;
    let totalSeconds = 0;

    allVideos.forEach((v) => {
      const key = v.id || v.cloudfrontUrl;
      if (key && data[key]) {
        totalPercent += data[key].percent || 0;
        totalSeconds += data[key].seconds || 0;
      }
    });

    // Aseguramos que el porcentaje global no exceda 100% por redondeos
    const rawAverage = totalPercent / allVideos.length;
    const globalPercent = Math.min(100, Math.round(rawAverage));

    return {
      globalPercent,
      totalSeconds: Math.floor(totalSeconds),
    };
  };

  const clearLocalProgress = () => {
    try {
      localStorage.removeItem(COURSE_KEY);
    } catch (e) {
      console.error("Error al limpiar progreso local:", e);
    }
  };
  /* ==============================
     Sincronización con el Backend
  ============================== */
  const updateBackendProgress = async (
    totalSeconds,
    currentPercent,
    certEnabled,
  ) => {
    try {
      await MethodPost(`/progress-video/${userId}/${courseId}`, {
        secondsWatched: Math.floor(totalSeconds),
        percent: currentPercent,
        certificate_enabled: certEnabled,
      });
      return true; // 👈 Confirmamos que la sincronización fue exitosa
    } catch (error) {
      console.error("Error actualizando progreso en backend:", error);
      return false; // 👈 Indicamos que falló para tomar precauciones
    }
  };

  const unlockCertificate = async (totalSeconds, globalPercent) => {
    // Si ya se está procesando o ya se envió, evitamos peticiones duplicadas
    if (alreadySentRef.current) return;

    // Bloqueo temporal mientras se ejecuta la petición
    alreadySentRef.current = true;

    const success = await updateBackendProgress(
      totalSeconds,
      globalPercent,
      true,
    );

    if (success) {
      // ✅ Si la API respondió con éxito, aseguramos el estado local
      setCertificateEnabled(true);
      clearLocalProgress();
    } else {
      // ❌ Si falló la red, liberamos la bandera para reintentar en el siguiente ciclo
      alreadySentRef.current = false;
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

  const handleEnded = () => {
    const video = videoRef.current;
    if (!video) return;

    saveVideoProgress(video.currentTime, 100);
    const { globalPercent, totalSeconds } = getGlobalProgress();
    setProgress((prev) => Math.max(prev, globalPercent));

    if (globalPercent >= 80 && !alreadySentRef.current) {
      unlockCertificate(totalSeconds, globalPercent);
    } else {
      updateBackendProgress(totalSeconds, globalPercent, false);
    }
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
  useEffect(() => {
    let isMounted = true; // Evita memory leaks si el componente se desmonta mientras la API responde

    const fetchProgress = async () => {
      try {
        const { data } = await MethodGet(
          `/progress-video/${userId}/${courseId}`,
        );

        if (!isMounted) return;

        if (data?.certificate_enabled) {
          setCertificateEnabled(true);
          setProgress(100);
          alreadySentRef.current = true;
          clearLocalProgress(); // Aseguramos limpiar cache si la API confirma certificado activo
        } else {
          setCertificateEnabled(false);
          const bdPercent = data?.percent || 0;
          const localPercent = getGlobalProgress().globalPercent;
          setProgress(Math.max(bdPercent, localPercent));
        }
      } catch (error) {
        console.error("Error obteniendo progreso desde la API:", error);
        if (!isMounted) return;

        // Fallback a LocalStorage en caso de fallo de red
        const localPercent = getGlobalProgress().globalPercent;
        setProgress(localPercent);
      }
    };

    if (userId && courseId) {
      fetchProgress();
    }

    return () => {
      isMounted = false;
    };
  }, [userId, courseId]);

  /* ==============================
     Progreso (Local cada 5s 🔥 / API cada 60s 🚀)
  ============================== */
  useEffect(() => {
    // Si el certificado ya está activo o faltan IDs obligatorios, no iniciamos el timer
    if (certificateEnabled || !userId || !courseId) return;

    let apiTickCounter = 0;

    intervalRef.current = setInterval(() => {
      const video = videoRef.current;
      if (
        !video ||
        !video.duration ||
        video.duration === Infinity ||
        video.paused
      ) {
        return;
      }

      // 1. Guardado Local & UI (Cada 5 segundos)
      const videoPercent = Math.round(
        (video.currentTime / video.duration) * 100,
      );

      window.dispatchEvent(new Event("progressUpdated"));
      saveVideoProgress(video.currentTime, videoPercent);

      const { globalPercent, totalSeconds } = getGlobalProgress();
      setProgress((prev) => Math.max(prev, globalPercent));

      // Incrementar contador acumulado
      apiTickCounter += 5;

      // 2. Liberación Inmediata de Certificado (Si llega al 80%)
      if (globalPercent >= 80 && !alreadySentRef.current) {
        unlockCertificate(totalSeconds, globalPercent);
        return;
      }

      // 3. Envío al Backend (Únicamente cada 60 segundos = 12 ticks)
      if (apiTickCounter >= 60) {
        updateBackendProgress(totalSeconds, globalPercent, false);
        apiTickCounter = 0; // Reiniciar contador
      }
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [certificateEnabled, activeVideo, allVideos, userId, courseId]);

  /* ==============================
     UI
  ============================== */
  const safeUserName = usuario?.name ?? "";

  return (
    <Box sx={{ maxWidth: "100%", mx: "auto", mt: 4 }}>
      {/* Video Player */}
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

      {/* Progress Section */}
      <Box sx={{ mt: 3, p: 2, borderRadius: 2, backgroundColor: "#FFF6F9" }}>
        <Typography fontWeight={700}>{title}</Typography>
        <Typography fontSize='0.85rem' color='#DC4485' sx={{ mt: 1, mb: 1 }}>
          Has avanzado un {progress}% del curso general
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

      {/* 📚 BLOQUE MATERIAL DE TRABAJO (WORKBOOK) */}
      {workbookUrl !== null && (
        <Box
          sx={{
            mt: 3,
            p: 2.5,
            borderRadius: "20px",
            backgroundColor: "#F9FAFB",
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
              "&:hover": { borderColor: "#C2185B", backgroundColor: "#FFF5F7" },
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
            sx={{ color: "#6B7280", maxWidth: "400px", mb: 3, lineHeight: 1.5 }}
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
