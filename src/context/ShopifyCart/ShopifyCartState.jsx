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

const CREATE_CART = `
mutation {
  cartCreate {
    cart {
      id
    }
  }
}
`;

const ADD_TO_CART = `
mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart {
      id
      lines(first: 20) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
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

const GET_CART = `
query GetCart($cartId: ID!) {
  cart(id: $cartId) {
    id
    lines(first: 20) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
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
`;

export default function ShopifyCartState({ children }) {
  const [state, dispatch] = useReducer(shopifyCartReducer, initialState);

  // 🔹 Crear o recuperar carrito
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

        dispatch({
          type: CART_SHOPIFY_CREATED,
          payload: { cartId },
        });
      } catch (error) {
        dispatch({
          type: CART_SHOPIFY_ERROR,
          payload: error.message,
        });
      }
    };

    initCart();
  }, []);

  // 🔹 Obtener carrito
  const fetchCart = useCallback(async () => {
    if (!state.cartId) return;

    try {
      dispatch({ type: CART_SHOPIFY_CART_LOADING });

      const res = await shopifyFetch(GET_CART, {
        cartId: state.cartId,
      });

      dispatch({
        type: CART_SHOPIFY_UPDATED,
        payload: { cart: res.data.cart },
      });
    } catch (error) {
      dispatch({
        type: CART_SHOPIFY_ERROR,
        payload: error.message,
      });
    }
  }, [state.cartId]);

  // 🔹 Refrescar carrito al tener ID
  useEffect(() => {
    if (state.cartId) {
      fetchCart();
    }
  }, [state.cartId, fetchCart]);

  // 🔹 Add to cart
  const addToCart = async (variantId, quantity = 1) => {
    if (!state.cartId) return;

    try {
      dispatch({ type: CART_SHOPIFY_ADD_LOADING });

      const res = await shopifyFetch(ADD_TO_CART, {
        cartId: state.cartId,
        lines: [
          {
            merchandiseId: variantId,
            quantity,
          },
        ],
      });

      dispatch({
        type: CART_SHOPIFY_UPDATED,
        payload: {
          cart: res.data.cartLinesAdd.cart,
        },
      });
    } catch (error) {
      dispatch({
        type: CART_SHOPIFY_ERROR,
        payload: error.message,
      });
    }
  };

  // 🔹 Checkout
  const checkout = () => {
    if (!state.cart?.checkoutUrl) return;
    window.location.href = state.cart.checkoutUrl;
  };

  return (
    <ShopifyCartContext.Provider
      value={{
        cartId: state.cartId,
        cart: state.cart,
        loading: state.loading,
        error: state.error,
        addToCart,
        fetchCart,
        checkout,
      }}
    >
      {children}
    </ShopifyCartContext.Provider>
  );
}
