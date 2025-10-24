import React, { useContext, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Stack,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import CoursesContext from "../../../context/Courses/CoursesContext";
import AuthContext from "../../../context/Auth/AuthContext";
import { Link } from "react-router-dom";
const TopCourses = () => {
  const { getTopTenCourses, topCourses } = useContext(CoursesContext);
  const { usuario } = useContext(AuthContext);
  useEffect(() => {
    getTopTenCourses();
  }, []);
  const theme = useTheme();

  const primaryPink = "#e91e63";
  const lightYellow = "#ffecb3";

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default || "#fffcf7",
        padding: theme.spacing(8, 4),
      }}
    >
      {/* --- Encabezado de la Sección (Estilo Floreciendo Juntas) --- */}
      <Stack alignItems='center' sx={{ mb: 6, zIndex: 1 }}>
        {/* Etiqueta Superior */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant='overline'
            sx={{
              color: theme.palette.text.secondary,
              fontWeight: 600,
              textTransform: "uppercase",
              mb: 1,
            }}
          >
            Lo Más Visto en Nuestra Academia
          </Typography>
        </motion.div>

        {/* Título Principal con Resaltado */}
        <Typography
          variant='h3'
          component='h2'
          sx={{
            fontWeight: 700,
            lineHeight: 1.2,
            textAlign: "center",
            fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
          }}
        >
          Nuestros{" "}
          <span
            style={{
              position: "relative",
              display: "inline-block",
              textDecoration: "none",
            }}
          >
            Cursos Top
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
          </span>{" "}
          10
        </Typography>
      </Stack>

      {/* --- Lista de Cursos --- */}
      <Grid
        container
        spacing={4}
        justifyContent='center'
        sx={{ maxWidth: "100%", margin: "0 auto" }}
      >
        {topCourses.map((course, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                style={{ textDecoration: "none" }}
                to={`/detalle-curso/${course.courseId}`}
              >
                <Card
                  sx={{
                    borderRadius: "16px",
                    boxShadow: theme.shadows[6], // Sombra más prominente
                    overflow: "hidden",
                    position: "relative",
                    "&:hover": {
                      transform: "scale(1.03)",
                      transition: "transform 0.3s",
                    },
                  }}
                >
                  {/* Clasificación (rank) - Integrada al diseño */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      backgroundColor: primaryPink,
                      color: "white",
                      padding: theme.spacing(0.5, 2),
                      borderBottomRightRadius: "16px",
                      zIndex: 2,
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      lineHeight: 1.2,
                    }}
                  >
                    #{index + 1}
                  </Box>

                  <CardMedia
                    component='img'
                    image={course.cover_image_url}
                    alt={course.title}
                    sx={{
                      width: "100%",
                      height: 350, // Altura fija
                      objectFit: "cover",
                    }}
                  />

                  <CardContent sx={{ p: 2 }}>
                    <Typography
                      variant='h6' // Usamos h6 para un título más adecuado
                      sx={{
                        color: theme.palette.text.primary,
                        fontWeight: 700,
                        textAlign: "center",
                      }}
                    >
                      {course.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TopCourses;
