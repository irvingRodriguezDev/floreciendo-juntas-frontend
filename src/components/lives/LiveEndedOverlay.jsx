import React from "react";
import { Box, Typography, Button } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import HomeIcon from "@mui/icons-material/Home";

const LiveEndedOverlay = ({ onReplay, onGoHome }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        zIndex: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(180deg, rgba(0,0,0,0.85), rgba(0,0,0,0.95))",
        backdropFilter: "blur(6px)",
        px: 3,
        textAlign: "center",
      }}
    >
      {/* 🔴 Badge */}
      <Box
        sx={{
          mb: 2,
          px: 1.5,
          py: 0.5,
          borderRadius: 999,
          backgroundColor: "rgba(255,255,255,0.1)",
        }}
      >
        <Typography
          variant='caption'
          sx={{
            color: "#ff4d4f",
            fontWeight: 600,
            letterSpacing: 0.5,
          }}
        >
          LIVE FINALIZADO
        </Typography>
      </Box>

      {/* 🧠 Title */}
      <Typography
        sx={{
          fontSize: "1.5rem",
          fontWeight: 700,
          color: "#fff",
          mb: 1,
        }}
      >
        La transmisión ha terminado
      </Typography>

      {/* 📝 Subtitle */}
      <Typography
        sx={{
          fontSize: "0.95rem",
          color: "rgba(255,255,255,0.75)",
          mb: 4,
          maxWidth: 320,
        }}
      >
        Gracias por acompañarnos en este live.
      </Typography>

      {/* 🎯 Actions */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          width: "100%",
          maxWidth: 320,
        }}
      >
        {onReplay && (
          <Button
            fullWidth
            onClick={onReplay}
            startIcon={<ReplayIcon />}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
              background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
              color: "#fff",
              py: 1.2,
              "&:hover": {
                opacity: 0.9,
              },
            }}
          >
            Ver repetición
          </Button>
        )}

        {onGoHome && (
          <Button
            fullWidth
            onClick={onGoHome}
            startIcon={<HomeIcon />}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff",
              py: 1.2,
            }}
          >
            Salir
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default LiveEndedOverlay;
