import React, { useContext } from "react";
import Layout from "../Layout/Layout";
import {
  Button,
  FormControl,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import AuthContext from "../../context/Auth/AuthContext";

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
    "& fieldset": { borderColor: "rgba(229, 56, 136, 0.5)" },
    "&:hover fieldset": { borderColor: "#E53888" },
    "&.Mui-focused fieldset": { borderColor: "#E53888" },
  },
  "& .MuiInputBase-input": { color: "white" },
  "& .MuiInputLabel-root": { color: "#E53888" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#E53888" },
  "& .MuiInputLabel-root.Mui-disabled": { color: "#E53888" },
};

const Register = () => {
  const { registerUser } = useContext(AuthContext);

  return (
    <Layout>
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        sx={{ mt: { xs: "22%", md: "10%" }, mb: { xs: "30px", md: 0 } }}
      >
        <Grid size={{ xs: 11, md: 8, lg: 6 }}>
          <Paper
            sx={{
              p: 4,
              background:
                "linear-gradient(145deg, rgba(238,158,234,0.15), rgba(229,56,136,0.1))",
              borderRadius: "20px",
              boxShadow: "0 8px 40px rgba(229, 56, 136, 0.2)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(238, 158, 234, 0.3)",
              color: "white",
              textAlign: "center",
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
                    <Grid size={12}>
                      <Typography
                        variant='h4'
                        sx={{
                          color: "#E53888",
                          fontWeight: "bold",
                          mb: 3,
                          textShadow: "0px 0px 10px rgba(229, 56, 136, 0.6)",
                        }}
                      >
                        Regístrate
                      </Typography>
                    </Grid>

                    {/* Nombre */}
                    <Grid item size={12}>
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
                          autoComplete='name'
                        />
                      </FormControl>
                    </Grid>

                    {/* Email */}
                    <Grid item size={12} md={6}>
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
                          autoComplete='email'
                        />
                      </FormControl>
                    </Grid>

                    {/* Teléfono */}
                    <Grid item size={12} md={6}>
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
                          autoComplete='tel'
                        />
                      </FormControl>
                    </Grid>

                    {/* Dirección */}
                    <Grid item size={12}>
                      <FormControl fullWidth>
                        <TextField
                          label='Dirección'
                          type='text'
                          name='direction'
                          placeholder='Mexico, zona centro #43'
                          value={values.direction}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.direction && Boolean(errors.direction)}
                          helperText={touched.direction && errors.direction}
                          variant='outlined'
                          sx={inputStyles}
                          autoComplete='street-address'
                        />
                      </FormControl>
                    </Grid>

                    {/* Contraseña */}
                    <Grid item size={12} md={6}>
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
                          autoComplete='new-password'
                        />
                      </FormControl>
                    </Grid>

                    {/* Confirmación */}
                    <Grid item size={12} md={6}>
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
                          autoComplete='new-password'
                        />
                      </FormControl>
                    </Grid>

                    {/* Botón registrarse */}
                    <Grid item size={12}>
                      <Button
                        variant='contained'
                        fullWidth
                        size='large'
                        type='submit'
                        sx={{
                          py: 1.5,
                          fontWeight: "bold",
                          background:
                            "linear-gradient(90deg, #E53888, #EE9EEA)",
                          borderRadius: "12px",
                          boxShadow: "0px 4px 20px rgba(229, 56, 136, 0.5)",
                          "&:hover": {
                            background:
                              "linear-gradient(90deg, #d42a76, #e285d7)",
                            boxShadow: "0px 6px 25px rgba(229, 56, 136, 0.7)",
                          },
                        }}
                      >
                        Registrarme
                      </Button>
                    </Grid>

                    {/* Link a login */}
                    <Grid item size={12}>
                      <Typography
                        mt={2}
                        textAlign='center'
                        fontWeight='bold'
                        fontSize='20px'
                      >
                        ¿Ya tienes cuenta?
                      </Typography>
                      <Link
                        to='/iniciar-sesion'
                        style={{ textDecoration: "none" }}
                      >
                        <Button
                          variant='contained'
                          fullWidth
                          size='large'
                          sx={{
                            mt: 1,
                            py: 1.5,
                            fontWeight: "bold",
                            background:
                              "linear-gradient(90deg, #E53888, #EE9EEA)",
                            borderRadius: "12px",
                            boxShadow: "0px 4px 20px rgba(229, 56, 136, 0.5)",
                            "&:hover": {
                              background:
                                "linear-gradient(90deg, #d42a76, #e285d7)",
                              boxShadow: "0px 6px 25px rgba(229, 56, 136, 0.7)",
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
