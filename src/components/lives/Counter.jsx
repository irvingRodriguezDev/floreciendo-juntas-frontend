import React, { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const getTimeRemaining = (targetDate) => {
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();

  if (difference <= 0) return null;

  return {
    días: Math.floor(difference / (1000 * 60 * 60 * 24)),
    horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutos: Math.floor((difference / (1000 * 60)) % 60),
    segundos: Math.floor((difference / 1000) % 60),
  };
};

const LiveCountdown = ({ startTime }) => {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const startDate = new Date(startTime);

    const update = () => {
      setTimeLeft(getTimeRemaining(startDate));
    };

    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [startTime]);

  if (!timeLeft) return null;

  return (
    <MotionBox
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      sx={{
        maxWidth: 920,
        mx: "auto",
        borderRadius: { xs: 4, md: 6 },
        px: { xs: 2.5, sm: 4, md: 6 },
        py: { xs: 4, md: 5 },
        background: "#FFF4FA",
        textAlign: "center",
      }}
    >
      {/* 🌸 TÍTULO */}
      <Typography
        sx={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          color: "#C85A8E",
          fontSize: { xs: 22, sm: 26, md: 32 },
          mb: 1,
        }}
      >
        El live comienza en
      </Typography>

      <Typography
        sx={{
          color: "#6D5A63",
          fontSize: { xs: 14, md: 16 },
          mb: { xs: 3, md: 4 },
          maxWidth: 520,
          mx: "auto",
        }}
      >
        Un espacio para compartir, aprender y florecer juntas 🌷
      </Typography>

      {/* ⏳ CONTADOR */}
      <Grid container spacing={{ xs: 2, md: 3 }} justifyContent='center'>
        {Object.entries(timeLeft).map(([label, value], index) => (
          <Grid item key={label}>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
              }}
            >
              <Box
                sx={{
                  minWidth: { xs: 72, sm: 88 },
                  px: { xs: 2, sm: 2.5 },
                  py: { xs: 1.8, sm: 2.2 },
                  borderRadius: 3,
                  background: "#FFFFFF",
                  boxShadow: "0 10px 28px rgba(200,90,142,0.15)",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: 22, sm: 26 },
                    color: "#E53888",
                    lineHeight: 1,
                  }}
                >
                  {value}
                </Typography>

                <Typography
                  sx={{
                    mt: 0.5,
                    fontSize: 11,
                    letterSpacing: 0.8,
                    color: "#9B6A84",
                    textTransform: "uppercase",
                  }}
                >
                  {label}
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </MotionBox>
  );
};

export default LiveCountdown;
