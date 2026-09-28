import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Stack } from "@mui/material";
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
    const update = () => setTimeLeft(getTimeRemaining(startDate));
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [startTime]);

  if (!timeLeft) return null;

  return (
    <MotionBox
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      sx={{
        maxWidth: 980,
        mx: "auto",
        px: { xs: 3, sm: 5, md: 7 },
        py: { xs: 4, md: 6 },
        borderRadius: "28px",
        background: "#FFF4FA",
        backdropFilter: "blur(14px)",
        textAlign: "center",
      }}
    >
      {/* 🌸 HEADER */}
      <Stack spacing={1.2} mb={{ xs: 4, md: 5 }}>
        <Typography
          sx={{
            fontWeight: 900,
            fontSize: { xs: 22, sm: 28, md: 34 },
            color: "#9B365F",
            letterSpacing: 0.3,
          }}
        >
          El live comienza en
        </Typography>
      </Stack>

      {/* ⏳ CONTADOR */}
      <Grid container spacing={{ xs: 2, md: 3 }} justifyContent='center'>
        {Object.entries(timeLeft).map(([label, value], index) => (
          <Grid size={{ xs: 12, sm: 3 }} key={label}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Box
                sx={{
                  height: "100%",
                  borderRadius: "22px",
                  background: "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(10px)",
                  px: { xs: 2.5, sm: 3 },
                  py: { xs: 2.5, sm: 3 },
                  boxShadow: "0 18px 45px rgba(200,90,142,0.18)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 900,
                    fontSize: {
                      xs: 38,
                      sm: 52,
                      md: 64,
                    },
                    color: "#E53888",
                    lineHeight: 1,
                  }}
                >
                  {String(value).padStart(2, "0")}
                </Typography>

                <Typography
                  sx={{
                    mt: 1,
                    fontSize: { xs: 11, sm: 13 },
                    letterSpacing: 1.4,
                    fontWeight: 700,
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
