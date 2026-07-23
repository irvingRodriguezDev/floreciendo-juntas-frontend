import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AuthContext from "../context/Auth/AuthContext"; // Tu contexto

const HeroButtons = () => {
  const { autenticado, usuario } = useContext(AuthContext);

  // Verificamos si la usuaria tiene membresía activa (ajusta según tus campos)
  const tieneMembresiaActiva =
    (usuario?.isSubscribed && usuario?.roleId === 4) ||
    (usuario?.isSubscribed && usuario?.roleId === 1);

  // Función para el scroll suave hacia la sección de cursos
  const handleScrollToCourses = () => {
    const element = document.getElementById("seccion-cursos");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      justifyContent={{ xs: "center", md: "flex-start" }}
      alignItems='center'
    >
      {/* 1. BOTÓN PRINCIPAL (Cambia según el estado del usuario) */}
      {autenticado && tieneMembresiaActiva ? (
        <Link to='/comunidad' style={{ textDecoration: "none" }}>
          <Button
            variant='contained'
            size='large'
            endIcon={<ArrowForwardIcon />}
            sx={{
              backgroundColor: "#FFF",
              color: "#E83E8C",
              fontWeight: 800,
              fontSize: "1rem",
              padding: "12px 28px",
              borderRadius: "50px",
              boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#FFF0F5",
                transform: "translateY(-2px)",
              },
            }}
          >
            Ir a la Comunidad
          </Button>
        </Link>
      ) : (
        <Link to='/suscribirme' style={{ textDecoration: "none" }}>
          <Button
            variant='contained'
            size='large'
            endIcon={<ArrowForwardIcon />}
            sx={{
              backgroundColor: "#FFF",
              color: "#E83E8C",
              fontWeight: 800,
              fontSize: "1rem",
              padding: "12px 28px",
              borderRadius: "50px",
              boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#FFF0F5",
                transform: "translateY(-2px)",
              },
            }}
          >
            {autenticado ? "Activar Membresía por $200" : "Unirme por $200/mes"}
          </Button>
        </Link>
      )}

      {/* 2. BOTÓN SECUNDARIO: Siempre visible para hacer scroll a los cursos */}
      <Button
        variant='outlined'
        size='large'
        onClick={handleScrollToCourses}
        sx={{
          color: "#FFF",
          borderColor: "rgba(255, 255, 255, 0.8)",
          borderWidth: "2px",
          fontWeight: 700,
          fontSize: "0.95rem",
          padding: "11px 24px",
          borderRadius: "50px",
          textTransform: "none",
          "&:hover": {
            borderColor: "#FFF",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            borderWidth: "2px",
          },
        }}
      >
        Explorar Cursos
      </Button>
    </Stack>
  );
};

export default HeroButtons;
