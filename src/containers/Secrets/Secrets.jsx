import React, { use, useContext, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { Box, Grid, Stack, Typography, Container } from "@mui/material";
import { motion } from "framer-motion";

// ASSETS
import underline from "../../assets/svg/underline.svg";
import floralPath from "../../assets/svg/floral-path.svg";
import SecretsBanner from "../../components/Banner/SecretsBanner";
import { Link } from "react-router-dom";
import SystemContext from "../../context/System/SystemContext";
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
  const { systems, getAllSystems } = useContext(SystemContext);
  //   {
  //     num: 1,
  //     title: "Capacitación Constante",
  //     description:
  //       "La capacitación es la base de todo crecimiento profesional. En esta etapa  aprenderás por qué actualizarte no es una opción, sino una estrategia para mantenerte vigente, elevar la calidad de tu trabajo y diferenciarte en un mercado competitivo. La excelencia técnica abre puertas, aumenta tu valor y te permite cobrar mejor.",
  //     path: "/cursos/bysystem/1",
  //   },
  //   {
  //     num: 2,
  //     title: "Marca Personal",
  //     description:
  //       "Tu marca personal es lo que hace que te elijan a ti y no a otra persona. Aquí aprenderás a construir una identidad clara, auténtica y coherente, para que tu trabajo, tu historia y tus valores se conviertan en tu mayor fortaleza profesional.",
  //   },
  //   {
  //     num: 3,
  //     title: "Marketing Digital",
  //     description:
  //       "No basta con ser buena, necesitas que te conozcan. En este módulo aprenderás a usar las redes sociales y el entorno digital como herramientas de crecimiento, atracción de clientas y generación de oportunidades, incluso si tienes poco tiempo disponible.",
  //   },
  //   {
  //     num: 4,
  //     title: "Diferenciación",
  //     description:
  //       "La diferenciación es lo que te saca de la guerra de precios. Aprenderás a identificar qué te hace única, cómo comunicarlo y cómo transformar tu estilo, tu atención y tu experiencia en un valor que no sea fácil de copiar.",
  //   },
  //   {
  //     num: 5,
  //     title: "Atención al cliente",
  //     description:
  //       "La atención al cliente es parte del servicio, no un extra. Aquí aprenderás a ofrecer una experiencia profesional, cálida y organizada, desde el primer mensaje hasta el seguimiento posterior, logrando que tus clientas se sientan valoradas y seguras.",
  //   },
  //   {
  //     num: 6,
  //     title: "Incremento de Ticket",
  //     description:
  //       "Ganar más no siempre significa trabajar más. Aquí aprenderás a aumentar el valor de cada servicio, ofrecer opciones complementarias y estructurar tus precios de forma inteligente para mejorar tus ingresos sin saturarte de trabajo.",
  //   },
  //   {
  //     num: 7,
  //     title: "Fidelización",
  //     description:
  //       "Una clienta que regresa es un negocio más estable. En este módulo aprenderás estrategias para construir relaciones a largo plazo, generar confianza y convertir clientas ocasionales en clientas fieles que recomienden tu trabajo.",
  //   },
  //   {
  //     num: 8,
  //     title: "Finanzas",
  //     description:
  //       "Aprenderás a entender tu dinero: ingresos, gastos, utilidades y metas. Este módulo te ayudará a dejar de trabajar “a ciegas” y comenzar a tomar decisiones financieras conscientes que te permitan crecer con estabilidad.",
  //   },
  //   {
  //     num: 9,
  //     title: "Administración",
  //     description:
  //       "La organización también es una habilidad profesional. Aquí aprenderás a administrar tu tiempo, tus citas, tus recursos y tu energía, para que tu negocio funcione con orden y no dependa únicamente de ti todo el tiempo.",
  //   },
  //   {
  //     num: 10,
  //     title: "Autorrealización y Crecimiento",
  //     description:
  //       "El éxito no es solo económico. En este módulo conectarás con tu propósito, tu crecimiento personal y tu visión a largo plazo. Porque cuando una mujer se realiza profesionalmente, cambia su forma de verse, de decidir y de proyectar su futuro.",
  //   },
  // ];
  useEffect(() => {
    getAllSystems();
  }, []);
  return (
    <Layout>
      {/* HEADER */}
      <SecretsBanner />
      {/* SECTION - ESTRUCTURA CUADRADA Y NEUMORFISMO SUAVE */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          padding: { xs: "30px 0", md: "80px 0" },
          overflow: "hidden",
        }}
      >
        {/* 🪷 CAMINO FLORAL - Animación discreta en el fondo */}
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          <motion.img
            src={floralPath}
            alt='floral path'
            style={{
              position: "absolute",
              marginTop: 140,
              left: "42%",
              transform: "translateX(-50%)",
              width: "300px",
              height: "75%",
              opacity: 0.9,
            }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </Box>
        <Container maxWidth='lg' sx={{ position: "relative", zIndex: 2 }}>
          <Grid container spacing={{ xs: 4, md: 5 }} justifyContent='center'>
            {systems.map((item, index) => (
              <Grid key={index} size={{ xs: 12, md: 6 }}>
                <motion.div
                  variants={cardVariants}
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true, amount: 0.3 }}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    height: "100%",
                    background: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "18px",
                    padding: "20px",
                    border: "1px solid rgba(255, 255, 255, 0.9)",
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
                      background:
                        "linear-gradient(45deg, #d63384 30%, #ff69b4 90%)",
                      boxShadow: "0 5px 15px rgba(214,51,132,0.4)",
                      transform: "rotate(-5deg)", // Pequeño toque de estilo
                    }}
                  >
                    {index + 1}
                  </Box>

                  {/* 📝 CONTENIDO */}
                  <Link
                    to={`/cursos/bysystem/${item.id}`}
                    style={{ textDecoration: "none" }}
                  >
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
                        {item.name}
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
                  </Link>
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
