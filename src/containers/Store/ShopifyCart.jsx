import { useShopifyCart } from "../../context/ShopifyCart/ShopifyCartContext";
import { Box, Typography, Button, Divider, Paper } from "@mui/material";

export default function ShopifyCart() {
  const { cart, loading, error, checkout } = useShopifyCart();

  if (loading)
    return <Typography sx={{ p: 2 }}>Cargando carrito...</Typography>;
  if (error)
    return (
      <Typography color='error' sx={{ p: 2 }}>
        Error: {error}
      </Typography>
    );

  if (!cart || cart.lines.edges.length === 0) {
    return (
      <Typography sx={{ p: 3, textAlign: "center", opacity: 0.6 }}>
        Tu selección está vacía 🌷
      </Typography>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid #F6E6EF",
        padding: 3,
        borderRadius: 4,
        maxWidth: 450,
        backgroundColor: "#FFF7FB",
      }}
    >
      <Typography
        variant='h6'
        sx={{ fontWeight: 600, mb: 1, color: "#4A2C3A" }}
      >
        Tu Carrito
      </Typography>

      <Typography
        variant='caption'
        display='block'
        sx={{ mb: 2, color: "#9E7B8B" }}
      >
        Productos exclusivos de nuestra tienda.
      </Typography>

      <Divider sx={{ mb: 2 }} />

      {cart.lines.edges.map(({ node }) => (
        <Box
          key={node.id}
          sx={{
            mb: 2,
            pb: 2,
            borderBottom: "1px solid #F0F0F0",
          }}
        >
          {/* Título del Producto Padre */}
          <Typography variant='subtitle2' sx={{ fontWeight: 600 }}>
            {node.merchandise.product.title}
          </Typography>

          {/* 🟢 MODIFICACIÓN CLAVE: Nombre de la variante (Color/Tono) */}
          <Typography
            variant='body2'
            sx={{ color: "#E8A1C4", fontWeight: 500, mb: 0.5 }}
          >
            Opción: {node.merchandise.title}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant='body2' sx={{ opacity: 0.8 }}>
              Cantidad: {node.quantity}
            </Typography>
            <Typography variant='body2' sx={{ fontWeight: 600 }}>
              ${node.merchandise.price.amount}{" "}
              {node.merchandise.price.currencyCode}
            </Typography>
          </Box>
        </Box>
      ))}

      <Box sx={{ mt: 3, p: 2, backgroundColor: "#fff", borderRadius: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
            Total estimado
          </Typography>
          <Typography
            variant='subtitle1'
            sx={{ fontWeight: 700, color: "#4A2C3A" }}
          >
            ${cart.cost.totalAmount.amount} {cart.cost.totalAmount.currencyCode}
          </Typography>
        </Box>

        <Button
          fullWidth
          variant='contained'
          onClick={checkout}
          sx={{
            py: 1.5,
            borderRadius: 999,
            textTransform: "none",
            fontWeight: 600,
            background: "linear-gradient(135deg, #F4C2D7 0%, #E8A1C4 100%)",
            color: "#4A2C3A",
            boxShadow: "0 4px 12px rgba(232,161,196,0.2)",
            "&:hover": {
              background: "linear-gradient(135deg, #E8A1C4 0%, #DE8CB6 100%)",
            },
          }}
        >
          Finalizar compra con Shopify
        </Button>
      </Box>
    </Paper>
  );
}
