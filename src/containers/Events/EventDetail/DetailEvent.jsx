import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Typography,
  useMediaQuery, // 👈 Importado
  useTheme, // 👈 Importado
} from "@mui/material";
import Layout from "../../../components/Layout/Layout";
import CardEvent from "../../../components/events/CardEvent";
import EventsContext from "../../../context/Events/EventsContext";
import { Link, useParams } from "react-router-dom";
import FormatDate from "../../../utils/FormatDate";
import AuthContext from "../../../context/Auth/AuthContext";
import MethodGet from "../../../config/Service";
import PinkSpinner from "../../../components/Loading/PinkSpinner";
import { getImageUrl } from "../../../utils/Image"; // 👈 Importación de la utilidad
import { formatMexicanCurrency } from "../../../utils/FormatCurrency";

const DetailEvent = () => {
  const { id } = useParams();
  const { event, getEventById, buyTicket } = useContext(EventsContext);
  const { usuario, autenticado } = useContext(AuthContext);
  const [similarEvents, setSimilarEvents] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  // 💡 Lógica para determinar el ancho óptimo de la imagen principal
  const getOptimalWidth = () => {
    // La imagen principal debe ser grande, adaptándose al max-width de 1200px
    if (isMobile) return 800;
    if (isTablet) return 1200;
    return 1400; // Pedimos un poco más grande para pantallas de alta densidad
  };

  const optimalWidth = getOptimalWidth();
  const imageQuality = 80; // Calidad media-alta para una imagen principal

  useEffect(() => {
    getEventById(id);
    if (similarEvents == null) {
      let url = `/events/similar/${id}`;
      MethodGet(url)
        .then((res) => {
          setSimilarEvents(res.data.similarEvents);
        })
        .catch((error) => {
          console.log("No se encontraron eventos similares", error);
        });
    }
  }, [id, similarEvents]); // Dependencias corregidas: similarEvents agregado

  const data = {};
  if (autenticado) {
    data.eventId = id;
    data.buyerName = usuario?.name ?? "";
    data.buyerEmail = usuario?.email ?? "";
  }

  // Si el evento aún no se ha cargado, mostrar Spinner
  if (!event) {
    return <PinkSpinner />;
  }

  return (
    <Layout>
      {/* HERO con degradado */}
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: { xs: 4, md: 8 },
          px: { xs: 2, md: 8 },
          marginTop: { xs: 12, md: 10 },
        }}
      >
        {/* Imagen destacada - Optimizada con CloudFront */}
        <Box
          sx={{
            width: "100%",
            maxWidth: "1200px",
            aspectRatio: "16/9", // fuerza la proporción correcta
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 8px 24px rgba(229, 56, 136, 0.2)",
          }}
        >
          <Box
            component='img'
            // 🚨 CORRECCIÓN CLAVE: Usar getImageUrl con el path y dimensiones óptimas
            src={getImageUrl(event.image, optimalWidth, imageQuality)}
            alt={event.title}
            loading='eager' // La hero image es importante, no usar lazy
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>

        {/* Contenido principal */}
        <Grid
          container
          spacing={4}
          sx={{
            mt: 4,
            maxWidth: "1200px",
          }}
        >
          {/* Columna izquierda: Título y Descripción/Mapa */}
          <Grid size={{ xs: 12, sm: 8 }}>
            <Typography
              variant='h3'
              sx={{
                fontWeight: "bold",
                color: "#E53888",
                mb: 2,
              }}
            >
              {event.title}
            </Typography>

            {/* Descripción del evento (HTML inyectado) */}
            <Box
              sx={{
                position: "relative",
                width: "100%",
                textAlign: "justify",
                // Altura responsiva y scrollable solo si es necesario
                maxHeight: { xs: 300, md: 650 },
                overflowY: "auto",
              }}
              dangerouslySetInnerHTML={{ __html: event.description }}
            />

            <Divider sx={{ my: 3 }} />

            {/* Info de mapa */}
            <Box
              sx={{
                width: "100%",
                maxWidth: "1000px",
                mx: "auto",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid #f1c4d9",
                boxShadow: "0 8px 20px rgba(229, 56, 136, 0.1)",
                bgcolor: "white",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: { xs: 300, md: 450 },
                  "& iframe": {
                    border: 0,
                    width: "100% !important",
                    height: "100% !important",
                  },
                }}
                // CLAVE: Inyección segura del HTML del mapa (iframe)
                dangerouslySetInnerHTML={{ __html: event.map }}
              />
            </Box>
          </Grid>

          {/* Columna derecha: Compra y Detalles */}
          <Grid
            size={{ xs: 12, md: 4 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: { xs: "center", md: "flex-start" },
              gap: 2,
            }}
          >
            <Typography
              variant='h6'
              sx={{
                fontWeight: "bold",
                color: "#E53888",
                textAlign: { xs: "center", md: "left" },
              }}
            >
              ¡Acompáñanos en este evento especial! 🌷
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              📅
              <Typography variant='body1' color='#555'>
                {FormatDate(event.startDate)}{" "}
                {event.endDate ? "- " + FormatDate(event.endDate) : ""}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              ⏰
              <Typography variant='body1' color='#555'>
                {event.time}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              📍
              <Typography variant='body1' color='#555'>
                {event.location}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              🎟️
              <Typography variant='body1' color='#555'>
                {event.availableTickets} boletos disponibles
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              💲
              <Typography variant='body1' color='#555'>
                {formatMexicanCurrency(event.price)} MXN
              </Typography>
            </Box>

            <Typography
              variant='body2'
              sx={{
                color: "#555",
                textAlign: { xs: "center", md: "left" },
              }}
            >
              Reserva tu lugar y sé parte de esta experiencia única donde tod@s
              floreceremos juntas 💖🌸
            </Typography>
            {autenticado ? (
              <Button
                variant='contained'
                onClick={() => buyTicket(data)}
                sx={{
                  bgcolor: "#E53888",
                  color: "white",
                  borderRadius: "50px",
                  px: 4,
                  py: 1.2,
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  "&:hover": {
                    bgcolor: "#d12a74",
                  },
                }}
              >
                Comprar boleto
              </Button>
            ) : (
              <Link to='/iniciar-sesion'>
                <Button
                  variant='contained'
                  sx={{
                    bgcolor: "#E53888",
                    color: "white",
                    borderRadius: "50px",
                    px: 4,
                    py: 1.2,
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    "&:hover": {
                      bgcolor: "#d12a74",
                    },
                  }}
                >
                  Iniciar sesión para comprar
                </Button>
              </Link>
            )}
          </Grid>
        </Grid>

        {/* --- Eventos Similares --- */}
        <Divider sx={{ my: 6, width: "100%", maxWidth: "1200px" }}>
          <Chip
            label='Eventos Similares'
            sx={{
              fontWeight: "bold",
              px: 2,
              color: "#E53888",
              borderColor: "#E53888",
            }}
            variant='outlined'
          />
        </Divider>

        <Grid
          container
          spacing={3}
          justifyContent='center'
          sx={{ maxWidth: "1200px", width: "100%", mb: 6 }}
        >
          {similarEvents && similarEvents.length > 0 ? (
            similarEvents.map((e) => (
              // Asumimos que CardEvent ya usa getImageUrl internamente (como corregimos antes)
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={e.id}>
                <CardEvent event={e} />
              </Grid>
            ))
          ) : (
            <Grid size={12}>
              <Typography
                variant='body1'
                color='text.primary'
                textAlign='center'
              >
                No se encontraron eventos similares 🥺
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Layout>
  );
};

export default DetailEvent;
