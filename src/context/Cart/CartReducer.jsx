import {
  ADD_TO_CART,
  CLEAR_CART,
  DELETE_CART_ITEM,
  GET_USER_CART,
  SET_GUEST_CART,
  UPDATE_CART_ITEM,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    // 👉 Agregar producto al carrito
    case ADD_TO_CART: {
      const item = action.payload;

      // Verificar si ya existe en el carrito
      const existingItem = state.cart.find(
        (p) => p.product_id === item.product_id
      );

      if (existingItem) {
        // Si ya existe, sumar la cantidad
        const updatedCart = state.cart.map((p) =>
          p.product_id === item.product_id
            ? { ...p, quantity: p.quantity + item.quantity }
            : p
        );

        return {
          ...state,
          cart: updatedCart,
        };
      }

      // Si no existe, agregarlo
      return {
        ...state,
        cart: [...state.cart, item],
      };
    }

    // 👉 Actualizar cantidad de un producto
    case UPDATE_CART_ITEM: {
      const { product_id, quantity } = action.payload;

      const updatedCart = state.cart.map((item) =>
        item.product_id === product_id ? { ...item, quantity } : item
      );

      return {
        ...state,
        cart: updatedCart,
      };
    }

    // 👉 Cargar carrito desde API
    case GET_USER_CART:
      return {
        ...state,
        cart: action.payload,
      };

    // 👉 Eliminar un producto del carrito
    case DELETE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.filter((item) => item.product_id !== action.payload),
      };

    // 👉 Limpiar carrito completo
    case CLEAR_CART:
      return {
        ...state,
        cart: [],
      };
    // payload: guest cart array (only kept in context for preview before login)
    case SET_GUEST_CART:
      return {
        ...state,
        guest_cart: Array.isArray(action.payload) ? action.payload : [],
      };

    default:
      return state;
  }
};
