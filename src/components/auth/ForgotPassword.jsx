import React from "react";
import Layout from "../Layout/Layout";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import svg from "../../assets/svg/undraw_forgot-password_nttj.svg";
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

const ForgotPassword = () => {
  return (
    <Layout>
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        sx={{ minHeight: "100vh", px: { xs: 2, sm: 4 }, py: { xs: 3, md: 2 } }}
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
        <Grid item size={{ xs: 12, sm: 8, md: 6 }}>
          <Paper
            elevation={4}
            sx={{
              p: { xs: 3, sm: 4 },
              borderRadius: "16px",
              textAlign: "center",
              maxWidth: "400px",
              bgcolor: "transparent",
            }}
          >
            <Typography
              variant='h4'
              sx={{
                color: "#D82E7A",
                fontWeight: "bold",
                mb: 3,
              }}
            >
              Restablecer Contraseña
            </Typography>

            {/* Email */}
            <TextField
              label='Correo Electrónico'
              type='email'
              fullWidth
              variant='outlined'
              placeholder='carolina@floreciendo-juntas.com.mx'
              sx={inputStyles}
            />

            {/* Contraseña */}
            <TextField
              label='Contraseña'
              type='password'
              fullWidth
              variant='outlined'
              placeholder='**********'
              sx={inputStyles}
            />

            {/* Confirmar Contraseña */}
            <TextField
              label='Confirmar Contraseña'
              type='password'
              fullWidth
              variant='outlined'
              placeholder='**********'
              sx={inputStyles}
            />

            {/* Link a login */}
            <Typography textAlign='right' sx={{ mb: 2 }}>
              ¿Ya la recordaste?{" "}
              <Link
                to='/iniciar-sesion'
                style={{
                  textDecoration: "none",
                  color: "#D82E7A",
                  fontWeight: "bold",
                }}
              >
                Inicia sesión aquí
              </Link>
            </Typography>

            {/* Botón restablecer */}
            <Button
              variant='contained'
              fullWidth
              size='large'
              sx={{
                py: 1.5,
                fontWeight: "bold",
                background: "#E53888",
                borderRadius: "12px",
                boxShadow: "0px 4px 20px rgba(216,46,136,0.5)",
                "&:hover": {
                  background: "#E53888",
                },
              }}
            >
              Restablecer contraseña
            </Button>

            {/* Espacio al final para SVG si se desea */}
            <div style={{ height: "60px" }} />
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default ForgotPassword;
