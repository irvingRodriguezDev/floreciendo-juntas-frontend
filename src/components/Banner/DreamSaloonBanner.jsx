import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { motion } from "framer-motion";

export default function SalonHeroSimple() {
  const handleScroll = () => {
    window.scrollBy({
      top: 550,
      behavior: "smooth",
    });
  };

  return (
    <Box
      component='section'
      sx={{
        width: "100%",
        minHeight: {
          xs: "28vh",
          sm: "36vh",
          md: "42vh",
        },
        px: { xs: 2.5, sm: 4, md: 6 },
        py: { xs: 6, md: 8 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `
          linear-gradient(180deg, #FFF4FA 0%, #FFF4FA 100%),
          radial-gradient(circle at top left, rgba(255, 200, 220, 0.25), transparent 60%)
        `,
        borderRadius: "32px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 💧 TEXTO DE FONDO (MARCA DE AGUA) */}
      <Typography
        variant='h1'
        sx={{
          position: "absolute",
          top: { xs: "20px", md: "10px" },
          left: "50%",
          transform: "translateX(-50%)",
          fontWeight: 900,
          color: "rgba(229, 56, 136, 0.094)",
          fontSize: { xs: "4.5rem", sm: "7.5rem", md: "11rem", lg: "13rem" },
          lineHeight: 1,
          whiteSpace: "nowrap",
          zIndex: 0,
          pointerEvents: "none",
          textTransform: "uppercase",
          letterSpacing: "-4px",
        }}
      >
        MI SALÓN
      </Typography>

      {/* CONTENEDOR PRINCIPAL */}
      <Box
        sx={{
          maxWidth: 820,
          mx: "auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Stack
          alignItems='center'
          component={motion.div}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* BADGE EDITORIAL SUPERIOR */}

          {/* TÍTULO PRINCIPAL CON DEGRADADO */}
          <Typography
            variant='h2'
            component='h1'
            sx={{
              fontWeight: 900,
              color: "#1F2937",
              fontSize: {
                xs: "2.1rem",
                sm: "2.8rem",
                md: "3.6rem",
              },
              mb: 2,
              lineHeight: 1.15,
              letterSpacing: "-1px",
            }}
          >
            Construye el salón que{" "}
            <Box
              component='span'
              sx={{
                background: "linear-gradient(135deg, #E53888 0%, #B82E6B 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
              }}
            >
              siempre imaginaste
            </Box>
          </Typography>

          {/* SUBTÍTULO */}
          <Typography
            sx={{
              color: "#4B5563",
              fontSize: {
                xs: "0.98rem",
                sm: "1.1rem",
                md: "1.2rem",
              },
              lineHeight: 1.7,
              mb: 4,
              maxWidth: 680,
              mx: "auto",
              fontWeight: 500,
            }}
          >
            Aprende a transformar tu idea en un salón con identidad, estructura
            y visión de negocio. Desde el concepto hasta un proyecto sólido y
            rentable.
          </Typography>

          {/* BOTÓN CTA CON SOMBRA Y MICRO-ANIMACIÓN */}
          <Button
            variant='contained'
            endIcon={
              <ArrowDownwardIcon
                className='arrow-icon'
                sx={{ transition: "transform 0.3s ease" }}
              />
            }
            onClick={handleScroll}
            sx={{
              backgroundColor: "#E53888",
              color: "#FFFFFF",
              fontWeight: 700,
              fontSize: { xs: "0.95rem", md: "1.05rem" },
              padding: "12px 34px",
              borderRadius: "50px",
              textTransform: "none",
              boxShadow: "0 6px 18px rgba(229, 56, 136, 0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#C2256F",
                transform: "translateY(-2px)",
                boxShadow: "0 10px 25px rgba(229, 56, 136, 0.4)",
                "& .arrow-icon": {
                  transform: "translateY(3px)",
                },
              },
            }}
          >
            Desliza para conocer los beneficios y productos
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
