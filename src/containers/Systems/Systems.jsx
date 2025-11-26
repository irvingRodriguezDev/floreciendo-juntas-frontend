import React, { useContext, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  Paper,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import SystemContext from "../../context/System/SystemContext";
import { Link } from "react-router-dom";
import PinkSpinner from "../../components/Loading/PinkSpinner";

const Systems = () => {
  const { getAllSystems, systems } = useContext(SystemContext);
  const theme = useTheme();
  const swiperPrevRef = useRef(null);
  const swiperNextRef = useRef(null);

  useEffect(() => {
    getAllSystems();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "#FFF0F0",
        p: { xs: 4, sm: 6, md: 8 },
        position: "relative",
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        borderRadius: "16px",
        overflow: "hidden",

        // ---------- ANIMACIONES KEYFRAMES ----------
        "@keyframes floatUp": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-40px)" },
        },
        "@keyframes pulse": {
          "0%": { transform: "scale(1)", opacity: 0.5 },
          "50%": { transform: "scale(1.15)", opacity: 0.9 },
          "100%": { transform: "scale(1)", opacity: 0.5 },
        },
        "@keyframes rotateSoft": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "@keyframes sparkle": {
          "0%, 100%": { opacity: 0 },
          "50%": { opacity: 0.8 },
        },
        "@keyframes wave": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(40px)" },
        },
      }}
    >
      {/* ---- DECORACIONES NUEVAS ---- */}

      {/* 🫧 Burbujas flotando */}
      {[1, 2, 3, 4].map((b, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            width: 20 + i * 6,
            height: 20 + i * 6,
            borderRadius: "50%",
            backgroundColor: "#F8C8D8",
            opacity: 0.28,
            filter: "blur(1px)",
            left: `${10 + i * 15}%`,
            bottom: `${5 + i * 12}%`,
            animation: `floatUp ${6 + i * 2}s ease-in-out infinite alternate`,
            zIndex: 0,
            display: { xs: "none", md: "block" },
          }}
        />
      ))}

      {/* ✨ Sparkles (brillitos) */}
      {[1, 2, 3, 4, 5, 6].map((s, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            width: 6,
            height: 6,
            borderRadius: "50%",
            backgroundColor: "#DC4485",
            opacity: 0.7,
            left: `${20 + i * 10}%`,
            top: `${15 + i * 8}%`,
            animation: `sparkle ${2 + i}s ease-in-out infinite`,
            zIndex: 0,
            display: { xs: "none", md: "block" },
          }}
        />
      ))}

      {/* 🔄 Círculo girando */}
      <Box
        sx={{
          position: "absolute",
          width: 140,
          height: 140,
          border: "4px solid #F3BBCE",
          borderRadius: "50%",
          top: "20%",
          right: "10%",
          opacity: 0.25,
          animation: "rotateSoft 22s linear infinite",
          zIndex: 0,
          display: { xs: "none", md: "block" },
        }}
      />

      {/* 🌿 Línea ondulada */}
      <Box
        sx={{
          position: "absolute",
          width: 120,
          height: 4,
          background:
            "linear-gradient(90deg, transparent, #DC4485, transparent)",
          top: "60%",
          left: "10%",
          borderRadius: 2,
          opacity: 0.4,
          animation: "wave 6s ease-in-out infinite alternate",
          zIndex: 0,
          display: { xs: "none", md: "block" },
        }}
      />

      {/* 🌸 Círculo pulsante */}
      <Box
        sx={{
          position: "absolute",
          bottom: "18%",
          right: "18%",
          width: 65,
          height: 65,
          borderRadius: "50%",
          backgroundColor: "#DC4485",
          opacity: 0.25,
          animation: "pulse 5s infinite ease-in-out",
          zIndex: 0,
          display: { xs: "none", md: "block" },
        }}
      />

      {/* DECORACIONES ORIGINALES */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "50px",
          height: "20px",
          borderTop: "3px double #DC4485",
          borderBottom: "3px double #F3BBCE",
          transform: "rotate(15deg)",
          display: { xs: "none", md: "block" },
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "10%",
          left: "8%",
          width: "80px",
          height: "80px",
          borderRadius: "50% 0 50% 50%",
          backgroundColor: "#DC4485",
          opacity: 0.5,
          display: { xs: "none", md: "block" },
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "15%",
          right: "5%",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          border: "3px solid #D72E79",
          opacity: 0.4,
          display: { xs: "none", md: "block" },
          zIndex: 0,
        }}
      />

      {/* --- Cabecera --- */}
      <Stack alignItems='center' sx={{ mb: 6, zIndex: 2 }}>
        <Typography
          variant='overline'
          sx={{
            color: theme.palette.text.secondary,
            fontWeight: 600,
            textTransform: "uppercase",
            position: "relative",
            mb: 1,
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: -4,
              left: "50%",
              transform: "translateX(-50%)",
              width: "40px",
              height: "4px",
              backgroundColor: "#DC4485",
              borderRadius: "2px",
            },
          }}
        >
          {/* Nuestros Cursos */}
        </Typography>

        <Typography
          variant='h3'
          sx={{
            fontWeight: 700,
            lineHeight: 1.2,
            textAlign: "center",
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
          }}
        >
          Explora Nuestras {""}
          <Box component='span' sx={{ position: "relative" }}>
            Academias
            <Box
              component='span'
              sx={{
                position: "absolute",
                left: 0,
                bottom: 0,
                width: "100%",
                height: "8px",
                backgroundColor: "#DC4485",
                opacity: 0.7,
                borderRadius: "4px",
                zIndex: -1,
              }}
            />
          </Box>{" "}
        </Typography>
      </Stack>

      {/* --- Carrusel --- */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: "1300px",
          mx: "auto",
          zIndex: 3,
          borderRadius: "12px",
        }}
      >
        <Swiper
          modules={[Navigation]}
          loop={true}
          spaceBetween={20}
          slidesPerView={1}
          navigation={{
            prevEl: swiperPrevRef.current,
            nextEl: swiperNextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = swiperPrevRef.current;
            swiper.params.navigation.nextEl = swiperNextRef.current;
          }}
          breakpoints={{
            600: { slidesPerView: 2, spaceBetween: 25 },
            900: { slidesPerView: 3, spaceBetween: 30 },
            1200: { slidesPerView: 4, spaceBetween: 35 },
          }}
        >
          {systems ? (
            systems.map((system) => (
              <SwiperSlide key={system.id}>
                <Link
                  to={`/cursos/bysystem/${system.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Paper
                    elevation={1}
                    sx={{
                      p: { xs: 3, sm: 4 },
                      textAlign: "center",
                      borderRadius: "16px",
                      minHeight: 280,
                      boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.08)",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-6px)",
                        boxShadow: "0px 12px 25px rgba(0, 0, 0, 0.12)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        backgroundColor: "#FCE4EC",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 2,
                      }}
                    >
                      <Box
                        component='img'
                        src={system.icon}
                        alt={system.name}
                        sx={{
                          width: "60%",
                          height: "60%",
                          objectFit: "contain",
                        }}
                      />
                    </Box>

                    <Typography variant='h6' sx={{ fontWeight: 700, mb: 1 }}>
                      {system.name}
                    </Typography>

                    <Typography
                      variant='body2'
                      color='text.secondary'
                      textAlign='justify'
                      sx={{
                        flexGrow: 1,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {system.description}
                    </Typography>
                  </Paper>
                </Link>
              </SwiperSlide>
            ))
          ) : (
            <PinkSpinner />
          )}
        </Swiper>

        {/* NAVIGATION BUTTONS */}
        <IconButton
          ref={swiperPrevRef}
          sx={{
            position: "absolute",
            left: { xs: -5, sm: -50 },
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "#F3BBCE",
            color: "white",
            "&:hover": { backgroundColor: "#F3BBCE" },
            zIndex: 10,
            width: 44,
            height: 44,
            display: { xs: "none", sm: "flex" },
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        <IconButton
          ref={swiperNextRef}
          sx={{
            position: "absolute",
            right: { xs: -5, sm: -50 },
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "#F3BBCE",
            color: "white",
            "&:hover": { backgroundColor: "#F3BBCE" },
            zIndex: 10,
            width: 44,
            height: 44,
            display: { xs: "none", sm: "flex" },
          }}
        >
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Systems;
