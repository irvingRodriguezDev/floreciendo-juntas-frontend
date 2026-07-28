import React from "react";
import { Box } from "@mui/material";
import { useMediaReady } from "../../hooks/useMediaReady";
import VideoPlayerCommunity from "./VideoPlayerCommunity";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const MediaItem = ({ item, isActive }) => {
  const ready = useMediaReady(item.url, item.type);

  if (!ready) return null;

  return (
    <Box
      sx={{
        width: "100%",
        maxHeight: "450px", // 👈 Limite controlado para la tarjeta
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: item.type === "image" ? "#FAF8F9" : "#000000",
      }}
    >
      {item.type === "image" ? (
        <Zoom>
          <Box
            component='img'
            src={item.url}
            alt={
              item.title || item.alt || "Archivo multimedia de la publicación"
            }
            loading='lazy'
            sx={{
              width: "100%",
              height: "100%",
              maxHeight: "450px", // 👈 Altura máxima uniforme
              objectFit: "cover", // 👈 Recorte estético encuadrado
              objectPosition: "center",
              cursor: "zoom-in",
              display: "block",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.01)", // Micro-interacción al pasar el cursor
              },
            }}
          />
        </Zoom>
      ) : (
        <Box sx={{ width: "100%", maxHeight: "450px" }}>
          <VideoPlayerCommunity src={item.url} isActive={isActive} />
        </Box>
      )}
    </Box>
  );
};

export default MediaItem;
