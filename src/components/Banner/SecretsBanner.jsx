import React from "react";
import { Box, Typography, Container, Stack } from "@mui/material";
import { motion } from "framer-motion";
import underline from "../../assets/svg/underline.svg";

const SecretsBanner = () => {
  return (
    <Box
      component={motion.section}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      sx={{
        minHeight: {
          xs: "28vh",
          sm: "34vh",
          md: "38vh",
        },
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        mt: { xs: 5, lg: 2 },
        background: `
#FFF4FA
        `,
      }}
    >
      {/* 🌿 Glow decorativo */}
      <Box
        component={motion.div}
        animate={{ y: [0, -16, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        sx={{
          position: "absolute",
          top: "12%",
          left: "8%",
          width: 140,
          height: 140,
          borderRadius: "50%",
          bgcolor: "rgba(214, 51, 132, 0.18)",
          filter: "blur(45px)",
        }}
      />

      <Box
        component={motion.div}
        animate={{ y: [0, 22, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
        sx={{
          position: "absolute",
          bottom: "10%",
          right: "10%",
          width: 180,
          height: 180,
          borderRadius: "50%",
          bgcolor: "rgba(255, 205, 220, 0.45)",
          filter: "blur(55px)",
        }}
      />

      {/* 🌸 Contenido */}
      <Container maxWidth='lg' sx={{ zIndex: 2 }}>
        <Stack alignItems='center' spacing={2}>
          {/* Overline */}
          <Typography
            component={motion.p}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            sx={{
              color: "#d63384",
              fontWeight: 600,
              fontSize: { xs: "0.9rem", sm: "1.05rem" },
              letterSpacing: 3,
              textAlign: "center",
            }}
          >
            LA FÓRMULA DEL ÉXITO
          </Typography>

          {/* Título principal */}
          <Typography
            component={motion.h1}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            sx={{
              fontWeight: 900,
              textAlign: "center",
              color: "#D82E7A",
              lineHeight: 1.15,
              fontSize: {
                xs: "2.1rem", // 📱 mobile first
                sm: "2.8rem",
                md: "3.6rem",
              },
              maxWidth: 900,
            }}
          >
            Descubre los 10 Secretos{" "}
            <Box
              component='span'
              sx={{
                display: "inline-block",
                position: "relative",
                px: 1,
              }}
            >
              para ser exitosa en tu negocio de belleza
              <Box
                component='span'
                sx={{
                  position: "absolute",
                  left: 0,
                  bottom: -10,
                  width: "100%",
                  height: 16,
                  backgroundImage: `url(${underline})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                }}
              />
            </Box>
          </Typography>

          {/* Línea decorativa inferior */}
          <Box
            component={motion.div}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            sx={{
              width: 90,
              height: 4,
              bgcolor: "#d63384",
              borderRadius: 10,
              mt: 3,
            }}
          />
        </Stack>
      </Container>
    </Box>
  );
};

export default SecretsBanner;
