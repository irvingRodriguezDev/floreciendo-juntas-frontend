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
        minHeight: item.type === "video" ? "300px" : "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {item.type === "image" ? (
        <Zoom>
          <Box
            component='img'
            src={item.url}
            alt='Post'
            sx={{
              width: "100%",
              height: "auto",
              borderRadius: 2,
              cursor: "zoom-in",
              display: "block",
              // Aquí no importa el overflow del padre,
              // porque la librería crea un clon de la imagen fuera del Swiper
            }}
          />
        </Zoom>
      ) : (
        <VideoPlayerCommunity src={item.url} isActive={isActive} />
      )}
    </Box>
  );
};

export default MediaItem;
