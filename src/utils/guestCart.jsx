// src/utils/guestCart.js

// Leer guest cart desde localStorage
export function readGuestCart() {
  const data = localStorage.getItem("guest_cart");
  let cart = data ? JSON.parse(data) : null;

  // Si no existe, crear estructura base
  if (!cart) {
    cart = { cartId: null, total: 0, items: [] };
    writeGuestCart(cart);
  }

  return cart;
}

// Guardar guest cart
export function writeGuestCart(cart) {
  localStorage.setItem("guest_cart", JSON.stringify(cart));
}

// Vaciar guest cart
export function clearGuestCart() {
  localStorage.removeItem("guest_cart");
}

// Agregar o incrementar item
export function addOrIncreaseGuestItem(cart, product) {
  const { id, price } = product;

  // buscar si existe
  const existing = cart.items.find((i) => i.productId === id);

  if (existing) {
    existing.quantity += 1;
    existing.subtotal = existing.quantity * Number(existing.unitPrice);
  } else {
    cart.items.push({
      id: null, // aún no existe en BD
      cartId: null, // guest
      productId: id,
      quantity: 1,
      unitPrice: Number(price),
      subtotal: Number(price),
      product,
    });
  }

  cart.total = calculateGuestTotal(cart.items);

  return cart;
}

// Actualizar cantidad
export function updateGuestItem(cart, productId, qty) {
  const item = cart.items.find((i) => i.productId === productId);
  if (!item) return cart;

  item.quantity = qty;
  item.subtotal = item.quantity * Number(item.unitPrice);

  cart.total = calculateGuestTotal(cart.items);

  return cart;
}

// Eliminar item
export function deleteGuestItem(cart, productId) {
  cart.items = cart.items.filter((i) => i.productId !== productId);
  cart.total = calculateGuestTotal(cart.items);
  return cart;
}

// Calcular total
function calculateGuestTotal(items) {
  return items.reduce((sum, i) => sum + Number(i.subtotal), 0);
}
