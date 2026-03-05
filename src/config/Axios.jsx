// src/config/Axios.jsx
import axios from "axios";

const clienteAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

clienteAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRedirecting = false;

clienteAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) return Promise.reject(error);

    const { status, data } = error.response;

    // 🚨 CONDICIÓN CLAVE: No redirigir si el error ocurre intentando iniciar sesión
    const isLoginRequest = error.config.url.includes("/iniciar-sesion");
    // Ajusta "/login" según sea el endpoint de tu API

    if (status === 401 && !isLoginRequest) {
      const reason = data?.reason || "expired";

      if (!isRedirecting) {
        isRedirecting = true;
        sessionStorage.setItem("session_expired_reason", reason);
        localStorage.removeItem("token");

        // Solo redirigimos si NO estamos ya en la ruta de login
        if (window.location.pathname !== "/iniciar-sesion") {
          setTimeout(() => {
            window.location.replace("/iniciar-sesion");
          }, 100);
        } else {
          // Si ya estamos en login, reseteamos el flag para futuros intentos
          isRedirecting = false;
        }
      }
    }

    return Promise.reject(error);
  },
);

export default clienteAxios;
