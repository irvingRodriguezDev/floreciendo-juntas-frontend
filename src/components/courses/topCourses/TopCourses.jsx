import { useContext, useEffect } from "react";
import "./TopCourses.css";
import { Box, Grid, Typography, useTheme } from "@mui/material";
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
      linear-gradient(180deg, #fff 0%, #FFDFEF 100%),
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
        </Typography>
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
                <Grid container spacing={2}>
                  <Grid size={4} sx={{ backgroundColor: "transparent" }}>
                    <Box
                      className='nf-number'
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: { xs: -90, sm: -70, md: -60, lg: -50, xl: -90 },
                        background: "transparent",
                        color: "transparent",
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight: "bold",
                        fontSize: {
                          xs: "190px",
                          sm: "160px",
                          md: "170px",
                          lg: "185px",
                          xl: "200px",
                        },
                        zIndex: 2,
                        transition: "transform 0.3s",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                      }}
                    >
                      {index + 1}
                    </Box>
                  </Grid>
                  <Grid
                    size={8}
                    sx={{
                      zIndex: 2,
                      borderRadius: "16px",
                      display: "flex",
                      justifyContent: "center",
                      justifyItems: "center",
                    }}
                  >
                    <img
                      src={course.cover_image_url}
                      alt={course.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "16px",
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
                </Grid>
              </Box>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TopCourses;
