import React, { useContext } from "react";
import {
  Box,
  Container,
  Typography,
  Divider,
  Button,
  Grid,
} from "@mui/material";
import ProfileHeader from "./ProfileHeader";
import BadgesSection from "./BadgesSection";
import DreamSalonSection from "./DreamSalonSection";
import CertificatesSection from "./CertificatesSection";
import ProfileBanner from "../../components/Banner/ProfileBanner";
import AuthContext from "../../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import UserTicketsTable from "./UserTicketsTable";
// Colores primarios para mantener la identidad visual
const PRIMARY_PINK = "#E53888";
const LIGHT_PINK = "";

const ProfileLayout = () => {
  const { usuario, cerrarSesion } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <Box sx={{ bgcolor: LIGHT_PINK, minHeight: "100vh", py: 13 }}>
      <Container maxWidth='xxl'>
        <ProfileBanner />
        <Grid container spacing={2}>
          <Grid
            size={12}
            sx={{
              display: "flex",
              justifyContent: "end",
              mt: 2,
            }}
          >
            <Button
              onClick={() => cerrarSesion(navigate)}
              variant='contained'
              size='large'
              sx={{ borderRadius: "12px", bgcolor: "#D82F7A" }}
            >
              Cerrar Sesión
            </Button>
          </Grid>
        </Grid>
        {/* 1. Cabecera (Nombre y Rol) */}
        <ProfileHeader usuario={usuario} />
        <Divider sx={{ my: 4, borderColor: PRIMARY_PINK, opacity: 0.8 }} />
        {/* 2. Sección de Insignias */}
        <BadgesSection />
        <Divider sx={{ my: 4, borderColor: PRIMARY_PINK, opacity: 0.8 }} />
        {/* 3. Sección "El Salón de Tus Sueños" */}
        <UserTicketsTable />
        <Divider sx={{ my: 4, borderColor: PRIMARY_PINK, opacity: 0.8 }} />
        {/* 4. Sección de Diplomas y Certificados */}
        <CertificatesSection />
      </Container>
    </Box>
  );
};

export default ProfileLayout;
