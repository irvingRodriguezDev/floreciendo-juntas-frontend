import React, { useContext, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  useTheme,
  Card,
  CardMedia,
  CardContent,
  Stack,
  CardActions,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CoursesContext from "../../../context/Courses/CoursesContext";
import AuthContext from "../../../context/Auth/AuthContext";
import "./TopCourses.css";
import { getImageUrl } from "../../../utils/Image";

const TopCourses = () => {
  const { getTopTenCourses, topCourses } = useContext(CoursesContext);
  const { usuario } = useContext(AuthContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    getTopTenCourses();
  }, []);
  const getOptimalWidth = () => {
    if (isMobile) return 300; // Móviles (300px)
    if (isTablet) return 400; // Tablets (400px)
    return 350; // Desktop (350px)
  };
  // 📌 El ancho de la imagen que se solicitará a CloudFront
  const optimalWidth = getOptimalWidth();
  // 📌 Calidad de la imagen (ajustable)
  const imageQuality = 85;
  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 4 },
        background: "linear-gradient(180deg, #fff 0%, #FFF6F8 100%)",
        borderRadius: "20px",
      }}
    >
      {/* --- Encabezado --- */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: "center", marginBottom: "70px" }}
      >
        <Typography
          variant='overline'
          sx={{
            color: theme.palette.text.secondary,
            letterSpacing: "3px",
            fontWeight: 600,
            textTransform: "uppercase",
            mb: 1,
            fontSize: { xs: "16px", md: "20px" },
          }}
        >
          Lo más visto en nuestra academia
        </Typography>

        <Typography
          variant='h2'
          component='h2'
          sx={{
            fontWeight: 800,
            lineHeight: 1.1,
            fontSize: { xs: "2.8rem", sm: "3.5rem", md: "5rem", lg: "6rem" },
            color: theme.palette.text.primary,
          }}
        >
          Nuestros{" "}
          <Box
            component='span'
            sx={{
              position: "relative",
              display: "inline-block",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: 4,
                left: 0,
                width: "100%",
                height: "10px",
                background: "#e36f9e",
                opacity: 0.7,
                borderRadius: "6px",
                transform: "scaleX(0)",
                transformOrigin: "left",
                transition: "transform 0.4s ease",
              },
              "&:hover::after": {
                transform: "scaleX(1)",
              },
            }}
          >
            Cursos Top
          </Box>{" "}
          10
        </Typography>
      </motion.div>

      {/* --- Grid de cursos --- */}
      <Grid
        container
        spacing={{ xs: 3, sm: 4, md: 5 }}
        justifyContent='center'
        sx={{ maxWidth: "1500px", margin: "0 auto" }}
      >
        {topCourses.map((course, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Link
                to={`/detalle-curso/${course.courseId}`}
                style={{ textDecoration: "none" }}
              >
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    borderRadius: "24px",
                    overflow: "hidden",
                    boxShadow:
                      "0 4px 12px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(0, 0, 0, 0.05)",
                    transition: "transform 0.4s ease, box-shadow 0.4s ease",
                    backgroundColor: "#fff",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow:
                        "0 8px 24px rgba(0, 0, 0, 0.12), 0 12px 36px rgba(0, 0, 0, 0.08)",
                    },
                  }}
                >
                  {/* Contenedor de imagen con aspect-ratio */}
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "16/9",
                    }}
                  >
                    <CardMedia
                      component='img'
                      image={getImageUrl(
                        course.cover_image_url,
                        optimalWidth,
                        imageQuality
                      )}
                      alt={course.title}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover", // mantiene proporción y rellena sin distorsión
                      }}
                    />

                    {/* Insignia de ranking */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        background: "rgba(227,111,158,0.95)",
                        color: "white",
                        fontSize: "1rem",
                        fontWeight: 700,
                        px: 2,
                        py: 0.5,
                        borderRadius: "12px",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
                      }}
                    >
                      #{index + 1}
                    </Box>
                  </Box>

                  {/* Título debajo de la imagen */}
                  <CardContent
                    sx={{
                      textAlign: "center",
                      py: 3,
                      px: 2,
                      mt: "auto",
                    }}
                  >
                    <Typography
                      variant='h6'
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.text.primary,
                        fontSize: { xs: "1.15rem", md: "1.25rem" },
                        transition: "color 0.3s ease",
                        "&:hover": { color: "#e36f9e" },
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
