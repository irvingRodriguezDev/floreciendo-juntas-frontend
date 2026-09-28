import React from "react";
import { Avatar, Box, Typography, Badge } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const StoriesAvatar = ({ story, isAddButton = false, onClick }) => {
  // Extrae la imagen soportando camelCase o minúsculas
  const avatarSrc = story?.profileImage || story?.profileimage;
  // Si el grupo de historias tiene al menos una no vista, se marca como no vista
  const isSeen =
    story?.hasUnseen !== undefined ? !story.hasUnseen : story?.isSeen ?? false;

  if (isAddButton) {
    return (
      <Box
        onClick={onClick}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: 76,
          flexShrink: 0, // Evita que se encoja en el scroll horizontal
          cursor: "pointer",
          transition: "transform 0.2s ease-in-out",
          "&:hover": { transform: "scale(1.05)" },
          "&:active": { transform: "scale(0.95)" },
        }}
      >
        <Badge
          overlap='circular'
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <Box
              sx={{
                bgcolor: "#D82E7A",
                color: "white",
                borderRadius: "50%",
                width: 22,
                height: 22,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid white",
                boxShadow: "0px 2px 4px rgba(0,0,0,0.15)",
              }}
            >
              <AddIcon sx={{ fontSize: 16 }} />
            </Box>
          }
        >
          <Avatar
            src={avatarSrc}
            sx={{
              width: 62,
              height: 62,
              border: "2px dashed #D82E7A",
              bgcolor: "#FFF0F6",
              color: "#D82E7A",
              fontWeight: 600,
            }}
          >
            {story?.userName?.charAt(0)?.toUpperCase()}
          </Avatar>
        </Badge>
        <Typography
          variant='caption'
          noWrap
          sx={{
            mt: 0.75,
            fontSize: "0.72rem",
            fontWeight: 600,
            color: "text.primary",
            textAlign: "center",
            width: "100%",
          }}
        >
          + Historia
        </Typography>
      </Box>
    );
  }

  // Visualización normal de historias de alumnas
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 76,
        flexShrink: 0, // Mantiene el ancho fijo en el carrusel
        cursor: "pointer",
        transition: "transform 0.2s ease-in-out",
        "&:hover": { transform: "scale(1.05)" },
        "&:active": { transform: "scale(0.95)" },
      }}
    >
      <Box
        sx={{
          p: "2px",
          borderRadius: "50%",
          // Borde gris si todas fueron vistas, degradado rosa si hay pendientes
          background: isSeen
            ? "#E0E0E0"
            : "linear-gradient(45deg, #D82E7A 0%, #FF85A1 50%, #F48FB1 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar
          src={avatarSrc}
          sx={{
            width: 60,
            height: 60,
            border: "2px solid white",
            bgcolor: "#D82E7A",
            color: "#FFFFFF",
            fontSize: "1.1rem",
            fontWeight: 600,
          }}
        >
          {story?.userName?.charAt(0)?.toUpperCase()}
        </Avatar>
      </Box>
      <Typography
        variant='caption'
        noWrap
        sx={{
          mt: 0.75,
          width: "100%",
          textAlign: "center",
          fontSize: "0.72rem",
          fontWeight: isSeen ? 400 : 600,
          color: isSeen ? "text.secondary" : "text.primary",
        }}
      >
        {story?.userName}
      </Typography>
    </Box>
  );
};

export default StoriesAvatar;
