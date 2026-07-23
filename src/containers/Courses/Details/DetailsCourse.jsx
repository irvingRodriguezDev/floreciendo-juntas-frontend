import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import Layout from "../../../components/Layout/Layout";
import CoursesContext from "../../../context/Courses/CoursesContext";
import { useParams, Link } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";
import PinkSpinner from "../../../components/Loading/PinkSpinner";
import AuthContext from "../../../context/Auth/AuthContext";
import VideoBlocker from "../VideoBlocker/VideoBlocker";
import CustomTabs from "../../../components/Custom/CustomTabs";
import Wall from "../../../components/Posts/Wall";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LessonsList from "./LessonsList";

const CourseDetailScreen = () => {
  const { id } = useParams(); // El slug o ID de la URL
  const courseId = Number(id);

  const { course, getCourseById } = useContext(CoursesContext);
  const { usuario, isAuthenticating, autenticado } = useContext(AuthContext);
  const [activeVideo, setActiveVideo] = useState(null);

  /* ==============================
     1. Petición y Reseteo Inmediato
  ============================== */
  useEffect(() => {
    if (courseId) {
      setActiveVideo(null); // Limpieza radical de estados anteriores
      getCourseById(courseId);
    }
  }, [courseId]);

  /* ==============================
     2. Inicialización estricta y sincronizada
  ============================== */
  useEffect(() => {
    if (course && course.id === courseId && course.videos?.length > 0) {
      setActiveVideo(course.videos[0]);
    }
  }, [course, courseId]);

  // 🚀 Homologación de estado de suscripción/rol
  const isSubscribed = Boolean(usuario?.isSubscribed || usuario?.roleId === 4);
  const isAuthorized = autenticado && isSubscribed;
  const userId = usuario?.id;

  const handleVideoSelect = (video) => {
    if (!video) return;
    setActiveVideo(video);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ==============================
     3. SRC Dinámico Blindado
  ============================= */
  const videoSrc = useMemo(() => {
    if (
      !activeVideo?.cloudfrontUrl ||
      typeof activeVideo.cloudfrontUrl !== "string"
    ) {
      return "";
    }
    return activeVideo.cloudfrontUrl.trim();
  }, [activeVideo?.cloudfrontUrl]);

  /* ==============================
     4. Guarda de Validación de Carga
  ============================== */
  const isDataReady = course && course.id === courseId;

  if (isAuthenticating || !isDataReady) {
    return (
      <PinkSpinner
        label={
          isAuthenticating
            ? "Verificando tu acceso..."
            : "Sincronizando contenidos de la clase..."
        }
      />
    );
  }

  /* ==============================
     Tabs Data
  ============================== */
  const tabsData = [
    {
      label: "Preguntas y comentarios",
      content: (
        <Box sx={{ position: "relative", zIndex: 1, mt: 2 }}>
          {isAuthorized ? (
            <Wall
              courseId={Number(course.id)}
              isAuthenticating={autenticado}
              isSubscribed={isSubscribed}
            />
          ) : (
            <Box
              textAlign='center'
              sx={{
                py: 5,
                px: 3,
                backgroundColor: "#FFF5F7",
                borderRadius: "20px",
                border: "1px solid #FCE7F3",
                mt: 2,
              }}
            >
              <Typography
                fontSize='1.2rem'
                color='#1F2937'
                fontWeight='800'
                sx={{ mb: 1 }}
              >
                Únete a la conversación 💬
              </Typography>
              <Typography
                sx={{
                  color: "#6B7280",
                  fontSize: "0.95rem",
                  mb: 3,
                  maxWidth: 500,
                  mx: "auto",
                }}
              >
                Suscríbete a la membresía para hacer preguntas directas sobre
                esta clase, compartir tus trabajos y recibir feedback de las
                mentoras.
              </Typography>

              <Button
                component={Link}
                to='/suscribirme'
                variant='contained'
                endIcon={<ArrowForwardIcon />}
                sx={{
                  backgroundColor: "#E53888",
                  color: "#FFF",
                  fontWeight: 800,
                  borderRadius: "50px",
                  px: 4,
                  py: 1.2,
                  textTransform: "none",
                  boxShadow: "0 8px 20px rgba(229, 56, 136, 0.25)",
                  "&:hover": {
                    backgroundColor: "#C2256F",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Activar Membresía ($200/mes)
              </Button>
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
            backgroundColor: "#F9FAFB",
            borderRadius: "20px",
            border: "1px solid #F3F4F6",
            p: { xs: 2.5, md: 3 },
            mb: 4,
          }}
        >
          <Typography
            component='div'
            sx={{
              fontSize: { xs: "0.95rem", md: "1rem" },
              lineHeight: 1.8,
              color: "#4B5563",
              "& p": { mb: 2 },
              "& strong": {
                color: "#E53888",
                fontWeight: 700,
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
        spacing={3}
        sx={{
          maxWidth: "1600px",
          margin: "0 auto",
          padding: { xs: "16px", md: "24px" },
        }}
      >
        {isAuthorized ? (
          <>
            {/* COLUMNA PRINCIPAL */}
            <Grid size={{ xs: 12, md: 9 }}>
              <Box sx={{ width: "100%", mb: 3 }}>
                <VideoPlayer
                  src={videoSrc}
                  poster={course.cover_image_url}
                  courseId={Number(course.id)}
                  userId={userId}
                  usuario={usuario}
                  title={`${course.title} - ${activeVideo?.title || ""}`}
                  hasCertificate={course.hasCertificate}
                  disabled={!isSubscribed}
                  workbookUrl={course?.workbookUrl}
                />
              </Box>

              {/* 📱 ACORDEÓN PARA MÓVILES */}
              <Box sx={{ display: { xs: "block", md: "none" }, mb: 3 }}>
                <Accordion
                  disableGutters
                  elevation={0}
                  sx={{
                    borderRadius: "16px",
                    border: "1px solid #F3F4F6",
                    backgroundColor: "#FFF5F7",
                    "&:before": { display: "none" },
                    overflow: "hidden",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: "#E53888" }} />}
                  >
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        color: "#E53888",
                        fontSize: "0.95rem",
                      }}
                    >
                      📖 Ver Clases del Curso ({course.videos?.length || 0}{" "}
                      partes)
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: 1, backgroundColor: "#ffffff" }}>
                    <LessonsList
                      videos={course.videos}
                      activeVideoId={activeVideo?.id}
                      onSelectVideo={handleVideoSelect}
                    />
                  </AccordionDetails>
                </Accordion>
              </Box>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: "24px",
                    border: "1px solid #F3F4F6",
                    p: { xs: 2, md: 3 },
                    backgroundColor: "#ffffff",
                  }}
                >
                  <CustomTabs tabs={tabsData} />
                </Paper>
              </motion.div>
            </Grid>

            {/* 💻 SIDEBAR DESKTOP EDITORIAL */}
            <Grid
              size={{ xs: 12, md: 3 }}
              sx={{ display: { xs: "none", md: "block" } }}
            >
              <Paper
                elevation={0}
                sx={{
                  padding: "24px",
                  borderRadius: "24px",
                  border: "1px solid #F3F4F6",
                  position: "sticky",
                  top: "24px",
                  maxHeight: "calc(100vh - 48px)",
                  overflowY: "auto",
                  backgroundColor: "#ffffff",
                  "&::-webkit-scrollbar": { width: "6px" },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: "transparent",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#FCE7F3",
                    borderRadius: "10px",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    backgroundColor: "#F472B6",
                  },
                  scrollbarWidth: "thin",
                  scrollbarColor: "#FCE7F3 transparent",
                }}
              >
                <Typography
                  variant='subtitle1'
                  sx={{
                    fontWeight: "800",
                    mb: 2,
                    color: "#1F2937",
                    letterSpacing: "-0.3px",
                  }}
                >
                  Contenido del Curso
                </Typography>

                <LessonsList
                  videos={course.videos}
                  activeVideoId={activeVideo?.id}
                  onSelectVideo={handleVideoSelect}
                />
              </Paper>
            </Grid>
          </>
        ) : (
          /* 🚀 BLOQUEO DE VIDEO */
          <Grid size={{ xs: 12 }}>
            <VideoBlocker userId={userId ?? null} title={course.title} />
          </Grid>
        )}
      </Grid>
    </Layout>
  );
};

export default CourseDetailScreen;
