import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import ForgotPassword from "../components/auth/ForgotPassword";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import AuthContext from "../context/Auth/AuthContext";
import { useContext, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import Courses from "../containers/Courses/Courses";
import Certifications from "../containers/Certificationes/Certifications";
import Events from "../containers/Events/Events";
import Saloon from "../containers/Saloon/Salon";
import Secrets from "../containers/Secrets/Secrets";
import Shop from "../containers/Shop/Shop";
import Profile from "../containers/Profile/Profile";
import DetailEvent from "../containers/Events/EventDetail/DetailEvent";
function AppRouter({ isAuthenticated }) {
  const { autenticado, usuarioAutenticado, cargando } = useContext(AuthContext);

  useEffect(() => {
    usuarioAutenticado();
  }, []);
  if (cargando) {
    return (
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Box
          sx={{
            width: "105%",
            height: "177%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          cargando
        </Box>
      </Grid>
    );
  }
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route element={<PublicRoute isAuthenticated={autenticado} />}>
        <Route path='/iniciar-sesion' element={<Login />} />
        <Route path='/registro' element={<Register />} />
        <Route path='/recuperar-contraseña' element={<ForgotPassword />} />
        <Route path='/cursos' element={<Courses />} />
        <Route path='/certificaciones' element={<Certifications />} />
        <Route path='/tienda' element={<Shop />} />
        <Route path='/eventos' element={<Events />} />
        <Route path='/detalle-evento/:id' element={<DetailEvent />} />
        <Route path='/10-secretos' element={<Secrets />} />
        <Route path='/el-salon-de-tus-sueños' element={<Saloon />} />
        <Route path='/mi-perfil' element={<Profile />} />
      </Route>

      {/* Rutas privadas */}
      <Route element={<PrivateRoute isAuthenticated={autenticado} />}>
        {/* <Route path='/cursoses' element={<Courses />} /> */}
      </Route>

      {/* Ruta por defecto */}
      <Route path='*' element={<Navigate to='/cursos' replace />} />
    </Routes>
  );
}

export default AppRouter;
