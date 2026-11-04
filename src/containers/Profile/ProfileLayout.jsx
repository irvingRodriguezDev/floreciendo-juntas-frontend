import { Box, Container } from "@mui/material";
import ProfileBanner from "../../components/Banner/ProfileBanner";
import ProfileTabs from "./ProfileTabs";
import HolidaySwitch from "../../components/Layout/HolidaySwitch";

const ProfileLayout = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#FEF3F9", // Fondo limpio para hacer resaltar los contenedores
        minHeight: "100vh",
        pt: { xs: 10, md: 14 },
        pb: 8,
      }}
    >
      <Container maxWidth='xl'>
        {/* Banner Superior con datos del usuario y Cerrar Sesión integrado */}
        <ProfileBanner />
        {/* 🎄 BARRA FLOTANTE O DE ACCESO RÁPIDO PARA EL SWITCH (Opcional, ponlo donde prefieras) */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", px: 3, pt: 1 }}>
          <HolidaySwitch />
        </Box>
        {/* Tabs de Configuración / Cursos / Membresía */}
        <Box sx={{ mt: 4 }}>
          <ProfileTabs />
        </Box>
      </Container>
    </Box>
  );
};

export default ProfileLayout;
