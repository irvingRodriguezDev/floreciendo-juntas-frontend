// StickyGrid.jsx
import React from "react";
import { Box, Grid } from "@mui/material";

const StickyGrid = () => {
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      {/* Contenido izquierdo que se desplaza normalmente */}
      <Box sx={{ flex: 1, height: "1500px", bgcolor: "#333", p: 2 }}>
        Contenido largo lado izquierdo
      </Box>

      {/* Contenedor derecho con sticky */}
      <Box sx={{ width: 300 }}>
        <Box
          sx={{
            position: "sticky",
            top: 20, // distancia desde arriba
          }}
        >
          {[1, 2, 3, 4].map((item) => (
            <Box
              key={item}
              sx={{
                bgcolor: "#111",
                color: "white",
                p: 3,
                mb: 2,
                borderRadius: 2,
                textAlign: "center",
              }}
            >
              Item {item}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default StickyGrid;
