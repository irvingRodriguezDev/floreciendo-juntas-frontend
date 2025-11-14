import { GET_ALL_PRODUCTS, GET_ONE_PRODUCT } from "../../types";

export default (state, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload.products,
        totalItems: action.payload.totalItems,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
        cargando: true,
      };
    case GET_ONE_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
    default:
      return state;
  }
};
