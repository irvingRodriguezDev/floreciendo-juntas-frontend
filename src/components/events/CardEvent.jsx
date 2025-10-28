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

// Animación simple para los pétalos
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
        bgcolor: "#FDE6F0",
        borderRadius: "16px",
        border: "1px solid #E53888",
        maxWidth: 360,
        mx: "auto",
        overflow: "hidden",
        boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
        },
      }}
    >
      {/* Imagen del evento */}
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component='img'
          height='220'
          image={event.img}
          alt={event.title}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 12,
            right: 12,
            bgcolor: "#E53888",
            color: "white",
            px: 1.5,
            py: 0.6,
            borderRadius: "12px",
            fontSize: "0.8rem",
            fontWeight: "bold",
          }}
        >
          {event.date}
        </Box>
      </Box>

      {/* Pétalos animados */}
      {[...Array(5)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            top: `${10 + i * 15}%`,
            left: `${5 + i * 15}%`,
            width: 20,
            height: 20,
            bgcolor: "#F7A8C8",
            borderRadius: "50%",
            filter: "blur(2px)",
            animation: `${floatPetal} ${3 + i}s ease-in-out infinite`,
            opacity: 0.7,
          }}
        />
      ))}

      {/* Contenido */}
      <CardContent>
        <Stack direction='row' spacing={1.5} alignItems='center' mb={1}>
          <LocationOnIcon sx={{ fontSize: 18, color: "#E53888" }} />
          <Typography variant='body2' color='#E53888'>
            {event.location}
          </Typography>
          <AccessTimeIcon sx={{ fontSize: 18, color: "#E53888", ml: 1 }} />
          <Typography variant='body2' color='#E53888'>
            {event.time}
          </Typography>
        </Stack>

        <Typography variant='h6' fontWeight='bold' mb={2} color='#E53888'>
          {event.title}
        </Typography>

        <Link to={`/detalle-evento/${event.id}`}>
          <Button
            variant='contained'
            size='medium'
            sx={{
              color: "white",
              textTransform: "none",
              borderRadius: 2,
              bgcolor: "#E53888",
              "&:hover": {
                bgcolor: "#D32F71",
              },
            }}
          >
            Boletos
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default CardEvent;
