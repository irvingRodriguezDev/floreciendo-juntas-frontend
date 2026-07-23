import { Box, Typography, Button, Stack, useTheme } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VideoModal from "./VideoModal";
import { Link } from "react-router-dom";
import AuthContext from "../../context/Auth/AuthContext";
import { useContext } from "react";
import HeroActionButton from "../HeroActionButton";
import HeroDescription from "../HeroDescription";

const BannerHome = ({ onExploreCourses, onRegister }) => {
  const theme = useTheme();
  const { usuario, autenticado } = useContext(AuthContext);
  const videoSource =
    "https://floreciendojuntas1.s3.us-east-2.amazonaws.com/production/statics/Floreciendo+Juntas+Plataforma+(1).mov";
  const handleScrollToCourses = () => {
    const element = document.getElementById("seccion-cursos");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const tieneMembresiaActiva = usuario?.isSubscribed || usuario?.roleId === 4;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: "50vh",
        // Gradiente para dar profundidad y un toque más elegante
        background:
          "linear-gradient(135deg, #FF69B4 0%, #F971AF 50%, #E83E8C 100%)",
        padding: { xs: 3, sm: 5, md: 6 },
        position: "relative",
        overflow: "hidden",
        borderRadius: "24px",
        boxShadow: "0px 15px 35px rgba(249, 113, 175, 0.25)",
      }}
    >
      {/* --- ELEMENTOS DECORATIVOS AMBIENTALES --- */}

      {/* Resplandor suave de fondo */}
      <Box
        sx={{
          position: "absolute",
          top: "-20%",
          left: "-10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Flores Flotantes de la Marca */}
      <Box
        sx={{
          position: "absolute",
          top: "2%",
          right: "2%",
          width: { md: "280px", lg: "340px" },
          height: { md: "280px", lg: "340px" },
          backgroundImage: `url("https://cdn.floreciendojuntas.com/production/statics/FLOR+ROSA+CONVEN.png")`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          opacity: 0.85,
          display: { xs: "none", md: "block" },
          pointerEvents: "none",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: "-10%",
          left: "-2%",
          width: "300px",
          height: "300px",
          backgroundImage: `url("https://cdn.floreciendojuntas.com/production/statics/GERBERA+MAGENTA+desenfoque.png")`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          opacity: 0.8,
          display: { xs: "none", md: "block" },
          pointerEvents: "none",
        }}
      />

      {/* ---- CONTENIDO IZQUIERDO (TEXTO Y CTAs) ---- */}
      <Box
        sx={{
          flex: 1.2,
          textAlign: { xs: "center", md: "left" },
          zIndex: 2,
          pr: { md: 4 },
        }}
      >
        {/* Badge superior */}
        <Typography
          variant='subtitle2'
          sx={{
            color: "#FFF",
            fontWeight: 800,
            letterSpacing: "2px",
            mb: 1.5,
            textTransform: "uppercase",
            opacity: 0.95,
            fontSize: "0.85rem",
          }}
        >
          ✨ Tu Camino al Éxito
        </Typography>

        {/* Título Principal */}
        <Typography
          variant='h3'
          component='h1'
          color='white'
          sx={{
            fontWeight: 900,
            mb: 2.5,
            lineHeight: 1.15,
            fontSize: { xs: "1.9rem", sm: "3rem", md: "3.4rem" },
            textShadow: "0px 4px 12px rgba(0,0,0,0.12)",
          }}
        >
          LA COMUNIDAD #1 DE
          <br />
          <span
            style={{
              position: "relative",
              display: "inline-block",
              marginTop: "4px",
            }}
          >
            EMPRENDEDORAS
            <Box
              component='span'
              sx={{
                position: "absolute",
                left: 0,
                bottom: "4px",
                width: "100%",
                height: "10px",
                backgroundColor: "rgba(255, 255, 255, 0.35)",
                zIndex: -1,
                borderRadius: "4px",
              }}
            />
          </span>
          <br />
          DE LA{" "}
          <span
            style={{
              position: "relative",
              display: "inline-block",
              marginTop: "4px",
            }}
          >
            BELLEZA
            <Box
              component='span'
              sx={{
                position: "absolute",
                left: 0,
                bottom: "4px",
                width: "100%",
                height: "10px",
                backgroundColor: "rgba(255, 255, 255, 0.35)",
                zIndex: -1,
                borderRadius: "4px",
              }}
            />
          </span>
        </Typography>

        {/* Descripción de la Propuesta de Valor */}
        <HeroDescription />

        {/* BOTONES DE ACCIÓN (NUEVO E IMPRESCINDIBLE PARA CONVERSIÓN) */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent={{ xs: "center", md: "flex-start" }}
          alignItems='center'
        >
          <HeroActionButton />
        </Stack>
      </Box>

      {/* ---- CONTENIDO DERECHO (FOTO CAROLINA + VIDEO) ---- */}
      <Box
        sx={{
          flex: 0.9,
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          position: "relative",
          marginTop: { xs: 5, md: 0 },
          zIndex: 2,
        }}
      >
        {/* Contenedor con marco brillante */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: { xs: 280, sm: 360, md: 420 },
            borderRadius: "50%",
            padding: "8px",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 100%)",
            boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Box
            component='img'
            src='https://cdn.floreciendojuntas.com/production/statics/caro.jpg'
            alt='Carolina Tavera'
            sx={{
              width: "100%",
              height: "auto",
              borderRadius: "50%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </Box>

        {/* Botón Flotante para el Video Modal */}
        <Box
          position='absolute'
          sx={{
            bottom: "50%",
            zIndex: 10,
            transform: "translateY(50%)",
            left: { xs: "38%", md: "22%" },
          }}
        >
          <VideoModal buttonText='Ver Introducción' videoUrl={videoSource} />
        </Box>
      </Box>
    </Box>
  );
};

export default BannerHome;
