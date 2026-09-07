import React from "react";
import { Box, Typography } from "@mui/material";

const ProductDetailBanner = () => {
  const bannerSubtitle =
    "Da el siguiente paso para construir el salón de tus sueños ✨";

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        overflow: "hidden",
        borderRadius: "28px",
        py: { xs: 5, sm: 6, md: 7 },
        px: { xs: 3, sm: 4, md: 6 },
        textAlign: "center",
        backgroundColor: "rgba(255, 255, 255, 0.75)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255, 255, 255, 0.9)",
        boxShadow:
          "0 15px 35px -10px rgba(163, 11, 93, 0.08), 0 4px 12px rgba(0, 0, 0, 0.02)",
      }}
    >
      {/* 🌸 Esfera de luz decorativa superior */}
      <Box
        aria-hidden='true'
        sx={{
          position: "absolute",
          top: "-60px",
          left: "-60px",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255, 182, 193, 0.4) 0%, rgba(255, 255, 255, 0) 70%)",
          filter: "blur(20px)",
          pointerEvents: "none",
        }}
      />

      {/* 🌸 Esfera de luz decorativa inferior */}
      <Box
        aria-hidden='true'
        sx={{
          position: "absolute",
          bottom: "-50px",
          right: "-50px",
          width: "220px",
          height: "220px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(215, 46, 121, 0.25) 0%, rgba(255, 255, 255, 0) 70%)",
          filter: "blur(25px)",
          pointerEvents: "none",
        }}
      />

      {/* ✦ Estrella animada superior */}
      <Box
        aria-hidden='true'
        sx={{
          position: "absolute",
          top: "18px",
          right: { xs: "6%", md: "12%" },
          fontSize: { xs: "1.8rem", md: "2.2rem" },
          color: "#D72E79",
          opacity: 0.6,
          userSelect: "none",
          animation: "float 4s ease-in-out infinite",
          "@keyframes float": {
            "0%, 100%": { transform: "translateY(0) rotate(10deg)" },
            "50%": { transform: "translateY(-8px) rotate(25deg)" },
          },
        }}
      >
        ✦
      </Box>

      {/* ✧ Destellos inferiores */}
      <Box
        aria-hidden='true'
        sx={{
          position: "absolute",
          bottom: "16px",
          left: { xs: "5%", md: "10%" },
          fontSize: { xs: "1.2rem", md: "1.5rem" },
          color: "#FFB6C1",
          opacity: 0.5,
          letterSpacing: "4px",
          userSelect: "none",
        }}
      >
        ✧ ✧ ✧
      </Box>

      {/* 📝 Texto Principal */}
      <Typography
        variant='h3'
        component='h1'
        sx={{
          position: "relative",
          zIndex: 2,
          fontWeight: 900,
          color: "#2C1820",
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
          lineHeight: 1.3,
          letterSpacing: "-0.02em",
          maxWidth: "800px",
          mx: "auto",
        }}
      >
        Da el siguiente paso para construir el{" "}
        <Box
          component='span'
          sx={{
            background: "linear-gradient(135deg, #FF4B93 0%, #D72E79 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          salón de tus sueños
        </Box>{" "}
        ✨
      </Typography>

      {/* 🌷 Línea divisoria decorativa */}
      <Box
        sx={{
          mt: 2.5,
          height: "4px",
          width: "70px",
          mx: "auto",
          borderRadius: "50px",
          background: "linear-gradient(90deg, #FF4B93, #D72E79)",
          boxShadow: "0 2px 8px rgba(215, 46, 121, 0.3)",
        }}
      />
    </Box>
  );
};

export default ProductDetailBanner;
