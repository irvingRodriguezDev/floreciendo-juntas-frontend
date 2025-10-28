import React, { useCallback, useEffect, useReducer, useContext } from "react";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import MethodGet, { MethodPost } from "../../config/Service";
import tokenAuth from "../../config/TokenAuth";
import { initSocket } from "../../socket";
import { SHOW_ERRORS_API, types } from "../../types";
import Swal from "sweetalert2";
import clienteAxios from "../../config/Axios";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    autenticado: false,
    isAuthenticating: true,
    usuario: null,
    role: null,
    success: false,
    directions: [],
    ErrorsApi: [],
    all_users: [],
    cargando: true,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const token = localStorage.getItem("token");
  const socket = initSocket(token);

  /**
   * 🔹 Forzar recarga de imagen para evitar cache del navegador
   */
  const getProfileImageUrl = (url) => {
    if (!url) return null;
    const cleanUrl = url.replace(/\\"/g, "").replace(/^"|"$/g, "").trim();
    return `${cleanUrl}?t=${new Date().getTime()}`; // forzar reload
  };

  // 🔹 Escuchar evento de actualización de imagen
  useEffect(() => {
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

    return () => {
      socket.off("profileImageUpdated", handleProfileImageUpdated);
    };
  }, [socket, state.usuario]);

  /**
   * 🔹 Obtener usuario autenticado
   */
  const usuarioAutenticado = async () => {
    dispatch({ type: types.INICIO_AUTENTICACION });

    const token = localStorage.getItem("token");
    if (!token) {
      dispatch({ type: types.LOGIN_ERROR });
      return false;
    }

    tokenAuth(token);

    try {
      const { data } = await MethodGet("/auth/me");
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
    } finally {
      dispatch({ type: types.FIN_AUTENTICACION });
    }
  };

  /**
   * 🔹 Iniciar sesión
   */
  const iniciarSesion = async (datos) => {
    try {
      const res = await MethodPost("/auth/login", datos);
      localStorage.setItem("token", res.data.token);

      dispatch({
        type: types.LOGIN_EXITOSO,
        payload: res.data,
      });

      await usuarioAutenticado();
      return true;
    } catch (error) {
      Swal.fire({
        title: "Error",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
        text: error.response?.data?.msg || "Error al iniciar sesión",
      });
      dispatch({ type: SHOW_ERRORS_API });
      return false;
    }
  };

  /**
   * 🔹 Registrar usuario
   */
  const registerUser = async (data) => {
    try {
      const res = await MethodPost("/auth/register", data);
      const token = res.data.token;
      localStorage.setItem("token", token);
      tokenAuth(token);

      dispatch({
        type: types.REGISTRO_EXITOSO,
        payload: res.data,
      });

      Swal.fire({
        title: "Registrado",
        text: res.data.msg,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      await usuarioAutenticado();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response?.data?.error || "Error al registrar",
        icon: "error",
        showConfirmButton: false,
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
    const id_user = localStorage.getItem("user_id");
    try {
      const res = await MethodPost(`updateClient/${id_user}`, data);
      dispatch({ type: types.UPDATE_USER, payload: res.data.data });

      Swal.fire({
        icon: "success",
        title: "Actualizada",
        text: "La información de usuario se ha actualizado correctamente!",
        showConfirmButton: false,
        timer: 1700,
      });

      await usuarioAutenticado();
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

    try {
      const res = await clienteAxios.post(
        "/auth/uploadProfileImage",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const profileImageUrl = getProfileImageUrl(res.data.profileImage);

      //Dispatch para actualizar estado
      dispatch({
        type: types.USER_CHANGEPHOTO,
        payload: { profileImage: profileImageUrl },
      });

      //Emitir evento a otros clientes
      socket?.emit("profileImageUpdated", {
        userId: state.usuario?.id,
        profileImage: res.data.profileImage,
      });

      Swal.fire({
        title: "Correcto!!",
        text: res.data.msg,
        timer: 3000,
        showConfirmButton: false,
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: error?.response?.data?.message || "No se pudo subir la imagen",
      });
      dispatch({ type: SHOW_ERRORS_API });
    }
  };

  /**
   * 🔹 Cerrar sesión
   */
  const cerrarSesion = (navigate) => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("token");
    dispatch({ type: types.CERRAR_SESION });
    navigate("/", { replace: true });
  };

  /**
   * 🔹 Resetear contraseña
   */
  const resetPassword = async (data) => {
    try {
      await MethodPost("/auth/reset-password", data);
      Swal.fire({
        title: "Actualizada!",
        text: "La contraseña se ha restablecido correctamente!",
        icon: "success",
        timer: 2500,
        showConfirmButton: false,
      }).then(() => (window.location = "/iniciar-sesion"));
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error al recuperar la contraseña, intenta más tarde!",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        isAuthenticating: state.isAuthenticating,
        usuario: state.usuario,
        success: state.success,
        directions: state.directions,
        ErrorsApi: state.ErrorsApi,
        all_users: state.all_users,
        cargando: state.cargando,
        iniciarSesion,
        usuarioAutenticado,
        cerrarSesion,
        registerUser,
        ChangePasswordUser,
        ChangePhoto,
        resetPassword,
        UpdateUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
