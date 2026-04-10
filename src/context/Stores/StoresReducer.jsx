import {
  CREATE_STORE_USER,
  GET_MY_STORE,
  GET_STORES_NEARBY,
  UPDATE_STORE_USER,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case GET_STORES_NEARBY:
      return {
        ...state,
        stores: action.payload,
        cargando: true,
      };
    case CREATE_STORE_USER:
      return {
        ...state,
        user_store: action.payload,
        cargando: false,
      };
    case UPDATE_STORE_USER:
      return {
        ...state,
        user_store: {
          ...state.user_store, // conserva campos que no cambiaron
          ...action.payload, // sobreescribe con los datos actualizados
        },
      };
    case GET_MY_STORE:
      return {
        ...state,
        user_store: action.payload,
        cargando: false,
      };
    default:
      return state;
  }
};
