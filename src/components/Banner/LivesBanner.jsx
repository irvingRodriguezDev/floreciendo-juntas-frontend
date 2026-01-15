// src/components/Lives/LivesBanner.jsx
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const LivesBanner = () => {
  return (
    <Box
      component={motion.section}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      sx={{
        width: "100%",
        minHeight: {
          xs: "28vh",
          sm: "34vh",
          md: "38vh",
        },
        mt: { xs: 3, lg: 2 },
        background: "#fff4fa",
        borderRadius: { xs: "0 0 24px 24px", md: "0 0 40px 40px" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 2.5, sm: 4 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Halo suave decorativo */}

      {/* CONTENIDO */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        sx={{
          textAlign: "center",
          maxWidth: 640,
          zIndex: 2,
        }}
      >
        <Typography
          component='h1'
          sx={{
            fontSize: { xs: "1.9rem", sm: "2.4rem", md: "3rem" },
            fontWeight: 900,
            mb: 2,
            color: "#D82E7A",
            lineHeight: 1.15,
            letterSpacing: "-0.5px",
          }}
        >
          Floreciendo Juntas en Vivo
        </Typography>

        <Typography
          component='p'
          sx={{
            color: "#6D5A63",
            fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.1rem" },
            lineHeight: 1.75,
            maxWidth: 520,
            mx: "auto",
          }}
        >
          Encuentros creados para compartir experiencias reales, aprender juntas
          y crecer en un espacio seguro, cercano y lleno de propósito.
        </Typography>
      </Box>
    </Box>
  );
};

export default LivesBanner;
