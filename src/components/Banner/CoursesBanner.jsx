import React from "react";
import { Box, Typography, Container } from "@mui/material";
import { motion } from "framer-motion";

const CoursesBanner = () => {
  return (
    <Box
      component={motion.section}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      sx={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        background: `
          radial-gradient(circle at top left, #FFE3EC 0%, transparent 40%),
          radial-gradient(circle at bottom right, #FFD6E6 0%, transparent 45%),
          linear-gradient(180deg, #FFF5F7 0%, #FFF 100%)
        `,
      }}
    >
      {/* 🌿 Adornos orgánicos */}
      <Box
        component={motion.div}
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        sx={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: "rgba(229, 56, 136, 0.12)",
          filter: "blur(40px)",
        }}
      />

      <Box
        component={motion.div}
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        sx={{
          position: "absolute",
          bottom: "10%",
          right: "8%",
          width: 160,
          height: 160,
          borderRadius: "50%",
          background: "rgba(247, 205, 217, 0.35)",
          filter: "blur(50px)",
        }}
      />

      {/* 🌸 Contenido */}
      <Container
        maxWidth='md'
        component={motion.div}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        sx={{
          textAlign: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Typography
          variant='h1'
          sx={{
            fontWeight: 800,
            color: "#2E2E2E",
            lineHeight: 1.1,
            mb: 2,
            fontSize: {
              xs: "2.2rem",
              sm: "2.8rem",
              md: "3.4rem",
            },
          }}
        >
          Tu crecimiento empieza aquí 🌺
        </Typography>

        <Typography
          variant='h6'
          sx={{
            maxWidth: 520,
            mx: "auto",
            color: "#555",
            fontWeight: 400,
            fontSize: {
              xs: "1rem",
              md: "1.2rem",
            },
          }}
        >
          Descubre los cursos que te acompañan en cada etapa de tu camino,
          aprende a tu ritmo y sigue floreciendo con intención.
        </Typography>

        {/* 🌷 Línea decorativa */}
        <Box
          component={motion.div}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          sx={{
            width: 90,
            height: 4,
            bgcolor: "#E53888",
            borderRadius: 10,
            mx: "auto",
            mt: 4,
          }}
        />
      </Container>
    </Box>
  );
};

export default CoursesBanner;
