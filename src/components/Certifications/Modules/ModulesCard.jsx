import { Box, Button, Chip, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ModulesCard = ({ module, index, total }) => {
  if (!module) return null;
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12 }}
      sx={{
        position: "relative",
        display: "flex",
        gap: 4,
        pb: 6,
      }}
    >
      {/* Línea vertical elegante */}
      {index !== total - 1 && (
        <Box
          sx={{
            position: "absolute",
            left: 14,
            top: 35,
            bottom: 0,
            width: "2px",
            background: "linear-gradient(180deg, #F8BBD0 0%, transparent 100%)",
          }}
        />
      )}

      {/* Círculo indicador */}
      <Box
        sx={{
          minWidth: 30,
          height: 30,
          borderRadius: "50%",
          bgcolor: module.delivered ? "#D82F7A" : "#F8BBD0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: "14px",
          fontWeight: "bold",
          boxShadow:
            module.status === "submited"
              ? "0 6px 18px rgba(216,47,122,0.4)"
              : "none",
        }}
      >
        {index + 1}
      </Box>

      {/* Contenido */}
      <Box sx={{ flex: 1 }}>
        {/* Header módulo */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#111",
              wordBreak: "break-word",
            }}
          >
            {module.title}
          </Typography>

          <Chip
            label={module.delivered ? "Entregado" : "Pendiente"}
            sx={{
              bgcolor: module.delivered ? "#DA327C" : "#FFF4FA",
              color: module.delivered ? "#FFF" : "#DA327C",
              fontWeight: 600,
              borderRadius: "8px",
            }}
          />
        </Box>

        <Typography
          sx={{
            color: "#666",
            mb: 3,
            lineHeight: 1.6,
            maxWidth: "650px",
          }}
        >
          {module.description}
        </Typography>

        {/* Botones */}

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Link to={`/detalle-modulo/${module.id}`}>
            <Button
              sx={{
                textTransform: "none",
                fontWeight: 600,
                color: "#D82F7A",
                borderRadius: "30px",
              }}
            >
              Explorar módulo →
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default ModulesCard;
