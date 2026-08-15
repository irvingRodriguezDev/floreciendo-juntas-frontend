import { useContext, useEffect } from "react";
// import "./TopCourses.css"; // Podrías eliminar este import si ya no usas CSS externo
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
        py: { xs: 6, md: 10 }, // Aumenté el padding vertical para dar aire al texto de fondo
        px: { xs: 2, md: 4 },
        background: `
          linear-gradient(181deg, rgba(255, 223, 239, 1) 0%, rgba(255, 255, 255, 1) 100%),
          radial-gradient(circle at top left, rgba(255,200,220,0.25), transparent 60%)
        `,
        borderRadius: "24px",
        position: "relative", // Necesario para que el texto de fondo se posicione relativo a este contenedor
        overflow: "hidden", // Importante para que el texto grande no cree scrollbars
      }}
    >
      {/* 💧 TEXTO DE FONDO (MARCA DE AGUA) */}
      <Typography
        variant='h1'
        sx={{
          position: "absolute",
          top: { xs: "30px", sm: "15px", md: "40px" }, // Ajusta la posición vertical
          left: "50%",
          transform: "translateX(-50%)", // Centra horizontalmente
          fontWeight: "bold",
          // Color rosa muy pálido y sutil, similar al ejemplo
          color: "rgba(229, 56, 136, 0.099)",
          fontSize: { xs: "3.2rem", sm: "6rem", md: "8rem", lg: "10rem" },
          lineHeight: 1,
          whiteSpace: "nowrap", // Evita que el texto se parta en varias líneas
          zIndex: 0, // Por detrás de todo el contenido
          pointerEvents: "none", // Para que no interfiera con clics en otros elementos
          textTransform: "uppercase",
          letterSpacing: "-5px", // Letras más juntas para estilo moderno
        }}
      >
        Tendencias
      </Typography>

      {/* CONTENEDOR PRINCIPAL (Con zIndex para estar sobre el fondo) */}
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          {/* KICKER / OVERLINE (Sobre la marca de agua) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant='overline'
              sx={{
                color: "#E53888", // Usamos el color principal para que resalte
                letterSpacing: "4px", // Más espaciado para estilo moderno
                fontWeight: 700,
                textTransform: "uppercase",
                mb: 1.5,
                display: "block", // Asegura que el margen funcione
                fontSize: { xs: "12px", sm: "18px", md: "25px" },
                // Sutil sombra blanca para asegurar legibilidad sobre el texto de fondo
                textShadow: "0 2px 4px rgba(255,255,255,0.8)",
              }}
            >
              Los favoritos de nuestra comunidad
            </Typography>
          </motion.div>

          {/* TÍTULO PRINCIPAL (Opcional, si quieres mantenerlo) */}
          {/* Si quieres el efecto *exacto* de tu imagen donde solo hay números/datos sobre el texto grande, 
              podrías comentar o eliminar este bloque de Typography h3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Typography
              variant='h3'
              sx={{
                fontWeight: 800,
                lineHeight: 1.1,
                textAlign: "center",
                color: "#333", // Color más oscuro para el título real
                fontSize: { xs: "2.2rem", sm: "3rem", md: "4rem" },
                letterSpacing: "-1px",
              }}
            >
              {/* Cursos Destacados */}
            </Typography>
          </motion.div>
        </motion.div>

        {/* GRID DE CURSOS */}
        <Grid
          container
          spacing={3} // Aumenté un poco el espaciado
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
          <Box sx={{ textAlign: "center", mt: { xs: 6, md: 8 } }}>
            <Button
              component={Link}
              to='/cursos'
              variant='contained' // Cambiado a 'contained' para un CTA más fuerte
              endIcon={<ArrowForwardIcon />}
              sx={{
                backgroundColor: "#E53888",
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: { xs: "0.95rem", md: "1.05rem" },
                padding: "12px 32px",
                borderRadius: "50px",
                textTransform: "none",
                boxShadow: "0 4px 14px rgba(229, 56, 136, 0.3)",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#C2256F",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 22px rgba(229, 56, 136, 0.4)",
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
