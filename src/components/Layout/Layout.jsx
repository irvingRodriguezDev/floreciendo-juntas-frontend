import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Stack, Typography, Paper } from "@mui/material";
import Header from "./Header";
import MobileAppNavigation from "./Header/MobileAppNavigation";
import SalonCartDrawer from "../Layout/CartSidebar";
import AuthContext from "../../context/Auth/AuthContext";
import CartContext from "../../context/Cart/CartContext";
import { requestNotificationPermission } from "../../utils/requestNotificationPermission";
import PremiumWhatsApp from "../CustomWhatsApp";
import clienteAxios from "../../config/Axios";
import FormBirthDate from "./FormBirthDate";
import BirthdayBanner from "./BirthdayBanner"; // 🎂 Importamos el nuevo banner
import Swal from "sweetalert2";
import { alerts } from "../../utils/Alerts";
import { launchSuccessConfetti } from "../../utils/ShowConfetti";
import HolidaySwitch from "./HolidaySwitch";
import { useHoliday } from "../../context/Holiday/HolidayContext";
import HolidayGarland from "./HolidayGarland";
import Snowfall from "react-snowfall";
const Layout = ({ children }) => {
  const [openSalonCart, setOpenSalonCart] = useState(false);
  const { autenticado, usuario } = useContext(AuthContext);
  const { cart, guest_cart, getUserCart } = useContext(CartContext);
  const { isHolidayMode } = useHoliday();
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

    requestNotificationPermission();

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
  const [snowflakeImage, setSnowflakeImage] = useState(null);

  useEffect(() => {
    // Creamos un elemento de imagen en memoria con un SVG limpio o una URL de tu CDN
    const image = document.createElement("img");
    // Puedes usar un enlace SVG en base64 de un copo estilizado o una URL de tu CDN
    image.src = "https://www.svgrepo.com/show/184599/snowflake-snow.svg"; // Ejemplo: Emoji oficial de copo de nieve en alta calidad

    image.onload = () => {
      setSnowflakeImage(image);
    };
  }, []);

  return (
    <Box display='flex' flexDirection='column' minHeight='100vh'>
      {/* HEADER */}
      <Header />
      {isHolidayMode && <HolidayGarland />}
      {isHolidayMode && (
        <Snowfall
          snowflakeCount={85} // Cantidad equilibrada para que se vea elegante y no sature
          images={snowflakeImage ? [snowflakeImage] : undefined} // Usamos nuestra imagen personalizada
          radius={[8, 18]} // Tamaño variable de los copos (mínimo y máximo en pixeles)
          speed={[0.5, 2.0]} // Velocidad de caída suave y relajada
          wind={[-0.5, 1.5]} // Ligero movimiento de viento lateral realista
          style={{
            position: "fixed",
            width: "100%",
            height: "100%",
            zIndex: 150, // Por debajo de modales y menús importantes, pero visible en la app
            pointerEvents: "none", // Permite hacer clic en los botones y cursos a través de la nieve
          }}
        />
      )}
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
          phoneNumbers={["525514960787", "527221334367"]}
          accountName='Soporte Floreciendo Juntas'
          avatar={`https://cdn.floreciendojuntas.com/production/statics/FLOR-ROSA-CONVEN.webp`}
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
