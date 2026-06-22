import { useContext, useEffect } from "react";
import "./TopCourses.css";
import { Box, CardMedia, Grid, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import CoursesContext from "../../../context/Courses/CoursesContext";
import { Link } from "react-router-dom";
import TopCourseCard from "./TopCourseCard";

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
        {topCourses &&
          topCourses.map((course, index) => (
            <TopCourseCard
              key={course.id || index}
              course={course}
              index={index}
            />
          ))}
      </Grid>
    </Box>
  );
};

export default TopCourses;
