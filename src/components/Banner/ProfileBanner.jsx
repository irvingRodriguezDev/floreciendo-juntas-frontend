import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const ProfileBanner = () => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "32px",
        px: { xs: 3, md: 6 },
        py: { xs: 7, md: 10 },
        textAlign: "center",
        background: "linear-gradient(135deg, #FFE5EE 0%, #FFF7FA 100%)",
        boxShadow: "0 12px 30px rgba(229,56,136,0.15)",
      }}
    >
      {/* 🌸 Halo floral suave */}
      <Box
        component='img'
        src={
          "https://cdn.floreciendojuntas.com/production/statics/GERBERA+MAGENTA+desenfoque.png"
        }
        alt=''
        aria-hidden
        sx={{
          position: "absolute",
          top: "-40px",
          left: "-60px",
          width: 220,
          opacity: 0.35,
          filter: "blur(6px)",
          pointerEvents: "none",
        }}
      />

      {/* 🌷 Flor detalle */}
      <Box
        component={motion.img}
        src={
          "https://cdn.floreciendojuntas.com/production/statics/GERBERA+MAGENTA.png"
        }
        alt=''
        aria-hidden
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 0.9, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        sx={{
          position: "absolute",
          bottom: "-20px",
          right: "-10px",
          width: 160,
          opacity: 0.55,
          pointerEvents: "none",
        }}
      />

      {/* ✨ Contenido */}
      <Box sx={{ position: "relative", zIndex: 2 }}>
        <Typography
          component='h1'
          sx={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 800,
            color: "#C73578",
            fontSize: { xs: "2.1rem", md: "3rem" },
            mb: 1,
            letterSpacing: "-0.5px",
          }}
        >
          Mi Perfil
        </Typography>

        {/* Línea emocional */}
        <Box
          sx={{
            width: 56,
            height: 5,
            mx: "auto",
            mb: 3,
            borderRadius: 8,
            background: "linear-gradient(90deg, #E53888, #FFB6D5)",
          }}
        />

        <Typography
          sx={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 400,
            color: "#6A6A6A",
            fontSize: { xs: "1.05rem", md: "1.4rem" },
            maxWidth: 520,
            mx: "auto",
            lineHeight: 1.5,
          }}
        >
          Qué alegría verte floreciendo juntas ✨
        </Typography>
      </Box>
    </Box>
  );
};

export default ProfileBanner;
