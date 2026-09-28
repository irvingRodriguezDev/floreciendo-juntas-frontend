import { CircularProgress, Box } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

const Spinner = ({ size = 60, message = "Cargando..." }) => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "300px",
        width: "100%",
        color: "#e91e63",
      }}
    >
      <CircularProgress size={size} thickness={4} sx={{ color: "#e91e63" }} />
      <Box mt={2} fontWeight={500}>
        {message}
      </Box>
    </Box>
  );
};

export default Spinner;
