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
// Sugerencia: Importa una librería de fechas como moment o date-fns si pasas la fecha
// import moment from 'moment';
import FormatDate from "../../utils/FormatDate";
export default function CancelSubscriptionDialog({
  open,
  onClose,
  loading,
  handleCancelSubscription,
  expiryDate, // Nueva prop: fecha en que termina el periodo
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      // Evita que el usuario cierre el modal haciendo clic afuera mientras procesa
      disableEscapeKeyDown={loading}
      onBackdropClick={loading ? null : onClose}
      PaperProps={{
        sx: {
          borderRadius: 4,
          p: 2,
          maxWidth: 450,
          background: "linear-gradient(to bottom, #ffffff, #fff0f7)",
        },
      }}
    >
      <DialogTitle
        sx={{
          color: "#D82E7A",
          fontWeight: "bold",
          textAlign: "center",
          fontSize: "1.5rem",
        }}
      >
        ¿Deseas cancelar tu suscripción?
      </DialogTitle>

      <DialogContent>
        <Typography
          sx={{
            mb: 2,
            color: "#444",
            textAlign: "center",
            lineHeight: 1.6,
          }}
        >
          Lamentamos mucho que te vayas. Tu suscripción permanecerá
          <strong>
            {" "}
            activa hasta el{" "}
            {FormatDate(expiryDate) || "final de tu periodo actual"}
          </strong>
          . 💗
        </Typography>

        <Typography
          variant='body2'
          sx={{ color: "#777", textAlign: "center", fontStyle: "italic" }}
        >
          Después de esta fecha, no se realizarán más cargos a tu tarjeta.
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          flexDirection: "column", // Botones uno sobre otro para mejor UX en móvil
          gap: 1,
          px: 3,
          pb: 2,
        }}
      >
        <Button
          fullWidth
          onClick={handleCancelSubscription}
          disabled={loading}
          variant='contained'
          sx={{
            borderRadius: 3,
            py: 1.2,
            textTransform: "none",
            bgcolor: "#D82E7A",
            fontSize: "1rem",
            fontWeight: "bold",
            "&:hover": { bgcolor: "#c02567" },
            boxShadow: "0 4px 12px rgba(216, 46, 122, 0.3)",
          }}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            "Confirmar cancelación 💗"
          )}
        </Button>

        <Button
          fullWidth
          onClick={onClose}
          disabled={loading}
          variant='contained'
          sx={{
            borderRadius: 3,
            bgcolor: "#FFEEF6",
            textTransform: "none",
            color: "#c02567",
            "&:hover": {
              background: "#FFEEF6",
              color: "#c02567",
              textDecoration: "underline",
            },
          }}
        >
          No, quiero mantener mi suscripción
        </Button>
      </DialogActions>
    </Dialog>
  );
}
