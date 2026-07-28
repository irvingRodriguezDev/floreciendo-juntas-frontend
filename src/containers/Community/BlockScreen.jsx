import { Backdrop, Box, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SubscriptionForm from "../../components/Payment/SubscriptionButton";
import { Link } from "react-router-dom";
const BlockScreen = ({ autenticado, usuario }) => {
  return (
    <Backdrop
      open
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 10,
        backgroundColor: "#FFF4FA",
        backdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3.5, sm: 4.5 },
          borderRadius: "28px",
          maxWidth: 460,
          width: "100%",
          textAlign: "center",
          backgroundColor: "#FFFFFF",
          border: "1px solid #FCE7F3",
          boxShadow: "0 20px 40px rgba(229, 56, 136, 0.08)",
        }}
      >
        {/* Ícono Superior */}
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: "20px",
            backgroundColor: "#FFF5F7",
            color: "#E53888",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 2,
          }}
        >
          <LockOutlinedIcon sx={{ fontSize: 30 }} />
        </Box>

        <Typography
          variant='h5'
          sx={{ fontWeight: 900, color: "#1F2937", mb: 1 }}
        >
          Comunidad Privada
        </Typography>

        <Typography
          variant='body2'
          sx={{ color: "#4B5563", mb: 2.5, lineHeight: 1.5 }}
        >
          Suscríbete para interactuar con la comunidad, publicar tus dudas, ver
          trabajos y participar en dinámicas en vivo.
        </Typography>

        {/* Minilista de beneficios */}

        {/* ⚡ PAGO DIRECTO INCRUSTADO EN 1 CLIC */}
        <Box sx={{ width: "100%", mb: 1.5 }}>
          <SubscriptionForm userId={usuario?.id || null} />
        </Box>

        <Typography
          variant='caption'
          sx={{
            color: "#9CA3AF",
            fontWeight: 500,
            fontSize: "11px",
            display: "block",
            mb: 1.5,
          }}
        >
          🔒 Pago seguro procesado por Stripe
        </Typography>

        {!autenticado && (
          <Box>
            <Typography variant='caption' sx={{ color: "#6B7280" }}>
              ¿Ya tienes una cuenta activa?{" "}
              <Typography
                component={Link}
                to='/iniciar-sesion'
                variant='caption'
                sx={{
                  color: "#E53888",
                  fontWeight: "bold",
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Inicia sesión
              </Typography>
            </Typography>
          </Box>
        )}
      </Paper>
    </Backdrop>
  );
};

export default BlockScreen;
