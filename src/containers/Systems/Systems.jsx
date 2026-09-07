import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, IconButton, Stack, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom"; // 👈 Usamos useNavigate en lugar de Link

import "swiper/css";
import "swiper/css/navigation";

import SystemContext from "../../context/System/SystemContext";
import PinkSpinner from "../../components/Loading/PinkSpinner";
import SystemCard from "./SystemCard";

const Systems = () => {
  const { getAllSystems, systems } = useContext(SystemContext);
  const navigate = useNavigate();

  // Callback refs para vincular los botones personalizados de Swiper
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);

  useEffect(() => {
    getAllSystems();
  }, []);

  return (
    <Box
      sx={{
        background: `
          linear-gradient(180deg, #FFF0F5 0%, #FFFFFF 100%),
          radial-gradient(circle at 10% 20%, rgba(229, 56, 136, 0.08), transparent 40%)
        `,
        py: { xs: 5, md: 9 },
        px: { xs: 2, sm: 4, md: 6 },
        position: "relative",
        borderRadius: { xs: "24px", md: "36px" },
        overflow: "hidden",
      }}
    >
      {/* 💧 MARCA DE AGUA EDITORIAL */}
      <Typography
        variant='h1'
        sx={{
          position: "absolute",
          top: { xs: "20px", md: "0px" },
          left: "50%",
          transform: "translateX(-50%)",
          fontWeight: 900,
          color: "rgba(229, 56, 136, 0.06)",
          fontSize: {
            xs: "4.2rem",
            sm: "7rem",
            md: "10rem",
            lg: "13rem",
          },
          lineHeight: 1,
          whiteSpace: "nowrap",
          zIndex: 0,
          pointerEvents: "none",
          textTransform: "uppercase",
          letterSpacing: "-3px",
          userSelect: "none",
        }}
      >
        10 SECRETOS
      </Typography>

      {/* CONTENEDOR PRINCIPAL */}
      <Box sx={{ position: "relative", zIndex: 1 }}>
        {/* 🌸 CABECERA ELEGANTE SIN FRAMER-MOTION */}
        <Stack
          alignItems='center'
          sx={{
            mb: { xs: 4, md: 6 },
            px: 2,
            // Animación CSS ligera nativa en lugar de framer-motion
            animation: "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            "@keyframes fadeInUp": {
              "0%": { opacity: 0, transform: "translateY(20px)" },
              "100%": { opacity: 1, transform: "translateY(0)" },
            },
          }}
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              px: 2,
              py: 0.6,
              borderRadius: "30px",
              backgroundColor: "rgba(229, 56, 136, 0.08)",
              border: "1px solid rgba(229, 56, 136, 0.15)",
              mb: 1.5,
            }}
          >
            <AutoAwesomeIcon sx={{ fontSize: 16, color: "#E53888" }} />
            <Typography
              variant='overline'
              sx={{
                color: "#E53888",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "2.5px",
                fontSize: "0.75rem",
                lineHeight: 1,
              }}
            >
              El camino al éxito
            </Typography>
          </Box>

          <Typography
            variant='h3'
            sx={{
              fontWeight: 900,
              lineHeight: 1.15,
              textAlign: "center",
              color: "#111111",
              fontSize: { xs: "1.9rem", sm: "2.7rem", md: "3.4rem" },
              maxWidth: "800px",
              letterSpacing: "-0.8px",
            }}
          >
            PARA SER UNA{" "}
            <Box
              component='span'
              sx={{
                background: "linear-gradient(135deg, #FF4B93 0%, #D72E79 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                position: "relative",
                display: "inline-block",
              }}
            >
              MANICURISTA
            </Box>{" "}
            EXITOSA
          </Typography>
        </Stack>

        {/* 🎠 CARROUSEL OPTIMIZADO CON AUTOPLAY Y TOUCH MEJORADO */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: "1400px",
            mx: "auto",
            px: { xs: 0, sm: 5 },
          }}
        >
          {systems && systems.length > 0 ? (
            <Swiper
              modules={[Navigation, Autoplay]}
              loop={systems.length > 3}
              autoplay={{
                delay: 4500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              grabCursor={true}
              spaceBetween={20}
              slidesPerView={1.18}
              centeredSlides={false}
              breakpoints={{
                520: { slidesPerView: 1.7, spaceBetween: 20 },
                840: { slidesPerView: 2.5, spaceBetween: 24 },
                1100: { slidesPerView: 3.3, spaceBetween: 28 },
                1350: { slidesPerView: 4, spaceBetween: 28 },
              }}
              navigation={{ prevEl, nextEl }}
              style={{ paddingBottom: "24px", paddingTop: "8px" }}
            >
              {systems.map((system, index) => (
                <SwiperSlide
                  key={system.id || index}
                  style={{ height: "auto", display: "flex" }}
                >
                  <SystemCard system={system} index={index} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <Box sx={{ py: 6, textAlign: "center" }}>
              <PinkSpinner label='Cargando pilares de estudio...' />
            </Box>
          )}

          {/* 🎛️ CONTROLES GLASS FLOTANTES */}
          {systems && systems.length > 0 && (
            <>
              <IconButton
                ref={(node) => setPrevEl(node)}
                aria-label='Anterior'
                sx={{
                  position: "absolute",
                  left: { sm: -10, md: -15 },
                  top: "50%",
                  transform: "translateY(-50%)",
                  backgroundColor: "rgba(255, 255, 255, 0.92)",
                  color: "#D72E79",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 12px 28px rgba(215, 46, 121, 0.2)",
                  border: "1.5px solid rgba(255, 255, 255, 0.8)",
                  transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                  "&:hover": {
                    backgroundColor: "#D72E79",
                    color: "#FFFFFF",
                    transform: "translateY(-50%) scale(1.08)",
                  },
                  zIndex: 10,
                  width: 46,
                  height: 46,
                  display: { xs: "none", sm: "flex" },
                }}
              >
                <ArrowBackIcon sx={{ fontSize: "20px" }} />
              </IconButton>

              <IconButton
                ref={(node) => setNextEl(node)}
                aria-label='Siguiente'
                sx={{
                  position: "absolute",
                  right: { sm: -10, md: -15 },
                  top: "50%",
                  transform: "translateY(-50%)",
                  backgroundColor: "rgba(255, 255, 255, 0.92)",
                  color: "#D72E79",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 12px 28px rgba(215, 46, 121, 0.2)",
                  border: "1.5px solid rgba(255, 255, 255, 0.8)",
                  transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                  "&:hover": {
                    backgroundColor: "#D72E79",
                    color: "#FFFFFF",
                    transform: "translateY(-50%) scale(1.08)",
                  },
                  zIndex: 10,
                  width: 46,
                  height: 46,
                  display: { xs: "none", sm: "flex" },
                }}
              >
                <ArrowForwardIcon sx={{ fontSize: "20px" }} />
              </IconButton>
            </>
          )}
        </Box>

        {/* 🚀 BOTÓN CTA: NAVEGACIÓN PROGRAMÁTICA (MANTIENE PWA EN FULLSCREEN) */}
        <Box sx={{ textAlign: "center", mt: { xs: 3, md: 5 } }}>
          <Button
            onClick={() => navigate("/secretos")} // 👈 SOLUCIÓN PWA: Cero tags <a>
            variant='contained'
            endIcon={<ArrowForwardIcon />}
            sx={{
              background: "linear-gradient(135deg, #FF4B93 0%, #D72E79 100%)",
              color: "#FFFFFF",
              fontWeight: 700,
              fontSize: { xs: "0.9rem", md: "1rem" },
              padding: "12px 32px",
              borderRadius: "50px",
              textTransform: "none",
              boxShadow: "0 8px 22px rgba(215, 46, 121, 0.35)",
              transition: "all 0.25s ease",
              "&:hover": {
                background: "linear-gradient(135deg, #D72E79 0%, #B81D60 100%)",
                transform: "translateY(-2px)",
                boxShadow: "0 12px 28px rgba(215, 46, 121, 0.45)",
              },
              "&:active": {
                transform: "scale(0.97)",
              },
            }}
          >
            Explorar todos los secretos
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Systems;
