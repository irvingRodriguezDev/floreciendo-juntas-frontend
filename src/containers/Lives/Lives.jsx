import React, { useContext, useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";

import LivesBanner from "../../components/Banner/LivesBanner";
import Layout from "../../components/Layout/Layout";
import LivesContext from "../../context/Lives/LivesContext";
import LiveCard from "../../components/lives/LiveCard";
import SkeletonLive from "../../components/lives/SkeletonLive";
import LivesEmpty from "../../components/lives/LivesEmpty";

const PRIMARY_PINK = "#E53888";

const LivesPage = () => {
  const { lives = [], getAllLives } = useContext(LivesContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLives = async () => {
      setLoading(true);
      try {
        if (getAllLives) await getAllLives();
      } catch (error) {
        console.error("Error al obtener los eventos en vivo:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLives();
  }, []);

  return (
    <Layout>
      <Box sx={{ minHeight: "100vh", pb: { xs: 8, md: 12 } }}>
        {/* 🌸 BANNER PRINCIPAL */}
        <LivesBanner />

        {/* ⏳ ESTADO DE CARGA (SKELETONS) */}
        {loading && (
          <Grid
            container
            spacing={{ xs: 2.5, md: 3 }}
            sx={{ px: { xs: 2, sm: 4, md: 8, lg: 10 }, mt: { xs: 3, md: 5 } }}
          >
            {[1, 2, 3, 4].map((item) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item}>
                <SkeletonLive />
              </Grid>
            ))}
          </Grid>
        )}

        {/* 🌷 ESTADO VACÍO */}
        {!loading && lives.length === 0 && <LivesEmpty />}

        {/* 🌸 GRID DE TRANSMISIONES */}
        {!loading && lives.length > 0 && (
          <Grid
            container
            spacing={{ xs: 2.5, md: 3.5 }}
            sx={{
              px: { xs: 2, sm: 4, md: 8, lg: 10 },
              mt: { xs: 3, md: 5 },
            }}
          >
            {lives.map((live, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={live.id || i}>
                <LiveCard live={live} i={i} PRIMARY_PINK={PRIMARY_PINK} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Layout>
  );
};

export default LivesPage;
