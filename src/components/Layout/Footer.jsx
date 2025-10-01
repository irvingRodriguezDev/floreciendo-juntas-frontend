// Footer.jsx
import React from "react";
import { Box, Container } from "@mui/material";

const Footer = ({}) => {
  return (
    <Box
      component='footer'
      sx={{
        width: "100%",
        bgcolor: "#0000", // fondo negro oscuro
        color: "white", // texto blanco
        py: 2, // padding vertical
        px: 3, // padding horizontal
        position: "absolute", // siempre fijo
        bottom: 0, // al final de la página
        left: 0,
        textAlign: "center",
        zIndex: 1000, // para que esté arriba de otros elementos
      }}
    >
      <Container maxWidth='lg'>
        {"© 2025 Wapizima. Todos los derechos reservados."}
      </Container>
    </Box>
  );
};

export default Footer;
