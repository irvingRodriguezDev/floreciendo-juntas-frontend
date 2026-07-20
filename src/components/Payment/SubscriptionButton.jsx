import { useContext, useState } from "react";
import { Button, Box, Typography, Radio } from "@mui/material";
import { MethodPost } from "../../config/Service";
import AuthContext from "../../context/Auth/AuthContext";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

// 🎀 Paleta Premium Femenina & Quiet Luxury
const BRAND = {
  accentPlum: "#2A1B24", // Ciruela profundo para texto principal de alto contraste
  champagneGold: "#B82C67", // Oro champaña mate para acentos y estados activos
  roseVelvet: "#B82C67", // El rosa insignia, pero más maduro y elegante (terciopelo)
  roseSoft: "#FFF0F5", // Fondo rosa ultra pálido / lino para interacciones
  textMuted: "#7A6E75", // Gris topo suave para textos secundarios
};

const PRICE_ONETIME = import.meta.env.VITE_STRIPE_PRICE_ONETIME;
const PRICE_RECURRING = import.meta.env.VITE_STRIPE_PRICE_RECURRING;

const SubscriptionForm = ({ userId }) => {
  const { autenticado } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [selectedPriceId, setSelectedPriceId] = useState(PRICE_RECURRING);

  const handleSubscribe = async () => {
    if (!selectedPriceId) return;
    setLoading(true);

    try {
      const data = { userId, priceId: selectedPriceId };
      const url =
        selectedPriceId === PRICE_ONETIME
          ? "/payment/create-payment-onetime"
          : "/payment/create-payment-recurring";

      const res = await MethodPost(url, data);

      if (res.status !== 200) {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: res.data.response.error,
          timer: 2500,
          showConfirmButton: false,
        });
        return;
      }

      const session = res.data;
      if (!session?.url) {
        Swal.fire({
          title: "Error",
          text: "No se logró establecer la conexión con la pasarela de pagos",
          icon: "error",
          timer: 2500,
          showConfirmButton: false,
        });
        return;
      }

      window.location.href = session.url;
    } catch (error) {
      console.log(error, "el error");

      Swal.fire({
        title: "Error",
        text: error.response?.data?.msg || "Ocurrió un error inesperado",
        icon: "error",
        showConfirmButton: false,
        timer: 2500,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 440,
        mx: "auto",
        bgcolor: "transparent", // Deja que respire sobre la card contenedora del padre
        position: "relative",
      }}
    >
      {/* 🏷️ Bloque de Precio Editorial */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          sx={{
            fontFamily: "serif",
            fontSize: "2.8rem",
            fontWeight: 300,
            color: BRAND.accentPlum,
            lineHeight: 1,
          }}
        >
          $200.00
          <Typography
            component='span'
            sx={{
              fontSize: "1rem",
              color: BRAND.textMuted,
              ml: 1,
              letterSpacing: "0.05em",
            }}
          >
            MXN / mes
          </Typography>
        </Typography>
      </Box>

      {/* 🎛️ Tarjetas Selectoras de Plan Estilizadas */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}>
        {/* Opción 1: Recurrente */}
        <Box
          onClick={() => setSelectedPriceId(PRICE_RECURRING)}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "between",
            p: 2.5,
            borderRadius: "16px",
            border: "1px solid",
            borderColor:
              selectedPriceId === PRICE_RECURRING
                ? BRAND.champagneGold
                : "rgba(0,0,0,0.06)",
            bgcolor:
              selectedPriceId === PRICE_RECURRING ? BRAND.roseSoft : "#FFFFFF",
            cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow:
              selectedPriceId === PRICE_RECURRING
                ? "0 10px 20px rgba(184, 44, 103, 0.04)"
                : "none",
            "&:hover": {
              borderColor: BRAND.champagneGold,
              bgcolor: BRAND.roseSoft,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexGrow: 1,
              gap: 1.5,
            }}
          >
            <Radio
              checked={selectedPriceId === PRICE_RECURRING}
              value={PRICE_RECURRING}
              sx={{
                p: 0,
                color: "rgba(0,0,0,0.15)",
                "&.Mui-checked": { color: BRAND.roseVelvet },
              }}
            />
            <Box>
              <Typography
                sx={{
                  fontWeight: 500,
                  color: BRAND.accentPlum,
                  fontSize: "0.95rem",
                }}
              >
                Suscripción Mensual
              </Typography>
              <Typography
                variant='caption'
                sx={{ color: BRAND.textMuted, display: "block", mt: 0.2 }}
              >
                Acceso continuo con cargo automático mensual.
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* NOTA: He dejado la estructura comentada por si decides activar la de Pago Único más adelante, adaptada al nuevo estilo */}
        {/* 
        <Box
          onClick={() => setSelectedPriceId(PRICE_ONETIME)}
          sx={{
            display: "flex",
            alignItems: "center",
            p: 2.5,
            borderRadius: "16px",
            border: "1px solid",
            borderColor: selectedPriceId === PRICE_ONETIME ? BRAND.champagneGold : "rgba(0,0,0,0.06)",
            bgcolor: selectedPriceId === PRICE_ONETIME ? BRAND.roseSoft : "#FFFFFF",
            cursor: "pointer",
            transition: "all 0.3s ease",
            "&:hover": { borderColor: BRAND.champagneGold, bgcolor: BRAND.roseSoft },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1, gap: 1.5 }}>
            <Radio
              checked={selectedPriceId === PRICE_ONETIME}
              value={PRICE_ONETIME}
              sx={{ p: 0, color: "rgba(0,0,0,0.15)", "&.Mui-checked": { color: BRAND.roseVelvet } }}
            />
            <Box>
              <Typography sx={{ fontWeight: 500, color: BRAND.accentPlum, fontSize: "0.95rem" }}>
                Acceso Único (30 días)
              </Typography>
              <Typography variant="caption" sx={{ color: BRAND.textMuted, display: "block", mt: 0.2 }}>
                Un solo pago, sin renovaciones automáticas.
              </Typography>
            </Box>
          </Box>
        </Box> 
        */}
      </Box>

      {/* 💳 Botón de Acción Principal de Alta Gama */}
      {autenticado ? (
        <Button
          variant='contained'
          fullWidth
          onClick={handleSubscribe}
          disabled={loading}
          sx={{
            py: 1.8,
            fontSize: "0.9rem",
            fontWeight: "600",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            bgcolor: BRAND.roseVelvet,
            color: "#FFFFFF",
            borderRadius: "12px",
            boxShadow: "0 12px 24px rgba(184, 44, 103, 0.2)",
            transition: "all 0.3s ease",
            "&:hover": {
              bgcolor: BRAND.accentPlum, // Invierte el tono a ciruela profundo en hover
              boxShadow: "0 16px 30px rgba(42, 27, 36, 0.2)",
              transform: "translateY(-1px)",
            },
          }}
        >
          {loading ? "Procesando Alta..." : "Adquirir Membresía"}
        </Button>
      ) : (
        <Link to='/iniciar-sesion' style={{ textDecoration: "none" }}>
          <Button
            variant='contained'
            fullWidth
            sx={{
              py: 1.8,
              fontSize: "0.9rem",
              fontWeight: "600",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              bgcolor: BRAND.accentPlum,
              color: "#FFFFFF",
              borderRadius: "12px",
              boxShadow: "0 12px 24px rgba(42, 27, 36, 0.15)",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: BRAND.roseVelvet,
                transform: "translateY(-1px)",
              },
            }}
          >
            Inicia sesión para suscribirte
          </Button>
        </Link>
      )}
    </Box>
  );
};

export default SubscriptionForm;
