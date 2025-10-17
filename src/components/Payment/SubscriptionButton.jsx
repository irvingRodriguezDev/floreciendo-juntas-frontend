import { useContext, useState } from "react";
import {
  Button,
  Box,
  Typography,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { useStripe } from "@stripe/react-stripe-js";
import { MethodPost } from "../../config/Service";
import AuthContext from "../../context/Auth/AuthContext";
import { Link } from "react-router-dom";
// Colores de acento
const PRIMARY_PINK = "#E53888";
const HOVER_PINK = "#D1789C";

const PRICE_ONETIME = import.meta.env.VITE_STRIPE_PRICE_ONETIME;
const PRICE_RECURRING = import.meta.env.VITE_STRIPE_PRICE_RECURRING;
const URL = import.meta.env.VITE_API_BASE_URL;

const SubscriptionForm = ({ userId }) => {
  const { autenticado } = useContext(AuthContext);
  const stripe = useStripe();
  const [loading, setLoading] = useState(false);
  const [selectedPriceId, setSelectedPriceId] = useState(PRICE_RECURRING);

  const handlePriceChange = (event) => {
    setSelectedPriceId(event.target.value);
  };
  // Asegúrate de que Methodpost se comporta como fetch o que devuelve la promesa de la petición HTTP.
  // Asumo que Methodpost es una función async que devuelve un objeto Response similar a fetch.

  const handleSubscribe = async () => {
    if (!stripe || !selectedPriceId) {
      console.error("Stripe no está cargado o el plan no está seleccionado.");
      return;
    }

    setLoading(true); // Se inicia la carga

    try {
      const data = {
        userId: userId,
        priceId: selectedPriceId, // Usa 'priceId' para coincidir con el backend
      };
      let url = "/payment/create-payment";

      // 1. Esperar la respuesta del backend
      const res = await MethodPost(url, data);

      // --- CORRECCIÓN CLAVE ---
      // 2. Verificar si el request del backend fue exitoso (res.ok)
      if (!res.status === 200) {
        // Asumiendo que res.data contiene detalles de error cuando no es OK
        const backendErrorMessage =
          res.data?.message || res.statusText || "Error desconocido";
        throw new Error(
          `Error al crear la sesión de pago: ${backendErrorMessage}`
        );
      }

      // 3. Obtener la sesión directamente del campo 'data', sin 'await'
      // Ya que MethodPost (asumimos) devuelve el JSON ya parseado en res.data
      const session = res.data;
      // --- FIN CORRECCIÓN CLAVE ---

      // Verificación básica del ID de sesión
      if (!session.id) {
        throw new Error("El backend no devolvió un ID de sesión válido.");
      }
      if (!session.url) {
        // Stripe ahora devuelve la URL de redirección en el objeto de la sesión.
        throw new Error(
          "El backend no devolvió una URL de sesión válida para la redirección."
        );
      }

      // 4. Redireccionar al usuario a Stripe Checkout
      window.location.href = session.url;
      // Este bloque solo se ejecuta si la redirección falla (ej. error de red)
      if (result.error) {
        console.error("Error de redirección:", result.error.message);
      }
    } catch (error) {
      // Captura cualquier error lanzado en el try block
      console.error("Error en la suscripción:", error.message);
    } finally {
      // Se ejecuta después de todo el flujo (éxito o fracaso)
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
          control={
            <Radio
              sx={{
                color: PRIMARY_PINK, // Color cuando NO está seleccionado
                "&.Mui-checked": {
                  color: PRIMARY_PINK, // Color cuando SÍ está seleccionado
                },
              }}
            />
          }
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
          control={
            <Radio
              sx={{
                color: PRIMARY_PINK, // Color cuando NO está seleccionado
                "&.Mui-checked": {
                  color: PRIMARY_PINK, // Color cuando SÍ está seleccionado
                },
              }}
            />
          }
          label={
            <Box>
              <Typography fontWeight='bold'>
                Pago Único (Acceso por 1 mes)
              </Typography>
              <Typography variant='caption'>
                Un solo pago, acceso total por un periodo de 30 dias.
              </Typography>
            </Box>
          }
        />
      </RadioGroup>

      {/* Botón de Suscripción */}
      {autenticado ? (
        <Button
          variant='contained'
          fullWidth
          onClick={handleSubscribe}
          disabled={loading || !selectedPriceId}
          sx={{ bgcolor: PRIMARY_PINK, "&:hover": { bgcolor: HOVER_PINK } }}
        >
          {loading ? "Procesando Pago..." : "Continuar con el Pago"}
        </Button>
      ) : (
        <Link to={"/iniciar-sesion"}>
          <Button
            variant='contained'
            fullWidth
            sx={{ bgcolor: PRIMARY_PINK, "&:hover": { bgcolor: HOVER_PINK } }}
          >
            Inicia sesión para suscribirte
          </Button>
        </Link>
      )}

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
