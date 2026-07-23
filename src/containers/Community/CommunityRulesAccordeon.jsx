import React, { useState } from "react";
import {
  Box,
  Card,
  Typography,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PushPinIcon from "@mui/icons-material/PushPin";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import HandshakeIcon from "@mui/icons-material/Handshake";

const rulesList = [
  {
    icon: <FavoriteIcon sx={{ color: "#D82E7A", fontSize: 20 }} />,
    title: "Respeto y Empatía",
    desc: "Un espacio seguro para expresarnos y apoyarnos sin juzgar.",
  },
  {
    icon: <HandshakeIcon sx={{ color: "#D82E7A", fontSize: 20 }} />,
    title: "Colaboración Constructiva",
    desc: "Comparte tips, dudas y conocimientos para crecer juntas.",
  },
  {
    icon: <AutoAwesomeIcon sx={{ color: "#D82E7A", fontSize: 20 }} />,
    title: "Contenido de Valor",
    desc: "Mantén las publicaciones enfocadas en nuestra comunidad.",
  },
];

export default function CommunityRulesCard() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      elevation={0}
      onClick={() => setExpanded(!expanded)}
      sx={{
        borderRadius: "20px",
        background:
          "linear-gradient(135deg, rgba(216, 46, 122, 0.05) 0%, rgba(255, 255, 255, 0.9) 100%)",
        border: "1px solid rgba(216, 46, 122, 0.18)",
        p: 2,
        cursor: "pointer",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 8px 25px rgba(216, 46, 122, 0.08)",
          borderColor: "rgba(216, 46, 122, 0.3)",
        },
      }}
    >
      {/* Header Fijo */}
      <Box display='flex' alignItems='center' justifyContent='space-between'>
        <Box display='flex' alignItems='center' gap={1.5}>
          <Box
            sx={{
              bgcolor: "rgba(216, 46, 122, 0.12)",
              borderRadius: "12px",
              p: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PushPinIcon sx={{ color: "#D82E7A", fontSize: 20 }} />
          </Box>
          <Box>
            <Typography
              variant='subtitle2'
              fontWeight={800}
              sx={{ color: "#1F2937", lineHeight: 1.2, fontSize: "0.95rem" }}
            >
              Reglas de la Comunidad 🌸
            </Typography>
            <Typography
              variant='caption'
              sx={{ color: "#6B7280", fontWeight: 500 }}
            >
              {expanded
                ? "Haz click para ocultar"
                : "Conoce las pautas para una convivencia sana"}
            </Typography>
          </Box>
        </Box>

        <IconButton
          size='small'
          sx={{
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
            color: "#D82E7A",
            bgcolor: "rgba(216, 46, 122, 0.06)",
          }}
        >
          <ExpandMoreIcon />
        </IconButton>
      </Box>

      {/* Contenido Desplegable (Reglas) */}
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <Box
          sx={{ mt: 2, pt: 1.5, borderTop: "1px dashed rgba(216,46,122,0.15)" }}
        >
          <List disablePadding>
            {rulesList.map((rule, idx) => (
              <ListItem key={idx} sx={{ px: 0, py: 0.8 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>{rule.icon}</ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant='body2'
                      fontWeight={700}
                      color='#1F2937'
                    >
                      {rule.title}
                    </Typography>
                  }
                  secondary={
                    <Typography variant='caption' color='#6B7280'>
                      {rule.desc}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Collapse>
    </Card>
  );
}
