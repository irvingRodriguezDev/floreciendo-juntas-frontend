import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Snackbar, Alert, Slide } from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";

const MAIN_PINK = "#D72E79";

function TransitionUp(props) {
  return <Slide {...props} direction='up' />;
}

const InstallPWABanner = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      // Prevenir que el navegador muestre su aviso nativo automático
      e.preventDefault();
      // Guardar el evento para dispararlo cuando la usuaria dé clic
      setDeferredPrompt(e);
      // Mostrar nuestro banner personalizado
      setOpen(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Disparar la ventana de instalación del navegador
    deferredPrompt.prompt();

    // Esperar la respuesta de la usuaria
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
      setOpen(false);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  if (!open) return null;

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      TransitionComponent={TransitionUp}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      sx={{
        mb: { xs: 9, sm: 3 }, // Eleva el banner para no tapar el Bottom Navigation en móvil
        px: 2,
      }}
    >
      <Alert
        icon={<GetAppIcon sx={{ color: MAIN_PINK, fontSize: "1.6rem" }} />}
        onClose={handleClose}
        severity='info'
        sx={{
          bgcolor: "#FFFFFF",
          color: "#1A1A1A",
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(215, 46, 121, 0.15)",
          border: "1px solid #FFF0F6",
          alignItems: "center",
          py: 1,
          px: 2,
          "& .MuiAlert-icon": {
            mr: 1.5,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            width: "100%",
          }}
        >
          <Box>
            <Typography
              variant='subtitle2'
              sx={{ fontWeight: 700, fontSize: "0.9rem" }}
            >
              Instala Floreciendo Juntas
            </Typography>
            <Typography
              variant='caption'
              sx={{ color: "text.secondary", fontSize: "0.75rem" }}
            >
              Acceso rápido y mejor experiencia desde tu pantalla de inicio.
            </Typography>
          </Box>
          <Button
            size='small'
            variant='contained'
            onClick={handleInstallClick}
            disableElevation
            sx={{
              bgcolor: MAIN_PINK,
              color: "#FFFFFF",
              borderRadius: "20px",
              fontWeight: 700,
              textTransform: "none",
              px: 2,
              py: 0.6,
              fontSize: "0.8rem",
              whiteSpace: "nowrap",
              "&:hover": {
                bgcolor: "#B82363",
              },
            }}
          >
            Instalar
          </Button>
        </Box>
      </Alert>
    </Snackbar>
  );
};

export default InstallPWABanner;
