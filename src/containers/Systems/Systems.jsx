import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
  CircularProgress,
} from "@mui/material";
import SystemContext from "../../context/System/SystemContext";
import { useEffect, useContext, useState } from "react";
import TopCourses from "../../components/courses/topCourses/TopCourses";

export default function SystemsToggleButtons() {
  const { systems, getAllSystems } = useContext(SystemContext);
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0); // Índice seleccionado (como value en tabs)
  const [loading, setLoading] = useState(true);

  const handleSelection = (event, newIndex) => {
    if (newIndex !== null) {
      // null si se deselecciona, pero usamos exclusivo
      setSelectedIndex(newIndex);
    }
  };

  useEffect(() => {
    const fetchSystems = async () => {
      try {
        setLoading(true);
        await getAllSystems();
        // Opcional: Si quieres resetear selección al fetch, descomenta:
        // setSelectedIndex(0);
      } catch (error) {
        console.error("Error fetching systems:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSystems();
  }, [getAllSystems]);

  if (loading || !systems) {
    return (
      <Box
        sx={{
          bgcolor: "background.paper",
          width: "100%",
          borderRadius: "12px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 200,
          p: 3,
        }}
      >
        <CircularProgress color='primary' />
      </Box>
    );
  }

  if (systems.length === 0) {
    return (
      <Box
        sx={{
          bgcolor: "background.paper",
          width: "100%",
          borderRadius: "12px",
          p: 3,
          textAlign: "center",
        }}
      >
        <Typography color='text.secondary'>
          No hay sistemas disponibles.
        </Typography>
      </Box>
    );
  }

  const getContent = (index, systemName) => {
    switch (index) {
      case 0:
        return <TopCourses key={`content-0`} />;
      case 1:
        return (
          <Typography key={`content-1`}>Contenido para {systemName}</Typography>
        ); // Placeholder; reemplaza
      case 2:
        return (
          <Typography key={`content-2`}>
            Otro contenido para {systemName}
          </Typography>
        );
      default:
        return (
          <Typography key={`content-${index}`}>
            Contenido genérico para {systemName}
          </Typography>
        );
    }
  };

  const selectedSystem = systems[selectedIndex];

  return (
    <Box
      sx={{
        bgcolor: "#FBFAFF",
        width: "100%",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      {/* Grupo de Toggle Buttons (como chips/botones navegacionales) */}
      <ToggleButtonGroup
        value={selectedIndex}
        exclusive // Solo uno seleccionado a la vez
        onChange={handleSelection}
        orientation='horizontal' // Horizontal por defecto; wrap en responsive
        aria-label='selección de sistemas'
        sx={{
          backgroundColor: "#FBFAFF",
          borderRadius: "12px 12px 0 0", // Arriba redondeado
          p: 0.5,
          gap: 0.5, // Espacio entre botones
          width: "100%",
          justifyContent: "center", // Centra si hay espacio
          flexWrap: "wrap", // Envuelve en pantallas pequeñas para evitar scroll
          // Si quieres scroll en lugar de wrap: agrega overflowX: 'auto'
        }}
      >
        {systems.map((s, index) => (
          <ToggleButton
            key={s.id || index}
            value={index}
            sx={{
              fontWeight: "bold",
              fontSize: "1rem", // Compacto y responsive (16px)
              px: 2,
              py: 1,
              borderRadius: "20px", // Alto para look "chip-like" (ajusta a 8px para más rectangular)
              minWidth: 100, // Ancho mínimo para touch
              color: "text.secondary",
              "&.Mui-selected": {
                color: "common.white",
                backgroundColor: "#E893B5", // #E893B5 para seleccionado
                boxShadow: 1,
              },
              "&:hover": {
                backgroundColor: "#E893B5",
              },
              // Transición suave
              transition: "all 0.2s ease",
            }}
          >
            {s.name}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      {/* Contenido del seleccionado */}
      <Box
        sx={{
          p: 3,
          minHeight: 200,
          backgroundColor:
            selectedIndex === 0 ? "#FBFAFF" : "background.default", // Fondo especial para el primero
          // Título opcional basado en selección
          "& > *:first-child": {
            mb: 2,
            fontWeight: "bold",
            fontSize: "1.5rem", // Título más pequeño
            color: "primary.main",
          },
        }}
      >
        {/* Título dinámico */}
        <Typography variant='h6'>
          {selectedSystem?.name || "Contenido"}
        </Typography>
        {getContent(selectedIndex, selectedSystem?.name)}
      </Box>
    </Box>
  );
}
