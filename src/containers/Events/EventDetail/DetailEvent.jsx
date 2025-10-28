import React, { useContext, useEffect } from "react";
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
import { useParams } from "react-router-dom";
import FormatDate from "../../../utils/FormatDate";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { formatMexicanCurrency } from "../../../utils/FormatCurrency";
const DetailEvent = () => {
  const { id } = useParams();
  const { event, getEventById } = useContext(EventsContext);

  useEffect(() => {
    getEventById(id);
  }, [id]);

  const similarEvents = [
    {
      img: "https://histudy.pixcelsthemes.com/livepreview/histudy/assets/images/event/grid-type-01.jpg",
      title: "International Education Fair 2024",
      date: "11 Jan 2024",
      time: "8:00 am - 5:00 pm",
      location: "IAC Building",
      id: 1,
    },
    {
      img: "https://histudy.pixcelsthemes.com/livepreview/histudy/assets/images/event/grid-type-02.jpg",
      title: "Global Technology Summit",
      date: "15 Feb 2024",
      time: "9:00 am - 6:00 pm",
      location: "Tech Expo Center",
      id: 2,
    },
  ];

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

                <Typography
                  variant='body1'
                  sx={{ color: "#444", mb: 3, lineHeight: 1.7 }}
                >
                  {event.description}
                </Typography>

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
                item
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
                  <CalendarTodayIcon sx={{ color: "#E53888" }} />
                  <Typography variant='body1' color='#555'>
                    {FormatDate(event.startDate)}{" "}
                    {event.endDate ? "- " + FormatDate(event.endDate) : ""}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <AccessTimeIcon sx={{ color: "#E53888" }} />
                  <Typography variant='body1' color='#555'>
                    {event.time}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <PlaceIcon sx={{ color: "#E53888" }} />
                  <Typography variant='body1' color='#555'>
                    {event.location}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <MonetizationOnIcon sx={{ color: "#E53888" }} />
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
                  floreceremos juntas 💖
                </Typography>

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
                  Comprar boleto
                </Button>
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
                {similarEvents.map((e) => (
                  <Grid item xs={12} sm={6} key={e.id}>
                    <CardEvent event={e} />
                  </Grid>
                ))}
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
