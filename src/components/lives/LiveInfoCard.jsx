import React, { useState } from "react";
import { Box, Typography, IconButton, Tooltip, Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { motion, AnimatePresence } from "framer-motion";

const LiveInfoCard = ({
  title,
  html,
  category = "Detalle del evento",
  defaultExpanded = false,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [copied, setCopied] = useState(false);

  // Función para copiar el texto plano sin etiquetas HTML
  const handleCopy = (e) => {
    e.stopPropagation();
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const textToCopy = tempDiv.innerText || tempDiv.textContent;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClickExpand = () => {
    setExpanded(true);
  };

  return (
    <Box
      component={motion.div}
      layout
      transition={{ layout: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
      onClick={() => setExpanded(!expanded)}
      sx={{
        borderRadius: "24px",
        background: expanded
          ? "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 235, 245, 0.85) 100%)"
          : "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(20px)",
        border: "1px solid",
        borderColor: expanded
          ? "rgba(229, 56, 136, 0.35)"
          : "rgba(255, 255, 255, 0.8)",
        boxShadow: expanded
          ? "0 20px 45px -12px rgba(229, 56, 136, 0.18), inset 0 1px 2px rgba(255, 255, 255, 0.9)"
          : "0 10px 25px -10px rgba(180, 50, 110, 0.08)",
        p: { xs: 2.5, sm: 3 },
        mb: 2.5,
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          borderColor: "rgba(229, 56, 136, 0.3)",
          boxShadow: "0 14px 30px -8px rgba(229, 56, 136, 0.12)",
        },
      }}
    >
      {/* 🌸 HEADER DE LA TARJETA */}
      <Box
        display='flex'
        alignItems='flex-start'
        justifyContent='space-between'
      >
        <Box flex={1} pr={2}>
          {/* Badge de Categoría */}
          <Box display='flex' alignItems='center' gap={0.8} mb={1}>
            <InfoOutlinedIcon sx={{ fontSize: 14, color: "#E53888" }} />
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 1.2,
                color: "#E53888",
                textTransform: "uppercase",
              }}
            >
              {category}
            </Typography>
          </Box>

          {/* Título Principal */}
          <Typography
            variant='h6'
            sx={{
              fontWeight: 800,
              fontSize: { xs: "1rem", sm: "1.15rem" },
              color: "#4A2235",
              letterSpacing: -0.2,
              lineHeight: 1.3,
            }}
          >
            {title}
          </Typography>
        </Box>

        {/* ACCIONES (Copiar + Desplegar) */}
        <Box
          display='flex'
          alignItems='center'
          gap={1}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Botón Funcional Copiar */}
          <Tooltip
            title={copied ? "¡Copiado!" : "Copiar información"}
            arrow
            placement='top'
          >
            <IconButton
              onClick={handleCopy}
              size='small'
              sx={{
                backgroundColor: copied
                  ? "rgba(46, 125, 50, 0.1)"
                  : "rgba(255, 255, 255, 0.9)",
                color: copied ? "#2e7d32" : "#9B6A84",
                border: "1px solid rgba(0,0,0,0.05)",
                width: 36,
                height: 36,
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "#FFF0F6",
                  color: "#E53888",
                },
              }}
            >
              {copied ? (
                <CheckIcon fontSize='small' />
              ) : (
                <ContentCopyIcon fontSize='small' />
              )}
            </IconButton>
          </Tooltip>

          {/* Botón Flecha Desplegable */}
          <IconButton
            onClick={() => setExpanded(!expanded)}
            sx={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              backgroundColor: expanded
                ? "rgba(229, 56, 136, 0.12)"
                : "rgba(255, 255, 255, 0.9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <ExpandMoreIcon
              sx={{
                color: expanded ? "#E53888" : "#9B6A84",
                transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
          </IconButton>
        </Box>
      </Box>

      {/* 📝 CONTENIDO EXPANDIBLE CON ANIMACIÓN SUAVE */}
      <Collapse in={expanded} timeout={300} unmountOnExit>
        <Box
          sx={{
            pt: 2.5,
            mt: 2,
            borderTop: "1px solid rgba(229, 56, 136, 0.12)",
            color: "#4A3A50",
            fontSize: { xs: "0.92rem", sm: "0.98rem" },
            lineHeight: 1.7,
            "& p": { mb: 1.5, "&:last-child": { mb: 0 } },
            "& strong": { color: "#80224D", fontWeight: 700 },
            "& a": {
              color: "#E53888",
              fontWeight: 700,
              textDecoration: "none",
              borderBottom: "1.5px dashed #E53888",
              transition: "all 0.2s ease",
              "&:hover": {
                color: "#B82E6B",
                borderBottomStyle: "solid",
              },
            },
            "& ul, & ol": { pl: 2, mb: 1 },
            "& li": { mb: 0.5 },
          }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Collapse>
    </Box>
  );
};

export default LiveInfoCard;
