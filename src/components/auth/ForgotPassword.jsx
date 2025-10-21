import React, { useContext } from "react";
import Layout from "../Layout/Layout";
import {
  Box,
  Button,
  FormControl,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import svg from "../../assets/svg/undraw_forgot-password_nttj.svg";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import AuthContext from "../../context/Auth/AuthContext";
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
const ResetSchema = Yup.object().shape({
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
const ForgotPassword = () => {
  const { resetPassword } = useContext(AuthContext);
  return (
    <Layout>
      <Box
        sx={{
          minHeight: "100vh",
          // Fondo con un degradado sutil
          background: "linear-gradient(135deg, #fffafa 0%, #f8bbd9 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ========================================================= */}
        {/* ELEMENTOS DECORATIVOS DE FONDO (Formas de Pétalo/Cápsula) */}
        {/* ========================================================= */}

        {/* Forma de Pétalo 1 (Superior Izquierda) */}
        <Box
          sx={{
            position: "absolute",
            top: { xs: "-100px", md: "-50px" },
            left: { xs: "-100px", md: "-50px" },
            width: { xs: 300, md: 500 },
            height: { xs: 400, md: 700 },
            borderRadius: "40% 60% 70% 30% / 40% 40% 60% 60%", // Forma de pétalo/gota
            backgroundColor: "#FF69B4",
            opacity: { xs: 0.1, md: 0.15 },
            transform: "rotate(20deg)",
            zIndex: 0,
          }}
        />
        {/* Forma de Pétalo 2 (Inferior Derecha) */}
        <Box
          sx={{
            position: "absolute",
            bottom: { xs: "-100px", md: "-50px" },
            right: { xs: "-50px", md: "-100px" },
            width: { xs: 250, md: 450 },
            height: { xs: 350, md: 600 },
            borderRadius: "30% 70% 50% 50% / 50% 30% 70% 50%", // Otra forma de pétalo
            backgroundColor: "#D82E7A",
            opacity: { xs: 0.08, md: 0.12 },
            transform: "rotate(-40deg)",
            zIndex: 0,
          }}
        />
        {/* Pequeña Cápsula (Centro Derecha) */}
        <Box
          sx={{
            position: "absolute",
            top: "40%",
            right: "15%",
            width: 50,
            height: 150,
            borderRadius: "50px", // Forma de cápsula/píldora
            backgroundColor: "#FFC0CB",
            opacity: 0.4,
            transform: "rotate(90deg)",
            zIndex: 0,
            display: { xs: "none", md: "block" },
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
            zIndex: 1, // Asegura que el contenido esté sobre los decorativos
          }}
        >
          <Grid
            size={{ xs: 12, md: 10, lg: 8 }}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Paper
              elevation={12}
              sx={{
                padding: { xs: "30px", sm: "40px" },
                borderRadius: "30px",
                width: "100%",
                maxWidth: "450px", // Limitar el ancho máximo
                // Glassmorphism Rosa
                background: "rgba(255, 255, 255, 0.06)",
                backdropFilter: "blur(15px)",
                border: "1px solid rgba(255,255,255,0.7)",
                boxShadow:
                  "0 25px 50px rgba(216,46,136,0.2), 0 10px 30px rgba(0,0,0,0.15)",
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
                  email: "",
                  password: "",
                  password_confirmation: "",
                }}
                validationSchema={ResetSchema}
                onSubmit={(values) => {
                  resetPassword(values);
                }}
              >
                {({ values, errors, touched, handleChange, handleBlur }) => (
                  <Form>
                    <Typography
                      variant='h4'
                      fontWeight='bold'
                      mb={4}
                      sx={{
                        background: "linear-gradient(135deg, #d82e7a, #ff69b4)",
                        backgroundClip: "text",
                        textFillColor: "transparent",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontSize: { xs: "28px", sm: "32px" },
                      }}
                    >
                      Restablecer Contraseña
                    </Typography>

                    <FormControl fullWidth>
                      <TextField
                        label='Correo Electrónico'
                        type='email'
                        name='email'
                        fullWidth
                        variant='outlined'
                        placeholder='tu.correo@ejemplo.com'
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                        sx={inputStyles}
                      />
                    </FormControl>

                    {/* La visibilidad de estos campos depende de si estás en la etapa 1 (email) o etapa 2 (cambio de contraseña) */}
                    <FormControl fullWidth>
                      <TextField
                        label='Nueva Contraseña'
                        type='password'
                        name='password'
                        fullWidth
                        variant='outlined'
                        placeholder='**********'
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                        sx={inputStyles}
                      />
                    </FormControl>

                    <FormControl fullWidth>
                      <TextField
                        label='Confirmar Nueva Contraseña'
                        type='password'
                        name='password_confirmation'
                        fullWidth
                        variant='outlined'
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
                        sx={inputStyles}
                      />
                    </FormControl>

                    <Link
                      component={Link}
                      to='/iniciar-sesion'
                      style={{
                        textDecoration: "none",
                        display: "block",
                        textAlign: "right",
                        marginTop: 1,
                        marginBottom: 3,
                        color: "#D82E7A",
                        fontWeight: "bold",
                        "&:hover": { color: "#FF69B4" },
                      }}
                    >
                      ¿Ya la recordaste? Inicia sesión aquí
                    </Link>

                    <Button
                      variant='contained'
                      fullWidth
                      size='large'
                      type='submit'
                      sx={{
                        borderRadius: "18px",
                        background: "linear-gradient(135deg, #ff69b4, #d82e7a)",
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
                      Restablecer Contraseña
                    </Button>
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

export default ForgotPassword;
