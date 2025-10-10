import React from "react";
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

// Datos de ejemplo para los eventos
const events = [
  {
    id: 1,
    title: "Workshop de Nail Art 3D: Flores que Enamoran",
    date: "10 Oct 2025",
    author: "Mentora Ana S.",
    image:
      "https://i.pinimg.com/1200x/ee/79/a9/ee79a90d29fad35a96c8e6cffde03602.jpg", // Reemplaza con tu imagen de evento
    bgColor: "#f8d22d", // Amarillo del fondo de la imagen
  },
  {
    id: 2,
    title: "Webinar Gratuito: Precios y Costos para tu Negocio",
    date: "25 Sep 2025",
    author: "Mentora Sofía R.",
    image:
      "https://i.pinimg.com/736x/1a/69/e4/1a69e478ac737cea0b793a02bf473dba.jpg", // Reemplaza con tu imagen de evento
    bgColor: "#2b91d9", // Azul del fondo de la imagen
  },
  {
    id: 3,
    title: "Masterclass: Últimas Tendencias en Polygel",
    date: "12 Sep 2025",
    author: "Mentora Camila G.",
    image:
      "https://i.pinimg.com/1200x/2f/14/99/2f14995aa38ad7204489eec442b0ad85.jpg", // Reemplaza con tu imagen de evento
    bgColor: "#33a362", // Verde del fondo de la imagen
  },
];

const LatestEventsSection = () => {
  const theme = useTheme();

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
                borderRadius: "16px",
                boxShadow: theme.shadows[4],
                overflow: "hidden",
                minHeight: 450, // Altura para mantener uniformidad
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Media con el color de fondo de la imagen */}
              <Box
                sx={{
                  backgroundColor: event.bgColor,
                  height: 250,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CardMedia
                  component='img'
                  image={event.image}
                  alt={event.title}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>

              <CardContent
                sx={{
                  p: 3,
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Metadatos (Fecha y Autor) */}
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant='caption'
                    color='text.secondary'
                    sx={{ mr: 2 }}
                  >
                    {event.date}
                  </Typography>
                  <Typography
                    variant='caption'
                    color='#E53888'
                    sx={{ fontWeight: 600 }}
                  >
                    | Por {event.author}
                  </Typography>
                </Box>

                {/* Título del Evento */}
                <Typography
                  variant='h6'
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    lineHeight: 1.3,
                    flexGrow: 1,
                  }}
                >
                  {event.title}
                </Typography>

                {/* Botón de Leer / Ver Evento */}
                <Button
                  variant='text'
                  sx={{
                    color: "#E53888", // Color amarillo para el texto del botón
                    fontWeight: 600,
                    alignSelf: "flex-start",
                    padding: 0,
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "transparent",
                      textDecoration: "none",
                    },
                  }}
                >
                  Continuar Leyendo
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* --- Botón de Ver Todos los Eventos --- */}
      <Box sx={{ textAlign: "center", mt: 6 }}>
        <Button
          variant='contained'
          endIcon={<ArrowForwardIcon />}
          sx={{
            backgroundColor: "#E53888", // Rosa principal
            color: "white",
            "&:hover": {
              backgroundColor: "#E53888",
            },
            fontWeight: 600,
            padding: "12px 30px",
            borderRadius: "8px",
            textTransform: "none",
          }}
        >
          Ver Todos los Eventos
        </Button>
      </Box>
    </Box>
  );
};

export default LatestEventsSection;
