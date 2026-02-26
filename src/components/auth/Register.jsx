import React, { useContext, useState } from "react";
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
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import AuthContext from "../../context/Auth/AuthContext";
import CartContext from "../../context/Cart/CartContext";
import Swal from "sweetalert2";

// Esquema de validación optimizado
const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es requerido"),
  username: Yup.string().required(
    "El nombre para tus reconocimientos es requerido",
  ),
  phone: Yup.string()
    .required("El teléfono es requerido")
    .matches(
      /^[0-9]{10}$/,
      "El teléfono debe tener exactamente 10 dígitos numéricos",
    ),
  email: Yup.string()
    .email("Correo inválido")
    .required("El correo es obligatorio")
    .trim(), // Evita espacios accidentales
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
  const [loading, setLoading] = useState(false);

  const handleRegister = async (credentials) => {
    setLoading(true);
    try {
      await registerUser(credentials);

      // Sincronización de carrito post-registro
      try {
        await syncGuestToServer();
        await getUserCart();
      } catch (cartError) {
        console.error("Error al sincronizar carrito:", cartError);
      }

      Swal.fire({
        icon: "success",
        title: "¡Bienvenida!",
        text: "Tu cuenta ha sido creada correctamente.",
        confirmButtonColor: "#D82E7A",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al registrarse",
        text:
          error.response?.data?.msg ||
          "Ocurrió un problema con el registro. Inténtalo de nuevo.",
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
        {/* ELEMENTOS DECORATIVOS */}
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
            top: { xs: "50%", md: "-5%" },
            left: { xs: "unset", md: "5%" },
            width: { xs: 300, md: 600 },
            height: { xs: 300, md: 600 },
            borderRadius: "50%",
            backgroundColor: "#FF69B4",
            opacity: { xs: 0.05, md: 0.08 },
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
            borderRadius: "8px",
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
            zIndex: 1,
            mt: { xs: 15, md: 8 },
          }}
        >
          <Grid
            size={{ xs: 12, sm: 10, md: 8, lg: 6 }}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Paper
              elevation={12}
              sx={{
                padding: { xs: "30px", sm: "40px", md: "50px" },
                borderRadius: "30px",
                width: "100%",
                background: "rgba(255, 255, 255, 0.7)",
                backdropFilter: "blur(5.5px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Formik
                initialValues={{
                  name: "",
                  username: "",
                  email: "",
                  password: "",
                  password_confirmation: "",
                  phone: "",
                }}
                validationSchema={RegisterSchema}
                onSubmit={handleRegister}
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
                        fontSize: { xs: "30px", sm: "42px" },
                      }}
                    >
                      ¡Únete a la comunidad!
                    </Typography>

                    <Grid container spacing={2}>
                      <Grid size={12}>
                        <TextField
                          label='Nombre completo'
                          name='name'
                          fullWidth
                          autoComplete='off'
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.name && Boolean(errors.name)}
                          helperText={touched.name && errors.name}
                          sx={inputStyles}
                          disabled={loading}
                        />
                      </Grid>

                      <Grid size={12}>
                        <TextField
                          label='Nombre para reconocimientos'
                          name='username'
                          fullWidth
                          autoComplete='off'
                          value={values.username}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.username && Boolean(errors.username)}
                          helperText={touched.username && errors.username}
                          sx={inputStyles}
                          disabled={loading}
                        />
                      </Grid>

                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                          label='Correo Electrónico'
                          type='email'
                          name='email'
                          fullWidth
                          autoComplete='off'
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.email && Boolean(errors.email)}
                          helperText={touched.email && errors.email}
                          sx={inputStyles}
                          disabled={loading}
                        />
                      </Grid>

                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                          label='Teléfono (10 dígitos)'
                          name='phone'
                          fullWidth
                          autoComplete='off'
                          value={values.phone}
                          onChange={(e) => {
                            // Solo permite números y máximo 10 caracteres
                            const val = e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 10);
                            handleChange({
                              target: { name: "phone", value: val },
                            });
                          }}
                          onBlur={handleBlur}
                          error={touched.phone && Boolean(errors.phone)}
                          helperText={touched.phone && errors.phone}
                          sx={inputStyles}
                          disabled={loading}
                        />
                      </Grid>

                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                          label='Contraseña'
                          type='password'
                          name='password'
                          fullWidth
                          autoComplete='off'
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.password && Boolean(errors.password)}
                          helperText={touched.password && errors.password}
                          sx={inputStyles}
                          disabled={loading}
                        />
                      </Grid>

                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                          label='Confirmar Contraseña'
                          type='password'
                          name='password_confirmation'
                          fullWidth
                          autoComplete='off'
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
                          sx={inputStyles}
                          disabled={loading}
                        />
                      </Grid>

                      <Grid size={12}>
                        <Button
                          variant='contained'
                          fullWidth
                          type='submit'
                          size='large'
                          disabled={loading}
                          sx={{
                            borderRadius: "18px",
                            background:
                              "linear-gradient(135deg, #ff69b4, #d82e7a)",
                            boxShadow: "0 10px 25px rgba(216,46,136,0.4)",
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
                            "Registrarme"
                          )}
                        </Button>
                      </Grid>

                      <Grid size={12}>
                        <Divider sx={{ my: 1 }}>
                          <Chip
                            sx={{
                              color: "#D82E7A",
                              border: "1px solid #D82E7A",
                            }}
                            label='¿Ya eres parte?'
                          />
                        </Divider>
                      </Grid>

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
                              color: "#D82E7A",
                              fontWeight: "bold",
                              py: 2,
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
