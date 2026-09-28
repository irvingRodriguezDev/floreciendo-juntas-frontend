// shopifyAuth.js
export const saveShopifyToken = (auth) => {
  localStorage.setItem(
    "shopifyCustomerToken",
    JSON.stringify({
      token: auth.accessToken,
      expiresAt: auth.expiresAt,
    })
  );
};

export const getShopifyToken = () => {
  const raw = localStorage.getItem("shopifyCustomerToken");
  if (!raw) return null;

  const { token, expiresAt } = JSON.parse(raw);

  if (new Date(expiresAt) <= new Date()) {
    localStorage.removeItem("shopifyCustomerToken");
    return null;
  }

  return token;
};
