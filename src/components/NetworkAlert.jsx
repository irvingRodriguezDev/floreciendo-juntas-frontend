import React from "react";
import {
  Alert,
  AlertTitle,
  Collapse,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import RefreshIcon from "@mui/icons-material/Refresh";

const NetworkAlert = ({ open, onClose }) => {
  return (
    <Collapse in={open}>
      <Alert
        severity='warning'
        icon={<WifiOffIcon sx={{ color: "#D97706" }} />}
        action={
          <Box display='flex' alignItems='center' gap={1}>
            <Button
              size='small'
              color='inherit'
              startIcon={<RefreshIcon />}
              onClick={() => window.location.reload()}
              sx={{ textTransform: "none", fontWeight: "bold" }}
            >
              Reconectar
            </Button>
            <IconButton size='small' color='inherit' onClick={onClose}>
              ✕
            </IconButton>
          </Box>
        }
        sx={{
          mb: 2,
          borderRadius: "14px",
          backgroundColor: "#FEF3C7",
          color: "#92400E",
          border: "1px solid #FCD34D",
          "& .MuiAlert-icon": { alignItems: "center" },
        }}
      >
        <AlertTitle sx={{ fontWeight: 800, fontSize: "0.9rem", mb: 0.2 }}>
          Conexión inestable detectada
        </AlertTitle>
        Tu señal de internet está fallando o fluctuando. Si la transmisión se
        congela, prueba cambiar a WiFi o recargar la página.
      </Alert>
    </Collapse>
  );
};

export default NetworkAlert;
