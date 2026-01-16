import { Box, IconButton, Typography, Divider, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useContext, useEffect, useMemo } from "react";

import CartContext from "../../context/Cart/CartContext";
import AuthContext from "../../context/Auth/AuthContext";

import CartItem from "./CartItem";
import { formatMexicanCurrency } from "../../utils/FormatCurrency";
import { Link } from "react-router-dom";
import OrdersContext from "../../context/Orders/OrdersContext";
import CloseIcons from "../icons/CloseIcons";
export default function CartSidebar({ open, onClose }) {
  const { cart, guest_cart, getUserCart, clearCart } = useContext(CartContext);
  const { autenticado } = useContext(AuthContext);
  const { createOrder } = useContext(OrdersContext);

  useEffect(() => {
    if (autenticado) {
      getUserCart();
    }
  }, [autenticado]);

  // Seleccionar carrito correcto
  const activeCart = autenticado ? cart : guest_cart;

  // Calcular total
  const total = useMemo(() => {
    if (!activeCart || !Array.isArray(activeCart.items)) return 0;

    return activeCart.items.reduce((sum, item) => {
      const price = Number(item.unitPrice || item.product?.price || 0);
      return sum + price * item.quantity;
    }, 0);
  }, [activeCart]);

  return (
    <>
      {/* Overlay */}
      {open && (
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          sx={{
            position: "fixed",
            inset: 0,
            bgcolor: "rgba(0,0,0,0.45)",
            zIndex: 1200,
            backdropFilter: "blur(2px)",
          }}
        />
      )}

      {/* Sidebar */}
      <Box
        component={motion.div}
        initial={{ x: "100%" }}
        animate={{ x: open ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 120 }}
        sx={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          width: { xs: "90%", sm: 380 },
          bgcolor: "rgba(255, 240, 247, 0.9)",
          backdropFilter: "blur(12px)",
          zIndex: 1300,
          boxShadow: "-4px 0 20px rgba(229, 56, 136, 0.25)",
          p: 2,
          display: "flex",
          flexDirection: "column",
          borderLeft: "2px solid rgba(229, 56, 136, 0.2)",
        }}
      >
        {/* Header */}
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography
            variant='h6'
            fontWeight={700}
            sx={{ color: "#E53888", textShadow: "0 1px 6px rgba(0,0,0,0.09)" }}
          >
            El salón de mis sueños
          </Typography>

          <IconButton onClick={onClose} sx={{ color: "#E53888" }}>
            <CloseIcons width={30} />
          </IconButton>
        </Box>
        {autenticado && activeCart?.items?.length > 0 && (
          <Box sx={{ display: "flex", justifyContent: "end", mt: 1 }}>
            <Button
              onClick={() => clearCart()}
              sx={{
                width: "50%",
                padding: "2px 0",
                background: "#E53888",
                color: "#fff",
                borderRadius: 12,
                fontWeight: 600,
                cursor: "pointer",
                border: "none",
                fontSize: "14px",
                transition: "0.3s",
              }}
              variant='contained'
            >
              Vaciar Carrito
            </Button>
          </Box>
        )}

        <Divider sx={{ my: 2, borderColor: "rgba(229, 56, 136, 0.25)" }} />

        {/* Lista de productos */}
        <Box sx={{ flex: 1, overflowY: "auto", pr: 1 }}>
          {activeCart?.items?.length === 0 ? (
            <Typography
              sx={{
                mt: 5,
                textAlign: "center",
                opacity: 0.6,
                color: "#E53888",
              }}
            >
              Tu carrito está vacío 💗
            </Typography>
          ) : (
            activeCart &&
            activeCart.items.map((item) => (
              <CartItem key={item.id || item.productId} item={item} />
            ))
          )}
        </Box>

        {/* Footer */}
        <Divider sx={{ my: 2, borderColor: "rgba(229, 56, 136, 0.25)" }} />

        <Box>
          <Box display='flex' justifyContent='space-between' mb={2}>
            <Typography fontWeight={600} sx={{ color: "#E53888" }}>
              Total:
            </Typography>
            <Typography fontWeight={700} sx={{ color: "#E53888" }}>
              {formatMexicanCurrency(Number(total))}
            </Typography>
          </Box>
          {autenticado ? (
            <Link to={"/checkout"}>
              <Box
                component='button'
                // onClick={async () => {
                //   const ok = await createOrder(); // espera a que termine
                //   if (ok) onClose(); // solo cerramos si salió bien
                // }}
                style={{
                  width: "100%",
                  padding: "14px 0",
                  background: "#E53888",
                  color: "#fff",
                  borderRadius: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  border: "none",
                  fontSize: "16px",
                  transition: "0.3s",
                }}
              >
                ver carrito
              </Box>
            </Link>
          ) : (
            <Link to={"/iniciar-sesion"}>
              <Box
                component='button'
                style={{
                  width: "100%",
                  padding: "14px 0",
                  background: "#E53888",
                  color: "#fff",
                  borderRadius: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  border: "none",
                  fontSize: "16px",
                  transition: "0.3s",
                }}
              >
                Inicia sesión para guardar
              </Box>
            </Link>
          )}
        </Box>
      </Box>
    </>
  );
}
