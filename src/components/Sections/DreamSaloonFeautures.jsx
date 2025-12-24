import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { motion } from "framer-motion";
import InteriorDesign from "../icons/InteriorDesign";
import CreditCardIcon from "../icons/CreditCardIcon";
import CalendarIcon from "../icons/CalendarIcon";
import TruckIcon from "../icons/TruckIcon";

const features = [
  {
    title: "Arma el salón de tus sueños 💫",
    description:
      "Elige cada detalle: mobiliario, estilo y ambiente perfecto para ti. Diseña tu espacio ideal con nosotros.",
    icon: <InteriorDesign width={100} />,
  },
  {
    title: "Aparta con solo el 10% 💰",
    description:
      "Comienza tu proyecto sin preocupaciones. Solo necesitas el 10% del total para asegurar tu salón.",
    icon: <CreditCardIcon width={100} />,
  },
  {
    title: "Tienes hasta 6 meses para liquidarlo ⏳",
    description:
      "Realiza tus pagos a tu ritmo. Disfruta de flexibilidad total para completar tu inversión.",
    icon: <CalendarIcon width={100} />,
  },
  {
    title: "Recíbelo en tu domicilio 🚚",
    description:
      "Nos encargamos de llevarte todo hasta la puerta de tu casa, con costo adicional ",
    icon: <TruckIcon width={100} />,
  },
];

export default function DreamSalonFeatures() {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#fff",
        py: { xs: 6, md: 10 },
        px: { xs: 3, md: 8 },
        borderRadius: "20px",
      }}
    >
      <Typography
        variant='h4'
        sx={{
          textAlign: "center",
          mb: 6,
          fontWeight: 700,
          color: "#351C43",
          fontSize: { xs: "2rem", md: "2.5rem" },
        }}
      >
        ✨ Los beneficios del{" "}
        <span style={{ color: "#c94f7c" }}>salón de tus sueños</span>
      </Typography>

      <Grid
        container
        spacing={4}
        justifyContent='center'
        alignItems='stretch'
        sx={{ textAlign: "center" }}
      >
        {features.map((feature, index) => (
          <Grid
            key={index}
            size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            component={motion.div}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Box
              sx={{
                px: 2,
                borderRight:
                  index !== features.length - 1
                    ? "1px dashed rgba(201, 79, 124, 0.3)"
                    : "none",
                height: "100%",
              }}
            >
              {feature.icon}
              <Typography
                variant='h6'
                sx={{
                  fontWeight: 700,
                  color: "#351C43",
                  mb: 1,
                  fontSize: { xs: "1.1rem", md: "1.25rem" },
                }}
              >
                {feature.title}
              </Typography>
              <Typography
                sx={{
                  color: "#5e4c63",
                  fontSize: { xs: "0.95rem", md: "1rem" },
                  maxWidth: 280,
                  mx: "auto",
                  lineHeight: 1.5,
                }}
              >
                {feature.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
