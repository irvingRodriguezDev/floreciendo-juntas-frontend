import React from "react";
import Layout from "../Layout/Layout";
import {
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <Layout>
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        sx={{
          mt: { xs: "30%", sm: "30%", md: "20%" },
          mb: { xs: "10%", md: "10%" },
        }}
      >
        <Grid item size={{ xs: 11, md: 6 }}>
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
            <Typography
              variant='h4'
              sx={{
                color: "#E53888",
                fontWeight: "bold",
                mb: 3,
                textShadow: "0px 0px 10px rgba(229, 56, 136, 0.6)",
              }}
            >
              Iniciar Sesión
            </Typography>
            <TextField
              label='Correo Electrónico'
              type='email'
              fullWidth
              variant='outlined'
              placeholder='carolina@floreciendo-juntas.com.mx'
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  "& fieldset": { borderColor: "rgba(229, 56, 136, 0.5)" },
                  "&:hover fieldset": { borderColor: "#E53888" },
                  "&.Mui-focused fieldset": { borderColor: "#E53888" },
                },
                "& .MuiInputBase-input": {
                  color: "white",
                },
                "& .MuiInputLabel-root": {
                  // 🔹 color normal
                  color: "#E53888",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  // 🔹 color enfocado
                  color: "#E53888",
                },
                "& .MuiInputLabel-root.Mui-disabled": {
                  // 🔹 color si está deshabilitado
                  color: "#E53888",
                },
              }}
            />
            <TextField
              label='Contraseña'
              type='password'
              fullWidth
              variant='outlined'
              placeholder='**********'
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  "& fieldset": { borderColor: "rgba(229, 56, 136, 0.5)" },
                  "&:hover fieldset": { borderColor: "#E53888" },
                  "&.Mui-focused fieldset": { borderColor: "#E53888" },
                },
                "& .MuiInputBase-input": {
                  color: "white",
                },
                "& .MuiInputLabel-root": {
                  // 🔹 color normal
                  color: "#E53888",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  // 🔹 color enfocado
                  color: "#E53888",
                },
                "& .MuiInputLabel-root.Mui-disabled": {
                  // 🔹 color si está deshabilitado
                  color: "#E53888",
                },
              }}
            />
            <Typography textAlign='right' sx={{ mb: 2 }}>
              olvidaste tu contraseña?{" "}
              <Link
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontWeight: "bold",
                }}
                to='/recuperar-contraseña'
              >
                <b>Recuperala aquí</b>
              </Link>
            </Typography>
            <Button
              variant='contained'
              fullWidth
              size='large'
              sx={{
                py: 1.5,
                fontWeight: "bold",
                background: "linear-gradient(90deg, #E53888, #EE9EEA)",
                borderRadius: "12px",
                boxShadow: "0px 4px 20px rgba(229, 56, 136, 0.5)",
                "&:hover": {
                  background: "linear-gradient(90deg, #d42a76, #e285d7)",
                  boxShadow: "0px 6px 25px rgba(229, 56, 136, 0.7)",
                },
              }}
            >
              Iniciar sesión
            </Button>
            <Typography gutterBottom sx={{ m: 3 }}>
              ¿Aun no tienes cuenta?
            </Typography>
            <Link to='/registro'>
              <Button
                variant='contained'
                fullWidth
                size='large'
                sx={{
                  py: 1.5,
                  fontWeight: "bold",
                  background: "linear-gradient(90deg, #E53888, #EE9EEA)",
                  borderRadius: "12px",
                  boxShadow: "0px 4px 20px rgba(229, 56, 136, 0.5)",
                  "&:hover": {
                    background: "linear-gradient(90deg, #d42a76, #e285d7)",
                    boxShadow: "0px 6px 25px rgba(229, 56, 136, 0.7)",
                  },
                }}
              >
                Registrate
              </Button>
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Login;
