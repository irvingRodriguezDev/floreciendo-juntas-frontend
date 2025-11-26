import React, { useContext, useEffect } from "react";
import "./TopCourses.css"; // aquí guardaremos los estilos extra
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CoursesContext from "../../../context/Courses/CoursesContext";
import AuthContext from "../../../context/Auth/AuthContext";
const courses = [
  {
    id: 1,
    title: "French Lover",
    img: "https://images.pexels.com/photos/7470497/pexels-photo-7470497.jpeg",
  },
  {
    id: 2,
    title: "Las Guerreras Kpop",
    img: "https://images.pexels.com/photos/7470497/pexels-photo-7470497.jpeg",
  },
  {
    id: 3,
    title: "Rut y Booz",
    img: "https://images.pexels.com/photos/7470497/pexels-photo-7470497.jpeg",
  },
  {
    id: 4,
    title: "La Llorona",
    img: "https://images.pexels.com/photos/7470497/pexels-photo-7470497.jpeg",
  },
  {
    id: 5,
    title: "Sonic 3",
    img: "https://images.pexels.com/photos/7470497/pexels-photo-7470497.jpeg",
  },
  {
    id: 6,
    title: "Titanes del Pacífico",
    img: "https://images.pexels.com/photos/7470497/pexels-photo-7470497.jpeg",
  },
  {
    id: 7,
    title: "Titanes del Pacífico",
    img: "https://images.pexels.com/photos/7470497/pexels-photo-7470497.jpeg",
  },
  {
    id: 8,
    title: "Titanes del Pacífico",
    img: "https://images.pexels.com/photos/7470497/pexels-photo-7470497.jpeg",
  },
];

const TopCourses = () => {
  const { getTopTenCourses, topCourses } = useContext(CoursesContext);
  const { usuario } = useContext(AuthContext);
  const theme = useTheme();
  useEffect(() => {
    getTopTenCourses();
  }, []);
  console.log(topCourses);

  return (
    <Box
      container
      spacing={2}
      sx={{
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 4 },
        background: `
      linear-gradient(180deg, #fff 0%, #FFF6F8 100%),
      radial-gradient(circle at top left, rgba(255,200,220,0.25), transparent 60%)
    `,
        justifyContent: "center",
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
          10
        </Typography>
      </motion.div>
      <div className='top-movies-container'>
        <div className='movies-list'>
          {topCourses.map((course, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
              <Box key={index} className='movie-card'>
                <span className='movie-rank'>{index + 1}</span>
                <img
                  src={course.cover_image_url}
                  alt={course.title}
                  className='movie-img'
                />
                <p className='movie-title'>{course.title}</p>
              </Box>
            </Grid>
          ))}
        </div>
      </div>
    </Box>
  );
};

export default TopCourses;
