// components/CancelingSubscription.jsx
import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import PinkSpinner from "./components/Loading/PinkSpinner"; // tu spinner rosa

const CancelingSubscription = ({ onFinished }) => {
  useEffect(() => {
    // Simula un tiempo de espera hasta que la cancelación se confirme
    const timer = setTimeout(() => {
      if (onFinished) onFinished();
    }, 5000); // 3 segundos, puedes ajustarlo

    return () => clearTimeout(timer);
  }, [onFinished]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
        position: "relative",
        background: "linear-gradient(135deg, #FCE7F3 0%, #FFE7FB 100%)",
        overflow: "hidden",
      }}
    >
      {/* Esferas decorativas */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 1.5 }}
        sx={{
          position: "absolute",
          top: 40,
          left: 30,
          width: 160,
          height: 160,
          borderRadius: "50%",
          background: "#F8CBEA",
          filter: "blur(60px)",
        }}
      />
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.5, delay: 0.4 }}
        sx={{
          position: "absolute",
          bottom: 50,
          right: 30,
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: "#FFD1EC",
          filter: "blur(60px)",
        }}
      />

      {/* Contenedor principal */}
      <Box
        component={motion.div}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        sx={{
          background: "rgba(255,255,255,0.6)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          p: { xs: 4, md: 6 },
          maxWidth: 480,
          textAlign: "center",
          boxShadow: "0 8px 25px rgba(0,0,0,0.05)",
        }}
      >
        <Typography
          variant='h4'
          fontWeight='bold'
          sx={{ mb: 2, color: "#D82E7A" }}
        >
          Cancelando tu suscripción 💗
        </Typography>

        <Typography variant='body1' sx={{ mb: 3, color: "#7A2C5A" }}>
          Esto puede tardar unos segundos. No cierres la página mientras se
          procesa.
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <PinkSpinner />
        </Box>

        <Typography variant='body2' sx={{ color: "#7A2C5A" }}>
          Gracias por ser parte de Floreciendo Juntas 🌸
        </Typography>
      </Box>
    </Box>
  );
};

export default CancelingSubscription;
