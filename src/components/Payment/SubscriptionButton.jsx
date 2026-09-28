import { useContext, useState } from "react";
import {
  Button,
  Box,
  Typography,
  Radio,
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
  Grid,
} from "@mui/material";
import { Visibility, VisibilityOff, WhatsApp } from "@mui/icons-material";
import { MethodPost } from "../../config/Service";
import AuthContext from "../../context/Auth/AuthContext";
import Swal from "sweetalert2";
import { useCaptcha } from "../../hooks/useCaptcha";

// 🎀 Paleta Premium Femenina & Quiet Luxury
const BRAND = {
  accentPlum: "#2A1B24",
  champagneGold: "#B82C67",
  roseVelvet: "#B82C67",
  roseSoft: "#FFF0F5",
  textMuted: "#7A6E75",
};
const inputStyles = {
  mb: 2,
  "& .MuiOutlinedInput-root": {
    borderRadius: "16px",
    "& fieldset": {
      borderColor: "rgba(216,46,136,0.3)",
      borderWidth: "2px",
    },
    "&:hover fieldset": {
      borderColor: "#D82E7A",
      boxShadow: "0 0 0 4px rgba(216,46,136,0.1)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#D82E7A",
      boxShadow: "0 0 0 4px rgba(216,46,136,0.2)",
    },
  },
  "& .MuiInputBase-input": {
    color: "#333",
    padding: "16px 20px",
    fontSize: "16px",
  },
  "& .MuiInputLabel-root": {
    color: "#D82E7A",
    fontWeight: "500",
    fontSize: "16px",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#D82E7A",
    fontWeight: "600",
  },
  "& .MuiFormHelperText-root": {
    fontSize: "14px",
    marginLeft: "8px",
  },
};

const PRICE_RECURRING = import.meta.env.VITE_STRIPE_PRICE_RECURRING;

