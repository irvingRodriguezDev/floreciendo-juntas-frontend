import { Routes, Route, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Box, Grid } from "@mui/material";

import AuthContext from "../context/Auth/AuthContext";

// Componentes
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import ForgotPassword from "../components/auth/ForgotPassword";
import Courses from "../containers/Courses/Courses";
import Certifications from "../containers/Certificationes/Certifications";
import Events from "../containers/Events/Events";
import Saloon from "../containers/Saloon/Salon";
import Secrets from "../containers/Secrets/Secrets";
import Shop from "../containers/Shop/Shop";
import Profile from "../containers/Profile/Profile";
import DetailEvent from "../containers/Events/EventDetail/DetailEvent";

function AppRouter() {
  const { autenticado, usuarioAutenticado, cargando } = useContext(AuthContext);

  useEffect(() => {
    usuarioAutenticado();
  }, []);

  if (cargando) {
    return (
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        sx={{ minHeight: "100vh" }}
      >
        <Box>Cargando...</Box>
      </Grid>
    );
  }

  // Rutas siempre accesibles
  const alwaysRoutes = [
    { path: "/cursos", element: <Courses /> },
    { path: "/certificaciones", element: <Certifications /> },
    { path: "/tienda", element: <Shop /> },
    { path: "/eventos", element: <Events /> },
    { path: "/detalle-evento/:id", element: <DetailEvent /> },
    { path: "/10-secretos", element: <Secrets /> },
    { path: "/el-salon-de-tus-sueños", element: <Saloon /> },
  ];

  // Rutas públicas solo para no autenticados
  const publicOnlyRoutes = [
    { path: "/iniciar-sesion", element: <Login /> },
    { path: "/registro", element: <Register /> },
    { path: "/recuperar-contraseña", element: <ForgotPassword /> },
  ];

  // Rutas privadas solo para autenticados
  const privateRoutes = [{ path: "/mi-perfil", element: <Profile /> }];

  return (
    <Routes>
      {/* Rutas públicas solo si NO está autenticado */}
      {publicOnlyRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={autenticado ? <Navigate to='/cursos' replace /> : element}
        />
      ))}

      {/* Rutas siempre accesibles */}
      {alwaysRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}

      {/* Rutas privadas solo si está autenticado */}
      {privateRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={
            autenticado ? element : <Navigate to='/iniciar-sesion' replace />
          }
        />
      ))}

      {/* Ruta por defecto */}
      <Route path='*' element={<Navigate to='/cursos' replace />} />
    </Routes>
  );
}

export default AppRouter;
