import React, { useContext } from "react";
import { Typography, Box, Chip } from "@mui/material";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import AuthContext from "../context/Auth/AuthContext";
import HeroActionButton from "../components/HeroActionButton";

const ROSA = "#E83E8C";
const TINTA = "#2B1B24";
const TEXTO = "#5A4650";

const beneficios = [
  [<SchoolOutlinedIcon />, "Cursos exclusivos"],
  [<VideocamOutlinedIcon />, "Clases en vivo"],
  [<CardGiftcardOutlinedIcon />, "Rifas mensuales"],
];

const HeroDescription = () => {
  const { autenticado, usuario } = useContext(AuthContext);

  const isSubscribed =
    autenticado &&
    (Number(usuario?.isSubscribed) === 1 || usuario?.isSubscribed === true);

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        py: { xs: 4, md: 3.5 },
        px: { xs: 2.5, md: 5 },
        borderRadius: "28px",
        border: "1px solid rgba(232,62,140,0.18)",
        boxShadow: "0 12px 32px rgba(232,62,140,0.12)",
        background: `
          radial-gradient(circle at top left, rgba(255,200,220,0.45), transparent 55%),
          linear-gradient(181deg, #FFDFEF 0%, #FFF 100%)
        `,

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 1.5,

        "&::after": {
          content: '""',
          position: "absolute",
          right: -60,
          bottom: -60,
          width: 180,
          height: 180,
          borderRadius: "50%",
          bgcolor: "rgba(232,62,140,0.08)",
          pointerEvents: "none",
        },
      }}
    >
      <Typography
        component="h2"
        sx={{
          color: TINTA,
          fontWeight: 800,
          fontSize: { xs: "1.35rem", md: "1.7rem" },
          lineHeight: 1.2,
          letterSpacing: "-0.01em",
        }}
      >
        {isSubscribed
          ? "¡Qué alegría verte de nuevo! 🌸"
          : "Florecer no es casualidad, es preparación 💗"}
      </Typography>

      <Typography
        sx={{
          color: TEXTO,
          fontSize: { xs: "0.95rem", md: "1.05rem" },
          lineHeight: 1.6,
          maxWidth: 620,
        }}
      >
        {isSubscribed
          ? "Ya tienes acceso completo. Sigue fortaleciendo tu talento y haciendo crecer tu negocio."
          : "Fortalece tu talento, amplía tu visión y aprende a construir un negocio rentable."}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: { xs: "wrap", md: "nowrap" },
          justifyContent: "center",
          gap: 1,
          my: 0.5,
        }}
      >
        {beneficios.map(([icon, label]) => (
          <Chip
            key={label}
            icon={icon}
            label={label}
            sx={{
              bgcolor: "#FFF",
              color: TINTA,
              fontWeight: 700,
              fontSize: "0.85rem",
              border: "1px solid rgba(232,62,140,0.25)",
              "& .MuiChip-icon": { color: ROSA },
            }}
          />
        ))}
      </Box>

      {!isSubscribed && (
        <Typography sx={{ color: TEXTO, fontSize: "0.9rem" }}>
          Todo por solo <b style={{ color: TINTA }}>$200 MXN/mes</b>
        </Typography>
      )}

      <Box sx={{ mt: 0.5 }}>
        <HeroActionButton />
      </Box>
    </Box>
  );
};

export default HeroDescription;