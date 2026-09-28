import { Box, Container } from "@mui/material";
import ProfileBanner from "../../components/Banner/ProfileBanner";
import ProfileTabs from "./ProfileTabs";

const ProfileLayout = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#FAFAFA", // Fondo limpio para hacer resaltar los contenedores
        minHeight: "100vh",
        pt: { xs: 10, md: 14 },
        pb: 8,
      }}
    >
      <Container maxWidth='xl'>
        {/* Banner Superior con datos del usuario y Cerrar Sesión integrado */}
        <ProfileBanner />

        {/* Tabs de Configuración / Cursos / Membresía */}
        <Box sx={{ mt: 4 }}>
          <ProfileTabs />
        </Box>
      </Container>
    </Box>
  );
};

export default ProfileLayout;
