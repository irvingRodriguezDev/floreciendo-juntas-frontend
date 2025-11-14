// src/context/cart/CartState.jsx
import React, { useReducer, useEffect } from "react";
import MethodGet, {
  MethodDelete,
  MethodPost,
  MethodPut,
} from "../../config/Service";
import {
  ADD_TO_CART,
  CLEAR_CART,
  DELETE_CART_ITEM,
  GET_USER_CART,
  UPDATE_CART_ITEM,
  SET_GUEST_CART,
} from "../../types";
import CartContext from "./CartContext";
import CartReducer from "./CartReducer";

import {
  readGuestCart,
  writeGuestCart,
  clearGuestCart,
  addOrIncreaseGuestItem,
  updateGuestItem,
  deleteGuestItem,
} from "../../utils/guestCart";

const CartState = ({ children }) => {
  const initialState = {
    cart: [],
    guest_cart: [],
  };

  const [state, dispatch] = useReducer(CartReducer, initialState);

  // On mount load guest cart into context for preview (if any)
  useEffect(() => {
    const guest = readGuestCart();
    if (guest.length) {
      dispatch({ type: SET_GUEST_CART, payload: guest });
    }
    // If user is authenticated, load server cart
    // NOTE: you can call getUserCart() from your auth flow after login
  }, []);

  // ------------- Guest (local) operations -------------
  const addItemGuest = (item) => {
    const current = readGuestCart();
    const next = addOrIncreaseGuestItem(current, item);
    writeGuestCart(next);
    dispatch({ type: SET_GUEST_CART, payload: next });
  };

  const updateItemGuest = (product_id, quantity) => {
    const current = readGuestCart();
    const next = updateGuestItem(current, product_id, quantity);
    writeGuestCart(next);
    dispatch({ type: SET_GUEST_CART, payload: next });
  };

  const deleteItemGuest = (product_id) => {
    const current = readGuestCart();
    const next = deleteGuestItem(current, product_id);
    writeGuestCart(next);
    dispatch({ type: SET_GUEST_CART, payload: next });
  };

  const clearGuest = () => {
    clearGuestCart();
    dispatch({ type: SET_GUEST_CART, payload: [] });
  };

  // ------------- Server operations (authenticated) -------------
  const addItemCart = (data) => {
    const url = `/cart/add`;
    return MethodPost(url, data)
      .then((res) => {
        // API returns the item added or the updated cart item
        dispatch({ type: ADD_TO_CART, payload: res.data });
        return res;
      })
      .catch((error) => {
        console.error("Error adding to cart", error);
        throw error;
      });
  };

  const getUserCart = () => {
    const url = "/cart";
    return MethodGet(url)
      .then((res) => {
        dispatch({ type: GET_USER_CART, payload: res.data });
        return res;
      })
      .catch((error) => {
        console.error("Error fetching user cart", error);
        throw error;
      });
  };

  const updateItemCart = (data) => {
    const url = `/cart/update/${data.product_id}`;
    return MethodPut(url, data)
      .then((res) => {
        // API may return updated item or whole cart
        dispatch({ type: UPDATE_CART_ITEM, payload: res.data });
        return res;
      })
      .catch((error) => {
        console.error("Error updating cart", error);
        throw error;
      });
  };

  const deleteItemCart = (product_id) => {
    const url = `/cart/delete/${product_id}`;
    return MethodDelete(url)
      .then((res) => {
        dispatch({ type: DELETE_CART_ITEM, payload: product_id });
        return res;
      })
      .catch((error) => {
        console.error("Error deleting cart item", error);
        throw error;
      });
  };

  const clearCart = () => {
    const url = "/cart/clear";
    return MethodDelete(url)
      .then((res) => {
        dispatch({ type: CLEAR_CART });
        return res;
      })
      .catch((error) => {
        console.error("Error clearing cart", error);
        throw error;
      });
  };

  // ------------- Sync guest cart to server (batch) -------------
  // Llamar esta función *después* de que el usuario se autentique
  const syncGuestToServer = async () => {
    const guest = readGuestCart();
    if (!guest || guest.length === 0) return null;

    try {
      // POST /cart/sync -> body { items: [...] }
      const res = await MethodPost("/cart/sync", { items: guest });
      // La API devuelve el carrito final actualizado
      dispatch({ type: GET_USER_CART, payload: res.data.cart ?? res.data });
      // Vaciar guest cart local
      clearGuestCart();
      dispatch({ type: SET_GUEST_CART, payload: [] });
      return res;
    } catch (error) {
      console.error("Error sincronizando guest cart", error);
      throw error;
    }
  };

  return (
    <CartContext.Provider
      value={{
        // server-backed cart
        cart: state.cart,
        // guest cart (local preview)
        guest_cart: state.guest_cart,

        // guest-only operations
        addItemGuest,
        updateItemGuest,
        deleteItemGuest,
        clearGuest,

        // server operations
        addItemCart,
        getUserCart,
        updateItemCart,
        deleteItemCart,
        clearCart,

        // sync
        syncGuestToServer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartState;
