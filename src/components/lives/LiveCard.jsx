import React from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import FormatDate from "../../utils/FormatDate";
import { motion } from "framer-motion";

const LiveCard = ({ live, i, PRIMARY_PINK = "#D63384" }) => {
  return (
    <Link
      to={`/detalle-live/${live.id}`}
      style={{
        textDecoration: "none",
        display: "block",
        height: "100%",
      }}
      aria-label={`Ver detalle del live ${live.title}`}
    >
      <Card
        component={motion.article}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: [0.215, 0.61, 0.355, 1],
          delay: i * 0.08,
        }}
        whileHover={{
          y: -8,
        }}
        whileTap={{ scale: 0.98 }}
        sx={{
          height: "100%",
          borderRadius: "24px",
          overflow: "hidden",
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.9)",
          boxShadow:
            "0 10px 30px -10px rgba(163, 11, 93, 0.06), 0 4px 12px rgba(0, 0, 0, 0.03)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          "&:hover": {
            backgroundColor: "#FFFFFF",
            boxShadow:
              "0 22px 45px -12px rgba(163, 11, 93, 0.16), 0 8px 20px rgba(0, 0, 0, 0.04)",
            borderColor: "rgba(214, 51, 132, 0.25)",
            "& .card-media-img": {
              transform: "scale(1.06)",
            },
            "& .card-title": {
              color: PRIMARY_PINK,
            },
            "& .card-cta-arrow": {
              transform: "translateX(4px)",
              opacity: 1,
            },
          },
        }}
      >
        {/* 🖼️ MINIATURA / MEDIA */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            pt: "62%", // Ratio aspect más panorámico/editorial (16:10 aprox)
            backgroundColor: "#FFF0F5",
            overflow: "hidden",
          }}
        >
          <CardMedia
            className='card-media-img'
            component='img'
            image={
              live.thumbnail_url ||
              "https://placehold.co/600x400/FFF1F2/E53888?text=Floreciendo+Juntas"
            }
            alt={live.title}
            loading='lazy'
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",

              objectFit: "cover",
              transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />

          {/* Overlay suave inferior para integrar con la imagen */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(44,24,32,0.2) 100%)",
              pointerEvents: "none",
            }}
          />

          {/* 🔴 BADGE EN VIVO (Glassmorphism + Pulso) */}
          {live.status === "live" && (
            <Box
              sx={{
                position: "absolute",
                top: 14,
                left: 14,
                px: 1.8,
                py: 0.6,
                borderRadius: "50px",
                backgroundColor: "rgba(220, 38, 38, 0.9)",
                backdropFilter: "blur(8px)",
                color: "#FFFFFF",
                fontSize: "0.68rem",
                fontWeight: 900,
                letterSpacing: "0.08em",
                display: "flex",
                alignItems: "center",
                gap: 0.6,
                boxShadow: "0 4px 16px rgba(220, 38, 38, 0.4)",
                animation: "livePulse 2s infinite",
                "@keyframes livePulse": {
                  "0%": {
                    boxShadow: "0 0 0 0 rgba(220, 38, 38, 0.7)",
                  },
                  "70%": {
                    boxShadow: "0 0 0 10px rgba(220, 38, 38, 0)",
                  },
                  "100%": {
                    boxShadow: "0 0 0 0 rgba(220, 38, 38, 0)",
                  },
                },
              }}
            >
              <RadioButtonCheckedIcon sx={{ fontSize: 13 }} />
              EN VIVO
            </Box>
          )}

          {/* 🔢 NÚMERO WATERMARK DENTRO DE LA CARD */}
          <Typography
            sx={{
              position: "absolute",
              bottom: 4,
              right: 12,
              fontSize: "2.8rem",
              fontWeight: 900,
              color: "#FFFFFF",
              opacity: 0.45,
              userSelect: "none",
              pointerEvents: "none",
              lineHeight: 1,
              fontFamily: "serif, sans-serif",
            }}
          >
            {String(i + 1).padStart(2, "0")}
          </Typography>
        </Box>

        {/* 🌷 CONTENIDO DE LA TARJETA */}
        <CardContent
          sx={{
            p: { xs: 2.5, sm: 3 },
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            {/* FECHA CON ESTILO EDITORIAL */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.8,
                color: PRIMARY_PINK,
                mb: 1.2,
              }}
            >
              <CalendarTodayOutlinedIcon sx={{ fontSize: 13 }} />
              <Typography
                variant='body2'
                sx={{
                  fontSize: "0.78rem",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                }}
              >
                {FormatDate(live.start_time)}
              </Typography>
            </Box>

            {/* TÍTULO */}
            <Typography
              className='card-title'
              variant='h6'
              sx={{
                fontWeight: 800,
                fontSize: "1.08rem",
                color: "#2C1820",
                lineHeight: 1.35,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                transition: "color 0.3s ease",
              }}
            >
              {live.title}
            </Typography>
          </Box>

          {/* CHIP DE ESTADO INFERIOR Y CTA */}
          <Box
            sx={{
              mt: 2.5,
              pt: 2,
              borderTop: "1px solid rgba(243, 244, 246, 0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.8,
                px: 1.6,
                py: 0.4,
                borderRadius: "50px",
                fontSize: "0.7rem",
                fontWeight: 800,
                letterSpacing: "0.04em",
                backgroundColor:
                  live.status === "live"
                    ? "#FEF2F2"
                    : live.status === "scheduled"
                    ? "#FFF0F6"
                    : "#F8F9FA",
                color:
                  live.status === "live"
                    ? "#DC2626"
                    : live.status === "scheduled"
                    ? PRIMARY_PINK
                    : "#71717A",
                border: "1px solid",
                borderColor:
                  live.status === "live"
                    ? "#FEE2E2"
                    : live.status === "scheduled"
                    ? "rgba(214, 51, 132, 0.2)"
                    : "#E4E4E7",
              }}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor:
                    live.status === "live"
                      ? "#DC2626"
                      : live.status === "scheduled"
                      ? PRIMARY_PINK
                      : "#A1A1AA",
                }}
              />
              {live.status === "live" && "EN VIVO AHORA"}
              {live.status === "scheduled" && "PRÓXIMAMENTE"}
              {live.status === "ended" && "TRANSMISIÓN GRABADA"}
            </Box>

            {/* FLECHA INTERACTIVA */}
            <Typography
              className='card-cta-arrow'
              sx={{
                fontSize: "1.1rem",
                fontWeight: 700,
                color: PRIMARY_PINK,
                transition: "all 0.3s ease",
                opacity: 0.6,
                lineHeight: 1,
              }}
            >
              →
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

export default LiveCard;
