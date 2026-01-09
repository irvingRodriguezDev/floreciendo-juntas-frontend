import React from "react";
import { Box, Typography, Stack, useTheme, Paper, Grid } from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonIcon from "@mui/icons-material/Person";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import foto1 from "../../assets/images/IMG_7049.JPG";
import foto2 from "../../assets/images/IMG_7048.JPG";

// Componente de estadísticas
const StatisticCard = ({ icon: Icon, value, label, color }) => (
  <Stack
    direction='row'
    spacing={2}
    alignItems='center'
    sx={{
      mb: 2,
      width: "100%",
      justifyContent: { xs: "center", sm: "flex-start" },
    }}
  >
    <Box
      sx={{
        width: 48,
        height: 48,
        borderRadius: "50%",
        backgroundColor: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <Icon sx={{ color: "white" }} />
    </Box>
    <Box>
      <Typography variant='h6' sx={{ fontWeight: 700, lineHeight: 1 }}>
        {value}
      </Typography>
      <Typography variant='body2' color='text.secondary'>
        {label}
      </Typography>
    </Box>
  </Stack>
);

const About = () => {
  const theme = useTheme();
  const slides = [
    {
      img: foto1,
      title: "+10 Años",
      text: "de experiencia formando manicuristas exitosas",
    },
    {
      img: foto2,
      title: "Certificaciones",
      text: "Cursos avalados y reconocidos",
    },
  ];
  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        px: { xs: 3, sm: 6, md: 10 },
        backgroundColor: "#fff",
        background:
          "linear-gradient(181deg,rgba(255, 223, 239, 1) 0%, rgba(255, 255, 255, 1) 100%);",
        borderRadius: "20px",
      }}
    >
      <Grid container spacing={6} alignItems='center' justifyContent='center'>
        {/* Sección de Imágenes */}
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 2200 }}
            loop
            style={{ width: "100%", maxWidth: 650 }}
          >
            {slides.map((item, i) => (
              <SwiperSlide key={i}>
                <Box
                  sx={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "10px solid #F971AF ",
                    borderRadius: "12px",
                    bgcolor: "#F971AF",
                  }}
                >
                  {/* Imagen */}
                  <Box
                    component='img'
                    src={item.img}
                    alt={item.title}
                    sx={{
                      width: { xs: "100%", md: "100%" },
                      height: { xs: "300px", md: "600px" },
                      objectFit: "cover",
                      aspectRatio: "3/5",
                      boxShadow: theme.shadows[4],
                      borderRadius: "12px",
                    }}
                  />

                  {/* Tarjeta flotante */}
                  <Paper
                    elevation={6}
                    sx={{
                      position: "absolute",
                      bottom: { xs: "40px", sm: "50px" },
                      backgroundColor: "#F970AF",
                      color: "white",
                      px: { xs: 2, sm: 3 },
                      py: { xs: 1.5, sm: 2 },
                      borderRadius: "16px",
                      display: "flex",
                      alignItems: "center",
                      gap: theme.spacing(2),
                      minWidth: { xs: 230, sm: 260 },
                      textAlign: "left",
                    }}
                  >
                    <WorkspacePremiumIcon
                      sx={{ fontSize: { xs: 34, sm: 44 } }}
                    />
                    <Box>
                      <Typography
                        variant='h6'
                        sx={{
                          fontWeight: 700,
                          fontSize: { xs: "1rem", sm: "1.2rem" },
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{
                          lineHeight: 1.2,
                          fontSize: { xs: "0.75rem", sm: "0.9rem" },
                        }}
                      >
                        {item.text}
                      </Typography>
                    </Box>
                  </Paper>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>

        {/* Sección de Texto */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{
              mb: 1,
              fontWeight: 600,
              textAlign: { xs: "center", md: "left" },
              marginTop: { xs: 5, md: 0 },
            }}
          >
            Sobre Floreciendo Juntas
          </Typography>

          <Typography
            variant='h3'
            component='h2'
            sx={{
              fontWeight: 700,
              mb: 3,
              textAlign: { xs: "center", md: "left" },
              fontSize: { xs: "1.8rem", sm: "2.3rem", md: "2.8rem" },
              lineHeight: 1.2,
            }}
          >
            Una Nueva Forma de Impulsar tus{" "}
            <Box component='span' sx={{ position: "relative" }}>
              Habilidades
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  bottom: 3,
                  width: "100%",
                  height: "6px",
                  backgroundColor: "#F971AF",
                  opacity: 0.6,
                  borderRadius: "4px",
                }}
              />
            </Box>
            .
          </Typography>

          <Typography
            variant='body1'
            color='text.secondary'
            sx={{ mb: 2, textAlign: "justify" }}
          >
            El arte de las uñas es una de las habilidades más valiosas que una
            mujer puede poseer, transformando la pasión en un activo financiero.
            En <b>Floreciendo Juntas</b>, te ofrecemos la educación pivote para
            moldear tu futuro en la industria de la belleza.
          </Typography>

          <Typography
            variant='body1'
            color='text.secondary'
            sx={{ mb: 4, textAlign: "justify" }}
          >
            Nuestro principal beneficio es darte la capacidad de emprender. A
            través de la formación especializada, adquirirás conocimientos y
            técnicas de vanguardia que te permitirán navegar con éxito las
            complejidades del mercado.
          </Typography>

          {/* Estadísticas */}
          <Grid container spacing={2}>
            <Grid size={{ xs: 6, sm: 6, md: 6 }}>
              <StatisticCard
                icon={CameraAltIcon}
                value='+150'
                label='Clases Grabadas en HD'
                color='#F3BBCE'
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 6, md: 6 }}>
              <StatisticCard
                icon={SchoolIcon}
                value='+1.250'
                label='Alumnas Certificadas'
                color='#F971AF'
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 6, md: 6 }}>
              <StatisticCard
                icon={PeopleAltIcon}
                value='+10K'
                label='Miembros de la Comunidad'
                color='#F3BBCE'
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 6, md: 6 }}>
              <StatisticCard
                icon={PersonIcon}
                value='+50'
                label='Educadoras de Soporte'
                color='#F971AF'
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default About;
