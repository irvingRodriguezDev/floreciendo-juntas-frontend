import React, { useContext, useEffect } from "react";
import CertificationsContext from "../../context/Certifications/CertificationsContext";
import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Box,
  Chip,
} from "@mui/material";
import { motion } from "framer-motion";
import FormatDate from "../../utils/FormatDate";
import { Link } from "react-router-dom";
import NoCertifications from "./NoCertifications";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";

const PRIMARY_PINK = "#E53888";

const Certifications = () => {
  const { certifications, getAllCertificationsAvailable } = useContext(
    CertificationsContext,
  );

  useEffect(() => {
    getAllCertificationsAvailable();
  }, []);

  // Estado si no hay certificaciones disponibles
  if (!certifications || certifications.length === 0) {
    return <NoCertifications />;
  }

  return (
    <Box sx={{ pt: 1, pb: 4 }}>
      {/* TÍTULO Y SUBTÍTULO */}
      <Box textAlign='center' mb={4}>
        <Box
          sx={{
            display: "inline-flex",
            p: 1.5,
            borderRadius: "50%",
            backgroundColor: "#FFF1F2",
            color: PRIMARY_PINK,
            mb: 1.5,
          }}
        >
          <WorkspacePremiumOutlinedIcon sx={{ fontSize: 32 }} />
        </Box>

        <Typography
          variant='h5'
          sx={{
            fontSize: { xs: "1.4rem", md: "1.75rem" },
            fontWeight: 800,
            color: "#1F2937",
            letterSpacing: "-0.3px",
          }}
        >
          Certificaciones Disponibles
        </Typography>

        <Typography
          variant='body2'
          sx={{
            mt: 0.5,
            color: "#6B7280",
            fontSize: { xs: "0.9rem", md: "0.95rem" },
          }}
        >
          Sigue creciendo, aprendiendo y floreciendo con nosotras ✨
        </Typography>
      </Box>

      {/* GRID DE CERTIFICACIONES */}
      <Grid container spacing={3}>
        {certifications.map((c, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={c.id || index}>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
            >
              <Card
                sx={{
                  borderRadius: "22px",
                  border: "1px solid #F3F4F6",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  "&:hover": {
                    borderColor: "#FCE7F3",
                    boxShadow: "0 12px 30px rgba(229, 56, 136, 0.15)",
                  },
                }}
              >
                {/* IMAGEN DE LA CERTIFICACIÓN */}
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component='img'
                    image={c.image}
                    alt={c.name}
                    sx={{
                      height: 290,
                      objectFit: "cover",
                    }}
                  />

                  {/* ETIQUETA FLOTANTE */}
                  <Chip
                    label='Disponible'
                    size='small'
                    sx={{
                      position: "absolute",
                      top: 14,
                      left: 14,
                      bgcolor: "rgba(255, 255, 255, 0.9)",
                      color: PRIMARY_PINK,
                      fontWeight: 800,
                      fontSize: "0.75rem",
                      backdropFilter: "blur(8px)",
                      border: "1px solid #FCE7F3",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                    }}
                  />
                </Box>

                {/* CONTENIDO */}
                <CardContent
                  sx={{
                    p: 2.5,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    flexGrow: 1,
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 800,
                        fontSize: "1.1rem",
                        color: "#1F2937",
                        mb: 1,
                        lineHeight: 1.3,
                      }}
                    >
                      {c.name}
                    </Typography>

                    <Typography
                      variant='body2'
                      sx={{
                        fontSize: "0.85rem",
                        color: "#6B7280",
                        mb: 2.5,
                        backgroundColor: "#FAFAFA",
                        p: 1.2,
                        borderRadius: "12px",
                        border: "1px solid #F3F4F6",
                      }}
                    >
                      <Box
                        component='span'
                        sx={{ fontWeight: 700, color: "#374151" }}
                      >
                        Disponible del:
                      </Box>{" "}
                      {FormatDate(c.start_date)} al {FormatDate(c.end_date)}
                    </Typography>
                  </Box>

                  {/* BOTÓN IR AL DETALLE */}
                  <Button
                    component={Link}
                    to={`/detalle-certificacion/${c.id}`}
                    fullWidth
                    variant='contained'
                    sx={{
                      borderRadius: "50px",
                      py: 1.1,
                      fontWeight: 700,
                      textTransform: "none",
                      fontSize: "0.88rem",
                      backgroundColor: PRIMARY_PINK,
                      color: "#FFFFFF",
                      boxShadow: "0 4px 14px rgba(229, 56, 136, 0.22)",
                      "&:hover": {
                        backgroundColor: "#CF2C75",
                        boxShadow: "0 6px 18px rgba(229, 56, 136, 0.32)",
                      },
                    }}
                  >
                    Ver detalle
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Certifications;
