import React, { useContext, useEffect, useRef } from "react"; // Necesitas useRef para la navegación personalizada si la usas
import {
  Box,
  Typography,
  Card,
  CardMedia,
  Grid,
  Stack,
  useTheme,
  IconButton,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Navigation, Pagination } from "swiper/modules"; // Añadimos Loop explícitamente
import { motion } from "framer-motion";

// Importa los estilos de Swiper (Asegúrate de que sean accesibles)
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import CoursesContext from "../../../context/Courses/CoursesContext";
import AuthContext from "../../../context/Auth/AuthContext";
import Progress from "../../Progress/Progress";
// NOTA: No necesitamos el archivo "./swipperCustom.css" si manejamos la navegación con useRef y estilos de MUI.

const NewCourses = () => {
  const { courses, getLastestCourses } = useContext(CoursesContext);
  const { usuario, autenticado } = useContext(AuthContext);
  useEffect(() => {
    if (autenticado && usuario) {
      getLastestCourses(usuario, autenticado);
    } else if (!autenticado) {
      getLastestCourses(null, false);
    }
  }, [usuario, autenticado]);
  const theme = useTheme();

  // Referencias para los botones de navegación personalizados (Necesario para loop=true)
  const swiperPrevRef = useRef(null);
  const swiperNextRef = useRef(null);

  // Definimos los estilos de color rosa que hemos estado usando (asumiendo que están en el tema)
  const primaryPink = "#e91e63";
  const lightYellow = "#ffecb3";

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default || "#fffcf7",
        position: "relative",
      }}
    >
      <Stack
        alignItems='center'
        sx={{ mb: 6, zIndex: 1, padding: theme.spacing(0, 4) }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant='overline'
            sx={{
              color: theme.palette.text.secondary,
              fontWeight: 600,
              textTransform: "uppercase",
              mb: 1,
            }}
          >
            Tu Próximo Nivel en Manicura
          </Typography>
        </motion.div>

        <Typography
          variant='h3'
          component='h2'
          sx={{
            fontWeight: 700,
            lineHeight: 1.2,
            textAlign: "center",
            fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
          }}
        >
          Descubre Nuestro{" "}
          <span
            style={{
              position: "relative",
              display: "inline-block",
              textDecoration: "none",
            }}
          >
            Contenido Nuevo
            <Box
              component='span'
              sx={{
                position: "absolute",
                left: 0,
                bottom: 0,
                width: "100%",
                height: "8px",
                backgroundColor: lightYellow,
                zIndex: -1,
                opacity: 0.7,
                borderRadius: "4px",
              }}
            />
          </span>
        </Typography>
      </Stack>

      <Box
        sx={{
          position: "relative",
          maxWidth: "100%",
          margin: 0,
          zIndex: 1,
          backgroundColor: "transparent",
        }}
      >
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1.5}
          loop={true}
          navigation={{
            prevEl: swiperPrevRef.current,
            nextEl: swiperNextRef.current,
          }}
          onBeforeInit={(swiper) => {
            if (swiper.params.navigation) {
              swiper.params.navigation.prevEl = swiperPrevRef.current;
              swiper.params.navigation.nextEl = swiperNextRef.current;
              swiper.navigation.update();
            }
          }}
          breakpoints={{
            640: { slidesPerView: 2.2, spaceBetween: 30 },
            768: { slidesPerView: 3, spaceBetween: 30 },
            1024: { slidesPerView: 3.5, spaceBetween: 40 },
            1440: { slidesPerView: 4.5, spaceBetween: 40 },
          }}
          style={{ padding: theme.spacing(8, 4) }}
        >
          {courses.map((c, index) => (
            <SwiperSlide key={index}>
              <Link
                to={`/detalle-curso/${c.id}`}
                style={{ textDecoration: "none" }}
              >
                <Card
                  component={motion.div}
                  whileHover={{
                    scale: 1.04,
                    boxShadow: "0 12px 28px rgba(0, 0, 0, 0.15)",
                    transition: { duration: 0.3 },
                  }}
                  sx={{
                    borderRadius: "18px",
                    cursor: "pointer",
                    overflow: "hidden",
                    backgroundColor: "#fff",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    border: "1px solid rgba(0,0,0,0.05)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                >
                  {/* Imagen con efecto hover suave */}
                  <Box sx={{ position: "relative", overflow: "hidden" }}>
                    <CardMedia
                      component='img'
                      width='100%'
                      height='260'
                      image={c.cover_image_url}
                      alt={c.title}
                      sx={{
                        objectFit: "cover",
                        transition: "transform 0.6s ease",
                        "&:hover": { transform: "scale(1.05)" },
                      }}
                    />

                    {/* Overlay degradado sutil para mejor legibilidad */}
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: "30%",
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.35), rgba(0,0,0,0))",
                      }}
                    />
                  </Box>

                  {/* Contenido */}
                  <Box
                    sx={{
                      p: 2,
                      background:
                        "linear-gradient(180deg, #fff0f0 0%, #fff6f6 100%)",
                    }}
                  >
                    {usuario !== null && usuario.isSubscribed && (
                      <Progress progress={c?.user_progress_percentage ?? 0} />
                    )}

                    <Typography
                      textAlign='center'
                      variant='body1'
                      sx={{
                        fontWeight: 600,
                        color: primaryPink,
                        mt: 1,
                        fontSize: "1.05rem",
                        letterSpacing: 0.3,
                        transition: "color 0.3s ease",
                        "&:hover": { color: "#d81b60" },
                      }}
                    >
                      {c.title}
                    </Typography>
                  </Box>
                </Card>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Botones de navegación personalizados (Posicionados fuera del Swiper para mejor control) */}
        <IconButton
          ref={swiperPrevRef}
          sx={{
            position: "absolute",
            left: { xs: 5, sm: 20, lg: 0 },
            top: "40%",
            transform: "translateY(-50%)",
            backgroundColor: "#F3BBCE",
            color: "white",
            "&:hover": { backgroundColor: "#F3BBCE" },
            zIndex: 10,
            width: 44,
            height: 44,
            boxShadow: theme.shadows[3],
            display: { xs: "none", md: "flex" }, // Ocultar en móviles si interfiere con el scroll
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <IconButton
          ref={swiperNextRef}
          sx={{
            position: "absolute",
            right: { xs: 5, sm: 20, lg: 0 },
            top: "40%",
            transform: "translateY(-50%)",
            backgroundColor: "#F3BBCE",
            color: "white",
            "&:hover": { backgroundColor: "#F3BBCE" },
            zIndex: 10,
            width: 44,
            height: 44,
            boxShadow: theme.shadows[3],
            display: { xs: "none", md: "flex" }, // Ocultar en móviles si interfiere con el scroll
          }}
        >
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default NewCourses;
