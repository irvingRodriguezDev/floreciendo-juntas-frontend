import { useContext, useEffect } from "react";
import "./TopCourses.css";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";

import CoursesContext from "../../../context/Courses/CoursesContext";
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
          linear-gradient(181deg, rgba(255, 223, 239, 1) 0%, rgba(255, 255, 255, 1) 100%),
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
        style={{ textAlign: "center", marginBottom: "50px" }}
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
              fontSize: { xs: "14px", md: "16px" },
            }}
          >
            Los favoritos de nuestra comunidad
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
            </Box>
          </Typography>
        </motion.div>
      </motion.div>

      {/* GRID DE CURSOS */}
      <Grid
        container
        spacing={2}
        sx={{
          padding: { xs: "0px", md: "20px" },
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

      {/* 🚀 BOTÓN CTA PARA EXPLORAR TODO EL CATÁLOGO */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Box sx={{ textAlign: "center", mt: { xs: 4, md: 6 } }}>
          <Button
            component={Link}
            to='/cursos'
            variant='outlined'
            endIcon={<ArrowForwardIcon />}
            sx={{
              color: "#E53888",
              borderColor: "#E53888",
              borderWidth: "2px",
              fontWeight: 700,
              fontSize: { xs: "0.9rem", md: "1rem" },
              padding: "10px 28px",
              borderRadius: "50px",
              textTransform: "none",
              transition: "all 0.3s ease",
              "&:hover": {
                borderWidth: "2px",
                borderColor: "#C2256F",
                backgroundColor: "#E53888",
                color: "#FFFFFF",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 20px rgba(229, 56, 136, 0.25)",
              },
            }}
          >
            Ver todos los cursos
          </Button>
        </Box>
      </motion.div>
    </Box>
  );
};

export default TopCourses;
