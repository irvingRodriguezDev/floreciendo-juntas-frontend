import React from "react";
import { Box, Typography } from "@mui/material";

const ProfileBanner = () => {
  // ----------------------------------------------------
  // --- 1. Contenido del Banner
  // ----------------------------------------------------
  const titleText = "Mi Perfil 🌸";
  const subtitleText = "¡Qué alegría verte floreciendo juntas!";

  // ----------------------------------------------------
  // --- 2. Estilos Base del Banner
  // ----------------------------------------------------
  const bannerSx = {
    // Fondo Rosa pálido
    bgcolor: "#FFF0F4", // Un rosa pálido ligeramente más fuerte que el ejemplo anterior
    padding: { xs: "60px 20px", md: "80px 40px" },
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
    borderBottom: "1px solid #F7C0C7",
    borderRadius: "20px", // Bordes más redondeados
    boxShadow: "0 4px 12px rgba(229, 56, 136, 0.1)", // Sombra sutil con el color primario
  };

  // ----------------------------------------------------
  // --- 3. Estilos para los Adornos (Simulando el look)
  // ----------------------------------------------------

  // Función helper para los estilos de adorno base
  const getAdornmentBaseSx = (position) => ({
    position: "absolute",
    opacity: 0.7,
    zIndex: 0, // Asegura que el texto esté encima
    userSelect: "none", // No se puede seleccionar el texto de adorno
    ...position, // Combina las propiedades de posición
  });

  // 1. Adorno de ondas (arriba-izquierda) - Color rosa fuerte
  const adornmentPinkWavesSx = getAdornmentBaseSx({
    top: "30px",
    left: { xs: "5%", md: "15%" },
    color: "#E53888", // Color primario de acento
    fontSize: { xs: "24px", md: "36px" },
    transform: "rotate(-10deg)",
  });

  // 2. Adorno de puntos/círculos (abajo-izquierda) - Color rosa suave
  const adornmentLightCirclesSx = getAdornmentBaseSx({
    bottom: "20px",
    left: "5%",
    color: "#F7CDD9", // Color suave de decoración
    fontSize: { xs: "36px", md: "50px" },
    lineHeight: "0.8",
  });

  // 3. Adorno de forma angular/triangular (abajo-derecha)
  const adornmentTriangleSx = getAdornmentBaseSx({
    bottom: "30px",
    right: "10%",
    width: "40px",
    height: "40px",
    // Creación del triángulo con bordes transparentes
    borderLeft: "20px solid transparent",
    borderRight: "20px solid transparent",
    borderBottom: "40px solid #E36F9E", // Rosa intermedio
    transform: "rotate(135deg)",
  });

  // 4. Adorno circular/anillo (arriba-derecha)
  const adornmentRingSx = getAdornmentBaseSx({
    top: "15px",
    right: "5%",
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    border: "5px solid #E53888", // Rosa fuerte
    opacity: 0.5,
  });

  return (
    <Box sx={bannerSx}>
      {/* --- Adornos Geométricos --- */}
      {/* 1. Ondas/Patrón de repetición */}
      <Box sx={adornmentPinkWavesSx}>&lt; &gt; &lt; &gt; &lt; &gt;</Box>
      {/* 2. Puntos/Círculos */}
      <Box sx={adornmentLightCirclesSx}>
        &#x25CF; &#x25CF; <br />
        &#x25CF; &#x25CF; &#x25CF; <br />
        &#x25CF; &#x25CF;
      </Box>
      {/* 3. Triángulo (sin contenido) */}
      <Box sx={adornmentTriangleSx} /> {/* 4. Anillo (sin contenido) */}
      <Box sx={adornmentRingSx} />{" "}
      {/* --- Contenido del Banner (Z-index 1 para que estén encima) --- */}
      <Typography
        variant='h3'
        component='h1'
        sx={{
          fontWeight: 700,
          color: "#333",
          mb: 1.5,
          zIndex: 1,
          position: "relative",
          fontSize: { xs: "2rem", md: "3rem" },
        }}
      >
        {titleText}
      </Typography>
      <Typography
        variant='h6'
        component='p'
        sx={{
          color: "#707070",
          zIndex: 1,
          position: "relative",
          fontSize: { xs: "1.1rem", md: "1.4rem" },
          fontWeight: 400,
        }}
      >
        {subtitleText}
      </Typography>
    </Box>
  );
};

export default ProfileBanner;
