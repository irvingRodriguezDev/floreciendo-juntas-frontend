import React from "react";
import { Box, Container, Typography, Divider } from "@mui/material";
import ProfileHeader from "./ProfileHeader";
import BadgesSection from "./BadgesSection";
import DreamSalonSection from "./DreamSalonSection";
import CertificatesSection from "./CertificatesSection";
import ProfileBanner from "../../components/Banner/ProfileBanner";

// Colores primarios para mantener la identidad visual
const PRIMARY_PINK = "#E53888";
const LIGHT_PINK = "";

const ProfileLayout = () => {
  // Datos ficticios
  const userData = {
    name: "Carolina Tavera",
    // role: "Master Nail Artist & Emprendedora",
    description:
      "Caminando juntas hacia el éxito. Tu perfil de crecimiento y logros en el mundo de las uñas.",
    badgeCount: 5,
    salonTitle: "Mi Estudio Floral",
    certCount: 4,
  };

  return (
    <Box sx={{ bgcolor: LIGHT_PINK, minHeight: "100vh", py: 13 }}>
      <Container maxWidth='xxl'>
        <ProfileBanner />
        {/* <Typography
          variant='h4'
          component='h1'
          textAlign='center'
          color={PRIMARY_PINK}
          mb={4}
          sx={{ fontWeight: 700 }}
        >
          {userData.name}'s Perfil
        </Typography> */}

        {/* 1. Cabecera (Nombre y Rol) */}
        <ProfileHeader
          name={userData.name}
          role={userData.role}
          description={userData.description}
        />

        <Divider sx={{ my: 4, borderColor: PRIMARY_PINK, opacity: 0.8 }} />

        {/* 2. Sección de Insignias */}
        <BadgesSection badgeCount={userData.badgeCount} />

        <Divider sx={{ my: 4, borderColor: PRIMARY_PINK, opacity: 0.8 }} />

        {/* 3. Sección "El Salón de Tus Sueños" */}
        <DreamSalonSection salonTitle={userData.salonTitle} />

        <Divider sx={{ my: 4, borderColor: PRIMARY_PINK, opacity: 0.8 }} />

        {/* 4. Sección de Diplomas y Certificados */}
        <CertificatesSection certCount={userData.certCount} />
      </Container>
    </Box>
  );
};

export default ProfileLayout;
