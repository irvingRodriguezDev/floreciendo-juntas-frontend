import React, { useContext } from "react";
import Layout from "../../components/Layout/Layout";
import { Backdrop, Box, Button, Grid, Paper, Typography } from "@mui/material";
import DistributionMap from "./DistributionMap";
import StoreDiscoveryPanel from "./StoreDiscoveryPanel";
import MapBenefitsPanel from "./MapBenefitsPanel";
import AuthContext from "../../context/Auth/AuthContext";
import { Link } from "react-router-dom";
const Distribution = () => {
  const [selectedStore, setSelectedStore] = React.useState(null);
  const { autenticado } = useContext(AuthContext);
  const handleStoreSelect = (store) => {
    setSelectedStore(store);
  };

  return (
    <Layout>
      {autenticado ? (
        <Grid container spacing={3} sx={{ p: { xs: 1, md: 3 }, mb: 10 }}>
          <Grid size={12}>
            <MapBenefitsPanel />
          </Grid>
          {/* Panel Izquierdo: Lista (4 columnas en PC, 12 en Móvil) */}
          <Grid
            size={{ xs: 12, md: 4 }}
            sx={{ height: { xs: "400px", md: "600px" } }}
          >
            <Paper
              elevation={0}
              sx={{
                height: "100%",
                borderRadius: "24px",
                overflow: "hidden",
                border: "1px solid #eee",
              }}
            >
              <StoreDiscoveryPanel onSelectStore={handleStoreSelect} />
            </Paper>
          </Grid>

          {/* Panel Derecho: Mapa (8 columnas en PC, 12 en Móvil) */}
          <Grid
            size={{ xs: 12, md: 8 }}
            sx={{ height: { xs: "600px", md: "600px" } }}
          >
            <Paper
              elevation={0}
              sx={{ height: "100%", borderRadius: "24px", overflow: "hidden" }}
            >
              <DistributionMap externalSelected={selectedStore} />
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <Backdrop
          open
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 5,
            background: "rgba(255,240,247,0.8)",
            backdropFilter: "blur(8px)",
            overflowY: "hidden",
            height: "100vh",
          }}
        >
          <Paper
            sx={{
              p: 4,
              borderRadius: "20px",
              maxWidth: 620,
              textAlign: "center",
            }}
          >
            <Typography
              variant='h5'
              fontWeight='bold'
              sx={{ color: "#D82E7A", mb: 1 }}
            >
              Atención 💗
            </Typography>

            <Typography variant='body1' sx={{ color: "#555" }}>
              Para poder descubrir los puntos de distribución cercanos,
              <br /> debes
              {!autenticado && <strong> iniciar sesión</strong>}
            </Typography>

            {!autenticado && (
              <Link to='/iniciar-sesion'>
                <Button
                  variant='contained'
                  sx={{ bgcolor: "#D82E7A", borderRadius: "12px", mt: 2 }}
                >
                  Iniciar sesión
                </Button>
              </Link>
            )}
          </Paper>
        </Backdrop>
      )}
    </Layout>
  );
};

export default Distribution;
