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
import Home from "../containers/Home/Home";
import DetailsCourse from "../containers/Courses/Details/DetailsCourse";
import PinkSpinner from "../components/Loading/PinkSpinner";
import BySystemId from "../containers/Courses/BySystem/BySystemId";
import Success from "../Success";
import Error from "../Error";
import ProductDetailPage from "../components/Products/ProductDetailPage";
import SuccessSalonPayment from "../SuccessPartialPayment";
import SuccessSubscription from "../SuccessSubscription";
import DetailOrders from "../components/Orders/DetailOrders";
import useLastPath from "../hooks/useLastPath";
import Checkout from "../containers/Checkout/Checkout";
import Lives from "../containers/Lives/Lives";
import LiveDetail from "../containers/Lives/LiveDetail";
function AppRouter() {
  const { autenticado, usuarioAutenticado, cargando } = useContext(AuthContext);
  useEffect(() => {
    usuarioAutenticado();
  }, []);
  useLastPath();
  if (cargando) {
    return <PinkSpinner label='Cargando' />;
  }

  // Rutas siempre accesibles
  const alwaysRoutes = [
    { path: "/", element: <Home /> },
    { path: "/cursos", element: <Courses /> },
    { path: "/certificaciones", element: <Certifications /> },
    { path: "/tienda", element: <Shop /> },
    { path: "/eventos", element: <Events /> },
    { path: "/detalle-evento/:id", element: <DetailEvent /> },
    { path: "/secretos", element: <Secrets /> },
    { path: "/lives", element: <Lives /> },
    { path: "/detalle-live/:id", element: <LiveDetail /> },

    { path: "/el-salon-de-tus-sueños", element: <Saloon /> },
    { path: "/detalle-curso/:id", element: <DetailsCourse /> },
    { path: "/cursos/bysystem/:id", element: <BySystemId /> },
    { path: "/success-payment-tickets", element: <Success /> },
    { path: "/success-payment-partial", element: <SuccessSalonPayment /> },
    { path: "/success-payment-subscription", element: <SuccessSubscription /> },
    { path: "/error", element: <Error /> },
    { path: "/detalle-producto/:id", element: <ProductDetailPage /> },
    { path: "/detalle-orden/:id", element: <DetailOrders /> },
    { path: "/checkout", element: <Checkout /> },
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
          element={autenticado ? <Navigate to='/' replace /> : element}
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
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );
}

export default AppRouter;
