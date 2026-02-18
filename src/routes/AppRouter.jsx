import { Routes, Route, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";

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
import Subscription from "../containers/Subscription/Subscription";
import Community from "../containers/Community/Community";
import SubscriptionScreen from "../containers/SubscriptionScreen";
import ShowPost from "../containers/Community/showPost/ShowPost";
import CertificationDetail from "../components/Certifications/Details/CertificationDetail";
import NotFound from "../containers/NotFound/Page404";
import ModuleDetail from "../components/Certifications/Modules/ModuleDetail";

function AppRouter() {
  const { autenticado, usuarioAutenticado, cargando } = useContext(AuthContext);

  const [alert, setAlert] = useState("");

  useLastPath();

  useEffect(() => {
    usuarioAutenticado();
  }, []);

  useEffect(() => {
    const reason = localStorage.getItem("session_expired_reason");

    if (reason) {
      const messages = {
        multiple_session:
          "Tu sesión se cerró porque iniciaste sesión en otro dispositivo.",
        token_expired: "Tu sesión expiró. Por favor inicia sesión nuevamente.",
        default: "Tu sesión fue cerrada por seguridad.",
      };

      setAlert(messages[reason] || messages.default);
      localStorage.removeItem("session_expired_reason");
    }
  }, []);

  if (cargando) {
    return <PinkSpinner label='Cargando' />;
  }

  return (
    <>
      {/* 🔔 ALERTA GLOBAL */}

      <Routes>
        {/* Rutas públicas solo si NO está autenticado */}
        <Route
          path='/iniciar-sesion'
          element={autenticado ? <Navigate to='/' replace /> : <Login />}
        />
        <Route
          path='/registro'
          element={autenticado ? <Navigate to='/' replace /> : <Register />}
        />
        <Route
          path='/recuperar-contraseña'
          element={
            autenticado ? <Navigate to='/' replace /> : <ForgotPassword />
          }
        />

        {/* Rutas siempre accesibles */}
        <Route path='/' element={<Home />} />
        <Route path='/cursos' element={<Courses />} />
        <Route path='/comunidad' element={<Community />} />
        <Route path='/comunidad/:postId' element={<ShowPost />} />
        <Route path='/certificaciones' element={<Certifications />} />
        <Route path='/eventos' element={<Events />} />
        <Route path='/detalle-evento/:id' element={<DetailEvent />} />
        <Route path='/secretos' element={<Secrets />} />
        <Route path='/lives' element={<Lives />} />
        <Route path='/detalle-live/:id' element={<LiveDetail />} />
        <Route path='/subscripcion' element={<Subscription />} />
        <Route path='/el-salon-de-tus-sueños' element={<Saloon />} />
        <Route path='/detalle-curso/:id' element={<DetailsCourse />} />
        <Route path='/cursos/bysystem/:id' element={<BySystemId />} />
        <Route path='/success-payment-tickets' element={<Success />} />
        <Route
          path='/success-payment-partial'
          element={<SuccessSalonPayment />}
        />
        <Route
          path='/success-payment-subscription'
          element={<SuccessSubscription />}
        />
        <Route path='/error' element={<Error />} />
        <Route path='/detalle-producto/:id' element={<ProductDetailPage />} />
        <Route path='/detalle-orden/:id' element={<DetailOrders />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/suscribirme' element={<SubscriptionScreen />} />
        <Route
          path='/detalle-certificacion/:id'
          element={<CertificationDetail />}
        />
        <Route path='/detalle-modulo/:idModule' element={<ModuleDetail />} />

        {/* Ruta privada */}
        <Route
          path='/mi-perfil'
          element={
            autenticado ? (
              <Profile />
            ) : (
              <Navigate to='/iniciar-sesion' replace />
            )
          }
        />

        {/* 404 */}
        <Route path='*' element={<Navigate to='/notFound' replace />} />
      </Routes>
    </>
  );
}

export default AppRouter;
