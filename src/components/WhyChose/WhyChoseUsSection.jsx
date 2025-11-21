import React from "react";
import { Box, Typography, Grid, Stack, useTheme } from "@mui/material";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import StarIcon from "@mui/icons-material/Star";
import SchoolIcon from "@mui/icons-material/School";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";

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

const WhyChooseUsSection = () => {
  const theme = useTheme();

  const pinkMain = "#D82E7A";
  const pinkDecor = "#F727A3";
  const softBg = "#FFF0F0";

  return (
    <Box
      sx={{
        backgroundColor: softBg,
        padding: theme.spacing(8, 4),
        overflow: "hidden",
        position: "relative",
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        borderRadius: "16px",
      }}
    >
      {/* ----------- ELEMENTOS DECORATIVOS CON ANIMACIONES ----------- */}

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
          "@keyframes float1": {
            "0%": { transform: "translateY(0px)" },
            "50%": { transform: "translateY(15px)" },
            "100%": { transform: "translateY(0px)" },
          },
          display: { xs: "none", md: "block" },
        }}
      />

      {/* Círculos pequeños tipo sparkle */}
      {[...Array(6)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            top: `${10 + i * 12}%`,
            left: `${5 + (i % 3) * 8}%`,
            width: "10px",
            height: "10px",
            backgroundColor: "#FF8AC0",
            borderRadius: "50%",
            opacity: 0.7,
            animation: `sparkle 2.2s ease-in-out ${(i * 0.4).toFixed(
              1
            )}s infinite`,
            "@keyframes sparkle": {
              "0%": { transform: "scale(0.6)", opacity: 0.4 },
              "50%": { transform: "scale(1)", opacity: 1 },
              "100%": { transform: "scale(0.6)", opacity: 0.4 },
            },
            display: { xs: "none", md: "block" },
          }}
        />
      ))}

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
          "@keyframes float2": {
            "0%": { transform: "rotate(25deg) translateY(0)" },
            "50%": { transform: "rotate(25deg) translateY(12px)" },
            "100%": { transform: "rotate(25deg) translateY(0)" },
          },
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
          animation: "rotate 12s linear infinite",
          opacity: 0.4,
          "@keyframes rotate": {
            "0%": { transform: "rotate(0deg)" },
            "100%": { transform: "rotate(360deg)" },
          },
          display: { xs: "none", md: "block" },
        }}
      />

      {/* ------------------------------------------------------------- */}

      <Grid
        container
        spacing={6}
        alignItems='center'
        justifyContent='center'
        sx={{ maxWidth: 1440, margin: "0 auto", zIndex: 1 }}
      >
        {/* IZQUIERDA */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack spacing={5}>
            <Stack>
              <Typography
                variant='overline'
                sx={{
                  color: theme.palette.text.secondary,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  mb: 1,
                }}
              >
                Floreciendo Juntas
              </Typography>

              <Typography
                variant='h3'
                component='h2'
                sx={{
                  fontWeight: 700,
                  lineHeight: 1.2,
                  fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
                }}
              >
                Lo Que Nos Hace{" "}
                <span style={{ position: "relative", display: "inline-block" }}>
                  Diferentes
                  <Box
                    component='span'
                    sx={{
                      position: "absolute",
                      left: 0,
                      bottom: 0,
                      width: "100%",
                      height: "8px",
                      backgroundColor: pinkMain,
                      zIndex: -1,
                      opacity: 0.7,
                      borderRadius: "4px",
                    }}
                  />
                </span>
              </Typography>
            </Stack>

            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid size={{ xs: 12, md: 6 }} key={index}>
                  <FeatureItem {...feature} />
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Grid>

        {/* DERECHA */}
        <Grid
          size={{ xs: 12, sm: 6 }}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              maxWidth: 500,
              height: { xs: 350, sm: 450, md: 500 },
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: theme.shadows[10],
              border: `10px solid white`,
            }}
          >
            <Box
              component='img'
              src='https://i.pinimg.com/1200x/ee/79/a9/ee79a90d29fad35a96c8e6cffde03602.jpg'
              alt='Estudiantes aprendiendo'
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />

            {/* Icono de Play */}
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                cursor: "pointer",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255,255,255,0.3)",
                  animation: "pulse 2s infinite",
                },
                "@keyframes pulse": {
                  "0%": { transform: "scale(1)" },
                  "50%": { transform: "scale(1.2)" },
                  "100%": { transform: "scale(1)" },
                },
              }}
            >
              <PlayCircleFilledIcon
                sx={{ fontSize: 85, color: "white", position: "relative" }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WhyChooseUsSection;
