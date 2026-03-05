import React, { useContext, useEffect, useState } from "react";
import { Alert, AlertTitle, Box, Button, Stack } from "@mui/material";
import Footer from "./Footer";
import MobileAppNavigation from "./Header/MobileAppNavigation";
import Header from "./Header";
import SalonCartDrawer from "../Layout/CartSidebar";
import AuthContext from "../../context/Auth/AuthContext";
import CartContext from "../../context/Cart/CartContext";
import { requestNotificationPermission } from "../../utils/requestNotificationPermission";
import flor from "../../assets/images/flor.jpeg";
import PremiumWhatsApp from "../CustomWhatsApp";
import clienteAxios from "../../config/Axios";
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
  const subscriptionDetails = usuario?.subscriptionDetails;

  const [loadingPortal, setLoadingPortal] = useState(false);

  const handleUpdatePayment = async () => {
    try {
      setLoadingPortal(true);
      // Sugerencia: Asegúrate de que el backend sepa a qué URL regresar al usuario
      const { data } = await clienteAxios.post("/billing/portal", {
        returnUrl: "https://floreciendojuntas.com/mi-perfil", // Opcional: enviar la URL actual
      });

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error al redirigir al portal:", error);
      Swal.fire({
        icon: "error",
        title: "No pudimos conectar con Stripe",
        text: "Intenta de nuevo en unos momentos.",
        confirmButtonColor: "#E53888",
      });
    } finally {
      setLoadingPortal(false);
    }
  };

  return (
    <Box display='flex' flexDirection='column' minHeight='100vh'>
      {/* HEADER */}
      <Header />
      {subscriptionDetails?.status === "past_due" && (
        <Stack sx={{ width: "100%", mt: 2, mb: 2 }} spacing={2}>
          <Alert
            severity='warning'
            variant='outlined' // Se ve más moderno y limpio
            sx={{
              borderRadius: "16px",
              border: "2px solid #ed6c02",
              bgcolor: "#fff9f4",
            }}
          >
            <AlertTitle sx={{ fontWeight: "bold" }}>
              ⚠️ Acción requerida: Pago pendiente
            </AlertTitle>
            Tuvimos un problema al renovar tu suscripción. Stripe intentará
            realizar el cobro automáticamente, pero para evitar interrupciones,
            por favor actualiza tu tarjeta.
            <Box sx={{ mt: 2 }}>
              <Button
                onClick={handleUpdatePayment}
                variant='contained'
                disabled={loadingPortal}
                sx={{
                  bgcolor: "#E53888",
                  borderRadius: "12px",
                  textTransform: "none",
                  fontWeight: 700,
                  "&:hover": { bgcolor: "#CF2C75" },
                }}
              >
                {loadingPortal
                  ? "Cargando portal..."
                  : "Actualizar método de pago"}
              </Button>
            </Box>
          </Alert>
        </Stack>
      )}
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
