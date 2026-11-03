import { useContext, useEffect } from "react";
import { Box, Button, Grid, Typography, Stack, alpha } from "@mui/material";
import { motion } from "framer-motion";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { Link } from "react-router-dom";

import CoursesContext from "../../../context/Courses/CoursesContext";
import TopCourseCard from "./TopCourseCard";
import AuthContext from "../../../context/Auth/AuthContext";

const TopCourses = () => {
  const { usuario, autenticado } = useContext(AuthContext);
  const { getTopTenCourses, topCourses } = useContext(CoursesContext);

  useEffect(() => {
    if (usuario && autenticado) {
      getTopTenCourses(usuario, autenticado);
    } else {
      getTopTenCourses(null, false);
    }
  }, [usuario, autenticado]);

  return (
    <Box
      sx={{
        background: `
          linear-gradient(180deg, #FFFFFF 0%, #FFF0F5 100%),
          radial-gradient(circle at top left, rgba(232,62,140,0.06), transparent 70%)
        `,
        position: "relative",
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 4 },
        overflow: "hidden",
        borderRadius: "32px",
        border: "1px solid",
        borderColor: alpha("#E53888", 0.08),
        boxShadow: "0 20px 40px rgba(232, 62, 140, 0.04)",
      }}
    >
      {/* 🌸 ENCABEZADO MODERNO Y ELEGANTE */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        sx={{
          textAlign: "center",
          mb: { xs: 4, md: 6 },
          px: 2,
        }}
      >
        {/* Badge superior minimalista */}
        <Stack
          direction='row'
          spacing={1}
          alignItems='center'
          justifyContent='center'
          sx={{ mb: 1.5 }}
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              backgroundColor: alpha("#E53888", 0.1),
              color: "#E53888",
              px: 2,
              py: 0.6,
              borderRadius: "50px",
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            <TrendingUpIcon sx={{ fontSize: "1rem" }} />
            <span>Los favoritos de nuestra comunidad</span>
          </Box>
        </Stack>

        {/* Título Principal Limpio y Potente */}
        <Typography
          variant='h2'
          sx={{
            color: "#2B1B24",
            fontWeight: 900,
            fontSize: {
              xs: "2rem",
              sm: "2.8rem",
              md: "3.5rem",
            },
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            lineHeight: 1.1,
            mb: 1.5,
          }}
        >
          Cursos en{" "}
          <Box
            component='span'
            sx={{
              color: "#E53888",
              position: "relative",
            }}
          >
            Tendencia
          </Box>
        </Typography>

        {/* Línea decorativa sutil */}
        <Box
          sx={{
            width: "60px",
            height: "4px",
            backgroundColor: "#E53888",
            margin: "0 auto",
            borderRadius: "2px",
            opacity: 0.8,
          }}
        />
      </Box>

      {/* ————— CONTENIDO / GRID DE CURSOS ————— */}
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Grid
          container
          spacing={3}
          sx={{
            padding: { xs: "0px", md: "10px" },
          }}
        >
          {topCourses &&
            topCourses.map((course, index) => {
              return (
                <TopCourseCard
                  key={course.id || index}
                  course={course}
                  index={index}
                />
              );
            })}
        </Grid>

        {/* 🚀 BOTÓN CTA PARA EXPLORAR TODO EL CATÁLOGO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Box sx={{ textAlign: "center", mt: { xs: 5, md: 7 } }}>
            <Button
              component={Link}
              to='/cursos'
              variant='contained'
              endIcon={<ArrowForwardIcon />}
              sx={{
                backgroundColor: "#E53888",
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: { xs: "0.95rem", md: "1.05rem" },
                padding: "12px 36px",
                borderRadius: "50px",
                textTransform: "none",
                boxShadow: "0 8px 25px rgba(229, 56, 136, 0.35)",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#C2256F",
                  transform: "translateY(-2px)",
                  boxShadow: "0 12px 30px rgba(229, 56, 136, 0.45)",
                },
              }}
            >
              Explorar todo el catálogo
            </Button>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
};

export default TopCourses;
