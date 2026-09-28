import React, { forwardRef } from "react"; // 1. Importar forwardRef
import { SnackbarProvider } from "notistack";
import { Slide, SnackbarContent } from "@mui/material";
import { styled } from "@mui/material/styles";

/**
 * ✅ Filtramos TODAS las props internas de notistack para que no lleguen al DOM
 */
const BaseSnackbar = forwardRef((props, ref) => {
  const {
    // Extraemos todo lo que causa error en la consola
    id,
    message,
    variant,
    anchorOrigin,
    autoHideDuration,
    hideIconVariant,
    iconVariant,
    persist,
    style,
    role,
    // El resto de props (como className) se quedan en 'other'
    ...other
  } = props;

  return (
    <SnackbarContent
      ref={ref}
      role={role || "alert"}
      message={message}
      {...other}
    />
  );
});

const StyledSnackbar = styled(BaseSnackbar)(({ variant }) => ({
  borderRadius: "18px",
  padding: "12px 18px",
  fontSize: "15px",
  fontWeight: 600,
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  border: "1px solid rgba(255,255,255,0.35)",
  color: "#FFF",
  boxShadow: "0 10px 35px rgba(0,0,0,0.25)",

  ...(variant === "info" && {
    background: "rgba(255, 105, 180, 0.35)",
  }),
  ...(variant === "success" && {
    background: "rgba(255, 182, 193, 0.45)",
  }),
  ...(variant === "warning" && {
    background: "rgba(255, 165, 0, 0.4)",
  }),
  ...(variant === "error" && {
    background: "rgba(255, 99, 132, 0.45)",
  }),
}));

const ToastProvider = ({ children }) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      TransitionComponent={Slide}
      // Se recomienda pasar estas configuraciones aquí, pero BaseSnackbar las filtrará
      hideIconVariant={false}
      Components={{
        success: StyledSnackbar,
        error: StyledSnackbar,
        warning: StyledSnackbar,
        info: StyledSnackbar,
      }}
    >
      {children}
    </SnackbarProvider>
  );
};

export default ToastProvider;
