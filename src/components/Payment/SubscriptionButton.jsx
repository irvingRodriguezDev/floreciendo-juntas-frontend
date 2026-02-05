import { useContext, useState } from "react";
import {
  Button,
  Box,
  Typography,
  FormControlLabel,
  RadioGroup,
  Radio,
  Divider,
} from "@mui/material";
import { MethodPost } from "../../config/Service";
import AuthContext from "../../context/Auth/AuthContext";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

// Colores
const PRIMARY_PINK = "#E53888";
const HOVER_PINK = "#D1789C";

// ENV prices
const PRICE_ONETIME = import.meta.env.VITE_STRIPE_PRICE_ONETIME;
const PRICE_RECURRING = import.meta.env.VITE_STRIPE_PRICE_RECURRING;

const SubscriptionForm = ({ userId }) => {
  const { autenticado } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [selectedPriceId, setSelectedPriceId] = useState(PRICE_RECURRING); // default recurrente

  const handlePriceChange = (event) => {
    setSelectedPriceId(event.target.value);
  };

  const handleSubscribe = async () => {
    if (!selectedPriceId) {
      console.error("Plan no seleccionado");
      return;
    }

    setLoading(true);

    try {
      const data = {
        userId,
        priceId: selectedPriceId,
      };

      // 🔥 Dependiendo del plan, llamamos a una ruta diferente
      const url =
        selectedPriceId === PRICE_ONETIME
          ? "/payment/create-payment-onetime"
          : "/payment/create-payment-recurring";

      const res = await MethodPost(url, data);

      // Verificación correcta
      if (res.status !== 200) {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: res.data.response.error,
          timer: 2500,
          showConfirmButton: false,
        });
      }

      const session = res.data;

      if (!session?.url) {
        Swal.fire({
          title: "Error",
          text: "No se logro establecer la conexion con la pasarela de pagos",
          icon: "error",
          timer: 2500,
          showConfirmButton: false,
        });
      }

      // Redirect seguro a Stripe
      window.location.href = session.url;
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response.data.error,
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
        p: { xs: 3, sm: 4 },
        maxWidth: 420,
        mx: "auto",
        bgcolor: "white",
        borderRadius: 4,
        boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
        transition: "transform 0.2s ease",
        "&:hover": { transform: "translateY(-4px)" },
      }}
    >
      {/* TÍTULO */}

      {/* PRECIO */}
      <Typography
        variant='subtitle1'
        textAlign='center'
        sx={{ mb: 3, opacity: 0.8 }}
      >
        Por solo <b>$200.00 MXN</b>
      </Typography>

      <Divider sx={{ mb: 3 }} />

      {/* OPCIONES DE PAGO */}
      <RadioGroup value={selectedPriceId} onChange={handlePriceChange}>
        <Box
          sx={{
            mb: 2,
            p: 1.5,
            borderRadius: 3,
            border: "1px solid #eee",
            "&:hover": { backgroundColor: "#fafafa" },
          }}
        >
          <FormControlLabel
            value={PRICE_RECURRING}
            control={
              <Radio
                sx={{
                  color: PRIMARY_PINK,
                  "&.Mui-checked": { color: PRIMARY_PINK },
                }}
              />
            }
            label={
              <Box>
                <Typography fontWeight='bold'>Suscripción Mensual</Typography>
                <Typography variant='caption'>
                  Acceso continuo con cargo automático.
                </Typography>
              </Box>
            }
          />
        </Box>

        {/* <Box
          sx={{
            mb: 2,
            p: 1.5,
            borderRadius: 3,
            border: "1px solid #eee",
            "&:hover": { backgroundColor: "#fafafa" },
          }}
        >
          <FormControlLabel
            value={PRICE_ONETIME}
            control={
              <Radio
                sx={{
                  color: PRIMARY_PINK,
                  "&.Mui-checked": { color: PRIMARY_PINK },
                }}
              />
            }
            label={
              <Box>
                <Typography fontWeight='bold'>Pago Único (30 días)</Typography>
                <Typography variant='caption'>
                  Un solo pago, sin cargos posteriores.
                </Typography>
              </Box>
            }
          />
        </Box> */}
      </RadioGroup>

      {/* BOTÓN */}
      {autenticado ? (
        <Button
          variant='contained'
          fullWidth
          onClick={handleSubscribe}
          disabled={loading}
          sx={{
            mt: 1,
            py: 1.4,
            fontSize: "1rem",
            fontWeight: "600",
            bgcolor: PRIMARY_PINK,
            borderRadius: 3,
            "&:hover": { bgcolor: HOVER_PINK },
          }}
        >
          {loading ? "Procesando Pago..." : "Unirme a Floreciendo Juntas"}
        </Button>
      ) : (
        <Link to='/iniciar-sesion'>
          <Button
            variant='contained'
            fullWidth
            sx={{
              mt: 1,
              py: 1.4,
              fontSize: "1rem",
              fontWeight: "600",
              bgcolor: PRIMARY_PINK,
              borderRadius: 3,
              "&:hover": { bgcolor: HOVER_PINK },
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
