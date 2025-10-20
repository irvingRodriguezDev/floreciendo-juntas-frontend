import React from "react";
import { Box, Typography, styled } from "@mui/material";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist"; // Ícono para la temática

// Paleta de colores ajustada:
const PRIMARY_PINK = "#FBECEC"; // Rosa Pastel de Fondo (Más claro)
const ACCENT_BERRY = "#D81B60"; // Rosa Fuerte para decoraciones y texto
const TEXT_COLOR = "#4A148C"; // Morado oscuro para alto contraste

// --- Estilos personalizados para el Banner (Más grande y decorado) ---
const StyledBanner = styled(Box)(({ theme }) => ({
  // Dimensiones y fondo
  backgroundColor: PRIMARY_PINK,
  borderRadius: theme.shape.borderRadius * 2, // Bordes más redondeados
  padding: theme.spacing(6), // Más padding para hacerlo más grande
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  position: "relative",
  overflow: "hidden",
  boxShadow: "0 8px 15px rgba(216, 27, 96, 0.2)", // Sombra sutil
  width: "100%",
  marginTop: { md: "350px" },

  // Decoración Superior-Derecha: Círculo vacío y grande (como en tu imagen)
  "&::before": {
    content: '""',
    position: "absolute",
    top: "15%",
    right: "5%",
    width: 60,
    height: 60,
    border: `4px solid ${ACCENT_BERRY}`,
    borderRadius: "50%",
    opacity: 0.6,
  },

  // Decoración Inferior-Izquierda: Patrón de puntos (como en tu imagen)
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "10%",
    left: "5%",
    width: 30,
    height: 30,
    background: `radial-gradient(circle, ${ACCENT_BERRY} 40%, transparent 0)`,
    backgroundSize: "15px 15px",
    opacity: 0.4,
    transform: "rotate(-15deg)", // Ligera inclinación para dinamismo
  },

  // Decoración Superior-Izquierda: Patrón de rombos/enlaces
  "& > .decoration-top-left": {
    position: "absolute",
    top: "10%",
    left: "5%",
    width: 80,
    height: 20,
    // Usamos un clip-path para simular una cadena de rombos
    clipPath:
      "polygon(0% 50%, 25% 0%, 50% 50%, 75% 0%, 100% 50%, 75% 100%, 50% 50%, 25% 100%)",
    backgroundColor: ACCENT_BERRY,
    opacity: 0.3,
  },
}));

// --- Componente principal ---
const SystemBanner = ({ systemName, description }) => {
  return (
    <StyledBanner>
      {/* Elemento decorativo extra (Rombos/Enlaces) */}
      <Box className='decoration-top-left' />

      {/* Título Principal */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Typography
          variant='h3' // Más grande
          component='h1'
          sx={{
            fontWeight: 800,
            color: "#000",
            mr: 1,
          }}
        >
          {systemName}
        </Typography>
        {/* Ícono de flor más elegante */}
        <LocalFloristIcon sx={{ color: ACCENT_BERRY, fontSize: 40 }} />
      </Box>

      {/* Subtítulo / Lema */}
      <Typography variant='h6' sx={{ color: "#000", mt: 1 }}>
        {description}
      </Typography>
    </StyledBanner>
  );
};

export default SystemBanner;
