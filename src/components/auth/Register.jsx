import React, { useContext, useState } from "react";
import Layout from "../Layout/Layout";
import { Button, FormControl, Grid, Paper, Box } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import AuthContext from "../../context/Auth/AuthContext";
import CartContext from "../../context/Cart/CartContext";
import Swal from "sweetalert2";
import { useCaptcha } from "../../hooks/useCaptcha";
import Decorations from "./Decorations";
import RegisterForm from "./RegisterForm";
// Esquema de validación optimizado
const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es requerido"),

  tiktokUsername: Yup.string().required(
    "El usuario de tiktok es requerido(importante para el sorteo de regalos)",
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
    .trim()
    .test(
      "valid-domain",
      "El dominio del correo no es válido (ej: gmail.com, hotmail.com)",
      (value) => {
        if (!value) return false;

        // Dominios exactos permitidos
        const allowedDomains = [
          "gmail.com",
          "icloud.com",
          "live.com.mx",
          "outlook.com",
          "hotmail.com",
          "hotmail.es",
        ];

        // Extraemos lo que está después del @
        const domain = value.split("@")[1];

        // Validamos que el dominio esté en la lista exacta
        return allowedDomains.includes(domain?.toLowerCase());
      },
    ),
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
  const { getCaptchaToken } = useCaptcha();
  const { syncGuestToServer, getUserCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const handleRegister = async (credentials) => {
    setLoading(true);
    const token = await getCaptchaToken("registro");
    const data = {
      password: credentials.password,
      email: credentials.email,
      name: credentials.name,
      phone: credentials.phone,
      username: credentials.username || "",
      tiktokUsername: credentials.tiktokUsername,
      captchaToken: token,
    };
    await registerUser(data);

    // Sincronización de carrito post-registro
    try {
      await syncGuestToServer();
      await getUserCart();
    } catch (cartError) {
      console.error("Error al sincronizar carrito:", cartError);
    }
    setLoading(false);
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
        <Decorations />
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
                background: "rgba(255, 255, 255, 0.03)",
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
                  email: "",
                  password: "",
                  password_confirmation: "",
                  phone: "",
                  tiktokUsername: "",
                }}
                validationSchema={RegisterSchema}
                onSubmit={handleRegister}
              >
                {({ values, errors, touched, handleChange, handleBlur }) => (
                  <RegisterForm
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleClickShowConfirmPassword={
                      handleClickShowConfirmPassword
                    }
                    handleClickShowPassword={handleClickShowPassword}
                    showPassword={showPassword}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    inputStyles={inputStyles}
                  />
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
