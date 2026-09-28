import * as React from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { Typography, Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

// 💖 Barra estilizada con fix de transform para MUI
const PremiumLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 10,
  backgroundColor: "#FCE4EC",
  overflow: "hidden",
  // Modificamos directamente la barra interna de tipo determinate
  [`& .${linearProgressClasses.bar1Determinate}`]: {
    borderRadius: 10,
    background:
      "linear-gradient(90deg, #E91E63 0%, #FF4081 50%, #C2185B 100%) !important",
    boxShadow: "0px 2px 8px rgba(233, 30, 99, 0.4)",
    // Aseguramos que la transición interna de MUI no colisione
    transition: "transform .0001s linear",
  },
}));

export default function Progress({ progress = 0 }) {
  // Aseguramos que el valor no pase de 100 ni baje de 0
  const normalizedProgress = Math.min(100, Math.max(0, Number(progress) || 0));
  const roundedProgress = Math.round(normalizedProgress);
  const isCompleted = roundedProgress >= 100;

  return (
    <Stack spacing={0.8} sx={{ flexGrow: 1, width: "100%" }}>
      {/* Encabezado e indicador del porcentaje */}
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Typography
          variant='caption'
          sx={{
            color: "#666",
            fontWeight: 600,
            fontSize: "0.75rem",
            letterSpacing: 0.5,
            textTransform: "uppercase",
          }}
        >
          {isCompleted ? "Completado" : "Tu Progreso"}
        </Typography>

        {/* Badge para el porcentaje */}
        <Box
          sx={{
            background: isCompleted
              ? "linear-gradient(135deg, #10B981 0%, #059669 100%)"
              : "linear-gradient(135deg, #FF4081 0%, #C2185B 100%)",
            borderRadius: "12px",
            px: 1,
            py: 0.2,
            boxShadow: isCompleted
              ? "0 2px 6px rgba(16, 185, 129, 0.3)"
              : "0 2px 6px rgba(194, 24, 91, 0.25)",
          }}
        >
          <AnimatePresence mode='wait'>
            <motion.div
              key={roundedProgress}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
            >
              <Typography
                variant='caption'
                sx={{
                  color: "#FFF",
                  fontWeight: 700,
                  fontSize: "0.7rem",
                  lineHeight: 1,
                  display: "block",
                }}
              >
                {roundedProgress}%
              </Typography>
            </motion.div>
          </AnimatePresence>
        </Box>
      </Box>

      {/* Barra de progreso */}
      <PremiumLinearProgress variant='determinate' value={normalizedProgress} />
    </Stack>
  );
}
