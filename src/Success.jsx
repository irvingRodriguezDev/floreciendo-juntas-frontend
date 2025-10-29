import React, { useEffect } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import PinkSpinner from "./components/Loading/PinkSpinner";

const Success = ({ buyerEmail, eventId }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirigir al inicio después de 5 segundos
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    // Conexión a WebSocket para actualizaciones (opcional)
    const socket = io(import.meta.env.VITE_SOCKET_URL);

    socket.on("ticketSold", (data) => {
      console.log("Ticket vendido en tiempo real:", data);
      // Aquí puedes actualizar el contador de tickets restantes en la UI
    });

    // Cleanup

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
        bgcolor: "#f5f5f5",
        textAlign: "center",
        p: 3,
      }}
    >
      <Typography variant='h4' fontWeight='bold' gutterBottom>
        ¡Compra realizada con éxito! 🎉
      </Typography>
      <Typography variant='body1' sx={{ mb: 2 }}>
        En unos segundos tus boletos serán enviados al correo electrónico:
      </Typography>
      <Typography variant='body1' fontWeight='bold' sx={{ mb: 3 }}>
        {buyerEmail}
      </Typography>
      <PinkSpinner />
      <Typography variant='body2' sx={{ mt: 2 }}>
        Serás redirigido a la página principal en breve...
      </Typography>
    </Box>
  );
};

export default Success;
