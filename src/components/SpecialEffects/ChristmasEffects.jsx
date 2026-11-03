import React from "react";
import Snowfall from "react-snowfall"; // Puedes instalarlo con npm i react-snowfall

const ChristmasEffects = ({ enabled }) => {
  if (!enabled) return null;

  return (
    <Snowfall
      snowflakeCount={45} // Cantidad moderada para que no estorbe
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        pointerEvents: "none", // Permite hacer clic a través de los copos
      }}
      color='#FFD9E2' // Copos en tonos rosados/blancos acordes a tu marca
    />
  );
};

export default ChristmasEffects;
