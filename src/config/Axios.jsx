// src/config/Axios.jsx
import axios from "axios";

const clienteAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Request: agregar token
clienteAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 🚨 Response: detectar sesión expirada o sesión múltiple
clienteAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    // 🛑 Protección total
    if (!error.response) {
      return Promise.reject(error);
    }

    const { status, data } = error.response;

    if (status === 401) {
      if (data?.reason) {
        sessionStorage.setItem("session_expired_reason", data.reason);
        console.log("se guarda en sessionStorage");
      }

      localStorage.removeItem("token");

      // ⚠️ usar replace para evitar back
      window.location.replace("/iniciar-sesion");
    }

    return Promise.reject(error);
  },
);

export default clienteAxios;
