// src/config/Axios.jsx
import axios from "axios";

const clienteAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 👈 CRUCIAL: Obliga al navegador a enviar y recibir cookies HttpOnly
});

// ❌ YA NO NECESITAMOS EL INTERCEPTOR DE REQUEST PARA EL TOKEN BEARER
// (La cookie viaja sola de forma automática y segura por el navegador)

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
      // ❌ YA NO USAMOS localStorage.removeItem("token") porque la cookie la borra/expira el backend

      // Si el 401 viene de intentar iniciar sesión o de verificar el token al cargar la app:
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
