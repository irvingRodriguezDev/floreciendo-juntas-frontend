import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Stack,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Link } from "react-router-dom";

const CardEvent = ({ event }) => {
  return (
    <Card
      sx={{
        // borderRadius: 2,
        bgcolor: "#1e1f25",
        color: "white",
        maxWidth: "100%",
        position: "relative",
        padding: 3,
        backgroundColor: "rgba(238, 158, 234, 0.2)",
        borderRadius: "16px",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(11px)",
        border: "1px solid rgba(238, 158, 234, 0.3)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-8px)", // se eleva
          boxShadow: "0 12px 24px rgba(0,0,0,0.4)", // sombra fuerte
          bgcolor: "rgba(238, 158, 234, 0.2)", // fondo un poco más claro
        },
      }}
    >
      {/* Imagen del evento */}
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component='img'
          height='auto'
          width={"100%"}
          image={event.img}
          alt={event.title}
          sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
        />
        {/* Badge con fecha */}
        <Box
          sx={{
            position: "absolute",
            bottom: 10,
            right: 10,
            bgcolor: "#e53888",
            color: "white",
            px: 1.5,
            py: 0.8,
            borderRadius: "12px",
            fontSize: "0.8rem",
            fontWeight: "bold",
            zIndex: 2,
          }}
        >
          {event.date}
        </Box>
      </Box>

      {/* Contenido */}
      <CardContent>
        <Stack direction='row' spacing={2} alignItems='center' mb={1}>
          <LocationOnIcon sx={{ fontSize: 18, color: "white" }} />
          <Typography variant='body2' color='white'>
            {event.location}
          </Typography>
          <AccessTimeIcon sx={{ fontSize: 18, color: "white", ml: 1 }} />
          <Typography variant='body2' color='white'>
            {event.time}
          </Typography>
        </Stack>

        <Typography variant='h6' fontWeight='bold' mb={2}>
          {event.title}
        </Typography>
        <Link to={`/detalle-evento/${event.id}`}>
          <Button
            variant='contained'
            size='large'
            sx={{
              color: "white",
              borderColor: "gray",
              textTransform: "none",
              borderRadius: 2,
              bgcolor: "#E53888",

              "&:hover": {
                borderColor: "#7c4dff",
                bgcolor: "#E53888",
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
