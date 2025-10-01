import React from "react";
import Layout from "../Layout/Layout";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <Layout>
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        sx={{ mt: { xs: "22%", md: "10%" }, mb: { xs: "30px", md: 0 } }}
      >
        <Grid item size={{ xs: 11, md: 8, lg: 6 }}>
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
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 12 }}>
                <Typography
                  variant='h4'
                  sx={{
                    color: "#E53888",
                    fontWeight: "bold",
                    mb: 3,
                    textShadow: "0px 0px 10px rgba(229, 56, 136, 0.6)",
                  }}
                >
                  Registrate
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 12 }}>
                <TextField
                  label='Nombre completo'
                  type='text'
                  fullWidth
                  variant='outlined'
                  placeholder='Carolina Tavera'
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
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
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
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label='Telefono'
                  type='text'
                  fullWidth
                  variant='outlined'
                  placeholder='7223224221'
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
              </Grid>
              <Grid size={12}>
                <TextField
                  label='Direccion'
                  type='text'
                  fullWidth
                  variant='outlined'
                  placeholder='Mexico, zona centro #43'
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
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
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
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label='Confirma tu contraseña'
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
              </Grid>
              <Grid size={12}>
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
                  Registrarme
                </Button>
              </Grid>
              <Grid size={12}>
                <Typography
                  mt={2}
                  textAlign='center'
                  fontWeight='bold'
                  fontSize='20px'
                >
                  ¿Ya tienes cuenta?{" "}
                </Typography>
              </Grid>
              <Grid size={12}>
                <Link to={"/iniciar-sesion"}>
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
                    Iniciar sesion
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

export default Register;
