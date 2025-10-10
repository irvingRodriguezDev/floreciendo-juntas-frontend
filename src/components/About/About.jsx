import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Stack,
  useTheme,
  Paper,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SchoolIcon from "@mui/icons-material/School";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonIcon from "@mui/icons-material/Person";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

// Componente para las tarjetas de estadísticas (KPIs)
const StatisticCard = ({ icon: Icon, value, label, color }) => (
  <Stack direction='row' spacing={2} alignItems='center' sx={{ mb: 2 }}>
    <Box
      sx={{
        width: 48,
        height: 48,
        borderRadius: "50%",
        backgroundColor: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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

  return (
    <Box
      sx={{
        padding: theme.spacing(8, 4),
        backgroundColor: "#fff",
        // Fondo ligeramente gris si quieres replicar el fondo blanco/gris claro de la imagen
        // backgroundColor: '#f8f9fa',
        overflow: "hidden",
      }}
    >
      <Grid container spacing={4} alignItems='center' justifyContent='center'>
        {/* Sección de Imágenes */}
        <Grid
          size={{ xs: 12, sm: 6 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            position: "relative",
            order: { xs: 1, md: 0 },
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: { xs: "80%", sm: "400px" },
              height: { xs: "auto", sm: "450px" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Imagen 1: Graduados (Para dar sentido de comunidad y logro)
            <Box
              component='img'
              src='https://i.pinimg.com/1200x/61/42/87/614287f9496fcd823d0c2c53abd30750.jpg' // Reemplaza con la URL de la imagen de graduados/comunidad
              alt='Comunidad Floreciendo Juntas'
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "50%", // Forma ovalada en la imagen original
                clipPath: "ellipse(45% 50% at 50% 50%)",
                position: "absolute",
                left: "-50%",
                zIndex: 1,
                display: { xs: "none", sm: "block" },
              }}
            /> */}
            {/* Imagen 2: Estudiante/Modelo (La chica con gafas) */}
            <Box
              component='img'
              src='https://i.pinimg.com/1200x/02/36/94/0236941ffc750b990ca078d23f4ff4e9.jpg' // Reemplaza con la URL de la imagen principal
              alt='Estudiante de Uñas'
              sx={{
                width: { xs: 250, sm: 300, md: 350 },
                height: { xs: 350, sm: 400, md: 450 },
                objectFit: "cover",
                borderRadius: "16px",
                clipPath: "polygon(0 0, 100% 0, 100% 90%, 0 100%)", // Simula el corte de la imagen
                position: "relative",
                left: 10,
                zIndex: 2,
                boxShadow: theme.shadows[4],
              }}
            />
            {/* Caja de experiencia flotante (25+ Years Of Experience) */}
            <Paper
              elevation={8}
              sx={{
                position: "absolute",
                bottom: { xs: "0", md: "50px" },
                left: { xs: "50%", sm: "10%", md: "30%" },
                transform: { xs: "translateX(-50%)", sm: "none" },
                backgroundColor: "#D72E79", // Verde oscuro
                color: "white",
                padding: theme.spacing(2, 3),
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                gap: theme.spacing(1),
                zIndex: 3,
                minWidth: "200px",
              }}
            >
              <WorkspacePremiumIcon fontSize='large' />
              <Typography variant='h6' sx={{ fontWeight: 700 }}>
                +10 Años
                <Typography variant='body2' sx={{ lineHeight: 1 }}>
                  De Experiencia Formando Éxito
                </Typography>
              </Typography>
            </Paper>
          </Box>
        </Grid>

        {/* Sección de Contenido de Texto y Estadísticas */}
        <Grid size={{ xs: 12, sm: 6 }} sx={{ order: { xs: 0, md: 1 } }}>
          {/* Etiqueta Superior */}
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{ mb: 1, fontWeight: 600 }}
          >
            Sobre Floreciendo Juntas
          </Typography>

          {/* Título Principal */}
          <Typography
            variant='h3'
            component='h2'
            sx={{
              fontWeight: 700,
              mb: 3,
              lineHeight: 1.2,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            }}
          >
            Una Nueva Forma de Impulsar
            <br />
            Tus{" "}
            <span
              style={{
                position: "relative",
                display: "inline-block",
                textDecoration: "none",
              }}
            >
              Habilidades
              <Box
                component='span'
                sx={{
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  width: "100%",
                  height: "8px",
                  backgroundColor: theme.palette.warning.light, // Amarillo claro
                  zIndex: -1,
                  opacity: 0.7,
                  borderRadius: "4px",
                }}
              />
            </span>
            .
          </Typography>

          {/* Primer Párrafo */}
          <Typography
            variant='body1'
            color='text.secondary'
            sx={{ mb: 2, maxWidth: 600 }}
          >
            El arte de las uñas es una de las habilidades más valiosas que una
            mujer puede poseer, transformando la pasión en un activo financiero.
            En <b>Floreciendo Juntas</b>, te ofrecemos la educación pivote para
            moldear tu futuro en la industria de la belleza.
          </Typography>

          {/* Segundo Párrafo */}
          <Typography
            variant='body1'
            color='text.secondary'
            sx={{ mb: 4, maxWidth: 600 }}
          >
            Nuestro principal beneficio es darte la capacidad de emprender. A
            través de la formación especializada, adquirirás conocimientos y
            técnicas de vanguardia que te permitirán navegar con éxito las
            complejidades del mercado.
          </Typography>

          {/* Estadísticas (KPIs) */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <StatisticCard
                icon={CameraAltIcon}
                value='+500'
                label='Clases Grabadas en HD'
                color='#F3BBCE' // Amarillo
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <StatisticCard
                icon={SchoolIcon}
                value='+1.250'
                label='Alumnas Certificadas'
                color='#DC4485' // Verde
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <StatisticCard
                icon={PeopleAltIcon}
                value='25K'
                label='Miembros de la Comunidad'
                color='#F3BBCE' // Violeta
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <StatisticCard
                icon={PersonIcon}
                value='+250'
                label='Educadoras de Soporte'
                color='#DC4485' // Rosa
              />
            </Grid>
          </Grid>

          {/* Botón Inferior */}
          {/* <Button
            variant='contained'
            endIcon={<ArrowForwardIcon />}
            sx={{
              backgroundColor: "#ffc107", // Amarillo
              color: "#333",
              "&:hover": {
                backgroundColor: "#e0a800",
              },
              fontWeight: 600,
              padding: "10px 30px",
              borderRadius: "8px",
              textTransform: "none",
            }}
          >
            Saber Más Sobre Nosotras
          </Button> */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default About;
