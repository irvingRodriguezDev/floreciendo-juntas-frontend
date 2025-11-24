import React, { useContext, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  IconButton,
  Stack,
  useTheme,
  useMediaQuery,
  Chip, // 👈 Nuevo: para manejar breakpoints
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
      <Stack
        alignItems='center'
        sx={{ mb: 8, px: { xs: 2, md: 4 } }}
        component={motion.div}
        initial='hidden'
        animate='visible'
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
          },
        }}
      >
        {/* Subtítulo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Typography
            variant='overline'
            sx={{
              color: theme.palette.text.secondary,
              fontWeight: 700,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              mb: 1,
            }}
          >
            Tu Próximo Nivel en Manicura
          </Typography>
        </motion.div>

        {/* Título principal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          <Typography
            variant='h3'
            component='h2'
            sx={{
              fontWeight: 800,
              lineHeight: 1.2,
              textAlign: "center",
              fontSize: { xs: "2.2rem", sm: "2.8rem", md: "3.4rem" },
            }}
          >
            Descubre Nuestro{" "}
            <Box
              component={motion.span}
              sx={{ position: "relative", display: "inline-block" }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 250 }}
            >
              Contenido Nuevo
              {/* Subrayado animado */}
              <Box
                component={motion.span}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: 0.5,
                }}
                sx={{
                  position: "absolute",
                  left: 0,
                  bottom: -2,
                  width: "100%",
                  height: "10px",
                  background: `linear-gradient(90deg, #F971AF, #FFABD1)`,
                  borderRadius: "6px",
                  transformOrigin: "left",
                  zIndex: -1,
                  opacity: 0.8,
                }}
              />
            </Box>
          </Typography>
        </motion.div>
      </Stack>

      {/* --- Swiper --- */}
      <Box
        sx={{ position: "relative", maxWidth: "100%", px: { xs: 2, md: 4 } }}
      >
        {!courses.length ? (
          <Typography
            variant='h3'
            component='h2'
            sx={{
              fontWeight: 400,
              lineHeight: 1.3,
              textAlign: "center",
              fontSize: { xs: "2.2rem", sm: "2.8rem", md: "2.5rem" },
            }}
          >
            🌷 ¡Por ahora no tenemos nuevos cursos{" "}
            <Box
              component='span'
              sx={{ position: "relative", display: "inline-block" }}
            >
              disponibles
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
            ! 🌷
            <br />
            <Typography
              component='span'
              sx={{
                fontSize: { xs: "1.1rem", sm: "1.3rem" },
                color: "text.secondary",
                display: "block",
                mt: 1,
              }}
            >
              Pero mantente atenta 💖, ¡muy pronto llegarán nuevas oportunidades
              para seguir aprendiendo y creciendo juntas!
            </Typography>
          </Typography>
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
                    whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                    sx={{
                      borderRadius: "20px",
                      width: "100%",
                      boxShadow: "12px 12px 20px rgba(0,0,0,0.08)",
                      cursor: "pointer",
                      border: "1px solid #f3f3f3",
                      overflow: "hidden",
                      backgroundColor: "#fff",
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    {/* Imagen con aspectRatio responsivo */}
                    <Box sx={{ position: "relative", padding: "10px" }}>
                      <CardMedia
                        component='img'
                        image={c.cover_image_url}
                        alt={c.name}
                        sx={{
                          objectFit: "cover",
                          width: "100%",
                          borderRadius: "16px",
                        }}
                      />
                    </Box>

                    {/* Contenido */}
                    <Box
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        gap: 1,
                        flexGrow: 1,
                      }}
                    >
                      {c && autenticado && usuario.isSubscribed && (
                        <Progress progress={c?.user_progress_percentage ?? 0} />
                      )}

                      <Typography
                        variant='subtitle1'
                        sx={{
                          fontWeight: 700,
                          marginTop: 1.5,
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
        {courses.length > 0 && (
          <>
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
          </>
        )}
      </Box>
    </Box>
  );
};

export default NewCourses;
