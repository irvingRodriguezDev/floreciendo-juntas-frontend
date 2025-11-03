import React, { useContext, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  IconButton,
  Stack,
  useTheme,
  useMediaQuery, // 👈 Nuevo: para manejar breakpoints
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CoursesContext from "../../../context/Courses/CoursesContext";
import AuthContext from "../../../context/Auth/AuthContext";
import Progress from "../../Progress/Progress";
import { getImageUrl } from "../../../utils/Image"; // 👈 Tu función utilitaria
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const NewCourses = () => {
  const { courses, getLastestCourses } = useContext(CoursesContext);
  const { usuario, autenticado } = useContext(AuthContext);
  const theme = useTheme();

  // 💡 Nuevo: Hook para detectar el tamaño de la pantalla
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const swiperPrevRef = useRef(null);
  const swiperNextRef = useRef(null);

  useEffect(() => {
    if (autenticado && usuario) {
      getLastestCourses(usuario, autenticado);
    } else {
      getLastestCourses(null, false);
    }
  }, [usuario, autenticado]);

  const primaryPink = "#e91e63";
  const lightYellow = "#ffecb3";

  // Función para determinar el ancho óptimo de la imagen basado en el viewport
  const getOptimalWidth = () => {
    if (isMobile) return 300; // Móviles (300px)
    if (isTablet) return 400; // Tablets (400px)
    return 350; // Desktop (350px)
  };

  // 📌 El ancho de la imagen que se solicitará a CloudFront
  const optimalWidth = getOptimalWidth();
  // 📌 Calidad de la imagen (ajustable)
  const imageQuality = 85;

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default || "#fffcf7",
        position: "relative",
        py: { xs: 6, md: 10 },
      }}
    >
      {/* --- Header --- */}
      <Stack alignItems='center' sx={{ mb: 6, px: { xs: 2, md: 4 } }}>
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
            fontSize: { xs: "2.2rem", sm: "2.8rem", md: "3.5rem" },
          }}
        >
          Descubre Nuestro{" "}
          <Box
            component='span'
            sx={{ position: "relative", display: "inline-block" }}
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
          </Box>
        </Typography>
      </Stack>

      {/* --- Swiper --- */}
      <Box
        sx={{ position: "relative", maxWidth: "100%", px: { xs: 2, md: 4 } }}
      >
        {!courses.length ? (
          <Progress />
        ) : (
          <Swiper
            modules={[Navigation, Pagination]}
            loop={true}
            grabCursor={true}
            centeredSlides={true}
            spaceBetween={20}
            slidesPerView={1.15} // Card central pequeña en móviles
            breakpoints={{
              640: { slidesPerView: 1.3, spaceBetween: 20 },
              768: { slidesPerView: 2.2, spaceBetween: 25 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
              1440: { slidesPerView: 4, spaceBetween: 35 },
            }}
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
            style={{ padding: theme.spacing(2, 0) }}
          >
            {courses.map((c) => (
              <SwiperSlide key={c.id}>
                <Link
                  to={`/detalle-curso/${c.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card
                    component={motion.div}
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 14px 28px rgba(255, 246, 248,0.15)",
                      transition: { duration: 0.3 },
                    }}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      minHeight: 280,
                      borderRadius: "18px",
                      overflow: "hidden",
                      cursor: "pointer",
                      boxShadow: "0 6px 18px rgba(255, 246, 248,.08)",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    }}
                  >
                    {/* 🖼️ Imagen Responsiva y Optimizada */}
                    <Box
                      sx={{
                        width: "100%",
                        // 💡 CLAVE: Altura más realista y responsiva (ej: relación de aspecto 4:3)
                        // Usamos padding-top para mantener la proporción sin depender de una altura fija
                        paddingTop: { xs: "75%", sm: "66.67%" }, // 4:3 en móvil, 3:2 en tablet/desktop
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      <CardMedia
                        component='img'
                        // 💡 CLAVE: Llamada a la función con el ancho y calidad óptimos
                        image={getImageUrl(
                          c.cover_image_url,
                          optimalWidth,
                          imageQuality
                        )}
                        alt={c.title}
                        sx={{
                          position: "absolute", // Necesario para la técnica de padding-top
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.5s ease",
                          "&:hover": { transform: "scale(1.05)" },
                        }}
                      />
                    </Box>

                    {/* 📝 Contenido Compacto (Título y Progreso) */}
                    <Box
                      sx={{
                        p: 1.5,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 0.5,
                        flexGrow: 1, // Permite que el contenido ocupe el espacio restante
                      }}
                    >
                      {usuario?.isSubscribed && (
                        <Progress progress={c?.user_progress_percentage ?? 0} />
                      )}
                      <Typography
                        textAlign='center'
                        variant='body1'
                        sx={{
                          fontWeight: 600,
                          color: primaryPink,
                          fontSize: "1.05rem",
                          letterSpacing: 0.3,
                          transition: "color 0.3s ease",
                          "&:hover": { color: "#d81b60" },
                          lineHeight: 1.3,
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
        )}

        {/* Botones de navegación */}
        <IconButton
          ref={swiperPrevRef}
          sx={{
            position: "absolute",
            left: { xs: 5, sm: 20 },
            top: "40%",
            transform: "translateY(-50%)",
            backgroundColor: "#F3BBCE",
            color: "white",
            "&:hover": { backgroundColor: "#d81b60" }, // Color más oscuro al pasar el ratón
            zIndex: 10,
            width: 44,
            height: 44,
            boxShadow: theme.shadows[3],
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
            top: "40%",
            transform: "translateY(-50%)",
            backgroundColor: "#F3BBCE",
            color: "white",
            "&:hover": { backgroundColor: "#d81b60" }, // Color más oscuro al pasar el ratón
            zIndex: 10,
            width: 44,
            height: 44,
            boxShadow: theme.shadows[3],
            display: { xs: "none", md: "flex" },
          }}
        >
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default NewCourses;
