import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Stack,
  Typography,
  Paper,
} from "@mui/material";
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
        <Box sx={{ width: "100%", px: { xs: 2, sm: 4 }, mt: 3, mb: 2 }}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: "24px",
              background:
                "linear-gradient(135deg, rgba(255, 249, 244, 0.9) 0%, rgba(255, 242, 232, 0.9) 100%)",
              backdropFilter: "blur(10px)", // Efecto glassmorphism sutil
              border: "1px solid rgba(237, 108, 2, 0.2)",
              p: { xs: 3, md: 4 },
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "flex-start", md: "center" },
              justifyContent: "space-between",
              gap: 3,
            }}
          >
            {/* Columna Izquierda: Mensaje e Instrucciones */}
            <Box sx={{ flex: 1, maxWidth: { md: "75%" } }}>
              <Stack
                direction='row'
                spacing={1.5}
                alignItems='center'
                sx={{ mb: 1.5 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "rgba(237, 108, 2, 0.12)",
                    borderRadius: "50%",
                    width: 32,
                    height: 32,
                    color: "#ed6c02",
                  }}
                >
                  {/* Puedes usar el icono de alerta nativo de tu pack de iconos, aquí simulamos el color */}
                  ⚠️
                </Box>
                <Typography
                  variant='h6'
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: "1.1rem", sm: "1.2rem" },
                    color: "#b24b00",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Acción requerida: Pago pendiente
                </Typography>
              </Stack>

              <Typography
                variant='body1'
                sx={{
                  color: "#000",
                  lineHeight: 1.6,
                  fontWeight: "bold",
                  fontSize: "0.95rem",
                }}
              >
                No pudimos procesar tu pago de renovación. Para reactivar tu
                acceso, añade tu nueva tarjeta como método principal. Una vez
                guardada, Stripe liquidará tu factura pendiente automáticamente.
              </Typography>

              <Typography
                variant='caption'
                display='block'
                sx={{
                  color: "#E53888",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  mt: 1.5,
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                }}
              >
                * Nota importante: Por favor, evita comprar una nueva
                suscripción desde el inicio.
              </Typography>
            </Box>

            {/* Columna Derecha: Botón de Acción Dedicado */}
            <Box
              sx={{
                width: { xs: "100%", md: "auto" },
                display: "flex",
                justifyContent: { xs: "stretch", md: "flex-end" },
              }}
            >
              <Button
                onClick={handleUpdatePayment}
                variant='contained'
                disableElevation
                fullWidth={{ xs: true, md: false }}
                sx={{
                  bgcolor: "#E53888",
                  color: "#fff",
                  borderRadius: "16px",
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "1rem",
                  px: 4,
                  py: 1.8,
                  boxShadow: "0 4px 14px rgba(229, 56, 136, 0.2)",
                  transition: "all 0.2s ease-in-out",
                  whiteSpace: "nowrap", // Evita que el texto del botón se rompa en dos líneas
                  "&:hover": {
                    bgcolor: "#CF2C75",
                    boxShadow: "0 6px 20px rgba(229, 56, 136, 0.3)",
                    transform: "translateY(-1px)",
                  },
                  "&:active": {
                    transform: "translateY(0)",
                  },
                  "&.Mui-disabled": {
                    bgcolor: "#f093c4",
                    color: "#fff",
                  },
                }}
              >
                {loadingPortal
                  ? "Abriendo portal seguro..."
                  : "Actualizar método de pago"}
              </Button>
            </Box>
          </Paper>
        </Box>
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
