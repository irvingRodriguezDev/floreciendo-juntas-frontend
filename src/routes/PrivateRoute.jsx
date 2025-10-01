// src/routes/PrivateRoute.jsx
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

export const PrivateRoute = ({ isAuthenticated }) => {
  const location = useLocation();

  // Guardar la última ruta visitada
  if (!isAuthenticated) {
    localStorage.setItem("lastPath", location.pathname);
  }

  // Si está autenticado, renderiza las rutas hijas
  // Si no, redirige a login
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to='/iniciar-sesion' replace />
  );
};

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};
