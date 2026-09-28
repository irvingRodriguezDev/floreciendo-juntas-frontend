import React, { useContext, useState } from "react";
import Layout from "../Layout/Layout";
import {
  Box,
  Button,
  FormControl,
  Grid,
  Paper,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import AuthContext from "../../context/Auth/AuthContext";
import { useCaptcha } from "../../hooks/useCaptcha";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import LockResetRoundedIcon from "@mui/icons-material/LockResetRounded";
import Swal from "sweetalert2";

const inputStyles = {
  mb: 2.5,
  "& .MuiOutlinedInput-root": {
    borderRadius: "16px",
    backgroundColor: "#F9FAFB",
    transition: "all 0.2s ease-in-out",
    "& fieldset": { borderColor: "rgba(216, 46, 122, 0.15)" },
    "&:hover fieldset": { borderColor: "rgba(216, 46, 122, 0.4)" },
    "&.Mui-focused fieldset": { borderColor: "#D82E7A", borderWidth: "2px" },
    "&.Mui-focused": { backgroundColor: "#FFFFFF" },
  },
  "& .MuiInputBase-input": { color: "#1F2937", fontSize: "0.95rem" },
  "& .MuiInputLabel-root": { color: "#6B7280" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#D82E7A", fontWeight: "700" },
};

const ResetSchema = Yup.object().shape({
  email: Yup.string()
    .email("Correo electrónico inválido")
    .required("El correo es obligatorio"),
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es obligatoria"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
    .required("Confirma tu nueva contraseña"),
});

const ForgotPassword = () => {
  const { getCaptchaToken } = useCaptcha();
  const { resetPassword } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleResetSubmit = async (values) => {
    setLoading(true);
    try {
      const captchaToken = await getCaptchaToken("reset_password");

      if (!captchaToken) {
        throw new Error(
          "No se pudo verificar el reCAPTCHA. Inténtalo de nuevo.",
        );
      }

      const data = {
        email: values.email,
        password: values.password,
        passwordConfirmation: values.passwordConfirmation,
        captchaToken,
      };

      await resetPassword(data);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error al restablecer",
        text: error.response?.data?.msg || "Ocurrió un error inesperado.",
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
          background: "linear-gradient(135deg, #FFF5F8 0%, #FED7E2 100%)",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: { xs: 4, sm: 6 },
          px: 2,
          overflow: "hidden",
        }}
      >
        {/* Formas Decorativas Suaves de Fondo */}
        <Box
          sx={{
            position: "absolute",
            top: "-8%",
            left: "-5%",
            width: { xs: 260, md: 480 },
            height: { xs: 260, md: 480 },
            borderRadius: "50%",
            background: "rgba(216, 46, 122, 0.29)",
            filter: "blur(60px)",
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "-10%",
            right: "-5%",
            width: { xs: 300, md: 500 },
            height: { xs: 300, md: 500 },
            borderRadius: "50%",
            background: "rgba(255, 105, 180, 0.32)",
            filter: "blur(80px)",
            zIndex: 0,
          }}
        />

        {/* Tarjeta Principal */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3.5, sm: 5 },
            borderRadius: "28px",
            width: "100%",
            maxWidth: "460px",
            bgcolor: "#FFFFFF",
            border: "1px solid rgba(216, 46, 122, 0.12)",
            boxShadow: "0 20px 50px rgba(216, 46, 122, 0.08)",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Header con Ícono */}
          <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            mb={3.5}
          >
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: "18px",
                bgcolor: "rgba(216, 46, 122, 0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#D82E7A",
                mb: 2,
              }}
            >
              <LockResetRoundedIcon sx={{ fontSize: 32 }} />
            </Box>
            <Typography
              variant='h5'
              fontWeight={800}
              textAlign='center'
              sx={{ color: "#1F2937", letterSpacing: "-0.5px" }}
            >
              Restablecer Contraseña
            </Typography>
            <Typography
              variant='body2'
              color='text.secondary'
              textAlign='center'
              mt={0.5}
            >
              Ingresa tus datos para actualizar tus credenciales de acceso.
            </Typography>
          </Box>

          <Formik
            initialValues={{
              email: "",
              password: "",
              passwordConfirmation: "",
            }}
            validationSchema={ResetSchema}
            onSubmit={handleResetSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form>
                <FormControl fullWidth>
                  <TextField
                    label='Correo Electrónico'
                    type='email'
                    name='email'
                    fullWidth
                    variant='outlined'
                    autoComplete='off'
                    placeholder='tu.correo@ejemplo.com'
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    sx={inputStyles}
                  />
                </FormControl>

                <FormControl fullWidth>
                  <TextField
                    label='Nueva Contraseña'
                    type={showPassword ? "text" : "password"}
                    name='password'
                    fullWidth
                    variant='outlined'
                    autoComplete='new-password'
                    placeholder='••••••••'
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    sx={inputStyles}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              aria-label='toggle password visibility'
                              onClick={handleClickShowPassword}
                              onMouseDown={(e) => e.preventDefault()}
                              edge='end'
                              sx={{ color: "#D82E7A" }}
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
                </FormControl>

                <FormControl fullWidth>
                  <TextField
                    label='Confirmar Nueva Contraseña'
                    type={showConfirmPassword ? "text" : "password"}
                    name='passwordConfirmation'
                    fullWidth
                    variant='outlined'
                    autoComplete='new-password'
                    placeholder='••••••••'
                    value={values.passwordConfirmation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.passwordConfirmation &&
                      Boolean(errors.passwordConfirmation)
                    }
                    helperText={
                      touched.passwordConfirmation &&
                      errors.passwordConfirmation
                    }
                    sx={inputStyles}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              aria-label='toggle confirm password visibility'
                              onClick={handleClickShowConfirmPassword}
                              onMouseDown={(e) => e.preventDefault()}
                              edge='end'
                              sx={{ color: "#D82E7A" }}
                            >
                              {/* BUG CORREGIDO: Se usa showConfirmPassword */}
                              {showConfirmPassword ? (
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
                </FormControl>

                <Button
                  variant='contained'
                  fullWidth
                  size='large'
                  type='submit'
                  disabled={loading}
                  disableElevation
                  sx={{
                    borderRadius: "16px",
                    bgcolor: "#D82E7A",
                    fontWeight: 700,
                    py: 1.8,
                    mt: 1,
                    fontSize: "0.95rem",
                    textTransform: "none",
                    boxShadow: "0 10px 25px rgba(216, 46, 122, 0.25)",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: "#C02567",
                      boxShadow: "0 12px 28px rgba(216, 46, 122, 0.35)",
                    },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color='inherit' />
                  ) : (
                    "Restablecer Contraseña"
                  )}
                </Button>

                {/* Enlace Volver a Login */}
                <Box textAlign='center' mt={3}>
                  <Link
                    to='/iniciar-sesion'
                    style={{
                      textDecoration: "none",
                      color: "#D82E7A",
                      fontWeight: 700,
                      fontSize: "0.88rem",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <ArrowBackRoundedIcon sx={{ fontSize: 18 }} />
                    Volver a Iniciar Sesión
                  </Link>
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>
      </Box>
    </Layout>
  );
};

export default ForgotPassword;
