import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import HeartBrokenOutlinedIcon from "@mui/icons-material/HeartBrokenOutlined";
import FormatDate from "../../utils/FormatDate";

const PRIMARY_PINK = "#E53888";

export default function CancelSubscriptionDialog({
  open,
  onClose,
  loading,
  handleCancelSubscription,
  expiryDate,
}) {
  // Manejo moderno para evitar cerrar backdrop durante carga (MUI v5+)
  const handleDialogClose = (event, reason) => {
    if (loading) return;
    if (reason && (reason === "backdropClick" || reason === "escapeKeyDown")) {
      return;
    }
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      PaperProps={{
        sx: {
          borderRadius: "28px",
          p: { xs: 2, sm: 3 },
          maxWidth: 440,
          width: "100%",
          background: "linear-gradient(180deg, #FFFFFF 0%, #FFF5F8 100%)",
          boxShadow: "0 20px 40px rgba(229, 56, 136, 0.15)",
          border: "1px solid #FCE7F3",
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0, 0, 0, 0.35)",
          backdropFilter: "blur(4px)",
        },
      }}
    >
      {/* ÍCONO Y TÍTULO */}
      <Box sx={{ textAlign: "center", pt: 1, pb: 0 }}>
        <Box
          sx={{
            display: "inline-flex",
            p: 1.8,
            borderRadius: "50%",
            backgroundColor: "#FFF1F2",
            color: PRIMARY_PINK,
            mb: 1.5,
          }}
        >
          <HeartBrokenOutlinedIcon sx={{ fontSize: 32 }} />
        </Box>

        <DialogTitle
          sx={{
            p: 0,
            color: "#1F2937",
            fontWeight: 800,
            fontSize: "1.35rem",
            letterSpacing: "-0.3px",
          }}
        >
          ¿Deseas cancelar tu suscripción?
        </DialogTitle>
      </Box>

      {/* CONTENIDO DEL MENSAJE */}
      <DialogContent sx={{ px: 2, py: 2 }}>
        <Typography
          sx={{
            color: "#4B5563",
            textAlign: "center",
            fontSize: "0.95rem",
            lineHeight: 1.6,
            mb: 2,
          }}
        >
          Lamentamos mucho que te vayas. Tu suscripción permanecerá activa hasta
          el{" "}
          <Box component='span' sx={{ fontWeight: 700, color: PRIMARY_PINK }}>
            {expiryDate ? FormatDate(expiryDate) : "final de tu periodo actual"}
          </Box>
          . 💗
        </Typography>

        <Typography
          variant='body2'
          sx={{
            color: "#9CA3AF",
            textAlign: "center",
            fontSize: "0.85rem",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            p: 1.5,
            borderRadius: "14px",
            border: "1px dashed #FCE7F3",
          }}
        >
          Después de esta fecha, no se realizarán más cargos a tu tarjeta y
          perderás acceso a los cursos en vivo y material exclusivo.
        </Typography>
      </DialogContent>

      {/* ACCIONES / BOTONES CON PSICOLOGÍA DE RETENCIÓN */}
      <DialogActions
        sx={{
          flexDirection: "column",
          gap: 1.5,
          px: 2,
          pb: 1,
        }}
      >
        {/* BOTÓN PRINCIPAL: QUEDARSE (Resalta con color primario) */}
        <Button
          fullWidth
          onClick={onClose}
          disabled={loading}
          variant='contained'
          sx={{
            borderRadius: "50px",
            py: 1.4,
            textTransform: "none",
            bgcolor: PRIMARY_PINK,
            fontSize: "0.95rem",
            fontWeight: 700,
            boxShadow: "0 6px 20px rgba(229, 56, 136, 0.25)",
            "&:hover": {
              bgcolor: "#CF2C75",
              boxShadow: "0 8px 25px rgba(229, 56, 136, 0.35)",
            },
          }}
        >
          No, quiero mantener mi suscripción
        </Button>

        {/* BOTÓN SECUNDARIO: CONFIRMAR CANCELACIÓN (Color discreto/neutro) */}
        <Button
          fullWidth
          onClick={handleCancelSubscription}
          disabled={loading}
          variant='text'
          sx={{
            borderRadius: "50px",
            py: 1.2,
            textTransform: "none",
            color: "#9CA3AF",
            fontSize: "0.88rem",
            fontWeight: 600,
            "&:hover": {
              bgcolor: "#FFF1F2",
              color: PRIMARY_PINK,
            },
          }}
        >
          {loading ? (
            <CircularProgress size={22} sx={{ color: PRIMARY_PINK }} />
          ) : (
            "Confirmar cancelación 💗"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
