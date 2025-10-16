import React, { useContext, useEffect } from "react";
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
import CoursesContext from "../../../context/Courses/CoursesContext";
import { useParams } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";
import PinkSpinner from "../../../components/Loading/PinkSpinner";
// --- Contenido de Ejemplo del Curso ---

const CourseDetailScreen = () => {
  // const videoUrl =
  // "https://d3uummb9o2cvmk.cloudfront.net/6-1760642135708-Diseños con Gel Temática Coco la película - Wapizima (1080p, h264)/1760642135708-Diseños con Gel Temática Coco la película - Wapizima (1080p, h264).m3u8"; // tu URL HLS de CloudFront
  const params = useParams();
  const { id } = params;
  const { course, getCourseById } = useContext(CoursesContext);
  useEffect(() => {
    getCourseById(id);
  }, [id]);

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
            value: 2332,
          },
          {
            icon: LibraryBooksIcon,
            label: "Lecciones",
            value: 20,
          },
          {
            icon: PlayArrowIcon,
            label: "Videos",
            value: 10,
          },
          {
            icon: PeopleAltIcon,
            label: "Estudiantes",
            value: 10,
          },
          {
            icon: "language",
            label: "Idioma",
            value: "español",
          },
          { icon: "level", label: "Nivel", value: "principiante" },
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

  return (
    <Layout>
      {course ? (
        <Box sx={{ backgroundColor: softBgColor, minHeight: "100vh" }}>
          {/* Banner Superior con Adornos */}
          <CourseTitle title={course.title} />

          {/* Contenido Principal */}
          <Grid
            container
            spacing={4}
            sx={{ maxWidth: 1440, margin: "0 auto", p: 4 }}
          >
            {/* Columna Derecha: Tarjeta de Info y Últimos Cursos */}
            <Grid size={{ xs: 12, md: 4 }} order={{ xs: 2, md: 2 }}>
              <InfoCard />
              {/* <LatestCourseCard /> */}
            </Grid>

            {/* Columna Izquierda: Imagen y Contenido */}
            <Grid size={{ xs: 12, md: 8 }} order={{ xs: 1, md: 1 }}>
              <Stack spacing={4}>
                {/* Imagen Principal del Curso (Simil al diseño) */}
                {course && (
                  <Box
                    sx={{
                      maxWidth: "900px",
                      margin: "0 auto",
                      padding: "20px",
                    }}
                  >
                    <VideoPlayer
                      src={
                        course?.video_url &&
                        typeof course.video_url === "string"
                          ? course.video_url.trim()
                          : ""
                      }
                      poster={course.cover_image_url}
                    />
                  </Box>
                )}

                {/* Navegación (Tabs/Pestañas) - Usamos solo botones por simplicidad visual */}
                <Stack direction='row' spacing={1}>
                  {["Descripción", "Reseñas"].map((tab, index) => (
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
                <Box>
                  <Typography
                    variant='body1'
                    color='text.secondary'
                    sx={{ mb: 3 }}
                    component='div' // ✅ permite usar div semántico y HTML dentro
                    dangerouslySetInnerHTML={{ __html: course.description }}
                  />
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <PinkSpinner label='Cargando información del curso' />
      )}
    </Layout>
  );
};

export default CourseDetailScreen;
