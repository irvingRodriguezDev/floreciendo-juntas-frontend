import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Stack,
  Button,
  alpha,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";

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
          linear-gradient(180deg, #FFFFFF 0%, #FFF0F5 100%),
          radial-gradient(circle at top left, rgba(232,62,140,0.06), transparent 70%)
        `,
        py: { xs: 6, md: 10 },
        px: { xs: 2, sm: 4, md: 6 },
        position: "relative",
        borderRadius: "32px",
        overflow: "hidden",
        border: "1px solid",
        borderColor: alpha("#E53888", 0.08),
        boxShadow: "0 20px 40px rgba(232, 62, 140, 0.04)",
      }}
    >
      {/* CONTENEDOR PRINCIPAL */}
      <Box sx={{ position: "relative", zIndex: 1 }}>
        {/* 🌸 CABECERA MODERNA Y ELEGANTE */}
        <Box
          sx={{
            textAlign: "center",
            mb: { xs: 4, md: 6 },
            px: 2,
            animation: "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            "@keyframes fadeInUp": {
              "0%": { opacity: 0, transform: "translateY(20px)" },
              "100%": { opacity: 1, transform: "translateY(0)" },
            },
          }}
        >
          {/* Badge superior minimalista */}
          <Stack
            direction='row'
            spacing={1}
            alignItems='center'
            justifyContent='center'
            sx={{ mb: 1.5 }}
          >
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                backgroundColor: alpha("#E53888", 0.1),
                color: "#E53888",
                px: 2,
                py: 0.6,
                borderRadius: "50px",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              <AutoAwesomeIcon sx={{ fontSize: "1rem" }} />
              <span>El camino al éxito</span>
            </Box>
          </Stack>

          {/* Título Principal Limpio y Potente */}
          <Typography
            variant='h2'
            sx={{
              color: "#2B1B24",
              fontWeight: 900,
              fontSize: { xs: "2rem", sm: "2.8rem", md: "3.5rem" },
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              lineHeight: 1.1,
              mb: 1.5,
            }}
          >
            Los 10{" "}
            <Box
              component='span'
              sx={{
                color: "#E53888",
                position: "relative",
              }}
            >
              Secretos
            </Box>
          </Typography>

          {/* Línea decorativa sutil */}
          <Box
            sx={{
              width: "60px",
              height: "4px",
              backgroundColor: "#E53888",
              margin: "0 auto",
              borderRadius: "2px",
              opacity: 0.8,
            }}
          />
        </Box>

        {/* 🎠 CARRUSEL OPTIMIZADO CON AUTOPLAY Y TOUCH MEJORADO */}
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
                  left: { sm: -5, md: 5 },
                  top: "45%",
                  transform: "translateY(-50%)",
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  color: "#E53888",
                  backdropFilter: "blur(8px)",
                  boxShadow: "0 8px 20px rgba(229, 56, 136, 0.18)",
                  border: "1px solid rgba(229, 56, 136, 0.2)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#E53888",
                    color: "white",
                    transform: "translateY(-50%) scale(1.08)",
                  },
                  zIndex: 10,
                  width: 48,
                  height: 48,
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
                  right: { sm: -5, md: 5 },
                  top: "45%",
                  transform: "translateY(-50%)",
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  color: "#E53888",
                  backdropFilter: "blur(8px)",
                  boxShadow: "0 8px 20px rgba(229, 56, 136, 0.18)",
                  border: "1px solid rgba(229, 56, 136, 0.2)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#E53888",
                    color: "white",
                    transform: "translateY(-50%) scale(1.08)",
                  },
                  zIndex: 10,
                  width: 48,
                  height: 48,
                  display: { xs: "none", sm: "flex" },
                }}
              >
                <ArrowForwardIcon sx={{ fontSize: "20px" }} />
              </IconButton>
            </>
          )}
        </Box>

        {/* 🚀 BOTÓN CTA: NAVEGACIÓN PROGRAMÁTICA (MANTIENE PWA EN FULLSCREEN) */}
        <Box sx={{ textAlign: "center", mt: { xs: 4, md: 6 } }}>
          <Button
            onClick={() => navigate("/secretos")}
            variant='contained'
            endIcon={<ArrowForwardIcon />}
            sx={{
              backgroundColor: "#E53888",
              color: "#FFFFFF",
              fontWeight: 700,
              fontSize: { xs: "0.95rem", md: "1.05rem" },
              padding: "12px 36px",
              borderRadius: "50px",
              textTransform: "none",
              boxShadow: "0 8px 25px rgba(229, 56, 136, 0.35)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#C2256F",
                transform: "translateY(-2px)",
                boxShadow: "0 12px 30px rgba(229, 56, 136, 0.45)",
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