const SubscriptionForm = ({ userId }) => {
  const { autenticado, setAuthData, usuario } = useContext(AuthContext);
  const lastPathLocal = localStorage.getItem("lastPath");
  const [lastpath, setLastPath] = useState(lastPathLocal ?? null);
  const [loading, setLoading] = useState(false);
  const [selectedPriceId] = useState(PRICE_RECURRING);

  const [isLoginMode, setIsLoginMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // 📝 Añadimos el campo 'telefono'
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { getCaptchaToken } = useCaptcha();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let activeUserId = userId;
    let userObj = null; // 💡 Guardaremos aquí la info del usuario devuelto

    try {
      if (!autenticado) {
        if (!isLoginMode) {
          // --- MODO REGISTRO CON TELÉFONO ---
          if (
            !formData.name ||
            !formData.email ||
            !formData.phone ||
            !formData.password
          ) {
            Swal.fire({
              title: "Campos incompletos",
              text: "Por favor llena tu nombre, email, WhatsApp y contraseña.",
              icon: "warning",
              timer: 2500,
              showConfirmButton: false,
            });
            setLoading(false);
            return;
          }

          let regRes = null;

          try {
            const tokenCaptcha = await getCaptchaToken("registro");
            regRes = await MethodPost("/auth/register", {
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              password: formData.password,
              tiktokUsername: null,
              captchaToken: tokenCaptcha,
            });
          } catch (regError) {
            // 💡 CAPTURAMOS EL ERROR 400 SI EL CORREO YA EXISTE
            const status = regError.response?.status;
            const msg = regError.response?.data?.msg || regError.message;

            if (
              status === 400 &&
              msg?.includes("El correo ingresado ya esta registrado")
            ) {
              setIsLoginMode(true);
              Swal.fire({
                title: "¡Cuenta detectada!",
                text: "Este correo ya está registrado. Ingresa tu contraseña para continuar.",
                icon: "info",
                confirmButtonColor: BRAND.roseVelvet,
              });
              setLoading(false);
              return;
            }

            throw new Error(msg || "Error al registrar la cuenta.");
          }

          // Si el registro fue exitoso
          if (regRes?.data?.token) {
            localStorage.setItem("token", regRes.data.token);
            if (setAuthData) setAuthData(regRes.data);
          }

          userObj = regRes?.data?.user || regRes?.data?.usuario;
          activeUserId = userObj?.id;
        } else {
          // --- MODO LOGIN ---
          let loginRes = null;
          try {
            loginRes = await MethodPost("/auth/login", {
              email: formData.email,
              password: formData.password,
            });
          } catch (loginError) {
            const msg =
              loginError.response?.data?.msg ||
              "Contraseña o correo incorrectos.";
            throw new Error(msg);
          }

          if (loginRes?.data?.token) {
            localStorage.setItem("token", loginRes.data.token);
            if (setAuthData) setAuthData(loginRes.data);
          }

          userObj = loginRes?.data?.user || loginRes?.data?.usuario;
          activeUserId = userObj?.id;
        }
      } else {
        // 💡 Si YA estaba autenticado desde antes en el contexto
        userObj = usuario; // Asumiendo que obtienes 'usuario' de tu AuthContext
      }

      // -----------------------------------------------------------------
      // 🛑 VALIDACIÓN CLAVE: ¿EL USUARIO YA ESTÁ SUSCRITO?
      // -----------------------------------------------------------------
      const isSubscribed =
        Number(userObj?.isSubscribed) === 1 || userObj?.isSubscribed === true;

      if (isSubscribed) {
        setLoading(false);

        Swal.fire({
          title: "¡Ya estás suscrita! 🌸",
          text: "Tu cuenta cuenta con una suscripción activa. Te redirigiremos al contenido.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          // Rediriges a donde debe ir (cursos, vivos, inicio)
          window.location.href = lastpath !== null ? `${lastpath}` : "/"; // O navigate('/cursos');
        });

        return; // ⛔ FRENO TOTAL: Evita que cree la sesión de pago de Stripe
      }

      // 2. CREACIÓN DE SESIÓN DE PAGO RECURRENTE (Solo si NO está suscrito)
      let payRes = null;
      try {
        payRes = await MethodPost("/payment/create-payment-recurring", {
          userId: activeUserId,
          priceId: selectedPriceId,
        });
      } catch (payError) {
        const msg =
          payError.response?.data?.response?.error ||
          payError.response?.data?.msg ||
          "Error en la pasarela de pagos.";
        throw new Error(msg);
      }

      const session = payRes?.data;
      if (!session?.url) {
        throw new Error("No se logró obtener la URL de pago de Stripe.");
      }

      // Redirección directa al Checkout
      window.location.href = session.url;
    } catch (error) {
      console.error("Error Checkout:", error);
      Swal.fire({
        title: "Error",
        text:
          error.message ||
          "Ocurrió un error inesperado al procesar tu solicitud.",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 460,
        mx: "auto",
        bgcolor: "transparent",
        position: "relative",
      }}
    >
      {/* 🏷️ Precio */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
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

      {/* 🎛️ Plan Recurrente */}
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 2,
            borderRadius: "16px",
            border: `1px solid ${BRAND.champagneGold}`,
            bgcolor: BRAND.roseSoft,
          }}
        >
          <Radio
            checked={true}
            sx={{ p: 0, mr: 1.5, "&.Mui-checked": { color: BRAND.roseVelvet } }}
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
              sx={{ color: BRAND.textMuted, display: "block" }}
            >
              Acceso continuo con cargo automático mensual.
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* 📝 CAMPOS DE REGISTRO / LOGIN (Grid para ahorrar espacio) */}
      {!autenticado && (
        <Box sx={{ mb: 3 }}>
          <Typography
            variant='subtitle2'
            sx={{
              color: BRAND.accentPlum,
              fontWeight: 600,
              mb: 2,
              letterSpacing: "0.05em",
            }}
          >
            {isLoginMode
              ? "🔑 Inicia sesión para continuar"
              : "✨ Datos para tu cuenta y membresía"}
          </Typography>

          <Grid container spacing={1.5}>
            {!isLoginMode && (
              <>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    size='small'
                    label='Nombre Completo'
                    name='name'
                    autoComplete='off'
                    value={formData.name}
                    onChange={handleChange}
                    sx={inputStyles}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    size='small'
                    label='WhatsApp / Teléfono'
                    name='phone'
                    autoComplete='off'
                    placeholder='10 dígitos'
                    value={formData.phone}
                    onChange={handleChange}
                    sx={inputStyles}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <WhatsApp sx={{ fontSize: 18, color: "#25D366" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </>
            )}

            <Grid size={12}>
              <TextField
                fullWidth
                size='small'
                label='Correo Electrónico'
                autoComplete='off'
                name='email'
                type='email'
                value={formData.email}
                onChange={handleChange}
                sx={inputStyles}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                fullWidth
                size='small'
                label='Contraseña'
                name='password'
                autoComplete='off'
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                sx={inputStyles}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge='end'
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <Typography
            onClick={() => setIsLoginMode(!isLoginMode)}
            sx={{
              fontSize: "0.82rem",
              color: BRAND.roseVelvet,
              cursor: "pointer",
              textAlign: "right",
              fontWeight: 500,
              mt: 1.5,
              "&:hover": { textDecoration: "underline" },
            }}
          >
            {isLoginMode
              ? "¿No tienes cuenta? Regístrate aquí"
              : "¿Ya tienes cuenta en Floreciendo Juntas? Inicia sesión"}
          </Typography>
        </Box>
      )}

      {/* 💳 BOTÓN DE PAGO */}
      <Button
        type='submit'
        variant='contained'
        fullWidth
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
            bgcolor: BRAND.accentPlum,
            transform: "translateY(-1px)",
          },
        }}
      >
        {loading ? (
          <CircularProgress size={24} sx={{ color: "#FFF" }} />
        ) : autenticado ? (
          "Adquirir Membresía"
        ) : isLoginMode ? (
          "Iniciar Sesión y Pagar"
        ) : (
          "Crear Cuenta y Pagar $200"
        )}
      </Button>
    </Box>
  );
};

export default SubscriptionForm;
