// src/context/GoogleMaps/GoogleMapsProvider.jsx
//
// ─── POR QUÉ EXISTE ESTE ARCHIVO ─────────────────────────────────────────────
// @react-google-maps/api solo permite inicializar el loader UNA vez por sesión.
// Si dos componentes llaman a useJsApiLoader con opciones distintas (libraries,
// language, region…) el segundo lanza:
//   "Loader must not be called again with different options"
//
// Solución: un único Provider en la raíz del árbol que carga el script y expone
// { isLoaded, loadError } a cualquier componente hijo via Context.
// ─────────────────────────────────────────────────────────────────────────────

import React, { createContext, useContext } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

// Opciones unificadas — incluye "places" para que tanto el mapa como
// el autocomplete de registro funcionen sin conflicto.
const GOOGLE_MAPS_OPTIONS = {
  id: "google-map-script",
  googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
  libraries: ["places"], // superset: sirve para el mapa y el autocomplete
  language: "es",
  region: "MX",
};

const GoogleMapsContext = createContext({ isLoaded: false, loadError: null });

/**
 * Envuelve tu aplicación (o la sección que use mapas) con este Provider.
 *
 * Uso en main.jsx / App.jsx:
 *   <GoogleMapsProvider>
 *     <App />
 *   </GoogleMapsProvider>
 */
export const GoogleMapsProvider = ({ children }) => {
  const { isLoaded, loadError } = useJsApiLoader(GOOGLE_MAPS_OPTIONS);

  return (
    <GoogleMapsContext.Provider value={{ isLoaded, loadError }}>
      {children}
    </GoogleMapsContext.Provider>
  );
};

/**
 * Hook para consumir el estado del loader en cualquier componente hijo.
 *
 * Uso:
 *   const { isLoaded, loadError } = useGoogleMaps();
 */
export const useGoogleMaps = () => useContext(GoogleMapsContext);
