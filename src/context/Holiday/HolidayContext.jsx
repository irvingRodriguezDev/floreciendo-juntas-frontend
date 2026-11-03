import React, { createContext, useContext, useState } from "react";

const HolidayContext = createContext();

export const HolidayProvider = ({ children }) => {
  // Puedes cambiar esto a `false` por defecto, o leerlo de localStorage
  const [isHolidayMode, setIsHolidayMode] = useState(() => {
    return localStorage.getItem("holidayMode") === "true"; // Por defecto apagado o encendido según prefieras
  });

  const toggleHolidayMode = () => {
    setIsHolidayMode((prev) => {
      const nextState = !prev;
      localStorage.setItem("holidayMode", String(nextState));
      return nextState;
    });
  };

  return (
    <HolidayContext.Provider value={{ isHolidayMode, toggleHolidayMode }}>
      {children}
    </HolidayContext.Provider>
  );
};

export const useHoliday = () => useContext(HolidayContext);
