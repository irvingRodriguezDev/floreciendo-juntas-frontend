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
    // 🟢 Set cart completo del backend
    case GET_USER_CART:
      return {
        ...state,
        cart: action.payload, // { cartId, total, items[] }
      };

    // 🟢 Agregar item (solo backend)
    case ADD_TO_CART: {
      const newItem = action.payload;

      // Si no existe carrito aún:
      if (!state.cart) {
        return {
          ...state,
          cart: {
            cartId: newItem.cartId,
            items: [newItem],
          },
        };
      }

      const exists = state.cart.items.find(
        (i) => i.productId === newItem.productId
      );

      let updatedItems;

      if (exists) {
        updatedItems = state.cart.items.map((i) =>
          i.productId === newItem.productId
            ? { ...i, quantity: i.quantity + newItem.quantity }
            : i
        );
      } else {
        updatedItems = [...state.cart.items, newItem];
      }

      return {
        ...state,
        cart: {
          ...state.cart,
          items: updatedItems,
        },
      };
    }

    // 🟢 Actualizar cantidad
    case UPDATE_CART_ITEM: {
      const { productId, quantity } = action.payload;

      if (!state.cart) return state;

      const updatedItems = state.cart.items.map((i) =>
        i.productId === productId ? { ...i, quantity } : i
      );

      return {
        ...state,
        cart: {
          ...state.cart,
          items: updatedItems,
        },
      };
    }

    // 🟢 Eliminar item
    case DELETE_CART_ITEM:
      if (!state.cart) return state;

      return {
        ...state,
        cart: {
          ...state.cart,
          items: state.cart.items.filter((i) => i.productId !== action.payload),
        },
      };

    // 🟢 Limpiar carrito completo
    case CLEAR_CART:
      return {
        ...state,
        cart: {
          cartId: null,
          items: [],
        },
      };

    // 🟢 Guest cart debe ser OBJETO con misma estructura
    case SET_GUEST_CART:
      return {
        ...state,
        guest_cart: action.payload || {
          cartId: "guest",
          items: [],
          total: 0,
        },
      };

    default:
      return state;
  }
};
