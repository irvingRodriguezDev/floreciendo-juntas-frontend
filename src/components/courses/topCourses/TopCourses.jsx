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
        background: `
      linear-gradient(180deg, #fff 0%, #FFF6F8 100%),
      radial-gradient(circle at top left, rgba(255,200,220,0.25), transparent 60%)
    `,
        borderRadius: "24px",
      }}
    >
      {/* Encabezado */}
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
            fontSize: { xs: "15px", md: "18px" },
          }}
        >
          Lo más visto en nuestra academia
        </Typography>

        <Typography
          variant='h2'
          sx={{
            fontWeight: 800,
            lineHeight: 1.1,
            fontSize: { xs: "2.6rem", sm: "3.3rem", md: "4.2rem" },
            maxWidth: "900px",
            margin: "0 auto",
            position: "relative",
          }}
        >
          Nuestros{" "}
          <Box
            component={motion.span}
            initial={{ "--w": "0%" }}
            whileInView={{ "--w": "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            sx={{
              position: "relative",
              display: "inline-block",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: 4,
                left: 0,
                width: "var(--w)",
                height: "10px",
                background: "#e36f9e",
                opacity: 0.7,
                borderRadius: "6px",
                transition: "width 0.6s ease",
                zIndex: -1,
              },
            }}
          >
            Cursos Top
          </Box>{" "}
          10
        </Typography>
      </motion.div>

      {/* Grid */}
      <Grid
        container
        spacing={{ xs: 3, sm: 4, md: 5 }}
        justifyContent='center'
        sx={{ maxWidth: "1500px", margin: "0 auto" }}
      >
        {topCourses.map((course, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }} key={index}>
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              style={{ height: "100%" }}
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
                    borderRadius: "26px",
                    overflow: "hidden",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                    transition: "all 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
                    backgroundColor: "#fff",
                    "&:hover": {
                      transform: "translateY(-6px) scale(1.02)",
                      boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
                    },
                  }}
                >
                  {/* Imagen */}
                  <Box
                    sx={{
                      width: "100%",
                      aspectRatio: "16/9",
                      position: "relative",
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
                        objectFit: "cover",
                      }}
                    />

                    {/* Medalla */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 10,
                        left: 10,
                        background: "linear-gradient(135deg, #e36f9e, #f399c7)",
                        color: "white",
                        fontSize: "0.95rem",
                        fontWeight: 700,
                        px: 2,
                        py: 0.6,
                        borderRadius: "50px",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
                      }}
                    >
                      #{index + 1}
                    </Box>
                  </Box>

                  <CardContent
                    sx={{
                      textAlign: "center",
                      py: 3,
                      px: 2,
                    }}
                  >
                    <Typography
                      variant='h6'
                      sx={{
                        fontWeight: 600,
                        fontSize: { xs: "1.1rem", md: "1.25rem" },
                        color: theme.palette.text.primary,
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
