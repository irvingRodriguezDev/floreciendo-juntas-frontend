import React from "react";
import Layout from "../../components/Layout/Layout";
import { Box, Grid, Stack, Typography, Container } from "@mui/material";
import { motion } from "framer-motion";

// ASSETS
import underline from "../../assets/svg/underline.svg";
import floralPath from "../../assets/svg/floral-path.svg";

// --- VARIANTS DE FRAMER MOTION ---
const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Secrets = () => {
  const secretos = [
    {
      num: 1,
      title: "Técnicas Básicas",
      description:
        "La excelencia comienza con la maestría en la preparación de la uña y el limado. Son los cimientos de todo arte.",
    },
    {
      num: 2,
      title: "Inversión en Calidad",
      description:
        "Herramientas e insumos premium garantizan un acabado superior, durabilidad y elevan la percepción de valor de tu servicio.",
    },
    {
      num: 3,
      title: "Higiene Impecable",
      description:
        "La esterilización y la sanidad son innegociables. Transmiten profesionalismo y generan total confianza en la clienta.",
    },
    {
      num: 4,
      title: "Comunicación Efectiva",
      description:
        "Aprender a escuchar y a traducir los deseos de tu clienta en arte es la clave para la satisfacción y las recomendaciones.",
    },
    {
      num: 5,
      title: "Esmaltado Perfecto",
      description:
        "Dominar la aplicación fina, uniforme y el curado preciso previene levantamientos y asegura un brillo duradero.",
    },
    {
      num: 6,
      title: "Creatividad Actualizada",
      description:
        "Mantente siempre al día con las tendencias de nail art, colores y técnicas emergentes para ofrecer servicios innovadores.",
    },
    {
      num: 7,
      title: "Gestión de Tiempo",
      description:
        "La eficiencia en la duración de la cita es vital para la rentabilidad sin comprometer la calidad. Sé rápida y precisa.",
    },
    {
      num: 8,
      title: "Fidelidad del Cliente",
      description:
        "Ofrece una experiencia completa y personalizada; la relación es tan importante como el resultado final en la uña.",
    },
    {
      num: 9,
      title: "Educación Continua",
      description:
        "Nunca dejes de capacitarte. La inversión en conocimiento es lo que te diferencia de la competencia.",
    },
    {
      num: 10,
      title: "Bienestar Personal",
      description:
        "Cuida tu postura y salud. Un profesional saludable es un profesional que puede dedicarse a su carrera a largo plazo.",
    },
  ];

  return (
    <Layout>
      {/* HEADER */}
      <Container
        maxWidth='lg'
        sx={{ mt: { xs: 8, md: 12 }, mb: { xs: 4, md: 6 } }}
      >
        <Stack alignItems='center' sx={{ mb: 2 }}>
          <Typography
            variant='overline'
            component={motion.p}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            sx={{
              color: "#d63384", // Rosa Fuerte
              fontWeight: 600,
              fontSize: "1.1rem",
              letterSpacing: 3,
            }}
          >
            LA FÓRMULA DEL ÉXITO
          </Typography>

          <Typography
            variant='h3'
            component={motion.h1}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            sx={{
              fontWeight: 900,
              textAlign: "center",
              color: "#a30b5d", // Tono más oscuro para el impacto
              lineHeight: 1.2,
              fontSize: { xs: "2.4rem", sm: "3.2rem", md: "3.8rem" },
              position: "relative",
            }}
          >
            Descubre los 10 Secretos{" "}
            <Box
              component='span'
              sx={{
                display: "inline-block",
                position: "relative",
                px: 1,
              }}
            >
              Manicurista Exitosa
              <Box
                component='span'
                sx={{
                  position: "absolute",
                  left: 0,
                  bottom: -8,
                  width: "100%",
                  height: "14px",
                  backgroundImage: `url(${underline})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                }}
              />
            </Box>
          </Typography>
        </Stack>
      </Container>

      {/* SECTION - ESTRUCTURA CUADRADA Y NEUMORFISMO SUAVE */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          padding: { xs: "30px 0", md: "80px 0" },
          // Fondo femenino muy suave (Blanco a Rosa Pastel muy claro)
          background: "linear-gradient(to bottom, #fefefe 0%, #fff0f5 100%)",
          overflow: "hidden",
        }}
      >
        {/* 🪷 CAMINO FLORAL - Animación discreta en el fondo */}
        <Box
          // Usa la sintaxis responsiva de MUI aquí para controlar el display
          sx={{
            display: { xs: "none", md: "block" }, // Oculto en 'xs' (móviles), visible a partir de 'md'
            position: "absolute", // Necesario para que la imagen dentro pueda posicionarse correctamente
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none", // Asegura que no interfiera con los clics
            zIndex: 1,
          }}
        >
          <motion.img
            src={floralPath}
            alt='floral path'
            style={{
              // Mantenemos solo las propiedades de estilo que controlan el aspecto y la animación
              position: "absolute",
              marginTop: 140,
              left: "42%",
              transform: "translateX(-50%)",
              width: "300px",
              height: "75%",
              opacity: 0.9, // Ajustado a 0.15 como en la versión anterior (más sutil)
            }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </Box>
        {/* LISTADO: ESTRUCTURA CUADRADA 2x5 RESPONSIVA */}
        <Container maxWidth='lg' sx={{ position: "relative", zIndex: 2 }}>
          <Grid container spacing={{ xs: 4, md: 5 }} justifyContent='center'>
            {secretos.map((item) => (
              <Grid
                key={item.num}
                size={{ xs: 12, md: 6 }}
                // xs={12} md={6} si prefieres que se rompa en 600px
              >
                {/* 💎 TARJETA (SOFT NEUMORPHISM / GLASSMOPHISM) */}
                <motion.div
                  variants={cardVariants}
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true, amount: 0.3 }}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    height: "100%", // Asegura que la tarjeta se estire
                    // Estilo base de la tarjeta
                    background: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "18px",
                    padding: "20px",
                    border: "1px solid rgba(255, 255, 255, 0.9)",
                    // Sombra femenina y sutil (neumorfismo suave)
                    boxShadow:
                      "5px 5px 15px rgba(220, 160, 180, 0.4), -5px -5px 15px rgba(255, 255, 255, 0.8)",
                  }}
                >
                  {/* 🔢 NÚMERO GRANDE Y FIJO */}
                  <Box
                    sx={{
                      flexShrink: 0, // No permitir que se encoja
                      width: { xs: 50, sm: 60 },
                      height: { xs: 50, sm: 60 },
                      borderRadius: "12px",
                      mr: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 900,
                      fontSize: { xs: "1.8rem", sm: "2.2rem" },
                      color: "#fff",
                      // Fondo del número: degradado rosa fuerte
                      background:
                        "linear-gradient(45deg, #d63384 30%, #ff69b4 90%)",
                      boxShadow: "0 5px 15px rgba(214,51,132,0.4)",
                      transform: "rotate(-5deg)", // Pequeño toque de estilo
                    }}
                  >
                    {item.num}
                  </Box>

                  {/* 📝 CONTENIDO */}
                  <Box sx={{ flexGrow: 1, pt: 0.5 }}>
                    <Typography
                      variant='h6'
                      sx={{
                        fontWeight: 800,
                        color: "#a30b5d",
                        mb: 0.5,
                        lineHeight: 1.2,
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "1rem",
                        fontWeight: 500,
                        color: "#444",
                        lineHeight: 1.4,
                      }}
                    >
                      {item.description}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
};

export default Secrets;
