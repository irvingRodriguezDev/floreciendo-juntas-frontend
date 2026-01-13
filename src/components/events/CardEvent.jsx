import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Button,
  keyframes,
  CardMedia,
} from "@mui/material";

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
        bgcolor: "#fff",
        borderRadius: "24px",
        border: "1px solid #F4BBD3",
        overflow: "hidden",
        mx: "auto",
        width: "auto",
        boxShadow: "0 8px 25px rgba(229, 56, 136, 0.18)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 12px 30px rgba(229, 56, 136, 0.25)",
        },
        height: "100%", // Asegura que la tarjeta siempre ocupe el espacio de la fila
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          paddingTop: "100%",
          overflow: "hidden",
        }}
      >
        <CardMedia
          component='img'
          image={event.image}
          alt={event.title}
          sx={{
            aspectRatio: {
              xs: "5 / 4",
              sm: "4 / 3",
              md: "3 / 2",
              lg: "1 / 1",
            },
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            bottom: 16,
            right: 16,
            bgcolor: "rgba(229, 56, 136, 0.95)",
            color: "white",
            px: 1.8,
            py: 0.6,
            borderRadius: "14px",
            fontSize: "0.85rem",
            fontWeight: 600,
            letterSpacing: 0.3,
            boxShadow: "0 3px 8px rgba(229, 56, 136, 0.35)",
            zIndex: 10, // Asegurar que la fecha esté por encima de la imagen
          }}
        >
          {FormatDate(event.startDate)}
        </Box>
      </Box>

      {/* 🌸 Pétalos decorativos suaves */}
      {[...Array(4)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            top: `${10 + i * 18}%`,
            left: `${5 + i * 20}%`,
            width: 12 + i * 4,
            height: 12 + i * 4,
            bgcolor: "#F8B6C7",
            borderRadius: "50%",
            opacity: 0.5,
            filter: "blur(2px)",
            animation: `${floatPetal} ${3 + i * 0.6}s ease-in-out infinite`,
          }}
        />
      ))}

      {/* Contenido del evento */}
      <CardContent
        sx={{
          p: 3,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant='h6'
          fontWeight='bold'
          mb={1.5}
          sx={{
            color: "#E53888",
            fontFamily: "'Poppins', sans-serif",
            textAlign: "center",
          }}
        >
          {event.title}
        </Typography>

        <Stack direction='row' spacing={1} alignItems='center' mb={1.2}>
          <Typography variant='body2' color='text.primary'>
            📍 {event.location}
          </Typography>
        </Stack>

        <Stack direction='row' spacing={1} alignItems='center' mb={1.2}>
          <Typography variant='body2' color='text.primary'>
            ⏰ {event.time}
          </Typography>
        </Stack>

        <Stack direction='row' spacing={1} alignItems='center' mb={2}>
          <Typography variant='body2' color='text.primary'>
            🎟️ {event.availableTickets} boletos disponibles
          </Typography>
        </Stack>

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
              fontSize: "1rem",
              "&:hover": {
                background: "linear-gradient(90deg, #D12C76, #F272A5)",
                boxShadow: "0 6px 15px rgba(229, 56, 136, 0.3)",
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
