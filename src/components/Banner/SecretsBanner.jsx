import React from "react";
import { Box, Typography, Container, Stack } from "@mui/material";
import { motion } from "framer-motion";
import underline from "../../assets/svg/underline.svg";

const SecretsBanner = () => {
  return (
    <Box
      component={motion.section}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      sx={{
        minHeight: { xs: "32vh", sm: "38vh", md: "42vh" },
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        mt: { xs: 4, lg: 1 },
        background:
          "radial-gradient(circle at 50% 30%, #FFF0F6 0%, #FAF7F8 70%)",
      }}
    >
      {/* 🌸 WATERMARK DE FONDO EDITORIAL */}
      <Typography
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: { xs: "16vw", md: "13vw" },
          fontWeight: 900,
          color: "#A30B5D",
          opacity: 0.099,
          whiteSpace: "nowrap",
          userSelect: "none",
          pointerEvents: "none",
          letterSpacing: "0.08em",
          zIndex: 0,
        }}
      >
        FLORECER
      </Typography>

      {/* 🌿 Ambient Glows Refinados */}
      <Box
        component={motion.div}
        animate={{ y: [0, -16, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        sx={{
          position: "absolute",
          top: "10%",
          left: "12%",
          width: { xs: 140, md: 220 },
          height: { xs: 140, md: 220 },
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(214, 51, 132, 0.25) 0%, rgba(255, 255, 255, 0) 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      <Box
        component={motion.div}
        animate={{ y: [0, 20, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        sx={{
          position: "absolute",
          bottom: "5%",
          right: "12%",
          width: { xs: 180, md: 260 },
          height: { xs: 180, md: 260 },
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255, 182, 193, 0.4) 0%, rgba(255, 255, 255, 0) 70%)",
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />

      {/* 🌸 Contenido Principal */}
      <Container maxWidth='lg' sx={{ zIndex: 2, py: 4 }}>
        <Stack alignItems='center' spacing={{ xs: 1.5, sm: 2 }}>
          {/* Overline / Badge Estilizado */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            sx={{
              px: 2.5,
              py: 0.6,
              borderRadius: "50px",
              background: "rgba(214, 51, 132, 0.08)",
              border: "1px solid rgba(214, 51, 132, 0.15)",
              backdropFilter: "blur(6px)",
            }}
          >
            <Typography
              sx={{
                color: "#D63384",
                fontWeight: 800,
                fontSize: { xs: "0.75rem", sm: "0.85rem" },
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                textAlign: "center",
              }}
            >
              La Fórmula del Éxito
            </Typography>
          </Box>

          {/* Título principal */}
          <Typography
            component={motion.h1}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: "easeOut" }}
            sx={{
              fontWeight: 900,
              textAlign: "center",
              color: "#2C1820", // Tono oscuro muy elegante para el texto base
              lineHeight: { xs: 1.2, md: 1.15 },
              fontSize: {
                xs: "2.1rem",
                sm: "3rem",
                md: "3.8rem",
              },
              maxWidth: 920,
              letterSpacing: "-0.02em",
            }}
          >
            Descubre los 10 Secretos{" "}
            <Box
              component='span'
              sx={{
                display: "inline-block",
                position: "relative",
                color: "#A30B5D", // Destaque magenta/rosa profundo
                px: 0.5,
              }}
            >
              para ser exitosa en tu negocio
              <Box
                component='span'
                sx={{
                  position: "absolute",
                  left: 0,
                  bottom: { xs: -8, sm: -10 },
                  width: "100%",
                  height: { xs: 12, sm: 16 },
                  backgroundImage: `url(${underline})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  opacity: 0.95,
                }}
              />
            </Box>
          </Typography>

          {/* Subtítulo / Bajada complementaria */}
          <Typography
            component={motion.p}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            sx={{
              color: "#6B5860",
              fontSize: { xs: "0.95rem", sm: "1.1rem" },
              fontWeight: 400,
              textAlign: "center",
              maxWidth: 600,
              pt: 0.5,
            }}
          >
            Estrategias diseñadas para elevar la gestión, la imagen y los
            resultados de tu marca de belleza.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default SecretsBanner;
