import { useContext, useEffect, useState } from "react"; // 👈 useState añadido
import Layout from "../Layout/Layout";
import {
  Button,
  Chip,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
  Box,
  CircularProgress, // 👈 Añadido para feedback visual
} from "@mui/material";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import AuthContext from "../../context/Auth/AuthContext";
import { Formik, Form } from "formik";
import CartContext from "../../context/Cart/CartContext";
import Swal from "sweetalert2";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Correo inválido")
    .required("El correo es obligatorio"),
  password: Yup.string()
    .min(6, "Mínimo 6 caracteres")
    .required("La contraseña es obligatoria"),
});

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

const Login = () => {
  const { iniciarSesion } = useContext(AuthContext);
  const { syncGuestToServer, getUserCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false); // 👈 Estado de carga

  useEffect(() => {
    const reason = sessionStorage.getItem("session_expired_reason");

    if (reason === "multiple_session") {
      Swal.fire({
        icon: "warning",
        title: "Sesión cerrada",
        text: "Tu sesión se cerró porque iniciaste sesión en otro dispositivo.",
        confirmButtonColor: "#D82E7A", // Color acorde a tu marca
        allowOutsideClick: false,
      }).then(() => {
        sessionStorage.removeItem("session_expired_reason");
      });
    } else if (reason === "expired") {
      // Opcional: Manejar expiración normal de JWT
      sessionStorage.removeItem("session_expired_reason");
    }
  }, []);

  const handleLogin = async (credentials) => {
    setLoading(true);
    try {
      await iniciarSesion(credentials);

      // Sincronización post-login
      try {
        await syncGuestToServer();
        await getUserCart();
      } catch (cartError) {
        console.error("Error al sincronizar carrito:", cartError);
      }
    } catch (error) {
      // Manejo de errores de autenticación
      Swal.fire({
        icon: "error",
        title: "Error al ingresar",
        text:
          error.response?.data?.msg ||
          "Credenciales incorrectas o problema de conexión.",
        confirmButtonColor: "#D82E7A",
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
          background: "linear-gradient(135deg, #FFF0F0 0%, #ED9FBC 150%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ELEMENTOS DECORATIVOS (Mantener igual que tu original) */}
        <Box
          sx={{
            position: "absolute",
            top: { xs: "-100px", md: "-15%" },
            left: { xs: "-100px", md: "-10%" },
            width: { xs: 400, md: 800 },
            height: { xs: 400, md: 800 },
            borderRadius: "50%",
            border: "4px solid #D82E7A",
            opacity: { xs: 0.1, md: 0.15 },
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: { xs: "5%", md: "10%" },
            right: { xs: "5%", md: "10%" },
            width: { xs: 40, md: 80 },
            height: { xs: 40, md: 80 },
            backgroundColor: "#D82E7A",
            transform: "rotate(45deg)",
            opacity: { xs: 0.2, md: 0.3 },
            zIndex: 0,
            borderRadius: "12px",
          }}
        />

        <Grid
          container
          justifyContent='center'
          alignItems='center'
          sx={{
            minHeight: "100vh",
            padding: { xs: 2, sm: 4, md: 6 },
            position: "relative",
            mt: { xs: 12, md: 2 },
            zIndex: 1,
          }}
        >
          <Grid
            size={{
              xs: 12,
              md: 10,
              lg: 6,
            }}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Paper
              elevation={12}
              sx={{
                padding: { xs: "30px", sm: "40px", md: "50px" },
                borderRadius: "30px",
                width: "100%",
                background: "rgba(255, 255, 255, 0.06)",
                backdropFilter: "blur(5.5px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={LoginSchema}
                onSubmit={handleLogin}
              >
                {({ values, errors, touched, handleChange, handleBlur }) => (
                  <Form>
                    <Typography
                      variant='h3'
                      textAlign='center'
                      fontWeight='bold'
                      mb={4}
                      sx={{
                        background: "linear-gradient(135deg, #ff69b4, #d82e7a)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontSize: { xs: "36px", sm: "42px" },
                      }}
                    >
                      Bienvenid@ de nuevo
                    </Typography>

                    <Grid container spacing={3}>
                      <Grid size={12}>
                        <TextField
                          label='Correo Electrónico'
                          fullWidth
                          name='email'
                          placeholder='ejemplo@email.com'
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.email && Boolean(errors.email)}
                          helperText={touched.email && errors.email}
                          sx={inputStyles}
                          disabled={loading} // 👈 Deshabilitar si carga
                        />
                      </Grid>

                      <Grid size={12}>
                        <TextField
                          label='Contraseña'
                          type='password'
                          fullWidth
                          name='password'
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.password && Boolean(errors.password)}
                          helperText={touched.password && errors.password}
                          sx={inputStyles}
                          disabled={loading} // 👈 Deshabilitar si carga
                        />
                      </Grid>

                      <Grid size={12} sx={{ textAlign: "right" }}>
                        <Link
                          to='/recuperar-contraseña'
                          style={{ textDecoration: "none" }}
                        >
                          <Typography
                            variant='body2'
                            sx={{
                              color: "#D82E7A",
                              fontWeight: "600",
                              "&:hover": { color: "#FF69B4" },
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
                          disabled={loading} // 👈 Evitar doble envío
                          sx={{
                            borderRadius: "18px",
                            background:
                              "linear-gradient(135deg, #ff69b4, #d82e7a)",
                            fontWeight: "bold",
                            py: 2,
                            fontSize: "18px",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "translateY(-3px)",
                              boxShadow: "0 15px 30px rgba(216,46,136,0.5)",
                            },
                          }}
                        >
                          {loading ? (
                            <CircularProgress size={26} color='inherit' />
                          ) : (
                            "Iniciar sesión"
                          )}
                        </Button>
                      </Grid>

                      <Grid size={12}>
                        <Divider sx={{ my: 2 }}>
                          <Chip
                            sx={{
                              color: "#D82E7A",
                              border: "1px solid #D82E7A",
                            }}
                            label='¿Aún no eres parte?'
                          />
                        </Divider>
                      </Grid>

                      <Grid size={12}>
                        <Link to='/registro' style={{ textDecoration: "none" }}>
                          <Button
                            variant='outlined'
                            size='large'
                            fullWidth
                            sx={{
                              borderRadius: "18px",
                              borderColor: "#D82E7A",
                              color: "#D82E7A",
                              py: 2,
                              fontWeight: "bold",
                            }}
                          >
                            Crear cuenta
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
