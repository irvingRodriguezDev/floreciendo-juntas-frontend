import { Box, Typography, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect } from "react";

export default function SuccessSubscription() {
  // REDIRECCIÓN AUTOMÁTICA
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/cursos"; // 👉 Cambia aquí la ruta de destino
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
        background: "linear-gradient(135deg, #FCE7F3 0%, #FFE8F7 100%)",
        position: "relative",
      }}
    >
      {/* Ícono animado */}
      <Box
        component={motion.div}
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
        sx={{ mb: 3 }}
      >
        <FavoriteIcon sx={{ fontSize: 110, color: "#E24AA3" }} />
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
        ¡Suscripción completada con éxito! 🌸
      </Typography>

      {/* Mensaje */}
      <Typography
        component={motion.p}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        sx={{
          fontSize: { xs: "1.1rem", md: "1.2rem" },
          color: "#7A2C5A",
          maxWidth: 600,
          mb: 4,
        }}
      >
        En unos momentos recibirás un correo con los detalles de tu suscripción.
        ¡Bienvenida a una nueva etapa de crecimiento, acompañamiento y amor
        propio! 💖
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
          Preparando tu bienvenida...
        </Typography>
      </Box>

      {/* Mensaje de redirección */}
      <Typography
        component={motion.p}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        sx={{ mt: 4, fontSize: "1rem", color: "#7A2C5A" }}
      >
        Serás redirigida a la página de tu cursos en unos segundos...
      </Typography>

      {/* Decoración 1 */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 1.5 }}
        sx={{
          position: "absolute",
          top: 50,
          left: 20,
          width: 140,
          height: 140,
          borderRadius: "50%",
          background: "#F8CBEA",
          filter: "blur(50px)",
        }}
      />

      {/* Decoración 2 */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 1.5, delay: 0.4 }}
        sx={{
          position: "absolute",
          bottom: 70,
          right: 20,
          width: 170,
          height: 170,
          borderRadius: "50%",
          background: "#FFD5EE",
          filter: "blur(55px)",
        }}
      />
    </Box>
  );
}
