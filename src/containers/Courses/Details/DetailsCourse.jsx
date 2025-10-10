import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  Button,
  Stack,
  Divider,
  useTheme,
  Paper,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Layout from "../../../components/Layout/Layout";
import CourseTitle from "./CouseTitle";

// --- Contenido de Ejemplo del Curso ---
const courseData = {
  title: "Técnicas Avanzadas de Esculpido con Polygel",
  description:
    "Aprende a dominar el Polygel, el híbrido perfecto entre acrílico y gel. Este curso cubre desde la preparación de la uña natural hasta la aplicación de formas esculturales complejas, tipología avanzada y el uso de dual forms. Transforma tu pasión en una habilidad de nivel profesional.",
  metadata: {
    duration: "15 Horas",
    lessons: 28,
    videos: "8 Horas",
    students: "Más de 5.2K",
    language: "Español",
    level: "Intermedio/Avanzado",
  },
  benefits: [
    "El dominio total del sistema Polygel para cualquier tipo de cliente.",
    "Certificado de finalización válido para emprendimiento.",
    "Acceso a nuestra comunidad exclusiva de Mentoras y Alumnas.",
    "Técnicas de encapsulado y Baby Boomer con Polygel.",
  ],
  latestCourse: {
    title: "Nail Art 3D y 4D para Novias",
    date: "10 Oct 2025",
    image: "https://cloud.wapizima.com.mx/production/courses/mobile/110-mobile",
  },
};

