import React, { useContext, useState } from "react";
import { Box, Tabs, Tab, Typography, Paper } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import ProfileMain from "./ProfileHeader";
import BadgesSection from "./BadgesSection";
import UserTicketsTable from "./UserTicketsTable";
import DreamSalonSection from "./DreamSalonSection";
import AddressSection from "./AddressSection";
import Certifications from "../../components/Certifications/Certifications";
import AuthContext from "../../context/Auth/AuthContext";
import Store from "./Store/Store";
// Paleta Floreciendo Juntas 🌸
const colors = {
  background: "#FFF6F9",
  tabBg: "#FFE6EE",
  primary: "#D94885",
  primarySoft: "#F7C6D8",
  textDark: "#8A2E52",
  textSoft: "#AA6B7E",
};

export default function ProfileTabs() {
  const [value, setValue] = useState(0);
  const [view, setView] = useState("invite");
  const { usuario } = useContext(AuthContext);
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  const handleStartRegistration = () => {
    setView("form"); // Al hacer clic, mostramos el formulario
  };
  // Animación
  const animation = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.35, ease: "easeOut" },
  };

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: colors.background,
        borderRadius: 4,
        p: { xs: 2, md: 4 },
        boxShadow: "0 4px 12px rgba(217, 72, 133, 0.12)",
      }}
    >
      {/* Tabs */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          bgcolor: colors.tabBg,
          mb: 3,
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant='scrollable'
          scrollButtons='auto'
          aria-label='scrollable auto tabs example'
          TabIndicatorProps={{
            style: { backgroundColor: "#d82e7a" },
          }}
          sx={{
            "& .MuiTab-root": {
              fontWeight: 600,
              fontSize: "1rem",
              textTransform: "none",
              color: colors.textSoft,
              px: 3,
              py: 1.5,
              fontFamily: "'Poppins', sans-serif",
            },
            "& .Mui-selected": {
              color: "#d82e7a !important",
            },
          }}
        >
          <Tab label='Información' />
          <Tab label='Insignias' />
          <Tab label='Mis Boletos' />
          <Tab label='Mi Salón' />
          <Tab label='Mis Direcciones' />
          {usuario && usuario.isSubscribed && <Tab label='Certificaciones' />}
          {usuario && usuario.isSubscribed && <Tab label='Mi Tienda' />}
          {/* <Tab label='Mis pedidos(tienda)' /> */}
        </Tabs>
      </Paper>

      {/* Contenedor con animación */}
      <Box
        sx={{
          bgcolor: "#FFFFFF",
          borderRadius: 4,
          p: 3,
          minHeight: 200,
          boxShadow: "0 3px 8px rgba(0,0,0,0.04)",
          position: "relative",
        }}
      >
        <AnimatePresence mode='wait'>
          {value === 0 && (
            <motion.div key='t1' {...animation}>
              <ProfileMain />
            </motion.div>
          )}

          {value === 1 && (
            <motion.div key='t2' {...animation}>
              <BadgesSection />
            </motion.div>
          )}

          {value === 2 && (
            <motion.div key='t3' {...animation}>
              <UserTicketsTable />
            </motion.div>
          )}

          {value === 3 && (
            <motion.div key='t3' {...animation}>
              <DreamSalonSection />
            </motion.div>
          )}

          {value === 4 && (
            <motion.div key='t4' {...animation}>
              <AddressSection />
            </motion.div>
          )}

          {value === 5 && usuario?.isSubscribed && (
            <motion.div
              key='certifications'
              {...animation}
              style={{ width: "100%", position: "relative" }} // 👈 Forzar estilos
            >
              <Certifications />
            </motion.div>
          )}

          {value === 6 && usuario?.isSubscribed && (
            <motion.div
              key='store'
              {...animation}
              style={{ width: "100%", position: "relative" }} // 👈 Forzar estilos
            >
              <Store />
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
}
