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
} from "@mui/material";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import svg from "../../assets/svg/undraw_secure-login_m11a.svg";
import AuthContext from "../../context/Auth/AuthContext";
import { useContext } from "react";
import { Formik, Form } from "formik";
import CartContext from "../../context/Cart/CartContext";
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
  const handleLogin = async (credentials) => {
    await iniciarSesion(credentials); // espera a que el token esté listo
    // Ahora sincronizamos guest cart (si existe)
    try {
      await syncGuestToServer();
    } catch (e) {
      console.error("No se pudo sincronizar el carrito", e);
    }
    // Finalmente, recargamos carrito desde servidor para asegurar consistencia
    await getUserCart();
  };
  return (
    <Layout>
      <Box
        sx={{
          minHeight: "100vh",
          // Fondo con un degradado sutil y un brillo radial
          background: "linear-gradient(135deg, #FFF0F0 0%, #ED9FBC 150%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ========================================================= */}
        {/* ELEMENTOS DECORATIVOS DE FONDO            */}
        {/* ========================================================= */}

        {/* Gran Círculo Exterior (Rosa Oscuro, Baja Opacidad) */}
        <Box
          sx={{
            position: "absolute",
            // Ajuste de posición para móviles
            top: { xs: "-100px", md: "-15%" },
            left: { xs: "-100px", md: "-10%" },
            // Ajuste de tamaño para móviles
            width: { xs: 400, md: 800 },
            height: { xs: 400, md: 800 },
            borderRadius: "50%",
            border: "4px solid #D82E7A",
            // Baja opacidad en móviles
            opacity: { xs: 0.1, md: 0.15 },
            zIndex: 0,
          }}
        />
        {/* Círculo Intermedio (Rosa Vivo) */}
        <Box
          sx={{
            position: "absolute",
            top: { xs: "50%", md: "-5%" },
            right: { xs: "0", md: "unset" },
            left: { xs: "unset", md: "5%" },
            transform: { xs: "translateY(-50%)", md: "none" },
            width: { xs: 300, md: 600 },
            height: { xs: 300, md: 600 },
            borderRadius: "50%",
            backgroundColor: "#FF69B4",
            opacity: { xs: 0.05, md: 0.08 },
            zIndex: 0,
          }}
        />
        {/* Cuadrado Pequeño Rotado (Esquina Inferior Derecha) */}
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
        {/* Puntos de detalle (Rosa Claro) */}
        <Box
          sx={{
            position: "absolute",
            bottom: { xs: "20px", md: "15%" },
            left: { xs: "20px", md: "5%" },
            width: { xs: "10px", md: "20px" },
            height: { xs: "10px", md: "20px" },
            borderRadius: "50%",
            backgroundColor: "#FFC0CB",
            opacity: 0.6,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: { xs: "10px", md: "10%" },
            left: { xs: "30px", md: "4%" },
            width: { xs: "5px", md: "10px" },
            height: { xs: "5px", md: "10px" },
            borderRadius: "50%",
            backgroundColor: "#FFC0CB",
            opacity: 0.8,
          }}
        />

        {/* ========================================================= */}
        {/* CONTENEDOR PRINCIPAL                   */}
        {/* ========================================================= */}
        <Grid
          container
          justifyContent='center'
          alignItems='center'
          sx={{
            minHeight: "100vh",
            padding: { xs: 2, sm: 4, md: 6 },
            position: "relative",
            mt: { xs: 12, md: 2 },
            zIndex: 1, // Asegura que el contenido esté sobre los decorativos
          }}
        >
          <Grid
            size={{ xs: 12, md: 10, lg: 6 }}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Paper
              elevation={12}
              sx={{
                padding: { xs: "30px", sm: "40px", md: "50px" },
                borderRadius: "30px",
                width: "100%",
                // Glassmorphism Pink
                background: "rgba(255, 255, 255, 0.06)",
                backdropFilter: "blur(5.5px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "6px",
                  // background:
                  //   "linear-gradient(90deg, #ff69b4, #ff1493, #d82e7a)",
                },
              }}
            >
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={LoginSchema}
                onSubmit={handleLogin} // 🔥 AQUÍ VA TU LÓGICA COMPLETA
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
                        textFillColor: "transparent",
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
                          type='email'
                          fullWidth
                          name='email'
                          placeholder='ejemplo@email.com'
                          autoComplete='off'
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.email && Boolean(errors.email)}
                          helperText={touched.email && errors.email}
                          variant='outlined'
                          sx={inputStyles}
                        />
                      </Grid>

                      <Grid size={12}>
                        <TextField
                          placeholder='Contraseña'
                          label='Contraseña'
                          type='password'
                          variant='outlined'
                          fullWidth
                          autoComplete='off'
                          name='password'
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.password && Boolean(errors.password)}
                          helperText={touched.password && errors.password}
                          sx={inputStyles}
                        />
                      </Grid>

                      <Grid size={12} sx={{ textAlign: "right" }}>
                        <Link
                          to={"/recuperar-contraseña"}
                          style={{ textDecoration: "none" }}
                        >
                          <Typography
                            variant='body2'
                            sx={{
                              color: "#D82E7A",
                              fontWeight: "600",
                              transition: "color 0.3s ease",
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
                          sx={{
                            borderRadius: "18px",
                            background:
                              "linear-gradient(135deg, #ff69b4, #d82e7a)",
                            boxShadow: "0 10px 25px rgba(216,46,136,0.4)",
                            fontWeight: "bold",
                            py: 2,
                            fontSize: "18px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "translateY(-3px)",
                              boxShadow: "0 15px 30px rgba(216,46,136,0.5)",
                              background:
                                "linear-gradient(135deg, #ff59a4, #c8256a)",
                            },
                            "&:active": {
                              transform: "translateY(0)",
                            },
                          }}
                        >
                          Iniciar sesión
                        </Button>
                      </Grid>

                      <Grid size={12}>
                        <Divider sx={{ my: 2 }}>
                          <Chip
                            sx={{
                              bgcolor: "transparent",
                              color: "#D82E7A",
                              border: "1px solid #D82E7A",
                              fontWeight: "500",
                              fontSize: "14px",
                            }}
                            label='¿Aún no eres parte?'
                          />
                        </Divider>
                      </Grid>

                      <Grid size={12}>
                        <Link
                          to={"/registro"}
                          style={{ textDecoration: "none" }}
                        >
                          <Button
                            variant='outlined'
                            size='large'
                            fullWidth
                            sx={{
                              borderRadius: "18px",
                              borderColor: "#D82E7A",
                              borderWidth: "2px",
                              color: "#D82E7A",
                              fontWeight: "bold",
                              py: 2,
                              fontSize: "18px",
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                              transition: "all 0.3s ease",
                              "&:hover": {
                                borderColor: "#bf2369",
                                color: "#bf2369",
                                bgcolor: "rgba(216, 46, 122, 0.08)",
                                transform: "translateY(-3px)",
                                boxShadow: "0 8px 20px rgba(216,46,136,0.2)",
                              },
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
