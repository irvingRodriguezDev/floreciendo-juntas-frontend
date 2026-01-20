// components/CancelSubscriptionDialog.jsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControlLabel,
  Radio,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";

export default function CancelSubscriptionDialog({
  open,
  onClose,

  loading,
  handleCancelSubscription,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 4,
          p: 2,
          maxWidth: 500,
          background: "rgba(255, 240, 247, 0.95)",
        },
      }}
    >
      <DialogTitle
        sx={{
          color: "#D82E7A",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Cancelar suscripción
      </DialogTitle>

      <DialogContent>
        <Typography
          sx={{
            mb: 3,
            color: "#555",
            textAlign: "center",
            lineHeight: 1.6,
          }}
        >
          Tu suscripción se cancelará
          <strong> al final de tu periodo actual</strong>. 💗 Podrás seguir
          disfrutando del contenido hasta esa fecha.
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 1,
          }}
        >
          <FormControlLabel
            control={
              <Radio
                checked
                disabled
                sx={{
                  color: "#D82E7A",
                  "&.Mui-checked": { color: "#D82E7A" },
                }}
              />
            }
            label='Cancelar al final del periodo'
          />
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          justifyContent: "space-between",
          px: 3,
          pb: 2,
        }}
      >
        <Button
          onClick={onClose}
          disabled={loading}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            color: "#D82E7A",
            border: "1px solid #D82E7A",
            "&:hover": { background: "#ffe5f0" },
          }}
        >
          Cancelar
        </Button>

        <Button
          onClick={handleCancelSubscription}
          disabled={loading}
          variant='contained'
          sx={{
            borderRadius: 2,
            textTransform: "none",
            bgcolor: "#D82E7A",
            "&:hover": { bgcolor: "#c02567" },
          }}
        >
          Confirmar cancelación 💗
        </Button>
      </DialogActions>
    </Dialog>
  );
}
