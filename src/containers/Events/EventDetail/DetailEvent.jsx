import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Chip,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Layout from "../../../components/Layout/Layout";
import CardEvent from "../../../components/events/CardEvent";
import EventsContext from "../../../context/Events/EventsContext";
import { Link, useParams } from "react-router-dom";
import FormatDate from "../../../utils/FormatDate";
import AuthContext from "../../../context/Auth/AuthContext";
import MethodGet from "../../../config/Service";
import PinkSpinner from "../../../components/Loading/PinkSpinner";
import { formatMexicanCurrency } from "../../../utils/FormatCurrency";
const inputStyles = {
  mb: 2,
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    "& fieldset": { borderColor: "rgba(216,46,136,0.3)" },
    "&:hover fieldset": { borderColor: "#D82E7A" },
    "&.Mui-focused fieldset": { borderColor: "#D82E7A" },
  },
  "& .MuiInputBase-input": { color: "black" },
  "& .MuiInputLabel-root": { color: "#D82E7A" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#D82E7A" },
};
const DetailEvent = () => {
  const { id } = useParams();
  const { event, getEventById, buyTicket } = useContext(EventsContext);
  const { usuario, autenticado } = useContext(AuthContext);
  const [similarEvents, setSimilarEvents] = useState(null);
  // Estado
  const [quantity, setQuantity] = useState(1);

  // Handler con validación estricta
  const handleChangeQuantity = (e) => {
    const value = e.target.value;

    // Permitir campo vacío mientras escribe
    if (value === "") {
      setQuantity("");
      return;
    }

    const parsed = parseInt(value, 10);

    // Rechazar si no es número entero o está fuera de rango
    if (isNaN(parsed) || parsed < 1 || parsed > 10) return;

    setQuantity(parsed);
  };

  useEffect(() => {
    getEventById(id);

    MethodGet(`/events/similar/${id}`)
      .then((res) => setSimilarEvents(res.data.similarEvents))
      .catch(() => setSimilarEvents([]));
  }, [id]);

  if (!event) return <PinkSpinner />;

  const data = autenticado
    ? {
        eventId: id,
        buyerName: usuario?.name ?? "",
        buyerEmail: usuario?.email ?? "",
        quantity: quantity,
      }
    : {};

  return (
    <Layout>
      <Box
        sx={{
          width: "100%",
          px: { xs: 2, md: 6 },
          pt: { xs: 12, md: 10 },
          pb: 6,
          background: "linear-gradient(180deg, #FFF4FA 0%, #FFFFFF 100%)",
        }}
      >
        {/* HERO */}
        <Box sx={{ maxWidth: 1200, mx: "auto", mb: 5 }}>
          <Box
            sx={{
              position: "relative",
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 12px 32px rgba(229,56,136,0.25)",
            }}
          >
            <CardMedia
              component='img'
              image={event.image}
              alt={event.title}
              sx={{
                width: "100%",
                height: { xs: 260, sm: 360, md: 460 },
                aspectRatio: "16 / 10",
              }}
            />
          </Box>
        </Box>

        <Grid container spacing={4} sx={{ maxWidth: 1200, mx: "auto" }}>
          {/* IZQUIERDA */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography
              variant='h3'
              sx={{
                fontWeight: 600,
                color: "#E53888",
                mb: 2,
              }}
            >
              {event.title}
            </Typography>

            {/* INFO */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
              <Chip label={`📅 ${FormatDate(event.startDate)}`} />
              <Chip label={`⏰ ${event.time}`} />
              <Chip label={`📍 ${event.location}`} />
            </Box>

            {/* DESCRIPCIÓN */}
            <Card
              sx={{
                mb: 4,
                p: 3,
                borderRadius: "20px",
                boxShadow: "0 8px 24px rgba(229,56,136,0.12)",
              }}
            >
              <Typography
                variant='h6'
                sx={{ fontWeight: 700, mb: 2, color: "#351C43" }}
              >
                Sobre este evento
              </Typography>

              <Box
                sx={{
                  color: "#4a3a50",
                  lineHeight: 1.7,
                  "& p": { mb: 1.5 },
                }}
                dangerouslySetInnerHTML={{ __html: event.description }}
              />
            </Card>

            {/* MAPA */}
            {event.map && (
              <Card
                sx={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 8px 24px rgba(229,56,136,0.12)",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: { xs: 280, md: 380 },
                    "& iframe": {
                      width: "100%",
                      height: "100%",
                      border: 0,
                    },
                  }}
                  dangerouslySetInnerHTML={{ __html: event.map }}
                />
              </Card>
            )}
          </Grid>

          {/* DERECHA – COMPRA */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                p: 3,
                borderRadius: "24px",
                position: "sticky",
                top: 120,
                boxShadow: "0 12px 32px rgba(229,56,136,0.18)",
              }}
            >
              <Typography
                variant='h6'
                sx={{ fontWeight: 700, color: "#E53888", mb: 2 }}
              >
                🎟️ Detalles del evento
              </Typography>

              <Typography sx={{ mb: 1 }}>
                Boletos disponibles: <strong>{event.availableTickets}</strong>
              </Typography>

              <Typography sx={{ mb: 3 }}>
                Precio:{" "}
                <strong>{formatMexicanCurrency(event.price)} MXN</strong>
              </Typography>

              {autenticado ? (
                <>
                  <Box sx={{ padding: "10px" }}>
                    <TextField
                      type='number' // 🔑 Cambia a number
                      onChange={handleChangeQuantity}
                      fullWidth
                      variant='outlined'
                      label='Cantidad de boletos'
                      value={quantity} // 🔑 Cambia defaultValue → value (controlled)
                      inputProps={{
                        min: 1,
                        max: 10,
                        step: 1,
                      }}
                      sx={inputStyles}
                    />
                  </Box>
                  <Button
                    fullWidth
                    onClick={() => buyTicket(data)}
                    sx={{
                      bgcolor: "#E53888",
                      color: "white",
                      borderRadius: "30px",
                      py: 1.4,
                      fontWeight: 700,
                      textTransform: "none",
                      "&:hover": { bgcolor: "#d12a74" },
                    }}
                  >
                    Comprar boleto
                  </Button>
                </>
              ) : (
                <Link to='/iniciar-sesion'>
                  <Button
                    fullWidth
                    sx={{
                      bgcolor: "#E53888",
                      color: "white",
                      borderRadius: "30px",
                      py: 1.4,
                      fontWeight: 700,
                      textTransform: "none",
                    }}
                  >
                    Iniciar sesión para comprar
                  </Button>
                </Link>
              )}
            </Card>
          </Grid>
        </Grid>

        {/* EVENTOS SIMILARES */}
        <Divider sx={{ my: 6 }}>
          <Chip
            label='Eventos Similares'
            variant='outlined'
            sx={{ color: "#E53888", borderColor: "#E53888", fontWeight: 700 }}
          />
        </Divider>

        <Grid container spacing={3} sx={{ maxWidth: 1200, mx: "auto" }}>
          {similarEvents?.length ? (
            similarEvents.map((e) => (
              <Grid item xs={12} sm={6} md={4} key={e.id}>
                <CardEvent event={e} />
              </Grid>
            ))
          ) : (
            <Typography textAlign='center' width='100%'>
              No se encontraron eventos similares 🌷
            </Typography>
          )}
        </Grid>
      </Box>
    </Layout>
  );
};

export default DetailEvent;
