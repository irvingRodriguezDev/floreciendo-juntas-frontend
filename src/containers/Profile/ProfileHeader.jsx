import React from "react";
import { Box, Typography } from "@mui/material";
// Ícono de flor para un toque visual
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";

const PRIMARY_PINK = "#E53888";
const NAME_SCRIPT_COLOR = "#D1789C"; // Un rosa más suave

const ProfileHeader = ({ name, role, description }) => {
  return (
    <Box
      sx={{
        p: 3,
        mt: 3,
        borderRadius: "16px",
        bgcolor: "white",
        boxShadow: "0 4px 10px rgba(0,0,0,0.20)",
        textAlign: "center",
      }}
    >
      <SpaOutlinedIcon sx={{ color: PRIMARY_PINK, fontSize: 40, mb: 1 }} />

      {/* Nombre con Fuente Script (asumiendo que está cargada) */}
      <Typography
        variant='h2'
        sx={{
          color: NAME_SCRIPT_COLOR,
          fontSize: { xs: "3rem", md: "4rem" },
          lineHeight: 1,
        }}
      >
        {name}
      </Typography>

      {/* Rol/Título */}
      <Typography
        variant='h6'
        color='text.secondary'
        sx={{ mt: 1, fontWeight: 500 }}
      >
        {role}
      </Typography>

      {/* Descripción/Frase */}
      <Typography
        variant='body1'
        color='text.primary'
        sx={{ mt: 2, maxWidth: 500, mx: "auto" }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default ProfileHeader;
