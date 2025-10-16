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
        sx={{ minHeight: "100vh", px: { xs: 2, sm: 4 }, py: { xs: 4, md: 10 } }}
        spacing={4}
      >
        {/* Ilustración */}
        <Grid size={{ xs: 12, sm: 6, md: 5 }} sx={{ mt: { xs: 10 } }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 3 },
              textAlign: "center",
              bgcolor: "transparent",
            }}
          >
            <img
              src={svg}
              alt='Register Illustration'
              style={{ width: "100%", maxWidth: "400px" }}
            />
          </Paper>
        </Grid>

        {/* Formulario */}
        <Grid size={{ xs: 12, sm: 8, md: 5 }}>
          <Paper
            elevation={4}
            sx={{
              p: { xs: 3, sm: 4 },
              borderRadius: "16px",
              textAlign: "center",
              maxWidth: "600px",
              bgcolor: "white",
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
              onSubmit={(values) => {
                registerUser(values);
              }}
            >
              {({ values, errors, touched, handleChange, handleBlur }) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid size={12}>
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
                    <Grid size={12}>
                      <FormControl fullWidth>
                        <TextField
                          label='Nombre completo'
                          name='name'
                          autoComplete='off'
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

                    {/* Correo */}
                    <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                      <FormControl fullWidth>
                        <TextField
                          label='Correo Electrónico'
                          type='email'
                          autoComplete='off'
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

                    {/* Teléfono */}
                    <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                      <FormControl fullWidth>
                        <TextField
                          label='Teléfono'
                          name='phone'
                          autoComplete='off'
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
                    {/* Contraseña */}
                    <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
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
                    <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
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
                    <FormControl fullWidth margin='normal'>
                      <Button
                        variant='contained'
                        fullWidth
                        type='submit'
                        size='large'
                        sx={{
                          py: 1.5,
                          fontWeight: "bold",
                          borderRadius: "12px",
                          bgcolor: "#D82E7A",
                          color: "#fff",
                          "&:hover": {
                            bgcolor: "#bf2369",
                            color: "#fff",
                          },
                        }}
                      >
                        Registrarme
                      </Button>
                    </FormControl>

                    {/* Divider */}
                    <Grid size={12}>
                      <Divider>
                        <Chip
                          sx={{ bgcolor: "#D82E7A", color: "white" }}
                          label='¿Ya tienes cuenta?'
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
