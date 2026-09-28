import {
  CART_SHOPIFY_CREATED,
  CART_SHOPIFY_ERROR,
  CART_SHOPIFY_LOADING,
  CART_SHOPIFY_UPDATED,
  CART_SHOPIFY_ADD_LOADING,
  CART_SHOPIFY_CART_LOADING,
} from "../../types";
export const initialState = {
  cartId: null,
  cart: null,

  loading: false, // carga general
  loadingAdd: false, // add to cart
  loadingCart: false, // fetch cart

  error: null,
};

export function shopifyCartReducer(state, action) {
  switch (action.type) {
    case CART_SHOPIFY_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CART_SHOPIFY_CART_LOADING:
      return {
        ...state,
        loadingCart: true,
        error: null,
      };

    case CART_SHOPIFY_ADD_LOADING:
      return {
        ...state,
        loadingAdd: true,
        error: null,
      };

    case CART_SHOPIFY_CREATED:
      return {
        ...state,
        cartId: action.payload.cartId,
        loading: false,
      };

    case CART_SHOPIFY_UPDATED:
      return {
        ...state,
        cart: action.payload.cart,
        loading: false,
        loadingAdd: false,
        loadingCart: false,
      };

    case CART_SHOPIFY_ERROR:
      return {
        ...state,
        loading: false,
        loadingAdd: false,
        loadingCart: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
