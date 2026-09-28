import { createContext, useContext } from "react";

export const ShopifyCartContext = createContext(null);

export function useShopifyCart() {
  const context = useContext(ShopifyCartContext);

  if (!context) {
    throw new Error("useShopifyCart debe usarse dentro de ShopifyCartProvider");
  }

  return context;
}
