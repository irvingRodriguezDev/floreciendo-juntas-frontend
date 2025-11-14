import React, { useContext } from "react";
import Layout from "../Layout/Layout";
import {
  Button,
  FormControl,
  Grid,
  Paper,
  TextField,
  Typography,
  Divider,
  Chip,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import AuthContext from "../../context/Auth/AuthContext";
import svg from "../../assets/svg/undraw_access-account_aydp.svg";
import CartContext from "../../context/Cart/CartContext";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es requerido"),
  phone: Yup.string().required("El teléfono es requerido"),
  email: Yup.string()
    .email("Correo inválido")
    .required("El correo es obligatorio"),
  password: Yup.string()
    .min(6, "Mínimo 6 caracteres")
    .required("La contraseña es obligatoria"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Las contraseñas deben coincidir")
    .required("Confirma la contraseña"),
});

const inputStyles = {
  mb: 2,
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    "& fieldset": { borderColor: "rgba(216,46,136,0.3)" },
    "&:hover fieldset": { borderColor: "#D82E7A" },
    "&.Mui-focused fieldset": { borderColor: "#D82E7A" },
  },
  "& .MuiInputBase-input": { color: "black" },
  "& .MuiInputLabel-root": { color: "#D82E7A" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#D82E7A" },
};

const Register = () => {
  const { registerUser } = useContext(AuthContext);
  const { syncGuestToServer, getUserCart } = useContext(CartContext);
  const handleRegister = async (credentials) => {
    await registerUser(credentials); // espera a que el token esté listo
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
          background: "linear-gradient(135deg, #fce4ec 0%, #f8bbd9 100%)",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.4) 0%, transparent 50%)",
          },
        }}
      >
        {/* ========================================================= */}
        {/* ELEMENTOS DECORATIVOS DE FONDO (Iguales al Login)            */}
        {/* ========================================================= */}

        {/* Gran Círculo Superior (Rosa Oscuro, Baja Opacidad) */}
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
            borderRadius: "8px",
          }}
        />

        {/* ========================================================= */}
        {/* CONTENEDOR PRINCIPAL Y FORMULARIO (Centrado)            */}
        {/* ========================================================= */}
        <Grid
          container
          justifyContent='center'
          alignItems='center'
          sx={{
            minHeight: "100vh",
            padding: { xs: 2, sm: 4, md: 6 },
            position: "relative",
            zIndex: 1,
            mt: { xs: 15, md: 8 },
          }}
        >
          {/* Formulario */}
          <Grid
            item
            size={{ xs: 12, sm: 10, md: 8, lg: 6 }}
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
                },
              }}
            >
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  password: "",
                  password_confirmation: "",
                  phone: "",
                }}
                validationSchema={RegisterSchema}
                onSubmit={(values) => handleRegister(values)}
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
                      ¡Únete a la comunidad!
                    </Typography>

                    <Grid container spacing={3}>
                      {/* Nombre */}
                      <Grid size={12}>
                        <FormControl fullWidth>
                          <TextField
                            label='Nombre completo'
                            name='name'
                            placeholder='Nombre y Apellido'
                            autoComplete='off'
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.name && Boolean(errors.name)}
                            helperText={touched.name && errors.name}
                            variant='outlined'
                            sx={inputStyles}
                          />
                        </FormControl>
                      </Grid>

                      {/* Correo */}
                      <Grid size={{ xs: 12, lg: 6 }}>
                        <FormControl fullWidth>
                          <TextField
                            label='Correo Electrónico'
                            type='email'
                            name='email'
                            autoComplete='off'
                            placeholder='tu.correo@ejemplo.com'
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            variant='outlined'
                            sx={inputStyles}
                          />
                        </FormControl>
                      </Grid>

                      {/* Teléfono */}
                      <Grid size={{ xs: 12, lg: 6 }}>
                        <FormControl fullWidth>
                          <TextField
                            label='Teléfono'
                            name='phone'
                            autoComplete='off'
                            placeholder='Ej: 722 123 4567'
                            value={values.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.phone && Boolean(errors.phone)}
                            helperText={touched.phone && errors.phone}
                            variant='outlined'
                            sx={inputStyles}
                          />
                        </FormControl>
                      </Grid>
                      {/* Contraseña */}
                      <Grid size={{ xs: 12, lg: 6 }}>
                        <FormControl fullWidth>
                          <TextField
                            label='Contraseña'
                            type='password'
                            name='password'
                            autoComplete='off'
                            placeholder='**********'
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.password && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            variant='outlined'
                            sx={inputStyles}
                          />
                        </FormControl>
                      </Grid>

                      {/* Confirmación */}
                      <Grid size={{ xs: 12, lg: 6 }}>
                        <FormControl fullWidth>
                          <TextField
                            label='Confirma tu contraseña'
                            type='password'
                            autoComplete='off'
                            name='password_confirmation'
                            placeholder='**********'
                            value={values.password_confirmation}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched.password_confirmation &&
                              Boolean(errors.password_confirmation)
                            }
                            helperText={
                              touched.password_confirmation &&
                              errors.password_confirmation
                            }
                            variant='outlined'
                            sx={inputStyles}
                          />
                        </FormControl>
                      </Grid>

                      {/* Botón Registrarse */}
                      <Grid size={12}>
                        <Button
                          variant='contained'
                          fullWidth
                          type='submit'
                          size='large'
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
                          Registrarme
                        </Button>
                      </Grid>

                      {/* Divider */}
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
                            label='¿Ya eres parte de la comunidad?'
                          />
                        </Divider>
                      </Grid>

                      {/* Link a login */}
                      <Grid size={12}>
                        <Link
                          to='/iniciar-sesion'
                          style={{ textDecoration: "none" }}
                        >
                          <Button
                            variant='outlined'
                            fullWidth
                            size='large'
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
                            Iniciar sesión
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

export default Register;
