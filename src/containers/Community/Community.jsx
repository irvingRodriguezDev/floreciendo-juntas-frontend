import { useContext, useEffect } from "react";
import { Typography, Grid, Backdrop, Paper, Button, Box } from "@mui/material";
import Layout from "../../components/Layout/Layout";
import AuthContext from "../../context/Auth/AuthContext";
import { Link } from "react-router-dom";
import CommunityRulesAccordion from "./CommunityRulesAccordeon";
import TabsTypeCommunity from "../../components/Community/TabsTypeCommunity";

const Community = () => {
  const { autenticado, usuario } = useContext(AuthContext);
  const isSuscribed = usuario?.isSubscribed || false;
  const isAuthorized = autenticado && isSuscribed;

  return (
    <Layout>
      <Box
        sx={{
          py: 4,
          px: 2,
          maxWidth: "lg",
          mx: "auto",
          position: "relative",
          // 🔥 DESACTIVA EL SCROLL AQUÍ:
          // Si no está autorizado, el alto se bloquea al tamaño de la pantalla
          // y se oculta el desbordamiento, pero el Layout (Navbar) queda fuera de esto.
          height: !isAuthorized ? "calc(100vh - 64px)" : "auto",
          overflow: !isAuthorized ? "hidden" : "visible",
        }}
      >
        {/* HEADER SECCION */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant='h4' fontWeight='bold' sx={{ color: "#D82E7A" }}>
            Floreciendo Juntas 🌷
          </Typography>
          <Typography variant='body1' sx={{ color: "#777", mt: 1 }}>
            Un espacio seguro para compartir, aprender y crecer juntas.
          </Typography>
        </Box>

        {/* CONTENIDO PRINCIPAL */}
        <Grid container justifyContent='center' sx={{ mt: -6 }}>
          <Grid item xs={12} sm={8} md={6}>
            <CommunityRulesAccordion />
            <Box sx={{ mt: 2 }}>
              <TabsTypeCommunity />
            </Box>
          </Grid>
        </Grid>

        {/* BLOQUEO LOCALIZADO */}
        {!isAuthorized && (
          <Backdrop
            open
            sx={{
              position: "absolute", // Importante: absoluto para no tapar el Navbar
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 10, // Suficiente para tapar el contenido interno, insuficiente para el Navbar
              background: "rgba(255,240,247,0.85)",
              backdropFilter: "blur(14px)",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Paper
              elevation={10}
              sx={{
                p: 5,
                borderRadius: "24px",
                maxWidth: 450,
                textAlign: "center",
                mx: 2,
                border: "1px solid rgba(216, 46, 122, 0.2)",
              }}
            >
              <Typography
                variant='h5'
                fontWeight='bold'
                sx={{ color: "#D82E7A", mb: 2 }}
              >
                Atención 💗
              </Typography>

              <Typography variant='body1' sx={{ color: "#555", mb: 3 }}>
                Para participar en la comunidad necesitas
                {!autenticado ? (
                  <strong> iniciar sesión</strong>
                ) : (
                  <strong> una suscripción activa</strong>
                )}
              </Typography>

              <Button
                component={Link}
                to={!autenticado ? "/iniciar-sesion" : "/suscribirme"}
                variant='contained'
                fullWidth
                sx={{
                  bgcolor: "#D82E7A",
                  borderRadius: "12px",
                  py: 1.5,
                  fontWeight: "bold",
                  "&:hover": { bgcolor: "#b52264" },
                }}
              >
                {!autenticado ? "Iniciar sesión" : "Suscribirme ahora"}
              </Button>
            </Paper>
          </Backdrop>
        )}
      </Box>
    </Layout>
  );
};

export default Community;
