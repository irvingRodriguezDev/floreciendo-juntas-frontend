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
import svg from "../../assets/svg/undraw_secure-login_m11a.svg";

const Login = () => {
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
          item
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
          item
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
            <Typography
              textAlign='center'
              fontWeight='bold'
              fontSize={{ xs: "28px", sm: "32px", md: "35px" }}
              mb={3}
            >
              Iniciar sesión
            </Typography>

            <Grid container spacing={2}>
              <Grid item size={12}>
                <TextField
                  placeholder='algo@alguien.com.mx'
                  label='Correo Electrónico'
                  type='email'
                  variant='outlined'
                  fullWidth
                  name='email'
                />
              </Grid>

              <Grid item size={12}>
                <TextField
                  placeholder='**********'
                  label='Contraseña'
                  type='password'
                  variant='outlined'
                  fullWidth
                  name='password'
                />
              </Grid>

              <Grid item size={12} sx={{ textAlign: "right" }}>
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

              <Grid item size={12}>
                <Button
                  variant='contained'
                  size='large'
                  fullWidth
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

              <Grid item size={12}>
                <Divider>
                  <Chip
                    sx={{ bgcolor: "#D82E7A", color: "white" }}
                    label='¿Aún no tienes cuenta?'
                  />
                </Divider>
              </Grid>

              <Grid item size={12}>
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
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Login;
