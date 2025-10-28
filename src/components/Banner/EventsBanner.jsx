import React from "react";
import { Box, Typography, Button } from "@mui/material";

const EventsBanner = () => {
  // Texto del banner
  const titleText = "¡Eventos que te hacen florecer! 🌸";
  const subtitleText =
    "Únete a nuestras actividades y descubre cómo seguir creciendo junto a otras mujeres increíbles.";

  // Estilos base del banner
  const bannerSx = {
    bgcolor: "#FFF0F0",
    padding: { xs: "60px 20px", md: "80px 40px" },
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
    borderBottom: "1px solid #EBEBEB",
    borderRadius: "16px",
    marginTop: { md: "50px" },
  };

  // Helper adornos
  const getAdornmentBaseSx = (position) => ({
    position: "absolute",
    opacity: 0.6,
    zIndex: 0,
    ...position,
  });

  const adornmentGreenSx = getAdornmentBaseSx({
    top: "30px",
    left: { xs: "5%", md: "15%" },
    color: "#E36F9E",
    fontSize: { xs: "20px", md: "30px" },
    transform: "rotate(-5deg)",
  });

  const adornmentYellowSx = getAdornmentBaseSx({
    bottom: "20px",
    left: "5%",
    color: "#F7CDD9",
    fontSize: { xs: "30px", md: "40px" },
    lineHeight: "0.8",
  });

  const adornmentVioletSx = getAdornmentBaseSx({
    bottom: "40px",
    right: "5%",
    width: "40px",
    height: "40px",
    borderLeft: "20px solid transparent",
    borderRight: "20px solid transparent",
    borderBottom: "40px solid #E53888",
    transform: "rotate(150deg)",
  });

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
      {/* Adornos */}
      <Box sx={adornmentGreenSx}>&lt;&gt;&lt;&gt;&lt;&gt;&lt;&gt;</Box>
      <Box sx={adornmentYellowSx}>
        &#x25CF; &#x25CF; <br />
        &#x25CF; &#x25CF; &#x25CF; <br />
        &#x25CF; &#x25CF;
      </Box>
      <Box sx={adornmentVioletSx} />
      <Box sx={adornmentRingSx} />

      {/* Contenido */}
      <Typography
        variant='h3'
        component='h1'
        sx={{
          fontWeight: 700,
          color: "#E53888",
          mb: 2,
          zIndex: 1,
          position: "relative",
          fontSize: { xs: "1.8rem", md: "2.5rem" },
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
          fontSize: { xs: "1rem", md: "1.2rem" },
          mb: 3,
        }}
      >
        {subtitleText}
      </Typography>
    </Box>
  );
};

export default EventsBanner;
