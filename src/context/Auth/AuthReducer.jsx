import { types } from "../../types";

export default (state, action) => {
  switch (action.type) {
    case types.INICIO_AUTENTICACION:
      return {
        ...state,
        cargando: true,
      };
    case types.REGISTRO_EXITOSO:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        autenticado: true,
        cargando: false,
        isAuthenticating: true,
        usuario: action.payload.user,
        token: action.payload.token, // Mantener el token en el estado
      };
    case types.LOGIN_EXITOSO:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        autenticado: true,
        cargando: true,
        isAuthenticating: true,
        usuario: action.payload.user,
        token: action.payload.token,
      };
    case types.RESET_PASSWORD:
    case types.OBTENER_USUARIO:
      return {
        ...state,
        autenticado: true,
        usuario: action.payload,
        cargando: false, // ✅ Crucial para el éxito
        success: true,
      };
    case types.USER_CHANGEPASSWORD:
      return {
        ...state,
        autenticado: true,
        cargando: false,
      };
    case types.USER_CHANGEPHOTO:
      return {
        ...state,
        usuario: {
          ...state.usuario,
          profileImage: action.payload.profileImage,
        },
      };
    case types.LOGIN_ERROR:
      return {
        ...state,
        token: null,
        autenticado: false,
        usuario: null,
        cargando: false, // ✅ Crucial para el fallo
      };
    case types.FIN_AUTENTICACION:
      return {
        ...state,
        isAuthenticating: false, // ¡El spinner se apaga aquí!
        cargando: false,
      };

    case types.CERRAR_SESION:
      localStorage.removeItem("token");
      localStorage.removeItem("expires_at");
      localStorage.removeItem("role");
      return {
        ...state,
        token: null,
        usuario: null,
        autenticado: false,
        cargando: false,
      };

    default:
      return state;
  }
};
