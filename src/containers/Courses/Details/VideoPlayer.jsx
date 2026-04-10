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
  const [certificateEnabled, setCertificateEnabled] = useState(false);

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

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const { data } = await MethodGet(
          `/progress-video/${userId}/${courseId}`,
        );

        if (data?.certificate_enabled) {
          setCertificateEnabled(true);
          setProgress(100);
          alreadySentRef.current = true;
          clearLocalProgress();
        }
      } catch (error) {
        console.error("Error obteniendo progreso:", error);
      }
    };

    fetchProgress();
  }, [userId, courseId]);

  /* ==============================
     Restaurar progreso local
  ============================== */
  useEffect(() => {
    const video = videoRef.current;
    if (!video || certificateEnabled) return;

    const seconds = getLocalProgress();
    if (seconds > 5) {
      video.currentTime = seconds;
    }
  }, [certificateEnabled]);

  /* ==============================
     Progreso (cada 5s 🔥)
  ============================== */
  useEffect(() => {
    if (certificateEnabled) return;

    intervalRef.current = setInterval(() => {
      const video = videoRef.current;
      if (!video || !video.duration) return;

      const percent = Math.floor((video.currentTime / video.duration) * 100);

      setProgress(percent);
      saveLocalProgress(video.currentTime);

      if (percent >= 80 && !alreadySentRef.current) {
        unlockCertificate(video);
      }
    }, 5000); // ⬅️ antes era 1000ms

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [certificateEnabled]);

  /* ==============================
     Backend call (UNA sola vez)
  ============================== */
  const unlockCertificate = async (video) => {
    if (alreadySentRef.current) return;

    alreadySentRef.current = true;
    setCertificateEnabled(true);
    clearLocalProgress();

    try {
      await MethodPost(`/progress-video/${userId}/${courseId}`, {
        secondsWatched: Math.floor(video.currentTime),
        totalSeconds: Math.floor(video.duration),
        progress: 100,
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
  const safeUserName = usuario?.name ?? "";
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
      {workbookUrl !== null && (
        <Box sx={{ mt: 3, p: 2, borderRadius: 2, backgroundColor: "#FFF6F9" }}>
          <Typography fontSize='0.85rem' color='#DC4485'>
            Este curso contiene un material de trabajo
          </Typography>
          <Link to={workbookUrl} target='__blank'>
            <Button
              variant='contained'
              sx={{ borderRadius: "12px", bgcolor: "#e43888", mt: 2 }}
            >
              Consiguelo aquí
            </Button>
          </Link>
        </Box>
      )}

      {certificateEnabled && hasCertificate && safeUserName && (
        <Box
          sx={{
            mt: 4,
            p: 3,
            borderRadius: 2,
            backgroundColor: "#FFF6F9",
            textAlign: "center",
          }}
        >
          <Typography fontSize='1.8rem' fontWeight={700} color='#e53888'>
            ¡Reconocimiento disponible! 🌸
          </Typography>

          <Button
            fullWidth
            sx={{
              mt: 2,
              width: "50%",
              backgroundColor: "#DC4485",
              color: "#fff",
              fontWeight: 600,
              textTransform: "uppercase",
              borderRadius: "18px",
            }}
            onClick={() => downloadCertificate(courseId, safeUserName || "")}
          >
            Descargar Reconocimiento <SimCardDownloadIcon />
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default VideoPlayer;
