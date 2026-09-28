import React, { useContext } from "react";
import { Box, Grid, Typography, Container, styled } from "@mui/material";
import Layout from "../components/Layout/Layout";
import AuthContext from "../context/Auth/AuthContext";
import SubscriptionForm from "../components/Payment/SubscriptionButton";
// 🏛️ Paleta "Quiet Luxury" & Editorial (Floreciendo Juntas Edición de Lujo)
const COLORS = {
  bgCanvas: "#FEF0F7", // Fondo color lino / arena ultra suave y cálido
  cardBase: "#FFFFFF", // Blanco puro para la tarjeta principal
  champagneGold: "#d82e7a", // Oro champaña mate (reemplaza al rosa chillón)
  plumDeep: "#2A1B24", // Ciruela/Vino profundo (reemplaza al negro para el texto)
  textMuted: "#7A6E75", // Gris topo para textos secundarios
  borderFine: "rgba(216, 46, 122, 0.25)", // Borde oro sutil
};

const Background = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  background: COLORS.bgCanvas,
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(10, 2),
  position: "relative",

  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(6, 1.5),
  },
}));

// 🌟 Contenedor estilo Atelier / Alta Costura
const CardWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: COLORS.cardBase,
  borderRadius: "20px", // Bordes más arquitectónicos y menos redondeados/infantiles
  padding: theme.spacing(8, 6),
  boxShadow: "0 30px 70px rgba(42, 27, 36, 0.04)", // Sombra hiper sutil y difuminada
  border: `1px solid ${COLORS.borderFine}`,
  position: "relative",

  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(5, 3),
  },

  // Un marco interno clásico de las papelerías de lujo
  "&::before": {
    content: '""',
    position: "absolute",
    top: "16px",
    left: "16px",
    right: "16px",
    bottom: "16px",
    border: `1px solid rgba(216, 46, 122, 0.15)`,
    borderRadius: "14px",
    pointerEvents: "none",
  },
}));

const SubscriptionScreen = ({ children }) => {
  const { usuario } = useContext(AuthContext);

  return (
    <Layout>
      <Background>
        <Container maxWidth='sm'>
          {" "}
          {/* Bajamos a 'sm' para que se vea más recogido y premium */}
          <CardWrapper>
            <Grid container spacing={4} justifyContent='center'>
              {/* 🌸 Identidad Visual Minimalista */}
              <Grid size={12} textAlign='center'>
                {/* Isotipo minimalista: Reemplazamos el ícono tosco por un monograma o detalle textil */}
                <Typography
                  sx={{
                    fontFamily: "serif",
                    fontSize: "1.5rem",
                    color: COLORS.champagneGold,
                    letterSpacing: "0.3em",
                    mb: 2,
                    fontWeight: 300,
                  }}
                >
                  F ✦ J
                </Typography>

                {/* <Typography
                  component='h1'
                  sx={{
                    fontWeight: 400,
                    color: COLORS.plumDeep,
                    fontSize: "clamp(2rem, 4vw, 2.6rem)",
                    letterSpacing: "0.04em",
                    lineHeight: 1.3,
                    fontFamily:
                      "'Playfair Display', 'Didot', 'Bodoni MT', serif",
                    textTransform: "uppercase", // El uppercase le da el toque editorial instantáneo
                  }}
                >
                  Florece Contigo
                </Typography> */}

                {/* Separador fino estilo boutique */}
                <Box
                  sx={{
                    width: 40,
                    height: "1px",
                    backgroundColor: COLORS.champagneGold,
                    mx: "auto",
                    my: 3,
                  }}
                />

                <Typography
                  sx={{
                    color: COLORS.textMuted,
                    maxWidth: 440,
                    mx: "auto",
                    fontSize: "1rem",
                    lineHeight: 1.8,
                    fontWeight: 300,
                    letterSpacing: "0.01em",
                  }}
                >
                  Aprende, conecta y expande tu negocio a tu ritmo junto a una
                  comunidad selecta de emprendedoras.
                </Typography>
              </Grid>

              {/* 💳 Zona del Formulario de Pago */}
              <Grid size={12} sx={{ px: { md: 2 } }}>
                {children}
                <SubscriptionForm userId={usuario ? usuario.id : null} />
              </Grid>

              {/* 🔒 Nota de Privacidad / Elegancia en el pie */}
              <Grid size={12} textAlign='center'>
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    color: COLORS.textMuted,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    opacity: 0.8,
                  }}
                >
                  Gestión segura • Cancela cuando lo decidas
                </Typography>
              </Grid>
            </Grid>
          </CardWrapper>
        </Container>
      </Background>
    </Layout>
  );
};

export default SubscriptionScreen;
