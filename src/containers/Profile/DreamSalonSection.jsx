import React from "react";
import { Box, Typography, Button } from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";

const PRIMARY_PINK = "#E53888";
const LIGHT_ACCENT = "#FFF8FB"; // Rosa muy claro para el fondo

const DreamSalonSection = ({ salonTitle }) => {
  return (
    <Box
      sx={{
        p: 4,
        bgcolor: LIGHT_ACCENT,
        borderRadius: "12px",
        border: `2px dashed ${PRIMARY_PINK}`,
        textAlign: "center",
      }}
    >
      <StorefrontIcon sx={{ color: PRIMARY_PINK, fontSize: 45, mb: 1.5 }} />
      <Typography
        variant='h5'
        color={PRIMARY_PINK}
        sx={{ mb: 1, fontWeight: 600 }}
      >
        El Salón de Tus Sueños
      </Typography>
      <Typography
        variant='h4'
        color='text.primary'
        sx={{ mb: 2, fontWeight: 700 }}
      >
        "{salonTitle}"
      </Typography>
      <Typography variant='body1' color='text.secondary' sx={{ mb: 3 }}>
        ¡Este espacio refleja tu visión! El éxito de tu negocio es nuestro mayor
        orgullo. Sigue creciendo y transformando vidas con tu arte.
      </Typography>
      <Button
        variant='contained'
        sx={{
          bgcolor: PRIMARY_PINK,
          "&:hover": { bgcolor: "#D1789C" },
          color: "white",
        }}
      >
        Ver Galería del Salón
      </Button>
    </Box>
  );
};

export default DreamSalonSection;
