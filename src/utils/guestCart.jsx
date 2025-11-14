// src/utils/guestCart.js
const GUEST_CART_KEY = "guest_cart_v1";

export const readGuestCart = () => {
  try {
    const raw = localStorage.getItem(GUEST_CART_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error("Error leyendo guest cart", e);
    return [];
  }
};

export const writeGuestCart = (items) => {
  try {
    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
  } catch (e) {
    console.error("Error escribiendo guest cart", e);
  }
};

export const clearGuestCart = () => {
  try {
    localStorage.removeItem(GUEST_CART_KEY);
  } catch (e) {
    console.error("Error limpiando guest cart", e);
  }
};

// Helpers
export const addOrIncreaseGuestItem = (items, newItem) => {
  const found = items.find((i) => i.product_id === newItem.product_id);
  if (found) {
    return items.map((i) =>
      i.product_id === newItem.product_id
        ? { ...i, quantity: i.quantity + newItem.quantity }
        : i
    );
  }
  return [...items, newItem];
};

export const updateGuestItem = (items, product_id, quantity) =>
  items.map((i) => (i.product_id === product_id ? { ...i, quantity } : i));

export const deleteGuestItem = (items, product_id) =>
  items.filter((i) => i.product_id !== product_id);
