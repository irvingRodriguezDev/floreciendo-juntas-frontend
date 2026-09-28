import { useReducer, useEffect, useCallback } from "react";
import { ShopifyCartContext } from "./ShopifyCartContext";
import { shopifyCartReducer, initialState } from "./ShopifyCartReducer";
import { shopifyFetch } from "../../containers/Store/ShopifyClient";
import {
  CART_SHOPIFY_ADD_LOADING,
  CART_SHOPIFY_CART_LOADING,
  CART_SHOPIFY_CREATED,
  CART_SHOPIFY_ERROR,
  CART_SHOPIFY_LOADING,
  CART_SHOPIFY_UPDATED,
} from "../../types";

// Mutation optimizada para 2026
const ADD_TO_CART = `
mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart {
      id
      lines(first: 50) { # Aumentado para ver más variantes en el carrito
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                product {
                  title
                }
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
      cost {
        totalAmount {
          amount
          currencyCode
        }
      }
      checkoutUrl
    }
  }
}
`;

// Queries de inicialización y obtención (se mantienen similares pero con title de variante)
const CREATE_CART = `mutation { cartCreate { cart { id } } }`;
const GET_CART = `
query GetCart($cartId: ID!) {
  cart(id: $cartId) {
    id
    lines(first: 50) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              product { title }
              price { amount currencyCode }
            }
          }
        }
      }
    }
    cost { totalAmount { amount currencyCode } }
    checkoutUrl
  }
}
`;

export default function ShopifyCartState({ children }) {
  const [state, dispatch] = useReducer(shopifyCartReducer, initialState);

  useEffect(() => {
    const initCart = async () => {
      const storedCartId = localStorage.getItem("shopify_cart_id");
      if (storedCartId) {
        dispatch({
          type: CART_SHOPIFY_CREATED,
          payload: { cartId: storedCartId },
        });
        return;
      }
      try {
        dispatch({ type: CART_SHOPIFY_LOADING });
        const res = await shopifyFetch(CREATE_CART);
        const cartId = res.data.cartCreate.cart.id;
        localStorage.setItem("shopify_cart_id", cartId);
        dispatch({ type: CART_SHOPIFY_CREATED, payload: { cartId } });
      } catch (error) {
        dispatch({ type: CART_SHOPIFY_ERROR, payload: error.message });
      }
    };
    initCart();
  }, []);

  const fetchCart = useCallback(async () => {
    if (!state.cartId) return;
    try {
      dispatch({ type: CART_SHOPIFY_CART_LOADING });
      const res = await shopifyFetch(GET_CART, { cartId: state.cartId });
      dispatch({
        type: CART_SHOPIFY_UPDATED,
        payload: { cart: res.data.cart },
      });
    } catch (error) {
      dispatch({ type: CART_SHOPIFY_ERROR, payload: error.message });
    }
  }, [state.cartId]);

  useEffect(() => {
    if (state.cartId) fetchCart();
  }, [state.cartId, fetchCart]);

  /**
   * 🚀 MEJORA 2026: addToCart ahora acepta un array de items
   * Puede recibir un solo item: addToCart("id", 1)
   * O una lista: addToCart([{variantId: "id1", quantity: 2}, ...])
   */
  const addToCart = async (items, singleQuantity = 1) => {
    if (!state.cartId) return;

    // Normalizamos la entrada para que siempre sea un array de CartLineInput
    const lines = Array.isArray(items)
      ? items.map((item) => ({
          merchandiseId: item.variantId,
          quantity: item.quantity,
        }))
      : [{ merchandiseId: items, quantity: singleQuantity }];

    try {
      dispatch({ type: CART_SHOPIFY_ADD_LOADING });

      const res = await shopifyFetch(ADD_TO_CART, {
        cartId: state.cartId,
        lines: lines,
      });

      dispatch({
        type: CART_SHOPIFY_UPDATED,
        payload: { cart: res.data.cartLinesAdd.cart },
      });
    } catch (error) {
      dispatch({ type: CART_SHOPIFY_ERROR, payload: error.message });
    }
  };

  const checkout = () => {
    if (!state.cart?.checkoutUrl) return;
    window.location.href = state.cart.checkoutUrl; // Redirección directa al Checkout persistente
  };

  return (
    <ShopifyCartContext.Provider
      value={{
        ...state,
        addToCart,
        fetchCart,
        checkout,
      }}
    >
      {children}
    </ShopifyCartContext.Provider>
  );
}
