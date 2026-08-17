import React, { useContext } from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import AuthContext from "../../context/Auth/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const ProfileBanner = () => {
  const { usuario, cerrarSesion } = useContext(AuthContext);
  const navigate = useNavigate();

  // Tomamos el primer nombre de la alumna
  const nombreUsuario = usuario?.name ? usuario.name.split(" ")[0] : "Alumna";

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "32px",
        px: { xs: 3, md: 6 },
        py: { xs: 6, md: 8 },
        textAlign: "center",
        background: "linear-gradient(135deg, #FFE5EE 0%, #FFF7FA 100%)",
        border: "1px solid #FCE7F3",
        boxShadow: "0 12px 35px rgba(229, 56, 136, 0.08)",
      }}
    >
      {/* 🚪 Botón Cerrar Sesión Elegante en la Esquina */}
      <Button
        onClick={() => cerrarSesion(navigate)}
        startIcon={<LogoutIcon sx={{ fontSize: "18px !important" }} />}
        sx={{
          position: "absolute",
          top: { xs: 16, md: 24 },
          right: { xs: 16, md: 24 },
          zIndex: 3,
          color: "#9CA3AF",
          borderColor: "rgba(0,0,0,0.06)",
          backgroundColor: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(8px)",
          borderRadius: "50px",
          px: 2,
          py: 0.8,
          fontSize: "0.82rem",
          fontWeight: 700,
          textTransform: "none",
          transition: "all 0.2s ease",
          "&:hover": {
            backgroundColor: "#FFF1F2",
            color: "#E53888",
            borderColor: "#FCE7F3",
          },
        }}
      >
        Cerrar Sesión
      </Button>

      {/* 🌸 Halo floral desenfocado */}
      <Box
        component={motion.img}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        src='https://cdn.floreciendojuntas.com/production/statics/GERBERA+MAGENTA+desenfoque.png'
        alt=''
        aria-hidden
        sx={{
          position: "absolute",
          top: "-40px",
          left: "-60px",
          width: { xs: 160, md: 220 },
          opacity: 0.35,
          filter: "blur(6px)",
          pointerEvents: "none",
        }}
      />

      {/* 🌷 Flor detalle animada */}
      <Box
        component={motion.img}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.65, scale: 1, rotate: [0, 4, 0] }}
        transition={{
          opacity: { duration: 1 },
          rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        }}
        src='https://cdn.floreciendojuntas.com/production/statics/GERBERA+MAGENTA.png'
        alt=''
        aria-hidden
        sx={{
          position: "absolute",
          bottom: "-25px",
          right: "-10px",
          width: { xs: 120, md: 160 },
          pointerEvents: "none",
        }}
      />

      {/* ✨ Contenido Principal */}
      <Box sx={{ position: "relative", zIndex: 2 }}>
        <Typography
          component='h1'
          sx={{
            fontWeight: 900,
            color: "#C73578",
            fontSize: { xs: "2rem", md: "2.8rem" },
            mb: 1,
            letterSpacing: "-0.5px",
          }}
        >
          Mi Perfil
        </Typography>

        {/* Línea divisora sutil */}
        <Box
          sx={{
            width: 48,
            height: 4,
            mx: "auto",
            mb: 2.5,
            borderRadius: 8,
            background: "linear-gradient(90deg, #E53888, #FFB6D5)",
          }}
        />

        {/* Mensaje Personalizado */}
        <Typography
          sx={{
            fontWeight: 500,
            color: "#4B5563",
            fontSize: { xs: "1rem", md: "1.25rem" },
            maxWidth: 520,
            mx: "auto",
            lineHeight: 1.5,
          }}
        >
          ¡Qué alegría verte de nuevo,{" "}
          <Box component='span' sx={{ color: "#E53888", fontWeight: 700 }}>
            {nombreUsuario}
          </Box>
          ! ✨
        </Typography>
      </Box>
    </Box>
  );
};

export default ProfileBanner;
