import React, { useContext } from "react";
import { Box, Typography, Stack, Grid, Paper, Button } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AuthContext from "../../context/Auth/AuthContext";
import Marquee from "react-fast-marquee";

export default function RifaSalonPro() {
  const { usuario, autenticado } = useContext(AuthContext);

  // Sincronizado con el estado de tu autenticación
  const isSubscribed = Boolean(usuario?.isSubscribed || usuario?.roleId === 3);

  return (
    <Box
      sx={{
        width: "100%",
        background: "linear-gradient(180deg, #FFF0F5 0%, #FFFFFF 100%)",
        borderRadius: "32px",
        py: { xs: 6, md: 10 },
        px: { xs: 3, sm: 6, md: 8 },
        overflow: "hidden",
      }}
    >
      {/* 🎀 BANNER DE MARQUEE EDITORIAL SUPERIOR */}
      <Box sx={{ mb: 6, width: "100%" }}>
        <Marquee speed={40} gradient={false}>
          <Typography
            variant='h4'
            sx={{
              fontWeight: 900,
              color: "#E53888",
              letterSpacing: "2px",
              mx: 4,
              fontSize: { xs: "1.8rem", md: "2.4rem" },
            }}
          >
            🎁 GANAR EL SALÓN DE TUS SUEÑOS 🎁
          </Typography>
          <Typography
            variant='h4'
            sx={{
              fontWeight: 900,
              color: "#1F2937",
              letterSpacing: "2px",
              mx: 4,
              fontSize: { xs: "1.8rem", md: "2.4rem" },
            }}
          >
            • RIFA EXCLUSIVA WAPIZIMA • MEMBRESÍA ACTIVA •
          </Typography>
        </Marquee>
      </Box>

      <Grid
        container
        spacing={{ xs: 4, md: 8 }}
        alignItems='center'
        justifyContent='center'
        sx={{ maxWidth: "1300px", margin: "0 auto" }}
      >
        {/* Columna Izquierda: Mensaje de Beneficios */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography
            variant='caption'
            sx={{
              color: "#E53888",
              fontWeight: "800",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              display: "block",
              mb: 1,
            }}
          >
            Sorteo Mensual Oficial Wapizima
          </Typography>

          <Typography
            variant='h3'
            sx={{
              fontWeight: 900,
              mb: 3,
              lineHeight: 1.2,
              color: "#1F2937",
              fontSize: { xs: "2.2rem", sm: "2.6rem", md: "3rem" },
            }}
          >
            Tu pasaporte para El Salón de tus Sueños{" "}
            <Box component='span' sx={{ color: "#E53888" }}>
              cada mes
            </Box>
          </Typography>

          <Typography
            variant='body1'
            sx={{
              mb: 4,
              textAlign: "justify",
              color: "#4B5563",
              lineHeight: 1.7,
              fontSize: "1.05rem",
            }}
          >
            Solo por mantener tu <b>suscripción activa</b> en nuestra
            plataforma, entras automáticamente al sorteo para llevarte{" "}
            <b>El Salón de tus Sueños</b> por parte de <b>Wapizima</b>, diseñado
            con todo lo necesario para iniciar tu negocio al máximo nivel
            profesional.
          </Typography>

          {/* Listado de Beneficios Planos */}
          <Stack spacing={3}>
            {[
              {
                icon: (
                  <WorkspacePremiumIcon
                    sx={{ color: "#E53888", fontSize: 28 }}
                  />
                ),
                title:
                  "Gran Premio: El Salón de tus Sueños equipado por Wapizima",
              },
              {
                icon: (
                  <CardGiftcardIcon sx={{ color: "#E53888", fontSize: 28 }} />
                ),
                title:
                  "Colecciones exclusivas y mobiliario premium de alto valor",
              },
              {
                icon: (
                  <VolunteerActivismIcon
                    sx={{ color: "#E53888", fontSize: 28 }}
                  />
                ),
                title: "Participación automática con tu membresía activa",
              },
              {
                icon: (
                  <EmojiEventsIcon sx={{ color: "#E53888", fontSize: 28 }} />
                ),
                title: "Sorteos mensuales en vivo con transparencia total",
              },
            ].map((item, i) => (
              <Stack key={i} direction='row' spacing={2} alignItems='center'>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "12px",
                    backgroundColor: "#FFF5F7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#374151",
                    fontSize: "1rem",
                  }}
                >
                  {item.title}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Grid>

        {/* Columna Derecha: Tarjeta de Suscripción */}
        <Grid size={{ xs: 12, md: 6 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Paper
              elevation={0}
              sx={{
                borderRadius: "28px",
                p: { xs: 4, md: 5 },
                backgroundColor: "#FFF5F7",
                border: "1px solid #FCE7F3",
                maxWidth: 500,
                margin: "0 auto",
                boxShadow: "0 10px 30px rgba(229, 56, 136, 0.08)",
              }}
            >
              <Typography
                variant='h5'
                sx={{
                  fontWeight: 900,
                  mb: 2,
                  color: "#1F2937",
                }}
              >
                Mantén tu membresía activa
              </Typography>

              <Typography
                sx={{
                  mb: 4,
                  color: "#4B5563",
                  fontSize: "1rem",
                  textAlign: "justify",
                  lineHeight: 1.65,
                }}
              >
                Con tu <b>suscripción activa</b> obtienes acceso ilimitado a
                todo nuestro catálogo de educación, masterclasses exclusivas, y
                tu pase directo y asegurado para la rifa mensual de{" "}
                <b>El Salón de tus Sueños</b>.
              </Typography>

              {/* Lista de viñetas limpia */}
              <Stack spacing={2} sx={{ mb: 4 }}>
                {[
                  "Pase asegurado al sorteo El Salón de tus Sueños",
                  "Membresía activa con acceso total e ilimitado",
                  "Lanzamientos exclusivos de colecciones Wapizima",
                  "Comunidad privada y soporte con dudas y preguntas",
                ].map((text, i) => (
                  <Stack
                    key={i}
                    direction='row'
                    spacing={1.5}
                    alignItems='flex-start'
                  >
                    <Typography sx={{ color: "#E53888", fontWeight: "bold" }}>
                      ✓
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "600",
                        color: "#374151",
                        fontSize: "0.95rem",
                      }}
                    >
                      {text}
                    </Typography>
                  </Stack>
                ))}
              </Stack>

              {/* Lógica de botones homologada con el Checkout Rápido */}
              {autenticado && !isSubscribed ? (
                <Link to='/suscribirme' style={{ textDecoration: "none" }}>
                  <Button
                    variant='contained'
                    fullWidth
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      bgcolor: "#E53888",
                      color: "white",
                      borderRadius: "50px",
                      py: 1.8,
                      fontWeight: "bold",
                      fontSize: "1rem",
                      boxShadow: "0 8px 20px rgba(229, 56, 136, 0.25)",
                      textTransform: "none",
                      "&:hover": {
                        bgcolor: "#C2256F",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Activar mi Membresía ($200/mes)
                  </Button>
                </Link>
              ) : !autenticado ? (
                <Link to='/suscribirme' style={{ textDecoration: "none" }}>
                  <Button
                    variant='contained'
                    fullWidth
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      bgcolor: "#E53888",
                      color: "white",
                      borderRadius: "50px",
                      py: 1.8,
                      fontWeight: "bold",
                      fontSize: "1rem",
                      boxShadow: "0 8px 20px rgba(229, 56, 136, 0.25)",
                      textTransform: "none",
                      "&:hover": {
                        bgcolor: "#C2256F",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Unirme y Participar por $200/mes
                  </Button>
                </Link>
              ) : (
                // Estado para alumnas con suscripción activa
                <Box
                  sx={{
                    p: 2.5,
                    borderRadius: "16px",
                    backgroundColor: "#fff",
                    border: "2px solid #F472B6",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      color: "#E53888",
                      fontSize: "1rem",
                    }}
                  >
                    ✨ ¡Tu suscripción está activa! Ya estás dentro del sorteo
                    del mes de El Salón de tus Sueños. 💖
                  </Typography>
                </Box>
              )}
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
}
