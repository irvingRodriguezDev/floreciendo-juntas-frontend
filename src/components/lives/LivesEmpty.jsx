import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import petal from "../../assets/svg/petal.svg";

const LivesEmpty = () => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      sx={{
        mt: { xs: 6, md: 8 },
        textAlign: "center",
        px: 4,
        py: 7,
        backgroundColor: "#FFFFFF",
        borderRadius: "28px",
        border: "1px dashed #FCE7F3",
        maxWidth: "580px",
        mx: "auto",
        boxShadow: "0 10px 30px rgba(229, 56, 136, 0.03)",
      }}
    >
      <Box
        component={motion.div}
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        sx={{ mb: 2.5, display: "inline-block" }}
      >
        <img
          src={petal}
          width={52}
          alt='Detalle floral'
          style={{ opacity: 0.6, objectFit: "contain" }}
        />
      </Box>

      <Typography
        sx={{
          fontSize: { xs: "1.35rem", md: "1.75rem" },
          fontWeight: 900,
          color: "#1F2937",
          mb: 1.5,
          letterSpacing: "-0.5px",
        }}
      >
        No hay transmisiones programadas
      </Typography>

      <Typography
        sx={{
          fontSize: "0.95rem",
          color: "#6B7280",
          maxWidth: "420px",
          mx: "auto",
          lineHeight: 1.6,
        }}
      >
        Estamos preparando nuevas masterclasses en vivo y espacios exclusivos
        para interactuar y florecer juntas. ¡Regresa pronto!
      </Typography>
    </Box>
  );
};

export default LivesEmpty;
