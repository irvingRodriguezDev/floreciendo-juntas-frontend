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
  useMediaQuery,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EventsContext from "../../context/Events/EventsContext";
import FormatDate from "../../utils/FormatDate";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../utils/Image";

const LatestEventsSection = () => {
  const { events, getLatestEvents } = useContext(EventsContext);
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg")); // Usar 'up' para desktop

  useEffect(() => {
    getLatestEvents();
  }, [getLatestEvents]); // Asegúrate de incluir getLatestEvents en las dependencias

  const primaryPink = "#e91e63";
  const lightYellow = "#ffecb3";

  // Función para determinar el ancho óptimo de la imagen basado en el viewport
  const getOptimalWidth = () => {
    // Pedir un ancho que sea apropiado para una de las 3-4 columnas de la cuadrícula
    if (isMobile) return 400;
    if (isTablet) return 500;
    if (isDesktop) return 350; // Al tener 4 columnas, el ancho de cada una es menor
    return 450;
  };

  const optimalWidth = getOptimalWidth();
  const imageQuality = 85;

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper || "#ffffff",
        padding: theme.spacing(8, 4),
      }}
    >
      {/* --- Encabezado de la Sección --- */}
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
          Próximos{" "}
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
                backgroundColor: lightYellow,
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
        {!events.length ? (
          <Box sx={{ p: 4 }}>
            {/* Mostrar un spinner o el mensaje si no hay eventos */}
            {/* 💡 Sugerencia: Usar un componente de PinkSpinner aquí */}
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
              😔No tenemos eventos{" "}
              <span
                style={{
                  position: "relative",
                  display: "inline-block",
                  textDecoration: "none",
                }}
              >
                disponibles😔
                <Box
                  component='span'
                  sx={{
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    width: "100%",
                    height: "8px",
                    backgroundColor: lightYellow,
                    zIndex: -1,
                    opacity: 0.7,
                    borderRadius: "4px",
                  }}
                />
              </span>
            </Typography>
          </Box>
        ) : (
          events.map((event) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={event.id}>
              {" "}
              {/* 💡 CLAVE: Usar 'item' y breakpoints */}
              <Card
                sx={{
                  borderRadius: "24px",
                  boxShadow: "0 4px 16px rgba(229, 56, 136, 0.15)",
                  overflow: "hidden",
                  // ❌ ELIMINAR minHeight: 460 para dejar que el contenido defina la altura
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 8px 24px rgba(229, 56, 136, 0.25)",
                  },
                  backgroundColor: "#fffdfd",
                  height: "100%", // Asegura que las tarjetas se alineen en la altura de la fila
                }}
              >
                {/* 🖼️ Contenedor de Imagen (Ahora con Proporción) */}
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    // 💡 CLAVE: Usar padding-top para forzar una proporción 2:3 (vertical)
                    // 150% = Altura es 1.5 veces el ancho (Típico para imágenes de retrato)
                    paddingTop: "100%",
                    overflow: "hidden",
                  }}
                >
                  <CardMedia
                    component='img'
                    image={getImageUrl(event.image, optimalWidth, imageQuality)}
                    alt={event.title}
                    sx={{
                      position: "absolute", // Necesario para la técnica de padding-top
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%", // Ahora 100% de la altura de 'paddingTop' (la proporción 2:3)
                      objectFit: "cover", // Esto recorta si la imagen no es 2:3, pero garantiza llenar el espacio
                      borderRadius: "0",
                      transition: "transform 0.5s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  />

                  {/* Detalle floral sutil (mantenido) */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      width: "100%",
                      height: "60px",
                      background:
                        "linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.8) 100%)",
                      zIndex: 2, // Asegura que esté por encima de la imagen
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
          ))
        )}
      </Grid>

      {/* --- Botón de Ver Todos los Eventos --- */}
      {events.length > 0 && (
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Link to='/eventos'>
            <Button
              variant='contained'
              endIcon={<ArrowForwardIcon />}
              sx={{
                backgroundColor: "#E53888",
                color: "white",
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
      )}
    </Box>
  );
};

export default LatestEventsSection;
