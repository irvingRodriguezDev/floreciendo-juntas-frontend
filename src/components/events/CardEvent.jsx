import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Stack,
  Button,
  keyframes,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Link } from "react-router-dom";
import FormatDate from "../../utils/FormatDate";
// 🌸 Animación de pétalos flotando
const floatPetal = keyframes`
  0% { transform: translateY(0) rotate(0deg); opacity: 0.8; }
  50% { transform: translateY(-10px) rotate(20deg); opacity: 1; }
  100% { transform: translateY(0) rotate(0deg); opacity: 0.8; }
`;

const CardEvent = ({ event }) => {
  return (
    <Card
      sx={{
        position: "relative",
        bgcolor: "#fbfbfbff",
        borderRadius: "20px",
        border: "1px solid #F4BBD3",
        overflow: "hidden",
        width: "90%",
        mx: "auto",
        boxShadow: "0 6px 20px rgba(229, 56, 136, 0.15)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 10px 25px rgba(229, 56, 136, 0.25)",
        },
      }}
    >
      {/* Imagen del evento */}
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component='img'
          height='220'
          image={event.image}
          alt={event.title}
          sx={{
            objectFit: "cover",
            transition: "transform 0.4s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        />
        {/* Fecha */}
        <Box
          sx={{
            position: "absolute",
            bottom: 12,
            right: 12,
            bgcolor: "rgba(229, 56, 136, 0.9)",
            color: "white",
            px: 1.5,
            py: 0.5,
            borderRadius: "12px",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: 0.4,
          }}
        >
          {FormatDate(event.startDate)}
        </Box>
      </Box>

      {/* 🌸 Pétalos decorativos */}
      {[...Array(4)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            top: `${10 + i * 20}%`,
            left: `${8 + i * 18}%`,
            width: 14 + i * 3,
            height: 14 + i * 3,
            bgcolor: "#F8B6C7",
            borderRadius: "50%",
            opacity: 0.5,
            filter: "blur(2px)",
            animation: `${floatPetal} ${3 + i * 0.7}s ease-in-out infinite`,
          }}
        />
      ))}

      {/* Contenido */}
      <CardContent sx={{ p: 3 }}>
        <Stack direction='row' spacing={1} alignItems='center' mb={1.5}>
          <Typography variant='body2' color='text.primary'>
            📍 {event.location}
          </Typography>
        </Stack>

        <Stack direction='row' spacing={1} alignItems='center' mb={2}>
          <Typography variant='body2' color='text.primary'>
            ⏰ {event.time}
          </Typography>
        </Stack>
        <Stack direction='row' spacing={1} alignItems='center' mb={1.5}>
          <Typography variant='body2' color='text.primary'>
            🎟️ {event.availableTickets} boletos disponibles
          </Typography>
        </Stack>

        <Typography
          variant='h6'
          fontWeight='bold'
          mb={2}
          sx={{
            color: "#E53888",
            textAlign: "justify",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          {event.title}
        </Typography>

        <Link
          to={`/detalle-evento/${event.id}`}
          style={{ textDecoration: "none" }}
        >
          <Button
            variant='contained'
            fullWidth
            sx={{
              background: "linear-gradient(90deg, #E53888, #F78FB3)",
              color: "white",
              borderRadius: "30px",
              textTransform: "none",
              fontWeight: 600,
              py: 1.2,
              "&:hover": {
                background: "linear-gradient(90deg, #D12C76, #F272A5)",
              },
            }}
          >
            🌸 Ver detalles
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default CardEvent;
