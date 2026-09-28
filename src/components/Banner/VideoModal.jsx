// src/components/VideoModal.jsx
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import VideoPlayer from "../FullScreenVideo";

const VideoModal = ({ buttonText = "Ver Nuestro Video", videoUrl }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const primaryPink = "#DB4586";

  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const fullScreen = isSm;
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /** Tamaños dinámicos según breakpoints */
  let size = 100;
  if (isSm) size = 65;
  else if (isMd) size = 80;

  const iconSize = size * 0.7;

  return (
    <>
      {/* BOTÓN PLAY RESPONSIVE */}
      <motion.div
        onClick={handleOpen}
        style={{
          width: size,
          height: size,
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
        {/* Glow animado */}
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

        <PlayArrowIcon sx={{ fontSize: iconSize, color: "#F971AF" }} />
      </motion.div>

      {/* MODAL DE VIDEO MEJORADO */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth='lg'
        fullScreen={fullScreen}
        PaperProps={{
          sx: {
            borderRadius: fullScreen ? 0 : "16px",
            backgroundColor: "black",
            m: fullScreen ? 0 : 2,
            overflow: "hidden",
          },
        }}
      >
        <DialogContent
          sx={{
            p: 0,
            position: "relative",
            backgroundColor: "black",

            // 🔥 Mantener proporción 16:9 en todas las pantallas
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            aspectRatio: "16/9",

            // Para evitar barras negras en móviles landscape
            maxHeight: "90vh",
          }}
        >
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

          {open && <VideoPlayer key={videoUrl} videoSrc={videoUrl} />}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoModal;
