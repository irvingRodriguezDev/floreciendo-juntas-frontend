import { useContext } from "react";
import {
  Drawer,
  Box,
  Typography,
  Divider,
  Button,
  CircularProgress,
  IconButton,
} from "@mui/material";
// Importamos un icono para eliminar items si lo deseas
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { ShopifyCartContext } from "../../context/ShopifyCart/ShopifyCartContext";
import CloseIcons from "../../components/icons/CloseIcons";
import { Link } from "react-router-dom";

export default function ShopifyCartDrawer({ open, onClose }) {
  const { cart, loadingCart, checkout } = useContext(ShopifyCartContext);

  return (
    <Drawer
      anchor='right'
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 380 }, // Responsivo para móviles
          transition: "all 0.3s ease",
          background: "linear-gradient(180deg, #FFF7FB 0%, #FFFFFF 100%)",
        },
      }}
    >
      <Box
        sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column" }}
      >
        {/* 🌸 Header */}
        <Box
          sx={{
            mb: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box>
            <Typography
              variant='h6'
              sx={{ fontWeight: 600, color: "#4A2C3A", letterSpacing: 0.3 }}
            >
              Tu selección 🌷
            </Typography>
            <Typography variant='caption' sx={{ opacity: 0.65 }}>
              Pago seguro gestionado por Shopify
            </Typography>
          </Box>
          <Button onClick={onClose} sx={{ color: "#4A2C3A", minWidth: 0 }}>
            <CloseIcons width={30} />
          </Button>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* 🌿 Contenido */}
        <Box sx={{ flex: 1, overflowY: "auto", pr: 0.5 }}>
          {loadingCart && (
            <Box sx={{ textAlign: "center", mt: 6 }}>
              <CircularProgress sx={{ color: "#E8A1C4" }} />
            </Box>
          )}

          {!loadingCart && cart?.lines?.edges?.length === 0 && (
            <Box sx={{ textAlign: "center", mt: 10 }}>
              <Typography variant='body2' sx={{ opacity: 0.5, mb: 2 }}>
                Aún no has agregado nada 🤍
              </Typography>
              <Link to={"/tienda"}>
                <Button
                  onClick={onClose}
                  variant='text'
                  sx={{ color: "#E8A1C4", textTransform: "none" }}
                >
                  Ir a ver productos
                </Button>
              </Link>
            </Box>
          )}

          {!loadingCart &&
            cart?.lines?.edges?.map(({ node }) => (
              <Box
                key={node.id}
                sx={{
                  mb: 2,
                  p: 2,
                  borderRadius: 3,
                  backgroundColor: "#FFF0F7",
                  border: "1px solid #FCE4EC",
                  position: "relative",
                }}
              >
                {/* Título Principal */}
                <Typography
                  variant='body1'
                  sx={{ fontWeight: 600, color: "#4A2C3A", pr: 3 }}
                >
                  {node.merchandise.product.title}
                </Typography>

                {/* 🟢 MODIFICACIÓN CLAVE: Mostrar el Color/Variante */}
                <Typography
                  variant='body2'
                  sx={{
                    color: "#DE8CB6",
                    fontWeight: 500,
                    fontSize: "0.85rem",
                    mb: 1,
                  }}
                >
                  Tono: {node.merchandise.title}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant='body2' sx={{ opacity: 0.75 }}>
                    Cantidad: {node.quantity}
                  </Typography>

                  <Typography
                    variant='body2'
                    sx={{ fontWeight: 700, color: "#4A2C3A" }}
                  >
                    ${node.merchandise.price.amount}{" "}
                    {node.merchandise.price.currencyCode}
                  </Typography>
                </Box>
              </Box>
            ))}
        </Box>

        {/* 🌸 Footer */}
        <Divider sx={{ my: 2 }} />

        <Box sx={{ p: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant='subtitle1' sx={{ fontWeight: 500 }}>
              Total
            </Typography>
            <Typography
              variant='subtitle1'
              sx={{ fontWeight: 700, color: "#4A2C3A" }}
            >
              ${cart?.cost?.totalAmount?.amount || "0.00"}{" "}
              {cart?.cost?.totalAmount?.currencyCode}
            </Typography>
          </Box>

          <Button
            fullWidth
            onClick={checkout}
            disabled={!cart?.lines?.edges?.length}
            sx={{
              py: 1.6,
              borderRadius: 999,
              textTransform: "none",
              fontWeight: 600,
              fontSize: "1rem",
              background: "linear-gradient(135deg, #F4C2D7 0%, #E8A1C4 100%)",
              color: "#4A2C3A",
              boxShadow: "0 8px 20px rgba(232,161,196,0.35)",
              "&:hover": {
                background: "linear-gradient(135deg, #E8A1C4 0%, #DE8CB6 100%)",
                transform: "scale(1.02)",
                transition: "all 0.2s",
              },
              "&:disabled": {
                background: "#F5F5F5",
                color: "#BDBDBD",
              },
            }}
          >
            Continuar al pago seguro 🌸
          </Button>

          <Typography
            variant='caption'
            display='block'
            sx={{ textAlign: "center", mt: 2, opacity: 0.5 }}
          >
            Impuestos y envío calculados al finalizar
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
}
