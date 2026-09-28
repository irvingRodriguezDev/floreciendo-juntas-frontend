import React from "react";
import { Box, Typography, Grid, Paper, Stack, useTheme } from "@mui/material";
import { motion } from "framer-motion";

// Iconos que representan cercanía y comunidad
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import DealIcon from "../../components/icons/DealIcon";
import ShowProductIcon from "../../components/icons/ShowProductIcon";
import BuyIcon from "../../components/icons/BuyIcon";
import SupportIcon from "../../components/icons/SupportIcon";

const benefits = [
  {
    title: "Trato Humano y Cercano",
    desc: "No eres un número de pedido. Tu distribuidora local te conoce, te asesora y te apoya en cada paso.",
    icon: <DealIcon width={80} />,
  },
  {
    title: "Mira antes de comprar",
    desc: "Visita el punto de encuentro, toca las texturas y comprueba la calidad real antes de tomar una decisión.",
    icon: <ShowProductIcon width={80} />,
  },
  {
    title: "Sin Costos de Envío",
    desc: "Olvídate de pagar fletes caros. Acércate a tu punto más cercano y llévate tus productos al momento.",
    icon: <BuyIcon width={80} />,
  },
  {
    title: "Respaldo Inmediato",
    desc: "¿Dudas o garantías? Tu distribuidora está a la vuelta de la esquina para resolverlo cara a cara.",
    icon: <SupportIcon width={80} />,
  },
];

const LocalMarketBenefits = () => {
  const theme = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <Box
      sx={{
        py: 6,
        px: 3,
        textAlign: "center",
        background: "linear-gradient(to bottom, #ffffff, #fff5f8)",
        borderRadius: "12px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Typography
          variant='overline'
          sx={{ color: "#D82E7A", fontWeight: 800, letterSpacing: 2 }}
        >
          Comunidad Floreciendo
        </Typography>
        <Typography
          variant='h4'
          sx={{ fontWeight: 800, mt: 1, mb: 2, color: "#1a1a2e" }}
        >
          El poder de comprar <span style={{ color: "#D82E7A" }}>local</span>
        </Typography>
        <Typography
          variant='body1'
          sx={{ color: "text.secondary", maxWidth: 600, mx: "auto", mb: 6 }}
        >
          Conecta con distribuidoras expertas en tu zona. Más que un punto de
          entrega, es un espacio de confianza y crecimiento mutuo.
        </Typography>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
      >
        <Grid container spacing={4} justifyContent='center'>
          {benefits.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
              <motion.div variants={cardVariants} whileHover={{ y: -10 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: "100%",
                    borderRadius: "30px",
                    border: "1px solid rgba(216,46,122,0.1)",
                    background: "#fff",
                    transition: "all 0.3s ease",
                    position: "relative",
                    overflow: "hidden",
                    "&:hover": {
                      boxShadow: "0 20px 40px rgba(216,46,122,0.08)",
                      borderColor: "#D82E7A",
                    },
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "4px",
                      background: "linear-gradient(90deg, #FF4081, #D82E7A)",
                      opacity: 0,
                      transition: "0.3s",
                    },
                    "&:hover::before": { opacity: 1 },
                  }}
                >
                  <Stack spacing={2} alignItems='center'>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: "20px",
                        bgcolor: "#fff5f8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Typography
                      variant='h6'
                      sx={{ fontWeight: 700, fontSize: "1.1rem" }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant='body2'
                      sx={{ color: "text.secondary", lineHeight: 1.7 }}
                    >
                      {item.desc}
                    </Typography>
                  </Stack>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
};

export default LocalMarketBenefits;
