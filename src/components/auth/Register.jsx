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
} from "@mui/material";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import AuthContext from "../../context/Auth/AuthContext";
import svg from "../../assets/svg/undraw_access-account_aydp.svg";
const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es requerido"),
  direction: Yup.string().required("La dirección es requerida"),
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

  return (
    <Layout>
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        sx={{ minHeight: "100vh", px: { xs: 2, sm: 4 }, py: { xs: 4, md: 8 } }}
      >
        <Grid
          item
          size={{ xs: 12, sm: 6, md: 5 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            elevation={0}
            sx={{
              padding: { xs: "10px", sm: "20px" },
              borderRadius: "16px",
              textAlign: "center",
              bgcolor: "transparent",
            }}
          >
            <img
              src={svg}
              alt='Login Illustration'
              style={{ width: "100%", maxWidth: "400px" }}
            />
          </Paper>
        </Grid>
        <Grid item size={{ xs: 12, sm: 8, md: 5 }} sx={{ mt: 5 }}>
          <Paper
            elevation={4}
            sx={{
              p: { xs: 3, sm: 4 },
              borderRadius: "16px",
              bgcolor: "white",
              textAlign: "center",
              maxWidth: "600px",
              bgcolor: "transparent",
            }}
          >
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
                phone: "",
                direction: "",
              }}
              validationSchema={RegisterSchema}
              onSubmit={(values) => registerUser(values)}
            >
              {({ values, errors, touched, handleChange, handleBlur }) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item size={12}>
                      <Typography
                        textAlign='center'
                        fontWeight='bold'
                        fontSize={{ xs: "28px", sm: "32px", md: "35px" }}
                        color='#D82E7A'
                      >
                        Regístrate
                      </Typography>
                    </Grid>

                    {/* Nombre */}
                    <Grid
                      item
                      size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
                    >
                      <FormControl fullWidth>
                        <TextField
                          label='Nombre completo'
                          name='name'
                          placeholder='Carolina Tavera'
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

                    {/* Email y Teléfono */}
                    <Grid item size={{ xs: 12, md: 12, lg: 12, xl: 12 }}>
                      <FormControl fullWidth>
                        <TextField
                          label='Correo Electrónico'
                          type='email'
                          name='email'
                          placeholder='carolina@floreciendo-juntas.com.mx'
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

                    <Grid item size={{ xs: 12, md: 12, lg: 12, xl: 12 }}>
                      <FormControl fullWidth>
                        <TextField
                          label='Teléfono'
                          type='text'
                          name='phone'
                          placeholder='7223224221'
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

                    {/* Contraseña y Confirmación */}
                    <Grid item size={{ xs: 12, md: 12, lg: 12, xl: 12 }}>
                      <FormControl fullWidth>
                        <TextField
                          label='Contraseña'
                          type='password'
                          name='password'
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

                    <Grid item size={{ xs: 12, md: 12, lg: 12, xl: 12 }}>
                      <FormControl fullWidth>
                        <TextField
                          label='Confirma tu contraseña'
                          type='password'
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
                    <Grid item size={12}>
                      <Button
                        variant='contained'
                        fullWidth
                        size='large'
                        type='submit'
                        sx={{
                          py: 1.5,
                          fontWeight: "bold",
                          background: "#BF2369",
                          borderRadius: "12px",
                          "&:hover": {
                            background: "#BF2369",
                          },
                        }}
                      >
                        Registrarme
                      </Button>
                    </Grid>

                    {/* Divider */}
                    <Grid item size={12}>
                      <Divider>
                        <Chip
                          sx={{ bgcolor: "#D82E7A", color: "white" }}
                          label='¿Ya tienes cuenta?'
                        />
                      </Divider>
                    </Grid>

                    {/* Link a login */}
                    <Grid item size={12}>
                      <Link
                        to='/iniciar-sesion'
                        style={{ textDecoration: "none" }}
                      >
                        <Button
                          variant='outlined'
                          fullWidth
                          size='large'
                          sx={{
                            py: 1.5,
                            fontWeight: "bold",
                            borderRadius: "12px",
                            borderColor: "#D82E7A",
                            color: "#D82E7A",
                            "&:hover": {
                              borderColor: "#bf2369",
                              color: "#bf2369",
                              backgroundColor: "rgba(216,46,136,0.05)",
                            },
                          }}
                        >
                          Iniciar sesión
                        </Button>
                      </Link>
                    </Grid>

                    {/* Espacio para SVG */}
                    <Grid item xs={12}>
                      <div style={{ height: "80px" }} />
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Register;
