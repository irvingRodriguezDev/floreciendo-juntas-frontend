import { GET_ORDER_USER } from "../../types";

export default (state, action) => {
  switch (action.type) {
    case GET_ORDER_USER:
      return {
        ...state,
        orders: action.payload.orders,
        totalItems: action.payload.totalItems,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
        cargando: true,
      };

    default:
      return state;
  }
};
