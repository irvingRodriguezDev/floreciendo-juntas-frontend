import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Grid,
  Typography,
  Paper,
} from "@mui/material";
import Layout from "../../../components/Layout/Layout";
import CardEvent from "../../../components/events/CardEvent";
import EventsContext from "../../../context/Events/EventsContext";
import { Link, useParams } from "react-router-dom";
import FormatDate from "../../../utils/FormatDate";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { formatMexicanCurrency } from "../../../utils/FormatCurrency";
import AuthContext from "../../../context/Auth/AuthContext";
import MethodGet from "../../../config/Service";
const DetailEvent = () => {
  const { id } = useParams();
  const { event, getEventById, buyTicket } = useContext(EventsContext);
  const { usuario, autenticado } = useContext(AuthContext);
  const [similarEvents, setSimilarEvents] = useState(null);
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
  }, [id]);

  const data = {};
  if (autenticado) {
    data.eventId = id;
    (data.buyerName = usuario.name ?? ""),
      (data.buyerEmail = usuario.email ?? "");
  }

  return (
    <Layout>
      {event && (
        <>
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
            {/* Imagen destacada */}
            <Box
              component='img'
              src={event.image}
              alt={event.title}
              sx={{
                width: "100%",
                maxWidth: "1200px",
                height: { xs: 250, md: 400 },
                objectFit: "cover",
                borderRadius: "20px",
                boxShadow: "0 8px 24px rgba(229, 56, 136, 0.2)",
              }}
            />

            {/* Contenido principal */}
            <Grid
              container
              spacing={4}
              sx={{
                mt: 4,
                maxWidth: "1200px",
              }}
            >
              {/* Información principal */}
              <Grid size={{ xs: 12, md: 8 }}>
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

                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: { xs: 300, md: 450, overflowY: "scroll" },

                    "& iframe": {
                      border: 0,
                      width: "100% !important",
                      height: "100% !important",
                      borderRadius: "12px",
                    },
                  }}
                  dangerouslySetInnerHTML={{ __html: event.description }}
                />

                <Divider sx={{ my: 3 }} />

                {/* Info de fecha, hora y lugar */}
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
                >
                  {event.map && (
                    <>
                      {" "}
                      <Typography
                        variant='h5'
                        sx={{
                          textAlign: "center",
                          fontWeight: "bold",
                          color: "#E53888",
                        }}
                      >
                        📍 Ubicación del evento
                      </Typography>
                      <Box
                        sx={{
                          mt: 6,
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
                              borderRadius: "12px",
                            },
                          }}
                          dangerouslySetInnerHTML={{ __html: event.map }}
                        />
                      </Box>
                    </>
                  )}
                </Box>
              </Grid>

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
                  Reserva tu lugar y sé parte de esta experiencia única donde
                  tod@s floreceremos juntas 💖🌸
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
            {/* Sección del mapa */}
          </Box>
          {/* Contenido principal */}
          <Grid
            container
            spacing={4}
            justifyContent='center'
            sx={{ mt: { xs: 3, md: 6 }, mb: 6, px: { xs: 2, md: 6 } }}
          >
            {/* Columna izquierda */}
            <Grid size={{ xs: 12, md: 8 }}>
              {/* Descripción */}

              {/* Eventos similares */}
              <Divider sx={{ my: 4 }}>
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

              <Grid container spacing={3}>
                {similarEvents && similarEvents.length > 0 ? (
                  similarEvents.map((e) => (
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
            </Grid>

            {/* Columna derecha */}
          </Grid>
        </>
      )}
    </Layout>
  );
};

export default DetailEvent;
