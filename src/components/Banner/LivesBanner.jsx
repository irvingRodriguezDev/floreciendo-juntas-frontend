// src/components/Lives/LivesBanner.jsx
import { Box, Typography, Container, Stack } from "@mui/material";
import { motion } from "framer-motion";

const LivesBanner = () => {
  return (
    <Box
      component={motion.section}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      sx={{
        width: "100%",
        minHeight: { xs: "32vh", sm: "38vh", md: "42vh" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        mt: { xs: 4, lg: 1 },
        background:
          "radial-gradient(circle at 50% 30%, #FFF0F6 0%, #FAF7F8 70%)",
        borderRadius: { xs: "0 0 24px 24px", md: "0 0 40px 40px" },
      }}
    >
      {/* 🌸 WATERMARK DE FONDO EDITORIAL */}
      <Typography
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: { xs: "18vw", md: "14vw" },
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
        EN VIVO
      </Typography>

      {/* 🌿 Ambient Glows Refinados */}
      <Box
        component={motion.div}
        animate={{ y: [0, -16, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        sx={{
          position: "absolute",
          top: "10%",
          left: "10%",
          width: { xs: 140, md: 220 },
          height: { xs: 140, md: 220 },
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(214, 51, 132, 0.22) 0%, rgba(255, 255, 255, 0) 70%)",
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
          right: "10%",
          width: { xs: 180, md: 260 },
          height: { xs: 180, md: 260 },
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255, 182, 193, 0.35) 0%, rgba(255, 255, 255, 0) 70%)",
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />

      {/* 🌸 CONTENIDO PRINCIPAL */}
      <Container maxWidth='lg' sx={{ zIndex: 2, py: 4 }}>
        <Stack alignItems='center' spacing={{ xs: 1.5, sm: 2 }}>
          {/* Badge Estilizado con indicador "Live" */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.2,
              px: 2.5,
              py: 0.6,
              borderRadius: "50px",
              background: "rgba(214, 51, 132, 0.08)",
              border: "1px solid rgba(214, 51, 132, 0.15)",
              backdropFilter: "blur(6px)",
            }}
          >
            {/* Punto de emisión en vivo latiendo */}
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: "#D63384",
                boxShadow: "0 0 0 0 rgba(214, 51, 132, 0.7)",
                animation: "pulse 2s infinite",
                "@keyframes pulse": {
                  "0%": {
                    transform: "scale(0.95)",
                    boxShadow: "0 0 0 0 rgba(214, 51, 132, 0.7)",
                  },
                  "70%": {
                    transform: "scale(1)",
                    boxShadow: "0 0 0 8px rgba(214, 51, 132, 0)",
                  },
                  "100%": {
                    transform: "scale(0.95)",
                    boxShadow: "0 0 0 0 rgba(214, 51, 132, 0)",
                  },
                },
              }}
            />
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
              Comunidad & Transmisiones
            </Typography>
          </Box>

          {/* Título Principal */}
          <Typography
            component={motion.h1}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: "easeOut" }}
            sx={{
              fontWeight: 900,
              textAlign: "center",
              color: "#2C1820",
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
            Floreciendo Juntas{" "}
            <Box
              component='span'
              sx={{
                color: "#A30B5D",
                display: { xs: "block", sm: "inline" },
              }}
            ></Box>
          </Typography>

          {/* Subtítulo / Descripción */}
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
              maxWidth: 580,
              pt: 0.5,
              lineHeight: 1.6,
            }}
          >
            Encuentros creados para compartir experiencias reales, aprender
            juntas y crecer en un espacio seguro, cercano y lleno de propósito.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default LivesBanner;
