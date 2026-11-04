import React from "react";
import { Box, FormControlLabel, Switch, Typography } from "@mui/material";
import { useHoliday } from "../../context/Holiday/HolidayContext";
const HolidaySwitch = () => {
  const { isHolidayMode, toggleHolidayMode } = useHoliday();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#FFF5F8",
        border: "1px solid #F3B6D1",
        borderRadius: "20px",
        px: 2,
        py: 0.8,
        boxShadow: "0 2px 8px rgba(229, 56, 136, 0.08)",
      }}
    >
      <FormControlLabel
        control={
          <Switch
            checked={isHolidayMode}
            onChange={toggleHolidayMode}
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: "#E53888",
                "&:hover": {
                  backgroundColor: "rgba(229, 56, 136, 0.08)",
                },
              },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                backgroundColor: "#E53888",
              },
            }}
          />
        }
        label={
          <Typography
            sx={{
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "#C2185B",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            🎄 Modo Navidad {isHolidayMode ? "Activo" : "Inactivo"}
          </Typography>
        }
      />
    </Box>
  );
};

export default HolidaySwitch;
