import React from "react";
import { Box, Typography } from "@mui/material";

const ProfileBanner = () => {
  const titleText = "Mi Perfil 🌸";
  const subtitleText = "Qué alegría verte floreciendo juntas ✨";

  // ----------------------------------------------------
  // Banner
  // ----------------------------------------------------
  const bannerSx = {
    background: "linear-gradient(135deg, #FFE5EE 0%, #FFF7FA 100%)",
    padding: { xs: "70px 25px", md: "100px 60px" },
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
    borderRadius: "30px",
    boxShadow: "0 8px 24px rgba(229, 56, 136, 0.12)",
  };

  // Helper estilos base
  const getAdornment = (extra) => ({
    position: "absolute",
    opacity: 0.55,
    zIndex: 0,
    filter: "blur(0.5px)",
    userSelect: "none",
    ...extra,
  });

  // ----------------------------------------------------
  // Adornos
  // ----------------------------------------------------

  // 🌸 Flor grande en difuminado (arriba izquierda)
  const flowerBlurPink = getAdornment({
    top: "-40px",
    left: "-20px",
    width: "180px",
    height: "180px",
    background: "radial-gradient(circle, #FFB6D5 0%, transparent 70%)",
    borderRadius: "50%",
  });

  // 🌼 Flor dorada suave (abajo derecha)
  const flowerSoftGold = getAdornment({
    bottom: "-30px",
    right: "-10px",
    width: "150px",
    height: "150px",
    background: "radial-gradient(circle, #FFD9A8 0%, transparent 70%)",
    borderRadius: "50%",
  });

  // 🌸 Pétalos flotando (varios)
  const petalSx = (pos) =>
    getAdornment({
      fontSize: { xs: "26px", md: "32px" },
      color: "#E56A9F",
      animation: "floatPetal 6s ease-in-out infinite",
      ...pos,
    });

  // Animación
  const floatAnimation = `
    @keyframes floatPetal {
      0% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-15px) rotate(8deg); }
      100% { transform: translateY(0px) rotate(0deg); }
    }
  `;

  return (
    <Box sx={bannerSx}>
      <style>{floatAnimation}</style>

      {/* --- Adornos --- */}
      <Box sx={flowerBlurPink} />
      <Box sx={flowerSoftGold} />

      {/* pétalos */}
      <Box sx={petalSx({ top: "20px", left: "15%" })}>🌸</Box>
      <Box sx={petalSx({ top: "60px", right: "18%" })}>🌸</Box>
      <Box sx={petalSx({ bottom: "40px", left: "25%" })}>🌸</Box>
      <Box sx={petalSx({ bottom: "30px", right: "10%" })}>🌸</Box>

      {/* --- Contenido --- */}
      <Typography
        variant='h3'
        component='h1'
        sx={{
          fontWeight: 800,
          color: "#C73578",
          mb: 2,
          zIndex: 1,
          position: "relative",
          fontFamily: "'Poppins', sans-serif",
          fontSize: { xs: "2.2rem", md: "3.2rem" },
        }}
      >
        {titleText}
      </Typography>

      <Typography
        variant='h6'
        component='p'
        sx={{
          color: "#6A6A6A",
          zIndex: 1,
          position: "relative",
          fontWeight: 400,
          fontSize: { xs: "1.2rem", md: "1.5rem" },
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {subtitleText}
      </Typography>
    </Box>
  );
};

export default ProfileBanner;
