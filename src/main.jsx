// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter } from "react-router-dom";
import ToastProvider from "./components/Toast/ToastProvider.jsx";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CssBaseline />
      <ToastProvider>
        <GoogleReCaptchaProvider reCaptchaKey='6LdLB4EsAAAAADKpzUAgDhCAuPNmzbOWIApFVMpT'>
          <App />
        </GoogleReCaptchaProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
