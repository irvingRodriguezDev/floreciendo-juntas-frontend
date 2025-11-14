import { SnackbarProvider } from "notistack";
import { Slide } from "@mui/material";

const ToastProvider = ({ children }) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={2500}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      TransitionComponent={Slide}
      hideIconVariant={false}
      iconVariant={{
        success: "💖",
        error: "⚠️",
        warning: "🔔",
        info: "✨",
      }}
      ComponentsProps={{
        snackbar: {
          sx: {
            borderRadius: "16px",
            padding: "8px 16px",
            fontSize: "16px",
            fontWeight: 600,
            background: "linear-gradient(135deg, #ff69b4, #d82e7a)",
            boxShadow: "0 6px 25px rgba(216,46,136,0.3)",
            color: "white",
          },
        },
      }}
    >
      {children}
    </SnackbarProvider>
  );
};

export default ToastProvider;
