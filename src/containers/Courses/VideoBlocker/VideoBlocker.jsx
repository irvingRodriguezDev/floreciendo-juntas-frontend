import React from "react";
import { Box, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import SubscriptionForm from "../../../components/Payment/SubscriptionButton"; // Ajusta la ruta

const PRIMARY_PINK = "#E53888";

const VideoBlocker = ({ userId, title }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: 250, md: 550 }, // Mantener la altura del video
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#FFF5F8", // Fondo rosa muy suave
        borderRadius: "12px",
        padding: "20px",
        textAlign: "center",
        border: `2px dashed ${PRIMARY_PINK}`,
        position: "relative",
      }}
    >
      <LockIcon sx={{ fontSize: 60, color: PRIMARY_PINK, mb: 2, mt: 2 }} />
      <Typography
        variant='h5'
        sx={{ fontWeight: 600, color: PRIMARY_PINK, mb: 1 }}
      >
        Desbloquea "{title}"
      </Typography>
      <Typography variant='body1' color='text.secondary' mb={3}>
        Este contenido es exclusivo. Suscríbete para acceder a este curso y todo
        el catálogo.
      </Typography>

      {/* ⚠️ NOTA: El SubscriptionForm ya incluye la lógica de Stripe */}
      <SubscriptionForm userId={userId} />

      <Typography variant='caption' sx={{ mt: 0, color: "text.disabled" }}>
        Proceso de pago seguro por Stripe.
      </Typography>
    </Box>
  );
};

export default VideoBlocker;
