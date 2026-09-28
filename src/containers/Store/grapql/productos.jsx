export const PRODUCTS_QUERY = `
query GetProducts($first: Int!, $after: String) {
  products(
    first: $first
    after: $after
    sortKey: BEST_SELLING
  ) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        id
        title
        handle
        images(first: 5) {
          edges {
            node {
              url
            }
          }
        }
        variants(first: 100) {
          edges {
            node {
              id
              title
              availableForSale
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
}
`;
