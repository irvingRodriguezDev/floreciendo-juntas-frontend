import React, { useContext } from "react";
import { Typography } from "@mui/material";
import AuthContext from "../context/Auth/AuthContext";

const HeroDescription = () => {
  const { autenticado, usuario } = useContext(AuthContext);
  console.log(usuario, "el usuario");

  // Evaluamos si la usuaria tiene la suscripción activa
  const isSubscribed =
    autenticado &&
    (Number(usuario?.isSubscribed) === 1 || usuario?.isSubscribed === true);

  return (
    <Typography
      variant='body1'
      sx={{
        color: "rgba(255, 255, 255, 0.95)",
        mb: 4,
        maxWidth: 520,
        fontSize: { xs: "0.95rem", sm: "1.05rem" },
        lineHeight: 1.6,
        mx: { xs: "auto", md: 0 },
      }}
    >
      {isSubscribed ? (
        <>
          ¡Qué alegría verte de nuevo! 🌸 Ya tienes acceso completo a todas tus
          <b> clases en vivo</b>, <b>cursos exclusivos</b> y tu participacion en
          el sorteo mensual. Sigue preparando tu talento y haciendo crecer tu
          negocio.
        </>
      ) : (
        <>
          Fortalece tu talento, amplía tu visión y aprende a construir un
          negocio rentable. Cursos exclusivos, clases en vivo y rifas mensuales
          por solo <b>$200 MXN/mes</b>. Porque <b>Florecer</b> no es casualidad,
          es preparación. 💗
        </>
      )}
    </Typography>
  );
};

export default HeroDescription;
