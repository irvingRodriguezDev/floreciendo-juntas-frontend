import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useLastPath() {
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;

    // rutas que NO queremos guardar como lastPath
    const excludedPaths = [
      "/iniciar-sesion",
      "/registro",
      "/recuperar-contraseña",
    ];

    if (!excludedPaths.includes(currentPath)) {
      localStorage.setItem("lastPath", currentPath);
    }
  }, [location]);
}
