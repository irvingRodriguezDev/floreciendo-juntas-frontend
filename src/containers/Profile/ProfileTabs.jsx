import React, { useContext, useState } from "react";
import { Box, Tabs, Tab, Paper } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

// Íconos para elevar la UX
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

// Secciones
import ProfileMain from "./ProfileHeader";
import DreamSalonSection from "./DreamSalonSection";
import AddressSection from "./AddressSection";
import Certifications from "../../components/Certifications/Certifications";
import FormationsOnline from "../FormationsOnline/FormationsOnline";
import Store from "./Store/Store";

import AuthContext from "../../context/Auth/AuthContext";

export default function ProfileTabs() {
  const [value, setValue] = useState(0);
  const { usuario } = useContext(AuthContext);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  // 1. CONSTRUCCIÓN DINÁMICA DE PESTAÑAS (Resuelve el bug de índices)
  const tabsList = [
    {
      id: "info",
      label: "Información",
      icon: <PersonOutlineIcon sx={{ fontSize: 20 }} />,
      component: <ProfileMain />,
    },
    {
      id: "salon",
      label: "Mi Salón",
      icon: <StorefrontIcon sx={{ fontSize: 20 }} />,
      component: <DreamSalonSection />,
    },
    {
      id: "addresses",
      label: "Mis Direcciones",
      icon: <LocationOnOutlinedIcon sx={{ fontSize: 20 }} />,
      component: <AddressSection />,
    },
  ];

  // Si la alumna tiene suscripción activa, agregamos dinámicamente las funciones prémium
  if (usuario?.isSubscribed) {
    tabsList.push(
      {
        id: "certifications",
        label: "Certificaciones",
        icon: <WorkspacePremiumOutlinedIcon sx={{ fontSize: 20 }} />,
        component: <Certifications />,
      },
      {
        id: "formations",
        label: "Formaciones Online",
        icon: <SchoolOutlinedIcon sx={{ fontSize: 20 }} />,
        component: <FormationsOnline />,
      },
      {
        id: "store",
        label: "Mi Tienda",
        icon: <ShoppingBagOutlinedIcon sx={{ fontSize: 20 }} />,
        component: <Store />,
      },
    );
  }

  // Animación suave de entrada/salida
  const animation = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
    transition: { duration: 0.3, ease: "easeOut" },
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* BARRA DE PESTAÑAS TIPO PÍLDORA */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: "24px",
          p: 1,
          bgcolor: "#FFFFFF",
          border: "1px solid #FCE7F3",
          boxShadow: "0 10px 30px rgba(229, 56, 136, 0.05)",
          mb: 3,
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant='scrollable'
          scrollButtons='auto'
          aria-label='Pestañas de perfil de usuario'
          TabIndicatorProps={{
            style: { display: "none" }, // Ocultamos la barra clásica para usar estilo cápsula
          }}
          sx={{
            minHeight: "48px",
            "& .MuiTab-root": {
              fontWeight: 600,
              fontSize: "0.95rem",
              textTransform: "none",
              color: "#6B7280",
              px: 2.5,
              py: 1.2,
              minHeight: "48px",
              borderRadius: "16px",
              transition: "all 0.25s ease",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
              "&:hover": {
                color: "#E53888",
                backgroundColor: "#FFF5F7",
              },
            },
            "& .Mui-selected": {
              color: "#FFFFFF !important",
              backgroundColor: "#E53888 !important",
              boxShadow: "0 4px 14px rgba(229, 56, 136, 0.3)",
            },
          }}
        >
          {tabsList.map((tab) => (
            <Tab
              key={tab.id}
              label={tab.label}
              icon={tab.icon}
              iconPosition='start'
            />
          ))}
        </Tabs>
      </Paper>

      {/* CONTENEDOR PRINCIPAL CON ANIMACIÓN */}
      <Paper
        elevation={0}
        sx={{
          bgcolor: "#FFFFFF",
          borderRadius: "28px",
          p: { xs: 2.5, sm: 4 },
          minHeight: 300,
          border: "1px solid #FCE7F3",
          boxShadow: "0 12px 35px rgba(229, 56, 136, 0.04)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <AnimatePresence mode='wait'>
          {tabsList[value] && (
            <motion.div key={tabsList[value].id} {...animation}>
              {tabsList[value].component}
            </motion.div>
          )}
        </AnimatePresence>
      </Paper>
    </Box>
  );
}
