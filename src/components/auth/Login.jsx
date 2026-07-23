import { useContext, useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import {
  Button,
  Chip,
  Divider,
  Grid, // Compatible con MUI v6 / Grid v2
  Paper,
  TextField,
  Typography,
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff, LockOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import AuthContext from "../../context/Auth/AuthContext";
import { Formik, Form } from "formik";
import CartContext from "../../context/Cart/CartContext";
import Swal from "sweetalert2";
import { useCaptcha } from "../../hooks/useCaptcha";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Correo electrónico inválido")
    .required("El correo es obligatorio"),
  password: Yup.string()
    .min(6, "Mínimo 6 caracteres")
    .required("La contraseña es obligatoria"),
});

// Estilos limpios y de alto contraste para las cajas de texto
const inputStyles = {
  mb: 1,
  "& .MuiOutlinedInput-root": {
    borderRadius: "16px",
    backgroundColor: "#FFFFFF", // Fondo blanco sólido para lectura perfecta
    transition: "all 0.2s ease-in-out",
    "& fieldset": {
      borderColor: "#FCE7F3",
      borderWidth: "1.5px",
    },
    "&:hover fieldset": {
      borderColor: "#E53888",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#E53888",
      boxShadow: "0 0 0 4px rgba(229, 56, 136, 0.15)",
    },
  },
  "& .MuiInputBase-input": {
    color: "#1F2937",
    padding: "16px 18px",
    fontSize: "15px",
    fontWeight: "500",
  },
  "& .MuiInputLabel-root": {
    color: "#6B7280",
    fontSize: "15px",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#E53888",
    fontWeight: "700",
  },
  "& .MuiFormHelperText-root": {
    fontSize: "13px",
    marginLeft: "6px",
  },
};

