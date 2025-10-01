// src/routes/PublicRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

export const PublicRoute = ({ isAuthenticated }) => {
  // Si está autenticado, redirige al dashboard
  // Si no, permite renderizar las rutas hijas (Outlet)
  return isAuthenticated ? <Navigate to='/cursos' replace /> : <Outlet />;
};

PublicRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};
