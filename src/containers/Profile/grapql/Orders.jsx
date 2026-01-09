export const ORDERS_QUERY = `
  query getCustomerOrders($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      orders(first: 20, sortKey: PROCESSED_AT, reverse: true) {
        edges {
          node {
            id
            orderNumber
            processedAt
            financialStatus
            totalPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;
