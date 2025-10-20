import React from "react";
import { Box, Typography } from "@mui/material";

const CoursesBanner = () => {
  // El texto que deseas
  const titleText = "Tu crecimiento empieza aquí 🌺";
  const subtitleText =
    "Descubre los cursos que te ayudarán a seguir floreciendo.";

  // Estilos base del banner (Fondo, Padding y Posición)
  const bannerSx = {
    bgcolor: "#FFF0F0", // Fondo similar al color crema de la imagen
    padding: { xs: "60px 20px", md: "80px 40px" }, // Padding responsivo
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
    borderBottom: "1px solid #EBEBEB",
    borderRadius: "16px",
    marginTop: { md: "90px" },
  };

  // --- Estilos para los Adornos (elementos decorativos) ---

  // Función helper para los estilos de adorno base
  const getAdornmentBaseSx = (position) => ({
    position: "absolute",
    opacity: 0.6,
    zIndex: 0, // Asegura que el texto esté encima
    ...position, // Combina las propiedades de posición
  });

  // 1. Adorno de ondas verde/turquesa (arriba-izquierda)
  const adornmentGreenSx = getAdornmentBaseSx({
    top: "30px",
    left: { xs: "5%", md: "15%" },
    color: "#E36F9E",
    fontSize: { xs: "20px", md: "30px" },
    transform: "rotate(-5deg)",
  });

  // 2. Adorno de puntos/círculos amarillos (abajo-izquierda)
  const adornmentYellowSx = getAdornmentBaseSx({
    bottom: "20px",
    left: "5%",
    color: "#F7CDD9",
    fontSize: { xs: "30px", md: "40px" },
    lineHeight: "0.8",
  });

  // 3. Adorno de forma angular/triangular violeta (abajo-derecha) - Usamos un truco CSS
  const adornmentVioletSx = getAdornmentBaseSx({
    bottom: "40px",
    right: "5%",
    width: "40px",
    height: "40px",
    // Creación del triángulo con bordes transparentes
    borderLeft: "20px solid transparent",
    borderRight: "20px solid transparent",
    borderBottom: "40px solid #E53888",
    transform: "rotate(150deg)",
  });

  // 4. Adorno circular/anillo (arriba-derecha)
  const adornmentRingSx = getAdornmentBaseSx({
    top: "10px",
    right: "2%",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    border: "4px solid #E53888",
    opacity: 0.5,
  });

  return (
    <Box sx={bannerSx}>
      {/* --- Adornos Geométricos --- */}
      <Box sx={adornmentGreenSx}>&lt;&gt;&lt;&gt;&lt;&gt;&lt;&gt;</Box>
      <Box sx={adornmentYellowSx}>
        &#x25CF; &#x25CF; <br />
        &#x25CF; &#x25CF; &#x25CF; <br />
        &#x25CF; &#x25CF;
      </Box>
      <Box sx={adornmentVioletSx} />{" "}
      {/* Box sin contenido, solo para el adorno */}
      <Box sx={adornmentRingSx} />{" "}
      {/* Box sin contenido, solo para el adorno */}
      {/* --- Contenido del Banner --- */}
      <Typography
        variant='h3'
        component='h1' // Usa h1 semánticamente
        sx={{
          fontWeight: 700,
          color: "#333",
          mb: 1,
          zIndex: 1,
          position: "relative",
          fontSize: { xs: "1.8rem", md: "2.5rem" }, // Tamaño responsivo
        }}
      >
        {titleText}
      </Typography>
      <Typography
        variant='h6'
        component='p'
        sx={{
          color: "#555",
          zIndex: 1,
          position: "relative",
          fontSize: { xs: "1rem", md: "1.2rem" }, // Tamaño responsivo
        }}
      >
        {subtitleText}
      </Typography>
    </Box>
  );
};

export default CoursesBanner;
