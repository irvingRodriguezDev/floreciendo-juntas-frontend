import { alpha, Box, Typography } from "@mui/material";
import React from "react";
import Marquee from "react-fast-marquee";
const BannerMarquee = () => {
  return (
    <Box
      sx={{
        mb: { xs: 5, md: 7 },
        width: "100%",
        backgroundColor: alpha("#E53888", 0.08),
        py: 1.5,
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      <Marquee speed={45} gradient={false}>
        <Typography
          variant='h6'
          sx={{
            fontWeight: 900,
            color: "#E53888",
            letterSpacing: "1.5px",
            mx: 4,
            fontSize: { xs: "1.1rem", md: "1.3rem" },
            textTransform: "uppercase",
          }}
        >
          🎁 ¡Gana el salón de tus sueños equipado por Wapizima! 🎁
        </Typography>
        <Typography
          variant='h6'
          sx={{
            fontWeight: 900,
            color: "#2B1B24",
            letterSpacing: "1.5px",
            mx: 4,
            fontSize: { xs: "1.1rem", md: "1.3rem" },
            textTransform: "uppercase",
          }}
        >
          • Rifa exclusiva con tu membresía activa •
        </Typography>
      </Marquee>
    </Box>
  );
};

export default BannerMarquee;
