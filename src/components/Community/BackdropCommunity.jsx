import { Backdrop, Paper, Typography } from "@mui/material";
import React from "react";

const BackdropCommunity = () => {
  return (
    <Backdrop
      open
      sx={{
        position: "absolute",
        inset: 0,
        zIndex: 5,
        background: "rgba(255,240,247,0.75)",
        backdropFilter: "blur(8px)",
        borderRadius: 4,
      }}
    >
      {/* <CreatePostInput /> */}
      <Paper sx={{ padding: "29px", borderRadius: "20px" }}>
        <Typography
          variant='h3'
          textAlign='center'
          fontWeight='bold'
          sx={{ color: "#d82e7a" }}
        >
          Atención
        </Typography>
        <Typography variant='subtitle1' textAlign='justify'>
          Para poder visualizar, el contenido de la comunidad debes <br />
          iniciar sesión y contar con una suscripcion vigente
        </Typography>
      </Paper>
    </Backdrop>
  );
};

export default BackdropCommunity;
