import React, { useContext, useEffect } from "react";
import { Box, Typography, Grid, Button, Stack } from "@mui/material";
import Layout from "../../../components/Layout/Layout";
import CourseTitle from "./CouseTitle";
import CoursesContext from "../../../context/Courses/CoursesContext";
import { useParams } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";
import PinkSpinner from "../../../components/Loading/PinkSpinner";
import AuthContext from "../../../context/Auth/AuthContext";
import VideoBlocker from "../VideoBlocker/VideoBlocker";
import CustomTabs from "../../../components/Custom/CustomTabs";
import Wall from "../../../components/Posts/Wall";
const CourseDetailScreen = () => {
  const params = useParams();
  const { id } = params;
  const { course, getCourseById } = useContext(CoursesContext);
  const { usuario, isAuthenticating } = useContext(AuthContext);

  useEffect(() => {
    getCourseById(id);
  }, [id]);

  if (isAuthenticating || !course) {
    return (
      <PinkSpinner
        label={
          isAuthenticating
            ? "Verificando tu acceso..."
            : "Cargando información del curso"
        }
      />
    );
  }

  const isSubscribed = usuario && usuario.isSubscribed;
  const userId = usuario?.id;
  const tabsData = [
    {
      label: "Descripcion del curso",
      content: (
        <Box>
          <Typography
            variant='body1'
            color='text.secondary'
            sx={{ mb: 3 }}
            component='div'
            dangerouslySetInnerHTML={{
              __html: course ? course.description : "",
            }}
          />
        </Box>
      ),
    },
    {
      label: "Preguntas y respuestas del curso",
      content: <Wall />,
    },
  ];

  return (
    <Layout>
      {course ? (
        <Box sx={{ minHeight: "100vh" }}>
          {/* Banner Superior */}
          <CourseTitle title={course.title} />

          {/* Contenido Principal */}
          <Grid
            container
            spacing={{ xs: 2, md: 4 }} // Menos espacio en móviles
            sx={{
              maxWidth: 1440,
              margin: "0 auto",
              p: { xs: 2, md: 4 }, // Menos padding en móviles
            }}
          >
            {/* Columna Izquierda: Video y Contenido Principal (8/12 en desktop) */}
            <Grid size={{ xs: 12, md: 12 }} order={{ xs: 1, md: 1 }}>
              <Stack spacing={{ xs: 3, md: 4 }}>
                {/* Bloque del Video/Bloqueador */}
                <Box
                  sx={{
                    margin: "0 auto",
                    padding: { xs: 0, sm: "10px", md: "20px" }, // Padding condicional
                    width: "100%",
                  }}
                >
                  {isSubscribed ? (
                    // 1. Mostrar Video si está Suscrito
                    <VideoPlayer
                      src={
                        course?.video_url &&
                        typeof course.video_url === "string"
                          ? course.video_url.trim()
                          : ""
                      }
                      poster={course.cover_image_url}
                      courseId={id}
                      userId={userId}
                    />
                  ) : (
                    // 2. Mostrar Bloqueador y Formulario de Pago
                    <VideoBlocker userId={userId} title={course.title} />
                  )}
                </Box>

                {/* Descripción del Curso */}
                <CustomTabs tabs={tabsData} />
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
