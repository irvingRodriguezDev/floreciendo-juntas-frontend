import React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

// Helper para formatear los segundos a formato legible (ej: 1h 15m o 45m)
const formatDuration = (seconds) => {
  if (!seconds) return "0 min";
  const duration = Number(seconds);
  const hrs = Math.floor(duration / 3600);
  const mins = Math.floor((duration % 3600) / 60);

  if (hrs > 0) {
    return `${hrs}h ${mins}m`;
  }
  return `${mins} min`;
};

const LessonsList = ({ videos = [], activeVideoId, onSelectVideo }) => {
  if (!videos || videos.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: "center" }}>
        <Typography variant='body2' color='text.secondary'>
          No hay lecciones disponibles para este curso todavía.
        </Typography>
      </Box>
    );
  }

  return (
    <List sx={{ width: "100%", height: "auto", p: 0, overflowY: "hidden" }}>
      {videos.map((video, index) => {
        // Determinamos si este video es el que se está reproduciendo actual en pantalla
        const isActive = video.id === activeVideoId;

        return (
          <ListItem key={video.id} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              onClick={() => onSelectVideo && onSelectVideo(video)}
              sx={{
                borderRadius: "8px",
                transition: "all 0.2s ease",
                // 🎨 Estilo plano para la lección activa vs las inactivas
                backgroundColor: isActive ? "#FFF5F7" : "transparent",
                borderLeft: isActive
                  ? "4px solid #E91E63"
                  : "4px solid transparent",
                "&:hover": {
                  backgroundColor: isActive ? "#FFEBEF" : "#F9F9F9",
                },
                p: "10px 12px",
              }}
            >
              {/* Icono de Estado */}
              <ListItemIcon sx={{ minWidth: "36px" }}>
                {isActive ? (
                  <PlayCircleFilledIcon sx={{ color: "#E91E63" }} />
                ) : (
                  <PlayCircleOutlineIcon sx={{ color: "#757575" }} />
                )}
              </ListItemIcon>

              {/* Título y Metadatos */}
              <ListItemText
                // 🔥 Estas dos líneas le dicen a MUI que use divs neutrales en lugar de etiquetas p o span restrictivas
                primaryTypographyProps={{ component: "div" }}
                secondaryTypographyProps={{ component: "div" }}
                primary={
                  <>
                    <Typography
                      variant='caption'
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        textAlign: "right",
                        fontWeight: 800,
                        fontSize: "10px",
                        letterSpacing: "0.5px",
                        textTransform: "uppercase", // Le da un look editorial tipo badge
                        color: isActive ? "#E53888" : "#9CA3AF",
                        mb: 0.5,
                      }}
                    >
                      Clase #{video.order}
                    </Typography>
                    <Typography
                      variant='body2'
                      component='div' // Protege el renderizado interno
                      sx={{
                        fontWeight: isActive ? 800 : 500,
                        color: isActive ? "#E53888" : "#1F2937", // Tono carbón premium en vez de gris genérico
                        lineHeight: 1.4,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {video.title ||
                        `Parte ${index + 1} - Continuación de clase`}
                    </Typography>
                  </>
                }
                secondary={
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      mt: 0.8,
                      color: isActive ? "#E53888" : "#6B7280",
                    }}
                  >
                    <AccessTimeIcon sx={{ fontSize: "13px" }} />
                    <Typography
                      variant='caption'
                      component='span' // Mantiene el elemento en línea de forma limpia
                      sx={{
                        fontSize: "11px",
                        fontWeight: isActive ? 600 : 400,
                      }}
                    >
                      {formatDuration(video.durationSeconds)}
                    </Typography>
                  </Box>
                }
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default LessonsList;
