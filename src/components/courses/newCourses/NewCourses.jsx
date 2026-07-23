import React, { useContext, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  IconButton,
  Stack,
  useTheme,
  Button,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import CoursesContext from "../../../context/Courses/CoursesContext";
import AuthContext from "../../../context/Auth/AuthContext";
import NewCourseCard from "./NewCourseCard"; // 👈 Tu nueva Card modularizada

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const NewCourses = () => {
  const { courses, getLastestCourses } = useContext(CoursesContext);
  const { usuario, autenticado } = useContext(AuthContext);
  const theme = useTheme();

  const swiperPrevRef = useRef(null);
  const swiperNextRef = useRef(null);

  useEffect(() => {
    if (autenticado && usuario) {
      getLastestCourses(usuario, autenticado);
    } else {
      getLastestCourses(null, false);
    }
  }, [usuario, autenticado]);

  const lightYellow = "#ffecb3";

  return (
    <Box
      sx={{
        background: `
          linear-gradient(180deg, #fff 0%, #FFDFEF 100%),
          radial-gradient(circle at top left, rgba(255,200,220,0.25), transparent 60%)
        `,
        position: "relative",
        py: { xs: 6, md: 8 },
        overflow: "hidden",
        borderRadius: "24px",
      }}
    >
      {/* ————— HEADER ————— */}
      <Stack
        alignItems='center'
        sx={{ mb: 6, px: { xs: 2, md: 4 } }}
        component={motion.div}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant='overline'
          sx={{
            color: theme.palette.text.secondary,
            letterSpacing: "3px",
            fontWeight: 600,
            textTransform: "uppercase",
            mb: 1,
            fontSize: { xs: "14px", md: "16px" },
          }}
        >
          Nuevos Lanzamientos
        </Typography>

        <Typography
          variant='h3'
          sx={{
            fontWeight: 700,
            lineHeight: 1.2,
            textAlign: "center",
            color: "#E53888",
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
          }}
        >
          <Box component='span' sx={{ position: "relative" }}>
            Lo Más Nuevo
            <Box
              component='span'
              sx={{
                position: "absolute",
                left: 0,
                bottom: 0,
                width: "100%",
                height: "8px",
                backgroundColor: "#FFF",
                opacity: 0.7,
                borderRadius: "4px",
                zIndex: -1,
              }}
            />
          </Box>
        </Typography>
      </Stack>

      {/* ————— CONTENIDO / SWIPER ————— */}
      <Box
        sx={{ position: "relative", maxWidth: "100%", px: { xs: 2, md: 4 } }}
      >
        {!courses || courses.length === 0 ? (
          /* Mensaje vacío cuando no hay nuevos cursos */
          <Typography
            variant='h4'
            sx={{
              textAlign: "center",
              fontWeight: 500,
              color: "text.primary",
              fontSize: { xs: "1.5rem", sm: "2rem" },
              my: 4,
            }}
          >
            🌷 ¡Por ahora no tenemos nuevos{" "}
            <Box
              component='span'
              sx={{ position: "relative", display: "inline-block" }}
            >
              cursos disponibles
              <Box
                component='span'
                sx={{
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  width: "100%",
                  height: "8px",
                  backgroundColor: lightYellow,
                  borderRadius: "4px",
                  opacity: 0.7,
                  zIndex: -1,
                }}
              />
            </Box>
            ! 🌷
            <Typography
              component='span'
              sx={{
                display: "block",
                mt: 1.5,
                fontSize: { xs: "1rem", sm: "1.2rem" },
                color: "text.secondary",
              }}
            >
              Muy pronto llegarán nuevas oportunidades para seguir aprendiendo
              💖
            </Typography>
          </Typography>
        ) : (
          <Swiper
            modules={[Navigation, Pagination]}
            loop={courses.length > 4}
            grabCursor={true}
            centerInsufficientSlides={true}
            spaceBetween={20}
            slidesPerView={1.15}
            breakpoints={{
              640: { slidesPerView: 1.5, spaceBetween: 20 },
              768: { slidesPerView: 2.2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 28 },
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
            style={{
              padding: "16px 0",
              maxWidth: "1500px",
              margin: "0 auto",
              paddingBottom: "30px",
            }}
          >
            {courses.map((course) => {
              const hasProgress = autenticado && usuario?.isSubscribed;

              return (
                <SwiperSlide
                  key={course.id}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    height: "auto",
                  }}
                >
                  <NewCourseCard course={course} hasProgress={hasProgress} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}

        {/* CONTROLES FLECHAS SWIPER */}
        {courses && courses.length > 0 && (
          <Box>
            <IconButton
              ref={swiperPrevRef}
              sx={{
                position: "absolute",
                left: { xs: 5, sm: 20 },
                top: "45%",
                transform: "translateY(-50%)",
                backgroundColor: "#E53888",
                color: "white",
                "&:hover": { backgroundColor: "#C2256F" },
                zIndex: 10,
                width: 44,
                height: 44,
                display: { xs: "none", md: "flex" },
              }}
            >
              <ArrowBackIcon />
            </IconButton>

            <IconButton
              ref={swiperNextRef}
              sx={{
                position: "absolute",
                right: { xs: 5, sm: 20 },
                top: "45%",
                transform: "translateY(-50%)",
                backgroundColor: "#E53888",
                color: "white",
                "&:hover": { backgroundColor: "#C2256F" },
                zIndex: 10,
                width: 44,
                height: 44,
                display: { xs: "none", md: "flex" },
              }}
            >
              <ArrowForwardIcon />
            </IconButton>
          </Box>
        )}
      </Box>

      {/* 🚀 CTA FINAL PARA EXPLORAR CATÁLOGO COMPLETO */}
      <Box sx={{ textAlign: "center", mt: { xs: 4, md: 5 } }}>
        <Button
          component={Link}
          to='/cursos'
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
          Explorar todos los cursos
        </Button>
      </Box>
    </Box>
  );
};

export default NewCourses;
