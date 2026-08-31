import { Box, Collapse, IconButton, Tooltip, Typography } from "@mui/material";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
const MutedOptions = ({ muted, hudBtn, toggleMute, showMuteNotice }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 12,
        left: 12,
        zIndex: 1200,
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Tooltip title={muted ? "Activar sonido" : "Silenciar"} placement='right'>
        <IconButton
          onClick={toggleMute}
          size='small'
          sx={{
            ...hudBtn,
            ...(muted && {
              bgcolor: "rgba(225, 29, 72, 0.85)",
              borderColor: "rgba(255, 255, 255, 0.4)",
              animation: showMuteNotice ? "pulse 1.8s infinite" : "none",
              "@keyframes pulse": {
                "0%": { boxShadow: "0 0 0 0 rgba(225, 29, 72, 0.7)" },
                "70%": { boxShadow: "0 0 0 10px rgba(225, 29, 72, 0)" },
                "100%": { boxShadow: "0 0 0 0 rgba(225, 29, 72, 0)" },
              },
            }),
          }}
        >
          {muted ? (
            <VolumeOffIcon fontSize='small' />
          ) : (
            <VolumeUpIcon fontSize='small' />
          )}
        </IconButton>
      </Tooltip>

      {/* Leyenda interactiva que se activa siempre que muted sea TRUE */}
      <Collapse in={muted && showMuteNotice} orientation='horizontal'>
        <Box
          onClick={toggleMute}
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "rgba(15, 23, 42, 0.85)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "20px",
            px: 1.5,
            py: 0.6,
            cursor: "pointer",
            whiteSpace: "nowrap",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            transition: "transform 0.2s",
            "&:hover": { transform: "scale(1.02)" },
          }}
        >
          <Typography
            sx={{
              color: "#FFF",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.2px",
            }}
          >
            🔊 Haz clic para activar el audio
          </Typography>
        </Box>
      </Collapse>
    </Box>
  );
};

export default MutedOptions;
