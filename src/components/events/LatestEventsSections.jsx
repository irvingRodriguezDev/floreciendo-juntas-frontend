import React, { useContext, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Stack,
  useTheme,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EventsContext from "../../context/Events/EventsContext";
import FormatDate from "../../utils/FormatDate";
import { Link } from "react-router-dom";
// Datos de ejemplo para los eventos

const LatestEventsSection = () => {
  const { events, getLatestEvents } = useContext(EventsContext);
  const theme = useTheme();
  useEffect(() => {
    getLatestEvents();
  }, []);
  const primaryPink = "#e91e63";
  const lightYellow = "#ffecb3";

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper || "#ffffff", // Fondo blanco de la imagen
        padding: theme.spacing(8, 4),
      }}
    >
      {/* --- Encabezado de la Sección (Centrado y con Resaltado) --- */}
      <Stack alignItems='center' sx={{ mb: 6 }}>
        <Typography
          variant='overline'
          sx={{
            color: theme.palette.text.secondary,
            fontWeight: 600,
            textTransform: "uppercase",
          }}
        >
          Nuestros Eventos
        </Typography>

        <Typography
          variant='h3'
          component='h2'
          sx={{
            fontWeight: 700,
            lineHeight: 1.2,
            textAlign: "center",
            fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
          }}
        >
          Proximos{" "}
          <span
            style={{
              position: "relative",
              display: "inline-block",
              textDecoration: "none",
            }}
          >
            Eventos
            <Box
              component='span'
              sx={{
                position: "absolute",
                left: 0,
                bottom: 0,
                width: "100%",
                height: "8px",
                backgroundColor: lightYellow, // Resaltado amarillo
                zIndex: -1,
                opacity: 0.7,
                borderRadius: "4px",
              }}
            />
          </span>
        </Typography>
      </Stack>

      {/* --- Listado de Eventos --- */}
      <Grid
        container
        spacing={4}
        justifyContent='center'
        sx={{ maxWidth: 1200, margin: "0 auto" }}
      >
        {events.map((event) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={event.id}>
            <Card
              sx={{
                borderRadius: "24px",
                boxShadow: "0 4px 16px rgba(229, 56, 136, 0.15)",
                overflow: "hidden",
                minHeight: 460,
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 8px 24px rgba(229, 56, 136, 0.25)",
                },
                backgroundColor: "#fffdfd",
              }}
            >
              {/* Imagen con fondo de color */}
              <Box
                sx={{
                  background: `linear-gradient(180deg, ${event.bgColor}40 0%, #ffffff 100%)`,
                  height: 240,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <CardMedia
                  component='img'
                  image={event.image}
                  alt={event.title}
                  sx={{
                    width: "auto",
                    height: "240px",
                    objectFit: "cover",
                    borderRadius: "0",
                    transition: "transform 0.5s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                />

                {/* Detalle floral sutil (pseudo fondo decorativo) */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: "100%",
                    height: "60px",
                    background:
                      "linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.8) 100%)",
                  }}
                />
              </Box>

              {/* Contenido */}
              <CardContent
                sx={{
                  p: 3,
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {/* Fecha y ubicación */}
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant='caption'
                    sx={{
                      color: "#A64D79",
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    🗓️ {FormatDate(event.startDate)}
                  </Typography>
                  <Typography
                    variant='caption'
                    sx={{
                      color: "#666",
                      display: "flex",
                      alignItems: "center",
                      mt: 0.5,
                    }}
                  >
                    📍 {event.location}
                  </Typography>
                </Box>

                {/* Título del evento */}
                <Typography
                  variant='h6'
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    lineHeight: 1.4,
                    color: "#333",
                    textAlign: "justify",
                  }}
                >
                  {event.title}
                </Typography>

                {/* Botón */}
                <Link
                  to={`/detalle-evento/${event.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    variant='contained'
                    fullWidth
                    sx={{
                      backgroundColor: "#E53888",
                      color: "white",
                      borderRadius: "30px",
                      fontWeight: 600,
                      textTransform: "none",
                      boxShadow: "0 4px 10px rgba(229, 56, 136, 0.3)",
                      "&:hover": {
                        backgroundColor: "#d4307d",
                        boxShadow: "0 6px 16px rgba(229, 56, 136, 0.4)",
                      },
                    }}
                  >
                    🌷 Más detalles del evento
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* --- Botón de Ver Todos los Eventos --- */}
      <Box sx={{ textAlign: "center", mt: 6 }}>
        <Link to='/eventos'>
          <Button
            variant='contained'
            endIcon={<ArrowForwardIcon />}
            sx={{
              backgroundColor: "#E53888", // Rosa principal
              color: "white",
              // boxShadow: "0 8px 24px rgba(229, 56, 136, 0.25)",
              fontWeight: 600,
              padding: "12px 30px",
              borderRadius: "8px",
              textTransform: "none",
              "&:hover": {
                transform: "translateY(-1px)",
                boxShadow: "0 10px 24px rgba(229, 56, 136, 0.25)",
              },
            }}
          >
            Ver Todos los Eventos
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default LatestEventsSection;
