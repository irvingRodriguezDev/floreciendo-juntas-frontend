import React, { useContext, useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Box,
  Fade,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import UserContext from "../../context/User/UserContext";
import TextField from "@mui/material/TextField";

const PinkTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 14,
    backgroundColor: "#ffffff",
  },
  "& label.Mui-focused": {
    color: "#d63384",
  },
  "& .MuiOutlinedInput-root.Mui-focused fieldset": {
    borderColor: "#d63384",
  },
}));

export default function UpdateAddressModal({ open, onClose, dir }) {
  const { UpdateAddress } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const contentRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
  });

  // 🟣 Cuando se abre o cambia "dir", resetear con los valores actuales
  useEffect(() => {
    if (open && dir) {
      reset({
        recipientName: dir.recipientName ?? "",
        phoneNumber: dir.phoneNumber ?? "",
        street: dir.street ?? "",
        number: dir.number ?? "",
        neighborhood: dir.neighborhood ?? "",
        city: dir.city ?? "",
        state: dir.state ?? "",
        zipCode: dir.zipCode ?? "",
        instructions: dir.instructions ?? "",
      });

      document.activeElement?.blur();
    }
  }, [open, dir, reset]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // 🟣 Agregar el ID de la dirección al objeto enviado
      const payload = {
        ...data,
        id: dir.id, // <--- Importante
      };

      contentRef.current?.setAttribute("inert", "true");

      await UpdateAddress(payload);

      document.activeElement?.blur();

      setLoading(false);
      contentRef.current?.removeAttribute("inert");

      onClose();
    } catch (error) {
      console.error(error);
      setLoading(false);
      contentRef.current?.removeAttribute("inert");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      fullWidth
      maxWidth='sm'
      TransitionComponent={Fade}
      disableEscapeKeyDown={loading}
      disableRestoreFocus
      PaperProps={{
        sx: {
          borderRadius: "24px",
          backgroundColor: "#fff5fa",
          position: "relative",
          overflow: "hidden",
        },
      }}
    >
      {loading && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backdropFilter: "blur(3px)",
            backgroundColor: "rgba(255, 192, 215, 0.35)",
            zIndex: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "1.2rem",
            fontWeight: "bold",
            color: "#d63384",
          }}
        >
          Guardando dirección…
        </Box>
      )}

      <DialogTitle
        sx={{
          textAlign: "center",
          color: "#d63384",
          fontWeight: "900",
          fontSize: "1.5rem",
          letterSpacing: "0.5px",
          pt: 3,
        }}
      >
        ✨ Actualizar Dirección de Envío ✨
      </DialogTitle>

      <DialogContent ref={contentRef} sx={{ mt: 1 }}>
        <Box
          component='form'
          id='shipping-form'
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2} mt={1}>
            <Grid size={12}>
              <PinkTextField
                fullWidth
                label='¿Quién recibirá?'
                {...register("recipientName", {
                  required: "Este campo es obligatorio",
                })}
                error={!!errors.recipientName}
                helperText={errors.recipientName?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <PinkTextField
                fullWidth
                label='Teléfono de contacto'
                {...register("phoneNumber", {
                  required: "El teléfono es obligatorio",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Debe tener 10 dígitos",
                  },
                })}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <PinkTextField
                fullWidth
                label='Calle'
                {...register("street", { required: "Campo obligatorio" })}
                error={!!errors.street}
                helperText={errors.street?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <PinkTextField
                fullWidth
                label='Número Exterior'
                {...register("number")}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <PinkTextField
                fullWidth
                label='Colonia'
                {...register("neighborhood", { required: "Campo obligatorio" })}
                error={!!errors.neighborhood}
                helperText={errors.neighborhood?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <PinkTextField
                fullWidth
                label='Ciudad / Municipio'
                {...register("city", { required: "Campo obligatorio" })}
                error={!!errors.city}
                helperText={errors.city?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <PinkTextField
                fullWidth
                label='Estado'
                {...register("state", { required: "Campo obligatorio" })}
                error={!!errors.state}
                helperText={errors.state?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <PinkTextField
                fullWidth
                label='Código Postal'
                {...register("zipCode", { required: "Campo obligatorio" })}
                error={!!errors.zipCode}
                helperText={errors.zipCode?.message}
              />
            </Grid>

            <Grid size={12}>
              <PinkTextField
                fullWidth
                multiline
                maxRows={3}
                label='Referencias (obligatorio)'
                {...register("instructions", { required: "Campo obligatorio" })}
                error={!!errors.instructions}
                helperText={errors.instructions?.message}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button
          onClick={loading ? undefined : onClose}
          sx={{
            borderRadius: "12px",
            backgroundColor: "#ffe3ec",
            color: "#d63384",
            px: 3,
            "&:hover": { backgroundColor: "#ffd2e1" },
          }}
        >
          Cancelar
        </Button>

        <Button
          type='submit'
          form='shipping-form'
          disabled={!isValid || loading}
          sx={{
            borderRadius: "12px",
            backgroundColor: "#d63384",
            color: "#fff",
            px: 3,
            fontWeight: "bold",
            boxShadow: "0px 4px 12px rgba(214,51,132,0.4)",
            transition: "0.2s ease",
            "&:hover": { backgroundColor: "#b82a6f" },
          }}
        >
          {loading ? "Guardando..." : "Actualizar Dirección"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
