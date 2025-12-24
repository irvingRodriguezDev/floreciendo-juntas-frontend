import { useContext, useState } from "react";
import { Button, CircularProgress, Snackbar, Alert } from "@mui/material";
import { ShopifyCartContext } from "../../context/ShopifyCart/ShopifyCartContext";

export default function ShopifyAddToCartButton({ variantId }) {
  const { addToCart, loadingAdd } = useContext(ShopifyCartContext);

  const [open, setOpen] = useState(false);

  const handleAdd = async () => {
    await addToCart(variantId, 1);
    setOpen(true);
  };

  return (
    <>
      <Button
        fullWidth
        onClick={handleAdd}
        disabled={loadingAdd}
        sx={{
          mt: 1,
          py: 1.2,
          borderRadius: 999,
          textTransform: "none",
          fontWeight: 500,
          fontSize: "0.95rem",
          background: "linear-gradient(135deg, #F4C2D7 0%, #E8A1C4 100%)",
          color: "#4A2C3A",
          boxShadow: "0 6px 18px rgba(232,161,196,0.35)",
          "&:hover": {
            background: "linear-gradient(135deg, #E8A1C4 0%, #DE8CB6 100%)",
            boxShadow: "0 8px 22px rgba(232,161,196,0.45)",
          },
        }}
      >
        {loadingAdd ? (
          <CircularProgress size={22} sx={{ color: "#4A2C3A" }} />
        ) : (
          "Agregar con cariño 🤍"
        )}
      </Button>

      <Snackbar
        open={open}
        autoHideDuration={2500}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity='success'
          sx={{
            backgroundColor: "#F6E6EF",
            color: "#4A2C3A",
            fontWeight: 500,
            borderRadius: 2,
          }}
        >
          Producto añadido con amor 🌷
        </Alert>
      </Snackbar>
    </>
  );
}
