import { useContext } from "react";
import {
  Drawer,
  Box,
  Typography,
  Divider,
  Button,
  CircularProgress,
} from "@mui/material";
import { ShopifyCartContext } from "../../context/ShopifyCart/ShopifyCartContext";

export default function ShopifyCartDrawer({ open, onClose }) {
  const { cart, loadingCart, checkout } = useContext(ShopifyCartContext);

  return (
    <Drawer
      anchor='right'
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 380,
          transition: "all 0.3s ease",
          background: "linear-gradient(180deg, #FFF7FB 0%, #FFFFFF 100%)",
        },
      }}
    >
      <Box
        sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column" }}
      >
        {/* 🌸 Header */}
        <Box sx={{ mb: 2 }}>
          <Typography variant='h6' sx={{ fontWeight: 500, letterSpacing: 0.3 }}>
            Tu selección 🌷
          </Typography>

          <Typography variant='caption' sx={{ opacity: 0.65 }}>
            Pago seguro gestionado por Shopify
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* 🌿 Contenido */}
        <Box sx={{ flex: 1, overflowY: "auto" }}>
          {loadingCart && (
            <Box sx={{ textAlign: "center", mt: 6 }}>
              <CircularProgress sx={{ color: "#E8A1C4" }} />
            </Box>
          )}

          {!loadingCart && cart?.lines?.edges?.length === 0 && (
            <Typography variant='body2' sx={{ opacity: 0.7, mt: 4 }}>
              Aún no has agregado nada 🤍
            </Typography>
          )}

          {!loadingCart &&
            cart?.lines?.edges?.map(({ node }) => (
              <Box
                key={node.id}
                sx={{
                  mb: 2,
                  p: 1.5,
                  borderRadius: 2,
                  backgroundColor: "#FFF0F7",
                }}
              >
                <Typography variant='body1' sx={{ fontWeight: 500 }}>
                  {node.merchandise.product.title}
                </Typography>

                <Typography variant='body2' sx={{ opacity: 0.75 }}>
                  Cantidad: {node.quantity}
                </Typography>

                <Typography variant='body2' sx={{ fontWeight: 500 }}>
                  ${node.merchandise.price.amount}{" "}
                  {node.merchandise.price.currencyCode}
                </Typography>
              </Box>
            ))}
        </Box>

        {/* 🌸 Footer */}
        <Divider sx={{ my: 2 }} />

        <Box>
          <Typography variant='subtitle1' sx={{ fontWeight: 600, mb: 1 }}>
            Total: ${cart?.cost?.totalAmount?.amount}{" "}
            {cart?.cost?.totalAmount?.currencyCode}
          </Typography>

          <Button
            fullWidth
            onClick={checkout}
            disabled={!cart?.lines?.edges?.length}
            sx={{
              py: 1.4,
              borderRadius: 999,
              textTransform: "none",
              fontWeight: 500,
              background: "linear-gradient(135deg, #F4C2D7 0%, #E8A1C4 100%)",
              color: "#4A2C3A",
              boxShadow: "0 8px 20px rgba(232,161,196,0.4)",
              "&:hover": {
                background: "linear-gradient(135deg, #E8A1C4 0%, #DE8CB6 100%)",
              },
            }}
          >
            Continuar con calma 🌸
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
