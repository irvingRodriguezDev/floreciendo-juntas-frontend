import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import PinkSpinner from "./components/Loading/PinkSpinner";

const MESSAGES = [
  "Procesando tu solicitud...",
  "Sincronizando con Stripe 💗",
  "Actualizando tu perfil 🌸",
  "Casi listo...",
];

const CancelingSubscription = ({ onFinished }) => {
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    // Rotar mensajes cada 1.5 segundos para que la espera se sienta dinámica
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) =>
        prev < MESSAGES.length - 1 ? prev + 1 : prev,
      );
    }, 1500);

    const timer = setTimeout(() => {
      if (onFinished) onFinished();
    }, 6000); // Un pelín más para que dé tiempo a leer los mensajes

    return () => {
      clearInterval(messageInterval);
      clearTimeout(timer);
    };
  }, [onFinished]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
        position: "fixed", // Para que cubra todo el viewport
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        background:
          "radial-gradient(circle at center, #FFF5F9 0%, #FCE7F3 100%)",
        overflow: "hidden",
      }}
    >
      {/* Fondo animado: burbujas flotantes */}
      {[...Array(4)].map((_, i) => (
        <Box
          key={i}
          component={motion.div}
          animate={{
            y: [0, -40, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          sx={{
            position: "absolute",
            width: 150 + i * 50,
            height: 150 + i * 50,
            borderRadius: "50%",
            background:
              i % 2 === 0
                ? "rgba(216, 46, 122, 0.05)"
                : "rgba(255, 180, 200, 0.1)",
            filter: "blur(40px)",
            top: `${10 + i * 20}%`,
            left: `${5 + i * 25}%`,
            zIndex: 0,
          }}
        />
      ))}

      {/* Contenedor principal con efecto Glassmorphism Pro */}
      <Box
        component={motion.div}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        sx={{
          background: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(15px)",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          borderRadius: "32px",
          p: { xs: 5, md: 8 },
          maxWidth: 450,
          width: "100%",
          textAlign: "center",
          boxShadow: "0 20px 50px rgba(216, 46, 122, 0.1)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box sx={{ position: "relative", mb: 4 }}>
          <PinkSpinner />
          {/* Opcional: Podrías poner un emoji flotando cerca del spinner */}
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{
              position: "absolute",
              top: -10,
              right: "30%",
              fontSize: "1.5rem",
            }}
          >
            🌸
          </motion.div>
        </Box>

        <Typography
          variant='h5'
          fontWeight='800'
          sx={{ mb: 2, color: "#D82E7A", letterSpacing: "-0.5px" }}
        >
          Estamos procesando tu cambio
        </Typography>

        {/* Mensajes dinámicos con AnimatePresence */}
        <Box sx={{ height: 24, mb: 4 }}>
          <AnimatePresence mode='wait'>
            <Typography
              key={currentMessage}
              component={motion.p}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              variant='body1'
              sx={{ color: "#7A2C5A", fontWeight: 500 }}
            >
              {MESSAGES[currentMessage]}
            </Typography>
          </AnimatePresence>
        </Box>

        <Typography
          variant='caption'
          sx={{ color: "#B07DA1", display: "block", mt: 2 }}
        >
          Por favor, no refresques la pantalla
        </Typography>
      </Box>

      {/* Footer suave */}
      <Box sx={{ mt: 4, position: "relative", zIndex: 1 }}>
        <Typography
          variant='body2'
          sx={{ color: "#D82E7A", opacity: 0.7, fontWeight: 600 }}
        >
          Floreciendo Juntas 💗
        </Typography>
      </Box>
    </Box>
  );
};

export default CancelingSubscription;
