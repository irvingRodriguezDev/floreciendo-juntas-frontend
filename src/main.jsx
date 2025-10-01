// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// ¡Ahora estas importaciones funcionarán!
// import "@fontsource/roboto/300.css";
// import "@fontsource/roboto/400.css";
// import "@fontsource/roboto/500.css";
// import "@fontsource/roboto/700.css";

// Para una mejor práctica, también puedes agregar la normalización CSS
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* CssBaseline se encarga de normalizar los estilos de forma consistente */}
      <CssBaseline />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
