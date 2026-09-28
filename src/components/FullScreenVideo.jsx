// src/components/VideoPlayer.jsx
import { Box } from "@mui/material";
import React from "react";
// Opcional: Puedes seguir usando un archivo CSS si lo necesitas, pero lo haremos con SX en el modal.
// import "./VideoPlayer.css";

const VideoPlayer = ({ videoSrc }) => {
  return (
    <Box
      sx={{
        width: "100%",
        // Controla el aspecto del video, ajusta según la resolución del video
        aspectRatio: "16 / 9",
        overflow: "hidden",
      }}
    >
      <video
        className='video-player'
        autoPlay
        loop
        playsInline
        // muted // ¡Importante para autoPlay en modales!
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      >
        <source src={videoSrc} type='video/mp4' />
        Tu navegador no soporta el elemento de video.
      </video>
    </Box>
  );
};

export default VideoPlayer;
