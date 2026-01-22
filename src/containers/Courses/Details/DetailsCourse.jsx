import React, { useContext, useEffect } from "react";
import { Box, Typography, Grid, Stack, Paper, Divider } from "@mui/material";
import { motion } from "framer-motion";
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
  const { usuario, isAuthenticating, autenticado } = useContext(AuthContext);

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
  const isAuthorized = autenticado && isSubscribed;
  const tabsData = [
    {
      label: "Preguntas y comentarios",
      content: (
        <Box sx={{ position: "relative", zIndex: 1, mt: 2 }}>
          {isAuthorized ? (
            <Wall
              courseId={id}
              isAuthenticating={autenticado}
              isSubscribed={isSubscribed}
            />
          ) : (
            <Box textAlign='center' sx={{ mt: 3 }}>
              <Typography fontSize='20px' color='#EC4899' fontWeight='bold'>
                Acceso restringido
              </Typography>

              <Typography sx={{ mt: 1, color: "#555" }}>
                {!autenticado
                  ? "Debes iniciar sesión para acceder a los comentarios."
                  : "Necesitas una suscripción activa para acceder a los comentarios."}
              </Typography>
            </Box>
          )}
        </Box>
      ),
    },
    {
      label: "Descripción del curso",
      content: (
        <Box
          sx={{
            backgroundColor: "#FFF7FA",
            borderRadius: "18px",
            p: { xs: 2.5, md: 3 },
            mb: 4,
          }}
        >
          <Typography
            component='div'
            textAlign={{ xs: "left", md: "justify" }}
            sx={{
              fontSize: { xs: "0.95rem", md: "1.05rem" },
              lineHeight: 1.9,
              color: "#6B6B6B",
              "& p": {
                mb: 2,
              },
              "& strong": {
                color: "#E53888",
                fontWeight: 600,
              },
            }}
            dangerouslySetInnerHTML={{
              __html: course ? course.description : "",
            }}
          />
        </Box>
      ),
    },
  ];

  return (
    <Layout>
      {course ? (
        <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh" }}>
          {/* <CourseTitle title={course.title} /> */}

          {/* Contenido principal */}
          <Grid
            container
            spacing={{ xs: 2, md: 4 }}
            sx={{
              maxWidth: 1280,
              margin: "0 auto",
              p: { xs: 2, md: 4 },
            }}
          >
            <Grid size={12}>
              <Stack spacing={{ xs: 3, md: 4 }}>
                {/* Video Section */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      borderRadius: 4,
                      overflow: "hidden",
                      backgroundColor: "#fff",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                      p: { xs: 0, md: 2 },
                    }}
                  >
                    {isSubscribed ? (
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
                        usuario={usuario}
                        title={course.title}
                        hasCertificate={course.hasCertificate}
                      />
                    ) : (
                      <VideoBlocker userId={userId} title={course.title} />
                    )}
                  </Paper>
                </motion.div>

                {/* Divider decorativo */}
                <Divider
                  sx={{
                    borderColor: "rgba(0,0,0,0.1)",
                    mt: { xs: 1, md: 3 },
                  }}
                />

                {/* Tabs Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Paper
                    elevation={2}
                    sx={{
                      borderRadius: 3,
                      p: { xs: 2, md: 4 },
                      backgroundColor: "#fff",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                    }}
                  >
                    <CustomTabs tabs={tabsData} />
                  </Paper>
                </motion.div>
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
