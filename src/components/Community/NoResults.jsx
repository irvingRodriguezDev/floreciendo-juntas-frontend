import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";

export default function NoResults({
  debounceSearch,
  title = `No se encontraron resultados para "${debounceSearch}"`,
  subtitle = "Intenta con otras palabras o explora nuestras categorías.",
  onClear,
}) {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 8,
        px: 2,
        textAlign: "center",
        borderRadius: 4,
        background: "rgba(255, 246, 249, 0.5)", // Rosa muy suave traslúcido
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(216, 46, 122, 0.1)",
        mt: 4,
      }}
    >
      {/* Icono animado con pétalos sutiles */}
      <Box sx={{ position: "relative", mb: 3 }}>
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ repeat: Infinity, duration: 4 }}
        >
          <SearchOffIcon sx={{ fontSize: 80, color: "#F7C6D8" }} />
        </motion.div>
        <LocalFloristIcon
          sx={{
            position: "absolute",
            bottom: -5,
            right: -5,
            color: "#D82E7A",
            fontSize: 30,
          }}
        />
      </Box>

      <Typography
        variant='h5'
        fontWeight={700}
        sx={{ color: "#8A2E52", mb: 1, fontFamily: "'Poppins', sans-serif" }}
      >
        {title}
      </Typography>

      <Typography
        variant='body1'
        sx={{ color: "#AA6B7E", mb: 4, maxWidth: 400, lineHeight: 1.6 }}
      >
        {subtitle}
      </Typography>

      {onClear && (
        <Button
          variant='outlined'
          onClick={onClear}
          sx={{
            borderRadius: 20,
            textTransform: "none",
            fontWeight: "bold",
            color: "#D82E7A",
            borderColor: "#D82E7A",
            px: 4,
            "&:hover": {
              borderColor: "#E33887",
              bgcolor: "rgba(216, 46, 122, 0.05)",
            },
          }}
        >
          Limpiar búsqueda
        </Button>
      )}
    </Box>
  );
}
