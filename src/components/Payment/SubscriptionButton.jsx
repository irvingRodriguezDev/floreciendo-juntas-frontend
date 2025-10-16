import React, { useState } from "react";
import {
  Button,
  Box,
  Typography,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { useStripe } from "@stripe/react-stripe-js";

// Colores de acento
const PRIMARY_PINK = "#E53888";
const HOVER_PINK = "#D1789C";

// Definición de los IDs de los planes desde variables de entorno
// Asegúrate de que estas variables estén definidas en tu archivo .env
const PRICE_ONETIME = import.meta.env.VITE_STRIPE_PRICE_ONETIME;
const PRICE_RECURRING = import.meta.env.VITE_STRIPE_PRICE_RECURRING;

const SubscriptionForm = ({ userId }) => {
  const stripe = useStripe();
  const [loading, setLoading] = useState(false);
  // Estado para guardar la opción seleccionada (priceId)
  const [selectedPriceId, setSelectedPriceId] = useState(PRICE_RECURRING);

  const handlePriceChange = (event) => {
    setSelectedPriceId(event.target.value);
  };

  const handleSubscribe = async () => {
    if (!stripe || !selectedPriceId) {
      console.error("Stripe no está cargado o el plan no está seleccionado.");
      return;
    }

    setLoading(true);

    try {
      // 1. Llamada al backend con el ID de precio seleccionado
      const response = await fetch("/api/create-subscription-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          priceId: selectedPriceId, // <-- ENVIAMOS EL ID SELECCIONADO
        }),
      });

      if (!response.ok) throw new Error("Error al crear la sesión de pago.");

      const session = await response.json(); // session = { id: 'cs_test_...' }

      // 2. Redireccionar al usuario a Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error("Error de redirección:", result.error.message);
      }
    } catch (error) {
      console.error("Error en la suscripción:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        maxWidth: 400,
        mx: "auto",
        bgcolor: "white",
        borderRadius: "12px",
      }}
    >
      <Typography
        variant='h6'
        gutterBottom
        textAlign='center'
        color={PRIMARY_PINK}
      >
        Elige tu camino para florecer:
      </Typography>

      {/* Selector de Opciones de Pago */}
      <RadioGroup
        value={selectedPriceId}
        onChange={handlePriceChange}
        name='subscription-options'
        sx={{ mb: 3 }}
      >
        <FormControlLabel
          value={PRICE_RECURRING}
          control={<Radio sx={{ color: PRIMARY_PINK }} />}
          label={
            <Box>
              <Typography fontWeight='bold'>Suscripción Mensual</Typography>
              <Typography variant='caption'>
                Acceso continuo por un cargo recurrente.
              </Typography>
            </Box>
          }
        />
        <FormControlLabel
          value={PRICE_ONETIME}
          control={<Radio sx={{ color: PRIMARY_PINK }} />}
          label={
            <Box>
              <Typography fontWeight='bold'>
                Pago Único (Acceso por 1 año)
              </Typography>
              <Typography variant='caption'>
                Un solo pago, acceso total por un periodo limitado.
              </Typography>
            </Box>
          }
        />
      </RadioGroup>

      {/* Botón de Suscripción */}
      <Button
        variant='contained'
        fullWidth
        onClick={handleSubscribe}
        disabled={loading || !selectedPriceId}
        sx={{ bgcolor: PRIMARY_PINK, "&:hover": { bgcolor: HOVER_PINK } }}
      >
        {loading ? "Procesando Pago..." : "Continuar con el Pago"}
      </Button>

      {/* Nota importante */}
      {!selectedPriceId && (
        <Typography variant='body2' color='error' mt={1} textAlign='center'>
          Debes seleccionar una opción.
        </Typography>
      )}
    </Box>
  );
};

export default SubscriptionForm;
