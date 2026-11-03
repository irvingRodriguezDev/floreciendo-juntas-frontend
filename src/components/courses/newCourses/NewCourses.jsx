import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Stack,
  alpha,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import CoursesContext from "../../../context/Courses/CoursesContext";
import AuthContext from "../../../context/Auth/AuthContext";
import NewCourseCard from "./NewCourseCard";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const NewCourses = () => {
  const { courses, getLastestCourses } = useContext(CoursesContext);
  const { usuario, autenticado } = useContext(AuthContext);

  // Estados para vincular Swiper con los botones personalizados sin bugs de ref
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);

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
          linear-gradient(180deg, #FFFFFF 0%, #FFF0F5 100%),
          radial-gradient(circle at top left, rgba(232,62,140,0.06), transparent 70%)
        `,
        position: "relative",
        py: { xs: 6, md: 10 },
        px: { xs: 1, md: 2 },
        overflow: "hidden",
        borderRadius: "32px",
        border: "1px solid",
        borderColor: alpha("#E53888", 0.08),
        boxShadow: "0 20px 40px rgba(232, 62, 140, 0.04)",
      }}
    >
      {/* 🌸 ENCABEZADO MODERNO Y ELEGANTE */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        sx={{
          textAlign: "center",
          mb: { xs: 4, md: 6 },
          px: 2,
        }}
      >
        {/* Badge superior minimalista */}
        <Stack
          direction='row'
          spacing={1}
          sx={{ mb: 1.5, alignItems: "center", justifyContent: "center" }}
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
            <span>Lo más reciente</span>
          </Box>
        </Stack>

        {/* Título Principal Limpio y Potente */}
        <Typography
          variant='h2'
          sx={{
            color: "#2B1B24",
            fontWeight: 900,
            fontSize: {
              xs: "2rem",
              sm: "2.8rem",
              md: "3.5rem",
            },
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            lineHeight: 1.1,
            mb: 1.5,
          }}
        >
          Nuevos{" "}
          <Box
            component='span'
            sx={{
              color: "#E53888",
              position: "relative",
            }}
          >
            Lanzamientos
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
            navigation={{ prevEl, nextEl }}
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

        {/* CONTROLES FLECHAS SWIPER MEJORADOS */}
        {courses && courses.length > 0 && (
          <Box>
            <IconButton
              ref={(node) => setPrevEl(node)}
              sx={{
                position: "absolute",
                left: { xs: -5, sm: 5 },
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
                display: { xs: "none", md: "flex" },
              }}
            >
              <ArrowBackIcon />
            </IconButton>

            <IconButton
              ref={(node) => setNextEl(node)}
              sx={{
                position: "absolute",
                right: { xs: -5, sm: 5 },
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
                display: { xs: "none", md: "flex" },
              }}
            >
              <ArrowForwardIcon />
            </IconButton>
          </Box>
        )}
      </Box>

      {/* 🚀 CTA FINAL PARA EXPLORAR CATÁLOGO COMPLETO */}
      <Box sx={{ textAlign: "center", mt: { xs: 4, md: 6 } }}>
        <Button
          component={Link}
          to='/cursos'
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
          }}
        >
          Explorar todos los cursos
        </Button>
      </Box>
    </Box>
  );
};

export default NewCourses;
