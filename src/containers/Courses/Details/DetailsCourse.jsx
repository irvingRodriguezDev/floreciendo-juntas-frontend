import React, { useContext, useEffect, useMemo } from "react";
import { Box, Typography, Grid, Stack, Paper, Divider } from "@mui/material";
import { motion } from "framer-motion";
import Layout from "../../../components/Layout/Layout";
import CoursesContext from "../../../context/Courses/CoursesContext";
import { useParams } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";
import PinkSpinner from "../../../components/Loading/PinkSpinner";
import AuthContext from "../../../context/Auth/AuthContext";
import VideoBlocker from "../VideoBlocker/VideoBlocker";
import CustomTabs from "../../../components/Custom/CustomTabs";
import Wall from "../../../components/Posts/Wall";

const CourseDetailScreen = () => {
  const { id } = useParams();

  const { course, getCourseById } = useContext(CoursesContext);
  const { usuario, isAuthenticating, autenticado } = useContext(AuthContext);

  /* ==============================
     Fetch course (1 sola vez por id)
  ============================== */
  useEffect(() => {
    if (id) getCourseById(id);
  }, [id]);

  /* ==============================
     Auth & permisos
  ============================== */
  const isSubscribed = Boolean(usuario?.isSubscribed);
  const isAuthorized = autenticado && isSubscribed;
  const userId = usuario?.id;

  /* ==============================
     🚨 CLAVE: estabilizar SRC
     (evita recarga HLS)
  ============================== */
  const videoSrc = useMemo(() => {
    if (!course?.video_url || typeof course.video_url !== "string") {
      return "";
    }
    return course.video_url.trim();
  }, [course?.video_url]);

  /* ==============================
     Loading state
  ============================== */
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

  /* ==============================
     Tabs
  ============================== */
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
            sx={{
              fontSize: { xs: "0.95rem", md: "1.05rem" },
              lineHeight: 1.9,
              color: "#6B6B6B",
              "& p": { mb: 2 },
              "& strong": {
                color: "#E53888",
                fontWeight: 600,
              },
            }}
            dangerouslySetInnerHTML={{
              __html: course.description || "",
            }}
          />
        </Box>
      ),
    },
  ];

  return (
    <Layout>
      <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh" }}>
        <Grid
          container
          spacing={{ xs: 2, md: 4 }}
          sx={{
            maxWidth: 1280,
            mx: "auto",
            p: { xs: 2, md: 4 },
          }}
        >
          <Grid size={12}>
            <Stack spacing={{ xs: 3, md: 4 }}>
              {/* ==============================
                  VIDEO (NO SE DESMONTA)
              ============================== */}
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
                    p: { xs: 0, md: 2 },
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    <VideoPlayer
                      src={videoSrc}
                      poster={course.cover_image_url}
                      courseId={id}
                      userId={userId}
                      usuario={usuario}
                      title={course.title}
                      hasCertificate={course.hasCertificate}
                      disabled={!isSubscribed}
                      workbookUrl={course ? course.workbook_url : null}
                    />

                    {/* Overlay sin desmontar video */}
                    {!isSubscribed && (
                      <Box
                        sx={{
                          position: "absolute",
                          inset: 0,
                          zIndex: 10,
                        }}
                      >
                        <VideoBlocker userId={userId} title={course.title} />
                      </Box>
                    )}
                  </Box>
                </Paper>
              </motion.div>

              <Divider sx={{ borderColor: "rgba(0,0,0,0.1)" }} />

              {/* ==============================
                  TABS
              ============================== */}
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
                  }}
                >
                  <CustomTabs tabs={tabsData} />
                </Paper>
              </motion.div>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default CourseDetailScreen;
