import React from "react";
import { Box, Button, Typography, Container, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";

// 🏛️ Paleta "Quiet Luxury" y Contención (Línea Floreciendo Juntas)
const COLORS = {
  bgCanvas: "#FFF0F7", // Fondo color lino / arena ultra suave
  cardBase: "#FFFFFF", // Blanco puro para la tarjeta
  champagneGold: "#D82E7A", // Oro champaña mate para detalles
  plumDeep: "#2A1B24", // Ciruela/Vino profundo para texto principal
  roseVelvet: "#B82C67", // Rosa insignia premium para llamadas a la acción
  textMuted: "#7A6E75", // Gris topo suave para textos secundarios
  borderFine: "rgba(212, 178, 149, 0.25)",
};

const FullPageBackground = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  background: COLORS.bgCanvas,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(4, 2),
}));

const CardWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: COLORS.cardBase,
  borderRadius: "22px",
  padding: theme.spacing(8, 4),
  boxShadow: "0 30px 70px rgba(42, 27, 36, 0.03)",
  border: `1px solid ${COLORS.borderFine}`,
  position: "relative",
  textAlign: "center",
  maxWidth: "500px",
  width: "100%",

  "&::before": {
    content: '""',
    position: "absolute",
    top: "14px",
    left: "14px",
    right: "14px",
    bottom: "14px",
    border: `1px solid rgba(216, 46, 122, 0.9)`,
    borderRadius: "16px",
    pointerEvents: "none",
  },
}));

const PaymentCanceledScreen = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <FullPageBackground>
        <Container
          maxWidth='xs'
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <CardWrapper>
            {/* 🌷 Detalle Iconográfico Sutil */}
            <Typography
              sx={{
                fontFamily: "serif",
                fontSize: "2rem",
                color: COLORS.champagneGold,
                mb: 2,
                fontWeight: 300,
              }}
            >
              ✦
            </Typography>

            {/* 📋 Título Editorial */}
            <Typography
              component='h1'
              sx={{
                fontWeight: 400,
                color: COLORS.plumDeep,
                fontSize: "1.8rem",
                letterSpacing: "0.04em",
                lineHeight: 1.3,
                fontFamily: "'Playfair Display', 'Didot', serif",
                textTransform: "uppercase",
                mb: 2,
              }}
            >
              Proceso Interrumpido
            </Typography>

            {/* Separador Fino */}
            <Box
              sx={{
                width: 35,
                height: "1px",
                backgroundColor: COLORS.champagneGold,
                mx: "auto",
                mb: 3,
              }}
            />

            {/* 💬 Texto de Acompañamiento */}
            <Typography
              sx={{
                color: COLORS.textMuted,
                fontSize: "1rem",
                lineHeight: 1.7,
                fontWeight: 300,
                mb: 5,
                px: 1,
              }}
            >
              Notamos que regresaste antes de finalizar tu suscripción. Tu
              cuenta no ha recibido ningún cargo. Si tuviste algún inconveniente
              o prefieres intentarlo en otro momento, aquí estaremos para
              recibirte.
            </Typography>

            {/* 🔘 Botonera de Retorno Estilizada */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Button
                variant='contained'
                onClick={() => navigate("/suscribirme")} // Cambia por tu ruta de checkout
                sx={{
                  py: 1.6,
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  bgcolor: COLORS.roseVelvet,
                  color: "#FFFFFF",
                  borderRadius: "12px",
                  boxShadow: "0 10px 20px rgba(184, 44, 103, 0.15)",
                  "&:hover": {
                    bgcolor: COLORS.plumDeep,
                    boxShadow: "0 12px 25px rgba(42, 27, 36, 0.15)",
                  },
                }}
              >
                Intentar pago nuevamente
              </Button>

              <Button
                variant='text'
                onClick={() => navigate("/")} // Regresar al inicio/dashboard
                sx={{
                  py: 1.2,
                  fontSize: "0.82rem",
                  fontWeight: "500",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: COLORS.textMuted,
                  borderRadius: "12px",
                  "&:hover": {
                    color: COLORS.plumDeep,
                    backgroundColor: "rgba(0, 0, 0, 0.02)",
                  },
                }}
              >
                Ir a la Página Principal
              </Button>
            </Box>

            {/* 💗 Mensaje de Cierre Emocional */}
            <Typography
              sx={{
                mt: 5,
                fontSize: "0.75rem",
                color: COLORS.champagneGold,
                letterSpacing: "0.05em",
                fontStyle: "italic",
              }}
            >
              Florecer toma tiempo, ve a tu propio ritmo.
            </Typography>
          </CardWrapper>
        </Container>
      </FullPageBackground>
    </Layout>
  );
};

export default PaymentCanceledScreen;
