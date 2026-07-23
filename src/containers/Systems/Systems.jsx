import React, { useContext, useEffect, useRef } from "react";
import { Box, Typography, IconButton, Stack, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";

import SystemContext from "../../context/System/SystemContext";
import PinkSpinner from "../../components/Loading/PinkSpinner";
import SystemCard from "./SystemCard";

const Systems = () => {
  const { getAllSystems, systems } = useContext(SystemContext);
  const swiperPrevRef = useRef(null);
  const swiperNextRef = useRef(null);

  useEffect(() => {
    getAllSystems();
  }, []);

  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #FFF0F5 0%, #FFFFFF 100%)",
        py: { xs: 6, md: 10 },
        px: { xs: 2, sm: 4, md: 6 },
        position: "relative",
        borderRadius: "32px",
        overflow: "hidden",
      }}
    >
      {/* Cabecera Editorial */}
      <Stack alignItems='center' sx={{ mb: 6, px: 2 }}>
        <Typography
          variant='caption'
          sx={{
            color: "#E53888",
            fontWeight: "800",
            textTransform: "uppercase",
            letterSpacing: "2px",
            mb: 1.5,
          }}
        >
          Ruta de Aprendizaje Profesional
        </Typography>

        <Typography
          variant='h3'
          sx={{
            fontWeight: 900,
            lineHeight: 1.2,
            textAlign: "center",
            color: "#1F2937",
            fontSize: { xs: "2.2rem", sm: "2.8rem", md: "3.5rem" },
            maxWidth: "800px",
          }}
        >
          Aprende con los{" "}
          <Box
            component='span'
            sx={{
              color: "#E53888",
              position: "relative",
              display: "inline-block",
            }}
          >
            10 Secretos
          </Box>{" "}
          para ser exitosa
        </Typography>
      </Stack>

      {/* Contenedor del Carrusel Slider */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: "1400px",
          mx: "auto",
          px: { xs: 1, sm: 6 }, // Deja espacio libre para las flechas laterales en desktop
        }}
      >
        {systems && systems.length > 0 ? (
          <Swiper
            modules={[Navigation]}
            loop={systems.length > 4}
            grabCursor={true}
            spaceBetween={24}
            slidesPerView={1.15} // En móvil muestra una y deja asomar la siguiente
            breakpoints={{
              640: { slidesPerView: 1.6, spaceBetween: 24 },
              900: { slidesPerView: 2.5, spaceBetween: 28 },
              1200: { slidesPerView: 3.5, spaceBetween: 32 },
              1440: { slidesPerView: 4, spaceBetween: 32 },
            }}
            navigation={{
              prevEl: swiperPrevRef.current,
              nextEl: swiperNextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = swiperPrevRef.current;
              swiper.params.navigation.nextEl = swiperNextRef.current;
            }}
          >
            {systems.map((system, index) => (
              <SwiperSlide
                key={system.id}
                style={{ height: "auto", display: "flex" }}
              >
                <SystemCard system={system} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Box sx={{ py: 6 }}>
            <PinkSpinner label='Cargando pilares de estudio...' />
          </Box>
        )}

        {/* CONTROLES DE NAVEGACIÓN FLOTANTES PLANOS */}
        <IconButton
          ref={swiperPrevRef}
          sx={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "#fff",
            color: "#1F2937",
            border: "1px solid #E5E7EB",
            "&:hover": { backgroundColor: "#FFF5F7", borderColor: "#F472B6" },
            zIndex: 10,
            width: 48,
            height: 48,
            display: { xs: "none", sm: "flex" },
            boxShadow: "none",
          }}
        >
          <ArrowBackIcon sx={{ fontSize: "20px" }} />
        </IconButton>

        <IconButton
          ref={swiperNextRef}
          sx={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "#fff",
            color: "#1F2937",
            border: "1px solid #E5E7EB",
            "&:hover": { backgroundColor: "#FFF5F7", borderColor: "#F472B6" },
            zIndex: 10,
            width: 48,
            height: 48,
            display: { xs: "none", sm: "flex" },
            boxShadow: "none",
          }}
        >
          <ArrowForwardIcon sx={{ fontSize: "20px" }} />
        </IconButton>
      </Box>

      {/* 🚀 BOTÓN CTA: EXPLORAR TODOS LOS SECRETOS */}
      <Box sx={{ textAlign: "center", mt: { xs: 4, md: 6 } }}>
        <Button
          component={Link}
          to='/secretos'
          variant='outlined'
          endIcon={<ArrowForwardIcon />}
          sx={{
            color: "#E53888",
            borderColor: "#E53888",
            borderWidth: "2px",
            fontWeight: 700,
            fontSize: { xs: "0.9rem", md: "1rem" },
            padding: "10px 28px",
            borderRadius: "50px",
            textTransform: "none",
            transition: "all 0.3s ease",
            "&:hover": {
              borderWidth: "2px",
              borderColor: "#C2256F",
              backgroundColor: "#E53888",
              color: "#FFFFFF",
              transform: "translateY(-2px)",
              boxShadow: "0 8px 20px rgba(229, 56, 136, 0.25)",
            },
          }}
        >
          Explorar todos los secretos
        </Button>
      </Box>
    </Box>
  );
};

export default Systems;
