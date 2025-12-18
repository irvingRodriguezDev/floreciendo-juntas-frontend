import { GET_ALL_LIVES, GET_LATEST_LIVES, GET_LIVE_BY_ID } from "../../types";

export default (state, action) => {
  switch (action.type) {
    case GET_ALL_LIVES:
      return {
        ...state,
        lives: action.payload.lives,
        totalItems: action.payload.totalItems,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
        cargando: true,
      };

    case GET_LATEST_LIVES:
      return {
        ...state,
        lives: action.payload,
      };
    case GET_LIVE_BY_ID:
      return {
        ...state,
        live: action.payload,
      };
    default:
      return state;
  }
};
