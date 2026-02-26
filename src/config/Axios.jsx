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
let isRedirecting = false;
// 🚨 Response: detectar sesión expirada o sesión múltiple
clienteAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      return Promise.reject(error);
    }

    const { status, data } = error.response;

    if (status === 401) {
      // 1. Extraer la razón antes de limpiar nada
      const reason = data?.reason || "expired";

      // 2. Solo ejecutar la lógica de salida si no estamos ya en proceso de redirección
      if (!isRedirecting) {
        isRedirecting = true;

        // Guardar razón para mostrar un mensaje amigable en el Login
        sessionStorage.setItem("session_expired_reason", reason);

        // Limpiar credenciales
        localStorage.removeItem("token");

        // 3. Pequeño delay de seguridad antes del redireccionamiento
        // Esto permite que otras promesas pendientes fallen sin disparar más reloads
        setTimeout(() => {
          window.location.replace("/iniciar-sesion");
        }, 100);
      }
    }

    return Promise.reject(error);
  },
);

export default clienteAxios;
