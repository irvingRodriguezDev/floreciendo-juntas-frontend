import React from "react";
import { Box, Typography, Button } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SubscriptionForm from "../../../components/Payment/SubscriptionButton";

const PRIMARY_PINK = "#E53888";

const VideoBlocker = ({
  userId,
  title,
  isPastDue,
  handleUpdatePayment,
  loadingPortal,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: { xs: "auto", md: 520 },
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
      {/* Ícono de Candado */}
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
        {isPastDue ? "Actualización de pago pendiente" : "Contenido Exclusivo"}
      </Typography>

      {/* Subtítulo informativo adaptado */}
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
        {isPastDue ? (
          <>
            Tu último pago de renovación para ver{" "}
            <strong style={{ color: PRIMARY_PINK }}>
              "{title || "esta clase"}"
            </strong>{" "}
            no pudo procesarse. Actualiza tus datos para recuperar el acceso al
            instante.
          </>
        ) : title ? (
          <>
            Para ver la clase{" "}
            <strong style={{ color: PRIMARY_PINK }}>"{title}"</strong> y acceder
            a todo el catálogo, suscríbete a la comunidad.
          </>
        ) : (
          "Suscríbete a la membresía para acceder a este curso, los talleres en vivo y la comunidad exclusiva."
        )}
      </Typography>

      {/* 💳 Renderizado condicional: Si está en past_due mostramos botón de actualizar tarjeta; si no, el botón de compra normal */}
      <Box sx={{ width: "100%", maxWidth: 360, mb: 2 }}>
        {isPastDue ? (
          <Button
            onClick={handleUpdatePayment}
            disabled={loadingPortal}
            variant='contained'
            fullWidth
            startIcon={<CreditCardIcon />}
            sx={{
              backgroundColor: PRIMARY_PINK,
              color: "#FFF",
              fontWeight: 800,
              borderRadius: "16px",
              py: 1.5,
              textTransform: "none",
              fontSize: "1rem",
              boxShadow: "0 8px 20px rgba(229, 56, 136, 0.25)",
              "&:hover": {
                backgroundColor: "#C2256F",
              },
            }}
          >
            {loadingPortal ? "Abriendo portal..." : "Actualizar mi tarjeta"}
          </Button>
        ) : (
          <SubscriptionForm userId={userId} />
        )}
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
          mt: 1,
        }}
      >
        🔒 Pago seguro procesado por Stripe
      </Typography>
    </Box>
  );
};

export default VideoBlocker;
