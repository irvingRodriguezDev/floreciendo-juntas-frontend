import React from "react";
import { Grid, Box, CardMedia, Typography, Stack } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

const TopCourseCard = ({ course, index }) => {
  if (!course) return null;

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
      <Link
        to={`/detalle-curso/${course.courseId}`}
        style={{ textDecoration: "none", display: "block", width: "100%" }}
      >
        <Box
          component={motion.div}
          whileHover={{
            y: -6,
            transition: { duration: 0.2, ease: "easeInOut" },
          }}
          sx={{
            position: "relative",
            borderRadius: "24px",
            overflow: "hidden",
            backgroundColor: "#fff",
            border: "1px solid #F3F4F6",
            p: 1.5,
            transition: "all 0.2s ease",
            "&:hover": {
              borderColor: "#F472B6", // Cambio a borde rosa plano en hover
            },
          }}
        >
          {/* Contenedor de Imagen y Número de Ranking */}
          <Box sx={{ position: "relative", width: "100%", mb: 2 }}>
            {/* 🔥 NÚMERO DE RANKING ESTILO PREMIUM EDITORIAL */}
            <Box
              sx={{
                position: "absolute",
                top: "-10px",
                left: "-5px",
                zIndex: 3,
                fontFamily: '"Montserrat", "Roboto", "Helvetica", sans-serif',
                fontSize: { xs: "70px", md: "85px" },
                fontWeight: "900",
                lineHeight: 1,
                color: "#E91E63", // Color insignia de la marca
                // Efecto de sombra de texto plana para que resalte sobre cualquier imagen
                textShadow:
                  "2px 2px 0px #fff, -2px -2px 0px #fff, 2px -2px 0px #fff, -2px 2px 0px #fff",
                userSelect: "none",
              }}
            >
              {index + 1}
            </Box>

            {/* Tarjeta de la Imagen */}
            <CardMedia
              component='img'
              image={course.cover_image_url}
              alt={course.title}
              sx={{
                width: "100%",
                aspectRatio: "1 / 1", // Mantenemos el formato cuadrado limpio
                objectFit: "cover",
                borderRadius: "18px",
                backgroundColor: "#FFF5F7",
              }}
            />
          </Box>

          {/* Información del Curso Popular */}
          <Box sx={{ px: 1, pb: 1 }}>
            {/* Tag de Tendencia */}
            <Typography
              variant='caption'
              sx={{
                color: "#F472B6",
                fontWeight: "bold",
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "1px",
                display: "block",
                mb: 0.5,
              }}
            >
              Popular en la Comunidad
            </Typography>

            {/* Título */}
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: "1rem",
                lineHeight: 1.3,
                color: "#1F2937",
                textTransform: "uppercase",
                mb: 1.5,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                height: "2.6rem", // Estabiliza el Grid para que todas midan igual
              }}
            >
              {course.title}
            </Typography>

            {/* Footer de la tarjeta */}
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-between'
              sx={{ pt: 1, borderTop: "1px solid #FAFAFA" }}
            >
              <Stack
                direction='row'
                alignItems='center'
                gap={0.5}
                color='#737373'
              >
                <PlayCircleIcon sx={{ fontSize: "16px", color: "#F472B6" }} />
                <Typography variant='caption' sx={{ fontWeight: "600" }}>
                  {course.videosCount || 0} Clases
                </Typography>
              </Stack>

              <Typography
                variant='caption'
                sx={{ fontWeight: "bold", color: "#E91E63", fontSize: "12px" }}
              >
                Ver Ahora →
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Link>
    </Grid>
  );
};

export default TopCourseCard;
