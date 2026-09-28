// src/lib/shopifyClient.js
const domain = import.meta.env.VITE_SHOPIFY_DOMAIN;
const token = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
const version = import.meta.env.VITE_SHOPIFY_API_VERSION;

export async function shopifyFetch(query, variables = {}) {
  const response = await fetch(
    `https://${domain}/api/${version}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
      },
      body: JSON.stringify({ query, variables }),
    }
  );

  return response.json();
}
