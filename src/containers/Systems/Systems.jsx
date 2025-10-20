import React, { useContext, useEffect, useRef } from "react";
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
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import SystemContext from "../../context/System/SystemContext";
import { Link } from "react-router-dom";

const Systems = () => {
  const { getAllSystems, systems } = useContext(SystemContext);
  const theme = useTheme();
  const swiperPrevRef = useRef(null);
  const swiperNextRef = useRef(null);

  useEffect(() => {
    getAllSystems();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "#FFF0F0",
        p: { xs: 4, sm: 6, md: 8 },
        position: "relative",
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      {/* --- Elementos decorativos --- */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "50px",
          height: "20px",
          borderTop: "3px double #DC4485",
          borderBottom: "3px double #F3BBCE",
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
          backgroundColor: "#DC4485",
          opacity: 0.5,
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
          border: "3px solid #D72E79",
          opacity: 0.4,
          display: { xs: "none", md: "block" },
        }}
      />

      {/* --- Cabecera --- */}
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
              backgroundColor: "#DC4485",
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
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
          }}
        >
          Explora{" "}
          <Box
            component='span'
            sx={{ position: "relative", display: "inline-block" }}
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
                backgroundColor: "#DC4485",
                opacity: 0.7,
                borderRadius: "4px",
                zIndex: -1,
              }}
            />
          </Box>{" "}
          de Uñas
        </Typography>
      </Stack>

      {/* --- Carrusel --- */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: "1300px",
          mx: "auto",
          zIndex: 1,
          borderRadius: "12px",
        }}
      >
        <Swiper
          modules={[Navigation]}
          loop={true}
          spaceBetween={20}
          slidesPerView={1}
          navigation={{
            prevEl: swiperPrevRef.current,
            nextEl: swiperNextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = swiperPrevRef.current;
            swiper.params.navigation.nextEl = swiperNextRef.current;
          }}
          breakpoints={{
            600: { slidesPerView: 2, spaceBetween: 25 },
            900: { slidesPerView: 3, spaceBetween: 30 },
            1200: { slidesPerView: 4, spaceBetween: 35 },
          }}
        >
          {systems.map((system) => (
            <SwiperSlide key={system.id}>
              <Link
                to={`/cursos/bysystem/${system.id}`}
                style={{ textDecoration: "none" }}
              >
                <Paper
                  elevation={1}
                  sx={{
                    p: { xs: 3, sm: 4 },
                    textAlign: "center",
                    borderRadius: "16px",
                    height: "100%",
                    minHeight: 280,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.08)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0px 12px 25px rgba(0, 0, 0, 0.12)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      backgroundColor: "#FCE4EC",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: 2,
                    }}
                  >
                    <Box
                      component='img'
                      src={system.icon}
                      alt={system.name}
                      sx={{
                        width: "60%",
                        height: "60%",
                        objectFit: "contain",
                      }}
                    />
                  </Box>

                  <Typography variant='h6' sx={{ fontWeight: 700, mb: 1 }}>
                    {system.name}
                  </Typography>

                  <Typography
                    variant='body2'
                    color='text.secondary'
                    textAlign='justify'
                    sx={{
                      flexGrow: 1,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      lineHeight: 1.5,
                      px: 1,
                    }}
                  >
                    {system.description}
                  </Typography>
                </Paper>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* --- Botones de navegación --- */}
        <IconButton
          ref={swiperPrevRef}
          sx={{
            position: "absolute",
            left: { xs: -5, sm: -50 },
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "#F3BBCE",
            color: "white",
            "&:hover": { backgroundColor: "#F3BBCE" },
            zIndex: 10,
            width: 44,
            height: 44,
            display: { xs: "none", sm: "flex" },
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        <IconButton
          ref={swiperNextRef}
          sx={{
            position: "absolute",
            right: { xs: -5, sm: -50 },
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "#F3BBCE",
            color: "white",
            "&:hover": { backgroundColor: "#F3BBCE" },
            zIndex: 10,
            width: 44,
            height: 44,
            display: { xs: "none", sm: "flex" },
          }}
        >
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Systems;