const CourseDetailScreen = () => {
  const theme = useTheme();

  const primaryPink = "#e91e63";
  const highlightYellow = "#e91e63";
  const lightYellow = "#ffecb3";
  const softBgColor = "#FCFCFC"; // Fondo suave

  // --- Componente para la Tarjeta de Información Lateral ---
  const InfoCard = () => (
    <Card
      sx={{
        p: 3,
        borderRadius: "16px",
        boxShadow: theme.shadows[4],
        position: "sticky",
        top: theme.spacing(4), // Se pega al scroll
        border: "1px solid #f0f0f0",
      }}
    >
      {/* Sección de Acceso/Precio */}
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        sx={{ mb: 2 }}
      >
        <Typography variant='h5' sx={{ fontWeight: 700, color: primaryPink }}>
          Acceso Premium
        </Typography>
        <Typography
          variant='body2'
          sx={{ color: theme.palette.success.main, fontWeight: 600 }}
        >
          ¡Incluido!
        </Typography>
      </Stack>

      <Button
        variant='contained'
        fullWidth
        startIcon={<PlayArrowIcon />}
        sx={{
          backgroundColor: primaryPink,
          color: "white",
          "&:hover": { backgroundColor: primaryPink },
          fontWeight: 600,
          padding: "12px 0",
          borderRadius: "8px",
          mb: 3,
          textTransform: "none",
        }}
      >
        Iniciar Curso (Acceso Ilimitado)
      </Button>

      <Divider sx={{ mb: 3 }} />

      {/* Metadatos del Curso */}
      <Stack spacing={2}>
        {[
          {
            icon: AccessTimeIcon,
            label: "Duración",
            value: courseData.metadata.duration,
          },
          {
            icon: LibraryBooksIcon,
            label: "Lecciones",
            value: courseData.metadata.lessons,
          },
          {
            icon: PlayArrowIcon,
            label: "Videos",
            value: courseData.metadata.videos,
          },
          {
            icon: PeopleAltIcon,
            label: "Estudiantes",
            value: courseData.metadata.students,
          },
          {
            icon: "language",
            label: "Idioma",
            value: courseData.metadata.language,
          },
          { icon: "level", label: "Nivel", value: courseData.metadata.level },
        ].map((item, index) => (
          <Stack key={index} direction='row' justifyContent='space-between'>
            <Stack direction='row' alignItems='center' spacing={1}>
              {item.icon !== "language" && item.icon !== "level" && (
                <item.icon sx={{ fontSize: 18, color: primaryPink }} />
              )}
              <Typography variant='body2' color='text.secondary'>
                {item.label}:
              </Typography>
            </Stack>
            <Typography variant='body2' sx={{ fontWeight: 600 }}>
              {item.value}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Card>
  );

  // --- Componente de la Tarjeta de Último Curso (Simil Blog) ---
  const LatestCourseCard = () => (
    <Paper
      sx={{
        p: 2,
        mt: 3,
        borderRadius: "12px",
        boxShadow: theme.shadows[1],
        backgroundColor: "#fafafa",
      }}
    >
      <Typography
        variant='h6'
        sx={{ fontWeight: 700, mb: 2, color: primaryPink }}
      >
        Últimos Cursos
      </Typography>
      <Stack direction='row' spacing={2} alignItems='center'>
        <Box
          component='img'
          src={courseData.latestCourse.image}
          alt={courseData.latestCourse.title}
          sx={{
            width: 60,
            height: 60,
            borderRadius: "8px",
            objectFit: "cover",
          }}
        />
        <Box>
          <Typography variant='body2' sx={{ fontWeight: 600 }}>
            {courseData.latestCourse.title}
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            {courseData.latestCourse.date}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );

  return (
    <Layout>
      <Box sx={{ backgroundColor: softBgColor, minHeight: "100vh" }}>
        {/* Banner Superior con Adornos */}
        <CourseTitle title={courseData.title} />

        {/* Contenido Principal */}
        <Grid
          container
          spacing={4}
          sx={{ maxWidth: 1440, margin: "0 auto", p: 4 }}
        >
          {/* Columna Derecha: Tarjeta de Info y Últimos Cursos */}
          <Grid size={{ xs: 12, md: 4 }} order={{ xs: 2, md: 2 }}>
            <InfoCard />
            <LatestCourseCard />
          </Grid>

          {/* Columna Izquierda: Imagen y Contenido */}
          <Grid size={{ xs: 12, md: 8 }} order={{ xs: 1, md: 1 }}>
            <Stack spacing={4}>
              {/* Imagen Principal del Curso (Simil al diseño) */}
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: { xs: 250, sm: 350 },
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: theme.shadows[8],
                }}
              >
                <Box
                  component='img'
                  // Usaremos la imagen de la chica con el fondo amarillo para simular la portada
                  src='https://i.pinimg.com/736x/d1/e4/75/d1e47547bb78f24d79dd5f58d5fe3b2b.jpg'
                  alt='Portada del Curso'
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>

              {/* Navegación (Tabs/Pestañas) - Usamos solo botones por simplicidad visual */}
              <Stack direction='row' spacing={1}>
                {[
                  "Visión General",
                  "Currículum",
                  "Instructora",
                  "Opiniones",
                ].map((tab, index) => (
                  <Button
                    key={tab}
                    variant={index === 0 ? "contained" : "outlined"}
                    sx={{
                      borderRadius: "8px",
                      textTransform: "none",
                      fontWeight: 600,
                      backgroundColor:
                        index === 0 ? highlightYellow : "transparent", // Amarillo para la pestaña activa
                      color: index === 0 ? "white" : primaryPink,
                      borderColor: primaryPink,
                      "&:hover": {
                        backgroundColor:
                          index === 0 ? highlightYellow : primaryPink,
                        color: index === 0 ? "white" : "white",
                        borderColor: primaryPink,
                      },
                    }}
                  >
                    {tab}
                  </Button>
                ))}
              </Stack>

              {/* --- Sección de Visión General --- */}
              <Box>
                <Typography variant='h5' sx={{ fontWeight: 700, mb: 2 }}>
                  Visión General del Curso
                </Typography>
                <Typography
                  variant='body1'
                  color='text.secondary'
                  sx={{ mb: 3 }}
                >
                  {courseData.description}
                </Typography>

                <Typography
                  variant='h6'
                  sx={{ fontWeight: 700, mb: 2, color: primaryPink }}
                >
                  ¿Por Qué Elegir Este Curso?
                </Typography>
                <Stack spacing={1}>
                  {courseData.benefits.map((benefit, index) => (
                    <Stack
                      key={index}
                      direction='row'
                      spacing={1}
                      alignItems='flex-start'
                    >
                      <CheckCircleIcon
                        sx={{
                          fontSize: 20,
                          color: theme.palette.success.main,
                          mt: 0.5,
                        }}
                      />
                      <Typography variant='body1' color='text.primary'>
                        {benefit}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default CourseDetailScreen;
