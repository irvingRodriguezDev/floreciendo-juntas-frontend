// src/components/VideoModal.jsx
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  Button,
  Box,
  useTheme,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import VideoPlayer from "../FullScreenVideo"; // Asegúrate de la ruta correcta
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const VideoModal = ({ buttonText = "Ver Nuestro Video", videoUrl }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  // Para que el modal sea full screen en móviles, como es común en UX
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const primaryPink = "#e91e63";

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {/* Botón para Abrir el Modal */}
      <Button
        variant='outlined'
        startIcon={<PlayArrowIcon />}
        onClick={handleOpen}
        sx={{
          color: primaryPink,
          borderColor: primaryPink,
          fontWeight: 600,
          padding: "8px 20px",
          borderRadius: "8px",
          textTransform: "none",
          "&:hover": {
            backgroundColor: primaryPink,
            color: "white",
            borderColor: primaryPink,
          },
        }}
      >
        {buttonText}
      </Button>

      {/* MUI Dialog (Modal) */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth='md' // Tamaño máximo del modal
        fullScreen={fullScreen} // Full screen en dispositivos pequeños
        PaperProps={{
          // Estilo del contenedor del modal
          sx: {
            borderRadius: fullScreen ? 0 : "16px",
            backgroundColor: "black", // Fondo negro para mejor visualización del video
            m: fullScreen ? 0 : 2, // Margen en desktop
          },
        }}
      >
        <DialogContent sx={{ p: 0, position: "relative" }}>
          {/* Botón de Cerrar */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "white",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 10,
              "&:hover": {
                backgroundColor: primaryPink,
              },
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Reproductor de Video */}
          {/* Importante: Solo renderizamos el video si está abierto para asegurar que autoPlay funcione */}
          {open && <VideoPlayer videoSrc={videoUrl} />}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoModal;
