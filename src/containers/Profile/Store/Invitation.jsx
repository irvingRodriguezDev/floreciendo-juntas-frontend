import React, { useState } from "react";
import { Box, Typography, Button, Container, Stack } from "@mui/material";
import { motion } from "framer-motion";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import RegistroTiendaModal from "./RegistroTiendaModal";

const InvitacionDistribucion = () => {
  const [openRegistro, setOpenRegistro] = useState(false);

  const handleClickOpenRegistro = () => {
    setOpenRegistro(true);
  };

  // Variantes para animaciones en cascada
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <Box
      sx={{
        width: "100%",
        py: 8,
        px: 2,
        background: "linear-gradient(180deg, #FFF0F5 0%, #FFFFFF 100%)",
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        borderRadius: "24px",
      }}
    >
      <Container maxWidth='md'>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
        >
          <Stack spacing={4} alignItems='center' textAlign='center'>
            {/* Icono Principal Animado */}
            <motion.div
              variants={itemVariants}
              whileHover={{
                rotate: [0, -10, 10, -10, 0],
                transition: { duration: 0.5 },
              }}
            >
              <Box
                sx={{
                  bgcolor: "#FF4081",
                  p: 2,
                  borderRadius: "20px",
                  display: "inline-flex",
                  boxShadow: "0 10px 20px rgba(255, 64, 129, 0.2)",
                }}
              >
                <StorefrontIcon sx={{ fontSize: 50, color: "#fff" }} />
              </Box>
            </motion.div>

            {/* Texto Principal */}
            <motion.div variants={itemVariants}>
              <Typography
                variant='h3'
                sx={{ fontWeight: 800, color: "#2D3436", mb: 1 }}
              >
                ¿Vendes productos para uñas?
              </Typography>
              <Typography
                variant='h5'
                sx={{ fontWeight: 500, color: "#FF4081", opacity: 0.9 }}
              >
                Conviértete en un Punto de Distribución oficial
              </Typography>
            </motion.div>

            {/* Beneficios Rápidos (Bullet points visuales) */}
            <motion.div variants={itemVariants}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={3}
                sx={{ mt: 2, mb: 2 }}
              >
                <BenefitItem
                  icon={<LocationOnIcon />}
                  text='Aparece en nuestro mapa interactivo'
                />
                <BenefitItem
                  icon={<WhatsAppIcon />}
                  text='Contacto directo a tu WhatsApp'
                />
                <BenefitItem
                  icon={<RocketLaunchIcon />}
                  text='Impulsa tus ventas locales'
                />
              </Stack>
            </motion.div>

            {/* Texto Descriptivo */}
            <motion.div variants={itemVariants}>
              <Typography
                sx={{
                  color: "#636E72",
                  maxWidth: "600px",
                  fontSize: "1.1rem",
                  lineHeight: 1.7,
                }}
              >
                Únete a la red más grande de especialistas. Al registrar tu
                local físico, miles de técnicas y entusiastas podrán encontrarte
                en tiempo real según su ubicación. **Haz que tu tienda sea la
                referencia en tu zona.**
              </Typography>
            </motion.div>

            {/* Botón Call To Action */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant='contained'
                onClick={handleClickOpenRegistro}
                sx={{
                  bgcolor: "#FF4081",
                  color: "#fff",
                  px: 6,
                  py: 2,
                  borderRadius: "50px",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  textTransform: "none",
                  boxShadow: "0 8px 25px rgba(255, 64, 129, 0.3)",
                  "&:hover": {
                    bgcolor: "#E91E63",
                    boxShadow: "0 10px 30px rgba(255, 64, 129, 0.5)",
                  },
                }}
              >
                Registrar mi negocio como distribución
              </Button>
            </motion.div>
          </Stack>
        </motion.div>
      </Container>

      <RegistroTiendaModal
        open={openRegistro}
        handleClose={() => setOpenRegistro(false)}
        onSuccess={() => alert("¡Negocio registrado!")}
      />
    </Box>
  );
};

// Componente auxiliar para los beneficios
const BenefitItem = ({ icon, text }) => (
  <Stack
    direction='row'
    spacing={1}
    alignItems='center'
    sx={{ textAlign: "left" }}
  >
    <Box sx={{ color: "#FF4081", display: "flex" }}>{icon}</Box>
    <Typography sx={{ fontWeight: 600, color: "#2D3436", fontSize: "0.9rem" }}>
      {text}
    </Typography>
  </Stack>
);

export default InvitacionDistribucion;
