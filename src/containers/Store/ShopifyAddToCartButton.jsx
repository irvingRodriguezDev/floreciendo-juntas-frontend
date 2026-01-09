import React, { useContext, useState } from "react";
import { Button, CircularProgress, Snackbar, Alert } from "@mui/material";
import { ShopifyCartContext } from "../../context/ShopifyCart/ShopifyCartContext";

export default function ShopifyAddToCartButton({
  allQuantities,
  productVariants,
}) {
  const { addToCart, loadingAdd } = useContext(ShopifyCartContext);
  const [open, setOpen] = useState(false);

  const handleAddSelection = async () => {
    // 1. Filtramos y preparamos el array para la nueva lógica del Contexto
    const itemsToAdd = productVariants
      .filter((v) => allQuantities[v.node.id] > 0)
      .map((v) => ({
        variantId: v.node.id, // Nombre de propiedad que espera nuestro nuevo addToCart
        quantity: allQuantities[v.node.id],
      }));

    if (itemsToAdd.length === 0) return;

    // 2. Enviamos todo en UNA SOLA petición de red 🚀
    await addToCart(itemsToAdd);

    setOpen(true);
  };

  return (
    <>
      <Button
        fullWidth
        onClick={handleAddSelection}
        disabled={
          loadingAdd ||
          !productVariants.some((v) => allQuantities[v.node.id] > 0)
        }
        sx={{
          py: 1.5,
          borderRadius: 999,
          textTransform: "none",
          fontWeight: 600,
          background: "linear-gradient(135deg, #F4C2D7 0%, #E8A1C4 100%)",
          color: "#4A2C3A",
          boxShadow: "0 4px 12px rgba(232,161,196,0.3)",
          "&:hover": {
            background: "linear-gradient(135deg, #E8A1C4 0%, #DE8CB6 100%)",
            boxShadow: "0 6px 16px rgba(232,161,196,0.4)",
          },
          "&:disabled": {
            background: "#f5f5f5",
            color: "#bdbdbd",
          },
        }}
      >
        {loadingAdd ? (
          <CircularProgress size={24} sx={{ color: "#4A2C3A" }} />
        ) : (
          "Añadir selección al carrito 🌷"
        )}
      </Button>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity='success'
          variant='filled'
          sx={{ borderRadius: 2, width: "100%" }}
        >
          ¡Tus productos se han añadido! ✨
        </Alert>
      </Snackbar>
    </>
  );
}
