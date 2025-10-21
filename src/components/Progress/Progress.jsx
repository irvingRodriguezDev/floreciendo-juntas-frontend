import * as React from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { Typography, Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

// 🌈 Estilo personalizado del LinearProgress
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 6,
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.grey[200]
      : theme.palette.grey[800],
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 6,
    backgroundImage:
      "linear-gradient(90deg, #FF7BA9 0%, #DB4586 50%, #C2185B 100%)",
    transition: "all 0.4s ease",
  },
}));

export default function Progress({ progress = 0 }) {
  return (
    <Stack spacing={0.5} sx={{ flexGrow: 1 }}>
      {/* Porcentaje animado */}
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Typography
          variant='caption'
          sx={{
            color: "text.secondary",
            fontWeight: 500,
            letterSpacing: 0.3,
          }}
        >
          Progreso
        </Typography>

        <AnimatePresence mode='wait'>
          <motion.div
            key={progress}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
          >
            <Typography
              variant='subtitle2'
              sx={{
                color: "#DB4586",
                fontWeight: 600,
                minWidth: 40,
                textAlign: "right",
              }}
            >
              {Math.round(progress)}%
            </Typography>
          </motion.div>
        </AnimatePresence>
      </Box>

      {/* Barra de progreso */}
      <BorderLinearProgress
        variant='determinate'
        value={progress}
        sx={{
          mt: 0.3,
          boxShadow: "0 0 4px rgba(219, 69, 134, 0.3)",
        }}
      />
    </Stack>
  );
}
