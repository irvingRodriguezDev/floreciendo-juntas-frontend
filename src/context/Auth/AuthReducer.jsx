import { types } from "../../types";

export default (state, action) => {
  switch (action.type) {
    case types.INICIO_AUTENTICACION:
      return {
        ...state,
        isAuthenticating: true,
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
    case types.UPDATE_USER:
      return {
        ...state,
        autenticado: true,
        usuario: action.payload,
      };
    case types.OBTENER_USUARIO:
      return {
        ...state,
        autenticado: true,
        usuario: action.payload,
        isAuthenticating: false,
        cargando: false,
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
        autenticado: false,
        usuario: null,
        isAuthenticating: false, // 🔥 ESTO ES MUY IMPORTANTE
        cargando: false,
      };
    case types.FIN_AUTENTICACION:
      return {
        ...state,
        isAuthenticating: false,
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
