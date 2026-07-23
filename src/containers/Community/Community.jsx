import { useContext } from "react";
import { Typography, Grid, Backdrop, Paper, Box, Stack } from "@mui/material";
import Layout from "../../components/Layout/Layout";
import AuthContext from "../../context/Auth/AuthContext";
import { Link } from "react-router-dom";
import CommunityRulesAccordion from "./CommunityRulesAccordeon";
import TabsTypeCommunity from "../../components/Community/TabsTypeCommunity";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SubscriptionForm from "../../components/Payment/SubscriptionButton"; // 👈 Ajusta la ruta a tu componente

const Community = () => {
  const { autenticado, usuario } = useContext(AuthContext);

  // Sincronizado con la verificación de rol y suscripción
  const isSuscribed = Boolean(usuario?.isSubscribed && usuario?.roleId === 4);
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
          // Desactiva el scroll en la página si no está autorizado
          height: !isAuthorized
            ? {
                xs: "120dvh",
                sm: "100dvh",
                md: "100dvh",
                lg: "100dvh",
                xl: "100dvh",
              }
            : "auto",
          overflow: !isAuthorized ? "hidden" : "visible",
        }}
      >
        {/* HEADER SECCIÓN */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant='caption'
            sx={{
              color: "#E53888",
              fontWeight: "800",
              textTransform: "uppercase",
              letterSpacing: "2px",
              display: "block",
              mb: 0.5,
            }}
          >
            Comunidad Exclusiva
          </Typography>
          <Typography
            variant='h3'
            sx={{
              fontWeight: 900,
              color: "#1F2937",
              fontSize: { xs: "2.2rem", sm: "2.8rem" },
            }}
          >
            Floreciendo Juntas 🌷
          </Typography>
          <Typography
            variant='body1'
            sx={{ color: "#6B7280", mt: 1, fontSize: "1.05rem" }}
          >
            Un espacio seguro para compartir, aprender y crecer entre colegas.
          </Typography>
        </Box>

        {/* CONTENIDO PRINCIPAL (Fondo bloqueado/difuminado) */}
        <Grid container justifyContent='center' sx={{ mt: 1 }}>
          <Grid size={{ xs: 12, md: 10, lg: 10 }}>
            <CommunityRulesAccordion />
            <Box sx={{ mt: 3 }}>
              <TabsTypeCommunity />
            </Box>
          </Grid>
        </Grid>

        {/* BLOQUEO LOCALIZADO CON GLASSMORPHISM */}
        {!isAuthorized && (
          <Backdrop
            open
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 10,
              backgroundColor: "#FFF4FA",
              backdropFilter: "blur(12px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 2,
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3.5, sm: 4.5 },
                borderRadius: "28px",
                maxWidth: 460,
                width: "100%",
                textAlign: "center",
                backgroundColor: "#FFFFFF",
                border: "1px solid #FCE7F3",
                boxShadow: "0 20px 40px rgba(229, 56, 136, 0.08)",
              }}
            >
              {/* Ícono Superior */}
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "20px",
                  backgroundColor: "#FFF5F7",
                  color: "#E53888",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 2,
                }}
              >
                <LockOutlinedIcon sx={{ fontSize: 30 }} />
              </Box>

              <Typography
                variant='h5'
                sx={{ fontWeight: 900, color: "#1F2937", mb: 1 }}
              >
                Comunidad Privada
              </Typography>

              <Typography
                variant='body2'
                sx={{ color: "#4B5563", mb: 2.5, lineHeight: 1.5 }}
              >
                Suscríbete para interactuar con la comunidad, publicar tus
                dudas, ver trabajos y participar en dinámicas en vivo.
              </Typography>

              {/* Minilista de beneficios */}
              <Stack
                spacing={1.2}
                sx={{
                  mb: 3,
                  textAlign: "left",
                  bgcolor: "#FFF5F7",
                  p: 2,
                  borderRadius: "16px",
                  display: { xs: "none", md: "flex", lg: "flex", xl: "flex" },
                }}
              >
                {[
                  "Publica tus dudas y recibe feedback técnico",
                  "Acceso al sorteo del Salón de tus Sueños",
                  "Conecta con manicuristas de todo el país",
                ].map((text, i) => (
                  <Stack
                    key={i}
                    direction='row'
                    spacing={1.2}
                    alignItems='center'
                  >
                    <Typography
                      sx={{
                        color: "#E53888",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      ✓
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "600",
                        color: "#374151",
                        fontSize: "0.85rem",
                      }}
                    >
                      {text}
                    </Typography>
                  </Stack>
                ))}
              </Stack>

              {/* ⚡ PAGO DIRECTO INCRUSTADO EN 1 CLIC */}
              <Box sx={{ width: "100%", mb: 1.5 }}>
                <SubscriptionForm userId={usuario?.id || null} />
              </Box>

              <Typography
                variant='caption'
                sx={{
                  color: "#9CA3AF",
                  fontWeight: 500,
                  fontSize: "11px",
                  display: "block",
                  mb: 1.5,
                }}
              >
                🔒 Pago seguro procesado por Stripe
              </Typography>

              {/* Enlace secundario si cerró sesión */}
              {!autenticado && (
                <Box>
                  <Typography variant='caption' sx={{ color: "#6B7280" }}>
                    ¿Ya tienes una cuenta activa?{" "}
                    <Typography
                      component={Link}
                      to='/iniciar-sesion'
                      variant='caption'
                      sx={{
                        color: "#E53888",
                        fontWeight: "bold",
                        textDecoration: "none",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      Inicia sesión
                    </Typography>
                  </Typography>
                </Box>
              )}
            </Paper>
          </Backdrop>
        )}
      </Box>
    </Layout>
  );
};

export default Community;
