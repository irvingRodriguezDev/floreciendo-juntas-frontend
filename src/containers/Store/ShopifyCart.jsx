import { useShopifyCart } from "../../context/ShopifyCart/ShopifyCartContext";

export default function ShopifyCart() {
  const { cart, loading, error, checkout } = useShopifyCart();

  if (loading) return <p>Cargando carrito...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!cart || cart.lines.edges.length === 0) {
    return <p>Tu carrito de tienda está vacío</p>;
  }

  return (
    <div
      style={{
        border: "1px solid #eee",
        padding: 16,
        borderRadius: 8,
        maxWidth: 400,
      }}
    >
      <h3>Tienda · Carrito</h3>

      <p style={{ fontSize: 12, color: "#666" }}>
        Este carrito corresponde únicamente a productos de la tienda.
      </p>

      {cart.lines.edges.map(({ node }) => (
        <div
          key={node.id}
          style={{
            marginBottom: 12,
            borderBottom: "1px solid #eee",
            paddingBottom: 8,
          }}
        >
          <strong>{node.merchandise.product.title}</strong>
          <p>Cantidad: {node.quantity}</p>
          <p>
            ${node.merchandise.price.amount}{" "}
            {node.merchandise.price.currencyCode}
          </p>
        </div>
      ))}

      <p style={{ fontWeight: "bold" }}>
        Total: ${cart.cost.totalAmount.amount}{" "}
        {cart.cost.totalAmount.currencyCode}
      </p>

      <button
        onClick={checkout}
        style={{
          marginTop: 12,
          width: "100%",
          padding: 12,
          backgroundColor: "#000",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        Pagar con Shopify
      </button>
    </div>
  );
}
