import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const SystemCard = ({ system, index }) => {
  if (!system) return null;

  return (
    <Link
      to={`/cursos/bysystem/${system.id}`}
      style={{ textDecoration: "none", width: "100%", display: "block" }}
    >
      <Paper
        component={motion.div}
        whileHover={{
          y: -6,
          borderColor: "#F472B6",
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        elevation={0} // Look completamente plano
        sx={{
          p: 3.5,
          borderRadius: "24px",
          border: "1px solid #F3F4F6",
          backgroundColor: "#fff",
          minHeight: "340px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transition: "border-color 0.2s ease",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Bloque Superior: Indicador del Número */}
        <Box>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: "16px",
              backgroundColor: "#FFF5F7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 3,
            }}
          >
            <Typography
              variant='h5'
              sx={{ fontWeight: "900", color: "#E53888", lineHeight: 1 }}
            >
              {String(index + 1).padStart(2, "0")}
            </Typography>
          </Box>

          {/* Título del Sistema */}
          <Typography
            variant='h6'
            sx={{
              fontWeight: 800,
              color: "#1F2937",
              mb: 1.5,
              lineHeight: 1.3,
            }}
          >
            {system.name}
          </Typography>

          {/* Descripción Cortada Limpiamente con CSS */}
          <Typography
            variant='body2'
            sx={{
              color: "#4B5563",
              lineHeight: 1.6,
              textAlign: "justify",
              display: "-webkit-box",
              WebkitLineClamp: 5,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {system.description}
          </Typography>
        </Box>

        {/* Bloque Inferior: Botón de Acción Sutil */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "#E53888",
            mt: 2,
            pt: 2,
            borderTop: "1px solid #FAFAFA",
            // 🔥 TRUCO: Cuando la tarjeta padre (Link/Paper) tenga hover, anima los hijos aquí dentro
            "../../:hover & .arrow-icon": {
              transform: "translateX(4px)",
            },
          }}
        >
          <Typography
            variant='caption'
            sx={{
              fontWeight: "bold",
              fontSize: "12px",
              textTransform: "uppercase", // Le da un toque más tipo botón de revista
              letterSpacing: "0.5px",
            }}
          >
            Descubrir secreto
          </Typography>
          <ArrowForwardIcon
            sx={{
              fontSize: "14px",
              transition: "transform 0.2s ease-in-out",
            }}
            className='arrow-icon'
          />
        </Box>
      </Paper>
    </Link>
  );
};

export default SystemCard;
