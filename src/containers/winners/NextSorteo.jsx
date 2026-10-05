import React from "react";
import { Box, Typography, Stack, Chip, Button, Paper } from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function NextSorteo({
  nextDrawDate = "15 de Octubre",
  nextDrawTime = "7:00 PM (Hora CDMX)",
  prizeTitle = "Kit Especial Wapizima + Sorpresa VIP",
  onJoinClick,
}) {
  return (
    <Box
      sx={{
        width: "100%",
        background: `
          linear-gradient(135deg, #E53888 0%, #B82E6B 100%),
          radial-gradient(circle at top right, rgba(255, 255, 255, 0.2), transparent 60%)
        `,
        borderRadius: "32px",
        py: { xs: 6, md: 8 },
        px: { xs: 2, sm: 4 },
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 20px 50px -10px rgba(229, 56, 136, 0.35)",
      }}
    >
      {/* 💧 TEXTO DE FONDO (MARCA DE AGUA) */}
      <Typography
        variant='h1'
        sx={{
          position: "absolute",
          top: { xs: "75px", sm: "70px", md: "60px" },
          left: "50%",
          transform: "translateX(-50%)",
          fontWeight: 900,
          color: "rgba(255, 255, 255, 0.098)",
          fontSize: {
            xs: "4.5rem",
            sm: "5.5rem",
            md: "7rem",
            lg: "8.5rem",
            xl: "9.5rem",
          },
          lineHeight: 1,
          whiteSpace: "nowrap",
          zIndex: 0,
          pointerEvents: "none",
          textTransform: "uppercase",
          letterSpacing: "-4px",
        }}
      >
        PRÓXIMO SORTEO
      </Typography>

      {/* CONTENEDOR PRINCIPAL */}
      <Box sx={{ position: "relative", zIndex: 1 }}>
        {/* 🌸 CABECERA EDITORIAL */}
        <Stack
          alignItems='center'
          sx={{ mb: { xs: 4, md: 5 }, px: 2, textAlign: "center" }}
          component={motion.div}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Chip
            icon={
              <CalendarMonthIcon
                sx={{ color: "#FFD700 !important", fontSize: "18px" }}
              />
            }
            label='SORTEO EL SALÓN DE TUS SUEÑOS'
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.18)",
              color: "#FFFFFF",
              fontWeight: 800,
              fontSize: "0.75rem",
              letterSpacing: "2px",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              mb: 2,
              px: 1,
            }}
          />

          <Typography
            variant='h3'
            component='h2'
            sx={{
              fontWeight: 900,
              color: "#FFFFFF",
              lineHeight: 1.15,
              fontSize: { xs: "2.1rem", sm: "2.8rem", md: "3.4rem" },
              letterSpacing: "-1px",
              textShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            📅 ¡Jueves 8 de Octubre!
          </Typography>

          <Typography
            variant='body1'
            sx={{
              color: "rgba(255, 255, 255, 0.9)",
              mt: 1,
              fontWeight: 500,
              fontSize: { xs: "0.9rem", sm: "1rem" },
              maxWidth: "600px",
            }}
          >
            Todas las membresías activas participan automáticamente.
          </Typography>
          <Link
            to={`https://www.tiktok.com/@carolina_tavera`}
            target='_blank'
            rel='noopener noreferrer'
            style={{ textDecoration: "none" }}
          >
            <Typography
              variant='h6'
              sx={{
                color: "rgba(255, 255, 255, 0.9)",
                mt: 1,
                fontWeight: 500,
                maxWidth: "600px",
              }}
            >
              Totalmente en vivo a traves del tiktok de @carolinatavera
            </Typography>
          </Link>
        </Stack>

        {/* 🎯 TARJETA DESTACADA DEL SORTEO */}
      </Box>
    </Box>
  );
}
