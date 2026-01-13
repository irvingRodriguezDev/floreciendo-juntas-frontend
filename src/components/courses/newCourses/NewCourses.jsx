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
            centeredSlides={true}
            centerInsufficientSlides={true}
            spaceBetween={20}
            slidesPerView={1.15}
            breakpoints={{
              640: { slidesPerView: 1.4, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 25 },
              1024: { slidesPerView: 2.8, spaceBetween: 30 },
              1440: { slidesPerView: 3.5, spaceBetween: 35 },
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
              padding: theme.spacing(2, 0),
              maxWidth: "1500px",
              margin: "0 auto",
            }}
          >
            {courses.map((c) => (
              <SwiperSlide
                key={c.id}
                component={motion.div}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Link
                  to={`/detalle-curso/${c.id}`}
                  style={{
                    textDecoration: "none",
                    width: "100%",
                    maxWidth: "350px",
                  }}
                >
                  <Card
                    component={motion.div}
                    whileHover={{
                      boxShadow: "0px 12px 30px rgba(249,113,175,0.8)",
                    }}
                    transition={{ duration: 0.3 }}
                    sx={{
                      borderRadius: "20px",
                      overflow: "hidden",
                      backgroundColor: "#fff",
                      border: "1px solid #f3f3f3",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      boxShadow: "6px 6px 15px rgba(0,0,0,0.08)",
                    }}
                  >
                    {/* Imagen */}
                    <CardMedia
                      component='img'
                      image={c.cover_image_url}
                      alt={c.title}
                      sx={{
                        width: "100%",
                        aspectRatio: {
                          xs: "5 / 4",
                          sm: "4 / 3",
                          md: "3 / 2",
                          lg: "1 / 1",
                        },
                        objectFit: "cover",
                        borderRadius: { xs: "16px", lg: "12px" },
                        backgroundColor: "#f5f5f5",
                        filter: "saturate(0.95)",
                      }}
                    />

                    {/* Contenido */}
                    <Box
                      sx={{
                        p: 2,
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      {c && autenticado && usuario.isSubscribed && (
                        <Progress progress={c?.user_progress_percentage ?? 0} />
                      )}

                      <Typography
                        variant='subtitle1'
                        sx={{
                          fontWeight: 700,
                          lineHeight: 1.3,
                          mt: 1.2,
                        }}
                      >
                        {shortenText(c.title, 35)}
                      </Typography>
                    </Box>
                  </Card>
                </Link>
              </SwiperSlide>
            ))}
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
