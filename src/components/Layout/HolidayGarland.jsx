import React from "react";
import { Box } from "@mui/material";
import { keyframes } from "@emotion/react";

// Animación sutil de parpadeo para las lucecitas de la serie
const twinkle = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(0.9); }
  50% { opacity: 1; transform: scale(1.2); filter: drop-shadow(0 0 6px #FFD9E2); }
`;

const HolidayGarland = () => {
  // Generamos un arreglo de foquitos distribuidos a lo largo de la barra
  const lights = Array.from({ length: 28 });

  return (
    <Box
      sx={{
        width: "100%",
        height: "24px",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
        my: 0.5,
        pointerEvents: "none", // Para que no interfiera con clics
      }}
    >
      {/* Hilo o cable sutil y delgado que cruza de lado a lado */}
      <Box
        sx={{
          position: "absolute",
          top: "6px",
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(229,56,136,0.25), transparent)",
        }}
      />

      {/* Contenedor de los foquitos y adornos de la serie */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "100%",
          px: 2,
        }}
      >
        {lights.map((_, index) => {
          // Alternamos colores y formas entre luces redondas y pequeñas estrellitas/esferas
          const isSpecial = index % 5 === 0;
          const isPink = index % 2 === 0;

          return (
            <Box
              key={index}
              sx={{
                width: isSpecial ? "10px" : "6px",
                height: isSpecial ? "10px" : "6px",
                borderRadius: "50%",
                backgroundColor: isPink ? "#E53888" : "#FFFFFF",
                boxShadow: isPink
                  ? "0 0 8px rgba(229, 56, 136, 0.8)"
                  : "0 0 8px rgba(255, 255, 255, 0.9)",
                animation: `${twinkle} ${1.5 + (index % 3)}s infinite ease-in-out`,
                animationDelay: `${index * 0.15}s`,
                position: "relative",
                top: `${Math.sin(index) * 4}px`, // Da un efecto sutil de curva colgada
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default HolidayGarland;
