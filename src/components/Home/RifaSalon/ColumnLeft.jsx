import { alpha, Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
const ColumnLeft = () => {
  return (
    <Grid size={{ xs: 12, md: 6 }}>
      {/* Badge superior minimalista */}
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 1,
          backgroundColor: alpha("#E53888", 0.1),
          color: "#E53888",
          px: 2,
          py: 0.6,
          borderRadius: "50px",
          fontSize: "0.8rem",
          fontWeight: 700,
          letterSpacing: "1px",
          textTransform: "uppercase",
          mb: 2,
        }}
      >
        <EmojiEventsIcon sx={{ fontSize: "1rem" }} />
        <span>Sorteo Mensual Oficial Wapizima</span>
      </Box>

      <Typography
        variant='h2'
        sx={{
          fontWeight: 900,
          mb: 2.5,
          lineHeight: 1.15,
          color: "#2B1B24",
          fontSize: { xs: "2rem", sm: "2.6rem", md: "3.2rem" },
          letterSpacing: "-0.02em",
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
          color: "#5A4650",
          lineHeight: 1.7,
          fontSize: "1.05rem",
        }}
      >
        Solo por mantener tu <b>suscripción activa</b> en nuestra plataforma,
        entras automáticamente al sorteo para llevarte{" "}
        <b>El Salón de tus Sueños</b> cortesía de <b>Wapizima</b>, equipado con
        todo lo necesario para escalar tu negocio al máximo nivel profesional.
      </Typography>

      {/* Listado de Beneficios en Tarjetas Limpias */}
      <Stack spacing={2.5}>
        {[
          {
            icon: (
              <WorkspacePremiumIcon sx={{ color: "#E53888", fontSize: 24 }} />
            ),
            title: "Gran Premio: El Salón de tus Sueños equipado por Wapizima",
          },
          {
            icon: <CardGiftcardIcon sx={{ color: "#E53888", fontSize: 24 }} />,
            title: "Colecciones exclusivas y mobiliario premium de alto valor",
          },
          {
            icon: (
              <VolunteerActivismIcon sx={{ color: "#E53888", fontSize: 24 }} />
            ),
            title:
              "Participación automática e inmediata con tu membresía activa",
          },
          {
            icon: <EmojiEventsIcon sx={{ color: "#E53888", fontSize: 24 }} />,
            title: "Sorteos mensuales en vivo con total transparencia",
          },
        ].map((item, i) => (
          <Stack
            key={i}
            direction='row'
            spacing={2}
            alignItems='center'
            sx={{
              backgroundColor: "#FFFFFF",
              p: 2,
              borderRadius: "16px",
              border: "1px solid",
              borderColor: alpha("#E53888", 0.08),
              boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
            }}
          >
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: "12px",
                backgroundColor: alpha("#E53888", 0.1),
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
                fontWeight: 700,
                color: "#2B1B24",
                fontSize: "0.95rem",
              }}
            >
              {item.title}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Grid>
  );
};

export default ColumnLeft;
