import React, { useContext, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { Box, Grid, Typography, Container, alpha } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// ASSETS & CONTEXT
import floralPath from "../../assets/svg/floral-path.svg";
import SecretsBanner from "../../components/Banner/SecretsBanner";
import SystemContext from "../../context/System/SystemContext";
import { useHoliday } from "../../context/Holiday/HolidayContext"; // 🎄 Importamos el hook navideño

// --- VARIANTS DE FRAMER MOTION ---
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.7,
      ease: [0.215, 0.61, 0.355, 1], // Cubic-bezier premium
    },
  }),
};

const Secrets = () => {
  const { systems, getAllSystems } = useContext(SystemContext);
  const { isHolidayMode } = useHoliday(); // 🎄 Estado global de navidad

  useEffect(() => {
    getAllSystems();
  }, []);

  return (
    <Layout>
      {/* HEADER */}
      <SecretsBanner />

      {/* MAIN CONTAINER */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          padding: { xs: "30px 0", md: "80px 0" },
          overflow: "hidden",
        }}
      >
        {/* 🪷 CAMINO FLORAL */}
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
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
              top: "10%",
              left: "45%",
              width: "280px",
              opacity: 0.25,
              filter: "blur(0.5px)",
            }}
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </Box>

        <Container maxWidth='lg' sx={{ position: "relative", zIndex: 2 }}>
          <Grid container spacing={{ xs: 3, md: 4 }} justifyContent='center'>
            {systems.map((item, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 6 }} key={item.id || index}>
                <motion.div
                  custom={index}
                  variants={cardVariants}
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  style={{ height: "100%" }}
                >
                  <Box
                    component={Link}
                    to={`/cursos/bysystem/${item.id}`}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "100%",
                      minHeight: "220px",
                      position: "relative",
                      p: { xs: 3.5, md: 4.5 },
                      borderRadius: "24px",
                      textDecoration: "none",
                      backgroundColor: "rgba(255, 255, 255, 0.75)",
                      backdropFilter: "blur(16px)",
                      WebkitBackdropFilter: "blur(16px)",
                      border: "1px solid rgba(255, 255, 255, 0.8)",
                      boxShadow:
                        "0 15px 35px -10px rgba(163, 11, 93, 0.07), 0 5px 15px rgba(0, 0, 0, 0.02)",
                      transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                      overflow: "visible", // Cambiado a 'visible' para permitir que el gorrito sobresalga elegantemente
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        boxShadow:
                          "0 25px 45px -12px rgba(163, 11, 93, 0.15), 0 10px 20px rgba(0, 0, 0, 0.03)",
                        borderColor: "rgba(214, 51, 132, 0.3)",
                        "& .secret-number": {
                          opacity: 0.12,
                          transform: "scale(1.05)",
                          color: "#d63384",
                        },
                        "& .secret-title": {
                          color: "#d63384",
                        },
                      },
                    }}
                  >
                    {/* 🎄 GORRITO NAVIDEÑO EN LA ESQUINA SUPERIOR IZQUIERDA */}
                    {isHolidayMode && (
                      <Box
                        component='img'
                        src='https://cdn.floreciendojuntas.com/production/statics/xmas/gorro-xmas-teddy.png'
                        alt='Gorro Navideño'
                        sx={{
                          position: "absolute",
                          top: "-22px",
                          left: "-18px",
                          width: "72px",
                          height: "72px",
                          transform: "rotate(-25deg)",
                          zIndex: 10,
                          pointerEvents: "none",
                          filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.12))",
                        }}
                      />
                    )}

                    {/* 🔢 NÚMERO WATERMARK ESTILO EDITORIAL */}
                    <Typography
                      className='secret-number'
                      sx={{
                        position: "absolute",
                        top: "-15px",
                        right: "15px",
                        fontSize: { xs: "6.5rem", md: "8rem" },
                        fontWeight: 900,
                        lineHeight: 1,
                        color: "#000",
                        opacity: 0.089,
                        userSelect: "none",
                        transition: "all 0.5s ease",
                        fontFamily: "revert-layer",
                      }}
                    >
                      {String(index + 1).padStart(2, "#")}
                    </Typography>

                    {/* 📝 CONTENIDO PRINCIPAL */}
                    <Box sx={{ zIndex: 1 }}>
                      <Typography
                        variant='caption'
                        sx={{
                          textTransform: "uppercase",
                          letterSpacing: "0.15em",
                          fontWeight: 700,
                          color: "#d63384",
                          display: "block",
                          mb: 1.5,
                          fontSize: "0.75rem",
                        }}
                      >
                        Secreto {String(index + 1).padStart(2, "#")}
                      </Typography>

                      <Typography
                        className='secret-title'
                        variant='h5'
                        sx={{
                          fontWeight: 800,
                          color: "#2C1820",
                          mb: 1.5,
                          lineHeight: 1.2,
                          fontSize: { xs: "1.25rem", md: "1.45rem" },
                          transition: "color 0.3s ease",
                        }}
                      >
                        {item.name}
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: { xs: "0.92rem", md: "0.98rem" },
                          fontWeight: 400,
                          color: "#5C4A52",
                          lineHeight: 1.6,
                        }}
                      >
                        {item.description}
                      </Typography>
                    </Box>

                    {/* 🔗 CTA / LINK SUTIL */}
                    <Box
                      sx={{
                        mt: 3,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        zIndex: 1,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "0.85rem",
                          fontWeight: 700,
                          color: "#a30b5d",
                          letterSpacing: "0.05em",
                        }}
                      >
                        Explorar secreto
                      </Typography>
                      <Box
                        component='span'
                        sx={{
                          display: "inline-block",
                          transition: "transform 0.3s ease",
                          color: "#a30b5d",
                          fontSize: "1rem",
                          ".MuiBox-root:hover &": {
                            transform: "translateX(5px)",
                          },
                        }}
                      >
                        →
                      </Box>
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      {isHolidayMode && (
        <Box
          sx={{
            position: "absolute",
            marginTop: { xs: -6, lg: -10 },
            display: "flex",
            left: { xs: 0 },
            justifyContent: "flex-start",
          }}
        >
          <Box
            component='img'
            src='https://cdn.floreciendojuntas.com/production/statics/xmas/sferas-xmas.png'
            alt='Campanas Navideñas'
            sx={{
              width: { xs: 90, sm: 110, md: 150, lg: 200 },
              height: { xs: 90, sm: 110, md: 150, lg: 200 },
              objectFit: "contain", // Asegura que la imagen mantenga su proporción sin deformarse
            }}
          />
        </Box>
      )}
      {isHolidayMode && (
        <Box
          sx={{
            position: "absolute",
            marginTop: { xs: -6, lg: -10 },
            display: "flex",
            justifyContent: "flex-end",
            right: 0,
          }}
        >
          <Box
            component='img'
            src='https://cdn.floreciendojuntas.com/production/statics/xmas/arbol-x%2B.png'
            alt='Campanas Navideñas'
            sx={{
              width: { xs: 90, sm: 110, md: 150, lg: 200 },
              height: { xs: 90, sm: 110, md: 150, lg: 200 },
              objectFit: "contain", // Asegura que la imagen mantenga su proporción sin deformarse
            }}
          />
        </Box>
      )}
    </Layout>
  );
};

export default Secrets;
