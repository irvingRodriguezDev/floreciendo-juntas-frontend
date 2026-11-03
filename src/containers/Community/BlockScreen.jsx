import { Backdrop, Box, Paper, Typography, Button } from "@mui/material";
import React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SubscriptionForm from "../../components/Payment/SubscriptionButton";
import { Link } from "react-router-dom";

const PRIMARY_PINK = "#E53888";

const BlockScreen = ({
  autenticado,
  usuario,
  isPastDue,
  handleUpdatePayment,
  loadingPortal,
}) => {
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
            color: PRIMARY_PINK,
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
          {isPastDue ? "Actualización de pago pendiente" : "Comunidad Privada"}
        </Typography>

        <Typography
          variant='body2'
          sx={{ color: "#4B5563", mb: 2.5, lineHeight: 1.5 }}
        >
          {isPastDue ? (
            <>
              Tu último pago de renovación no pudo procesarse. Actualiza tus
              datos para recuperar el acceso inmediato a la comunidad,
              publicaciones y lives.
            </>
          ) : (
            "Suscríbete para interactuar con la comunidad, publicar tus dudas, ver trabajos y participar en dinámicas en vivo."
          )}
        </Typography>

        {/* 💳 Renderizado condicional según el estado past_due */}
        <Box sx={{ width: "100%", mb: 1.5 }}>
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
            <SubscriptionForm userId={usuario?.id || null} />
          )}
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
                  color: PRIMARY_PINK,
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
