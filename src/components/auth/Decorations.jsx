import { Box } from "@mui/material";
import React from "react";

const Decorations = () => {
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: { xs: "-100px", md: "-15%" },
          left: { xs: "-100px", md: "-10%" },
          width: { xs: 400, md: 800 },
          height: { xs: 400, md: 800 },
          borderRadius: "50%",
          border: "4px solid #D82E7A",
          opacity: { xs: 0.1, md: 0.15 },
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: { xs: "50%", md: "-5%" },
          left: { xs: "unset", md: "5%" },
          width: { xs: 300, md: 600 },
          height: { xs: 300, md: 600 },
          borderRadius: "50%",
          backgroundColor: "#FF69B4",
          opacity: { xs: 0.05, md: 0.08 },
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: { xs: "5%", md: "10%" },
          right: { xs: "5%", md: "10%" },
          width: { xs: 40, md: 80 },
          height: { xs: 40, md: 80 },
          backgroundColor: "#D82E7A",
          transform: "rotate(45deg)",
          opacity: { xs: 0.2, md: 0.3 },
          zIndex: 0,
          borderRadius: "8px",
        }}
      />
    </>
  );
};

export default Decorations;
