import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Stack,
  useTheme,
  Modal,
  IconButton,
} from "@mui/material";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import StarIcon from "@mui/icons-material/Star";
import SchoolIcon from "@mui/icons-material/School";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import CloseIcon from "@mui/icons-material/Close";
import image from "../../assets/images/Captura de pantalla 2025-11-24 a la(s) 1.26.37 p.m..png";
// Datos de las características
const features = [
  {
    icon: StarIcon,
    title: "Mentoras Expertas",
    description:
      "Contamos con profesionales de élite en el sector de uñas para darte el mejor soporte y guía.",
    iconColor: "#E46F9F",
  },
  {
    icon: HeadsetMicIcon,
    title: "Soporte Dedicado",
    description:
      "Siempre estamos listas para ayudarte a resolver dudas y problemas 24/7. ¡No estás sola!",
    iconColor: "#E46F9F",
  },
  {
    icon: SchoolIcon,
    title: "Aprendizaje Digital",
    description:
      "Accede a tus cursos desde cualquier dispositivo, a tu ritmo, con lecciones claras y concisas.",
    iconColor: "#E46F9F",
  },
  {
    icon: EmojiEventsIcon,
    title: "Certificado de Éxito",
    description:
      "Obtén tu certificación que avala tus conocimientos y te impulsa a emprender con credibilidad.",
    iconColor: "#E46F9F",
  },
];

// Componente individual
const FeatureItem = ({ icon: Icon, title, description, iconColor }) => (
  <Stack spacing={1} sx={{ maxWidth: { xs: "100%", md: "300px" } }}>
    <Box
      sx={{
        width: 48,
        height: 48,
        borderRadius: "50%",
        backgroundColor: iconColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mb: 1,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Icon sx={{ color: "white", fontSize: 24 }} />
    </Box>
    <Typography variant='h6' sx={{ fontWeight: 700, lineHeight: 1.3 }}>
      {title}
    </Typography>
    <Typography variant='body2' color='text.secondary' textAlign='justify'>
      {description}
    </Typography>
  </Stack>
);
function Sparkles({ count = 6 }) {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            top: `${10 + i * 12}%`,
            left: `${6 + (i % 3) * 10}%`,
            width: "10px",
            height: "10px",
            backgroundColor: "#FF8AC0",
            borderRadius: "50%",
            opacity: 0.7,
            animation: `sparkle 2.2s ease-in-out ${i * 0.4}s infinite`,
            display: { xs: "none", md: "block" },
          }}
        />
      ))}
    </>
  );
}

const WhyChooseUsSection = () => {
  const [openVideo, setOpenVideo] = useState(false);
  const theme = useTheme();

  const pinkMain = "#D82E7A";
  const pinkDecor = "#F727A3";
  const softBg = "#FFF0F0";

  return (
    <>
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          background:
            "linear-gradient(181deg,rgba(255, 223, 239, 1) 0%, rgba(255, 255, 255, 1) 100%);",
          padding: theme.spacing(8, 4),
          overflow: "hidden",
          position: "relative",
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          borderRadius: "16px",
        }}
      >
        {/* ------------------------------------ */}
        {/*            DECORACIONES              */}
        {/* ------------------------------------ */}

        {/* Esfera rosada grande */}
        <Box
          sx={{
            position: "absolute",
            top: "-40px",
            right: "-40px",
            width: "160px",
            height: "160px",
            backgroundColor: "#F8B6D0",
            borderRadius: "50%",
            opacity: 0.4,
            filter: "blur(8px)",
            animation: "float1 6s ease-in-out infinite",
            display: { xs: "none", md: "block" },
          }}
        />

        {/* Sparkles */}
        <Sparkles count={6} />

        {/* Líneas curvas decorativas */}
        <Box
          sx={{
            position: "absolute",
            bottom: "8%",
            left: "6%",
            width: "120px",
            height: "120px",
            border: "3px solid #F8A1C4",
            borderRadius: "40% 60% 60% 40%",
            transform: "rotate(25deg)",
            opacity: 0.35,
            animation: "float2 7s ease-in-out infinite",
            display: { xs: "none", md: "block" },
          }}
        />

        {/* Figura abstracta rotando */}
        <Box
          sx={{
            position: "absolute",
            top: "35%",
            right: "8%",
            width: "70px",
            height: "70px",
            border: "4px solid #F06292",
            borderRadius: "20% 40% 60% 30%",
            animation: "rotateFigura 12s linear infinite",
            opacity: 0.4,
            display: { xs: "none", md: "block" },
          }}
        />

        {/* ------------------------------------ */}
        {/*               CONTENIDO              */}
        {/* ------------------------------------ */}

        <Grid
          container
          spacing={6}
          alignItems='center'
          justifyContent='center'
          sx={{ maxWidth: 1440, margin: "0 auto", zIndex: 1 }}
        >
          {/* IZQUIERDA */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={5}>
              <Stack>
                <Typography
                  variant='overline'
                  sx={{
                    color: theme.palette.text.secondary,
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  Floreciendo Juntas
                </Typography>

                <Typography
                  variant='h3'
                  component='h2'
                  sx={{
                    fontWeight: 800,
                    lineHeight: 1.2,
                    fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
                  }}
                >
                  Que Nos Hace{" "}
                  <Box component='span' sx={{ position: "relative" }}>
                    Diferentes
                    <Box
                      component='span'
                      sx={{
                        position: "absolute",
                        left: 0,
                        bottom: 2,
                        width: "100%",
                        height: "8px",
                        backgroundColor: "#F06292",
                        zIndex: -1,
                        opacity: 0.6,
                        borderRadius: "4px",
                      }}
                    />
                  </Box>
                </Typography>
              </Stack>

              {/* CUADRÍCULA DE FEATURES */}
              <Grid container spacing={4}>
                {features.map((feature, index) => (
                  <Grid key={index} size={{ xs: 12, md: 6 }}>
                    <FeatureItem {...feature} />
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Grid>

          {/* DERECHA (VIDEO) */}
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                maxWidth: 500,
                height: { xs: 500, sm: 650, md: 700 },
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: theme.shadows[10],
                border: `10px solid #F971AF`,
              }}
            >
              <Box
                component='img'
                src={image}
                alt='Estudiantes aprendiendo'
                loading='lazy'
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />

              {/* Botón Play */}
              {/* <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  cursor: "pointer",
                }}
                onClick={() => setOpenVideo(true)}
              >
                <Box
                  sx={{
                    position: "absolute",
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255,255,255,0.35)",
                    animation: "pulse 2s infinite",
                  }}
                />
                <PlayCircleFilledIcon
                  sx={{ fontSize: 85, color: "white", position: "relative" }}
                />
              </Box> */}
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* MODAL DE VIDEO */}
      <Modal open={openVideo} onClose={() => setOpenVideo(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#000",
            padding: 2,
            borderRadius: 3,
            outline: "none",
            width: "90%",
            maxWidth: "800px",
          }}
        >
          <IconButton
            onClick={() => setOpenVideo(false)}
            sx={{ position: "absolute", right: 10, top: 10, color: "white" }}
          >
            <CloseIcon />
          </IconButton>

          <iframe
            width='100%'
            height='450'
            src='https://www.youtube.com/embed/QB7ACr7pUuE'
            title='Video'
            frameBorder='0'
            allow='autoplay; encrypted-media'
            allowFullScreen
            style={{ borderRadius: "12px" }}
          />
        </Box>
      </Modal>
    </>
  );
};

export default WhyChooseUsSection;
