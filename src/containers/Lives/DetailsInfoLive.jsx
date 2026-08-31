import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import PeopleIcon from "@mui/icons-material/People";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const DetailsInfoLive = ({
  isFullscreen,
  commentsVisible,
  COMMENTS_DRAWER_WIDTH,
  viewers,
  handleFullscreen,
  hudBtn,
}) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 12,
        // Se desplaza automáticamente si estamos en Fullscreen y con comentarios visibles
        right:
          isFullscreen && commentsVisible
            ? `${COMMENTS_DRAWER_WIDTH + 12}px`
            : 12,
        zIndex: 1250,
        display: "flex",
        alignItems: "center",
        gap: 1,
        transition: "right 0.3s cubic-bezier(0.4, 0, 0.2, 1)", // Transición suave al abrir/cerrar
      }}
    >
      {/* Tag EN VIVO */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          px: 1.2,
          py: 0.5,
          borderRadius: "20px",
          bgcolor: "rgba(225, 29, 72, 0.85)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.25)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        }}
      >
        <FiberManualRecordIcon
          sx={{
            fontSize: 10,
            color: "#FFF",
            animation: "blink 1.2s infinite alternate",
            "@keyframes blink": {
              "0%": { opacity: 1 },
              "100%": { opacity: 0.3 },
            },
          }}
        />
        <Typography
          sx={{
            color: "#FFF",
            fontSize: "0.7rem",
            fontWeight: 800,
            letterSpacing: "0.5px",
            lineHeight: 1,
            textTransform: "uppercase",
          }}
        >
          EN VIVO
        </Typography>
      </Box>

      {/* Espectadores */}
      {viewers >= 0 && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.75,
            px: 1.4,
            py: 0.5,
            borderRadius: "20px",
            bgcolor: "rgba(42, 15, 39, 0.65)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
          }}
        >
          <PeopleIcon
            sx={{ fontSize: 14, color: "rgba(255, 255, 255, 0.8)" }}
          />
          <Typography
            sx={{
              color: "#FFF",
              fontSize: "0.75rem",
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            {viewers}
          </Typography>
        </Box>
      )}

      {/* Fullscreen Button */}
      <Tooltip
        title={
          isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"
        }
        placement='bottom'
      >
        <IconButton onClick={handleFullscreen} size='small' sx={hudBtn}>
          {isFullscreen ? (
            <FullscreenExitIcon fontSize='small' />
          ) : (
            <FullscreenIcon fontSize='small' />
          )}
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default DetailsInfoLive;
