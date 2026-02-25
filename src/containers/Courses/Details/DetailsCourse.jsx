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
      <Grid
        container
        spacing={2}
        sx={{ display: "flex", justifyContent: "center", padding: "30px" }}
      >
        <Grid size={{ xs: 12, sm: 12, md: 10, lg: 10 }}>
          {isAuthorized ? (
            <VideoPlayer
              src={videoSrc}
              poster={course.cover_image_url}
              courseId={id}
              userId={userId}
              usuario={usuario}
              title={course.title}
              hasCertificate={course.hasCertificate}
              disabled={!isSubscribed}
              workbookUrl={course?.workbookUrl}
            />
          ) : (
            <VideoBlocker userId={userId ?? null} title={course.title} />
          )}
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 10, lg: 10 }}>
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
        </Grid>
      </Grid>
    </Layout>
  );
};

export default CourseDetailScreen;
