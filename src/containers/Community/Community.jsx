import React, { useContext } from "react";
import { Typography, Grid, Paper, Box, Stack } from "@mui/material";
import Layout from "../../components/Layout/Layout";
import AuthContext from "../../context/Auth/AuthContext";
import CommunityRulesAccordion from "./CommunityRulesAccordeon";
import TabsTypeCommunity from "../../components/Community/TabsTypeCommunity";
import BlockScreen from "./BlockScreen";

const Community = () => {
  const { autenticado, usuario } = useContext(AuthContext);

  // Sincronizado con la verificación de rol y suscripción
  const isSuscribed =
    Boolean(usuario?.isSubscribed && usuario?.roleId === 4) ||
    Boolean(usuario?.isSubscribed && usuario?.roleId === 1);
  const isAuthorized = autenticado && isSuscribed;

  return (
    <Layout>
      <Box
        sx={{
          py: { xs: 2, sm: 3 },
          px: { xs: 1.5, sm: 2 },
          maxWidth: "lg",
          mx: "auto",
          position: "relative",
          height: !isAuthorized
            ? {
                xs: "120dvh",
                sm: "100dvh",
                md: "100dvh",
                lg: "100dvh",
                xl: "100dvh",
              }
            : "auto",
          overflow: !isAuthorized ? "hidden" : "visible",
        }}
      >
        {/* HEADER COMPACTO CON REGLAS EMBEBIDAS */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 2.5 },
            mb: 2.5,
            borderRadius: "20px",
            bgcolor: "#FFFFFF",
            border: "1px solid rgba(229, 56, 136, 0.12)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
          }}
        >
          <Box
            display='flex'
            flexDirection={{ xs: "column", md: "row" }}
            justifyContent='space-between'
            alignItems={{ xs: "flex-start", md: "center" }}
            gap={2}
          >
            {/* Título y Subtítulo */}
            <Box>
              <Typography
                variant='caption'
                sx={{
                  color: "#E53888",
                  fontWeight: "800",
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  display: "block",
                }}
              >
                Comunidad Exclusiva
              </Typography>
              <Typography
                variant='h4'
                sx={{
                  fontWeight: 900,
                  color: "#1F2937",
                  fontSize: { xs: "1.6rem", sm: "2rem" },
                  lineHeight: 1.2,
                }}
              >
                Floreciendo Juntas 🌷
              </Typography>
              <Typography
                variant='body2'
                sx={{ color: "#6B7280", mt: 0.5, fontSize: "0.92rem" }}
              >
                Un espacio seguro para compartir, aprender y crecer entre
                colegas.
              </Typography>
            </Box>

            {/* Reglas de la Comunidad Compactas */}
            <Box
              sx={{ width: { xs: "100%", md: "auto" }, minWidth: { md: 280 } }}
            >
              <CommunityRulesAccordion />
            </Box>
          </Box>
        </Paper>

        {/* CONTENIDO PRINCIPAL */}
        <Grid container justifyContent='center'>
          <Grid size={{ xs: 12, md: 10, lg: 7 }}>
            <TabsTypeCommunity />
          </Grid>
        </Grid>

        {/* BLOQUEO LOCALIZADO */}
        {!isAuthorized && (
          <BlockScreen autenticado={autenticado} usuario={usuario} />
        )}
      </Box>
    </Layout>
  );
};

export default Community;
