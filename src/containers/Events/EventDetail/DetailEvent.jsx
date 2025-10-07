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
import React from "react";
import Layout from "../../../components/Layout/Layout";
import CardEvent from "../../../components/events/CardEvent";

const DetailEvent = () => {
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
      {/* Hero compacto */}
      <Box sx={{ position: "relative", height: "30vh", mt: 8 }}>
        <CardMedia
          component='img'
          image='https://histudy.pixcelsthemes.com/livepreview/histudy/assets/images/event/grid-type-01.jpg'
          alt='Evento'
          sx={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            borderRadius: 0,
            filter: "brightness(65%)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            color: "white",
          }}
        >
          <Typography variant='h3' fontWeight='bold'>
            Nombre del evento
          </Typography>
          <Typography variant='subtitle1' sx={{ mt: 1 }}>
            11 de Enero 2024 | IAC Building
          </Typography>
        </Box>
      </Box>

      {/* Contenido principal */}
      <Grid container spacing={4} justifyContent='center' sx={{ mt: 4 }}>
        {/* Columna izquierda */}
        <Grid item xs={12} md={8}>
          {/* Sobre el evento */}
          <Paper
            elevation={0}
            sx={{
              mb: 4,
              borderRadius: 2,
              p: 3,
              border: "1px solid #eee",
              bgcolor: "#fafafa",
            }}
          >
            <Typography variant='h5' fontWeight='bold' gutterBottom>
              Sobre el evento
            </Typography>
            <Typography variant='body1' color='text.secondary'>
              Este evento conecta a estudiantes, universidades y empresas de
              tecnología. Habrá más de 30 expositores, talleres prácticos y
              ponencias internacionales.
            </Typography>
          </Paper>

          {/* Agenda */}
          <Paper
            elevation={0}
            sx={{
              mb: 4,
              borderRadius: 2,
              p: 3,
              border: "1px solid #eee",
            }}
          >
            <Typography variant='h5' fontWeight='bold' gutterBottom>
              Agenda
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              📌 8:00 am - Registro <br />
              📌 9:00 am - Conferencia de apertura <br />
              📌 11:00 am - Talleres <br />
              📌 2:00 pm - Networking <br />
              📌 5:00 pm - Clausura
            </Typography>
          </Paper>

          {/* Eventos similares */}
          <Divider sx={{ my: 4 }}>
            <Chip
              label='Eventos Similares'
              sx={{ fontWeight: "bold", px: 2 }}
              color='secondary'
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

          <Box textAlign='center' sx={{ mt: 3 }}>
            <Button
              variant='contained'
              size='large'
              sx={{
                borderRadius: 3,
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Ver más eventos
            </Button>
          </Box>
        </Grid>

        {/* Columna derecha sticky */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              position: "sticky",
              top: 100,
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            {/* Info general */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2,
                border: "1px solid #eee",
                bgcolor: "#fff",
              }}
            >
              <Typography
                variant='h6'
                fontWeight='bold'
                gutterBottom
                textAlign='center'
              >
                Información del Evento
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                📍 IAC Building
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                📅 11 Enero 2024
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                🕒 8:00 am - 5:00 pm
              </Typography>
              <Button
                variant='contained'
                fullWidth
                sx={{ mt: 2, borderRadius: 2, textTransform: "none" }}
              >
                Registrarme
              </Button>
            </Paper>

            {/* Extra info / recomendaciones */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2,
                border: "1px solid #eee",
                bgcolor: "#fafafa",
              }}
            >
              <Typography variant='subtitle1' fontWeight='bold' gutterBottom>
                Recomendaciones
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                ✅ Llegar 30 min antes <br />
                ✅ Traer identificación <br />✅ Usar ropa cómoda
              </Typography>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default DetailEvent;
