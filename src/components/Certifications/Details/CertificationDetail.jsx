import { useContext, useEffect } from "react";
import Layout from "../../Layout/Layout";
import { Grid, Typography, Box, Chip, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import CertificationsContext from "../../../context/Certifications/CertificationsContext";
import PinkSpinner from "../../Loading/PinkSpinner";
import FormatDate from "../../../utils/FormatDate";
import ModulesCard from "../Modules/ModulesCard";

const CertificationDetail = () => {
  const { id } = useParams();
  const { detailsCertificationById, certification } = useContext(
    CertificationsContext,
  );
  //modal entregable

  useEffect(() => {
    detailsCertificationById(id);
  }, [id]);

  if (!certification) {
    return (
      <Layout>
        <PinkSpinner label='Preparando tu experiencia...' />
      </Layout>
    );
  }

  return (
    <Layout>
      <Box
        sx={{
          minHeight: "100vh",
          background: "transparent",
        }}
      >
        {/* 🌸 HERO PREMIUM */}
        <Box
          sx={{
            position: "relative",
            height: { xs: 300, md: 420 },
            backgroundImage: `url(${certification.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Overlay elegante */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(244, 182, 209, 0.75), rgb(255, 244, 250))",
            }}
          />

          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            sx={{
              position: "relative",
              textAlign: "center",
              color: "#fff",
              px: 3,
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "26px", md: "42px" },
                fontWeight: 700,
                letterSpacing: 1.5,
                color: "#E53888",
              }}
            >
              {certification.name}
            </Typography>

            <Typography sx={{ mt: 2, opacity: 0.9, color: "#E53888" }}>
              Una experiencia diseñada para tu crecimiento 🌷
            </Typography>

            <Box mt={3}>
              <Chip
                label={`Disponible del ${FormatDate(
                  certification.start_date,
                )} al ${FormatDate(certification.end_date)}`}
                sx={{
                  fontWeight: "bold",
                  bgcolor: "rgba(202, 111, 166, 0.15)",
                  color: "#E53888",
                  backdropFilter: "blur(10px)",
                  textTransform: "uppercase",
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* 💎 CONTENIDO CENTRAL */}
        <Grid
          container
          spacing={6}
          sx={{
            px: { xs: 3, md: 10 },
            mt: -8,
            position: "relative",
            zIndex: 2,
            display: "flex",
            justifyContent: "center",
            mb: 10,
          }}
        >
          {/* Card flotante glass */}

          {/* 🌿 MÓDULOS PREMIUM */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: "28px",
                background: "rgba(255,255,255,0.75)",
                backdropFilter: "blur(18px)",
                boxShadow: "0 20px 60px rgba(216,47,122,0.08)",
              }}
            >
              <Typography sx={{ fontWeight: 500 }}>
                Para completar esta certificación necesitas alcanzar{" "}
                <strong>{certification.min_passing_score} puntos.</strong>
              </Typography>

              <Typography sx={{ mt: 1, fontWeight: 600, color: "#D82F7A" }}>
                Hasta ahora has florecido con{" "}
                <strong>{certification.total_points} puntos.</strong> 🌸
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: "28px",
                background: "rgba(255,255,255,0.75)",
                backdropFilter: "blur(18px)",
                boxShadow: "0 20px 60px rgba(216,47,122,0.08)",
              }}
            >
              <Typography
                sx={{
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#D82F7A",
                  mb: 5,
                  letterSpacing: 0.5,
                }}
              >
                Camino de aprendizaje 🌿
              </Typography>

              {certification.modules?.map((module, index) => {
                return <ModulesCard module={module} index={index} />;
              })}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default CertificationDetail;
