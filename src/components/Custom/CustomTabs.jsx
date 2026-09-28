import React, { useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";

const CustomTabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Encabezado de Tabs */}
      <Tabs
        value={activeTab}
        onChange={handleChange}
        variant='scrollable'
        scrollButtons
        allowScrollButtonsMobile
        TabIndicatorProps={{
          style: {
            backgroundColor: "#ec4899", // Rosa personalizado
            height: "4px",
            borderRadius: "4px",
          },
        }}
        sx={{
          "& .MuiTab-root": {
            textTransform: "none",
            fontWeight: "bold",
            color: "#6b7280",
            fontSize: "16px",
            "&.Mui-selected": {
              color: "#ec4899",
            },
          },
        }}
      >
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.label} />
        ))}
      </Tabs>

      {/* Contenido de Tabs */}
      <Box sx={{ mt: 3 }}>
        {tabs.map((tab, index) => (
          <Box
            key={index}
            role='tabpanel'
            hidden={activeTab !== index}
            sx={{ animation: "fadeIn 0.3s ease-in-out" }}
          >
            {activeTab === index && (
              <Typography component='div'>{tab.content}</Typography>
            )}
          </Box>
        ))}
      </Box>

      {/* Animación opcional */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Box>
  );
};

export default CustomTabs;
