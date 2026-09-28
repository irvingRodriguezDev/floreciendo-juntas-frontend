import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

const PinkSpinner = ({ fullscreen = false, label = "Cargando..." }) => {
  const spinner = (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      gap={2}
    >
      <CircularProgress
        size={70}
        thickness={5}
        sx={{
          color: "#ec407a", // tono rosa MUI
          "& .MuiCircularProgress-circle": {
            strokeLinecap: "round",
          },
        }}
      />
      {label && (
        <Typography variant='body1' sx={{ color: "#ec407a", fontWeight: 500 }}>
          {label}
        </Typography>
      )}
    </Box>
  );

  if (fullscreen) {
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(255, 240, 245, 0.7)", // fondo suave rosado
          zIndex: 9999,
        }}
      >
        {spinner}
      </Box>
    );
  }

  return spinner;
};

export default PinkSpinner;
