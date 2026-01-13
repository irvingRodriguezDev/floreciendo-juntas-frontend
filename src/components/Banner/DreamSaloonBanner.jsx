import React from "react";
import { Box, Typography, Button } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
export default function SalonHeroSimple() {
  return (
    <Box
      component='section'
      sx={{
        width: "100%",
        minHeight: {
          xs: "18vh",
          sm: "34vh",
          md: "38vh",
        },
        px: { xs: 2.5, sm: 4, md: 6 },
        py: { xs: 2, md: 0 },
        display: "flex",
        alignItems: "center",
        background: "#fff4fa",
      }}
    >
      <Box
        sx={{
          maxWidth: 720,
          mx: "auto",
          textAlign: "center",
        }}
      >
        {/* TITULO */}
        <Typography
          sx={{
            fontWeight: 900,
            color: "#351C43",
            fontSize: {
              xs: "2rem",
              sm: "2.6rem",
              md: "3.2rem",
            },
            mb: 2,
            lineHeight: 1.2,
          }}
        >
          Construye el salón que siempre imaginaste
        </Typography>

        {/* SUBTITULO */}
        <Typography
          sx={{
            color: "#4a3a50",
            fontSize: {
              xs: "1rem",
              sm: "1.1rem",
              md: "1.25rem",
            },
            lineHeight: 1.75,
            mb: 4,
            maxWidth: 620,
            mx: "auto",
          }}
        >
          Aprende a transformar tu idea en un salón con identidad, estructura y
          visión de negocio. Desde el concepto hasta un proyecto sólido y
          rentable.
        </Typography>

        {/* CTA */}
        <Button
          variant='contained'
          endIcon={<ArrowDownwardIcon />}
          onClick={() =>
            window.scrollBy({
              top: 550,
              behavior: "smooth",
            })
          }
          sx={{
            backgroundColor: "#d33682",
            color: "#fff",
            fontWeight: 600,
            px: 4,
            py: 1.4,
            borderRadius: "30px",
            textTransform: "none",
            fontSize: "1rem",
            "&:hover": {
              backgroundColor: "#b92f70",
            },
          }}
        >
          Desliza para conocer los beneficios y productos
        </Button>
      </Box>
    </Box>
  );
}
