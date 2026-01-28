import { SnackbarProvider } from "notistack";
import { Slide, SnackbarContent } from "@mui/material";
import { styled } from "@mui/material/styles";

/**
 * 🔒 Filtramos props internas de notistack
 */
const BaseSnackbar = ({ variant, ...props }) => <SnackbarContent {...props} />;

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
      hideIconVariant={false}
      iconVariant={{
        success: "💖",
        error: "⚠️",
        warning: "🔔",
        info: "✨",
      }}
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
