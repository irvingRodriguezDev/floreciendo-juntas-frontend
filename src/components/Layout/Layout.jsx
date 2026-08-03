import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Stack, Typography, Paper } from "@mui/material";
import Header from "./Header";
import MobileAppNavigation from "./Header/MobileAppNavigation";
import SalonCartDrawer from "../Layout/CartSidebar";
import AuthContext from "../../context/Auth/AuthContext";
import CartContext from "../../context/Cart/CartContext";
import { requestNotificationPermission } from "../../utils/requestNotificationPermission";
import flor from "../../assets/images/flor.jpeg";
import PremiumWhatsApp from "../CustomWhatsApp";
import clienteAxios from "../../config/Axios";
import FormBirthDate from "./FormBirthDate";
import BirthdayBanner from "./BirthdayBanner"; // 🎂 Importamos el nuevo banner
import Swal from "sweetalert2";
import { alerts } from "../../utils/Alerts";
import { launchSuccessConfetti } from "../../utils/ShowConfetti";
const Layout = ({ children }) => {
  const [openSalonCart, setOpenSalonCart] = useState(false);
  const { autenticado, usuario } = useContext(AuthContext);
  const { cart, guest_cart, getUserCart } = useContext(CartContext);

  const [openBirthModal, setOpenBirthModal] = useState(false);
  const [showBirthdayBanner, setShowBirthdayBanner] = useState(false);

  useEffect(() => {
    if (autenticado) {
      getUserCart();

      // 🎂 Lógica de Cumpleaños: Confeti y Banner
      if (usuario?.todayIsBirthDay) {
        setShowBirthdayBanner(true);

        const todayStr = new Date().toISOString().split("T")[0];
        const lastConfettiDate = localStorage.getItem(
          "birthdayConfettiShownDate",
        );

        // Dispara el confeti solo si no se ha lanzado hoy
        if (lastConfettiDate !== todayStr) {
          launchSuccessConfetti();
          localStorage.setItem("birthdayConfettiShownDate", todayStr);
        }
      }
    }
  }, [autenticado, usuario]);

  const cartCount = autenticado
    ? cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0
    : guest_cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  useEffect(() => {
    if (!autenticado || !usuario) return;

    const token = localStorage.getItem("token");
    if (token) {
      requestNotificationPermission(token);
    }

    const savedBirthDate = localStorage.getItem("savedBirthDate");

    if (!usuario?.birthDate && savedBirthDate !== "true") {
      setOpenBirthModal(true);
    }
  }, [autenticado, usuario]);

  const subscriptionDetails = usuario?.subscriptionDetails;
  const [loadingPortal, setLoadingPortal] = useState(false);

  const handleUpdatePayment = async () => {
    try {
      setLoadingPortal(true);
      const { data } = await clienteAxios.post("/billing/portal", {
        returnUrl: window.location.href,
      });

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error al redirigir al portal:", error);
      Swal.fire({
        icon: "error",
        title: "Ocurrió un inconveniente",
        text: "No pudimos conectar con el sistema de pagos. Por favor intenta de nuevo.",
        confirmButtonColor: "#E53888",
      });
    } finally {
      setLoadingPortal(false);
    }
  };

  const handleBirthDateSuccess = () => {
    localStorage.setItem("savedBirthDate", "true");
    setOpenBirthModal(false);
    alerts.success(
      "¡Exitoso!",
      "Tu fecha de cumpleaños se ha guardado correctamente.",
    );
  };

  return (
    <Box display='flex' flexDirection='column' minHeight='100vh'>
      {/* HEADER */}
      <Header />
      {/* 🎂 MODAL PARA CAPTURAR CUMPLEAÑOS */}
      <FormBirthDate
        open={openBirthModal}
        onClose={() => setOpenBirthModal(false)}
        onSuccess={handleBirthDateSuccess}
      />

      {/* 🎈 BANNER DE FELIZ CUMPLEAÑOS */}
      {showBirthdayBanner && (
        <BirthdayBanner
          userName={usuario?.name}
          onClose={() => setShowBirthdayBanner(false)}
        />
      )}

      {/* 💳 BANNER DE SUBSCRIPCIÓN VENCIDA */}
      {subscriptionDetails?.status === "past_due" && (
        <Box sx={{ width: "100%", px: { xs: 2, sm: 4 }, mt: 2, mb: 3 }}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: "20px",
              background: "linear-gradient(135deg, #FFF5F8 0%, #FFEBF3 100%)",
              border: "1px solid #F3B6D1",
              p: { xs: 2.5, md: 3 },
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "flex-start", md: "center" },
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Stack
                direction='row'
                spacing={1.5}
                alignItems='center'
                sx={{ mb: 1 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "#FFE0ED",
                    borderRadius: "50%",
                    width: 36,
                    height: 36,
                    fontSize: "1.1rem",
                  }}
                >
                  💳
                </Box>
                <Typography
                  variant='h6'
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: "1rem", sm: "1.1rem" },
                    color: "#C2185B",
                  }}
                >
                  Tu último pago de renovación no pudo procesarse
                </Typography>
              </Stack>

              <Typography
                variant='body2'
                sx={{
                  color: "#4A4A4A",
                  lineHeight: 1.5,
                  fontWeight: 500,
                  fontSize: "0.9rem",
                  pl: { md: "52px" },
                }}
              >
                Para mantener tu acceso activo sin interrupciones, por favor
                actualiza tu tarjeta aquí.
                <Box
                  component='span'
                  sx={{
                    display: "block",
                    color: "#E53888",
                    fontWeight: 700,
                    mt: 0.5,
                  }}
                >
                  💡 No necesitas contratar un nuevo plan, solo actualiza tus
                  datos.
                </Box>
              </Typography>
            </Box>

            <Box
              sx={{
                width: { xs: "100%", md: "auto" },
                pl: { md: 2 },
              }}
            >
              <Button
                onClick={handleUpdatePayment}
                disabled={loadingPortal}
                variant='contained'
                disableElevation
                fullWidth={{ xs: true, md: false }}
                sx={{
                  bgcolor: "#E53888",
                  color: "#fff",
                  borderRadius: "14px",
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  px: 3,
                  py: 1.4,
                  boxShadow: "0 4px 12px rgba(229, 56, 136, 0.25)",
                  whiteSpace: "nowrap",
                  "&:hover": {
                    bgcolor: "#CF2C75",
                  },
                }}
              >
                {loadingPortal ? "Abriendo portal..." : "Actualizar mi tarjeta"}
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
          pb: { xs: "96px", md: 0 },
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

      {/* APP NAVIGATION SOLO MOBILE */}
      <Box display={{ md: "block", lg: "none" }}>
        <MobileAppNavigation
          cartCount={cartCount}
          onOpenSalonCart={() => setOpenSalonCart(true)}
        />
      </Box>

      {/* DRAWER CARRITO */}
      <SalonCartDrawer
        open={openSalonCart}
        onClose={() => setOpenSalonCart(false)}
      />
    </Box>
  );
};

export default Layout;
