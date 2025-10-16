import React from "react";
import { Box, Typography, Stack, useTheme } from "@mui/material";

// Puedes pasar el título y el breadcrumb como props
const CourseTitle = ({
  title = "Nombre del Curso Aquí",
  //   breadcrumb = "Inicio / Cursos",
}) => {
  const theme = useTheme();

  // Colores de los adornos para mantener la consistencia
  const accentGreen = "#E53888"; // Verde vibrante
  const accentYellow = "#E53888"; // Amarillo vibrante
  const accentPurple = "#E53888"; // Morado oscuro
  const softBgColor = "#FFF0F0"; // Fondo crema pálido

  return (
    <Box
      sx={{
        backgroundColor: softBgColor, // Fondo de color suave
        padding: theme.spacing(20, 4), // Padding generoso
        position: "relative", // Para posicionar los adornos
        overflow: "hidden",
        minHeight: { xs: "250px", sm: "200px" }, // Altura mínima para que los adornos se vean bien
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center", // Centrar todo el contenido
        mt: 2,
        borderRadius: "18px",
      }}
    >
      {/* --- Adornos de Fondo --- */}

      {/* Adorno de ondas verde/agua (similar al de la imagen) */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "60px",
          height: "30px",
          borderTop: `4px double ${accentGreen}`,
          borderBottom: `4px double ${accentGreen}`,
          transform: "rotate(15deg)",
          opacity: 0.7,
          display: { xs: "none", md: "block" },
          zIndex: 0,
        }}
      />

      {/* Adorno de puntos/círculos amarillo (similar al de la imagen) */}
      <Box
        sx={{
          position: "absolute",
          bottom: "15%",
          left: "8%",
          width: "70px",
          height: "70px",
          backgroundImage: `radial-gradient(circle, ${accentYellow} 20%, transparent 20%)`,
          backgroundSize: "12px 12px",
          opacity: 0.6,
          transform: "rotate(-25deg)",
          display: { xs: "none", md: "block" },
          zIndex: 0,
        }}
      />

      {/* Adorno de líneas/figura abstracta morada (similar al de la imagen) */}
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          right: "5%",
          width: "50px",
          height: "50px",
          borderRight: `5px double ${accentPurple}`,
          borderLeft: `5px double ${accentPurple}`,
          transform: "rotate(45deg)",
          opacity: 0.5,
          borderRadius: "5px",
          display: { xs: "none", md: "block" },
          zIndex: 0,
        }}
      />

      {/* Adorno de círculos entrelazados (similar al de la imagen, esquina superior derecha) */}
      <Box
        sx={{
          position: "absolute",
          top: "5%",
          right: "2%",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          border: `5px solid ${accentPurple}`,
          opacity: 0.3,
          display: { xs: "none", md: "block" },
          zIndex: 0,
          "&::before": {
            content: '""',
            position: "absolute",
            width: "calc(100% - 10px)",
            height: "calc(100% - 10px)",
            borderRadius: "50%",
            border: `5px solid ${accentPurple}`,
            top: "5px",
            left: "5px",
            opacity: 0.5,
          },
        }}
      />
      {/* --- Fin Adornos --- */}

      {/* --- Contenido Central (Título y Breadcrumb) --- */}
      <Stack
        alignItems='center'
        spacing={1}
        sx={{ maxWidth: "800px", zIndex: 1 }}
      >
        <Typography
          variant='h3' // h3 para un título grande y principal
          component='h1'
          sx={{
            fontWeight: 700,
            color: theme.palette.text.primary, // Color de texto oscuro
            lineHeight: 1.2,
            fontSize: { xs: "2.5rem", sm: "3rem", md: "4rem" }, // Responsivo
            mb: 1,
          }}
        >
          {title}
        </Typography>

        {/* <Typography variant='body2' color='text.secondary'>
          {breadcrumb}
        </Typography> */}
      </Stack>
    </Box>
  );
};

export default CourseTitle;
