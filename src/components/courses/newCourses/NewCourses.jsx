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
import { shortenText } from "../../../utils/ShortText";

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
        background: `
      linear-gradient(180deg, #fff 0%, #FFDFEF 100%),
      radial-gradient(circle at top left, rgba(255,200,220,0.25), transparent 60%)
    `,
        position: "relative",
        py: { xs: 6, md: 10 },
        overflow: "hidden",
        borderRadius: "16px",
      }}
    >
      {/* ————— Header mejorado ————— */}
      <Stack
        alignItems='center'
        sx={{
          mb: 8,
          px: { xs: 2, md: 4 },
        }}
        component={motion.div}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* TÍTULO */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: "70px" }}
        >
          {/* KICKER / OVERLINE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
                fontSize: { xs: "15px", md: "18px" },
              }}
            >
              {/* Los favoritos de nuestra comunidad */}
            </Typography>
          </motion.div>

          {/* TÍTULO */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
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
              {""}
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
              </Box>{" "}
            </Typography>
          </motion.div>
        </motion.div>

        {/* SUBTÍTULO */}
      </Stack>

      {/* ————— Swiper o mensaje vacío ————— */}
      <Box
        sx={{
          mt: -10,
          position: "relative",
          maxWidth: "100%",
          px: { xs: 2, md: 4 },
        }}
      >
        {!courses.length ? (
          <Typography
            variant='h3'
            sx={{
              textAlign: "center",
              fontWeight: 400,
              fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
            }}
          >
            🌷 ¡Por ahora no tenemos nuevos{" "}
            <Box
              component='span'
              sx={{
                position: "relative",
                display: "inline-block",
              }}
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
                mt: 1,
                fontSize: { xs: "1.1rem", sm: "1.3rem" },
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
            centeredSlides={false} // Cambiado a false para que en desktop empiece alineado a la izquierda limpiamente
            centerInsufficientSlides={true}
            spaceBetween={20}
            slidesPerView={1.15}
            breakpoints={{
              640: { slidesPerView: 1.5, spaceBetween: 20 },
              768: { slidesPerView: 2.2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 28 },
              1440: { slidesPerView: 4, spaceBetween: 32 }, // Mostramos un poco más de contenido por pantalla
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
            }}
          >
            {courses.map((c) => {
              const hasProgress = autenticado && usuario?.isSubscribed;

              return (
                <SwiperSlide
                  key={c.id}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    height: "auto", // Importante para que todas las tarjetas midan lo mismo verticalmente
                  }}
                >
                  <Link
                    to={`/detalle-curso/${c.id}`} // 🔥 Corregido para usar tu nuevo sistema de Slug
                    style={{
                      textDecoration: "none",
                      width: "100%",
                      display: "block",
                    }}
                  >
                    <Box
                      component={motion.div}
                      whileHover={{
                        y: -6,
                        borderColor: "#F472B6", // Look plano: cambia el color del borde en lugar de luces pesadas
                      }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      sx={{
                        borderRadius: "24px", // Esquinas más suaves y estéticas
                        overflow: "hidden",
                        backgroundColor: "#fff",
                        border: "1px solid #F3F4F6", // Borde gris claro ultra limpio
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        height: "100%", // Hace que todas tengan la misma altura exacta en el slider
                        boxShadow: "none", // Adiós sombras toscas
                        transition: "border-color 0.2s ease",
                        p: 1.5, // Padding contenedor general (diseño tipo cápsula)
                      }}
                    >
                      {/* Imagen del Curso */}
                      <Box sx={{ width: "100%", position: "relative" }}>
                        <CardMedia
                          component='img'
                          image={c.cover_image_url}
                          alt={c.title}
                          sx={{
                            width: "100%",
                            aspectRatio: "4 / 3", // Proporción ideal para sliders horizontales
                            objectFit: "cover",
                            borderRadius: "16px", // Curvatura interna armoniosa
                            backgroundColor: "#FFF5F7",
                          }}
                        />
                      </Box>

                      {/* Contenido de la Tarjeta */}
                      <Box
                        sx={{
                          p: 1.5,
                          pt: 2,
                          display: "flex",
                          flexDirection: "column",
                          flexGrow: 1, // Empuja el contenido hacia abajo uniformemente
                          justifyContent: "space-between",
                        }}
                      >
                        {/* Bloque Superior: Progreso y Título */}
                        <Box>
                          {hasProgress && (
                            <Box sx={{ width: "100%", mb: 1.5 }}>
                              <Progress
                                progress={c?.user_progress_percentage ?? 0}
                              />
                            </Box>
                          )}

                          <Typography
                            sx={{
                              fontWeight: 800,
                              fontSize: "0.95rem",
                              lineHeight: 1.35,
                              color: "#1F2937", // Texto oscuro limpio
                              // Evitamos la función cortaTexto difuminada por CSS nativo limpio de 2 líneas
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              minHeight: "2.6rem",
                            }}
                          >
                            {c.title}
                          </Typography>
                        </Box>

                        {/* Bloque Inferior: Detalles del Curso (Añade valor de negocio) */}
                        <Typography
                          variant='caption'
                          sx={{
                            color: "#E91E63",
                            fontWeight: "bold",
                            mt: 1.5,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <span>{c.videosCount || 0} Lecciones</span>
                          <span>Ver →</span>
                        </Typography>
                      </Box>
                    </Box>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}

        {/* ————— Controles Swiper ————— */}
        {courses.length > 0 && (
          <Box>
            <IconButton
              ref={swiperPrevRef}
              sx={{
                position: "absolute",
                left: { xs: 5, sm: 20 },
                top: "40%",
                transform: "translateY(-50%)",
                backgroundColor: "#E53888",
                color: "white",
                "&:hover": { backgroundColor: "#E53888" },
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
                top: "40%",
                transform: "translateY(-50%)",
                backgroundColor: "#E53888",
                color: "white",
                "&:hover": { backgroundColor: "#E53888" },
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
    </Box>
  );
};

export default NewCourses;
