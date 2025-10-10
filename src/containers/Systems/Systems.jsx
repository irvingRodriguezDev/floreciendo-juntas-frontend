import React, { useRef } from "react";
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
import { Navigation, Pagination, A11y } from "swiper/modules";

// Importa los estilos de Swiper (asegúrate de que estén disponibles globalmente o importados aquí)
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Iconos personalizados para cada sistema (usaremos algunos de MUI para simular)
import PaletteIcon from "@mui/icons-material/Palette"; // Acrílicos
import BrightnessHighIcon from "@mui/icons-material/BrightnessHigh"; // Gel
import DiamondIcon from "@mui/icons-material/Diamond"; // Polygel
import SpaIcon from "@mui/icons-material/Spa"; // Semipermanente
import LayersIcon from "@mui/icons-material/Layers"; // Dip Powder
import StraightenIcon from "@mui/icons-material/Straighten"; // Esculpidas

// Datos de los sistemas de uñas
const nailSystems = [
  {
    id: 1,
    icon: PaletteIcon,
    title: "Uñas Acrílicas",
    description:
      "Aprende el arte de la construcción y esculpido con acrílico para diseños duraderos y versátiles.",
    iconBgColor: "#e91e63", // Rosa intenso
  },
  {
    id: 2,
    icon: BrightnessHighIcon,
    title: "Uñas de Gel",
    description:
      "Domina las técnicas de gel para uñas flexibles, brillantes y con un acabado natural y elegante.",
    iconBgColor: "#d81b60", // Rosa medio
  },
  {
    id: 3,
    icon: DiamondIcon,
    title: "Polygel (Acrygel)",
    description:
      "Descubre el híbrido perfecto: la resistencia del acrílico y la flexibilidad del gel en un solo sistema.",
    iconBgColor: "#c2185b", // Rosa oscuro
  },
  {
    id: 4,
    icon: SpaIcon,
    title: "Esmalte Semipermanente",
    description:
      "Técnicas esenciales para manicuras duraderas y colores vibrantes sobre la uña natural.",
    iconBgColor: "#ad1457", // Rosa más oscuro
  },
  {
    id: 5,
    icon: LayersIcon,
    title: "Dip Powder (Dipping System)",
    description:
      "Explora este innovador sistema para uñas ligeras, resistentes y con un acabado impecable.",
    iconBgColor: "#880e4f", // Rosa muy oscuro
  },
  {
    id: 6,
    icon: StraightenIcon,
    title: "Uñas Esculpidas",
    description:
      "Eleva tus habilidades creando extensiones personalizadas con moldes, sin necesidad de tips.",
    iconBgColor: "#ec407a", // Rosa claro
  },
];

const Systems = () => {
  const theme = useTheme();
  const swiperPrevRef = useRef(null);
  const swiperNextRef = useRef(null);

  return (
    <Box
      sx={{
        backgroundColor: "#FFF0F0", // Un tono crema o blanco cálido de fondo
        padding: theme.spacing(8, 4),
        position: "relative",
        overflow: "hidden",
        minHeight: "70vh",
        display: "flex",
        width: "100%",
        borderRadius: "16px",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Elementos decorativos (similares a la imagen) */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "50px",
          height: "20px",
          borderTop: `3px double #DC4485`, // Verde claro
          borderBottom: `3px double #F3BBCE`,
          transform: "rotate(15deg)",
          display: { xs: "none", md: "block" },
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
          backgroundColor: "#DC4485", // Amarillo claro
          opacity: 0.6,
          display: { xs: "none", md: "block" },
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
          border: `3px solid #D72E79`, // Amarillo
          opacity: 0.4,
          display: { xs: "none", md: "block" },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "5%",
          right: "5%",
          width: "50px",
          height: "50px",
          backgroundColor: "#D72E79", // Un violeta/rosa oscuro
          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          transform: "rotate(180deg)",
          opacity: 0.4,
          display: { xs: "none", md: "block" },
        }}
      />

      {/* Cabecera de la sección */}
      <Stack alignItems='center' sx={{ mb: 6, zIndex: 1 }}>
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
              backgroundColor: "#DC4485", // Amarillo claro
              borderRadius: "2px",
            },
          }}
        >
          Nuestros Cursos
        </Typography>
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
          Explora{" "}
          <span
            style={{
              position: "relative",
              display: "inline-block",
              textDecoration: "none",
            }}
          >
            Sistemas
            <Box
              component='span'
              sx={{
                position: "absolute",
                left: 0,
                bottom: 0,
                width: "100%",
                height: "8px",
                backgroundColor: "#DC4485", // Amarillo claro
                zIndex: -1,
                opacity: 0.7,
                borderRadius: "4px",
              }}
            />
          </span>{" "}
          de Uñas
        </Typography>
      </Stack>

      {/* Carrusel de Swiper */}
      <Box
        sx={{
          position: "relative",
          maxWidth: "1200px",
          margin: "0 auto",
          zIndex: 1,
        }}
      >
        <Swiper
          modules={[Navigation, Pagination]}
          loop={true} // El loop está habilitado
          spaceBetween={30}
          slidesPerView={1}
          // 2. CONFIGURAR LA NAVEGACIÓN con las REFERENCIAS
          navigation={{
            prevEl: swiperPrevRef.current,
            nextEl: swiperNextRef.current,
          }}
          // pagination={{ clickable: true }}

          breakpoints={{
            600: { slidesPerView: 2 },
            900: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
          }}
          // IMPORTANTE: Para que las referencias funcionen, necesitamos darle a Swiper
          // el control de los elementos después de que se monten.
          onBeforeInit={(swiper) => {
            if (swiper.params.navigation) {
              swiper.params.navigation.prevEl = swiperPrevRef.current;
              swiper.params.navigation.nextEl = swiperNextRef.current;
            }
          }}
          style={{ paddingBottom: theme.spacing(5) }}
        >
          {nailSystems.map((system) => (
            <SwiperSlide key={system.id}>
              <Paper
                elevation={0}
                sx={{
                  padding: theme.spacing(4),
                  textAlign: "left",
                  borderRadius: "16px",
                  minHeight: "250px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.05)", // Sombra sutil
                  border: "1px solid #f0f0f0",
                  mx: 1, // Margen horizontal para las tarjetas
                }}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: "12px",
                    backgroundColor: system.iconBgColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                  }}
                >
                  <system.icon sx={{ color: "white", fontSize: 30 }} />
                </Box>
                <Typography variant='h6' sx={{ fontWeight: 700, mb: 1 }}>
                  {system.title}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {system.description}
                </Typography>
              </Paper>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 3. ASIGNAR LAS REFERENCIAS a los botones */}
        <IconButton
          ref={swiperPrevRef} // <-- Asignamos la referencia
          className='swiper-button-prev-custom' // Mantén la clase si la usas para estilos globales
          sx={{
            position: "absolute",
            left: { xs: 0, md: -60 },
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "#DC4485",
            color: "white",
            "&:hover": {
              backgroundColor: "#DC4485",
            },
            zIndex: 10,
            width: 48,
            height: 48,
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <IconButton
          ref={swiperNextRef} // <-- Asignamos la referencia
          className='swiper-button-next-custom' // Mantén la clase si la usas para estilos globales
          sx={{
            position: "absolute",
            right: { xs: 0, md: -60 },
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "#DC4485",
            color: "white",
            "&:hover": {
              backgroundColor: "#DC4485",
            },
            zIndex: 10,
            width: 48,
            height: 48,
          }}
        >
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Systems;
