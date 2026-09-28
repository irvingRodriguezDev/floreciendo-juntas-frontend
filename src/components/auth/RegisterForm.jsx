import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Form } from "formik";
const RegisterForm = ({
  values,
  inputStyles,
  loading,
  handleClickShowPassword,
  handleClickShowConfirmPassword,
  showPassword,
  handleBlur,
  touched,
  errors,
  handleChange,
  showConfirmPassword,
}) => {
  return (
    <Form>
      <Typography
        variant='h3'
        textAlign='center'
        fontWeight='bold'
        mb={4}
        sx={{
          background: "linear-gradient(135deg, #ff69b4, #d82e7a)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontSize: { xs: "30px", sm: "42px" },
        }}
      >
        ¡Únete a la comunidad!
      </Typography>

      <Grid container spacing={2}>
        <Grid size={6}>
          <TextField
            label='Nombre completo'
            name='name'
            fullWidth
            autoComplete='off'
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
            sx={inputStyles}
            disabled={loading}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label='Usuario de TikTok'
            name='tiktokUsername'
            fullWidth
            autoComplete='off'
            value={values.tiktokUsername}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.tiktokUsername && Boolean(errors.tiktokUsername)}
            helperText={touched.tiktokUsername && errors.tiktokUsername}
            sx={inputStyles}
            disabled={loading}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label='Correo Electrónico'
            type='email'
            name='email'
            fullWidth
            autoComplete='off'
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            sx={inputStyles}
            disabled={loading}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label='Teléfono (10 dígitos)'
            name='phone'
            fullWidth
            autoComplete='off'
            value={values.phone}
            onChange={(e) => {
              // Solo permite números y máximo 10 caracteres
              const val = e.target.value.replace(/\D/g, "").slice(0, 10);
              handleChange({
                target: { name: "phone", value: val },
              });
            }}
            onBlur={handleBlur}
            error={touched.phone && Boolean(errors.phone)}
            helperText={touched.phone && errors.phone}
            sx={inputStyles}
            disabled={loading}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label='Contraseña'
            type={showPassword ? "text" : "password"}
            name='password'
            fullWidth
            autoComplete='off'
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            sx={inputStyles}
            disabled={loading}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={(e) => e.preventDefault()} // Evita que el foco se pierda
                      edge='end'
                      sx={{
                        color: "#D82E7A",
                        marginRight: "8px",
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label='Confirmar Contraseña'
            type={showConfirmPassword ? "text" : "password"}
            name='password_confirmation'
            fullWidth
            autoComplete='off'
            value={values.password_confirmation}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.password_confirmation &&
              Boolean(errors.password_confirmation)
            }
            helperText={
              touched.password_confirmation && errors.password_confirmation
            }
            sx={inputStyles}
            disabled={loading}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={(e) => e.preventDefault()} // Evita que el foco se pierda
                      edge='end'
                      sx={{
                        color: "#D82E7A",
                        marginRight: "8px",
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>

        <Grid size={12}>
          <Button
            variant='contained'
            fullWidth
            type='submit'
            size='large'
            disabled={loading}
            sx={{
              borderRadius: "18px",
              background: "linear-gradient(135deg, #ff69b4, #d82e7a)",
              boxShadow: "0 10px 25px rgba(216,46,136,0.4)",
              fontWeight: "bold",
              py: 2,
              fontSize: "18px",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: "0 15px 30px rgba(216,46,136,0.5)",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={26} color='inherit' />
            ) : (
              "Registrarme"
            )}
          </Button>
        </Grid>

        <Grid size={12}>
          <Divider sx={{ my: 1 }}>
            <Chip
              sx={{
                color: "#D82E7A",
                border: "1px solid #D82E7A",
              }}
              label='¿Ya eres parte?'
            />
          </Divider>
        </Grid>

        <Grid size={12}>
          <Link to='/iniciar-sesion' style={{ textDecoration: "none" }}>
            <Button
              variant='outlined'
              fullWidth
              size='large'
              sx={{
                borderRadius: "18px",
                borderColor: "#D82E7A",
                color: "#D82E7A",
                fontWeight: "bold",
                py: 2,
              }}
            >
              Iniciar sesión
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Form>
  );
};

export default RegisterForm;
