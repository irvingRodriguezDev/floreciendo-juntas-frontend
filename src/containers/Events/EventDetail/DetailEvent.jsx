import {
  Box,
  Button,
  Card,
  CardMedia,
  Chip,
  Divider,
  Grid,
  Paper,
  Typography,
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
      title: "International Education Fair 2024",
      date: "15 Feb 2024",
      time: "8:00 am - 5:00 pm",
      location: "IAC Building",
      id: 2,
    },
  ];

  return (
    <Layout>
      {/* Header */}
      <Grid container spacing={2}>
        <Grid size={12}>
          <Paper sx={{ width: "100%", color: "white", padding: 2 }}>
            <Typography
              variant='h4'
              color='black'
              textAlign='left'
              paddingLeft={2}
            >
              Nombre del evento
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Contenido principal */}
      <Grid container spacing={2} sx={{ padding: 2 }}>
        {/* Columna izquierda */}
        <Grid size={8}>
          <Box sx={{ bgcolor: "#333", p: 2 }}>
            <Grid container spacing={2}>
              {/* Imagen */}
              <Grid size={12} sx={{ bgcolor: "gray", p: 1 }}>
                <Card>
                  <CardMedia
                    component='img'
                    height='auto'
                    width='auto'
                    image='https://histudy.pixcelsthemes.com/livepreview/histudy/assets/images/event/grid-type-01.jpg'
                    alt='evento-name'
                  />
                </Card>
              </Grid>

              {/* Contenido */}
              <Grid size={12} sx={{ bgcolor: "yellow", p: 2 }}>
                EventContent
              </Grid>
              <Grid size={12} sx={{ bgcolor: "red", p: 2 }}>
                Event description
              </Grid>

              {/* Eventos similares */}
              <Grid size={12}>
                <Divider>
                  <Chip
                    label='Eventos Similares'
                    sx={{ color: "white", backgroundColor: "green" }}
                  />
                </Divider>
              </Grid>

              <Grid size={12}>
                <Grid container spacing={2} sx={{ justifyContent: "center" }}>
                  {similarEvents.map((e) => (
                    <Grid size={6} key={e.id}>
                      <CardEvent event={e} />
                    </Grid>
                  ))}
                  <Button variant='contained' size='large'>
                    Ver más eventos
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* Columna derecha sticky */}
        <Grid size={4}>
          <Box sx={{ position: "relative", height: "100%" }}>
            <Box
              sx={{
                position: "sticky",
                top: 20,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {[1, 2, 3, 4].map((item) => (
                <Box
                  key={item}
                  sx={{
                    bgcolor: "#111",
                    color: "white",
                    p: 3,
                    borderRadius: 2,
                    textAlign: "center",
                  }}
                >
                  Item {item}
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default DetailEvent;
