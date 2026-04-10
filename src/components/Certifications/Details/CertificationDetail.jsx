import { useContext, useEffect } from "react";
import Layout from "../../Layout/Layout";
import { Grid, Typography, Box, Chip, Paper, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import CertificationsContext from "../../../context/Certifications/CertificationsContext";
import PinkSpinner from "../../Loading/PinkSpinner";
import FormatDate from "../../../utils/FormatDate";
import ModulesCard from "../Modules/ModulesCard";
import confetti from "canvas-confetti";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
const CertificationDetail = () => {
  const { id } = useParams();
  const {
    detailsCertificationById,
    certification,
    DownloadCertificate,
    DownloadDiploma,
  } = useContext(CertificationsContext);
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
  const launchSuccessConfetti = () => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#DA327C", "#FADADD", "#FFFFFF"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#DA327C", "#FADADD", "#FFFFFF"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };
  useEffect(() => {
    if (
      certification &&
      certification.total_points > certification.min_passing_score &&
      certification.evaluated_modules === certification.total_modules &&
      certification.certificate !== null
    ) {
      // Un pequeño delay de 500ms para que la página termine de animarse y el usuario lo vea
      const timer = setTimeout(() => {
        launchSuccessConfetti();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [certification]);
  const handleDownload = (reason) => {
    launchSuccessConfetti(); // Volvemos a celebrar al hacer clic
    if (reason === "certificado") {
      DownloadCertificate(certification.id, certification.name);
    } else if ((reason = "diploma")) {
      DownloadDiploma(certification.id, certification.name);
    }
  };

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
            height: { xs: 300, md: 820 },
            backgroundImage: certification.image
              ? `url(${certification.image})`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "top",
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

            <Box
              mt={3}
              display='flex'
              justifyContent='center'
              sx={{ mb: { xs: 13, md: 2 } }}
            >
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

                  height: "auto",
                  "& .MuiChip-label": {
                    whiteSpace: "normal",
                    display: "block",
                    textAlign: "center",
                    py: 1,
                  },

                  maxWidth: {
                    xs: "100%",
                    sm: "80%",
                    md: "fit-content",
                  },
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
            mt: { xs: -10, md: -38 },
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
              {/* 🏆 SECCIÓN DE LOGROS (CERTIFICADO Y DIPLOMA) */}
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}
              >
                {/* 1. Bloque de Certificado (Aprobación Total) */}
                {certification.total_points > certification.min_passing_score &&
                  certification.evaluated_modules ===
                    certification.total_modules &&
                  certification.certificate !== null && (
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        background:
                          "linear-gradient(135deg, #fff5f8 0%, #ffffff 100%)",
                        borderRadius: "20px",
                        border: "2px solid #fce4ec",
                        textAlign: "center",
                      }}
                    >
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant='h5'
                          sx={{
                            color: "#DA327C",
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 1,
                          }}
                        >
                          <AutoAwesomeIcon /> ¡Tu talento ha florecido!
                        </Typography>
                        <Typography
                          variant='body2'
                          sx={{ color: "#555", mt: 1, fontStyle: "italic" }}
                        >
                          "Felicidades por aprobar con excelencia. Tu esfuerzo
                          te ha convertido en una experta."
                        </Typography>
                      </Box>

                      <Button
                        onClick={() => handleDownload("certificado")}
                        variant='contained'
                        size='large'
                        sx={{
                          bgcolor: "#DA327C",
                          borderRadius: "12px",
                          px: 6,
                          textTransform: "none",
                          fontSize: "1.1rem",
                          "&:hover": { bgcolor: "#b82a68" },
                        }}
                      >
                        Descargar Certificado de Aprobación
                      </Button>
                    </Paper>
                  )}

                {/* 2. Bloque de Diploma (Participación - 4 módulos o más) */}
                {certification.evaluated_modules >= 6 && (
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: "16px",
                      border: "1px dashed #DA327C",
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 2,
                      bgcolor: "rgba(218, 50, 124, 0.03)",
                    }}
                  >
                    <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
                      <Typography sx={{ fontWeight: 700, color: "#DA327C" }}>
                        ¡Diploma Disponible! 📜
                      </Typography>
                      <Typography variant='caption' sx={{ color: "#666" }}>
                        Has completado {certification.evaluated_modules}{" "}
                        módulos. Ya puedes descargar tu diploma de
                        participación.
                      </Typography>
                    </Box>
                    <Button
                      onClick={() => handleDownload("diploma")}
                      variant='outlined'
                      sx={{
                        color: "#DA327C",
                        borderColor: "#DA327C",
                        borderRadius: "10px",
                        textTransform: "none",
                        fontWeight: "bold",
                        "&:hover": {
                          borderColor: "#b82a68",
                          bgcolor: "rgba(218, 50, 124, 0.05)",
                        },
                      }}
                    >
                      Descargar Diploma
                    </Button>
                  </Box>
                )}
              </Box>

              {/* 📊 INFORMACIÓN DE PUNTOS */}
              <Box sx={{ borderTop: "1px solid #f0f0f0", pt: 3 }}>
                <Typography sx={{ fontWeight: 500, color: "#444" }}>
                  Para completar esta certificación necesitas alcanzar{" "}
                  <strong style={{ color: "#000" }}>
                    {certification.min_passing_score} puntos.
                  </strong>
                </Typography>

                <Typography
                  sx={{
                    mt: 1,
                    fontWeight: 600,
                    color: "#D82F7A",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  Hasta ahora has florecido con{" "}
                  <strong>{certification.total_points} puntos.</strong> 🌸
                </Typography>
              </Box>
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
              {certification.modules?.map((module, index, array) => (
                <ModulesCard
                  key={module.id}
                  module={module}
                  index={index}
                  total={array.length}
                />
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default CertificationDetail;
