import { useContext } from "react";
import { Box, Container, Button, Grid } from "@mui/material";
import ProfileBanner from "../../components/Banner/ProfileBanner";
import AuthContext from "../../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import ProfileTabs from "./ProfileTabs";

// Colores primarios para mantener la identidad visual
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
              mb: 2,
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
        <ProfileTabs />
      </Container>
    </Box>
  );
};

export default ProfileLayout;
