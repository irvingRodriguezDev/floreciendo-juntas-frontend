import React, { useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { motion } from "framer-motion";
import PinkSpinner from "./components/Loading/PinkSpinner";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Success = ({ buyerEmail, eventId }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/mi-perfil"), 5000);

    const socket = io(import.meta.env.VITE_SOCKET_URL);

    socket.on("ticketSold", (data) => {
      console.log("Ticket vendido en tiempo real:", data);
    });

    return () => {
      clearTimeout(timer);
      socket.disconnect();
    };
  }, [navigate, eventId]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        p: 3,
        background: "linear-gradient(135deg, #FCE7F3 0%, #FFE7FB 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Spheres decorativos */}
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

      {/* Contenido principal */}
      <Box
        component={motion.div}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        sx={{
          background: "rgba(255,255,255,0.5)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          p: { xs: 4, md: 6 },
          maxWidth: 480,
          boxShadow: "0 8px 25px rgba(0,0,0,0.05)",
        }}
      >
        <CheckCircleIcon
          component={motion.svg}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 140, delay: 0.2 }}
          sx={{ fontSize: 90, color: "#E24AA3", mb: 2 }}
        />

        <Typography
          variant='h4'
          fontWeight='bold'
          sx={{ mb: 1, color: "#C03582" }}
        >
          ¡Compra realizada con éxito! 🎉
        </Typography>

        <Typography variant='body1' sx={{ mb: 1, color: "#7A2C5A" }}>
          En unos segundos tus boletos serán enviados al correo electrónico:
        </Typography>

        <Typography
          variant='body1'
          fontWeight='bold'
          sx={{ mb: 3, color: "#C03582" }}
        >
          {buyerEmail}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <PinkSpinner />
        </Box>

        <Typography variant='body2' sx={{ color: "#7A2C5A" }}>
          Serás redirigido a la página principal en breve...
        </Typography>
      </Box>
    </Box>
  );
};

export default Success;