const Login = () => {
  const { iniciarSesion } = useContext(AuthContext);
  const { getCaptchaToken } = useCaptcha();
  const { syncGuestToServer, getUserCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  useEffect(() => {
    const reason = sessionStorage.getItem("session_expired_reason");

    if (reason === "multiple_session") {
      Swal.fire({
        icon: "warning",
        title: "Sesión cerrada",
        text: "Tu sesión se cerró porque iniciaste sesión en otro dispositivo.",
        confirmButtonColor: "#E53888",
        allowOutsideClick: false,
      }).then(() => {
        sessionStorage.removeItem("session_expired_reason");
      });
    } else if (reason === "expired") {
      sessionStorage.removeItem("session_expired_reason");
    }
  }, []);

  const handleLogin = async (credentials) => {
    setLoading(true);
    try {
      const token = await getCaptchaToken("login");
      await iniciarSesion(credentials, token);

      try {
        await syncGuestToServer();
        await getUserCart();
      } catch (cartError) {
        console.error("Error al sincronizar carrito:", cartError);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al ingresar",
        text:
          error.response?.data?.msg ||
          "Credenciales incorrectas o problema de conexión.",
        confirmButtonColor: "#E53888",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #FFF0F5 0%, #FCE7F3 100%)",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: { xs: 6, md: 8 },
        }}
      >
        {/* ELEMENTOS DECORATIVOS ORGÁNICOS */}
        <Box
          sx={{
            position: "absolute",
            top: { xs: "-80px", md: "-10%" },
            left: { xs: "-80px", md: "-5%" },
            width: { xs: 300, md: 600 },
            height: { xs: 300, md: 600 },
            borderRadius: "50%",
            border: "2px solid #F472B6",
            opacity: 0.15,
            pointerEvents: "none",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: { xs: "5%", md: "8%" },
            right: { xs: "5%", md: "8%" },
            width: { xs: 50, md: 90 },
            height: { xs: 50, md: 90 },
            backgroundColor: "#E53888",
            transform: "rotate(45deg)",
            opacity: 0.08,
            borderRadius: "20px",
            pointerEvents: "none",
          }}
        />

        <Grid
          container
          justifyContent='center'
          alignItems='center'
          sx={{
            width: "100%",
            maxWidth: "1200px",
            px: { xs: 2, sm: 3 },
            zIndex: 1,
          }}
        >
          <Grid size={{ xs: 12, sm: 10, md: 6, lg: 5 }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3.5, sm: 5 },
                borderRadius: "32px",
                width: "100%",
                backgroundColor: "rgba(255, 255, 255, 0.92)",
                backdropFilter: "blur(16px)",
                border: "1px solid #FCE7F3",
                boxShadow: "0 20px 50px rgba(229, 56, 136, 0.08)",
                textAlign: "center",
              }}
            >
              {/* ÍCONO SUPERIOR */}
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: "20px",
                  backgroundColor: "#FFF5F7",
                  color: "#E53888",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 2,
                }}
              >
                <LockOutlined sx={{ fontSize: 28 }} />
              </Box>

              <Typography
                variant='h4'
                component='h1'
                fontWeight='900'
                sx={{
                  color: "#1F2937",
                  fontSize: { xs: "26px", sm: "30px" },
                  mb: 0.5,
                }}
              >
                ¡Hola de nuevo! 🌷
              </Typography>

              <Typography
                variant='body2'
                sx={{ color: "#6B7280", mb: 3.5, fontSize: "0.92rem" }}
              >
                Ingresa tus datos para acceder a la comunidad
              </Typography>

              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={LoginSchema}
                onSubmit={handleLogin}
              >
                {({ values, errors, touched, handleChange, handleBlur }) => (
                  <Form>
                    <Grid container spacing={2}>
                      <Grid size={12}>
                        <TextField
                          label='Correo Electrónico'
                          fullWidth
                          name='email'
                          autoComplete='off'
                          placeholder='tu@correo.com'
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.email && Boolean(errors.email)}
                          helperText={touched.email && errors.email}
                          sx={inputStyles}
                          disabled={loading}
                        />
                      </Grid>

                      <Grid size={12}>
                        <TextField
                          label='Contraseña'
                          type={showPassword ? "text" : "password"}
                          fullWidth
                          name='password'
                          autoComplete='off'
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.password && Boolean(errors.password)}
                          helperText={touched.password && errors.password}
                          sx={inputStyles}
                          disabled={loading}
                          slotProps={{
                            input: {
                              endAdornment: (
                                <InputAdornment position='end'>
                                  <IconButton
                                    aria-label='Mostrar/Ocultar contraseña'
                                    onClick={handleClickShowPassword}
                                    onMouseDown={(e) => e.preventDefault()}
                                    edge='end'
                                    sx={{ color: "#9CA3AF" }}
                                  >
                                    {showPassword ? (
                                      <VisibilityOff />
                                    ) : (
                                      <Visibility />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            },
                          }}
                        />
                      </Grid>

                      <Grid size={12} sx={{ textAlign: "right", mb: 1 }}>
                        <Link
                          to='/recuperar-contraseña'
                          style={{ textDecoration: "none" }}
                        >
                          <Typography
                            variant='caption'
                            sx={{
                              color: "#E53888",
                              fontWeight: "700",
                              fontSize: "13px",
                              "&:hover": { textDecoration: "underline" },
                            }}
                          >
                            ¿Olvidaste tu contraseña?
                          </Typography>
                        </Link>
                      </Grid>

                      <Grid size={12}>
                        <Button
                          variant='contained'
                          size='large'
                          fullWidth
                          type='submit'
                          disabled={loading}
                          sx={{
                            borderRadius: "50px",
                            backgroundColor: "#E53888",
                            color: "#FFFFFF",
                            fontWeight: "800",
                            py: 1.6,
                            fontSize: "16px",
                            textTransform: "none",
                            boxShadow: "0 8px 20px rgba(229, 56, 136, 0.25)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              backgroundColor: "#C2256F",
                              transform: "translateY(-1px)",
                            },
                          }}
                        >
                          {loading ? (
                            <CircularProgress size={24} color='inherit' />
                          ) : (
                            "Iniciar Sesión"
                          )}
                        </Button>
                      </Grid>

                      <Grid size={12}>
                        <Divider sx={{ my: 2 }}>
                          <Chip
                            sx={{
                              color: "#6B7280",
                              borderColor: "#F3F4F6",
                              backgroundColor: "#FFFFFF",
                              fontSize: "12px",
                              fontWeight: "600",
                            }}
                            label='¿Aún no eres parte?'
                          />
                        </Divider>
                      </Grid>

                      <Grid size={12}>
                        {/* Redirección directa al checkout de $200/mes */}
                        <Link
                          to='/suscribirme'
                          style={{ textDecoration: "none" }}
                        >
                          <Button
                            variant='outlined'
                            size='large'
                            fullWidth
                            sx={{
                              borderRadius: "50px",
                              borderColor: "#FCE7F3",
                              color: "#E53888",
                              backgroundColor: "#FFF5F7",
                              py: 1.4,
                              fontWeight: "700",
                              fontSize: "14px",
                              textTransform: "none",
                              "&:hover": {
                                backgroundColor: "#FCE7F3",
                                borderColor: "#F472B6",
                              },
                            }}
                          >
                            Unirme a la Comunidad ($200/mes)
                          </Button>
                        </Link>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Login;
