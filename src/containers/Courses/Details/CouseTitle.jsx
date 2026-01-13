import React from "react";
import { Box, Typography, Stack, useTheme } from "@mui/material";

const CourseTitle = ({
  title = "Nombre del Curso Aquí",
  // subtitle = "Un espacio para crecer, aprender y florecer juntas",
}) => {
  const theme = useTheme();

  // Paleta Floreciendo Juntas
  const primaryPink = "#E53888";
  const softPink = "#FFF1F7";
  const lavender = "#C8B6E2";
  const warmYellow = "#FFD6A5";

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: { xs: "16px", md: "24px" },
        mt: { xs: 2, md: 3 },

        /* Mobile First */
        px: { xs: 2.5, sm: 4, md: 6 },
        py: { xs: 6, sm: 7, md: 9 },

        minHeight: { xs: "200px", sm: "220px", md: "260px" },

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",

        background: `
          linear-gradient(
            135deg,
            ${softPink} 0%,
            #FFFFFF 55%,
            ${softPink} 100%
          )
        `,
      }}
    >
      {/* 🌸 Decoración orgánica izquierda */}
      <Box
        sx={{
          position: "absolute",
          top: "-40px",
          left: "-40px",
          width: "160px",
          height: "160px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${lavender} 0%, transparent 70%)`,
          opacity: 0.35,
          display: { xs: "none", sm: "block" },
        }}
      />

      {/* 🌼 Decoración orgánica derecha */}
      <Box
        sx={{
          position: "absolute",
          bottom: "-50px",
          right: "-50px",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${warmYellow} 0%, transparent 70%)`,
          opacity: 0.35,
          display: { xs: "none", sm: "block" },
        }}
      />

      {/* 🌿 Líneas suaves (detalle femenino) */}
      <Box
        sx={{
          position: "absolute",
          top: "18%",
          right: "12%",
          width: "60px",
          height: "30px",
          borderTop: `3px solid ${primaryPink}`,
          borderBottom: `3px solid ${primaryPink}`,
          borderRadius: "20px",
          opacity: 0.35,
          transform: "rotate(-12deg)",
          display: { xs: "none", md: "block" },
        }}
      />

      {/* 🌸 Contenido */}
      <Stack spacing={1.5} sx={{ zIndex: 1, maxWidth: "760px" }}>
        <Typography
          component='h1'
          sx={{
            fontWeight: 800,
            lineHeight: 1.15,
            color: theme.palette.text.primary,

            fontSize: {
              xs: "1.9rem",
              sm: "2.4rem",
              md: "3.2rem",
            },
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            color: theme.palette.text.secondary,
            fontSize: {
              xs: "0.95rem",
              sm: "1.05rem",
              md: "1.15rem",
            },
          }}
        >
          {/* {subtitle} */}
        </Typography>
      </Stack>
    </Box>
  );
};

export default CourseTitle;
