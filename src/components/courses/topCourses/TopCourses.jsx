import { useContext, useEffect } from "react";
import "./TopCourses.css";
import { Box, CardMedia, Grid, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import CoursesContext from "../../../context/Courses/CoursesContext";
import { Link } from "react-router-dom";

const TopCourses = () => {
  const { getTopTenCourses, topCourses } = useContext(CoursesContext);
  const theme = useTheme();

  useEffect(() => {
    getTopTenCourses();
  }, []);

  return (
    <Box
      sx={{
        py: { xs: 6, md: 8 },
        px: { xs: 2, md: 4 },
        background: `
linear-gradient(181deg,rgba(255, 223, 239, 1) 0%, rgba(255, 255, 255, 1) 100%);
      radial-gradient(circle at top left, rgba(255,200,220,0.25), transparent 60%)
    `,
        borderRadius: "24px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: "center", marginBottom: "70px" }}
      >
        {/* KICKER / OVERLINE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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
            {/* Los favoritos de nuestra comunidad */}
          </Typography>
        </motion.div>

        {/* TÍTULO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Typography
            variant='h3'
            sx={{
              fontWeight: 700,
              lineHeight: 1.2,
              textAlign: "center",
              color: "#E53888",
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
            }}
          >
            {""}
            <Box component='span' sx={{ position: "relative" }}>
              En Tendencia
              <Box
                component='span'
                sx={{
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  width: "100%",
                  height: "8px",
                  backgroundColor: "#FFF",
                  opacity: 0.7,
                  borderRadius: "4px",
                  zIndex: -1,
                }}
              />
            </Box>{" "}
          </Typography>
        </motion.div>
      </motion.div>

      <Grid
        container
        spacing={2}
        sx={{
          padding: "20px",
        }}
      >
        {topCourses.map((course, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 3 }} key={index}>
            <Link
              to={`/detalle-curso/${course.courseId}`}
              style={{ textDecoration: "none" }}
            >
              <Grid container spacing={2}>
                <Box
                  className='nf-card-container'
                  sx={{
                    position: "relative",
                    borderRadius: "12px",
                    overflow: "hidden",
                    // boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                    background: "transparent",
                  }}
                >
                  <Grid size={12} sx={{ backgroundColor: "transparent" }}>
                    <Box
                      className='nf-number'
                      sx={{
                        position: "absolute",
                        top: "15%",
                        background: "rgba(255, 255, 255, 0.23)",
                        backdropFilter: "blur(18.5px)",
                        color: "transparent",
                        width: { xs: "70px", md: "100px" },
                        height: { xs: "70px", md: "100px" },
                        left: "0%",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: { xs: "50px", sm: "60px", md: "70px" },
                        zIndex: 2,
                        transition: "transform 0.3s",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                      }}
                    >
                      {index + 1}
                    </Box>

                    <CardMedia
                      component='img'
                      image={course.cover_image_url}
                      alt={course.title}
                      sx={{
                        width: "100%",
                        aspectRatio: "1 / 1",
                        objectFit: "cover",
                        borderRadius: { xs: "16px", lg: "12px" },
                        backgroundColor: "#f5f5f5",
                        filter: "saturate(0.95)",
                      }}
                    />
                  </Grid>
                  <Grid
                    size={12}
                    sx={{
                      bg: "white",
                      textAlign: "center",
                      textTransform: "uppercase",
                      color: "#EA4F9B",
                      fontWeight: "bold",
                    }}
                  >
                    <Typography fontWeight='bold'>{course.title}</Typography>
                  </Grid>
                </Box>
              </Grid>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TopCourses;
