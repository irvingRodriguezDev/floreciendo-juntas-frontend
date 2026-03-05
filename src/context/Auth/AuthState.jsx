import React, {
  useCallback,
  useEffect,
  useReducer,
  useContext,
  useState,
} from "react";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import MethodGet, { MethodPost, MethodPut } from "../../config/Service";
import tokenAuth from "../../config/TokenAuth";
import { disconnectSocket, getSocket, initSocket } from "../../socket";
import { SHOW_ERRORS_API, types } from "../../types";
import Swal from "sweetalert2";
import clienteAxios from "../../config/Axios";
import {
  CUSTOMER_LOGIN_MUTATION,
  CUSTOMER_CREATE_MUTATION,
} from "./grapql/auth";
import { shopifyFetch } from "../../containers/Store/ShopifyClient";
import { useNavigate } from "react-router-dom";
const AuthState = (props) => {
  const navigate = useNavigate();
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
    totalItems: 0,
    totalPages: 0,
    currentPage: 0,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  var token = "";
  // ✅ USAR UN USEEFFECT PARA EL SOCKET
  useEffect(() => {
    token = localStorage.getItem("token");
    if (token) {
      initSocket(token);
    }

    return () => {
      disconnectSocket(); // Limpiar al desmontar
    };
  }, []);

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
    const socket = getSocket(); // Usa el getter en lugar de la variable del cuerpo
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
  }, [state.usuario]); // Solo depende del usuario

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
    }
  };

  /**
   * 🔹 Iniciar sesión
   */
  const iniciarSesion = async (datos, tokenCaptcha) => {
    try {
      // 1️⃣ Login en TU backend
      const res = await MethodPost("/auth/login", {
        email: datos.email,
        password: datos.password,
        captchaToken: tokenCaptcha,
      });
      const token = res.data.token;

      if (!token) {
        throw new Error("Token no recibido");
      }

      localStorage.setItem("token", token);
      tokenAuth(token);

      // 2️⃣ Login silencioso en Shopify (NO debe romper login principal)
      try {
        const shopifyVariables = {
          input: {
            email: datos.email,
            password: datos.password,
          },
        };

        const shopifyResponse = await shopifyFetch(
          CUSTOMER_LOGIN_MUTATION,
          shopifyVariables,
        );

        const authData = shopifyResponse?.data?.customerAccessTokenCreate;

        if (authData?.customerAccessToken) {
          localStorage.setItem(
            "customerAccessToken",
            authData.customerAccessToken.accessToken,
          );
        } else if (authData?.customerUserErrors?.length) {
          console.warn("Shopify:", authData.customerUserErrors[0].message);
        }
      } catch (err) {
        console.warn("⚠️ Shopify login falló (no bloqueante):", err);
      }

      // 3️⃣ Estado global
      dispatch({
        type: types.LOGIN_EXITOSO,
        payload: res.data,
      });

      // 4️⃣ Socket: cerrar y crear nuevo
      initSocket(token, res.data?.usuario);

      // 5️⃣ Obtener usuario autenticado
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
      // 1️⃣ Registro en TU backend
      const res = await MethodPost("/auth/register", data);
      const token = res.data.token;

      localStorage.setItem("token", token);
      tokenAuth(token);

      // 2️⃣ Registro en Shopify (sin login)
      try {
        const shopifyVariables = {
          input: {
            firstName: data.name || "",
            lastName: data.username || "",
            email: data.email,
            password: data.password,
            acceptsMarketing: false,
          },
        };

        const shopifyResponse = await shopifyFetch(
          CUSTOMER_CREATE_MUTATION,
          shopifyVariables,
        );

        const createData = shopifyResponse?.data?.customerCreate;

        if (createData?.customer) {
          console.log("✅ Usuario creado en Shopify");
        } else if (createData?.customerUserErrors?.length) {
          console.warn("Shopify:", createData.customerUserErrors[0].message);
        }
      } catch (err) {
        console.error("Shopify register failed:", err);
      }

      // 3️⃣ Estado global
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
        text: error.response?.data?.error || "Error al registrar",
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

    try {
      const res = await clienteAxios.post(
        "/auth/uploadProfileImage",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
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
  const cerrarSesion = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("token");
    localStorage.removeItem("customerAccessToken");
    disconnectSocket();

    dispatch({ type: types.CERRAR_SESION });
    navigate("/", { replace: true });
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
        console.log(error, "el error 372");

        Swal.fire({
          title: "Error",
          text:
            error.response.data.message ||
            "Ocurrió un error al recuperar la contraseña, intenta más tarde!",
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
        });
      });
  };
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
        token: state.token,
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
