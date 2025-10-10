import React, { useRef } from "react"; // Necesitas useRef para la navegación personalizada si la usas
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
// NOTA: No necesitamos el archivo "./swipperCustom.css" si manejamos la navegación con useRef y estilos de MUI.

const NewCourses = () => {
  const theme = useTheme();

  // Referencias para los botones de navegación personalizados (Necesario para loop=true)
  const swiperPrevRef = useRef(null);
  const swiperNextRef = useRef(null);

  const cursos = [
    {
      id: 1,
      name: "Técnica Acrílica Profesional",
      image:
        "https://cloud.wapizima.com.mx/production/courses/mobile/114-mobile",
    },
    {
      id: 2,
      name: "Diseño con Gel Avanzado",
      image:
        "https://cloud.wapizima.com.mx/production/courses/mobile/112-mobile",
    },
    {
      id: 3,
      name: "Manicura y Pedicura Spa",
      image:
        "https://cloud.wapizima.com.mx/production/courses/mobile/111-mobile",
    },
    {
      id: 4,
      name: "Esmaltado Semipermanente",
      image:
        "https://cloud.wapizima.com.mx/production/courses/mobile/110-mobile",
    },
    {
      id: 5,
      name: "Nail Art 3D y 4D",
      image:
        "https://cloud.wapizima.com.mx/production/courses/mobile/109-mobile",
    },
    {
      id: 6,
      name: "Uñas de Novia y Eventos",
      image:
        "https://cloud.wapizima.com.mx/production/courses/mobile/68-mobile",
    },
    {
      id: 7,
      name: "Sistema Polygel Básico",
      image:
        "https://cloud.wapizima.com.mx/production/courses/mobile/67-mobile",
    },
    {
      id: 8,
      name: "Reconstrucción de Uñas",
      image:
        "https://cloud.wapizima.com.mx/production/courses/mobile/63-mobile",
    },
    {
      id: 9,
      name: "Cuidado de la Uña Natural",
      image:
        "https://cloud.wapizima.com.mx/production/courses/mobile/60-mobile",
    },
    {
      id: 10,
      name: "Marketing para Nail Artists",
      image:
        "https://cloud.wapizima.com.mx/production/courses/mobile/55-mobile",
    },
  ];

  // Definimos los estilos de color rosa que hemos estado usando (asumiendo que están en el tema)
  const primaryPink = "#e91e63";
  const highlightYellow = "#ffc107";
  const lightYellow = "#ffecb3";

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default || "#fffcf7", // Fondo suave
        position: "relative",
        // overflow: "hidden",
        // border: "3px solid green",
      }}
    >
      <Stack
        alignItems='center'
        sx={{ mb: 6, zIndex: 1, padding: theme.spacing(0, 4) }}
      >
        {/* Etiqueta Superior */}
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

        {/* Título Principal con Resaltado */}
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
                backgroundColor: lightYellow, // Resaltado amarillo suave
                zIndex: -1,
                opacity: 0.7,
                borderRadius: "4px",
              }}
            />
          </span>
        </Typography>
      </Stack>

      {/* Contenedor del Carrusel para centrado y posición relativa */}
      <Box
        sx={{
          position: "relative",
          maxWidth: "100%",
          margin: 0,
          zIndex: 1,
          // border: "3px solid green",
          backgroundColor: "transparent",
        }}
      >
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1.5}
          loop={true}
          // Usamos las referencias para los botones
          navigation={{
            prevEl: swiperPrevRef.current,
            nextEl: swiperNextRef.current,
          }}
          // Se llama antes de la inicialización para asegurar que Swiper vea las referencias
          onBeforeInit={(swiper) => {
            if (swiper.params.navigation) {
              swiper.params.navigation.prevEl = swiperPrevRef.current;
              swiper.params.navigation.nextEl = swiperNextRef.current;
              swiper.navigation.update();
            }
          }}
          // pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2.2, spaceBetween: 30 },
            768: { slidesPerView: 3, spaceBetween: 30 },
            1024: { slidesPerView: 3.5, spaceBetween: 40 },
            1440: { slidesPerView: 4.5, spaceBetween: 40 },
          }}
          // El padding lateral es ahora manejado por el contenedor y las breakpoints
          style={{ padding: theme.spacing(8, 4) }}
        >
          {cursos.map((c, index) => (
            <SwiperSlide key={index}>
              <Link
                to={`/detalle-curso/${c.id}`}
                style={{ textDecoration: "none" }}
              >
                <Card
                  component={motion.div}
                  whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                  sx={{
                    borderRadius: "16px", // Bordes más suaves
                    boxShadow: "15px black",
                    cursor: "pointer",
                    border: "1px solid #f0f0f0",
                    minHeight: 250,
                    overflow: "hidden",
                  }}
                >
                  <CardMedia
                    component='img'
                    width='100%'
                    height='280' // Altura ligeramente ajustada para mejor aspecto
                    image={c.image}
                    alt={c.name}
                    sx={{ objectFit: "cover" }}
                  />
                  <Box sx={{ padding: theme.spacing(2) }}>
                    <Typography
                      textAlign='center'
                      variant='body1'
                      sx={{ fontWeight: 600, color: primaryPink }}
                    >
                      {c.name}
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
            backgroundColor: primaryPink,
            color: "white",
            "&:hover": { backgroundColor: primaryPink },
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
            backgroundColor: primaryPink,
            color: "white",
            "&:hover": { backgroundColor: primaryPink },
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
