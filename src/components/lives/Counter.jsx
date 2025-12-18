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

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const LiveCountdown = ({ startTime }) => {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const startDate = new Date(startTime);

    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining(startDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  if (!timeLeft) return null;

  return (
    <MotionBox
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 6,
        p: { xs: 4, md: 6 },
        background:
          "linear-gradient(180deg, #FFE6F0 0%, #FFF7FB 60%, #FFFFFF 100%)",
        boxShadow: "0 25px 60px rgba(200,90,142,0.25)",
      }}
    >
      {/* ✨ Decoración superior */}
      <Box
        sx={{
          position: "absolute",
          top: -60,
          right: -60,
          width: 180,
          height: 180,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,192,218,0.45) 0%, transparent 70%)",
        }}
      />

      {/* ✨ Decoración inferior */}
      <Box
        sx={{
          position: "absolute",
          bottom: -80,
          left: -80,
          width: 220,
          height: 220,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,214,232,0.5) 0%, transparent 70%)",
        }}
      />

      {/* 🌸 Título */}
      <Typography
        sx={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          color: "#C85A8E",
          fontSize: { xs: 24, md: 32 },
          mb: 1,
          textAlign: "center",
        }}
      >
        El live comienza en
      </Typography>

      <Typography
        sx={{
          textAlign: "center",
          color: "#8A2C5D",
          fontSize: { xs: 14, md: 16 },
          mb: 4,
        }}
      >
        Prepárate para una experiencia especial 🌷
      </Typography>

      {/* ⏳ Contador */}
      <Grid container spacing={3} justifyContent='center'>
        {Object.entries(timeLeft).map(([label, value], index) => (
          <Grid key={label}>
            <motion.div
              variants={itemVariant}
              initial='hidden'
              animate='visible'
              transition={{ delay: index * 0.1 }}
            >
              <Box
                sx={{
                  background: "#FFFFFF",
                  borderRadius: 4,
                  px: 3.5,
                  py: 2.5,
                  minWidth: 90,
                  boxShadow: "0 10px 25px rgba(200,90,142,0.15)",
                  position: "relative",
                }}
              >
                {/* 🌸 brillo */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 6,
                    right: 6,
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "#FFD6EA",
                  }}
                />

                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: 26, md: 30 },
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
                    letterSpacing: 1,
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
