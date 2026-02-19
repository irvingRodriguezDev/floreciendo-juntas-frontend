import React, { useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import Footer from "./Footer";
import MobileAppNavigation from "./Header/MobileAppNavigation";
import Header from "./Header";
import SalonCartDrawer from "../Layout/CartSidebar";
import AuthContext from "../../context/Auth/AuthContext";
import CartContext from "../../context/Cart/CartContext";
import { requestNotificationPermission } from "../../utils/requestNotificationPermission";
import flor from "../../assets/images/flor.jpeg";
import PremiumWhatsApp from "../CustomWhatsApp";
const Layout = ({ children }) => {
  // Estado para el carrito del salón
  const [openSalonCart, setOpenSalonCart] = useState(false);
  const { autenticado, usuario } = useContext(AuthContext);
  const { cart, guest_cart, getUserCart } = useContext(CartContext);
  useEffect(() => {
    if (autenticado) getUserCart();
  }, [autenticado]);

  const cartCount = autenticado
    ? cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0
    : guest_cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
  useEffect(() => {
    if (!autenticado || !usuario) return;

    const token = localStorage.getItem("token");
    if (token) {
      requestNotificationPermission(token);
    }
  }, [autenticado]);
  return (
    <Box display='flex' flexDirection='column' minHeight='100vh'>
      {/* HEADER */}
      <Header />

      {/* MAIN */}
      <Box
        component='main'
        flex={1}
        sx={{
          pb: { xs: "96px", md: 0 }, // 🔑 espacio para la app navigation
        }}
      >
        {children}
        <PremiumWhatsApp
          phoneNumber='525514960787'
          accountName='Soporte Floreciendo Juntas'
          avatar={flor}
          bottom={110}
        />
      </Box>

      {/* FOOTER SOLO DESKTOP */}
      <Box display={{ xs: "none", md: "block" }}>
        <Footer />
      </Box>

      {/* APP NAVIGATION SOLO MOBILE */}
      <Box display={{ md: "block", lg: "none" }}>
        <MobileAppNavigation
          cartCount={cartCount}
          onOpenSalonCart={() => setOpenSalonCart(true)}
        />
        {/* <PremiumWhatsApp
          phoneNumber='525514960787'
          accountName='Soporte Floreciendo Juntas'
          avatar={flor}
          bottom={110}
        /> */}
      </Box>

      {/* 👉 Aquí luego montamos SalonCartDrawer / Modal */}
      <SalonCartDrawer
        open={openSalonCart}
        onClose={() => setOpenSalonCart(false)}
      />
    </Box>
  );
};

export default Layout;
