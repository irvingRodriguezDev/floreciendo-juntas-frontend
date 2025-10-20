import React from "react";
import { Box, Typography, Grid, Stack, useTheme } from "@mui/material";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import StarIcon from "@mui/icons-material/Star";
import SchoolIcon from "@mui/icons-material/School";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";

// Datos de las características (Mantenidos igual)
const features = [
  {
    icon: StarIcon,
    title: "Mentoras Expertas",
    description:
      "Contamos con profesionales de élite en el sector de uñas para darte el mejor soporte y guía.",
    iconColor: "#E46F9F", // Amarillo
  },
  {
    icon: HeadsetMicIcon,
    title: "Soporte Dedicado",
    description:
      "Siempre estamos listas para ayudarte a resolver dudas y problemas 24/7. ¡No estás sola!",
    iconColor: "#E46F9F", // Verde
  },
  {
    icon: SchoolIcon,
    title: "Aprendizaje Digital",
    description:
      "Accede a tus cursos desde cualquier dispositivo, a tu ritmo, con lecciones claras y concisas.",
    iconColor: "#E46F9F", // Violeta
  },
  {
    icon: EmojiEventsIcon,
    title: "Certificado de Éxito",
    description:
      "Obtén tu certificación que avala tus conocimientos y te impulsa a emprender con credibilidad.",
    iconColor: "#E46F9F", // Rosa principal
  },
];

// Componente individual para cada característica (Mantenido igual)
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

  const lightYellow = "#D82E7A";
  const pinkDecorColor = "#F727A3"; // Usaremos el amarillo/rosa pálido para los adornos

  // Fondo de color (Un crema pálido similar al de la imagen)
  const softBgColor = "#FFF0F0";

  return (
    <Box
      sx={{
        backgroundColor: softBgColor, // Fondo de color suave
        padding: theme.spacing(8, 4),
        overflow: "hidden",
        position: "relative", // Para posicionar los adornos
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        borderRadius: "16px",
      }}
    >
      {/* --- Elementos Decorativos de Fondo --- */}

      {/* Adorno de puntos/círculos en la esquina superior izquierda (simulando los puntos rosas) */}
      <Box
        sx={{
          position: "absolute",
          top: "5%",
          left: "5%",
          width: "50px",
          height: "50px",
          backgroundImage:
            "radial-gradient(circle, #f06292 20%, transparent 20%)",
          backgroundSize: "10px 10px",
          opacity: 0.5,
          transform: "rotate(15deg)",
          display: { xs: "none", md: "block" },
        }}
      />

      {/* Adorno de líneas/figura abstracta en la parte inferior derecha */}
      <Box
        sx={{
          position: "absolute",
          bottom: "5%",
          right: "5%",
          width: "50px",
          height: "50px",
          borderTop: `5px solid ${pinkDecorColor}`,
          borderLeft: `5px solid ${pinkDecorColor}`,
          transform: "rotate(45deg)",
          opacity: 0.6,
          borderRadius: "5px",
          display: { xs: "none", md: "block" },
        }}
      />
      {/* --- Fin Elementos Decorativos --- */}

      <Grid
        container
        spacing={6}
        alignItems='center'
        justifyContent='center'
        sx={{ maxWidth: 1440, margin: "0 auto", zIndex: 1 }}
      >
        {/* Sección Izquierda: Título y Características */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack spacing={5}>
            {/* Cabecera de la Sección (Estilo Floreciendo Juntas) */}
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
                <span
                  style={{
                    position: "relative",
                    display: "inline-block",
                    textDecoration: "none",
                  }}
                >
                  Diferentes
                  <Box
                    component='span'
                    sx={{
                      position: "absolute",
                      left: 0,
                      bottom: 0,
                      width: "100%",
                      height: "8px",
                      backgroundColor: lightYellow, // Resaltado amarillo suave
                      zIndex: -1,
                      opacity: 0.7,
                      borderRadius: "4px",
                    }}
                  />
                </span>
              </Typography>
            </Stack>

            {/* Listado de Características */}
            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid size={{ xs: 12, md: 6 }} key={index}>
                  <FeatureItem {...feature} />
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Grid>

        {/* Sección Derecha: Imagen/Video y Círculo de Play (La Caja Grande) */}
        <Grid
          size={{ xs: 12, sm: 6 }}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              maxWidth: 500,
              height: { xs: 350, sm: 450, md: 500 }, // Altura para mantener la proporción
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: theme.shadows[10],
              border: `10px solid ${theme.palette.background.paper || "white"}`, // Borde blanco visible
            }}
          >
            {/* Imagen de Fondo del Video */}
            <Box
              component='img'
              // Usa la URL de la imagen de la chica con el chico
              src='https://i.pinimg.com/1200x/ee/79/a9/ee79a90d29fad35a96c8e6cffde03602.jpg'
              alt='Estudiantes aprendiendo'
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "relative",
                top: 0,
                left: 0,
              }}
            />

            {/* Icono de Play Central (simulando un video) */}
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
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  animation: "pulse 2s infinite",
                  opacity: 0.8,
                },
                "@keyframes pulse": {
                  "0%": { transform: "scale(1)", opacity: 0.8 },
                  "50%": { transform: "scale(1.1)", opacity: 0.4 },
                  "100%": { transform: "scale(1)", opacity: 0.8 },
                },
              }}
            >
              <PlayCircleFilledIcon
                sx={{
                  fontSize: 85,
                  color: "white",
                  transition: "color 0.2s",
                  zIndex: 3,
                  position: "relative",
                  ml: 1,
                  mt: 1,
                  "&:hover": {
                    color: "#fff",
                  },
                }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WhyChooseUsSection;
