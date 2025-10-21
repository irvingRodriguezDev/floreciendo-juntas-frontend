import React, { useContext } from "react";
import { Box, Container, Typography, Divider } from "@mui/material";
import ProfileHeader from "./ProfileHeader";
import BadgesSection from "./BadgesSection";
import DreamSalonSection from "./DreamSalonSection";
import CertificatesSection from "./CertificatesSection";
import ProfileBanner from "../../components/Banner/ProfileBanner";
import AuthContext from "../../context/Auth/AuthContext";
// Colores primarios para mantener la identidad visual
const PRIMARY_PINK = "#E53888";
const LIGHT_PINK = "";

const ProfileLayout = () => {
  const { usuario } = useContext(AuthContext);

  return (
    <Box sx={{ bgcolor: LIGHT_PINK, minHeight: "100vh", py: 13 }}>
      <Container maxWidth='xxl'>
        <ProfileBanner />
        {/* 1. Cabecera (Nombre y Rol) */}
        <ProfileHeader usuario={usuario} />
        <Divider sx={{ my: 4, borderColor: PRIMARY_PINK, opacity: 0.8 }} />
        {/* 2. Sección de Insignias */}
        {/* <BadgesSection badgeCount={userData.badgeCount} /> */}
        <Divider sx={{ my: 4, borderColor: PRIMARY_PINK, opacity: 0.8 }} />
        {/* 3. Sección "El Salón de Tus Sueños" */}
        {/* <DreamSalonSection salonTitle={userData.salonTitle} /> */}
        <Divider sx={{ my: 4, borderColor: PRIMARY_PINK, opacity: 0.8 }} />
        {/* 4. Sección de Diplomas y Certificados */}
        {/* <CertificatesSection certCount={userData.certCount} /> */}
      </Container>
    </Box>
  );
};

export default ProfileLayout;
