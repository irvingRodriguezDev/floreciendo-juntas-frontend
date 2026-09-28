import { GET_ALL_SYSTEMS } from "../../types";

export default (state, action) => {
  switch (action.type) {
    case GET_ALL_SYSTEMS:
      return {
        ...state,
        systems: action.payload,
        cargando: true,
      };

    default:
      return state;
  }
};
