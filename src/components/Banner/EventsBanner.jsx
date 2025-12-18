import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { motion } from "framer-motion";

const EventsBanner = () => {
  return (
    <Box
      component={motion.section}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      sx={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        px: { xs: 2, sm: 4 },
        background: `
          radial-gradient(circle at top left, #FFE3EC 0%, transparent 40%),
          radial-gradient(circle at bottom right, #FFD6E6 0%, transparent 45%),
          linear-gradient(180deg, #FFF5F7 0%, #FFFFFF 100%)
        `,
      }}
    >
      {/* 🌿 Adornos flotantes */}
      <Box
        component={motion.div}
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 9, repeat: Infinity }}
        sx={{
          position: "absolute",
          top: "12%",
          left: "6%",
          width: 110,
          height: 110,
          borderRadius: "50%",
          bgcolor: "rgba(229, 56, 136, 0.14)",
          filter: "blur(40px)",
        }}
      />

      <Box
        component={motion.div}
        animate={{ y: [0, 22, 0] }}
        transition={{ duration: 11, repeat: Infinity }}
        sx={{
          position: "absolute",
          bottom: "10%",
          right: "8%",
          width: 150,
          height: 150,
          borderRadius: "50%",
          bgcolor: "rgba(247, 205, 217, 0.4)",
          filter: "blur(55px)",
        }}
      />

      {/* 🌸 Contenido */}
      <Container
        maxWidth='md'
        component={motion.div}
        initial={{ y: 32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.7 }}
        sx={{
          textAlign: "center",
          zIndex: 2,
        }}
      >
        <Typography
          component='h1'
          sx={{
            fontWeight: 800,
            color: "#E53888",
            lineHeight: 1.15,
            mb: 2,
            fontSize: {
              xs: "2rem", // 📱 Mobile first
              sm: "2.6rem",
              md: "3.2rem",
            },
          }}
        >
          ¡Eventos que te harán florecer! 🌸
        </Typography>

        <Typography
          component='p'
          sx={{
            color: "#555",
            maxWidth: 520,
            mx: "auto",
            mb: 4,
            fontSize: {
              xs: "1rem", // 📱 Mobile first
              md: "1.2rem",
            },
          }}
        >
          Únete a nuestras actividades, conecta con mujeres increíbles y vive
          experiencias que impulsan tu crecimiento personal.
        </Typography>

        {/* 🌼 Línea decorativa */}
        <Box
          component={motion.div}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          sx={{
            width: 180,
            height: 4,
            bgcolor: "#E53888",
            borderRadius: 10,
            mx: "auto",
            mt: 5,
          }}
        />
      </Container>
    </Box>
  );
};

export default EventsBanner;
