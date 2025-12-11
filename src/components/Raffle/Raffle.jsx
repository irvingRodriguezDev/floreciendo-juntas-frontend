import React from "react";
import { Box, Typography, Stack, Grid, Paper, Button } from "@mui/material";
import { motion } from "framer-motion";

import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

// Fondo elegante rosado pastel
const fancyGradient = "linear-gradient(145deg, #FFE6EE 0%, #F8C0D8 100%)";

export default function RifaSalonPro() {
  return (
    <Box
      sx={{
        width: "100%",
        background: "linear-gradient(to top, #fff 0%, #F7BED3 100%)",
        borderRadius: "24px",
        py: { xs: 6, md: 10 },
        px: { xs: 3, sm: 6, md: 10 },
        boxShadow: "0px 8px 35px rgba(255, 115, 160, 0.25)",
      }}
    >
      <Grid
        container
        spacing={8}
        alignItems='center'
        justifyContent='center'
        sx={{ maxWidth: "1300px", margin: "0 auto" }}
      >
        {/* Texto principal */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography
            variant='body2'
            sx={{
              fontWeight: 700,
              mb: 1,
              letterSpacing: 1.3,
              color: "#B23A5A",
              textAlign: { xs: "center", md: "left" },
            }}
          >
            🎀 RIFA MENSUAL PREMIUM
          </Typography>

          <Typography
            variant='h3'
            sx={{
              fontWeight: 900,
              mb: 3,
              textAlign: { xs: "left", md: "left" },
              lineHeight: 1.15,
              color: "#3A0028",
            }}
          >
            ¡Gana el Salón de Tus Sueños!
            <Box component='span' sx={{ color: "#C21463" }}>
              {" "}
              Participa Todos Los Meses
            </Box>
          </Typography>

          <Typography
            variant='body1'
            sx={{
              mb: 4,
              textAlign: "justify",
              color: "#5A3450",
              lineHeight: 1.7,
              fontSize: "1.1rem",
            }}
          >
            Solo por mantener tu suscripción activa en <b>Floreciendo Juntas</b>
            , entras automáticamente a la rifa mensual donde puedes llevarte el
            espectacular
            <b> Salón de tus Sueños</b>, completamente equipado, además de
            múltiples premios especiales cada mes.
          </Typography>

          {/* Beneficios */}
          <Stack spacing={2.5} sx={{ mb: 5 }}>
            {[
              {
                icon: (
                  <WorkspacePremiumIcon
                    sx={{ color: "#C60E65", fontSize: 36 }}
                  />
                ),
                title: "Premio Mayor: Un salón totalmente equipado",
              },
              {
                icon: (
                  <CardGiftcardIcon sx={{ color: "#C60E65", fontSize: 36 }} />
                ),
                title: "Premios mensuales exclusivos y de alto valor",
              },
              {
                icon: (
                  <VolunteerActivismIcon
                    sx={{ color: "#C60E65", fontSize: 36 }}
                  />
                ),
                title: "Participación automática con tu suscripción",
              },
              {
                icon: (
                  <EmojiEventsIcon sx={{ color: "#C60E65", fontSize: 36 }} />
                ),
                title: "Más oportunidades según tu nivel de suscripción",
              },
            ].map((item, i) => (
              <Stack key={i} direction='row' spacing={2} alignItems='center'>
                {item.icon}
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "#4A0037",
                    fontSize: "1.05rem",
                  }}
                >
                  {item.title}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Grid>

        {/* Sección animada premium */}
        <Grid size={{ xs: 12, md: 6 }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <Paper
              elevation={8}
              sx={{
                borderRadius: "28px",
                p: 5,
                background: fancyGradient,
                backdropFilter: "blur(18px)",
                boxShadow: "0px 10px 35px rgba(255, 90, 160, 0.28)",
                maxWidth: 520,
                margin: "0 auto",
              }}
            >
              <Typography
                variant='h5'
                sx={{
                  fontWeight: 900,
                  mb: 2,
                  color: "#540028",
                  textAlign: "left",
                }}
              >
                Suscríbete y participa cada mes
              </Typography>

              <Typography
                sx={{
                  mb: 4,
                  color: "#732B4D",
                  fontSize: "1.05rem",
                  textAlign: "justify",
                  lineHeight: 1.65,
                }}
              >
                Al unirte a nuestra comunidad premium, obtienes acceso ilimitado
                a clases, contenido exclusivo, acompañamiento profesional, y tu
                entrada directa a la rifa mensual. ¡Tu éxito comienza aquí!
              </Typography>

              <Stack spacing={2.2}>
                {[
                  "Acceso completo a todo el contenido",
                  "Participación automática en todas las rifas",
                  "Clases nuevas cada semana",
                  "Beneficios y recompensas premium",
                ].map((b, i) => (
                  <Typography
                    key={i}
                    sx={{
                      fontWeight: 600,
                      color: "#540028",
                      display: "flex",
                      gap: 1,
                      fontSize: "1.05rem",
                    }}
                  >
                    • {b}
                  </Typography>
                ))}
              </Stack>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
}
