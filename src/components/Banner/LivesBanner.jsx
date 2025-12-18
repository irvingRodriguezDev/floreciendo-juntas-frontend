// src/components/Lives/LivesBanner.jsx
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import flor1 from "../../assets/images/FLOR ROSA CONVEN.png";
import flor2 from "../../assets/images/Gerbera Daisy -7.png";
import flor3 from "../../assets/images/GERBERA MAGENTA.png";

const LivesBanner = () => {
  return (
    <Box
      component={motion.section}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      sx={{
        width: "100%",
        minHeight: { xs: "70vh", md: "60vh" },
        background: "linear-gradient(180deg, #ffeef5 0%, #fff7fb 100%)",
        borderRadius: { xs: "0 0 32px 32px", md: "0 0 48px 48px" },
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        px: { xs: 2, sm: 4 },
      }}
    >
      {/* 🌸 FLOR izquierda */}
      <Box
        component='img'
        src={flor2}
        alt='decoración floral'
        sx={{
          position: "absolute",
          left: -30,
          top: 0,
          width: { xs: 90, md: 180 },
          opacity: 0.5,
          display: { xs: "none", sm: "block" },
        }}
      />

      {/* 🌸 FLOR derecha */}
      <Box
        component='img'
        src={flor1}
        alt='decoración floral'
        sx={{
          position: "absolute",
          right: -30,
          bottom: 0,
          width: { xs: 90, md: 180 },
          opacity: 0.5,
          display: { xs: "none", sm: "block" },
        }}
      />

      {/* 🌿 Shape inferior */}
      <Box
        component='img'
        src={flor3}
        alt=''
        sx={{
          position: "absolute",
          bottom: -20,
          left: 0,
          width: "100%",
          opacity: 0.54,
        }}
      />

      {/* 🌷 TEXTO */}
      <Box
        component={motion.div}
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        sx={{
          textAlign: "center",
          zIndex: 10,
          px: 2,
        }}
      >
        <Typography
          component='h1'
          sx={{
            fontSize: { xs: "2rem", sm: "2.4rem", md: "3rem" },
            fontWeight: 900,
            mb: 2,
            color: "#9B365F",
            letterSpacing: "-0.5px",
          }}
        >
          Floreciendo Juntas en Vivo
        </Typography>

        <Typography
          component='p'
          sx={{
            color: "#6D5A63",
            maxWidth: 560,
            mx: "auto",
            fontSize: { xs: "1rem", md: "1.1rem" },
          }}
        >
          Espacios creados para crecer, aprender y florecer juntas 🌷
        </Typography>
      </Box>
    </Box>
  );
};

export default LivesBanner;
