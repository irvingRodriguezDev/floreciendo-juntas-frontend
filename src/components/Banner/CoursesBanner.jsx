import React from "react";
import { Box, Typography, Container } from "@mui/material";
import { motion } from "framer-motion";

const CoursesBanner = () => {
  return (
    <Box
      component={motion.section}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      sx={{
        minHeight: {
          xs: "28vh",
          sm: "34vh",
          md: "38vh",
        },
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        background: `
#FFF4FA
        `,
      }}
    >
      {/* 🌿 Blobs suaves (solo desktop) */}
      <Box
        component={motion.div}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        sx={{
          position: "absolute",
          top: "14%",
          left: "6%",
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: "rgba(229, 56, 136, 0.1)",
          filter: "blur(40px)",
          display: { xs: "none", md: "block" },
        }}
      />

      <Box
        component={motion.div}
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
        sx={{
          position: "absolute",
          bottom: "14%",
          right: "8%",
          width: 130,
          height: 130,
          borderRadius: "50%",
          background: "rgba(247, 205, 217, 0.28)",
          filter: "blur(48px)",
          display: { xs: "none", md: "block" },
        }}
      />

      {/* 🌸 Contenido */}
      <Container
        maxWidth='sm'
        component={motion.div}
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        sx={{
          textAlign: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Eyebrow */}
        <Typography
          sx={{
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#E53888",
            mb: 1,
          }}
        >
          Cursos
        </Typography>

        <Typography
          variant='h2'
          sx={{
            fontWeight: 600,
            color: "#2E2E2E",
            lineHeight: 1.2,
            mb: 1.5,
            fontSize: {
              xs: "1.7rem",
              sm: "2.1rem",
              md: "2.4rem",
            },
          }}
        >
          Tu crecimiento empieza aquí
        </Typography>

        <Typography
          sx={{
            maxWidth: 480,
            mx: "auto",
            color: "#666",
            fontSize: {
              xs: "0.95rem",
              md: "1.05rem",
            },
            lineHeight: 1.7,
          }}
        >
          Cursos creados para acompañarte en cada etapa, aprender a tu ritmo y
          seguir floreciendo con intención 🌸
        </Typography>

        {/* Indicador de scroll */}
        <Typography
          sx={{
            mt: 2.5,
            fontSize: "0.8rem",
            color: "#E53888",
            opacity: 0.85,
          }}
        >
          Desliza para explorar
        </Typography>

        <Box
          sx={{
            width: 50,
            height: 2,
            bgcolor: "#E53888",
            borderRadius: 10,
            mx: "auto",
            mt: 1,
          }}
        />
      </Container>
    </Box>
  );
};

export default CoursesBanner;
