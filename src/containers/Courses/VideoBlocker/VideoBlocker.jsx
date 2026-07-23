import React from "react";
import { Box, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SubscriptionForm from "../../../components/Payment/SubscriptionButton"; // Ajusta la ruta

const PRIMARY_PINK = "#E53888";

const VideoBlocker = ({ userId, title }) => {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: { xs: "auto", md: 520 }, // Flexible y proporcionado
        py: { xs: 6, md: 8 },
        px: { xs: 3, sm: 4 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFF4FA",
        borderRadius: "28px",
        textAlign: "center",
        border: "1px solid #FCE7F3",
        boxShadow: "0 10px 30px rgba(229, 56, 136, 0.05)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ícono de Candado Editorial */}
      <Box
        sx={{
          width: 64,
          height: 64,
          borderRadius: "20px",
          backgroundColor: "#FFF5F7",
          color: PRIMARY_PINK,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2.5,
        }}
      >
        <LockOutlinedIcon sx={{ fontSize: 32 }} />
      </Box>

      {/* Título Principal */}
      <Typography
        variant='h4'
        component='h3'
        sx={{
          fontWeight: 900,
          color: "#1F2937",
          mb: 1,
          fontSize: { xs: "1.5rem", sm: "1.8rem" },
          lineHeight: 1.2,
        }}
      >
        Contenido Exclusivo
      </Typography>

      {/* Subtítulo informativo */}
      <Typography
        variant='body1'
        sx={{
          color: "#6B7280",
          maxWidth: 480,
          mx: "auto",
          mb: 3,
          fontSize: { xs: "0.95rem", sm: "1rem" },
          lineHeight: 1.6,
        }}
      >
        {title ? (
          <>
            Para ver la clase{" "}
            <strong style={{ color: PRIMARY_PINK }}>"{title}"</strong> y acceder
            a todo el catálogo, suscríbete a la comunidad.
          </>
        ) : (
          "Suscríbete a la membresía para acceder a este curso, los talleres en vivo y la comunidad exclusiva."
        )}
      </Typography>

      {/* Formulario de Suscripción / Botón Stripe */}
      <Box sx={{ width: "100%", maxWidth: 360, mb: 2 }}>
        <SubscriptionForm userId={userId} />
      </Box>

      {/* Indicador de Seguridad */}
      <Typography
        variant='caption'
        sx={{
          color: "#9CA3AF",
          fontWeight: 500,
          fontSize: "12px",
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        🔒 Pago seguro procesado por Stripe
      </Typography>
    </Box>
  );
};

export default VideoBlocker;
