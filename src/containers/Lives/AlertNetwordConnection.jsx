import { Alert, AlertTitle, Button, Collapse } from "@mui/material";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import RefreshIcon from "@mui/icons-material/Refresh";
const AlertNetwordConnection = ({ isSlowConnection, handleReloadPlayer }) => {
  return (
    <Collapse
      in={isSlowConnection}
      sx={{
        position: "absolute",
        bottom: 20,
        left: { xs: 12, sm: 20 },
        right: { xs: 12, sm: 20 },
        zIndex: 1300,
        maxWidth: "480px",
        margin: "0 auto",
      }}
    >
      <Alert
        severity='warning'
        icon={<WifiOffIcon sx={{ color: "#FBBF24" }} />}
        action={
          <Button
            size='small'
            color='inherit'
            startIcon={<RefreshIcon />}
            onClick={handleReloadPlayer}
            sx={{
              textTransform: "none",
              fontWeight: 700,
              fontSize: "0.75rem",
              bgcolor: "rgba(255,255,255,0.1)",
              borderRadius: "8px",
              px: 1.5,
              "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
            }}
          >
            Reconectar
          </Button>
        }
        sx={{
          borderRadius: "14px",
          backgroundColor: "rgba(15, 23, 42, 0.92)",
          color: "#FDE68A",
          border: "1px solid rgba(245, 158, 11, 0.4)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          "& .MuiAlert-icon": { alignItems: "center" },
        }}
      >
        <AlertTitle
          sx={{
            fontWeight: 800,
            fontSize: "0.85rem",
            mb: 0.1,
            color: "#FFF",
          }}
        >
          Conexión inestable detectada
        </AlertTitle>
        Tu red está fluctuando. Si la transmisión se traba, reconecta o cambia a
        WiFi.
      </Alert>
    </Collapse>
  );
};

export default AlertNetwordConnection;
