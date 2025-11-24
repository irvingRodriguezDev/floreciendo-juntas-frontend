import { Box, Typography, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import DiamondIcon from "@mui/icons-material/Diamond";
import { useEffect } from "react";

export default function SuccessSalonPayment() {
  // REDIRECCIÓN AUTOMÁTICA
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/mi-perfil"; // 👉 cambia esta ruta si lo necesitas
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 3,
        background: "linear-gradient(135deg, #FDF2F8 0%, #FCE7F3 100%)",
        position: "relative",
      }}
    >
      {/* Ícono central */}
      <Box
        component={motion.div}
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
        sx={{ mb: 3 }}
      >
        <DiamondIcon sx={{ fontSize: 115, color: "#E24AA3" }} />
      </Box>

      {/* Título */}
      <Typography
        component={motion.h1}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        sx={{
          fontSize: { xs: "2rem", md: "2.4rem" },
          fontWeight: 800,
          color: "#C03582",
          mb: 1,
        }}
      >
        ¡Pago realizado con éxito! ✨
      </Typography>

      {/* Mensaje principal */}
      <Typography
        component={motion.p}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        sx={{
          fontSize: { xs: "1.1rem", md: "1.2rem" },
          color: "#7A2C5A",
          maxWidth: 620,
          mb: 4,
        }}
      >
        Gracias por tu pago. Tu avance hacia el{" "}
        <strong>Salón de tus Sueños </strong>
        ha sido registrado. ¡Cada paso te acerca más a vivir la experiencia que
        siempre imaginaste! 💖
      </Typography>

      {/* Loader */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <CircularProgress size={58} sx={{ color: "#E24AA3", mb: 2 }} />
        <Typography
          sx={{ color: "#C03582", fontSize: "1rem", fontWeight: 500 }}
        >
          Procesando tu avance...
        </Typography>
      </Box>

      {/* Redirección */}
      <Typography
        component={motion.p}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        sx={{ mt: 4, fontSize: "1rem", color: "#7A2C5A" }}
      >
        Serás redirigida en unos segundos...
      </Typography>

      {/* Decoraciones */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 1.5 }}
        sx={{
          position: "absolute",
          top: 50,
          left: 20,
          width: 130,
          height: 130,
          borderRadius: "50%",
          background: "#F8CBEA",
          filter: "blur(45px)",
        }}
      />

      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 1.5, delay: 0.4 }}
        sx={{
          position: "absolute",
          bottom: 60,
          right: 20,
          width: 160,
          height: 160,
          borderRadius: "50%",
          background: "#FFD5EE",
          filter: "blur(50px)",
        }}
      />
    </Box>
  );
}
