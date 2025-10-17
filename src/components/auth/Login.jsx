import Layout from "../Layout/Layout";
import {
  Button,
  Chip,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import svg from "../../assets/svg/undraw_secure-login_m11a.svg";
import AuthContext from "../../context/Auth/AuthContext";
import { useContext } from "react";
import { Formik, Form } from "formik";
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
    borderRadius: "12px",
    "& fieldset": { borderColor: "rgba(216,46,136,0.3)" },
    "&:hover fieldset": { borderColor: "#D82E7A" },
    "&.Mui-focused fieldset": { borderColor: "#D82E7A" },
  },
  "& .MuiInputBase-input": { color: "black" },
  "& .MuiInputLabel-root": { color: "#D82E7A" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#D82E7A" },
};
const Login = () => {
  const { iniciarSesion } = useContext(AuthContext);

  return (
    <Layout>
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        sx={{ minHeight: "100vh", padding: { xs: 2, sm: 4 } }}
        spacing={2}
      >
        {/* Imagen */}
        <Grid
          size={{ xs: 12, sm: 6, md: 5 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: { xs: 13, md: 0 },
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
              style={{ width: "100%", maxWidth: "600px" }}
            />
          </Paper>
        </Grid>

        {/* Formulario */}
        <Grid
          size={{ xs: 12, sm: 6, md: 5 }}
          sx={{
            display: "flex",
            justifyContent: "end",
            marginBottom: { xs: 25, md: 0 },
          }}
        >
          <Paper
            elevation={4}
            sx={{
              padding: { xs: "20px", sm: "30px" },
              borderRadius: "16px",
              width: "100%",
              maxWidth: "400px",
            }}
          >
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={LoginSchema}
              onSubmit={(values) => {
                iniciarSesion(values);
              }}
            >
              {({ values, errors, touched, handleChange, handleBlur }) => (
                <Form>
                  <Typography
                    textAlign='center'
                    fontWeight='bold'
                    fontSize={{ xs: "28px", sm: "32px", md: "35px" }}
                    mb={3}
                  >
                    Iniciar sesión
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid size={12}>
                      <TextField
                        label='Correo Electrónico'
                        type='email'
                        fullWidth
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
                    </Grid>

                    <Grid size={12}>
                      <TextField
                        placeholder='**********'
                        label='Contraseña'
                        type='password'
                        variant='outlined'
                        fullWidth
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
                      <Typography sx={{ fontSize: { xs: "16px", sm: "18px" } }}>
                        Olvidaste tu contraseña?{" "}
                        <Link
                          to={"/recuperar-contraseña"}
                          style={{ textDecoration: "none" }}
                        >
                          <b style={{ color: "#D82E7A" }}>Haz clic aquí</b>
                        </Link>
                      </Typography>
                    </Grid>

                    <Grid size={12}>
                      <Button
                        variant='contained'
                        size='large'
                        fullWidth
                        type='submit'
                        sx={{
                          borderRadius: "12px",
                          bgcolor: "#D82E7A",
                          "&:hover": { bgcolor: "#bf2369" },
                          fontWeight: "bold",
                          py: 1.5,
                        }}
                      >
                        Iniciar sesión
                      </Button>
                    </Grid>

                    <Grid size={12}>
                      <Divider>
                        <Chip
                          sx={{ bgcolor: "#D82E7A", color: "white" }}
                          label='¿Aún no tienes cuenta?'
                        />
                      </Divider>
                    </Grid>

                    <Grid size={12}>
                      <Link to={"/registro"}>
                        <Button
                          variant='outlined'
                          size='large'
                          fullWidth
                          sx={{
                            borderRadius: "12px",
                            borderColor: "#D82E7A",
                            color: "#D82E7A",
                            fontWeight: "bold",
                            py: 1.5,
                            "&:hover": {
                              borderColor: "#bf2369",
                              color: "#bf2369",
                              bgcolor: "rgba(216, 46, 122, 0.05)",
                            },
                          }}
                        >
                          Regístrate
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

export default Login;
