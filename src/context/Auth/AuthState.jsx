import React, { useEffect, useReducer } from "react";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import MethodGet, { MethodPost, MethodPut } from "../../config/Service";
// ❌ Eliminado: tokenAuth ya no se necesita
import { disconnectSocket, getSocket, initSocket } from "../../socket";
import { SHOW_ERRORS_API, types } from "../../types";
import Swal from "sweetalert2";
import clienteAxios from "../../config/Axios";
import { alerts } from "../../utils/Alerts";
import { useNavigate } from "react-router-dom";

const AuthState = (props) => {
  const navigate = useNavigate();

  const initialState = {
    autenticado: false,
    isAuthenticating: true,
    usuario: null,
    role: null,
    success: false,
    directions: [],
    ErrorsApi: [],
    all_users: [],
    cargando: true,
    totalItems: 0,
    totalPages: 0,
    currentPage: 0,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // ✅ 1. Manejo reactivo del Socket según la autenticación
  useEffect(() => {
    // Leemos 'autenticado' desde el 'state'
    if (state.autenticado) {
      initSocket(); // La cookie HttpOnly se enviará sola
    } else {
      disconnectSocket();
    }

    return () => {
      disconnectSocket();
    };
  }, [state.autenticado]);

  /**
   * 🔹 Forzar recarga de imagen para evitar cache del navegador
   */
  const getProfileImageUrl = (url) => {
    if (!url) return null;
    const cleanUrl = url.replace(/\\"/g, "").replace(/^"|"$/g, "").trim();
    return `${cleanUrl}?t=${new Date().getTime()}`;
  };

  // 🔹 Escuchar evento de actualización de imagen
  useEffect(() => {
    const socket = getSocket();
    if (!socket || !state.usuario) return;

    const handleProfileImageUpdated = (data) => {
      if (data.userId === state.usuario.id) {
        dispatch({
          type: types.USER_CHANGEPHOTO,
          payload: { profileImage: getProfileImageUrl(data.profileImage) },
        });
      }
    };

    socket.on("profileImageUpdated", handleProfileImageUpdated);
    return () => socket.off("profileImageUpdated", handleProfileImageUpdated);
  }, [state.usuario]);

  /**
   * 🔹 Obtener usuario autenticado (Llamada inicial a /auth/me)
   */
  const usuarioAutenticado = async () => {
    dispatch({ type: types.INICIO_AUTENTICACION });

    try {
      // Axios envía la cookie HttpOnly automáticamente
      const { data } = await MethodGet("/auth/me");

      localStorage.setItem(
        "savedBirthDate",
        data.user.birthDate === null ? "false" : "true",
      );

      dispatch({
        type: types.OBTENER_USUARIO,
        payload: {
          ...data.user,
          profileImage: getProfileImageUrl(data.user.profileImage),
        },
      });

      return true;
    } catch (error) {
      dispatch({ type: types.LOGIN_ERROR });
      return false;
    }
  };

  /**
   * 🔹 Iniciar sesión
   */
  const iniciarSesion = async (datos, tokenCaptcha) => {
    try {
      // 1️⃣ El backend responde con res.cookie("token", ...)
      const res = await MethodPost("/auth/login", {
        email: datos.email,
        password: datos.password,
        captchaToken: tokenCaptcha,
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      // 2️⃣ Estado global
      dispatch({
        type: types.LOGIN_EXITOSO,
        payload: res.data,
      });

      // 3️⃣ Obtener información fresca del usuario (y activar state.autenticado = true)
      await usuarioAutenticado();

      return true;
    } catch (error) {
      console.error("❌ Error en iniciarSesion:", error);

      Swal.fire({
        title: "Error",
        text:
          error.response?.data?.msg ||
          error.message ||
          "Error al iniciar sesión",
        icon: "error",
      });

      return false;
    }
  };

  /**
   * 🔹 Registrar usuario
   */
  const registerUser = async (data) => {
    try {
      const res = await MethodPost("/auth/register", data);
      await new Promise((resolve) => setTimeout(resolve, 100));

      dispatch({
        type: types.REGISTRO_EXITOSO,
        payload: res.data,
      });

      await usuarioAutenticado();

      Swal.fire({
        title: "¡Bienvenid@!",
        text: "Tu cuenta se ha creado exitosamente!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response?.data?.msg || "Error al registrar",
        icon: "error",
      });
    }
  };

  /**
   * 🔹 Cambiar contraseña
   */
  const ChangePasswordUser = async (datos) => {
    try {
      await MethodPost("/admin/auth/changePassword", datos);
      Swal.fire({
        title: "Contraseña!",
        text: "Modificada Correctamente",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });
      dispatch({ type: types.USER_CHANGEPASSWORD });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Error al cambiar contraseña",
        icon: "error",
      });
      dispatch({ type: SHOW_ERRORS_API });
    }
  };

  /**
   * 🔹 Actualizar información de usuario
   */
  const UpdateUser = async (data) => {
    try {
      const res = await MethodPut("/auth/user/update", data);

      dispatch({
        type: types.UPDATE_USER,
        payload: res.data.user,
      });

      Swal.fire({
        icon: "success",
        title: "Actualizada",
        text: "La información de usuario se ha actualizado correctamente",
        showConfirmButton: false,
        timer: 1700,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Atención",
        text: error.response?.data?.message || "Error al actualizar usuario",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  /**
   * 🔹 Cambiar foto de perfil
   */
  const ChangePhoto = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    alerts.loading(
      "Subiendo Foto de perfil",
      "Por favor no actualices, ni abandones la pagina hasta completar el proceso!",
    );
    try {
      const res = await clienteAxios.post(
        "/auth/uploadProfileImage",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      const profileImageUrl = getProfileImageUrl(res.data.profileImage);

      dispatch({
        type: types.USER_CHANGEPHOTO,
        payload: { profileImage: profileImageUrl },
      });
      alerts.success(
        "Correcto!!",
        "Tu foto de perfil, se ha cargado correctamente!",
      );
    } catch (error) {
      alerts.error(
        "Upps!",
        "Ocurrio un problema al cargar tu imagen, intenta nuevamente o contacta a soporte",
      );
      dispatch({ type: SHOW_ERRORS_API });
    }
  };

  /**
   * 🔹 Cerrar sesión
   */
  const cerrarSesion = async () => {
    try {
      // OPCIONAL: Endpoint en backend para res.clearCookie("token")
      await MethodPost("/auth/logout");
    } catch (e) {
      // Si falla o no existe el endpoint, continuamos con el flujo del cliente
    } finally {
      // 1. Desconectar socket
      disconnectSocket();

      // 2. Limpiar Storages secundarios
      localStorage.removeItem("user_id");
      localStorage.removeItem("customerAccessToken");
      localStorage.removeItem("fcm_user_id");

      // 3. Actualizar estado global
      dispatch({ type: types.CERRAR_SESION });

      // 4. Redirección limpia
      navigate("/", { replace: true });
    }
  };

  /**
   * 🔹 Resetear contraseña
   */
  const resetPassword = async (data) => {
    let url = "/auth/reset-password";
    MethodPost(url, data)
      .then((res) => {
        Swal.fire({
          title: "Actualizada!",
          text: "La contraseña se ha restablecido correctamente!",
          icon: "success",
          timer: 2500,
          showConfirmButton: false,
        }).then(() => (window.location = "/iniciar-sesion"));
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text:
            error.response?.data?.message ||
            "Ocurrió un error al recuperar la contraseña, intenta más tarde!",
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
        });
      });
  };

  /**
   * 🔹 Logout Global (por expiración de sesión)
   */
  const logoutGlobal = () => {
    localStorage.clear();
    disconnectSocket();
    dispatch({ type: types.CERRAR_SESION });

    Swal.fire({
      title: "Sesión expirada",
      text: "Inicia sesión nuevamente para continuar 🌷",
      icon: "info",
      timer: 2500,
      showConfirmButton: false,
      allowOutsideClick: false,
    });

    navigate("/iniciar-sesion");
  };

  return (
    <AuthContext.Provider
      value={{
        autenticado: state.autenticado,
        isAuthenticating: state.isAuthenticating,
        usuario: state.usuario,
        success: state.success,
        directions: state.directions,
        ErrorsApi: state.ErrorsApi,
        all_users: state.all_users,
        cargando: state.cargando,
        totalItems: state.totalItems,
        totalPages: state.totalPages,
        currentPage: state.currentPage,
        iniciarSesion,
        usuarioAutenticado,
        cerrarSesion,
        registerUser,
        ChangePasswordUser,
        ChangePhoto,
        resetPassword,
        UpdateUser,
        logoutGlobal,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
