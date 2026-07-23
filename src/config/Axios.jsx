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
    const url = error.config?.url || "";

    // 🚨 RUTAS QUE NUNCA DEBEN FORZAR UNA REDIRECCIÓN POR 401
    const isLoginRequest =
      url.includes("/iniciar-sesion") || url.includes("/login");
    const isCheckAuthRequest = url.includes("/auth/me"); // 👈 Tu endpoint exacto

    if (status === 401) {
      // Limpiamos el token expirado/inválido
      localStorage.removeItem("token");

      // Si el 401 viene de intentar iniciar sesión o de verificar el token al cargar la app:
      // SIMPLEMENTE IGNORAMOS LA REDIRECCIÓN Y REJECTAMOS LA PROMESA.
      if (isLoginRequest || isCheckAuthRequest) {
        return Promise.reject(error);
      }

      // Si ocurrió en otra acción privada y no estamos redirigiendo ya:
      if (!isRedirecting) {
        const reason = data?.reason || "expired";
        sessionStorage.setItem("session_expired_reason", reason);

        // Solo redirigimos si la usuaria está en una ruta estrictamente privada (ej. /mi-perfil)
        if (window.location.pathname.startsWith("/mi-perfil")) {
          isRedirecting = true;
          setTimeout(() => {
            window.location.replace("/iniciar-sesion");
          }, 100);
        }
      }
    }

    return Promise.reject(error);
  },
);

export default clienteAxios;
