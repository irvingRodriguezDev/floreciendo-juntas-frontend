import React from "react";
import { Box, Grid, Typography, Container, styled } from "@mui/material";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import SubscriptionForm from "../components/Payment/SubscriptionButton";
import Layout from "../components/Layout/Layout";

// 🌸 Paleta Floreciendo Juntas
const COLORS = {
  bgGradient: "linear-gradient(180deg, #FFF5F8 0%, #FBECEC 100%)",
  accent: "#D81B60",
  textPrimary: "#4A148C",
  textSecondary: "#6A1B9A",
};

// 🌷 Fondo general
const Background = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  background: COLORS.bgGradient,
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(6, 2),

  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(4, 1),
  },
}));

// 🌸 Card contenedora
const CardWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: "#FFFFFF",
  borderRadius: theme.shape.borderRadius * 3,
  padding: theme.spacing(6, 4),
  boxShadow: "0 20px 40px rgba(216, 27, 96, 0.18)",
  position: "relative",
  overflow: "hidden",

  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(4, 2),
  },

  // Decoración superior derecha
  "&::before": {
    content: '""',
    position: "absolute",
    top: "8%",
    right: "6%",
    width: 80,
    height: 80,
    border: `3px solid ${COLORS.accent}`,
    borderRadius: "50%",
    opacity: 0.25,
  },

  // Decoración inferior izquierda
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "10%",
    left: "6%",
    width: 40,
    height: 40,
    background: `radial-gradient(circle, ${COLORS.accent} 35%, transparent 36%)`,
    backgroundSize: "14px 14px",
    opacity: 0.25,
  },
}));

// 🌺 Pantalla principal
const SubscriptionScreen = ({ children }) => {
  return (
    <Layout>
      <Background>
        <Container maxWidth='md'>
          <CardWrapper>
            <Grid container spacing={4} justifyContent='center'>
              {/* 🌸 Encabezado emocional */}
              <Grid item xs={12} textAlign='center'>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    backgroundColor: "#FFF0F6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 2,
                  }}
                >
                  <LocalFloristIcon
                    sx={{ color: COLORS.accent, fontSize: 34 }}
                  />
                </Box>

                <Typography
                  component='h1'
                  sx={{
                    fontWeight: 800,
                    color: "#e53888",
                    fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                  }}
                >
                  Florece contigo 🌷
                </Typography>

                <Typography
                  sx={{
                    mt: 1.5,
                    color: "#e53888",
                    maxWidth: 520,
                    mx: "auto",
                    fontSize: "1.05rem",
                    lineHeight: 1.6,
                  }}
                >
                  Suscribirte es regalarte un espacio de crecimiento,
                  acompañamiento y aprendizaje a tu ritmo.
                </Typography>
              </Grid>

              {/* 🌷 Aquí va TU componente de suscripción */}
              <Grid item xs={12}>
                {children}
                <SubscriptionForm />
              </Grid>

              {/* 🌸 Mensaje inferior de contención */}
              <Grid item xs={12} textAlign='center'>
                <Typography
                  sx={{
                    mt: 2,
                    fontSize: "0.9rem",
                    color: "#9E9E9E",
                  }}
                >
                  Puedes cancelar o cambiar tu suscripción cuando lo necesites
                  💗
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
