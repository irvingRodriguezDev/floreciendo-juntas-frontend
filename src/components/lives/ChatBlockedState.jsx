import React from "react";
import { Box, Typography, Button } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const ChatBlockedState = ({ autenticado }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        bgcolor: "#121212",
        borderRadius: "16px",
        p: 3,
        textAlign: "center",
        color: "white",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          bgcolor: "rgba(229, 56, 136, 0.15)",
          color: "#e53888",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
        }}
      >
        <LockOutlinedIcon />
      </Box>
      <Typography
        variant='h6'
        sx={{ fontSize: "1rem", fontWeight: 700, mb: 1, color: "#e53888" }}
      >
        Chat exclusivo para suscriptoras
      </Typography>
      <Typography
        variant='body2'
        sx={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem", mb: 2 }}
      >
        {!autenticado
          ? "Inicia sesión para poder interactuar en la transmisión en vivo."
          : "Suscríbete a la plataforma para unirte al chat en vivo."}
      </Typography>
    </Box>
  );
};

export default ChatBlockedState;
