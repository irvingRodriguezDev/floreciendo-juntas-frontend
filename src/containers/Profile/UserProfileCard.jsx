import React from "react";
import { Card, Box, Typography, Avatar, Button, Stack } from "@mui/material";
// Íconos de MUI (reemplazando los de lucide-react)
import InstagramIcon from "@mui/icons-material/Instagram";
import WebIcon from "@mui/icons-material/Web";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

// Componente principal de la tarjeta
const UserProfileCard = ({ name, title, role, projects, avatarUrl }) => {
  return (
    // 1. Contenedor principal (Card) con estilos para el look rosado
    <Card
      sx={{
        width: 550,
        height: 300,
        borderRadius: "20px",
        boxShadow: "0 8px 15px rgba(0, 0, 0, 0.05)",
        position: "relative",
        overflow: "hidden",
        p: 4, // Padding
        bgcolor: "white",
        // Esto simula las decoraciones de fondo con CSS ::before y ::after
        "&::before": {
          content: '""',
          position: "absolute",
          top: -40,
          left: -40,
          width: 150,
          height: 150,
          opacity: 0.7,
          transform: "rotate(15deg)",
          zIndex: 1,
          // Simulación de patrón de puntos (Rosa claro)
          background:
            "radial-gradient(circle at 10% 10%, #fbe5ef 5%, transparent 5%), radial-gradient(circle at 50% 50%, #fbe5ef 4%, transparent 4%)",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: -100,
          right: -100,
          width: 250,
          height: 250,
          opacity: 0.6,
          transform: "rotate(-30deg)",
          zIndex: 1,
          bgcolor: "#fbe5ef", // Rosa muy claro
          borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%", // Forma orgánica/flor
        },
      }}
    >
      {/* 2. Etiqueta superior */}
      <Typography
        variant='body2'
        sx={{
          position: "absolute",
          top: 25,
          left: 25,
          color: "text.primary",
          zIndex: 10,
        }}
      >
        Tu perfil de artista
      </Typography>

      {/* 3. Badge de Nivel/Proyectos (simulado con Box) */}
      <Box
        sx={{
          position: "absolute",
          top: 25,
          right: 25,
          bgcolor: "#ec8db3", // Pink-primary
          color: "white",
          p: "8px 15px",
          borderRadius: "8px",
          textAlign: "center",
          lineHeight: 1.2,
          zIndex: 10,
        }}
      >
        <Typography variant='body2' fontWeight='600'>
          Nivel: PRO
        </Typography>
        <Typography variant='caption' sx={{ display: "block" }}>
          {projects} Proyectos
        </Typography>
      </Box>

      {/* 4. Información del usuario (Nombre y Título) */}
      <Box sx={{ position: "absolute", top: 100, left: 25, zIndex: 10 }}>
        <Typography
          variant='h3'
          sx={{
            color: "#d1789c", // Pink-name
            mb: 0.5,
            // Aplicando la fuente de script (debe estar cargada globalmente)
            fontFamily: "'Dancing Script', cursive",
            fontSize: "2.5rem",
            lineHeight: 1,
          }}
        >
          {name}
        </Typography>
        <Typography variant='subtitle1' color='text.secondary'>
          {title} | {role}
        </Typography>
      </Box>

      {/* 5. Contenedor de la Imagen de Perfil y borde de "flor" */}
      <Box
        sx={{
          position: "absolute",
          right: 60,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          // Borde "flor"
          border: "4px solid #ec8db3", // Pink-primary
          borderRadius: "50%",
          p: "4px",
          bgcolor: "white", // Fondo blanco para el borde interior
        }}
      >
        <Avatar
          alt={`Avatar de ${name}`}
          src={avatarUrl}
          sx={{ width: 120, height: 120 }}
        />
      </Box>

      {/* 6. Íconos Sociales */}
      <Stack
        direction='row'
        spacing={3}
        sx={{
          position: "absolute",
          bottom: 30,
          right: 80,
          zIndex: 10,
        }}
      >
        <Button
          aria-label='Instagram'
          sx={{
            minWidth: 0,
            p: 0,
            color: "#ec8db3",
            "&:hover": { color: "#d1789c", bgcolor: "transparent" },
          }}
        >
          <InstagramIcon fontSize='medium' />
        </Button>
        <Button
          aria-label='Sitio web'
          sx={{
            minWidth: 0,
            p: 0,
            color: "#ec8db3",
            "&:hover": { color: "#d1789c", bgcolor: "transparent" },
          }}
        >
          <WebIcon fontSize='medium' />
        </Button>
        <Button
          aria-label='Calendario'
          sx={{
            minWidth: 0,
            p: 0,
            color: "#ec8db3",
            "&:hover": { color: "#d1789c", bgcolor: "transparent" },
          }}
        >
          <CalendarTodayIcon fontSize='medium' />
        </Button>
      </Stack>
    </Card>
  );
};

export default UserProfileCard;
