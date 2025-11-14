import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { ArrowForward } from "@mui/icons-material";

const slides = [
  {
    title: "El salón de tus sueños",
    subtitle: "Aquí comienza tu mejor versión ✨",
    description:
      "Sumérgete en un ambiente creado para elevar tu belleza y transformar tu estilo. Vive una experiencia diseñada solo para ti.",
    image:
      "https://template.hasthemes.com/brancy/brancy/assets/images/slider/slider3.webp",
  },
  {
    title: "Tu belleza, nuestro arte",
    subtitle: "Experiencias que enamoran 💖",
    description:
      "Déjate envolver por un servicio único, detalles perfectos y resultados que hablan por ti. Tu salón soñado está más cerca que nunca.",
    image:
      "https://template.hasthemes.com/brancy/brancy/assets/images/slider/slider4.webp",
  },
];

export default function SalonDreamSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrent((prev) => (prev + 1) % slides.length),
      6000
    );
    return () => clearInterval(interval);
  }, []);

  const slide = slides[current];

  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: "auto", md: "75vh", lg: "80vh" },
        borderRadius: "32px",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #fde5ef 0%, #fff 100%)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
        p: { xs: 2, sm: 3, md: 6 },
      }}
    >
      {/* Texto */}
      <Box
        sx={{
          width: { xs: "100%", md: "55%" },
          zIndex: 2,
          textAlign: { xs: "center", md: "left" },
          p: { xs: 2, sm: 2, md: 0 },
        }}
      >
        {/* Marca de agua cursiva */}
        <Typography
          sx={{
            fontFamily: "'Great Vibes', cursive",
            position: "absolute",
            top: { xs: "8%", md: "8%" },
            left: { xs: "50%", md: "5%" },
            transform: { xs: "translateX(-50%)", md: "none" },
            color: "#D82E7A",
            opacity: 0.15,
            userSelect: "none",
            pointerEvents: "none",

            // Tamaños CORREGIDOS y respetados
            fontSize: {
              xs: "50px",
              sm: "60px",
              md: "120px",
              lg: "140px",
              xl: "150px",
            },
            lineHeight: 0.9,
          }}
        >
          {slide.title}
        </Typography>

        <Typography
          variant='h2'
          sx={{
            fontWeight: 800,
            color: "#351C43",
            fontSize: { xs: "1.8rem", sm: "2.3rem", md: "3.2rem" },
            marginTop: { xs: 14, sm: 10, md: 14 },
            mb: 2,
          }}
        >
          {slide.subtitle}
        </Typography>

        <Typography
          sx={{
            color: "#4a3a50",
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
            maxWidth: { xs: "100%", sm: "85%", md: "90%" },
            mx: { xs: "auto", md: 0 },
            mb: 4,
            textAlign: "justify",
          }}
        >
          {slide.description}
        </Typography>

        <Button
          variant='contained'
          endIcon={<ArrowForward />}
          onClick={() =>
            window.scrollBy({
              top: 550,
              behavior: "smooth",
            })
          }
          sx={{
            background: "linear-gradient(135deg, #d33682, #f06292)",
            color: "white",
            fontWeight: 700,
            px: { xs: 2, sm: 3 },
            py: 1.4,
            borderRadius: "30px",
            textTransform: "none",
            fontSize: { xs: "0.9rem", sm: "1rem" },
            display: { xs: "none", md: "flex" },
          }}
        >
          Construir el salón de mis sueños
        </Button>
      </Box>

      {/* Imagen DESKTOP (ahora sí se oculta en mobile) */}
      <motion.div
        key={slide.image}
        initial={{ opacity: 0, scale: 1.15 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        style={{
          position: "absolute",
          right: "4%",
          bottom: 0,
          width: "32%",
          display: window.innerWidth < 900 ? "none" : "block",
        }}
      >
        <img
          src={slide.image}
          alt={slide.title}
          style={{
            width: "100%",
            borderRadius: "20px",
          }}
        />
      </motion.div>
      {/* Imagen MOBILE */}
    </Box>
  );
}
