import { Box } from "@mui/material";
import React from "react";

const LiveBadge = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 16,
        left: 16,
        px: 2,
        py: "6px",
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 800,
        background: "linear-gradient(90deg,#E53888,#FF8FB3)",
        color: "#fff",
        zIndex: 6,
      }}
    >
      🔴 EN VIVO
    </Box>
  );
};

export default LiveBadge;
