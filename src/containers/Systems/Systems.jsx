import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, IconButton, Stack, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";

import SystemContext from "../../context/System/SystemContext";
import PinkSpinner from "../../components/Loading/PinkSpinner";
import SystemCard from "./SystemCard";

const Systems = () => {
  const { getAllSystems, systems } = useContext(SystemContext);

  // Callback refs para asegurar la vinculación de Swiper sin bugs
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
          radial-gradient(circle at top left, rgba(255, 200, 220, 0.25), transparent 60%)
        `,
        py: { xs: 6, md: 10 },
        px: { xs: 2, sm: 4, md: 6 },
        position: "relative",
        borderRadius: "32px",
        overflow: "hidden",
      }}
    >
      {/* 💧 TEXTO DE FONDO (MARCA DE AGUA) */}
      <Typography
        variant='h1'
        sx={{
          position: "absolute",
          top: { xs: "35px", md: "10px" },
          left: "50%",
          transform: "translateX(-50%)",
          fontWeight: 900,
          color: "rgba(229, 56, 136, 0.094)",
          fontSize: {
            xs: "3.7rem",
            sm: "5.5rem",
            md: "8rem",
            lg: "12rem",
            xl: "16rem",
          },
          lineHeight: 1,
          whiteSpace: "nowrap",
          zIndex: 0,
          pointerEvents: "none",
          textTransform: "uppercase",
          letterSpacing: "-4px",
        }}
      >
        10 SECRETOS
      </Typography>

      {/* CONTENEDOR PRINCIPAL CON Z-INDEX */}
      <Box sx={{ position: "relative", zIndex: 1 }}>
        {/* 🌸 CABECERA EDITORIAL */}
        <Stack
          alignItems='center'
          sx={{ mb: { xs: 5, md: 7 }, px: 2 }}
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant='overline'
            sx={{
              color: "#E53888",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "4px",
              mb: 1,
              fontSize: { xs: "18px", md: "18px", lg: "18px" },
              textShadow: "0 2px 4px rgba(255,255,255,0.8)",
            }}
          >
            {" El camino "}
          </Typography>

          <Typography
            variant='h3'
            sx={{
              fontWeight: 900,
              lineHeight: 1.15,
              textAlign: "center",
              color: "#1A1A1A",
              fontSize: { xs: "2.1rem", sm: "2.8rem", md: "3.6rem" },
              maxWidth: "850px",
              letterSpacing: "-1px",
            }}
          >
            PARA SER UNA {""}
            <Box
              component='span'
              sx={{
                background: "linear-gradient(135deg, #E53888 0%, #B82E6B 100%)",
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

        {/* 🎠 CONTENEDOR DEL CARROUSEL */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: "1440px",
            mx: "auto",
            px: { xs: 1, sm: 6 },
          }}
        >
          {systems && systems.length > 0 ? (
            <Swiper
              modules={[Navigation]}
              loop={systems.length > 4}
              grabCursor={true}
              spaceBetween={24}
              slidesPerView={1.15}
              breakpoints={{
                640: { slidesPerView: 1.6, spaceBetween: 24 },
                900: { slidesPerView: 2.5, spaceBetween: 28 },
                1200: { slidesPerView: 3.5, spaceBetween: 32 },
                1440: { slidesPerView: 4, spaceBetween: 32 },
              }}
              navigation={{ prevEl, nextEl }}
              style={{ paddingBottom: "20px" }}
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

          {/* 🎛️ CONTROLES DE NAVEGACIÓN FLOTANTES GLASS */}
          {systems && systems.length > 0 && (
            <>
              <IconButton
                ref={(node) => setPrevEl(node)}
                sx={{
                  position: "absolute",
                  left: { xs: 0, sm: 5 },
                  top: "50%",
                  transform: "translateY(-50%)",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  color: "#E53888",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 10px 25px rgba(229, 56, 136, 0.15)",
                  border: "1px solid rgba(229, 56, 136, 0.2)",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
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
                <ArrowBackIcon sx={{ fontSize: "22px" }} />
              </IconButton>

              <IconButton
                ref={(node) => setNextEl(node)}
                sx={{
                  position: "absolute",
                  right: { xs: 0, sm: 5 },
                  top: "50%",
                  transform: "translateY(-50%)",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  color: "#E53888",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 10px 25px rgba(229, 56, 136, 0.15)",
                  border: "1px solid rgba(229, 56, 136, 0.2)",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
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
                <ArrowForwardIcon sx={{ fontSize: "22px" }} />
              </IconButton>
            </>
          )}
        </Box>

        {/* 🚀 BOTÓN CTA: EXPLORAR TODOS LOS SECRETOS */}
        <Box sx={{ textAlign: "center", mt: { xs: 5, md: 7 } }}>
          <Button
            component={Link}
            to='/secretos'
            variant='contained'
            endIcon={<ArrowForwardIcon />}
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
