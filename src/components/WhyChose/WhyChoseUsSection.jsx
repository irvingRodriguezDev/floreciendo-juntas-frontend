import React from "react";
import { Box, Typography, Grid, Stack, useTheme, alpha } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import SchoolIcon from "@mui/icons-material/School";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import VerifiedIcon from "@mui/icons-material/Verified";
import image from "../../assets/images/Captura-de-pantalla-2025-11-24-a-la_s_-1.26.37 p.m. (1).webp";
import { useHoliday } from "../../context/Holiday/HolidayContext";

// Datos de las características
const features = [
  {
    icon: StarIcon,
    title: "Mentoras Expertas",
    description:
      "Contamos con profesionales de élite en el sector de uñas para darte el mejor soporte y guía.",
  },
  {
    icon: HeadsetMicIcon,
    title: "Soporte Dedicado",
    description:
      "Siempre estamos listas para ayudarte a resolver dudas. ¡Nunca estarás sola en tu proceso!",
  },
  {
    icon: SchoolIcon,
    title: "Aprendizaje Digital",
    description:
      "Accede a tus cursos desde cualquier dispositivo, a tu ritmo, con lecciones claras y concisas.",
  },
  {
    icon: EmojiEventsIcon,
    title: "Certificado de Éxito",
    description:
      "Obtén tu certificación que avala tus conocimientos y te impulsa a emprender con credibilidad.",
  },
];

// Componente individual rediseñado con toque moderno
const FeatureItem = ({ icon: Icon, title, description }) => (
  <Stack spacing={1.5}>
    <Box
      sx={{
        width: 50,
        height: 50,
        borderRadius: "16px",
        backgroundColor: alpha("#E53888", 0.1),
        color: "#E53888",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mb: 0.5,
        border: "1px solid",
        borderColor: alpha("#E53888", 0.2),
      }}
    >
      <Icon sx={{ fontSize: 26 }} />
    </Box>
    <Typography
      variant='h6'
      sx={{
        fontWeight: 800,
        lineHeight: 1.3,
        color: "#2B1B24",
        fontSize: "1.1rem",
      }}
    >
      {title}
    </Typography>
    <Typography variant='body2' sx={{ color: "#5A4650", lineHeight: 1.6 }}>
      {description}
    </Typography>
  </Stack>
);

const WhyChooseUsSection = () => {
  const theme = useTheme();
  const { isHolidayMode } = useHoliday();
  return (
    <Box
      sx={{
        background: `
          linear-gradient(180deg, #FFFFFF 0%, #FFF0F5 100%),
          radial-gradient(circle at top right, rgba(232,62,140,0.06), transparent 70%)
        `,
        py: { xs: 6, md: 10 },
        px: { xs: 3, md: 6 },
        position: "relative",
        borderRadius: "32px",
        overflow: "hidden",
        border: "1px solid",
        borderColor: alpha("#E53888", 0.08),
        boxShadow: "0 20px 40px rgba(232, 62, 140, 0.04)",
      }}
    >
      {isHolidayMode && (
        <Box
          sx={{
            position: "absolute",
            marginTop: { xs: -5, lg: -9 },
            display: "flex",
            left: 0,
            justifyContent: "flex-start",
          }}
        >
          <Box
            component='img'
            src='https://cdn.floreciendojuntas.com/production/statics/xmas/bota-xmas.webp'
            alt='Campanas Navideñas'
            sx={{
              width: { xs: 100, sm: 110, md: 150, lg: 200 },
              height: { xs: 100, sm: 110, md: 150, lg: 200 },
              objectFit: "contain", // Asegura que la imagen mantenga su proporción sin deformarse
              opacity: 0.5,
            }}
          />
        </Box>
      )}
      {isHolidayMode && (
        <Box
          sx={{
            position: "absolute",
            marginTop: { xs: -5, lg: -10 },
            display: "flex",
            right: 0,
            justifyContent: "flex-end",
          }}
        >
          <Box
            component='img'
            src='https://cdn.floreciendojuntas.com/production/statics/xmas/deco-xmas.png'
            alt='Campanas Navideñas'
            sx={{
              opacity: 0.7,
              width: { xs: 100, sm: 110, md: 150, lg: 200 },
              height: { xs: 100, sm: 110, md: 150, lg: 200 },
              objectFit: "contain", // Asegura que la imagen mantenga su proporción sin deformarse
            }}
          />
        </Box>
      )}
      <Grid
        container
        spacing={6}
        alignItems='center'
        justifyContent='center'
        sx={{
          maxWidth: 1400,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* IZQUIERDA (TEXTO Y FEATURES) */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={4}>
            <Stack>
              {/* Badge superior minimalista */}
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  backgroundColor: alpha("#E53888", 0.1),
                  color: "#E53888",
                  px: 2,
                  py: 0.6,
                  borderRadius: "50px",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  width: "fit-content",
                  mb: 2,
                }}
              >
                <VerifiedIcon sx={{ fontSize: "1rem" }} />
                <span>Floreciendo Juntas</span>
              </Box>

              <Typography
                variant='h2'
                component='h2'
                sx={{
                  fontWeight: 900,
                  lineHeight: 1.15,
                  fontSize: { xs: "2rem", sm: "2.8rem", md: "3.4rem" },
                  color: "#2B1B24",
                  letterSpacing: "-0.02em",
                }}
              >
                ¿Qué nos hace{" "}
                <Box component='span' sx={{ color: "#E53888" }}>
                  diferentes?
                </Box>
              </Typography>
            </Stack>

            {/* CUADRÍCULA DE FEATURES */}
            <Grid container spacing={3}>
              {features.map((feature, index) => (
                <Grid key={index} size={{ xs: 12, sm: 6 }}>
                  <FeatureItem {...feature} />
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Grid>

        {/* DERECHA (IMAGEN ESTILIZADA) */}
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              maxWidth: 480,
              height: { xs: 400, sm: 500, md: 540 },
              borderRadius: "28px",
              overflow: "hidden",
              boxShadow: "0px 20px 40px rgba(232, 62, 140, 0.15)",
              border: "4px solid #FFFFFF",
            }}
          >
            <Box
              component='img'
              src={image}
              alt='Estudiantes aprendiendo'
              loading='lazy'
              sx={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WhyChooseUsSection;
