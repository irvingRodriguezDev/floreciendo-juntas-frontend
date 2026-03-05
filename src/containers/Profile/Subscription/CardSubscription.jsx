import React, { useState } from "react";
import { Box, Typography, Divider, Button, Paper } from "@mui/material";
import { motion } from "framer-motion";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import FormatDate from "../../../utils/FormatDate";
import { MethodPost } from "../../../config/Service";
import Swal from "sweetalert2";

const PRIMARY_PINK = "#E53888";
const TEXT_COLOR = "#4A4A4A";

const SubscriptionCard = ({
  subscription,
  userId,
  onCancelClick,
  refreshUser,
}) => {
  const [reactivating, setReactivating] = useState(false);

  const handleReactivate = async () => {
    try {
      setReactivating(true);
      // Endpoint que creamos en el backend para poner cancel_at_period_end: false
      await MethodPost("/payment/reactivate", { userId });

      Swal.fire({
        icon: "success",
        title: "¡Qué alegría que te quedas! 🌸",
        text: "Tu membresía ha sido reactivada y continuará sin interrupciones.",
        confirmButtonColor: PRIMARY_PINK,
      });

      if (refreshUser) refreshUser(); // Función para recargar los datos del AuthContext
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No pudimos reactivar tu membresía. Intenta más tarde.",
      });
    } finally {
      setReactivating(false);
    }
  };

  return (
    <Paper
      elevation={0}
      component={motion.div}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      sx={{
        mt: 4,
        p: 3,
        borderRadius: "22px",
        background: "linear-gradient(135deg, #FFE6F1 0%, #FFF5FA 100%)",
        border: "1px solid rgba(229,56,136,0.2)",
        boxShadow: "0 8px 20px rgba(229,56,136,0.16)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box display='flex' alignItems='center' mb={2}>
        <SpaOutlinedIcon sx={{ color: PRIMARY_PINK, fontSize: 42, mr: 1.5 }} />
        <Typography variant='h5' sx={{ color: PRIMARY_PINK, fontWeight: 800 }}>
          Tu Suscripción
        </Typography>
      </Box>

      {/* ESTATUS */}
      <Box mb={2}>
        <Box
          sx={{
            display: "inline-block",
            px: 2,
            py: 0.7,
            borderRadius: "30px",
            bgcolor:
              subscription.status === "active"
                ? "rgba(121, 212, 142, 0.25)"
                : "rgba(255, 120, 120, 0.25)",
            color: subscription.status === "active" ? "#2D8A4E" : "#A33636",
            fontWeight: 700,
            fontSize: "0.9rem",
          }}
        >
          {subscription.status === "active" ? "Activa" : "Inactiva"}
        </Box>
      </Box>

      <Typography sx={{ color: TEXT_COLOR, mb: 1 }}>
        Tipo:{" "}
        <b>{subscription.type === "ONETIME" ? "Mensual" : "Recurrente"}</b>
      </Typography>

      <Typography sx={{ color: TEXT_COLOR }}>
        Próxima renovación: <b>{FormatDate(subscription.next_renewal)}</b>
      </Typography>

      <Divider sx={{ my: 2 }} />

      {/* LÓGICA DE BOTONES CONDICIONALES */}
      {subscription.will_cancel_at ? (
        <Box
          sx={{
            p: 2,
            borderRadius: "15px",
            bgcolor: "#FFF5F8",
            border: "1px solid #F8CBEA",
          }}
        >
          <Typography variant='body2' sx={{ color: "#D82E7A", mb: 2 }}>
            Tu acceso termina el{" "}
            <b>{FormatDate(subscription.will_cancel_at)}</b>. ✨
          </Typography>
          <Button
            variant='contained'
            fullWidth
            onClick={handleReactivate}
            disabled={reactivating}
            sx={{
              bgcolor: "#D82E7A",
              borderRadius: "20px",
              textTransform: "none",
            }}
          >
            {reactivating ? "Reactivando..." : "Reactivar mi membresía 💗"}
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button
            variant='outlined'
            color='error'
            sx={{ borderRadius: "16px", textTransform: "none" }}
            onClick={onCancelClick}
          >
            Cancelar suscripción
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default SubscriptionCard;
