import React, { useContext } from "react";
import { Box, Typography, Button, alpha } from "@mui/material";
import { motion } from "framer-motion";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import AuthContext from "../../context/Auth/AuthContext";

const BannerHome = () => {
  const { autenticado, usuario } = useContext(AuthContext);

  // Si ya está suscrita, no mostramos este banner de venta
  const isSubscribed =
    autenticado &&
    (Number(usuario?.isSubscribed) === 1 || usuario?.isSubscribed === true);

  if (isSubscribed) {
    return null;
  }
  const onSubscribeClick = () => {
    window.location.href = "/suscribirme";
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      sx={{
        width: "100%",
        background: "linear-gradient(135deg, #FF70B3 0%, #E83E8C 100%)",
        borderRadius: "24px",
        p: { xs: 3, md: 4 },
        my: 4,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        gap: 3,
        position: "relative",
        overflow: "hidden",
        boxShadow: "0px 10px 30px rgba(232, 62, 140, 0.2)",
        border: "1px solid",
        borderColor: alpha("#FFF", 0.3),
      }}
    >
      {/* Círculo decorativo ambiental */}
      <Box
        sx={{
          position: "absolute",
          top: "-50%",
          left: "-10%",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Texto descriptivo */}
      <Box sx={{ textAlign: { xs: "center", md: "left" }, zIndex: 1 }}>
        <Typography
          variant='subtitle2'
          sx={{
            color: "#FFE2F0",
            fontWeight: 800,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            fontSize: "0.75rem",
            mb: 0.5,
          }}
        >
          🌸 Membresía Exclusiva
        </Typography>
        <Typography
          variant='h5'
          sx={{
            color: "#FFFFFF",
            fontWeight: 900,
            fontSize: { xs: "1.25rem", md: "1.5rem" },
            lineHeight: 1.2,
            mb: 0.5,
          }}
        >
          Desbloquea todos los cursos y clases en vivo por solo{" "}
          <span style={{ color: "#FFECB3" }}>$200 MXN/mes</span>
        </Typography>
        <Typography
          variant='body2'
          sx={{
            color: "rgba(255, 255, 255, 0.9)",
            fontSize: { xs: "0.9rem", md: "0.95rem" },
          }}
        >
          Participa en rifas mensuales y haz crecer tu negocio de belleza hoy
          mismo.
        </Typography>
      </Box>

      {/* Botón de Acción Directa */}
      <Box sx={{ zIndex: 1, width: { xs: "100%", md: "auto" }, flexShrink: 0 }}>
        <Button
          variant='contained'
          onClick={onSubscribeClick}
          startIcon={<LocalActivityIcon />}
          sx={{
            backgroundColor: "#FFFFFF",
            color: "#C2185B",
            fontWeight: 800,
            fontSize: "0.95rem",
            textTransform: "none",
            borderRadius: "50px",
            px: 4,
            py: 1.5,
            width: { xs: "100%", md: "auto" },
            boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.15)",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#FFF0F5",
              transform: "translateY(-2px)",
              boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.25)",
            },
          }}
        >
          ¡Unirme Ahora!
        </Button>
      </Box>
    </Box>
  );
};

export default BannerHome;
