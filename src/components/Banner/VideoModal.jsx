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
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import VideoPlayer from "../FullScreenVideo"; // Asegúrate de la ruta correcta
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const VideoModal = ({ buttonText = "Ver Nuestro Video", videoUrl }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  // Para que el modal sea full screen en móviles, como es común en UX
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const primaryPink = "#DB4586";

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {/* PLAY ANIMADO */}
      <motion.div
        onClick={handleOpen}
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "transparent",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          position: "relative",
          boxShadow: "0 0 20px rgba(255, 77, 141, 0.6)",
        }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Burbuja animada detrás */}
        <motion.div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            backgroundColor: primaryPink,
            opacity: 0.4,
            zIndex: -1,
          }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.4, 0, 0.4],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <PlayArrowIcon sx={{ fontSize: 58, color: "#F971AF" }} />
      </motion.div>

      {/* MODAL DE VIDEO */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth='md'
        fullScreen={fullScreen}
        PaperProps={{
          sx: {
            borderRadius: fullScreen ? 0 : "16px",
            backgroundColor: "black",
            m: fullScreen ? 0 : 2,
          },
        }}
      >
        <DialogContent sx={{ p: 0, position: "relative" }}>
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

          {open && <VideoPlayer videoSrc={videoUrl} />}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoModal;
