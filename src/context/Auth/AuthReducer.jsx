import { types } from "../../types";

export default (state, action) => {
  switch (action.type) {
    case types.REGISTRO_EXITOSO:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        autenticado: true,
        cargando: false,
        usuario: action.payload.client,
        token: action.payload.token, // Mantener el token en el estado
      };
    case types.LOGIN_EXITOSO:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        autenticado: true,
        cargando: true,
        token: action.payload.token,
      };
    case types.RESET_PASSWORD:
    case types.OBTENER_USUARIO:
      return {
        ...state,
        autenticado: true,
        usuario: action.payload,
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
        autenticado: true,
        cargando: false,
        success: true,
      };
    case types.LOGIN_ERROR:
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
