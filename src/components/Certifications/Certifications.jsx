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

const Certifications = () => {
  const { certifications, getAllCertificationsAvailable } = useContext(
    CertificationsContext,
  );

  useEffect(() => {
    getAllCertificationsAvailable();
  }, []);

  return (
    <Box
      sx={{
        py: 6,
        px: 3,
        background: "linear-gradient(180deg, #FFF7FB 0%, #FFFFFF 60%)",
      }}
    >
      {/* Título */}
      <Box textAlign='center' mb={5}>
        {certifications.length > 0 ? (
          <>
            <Typography
              sx={{
                fontSize: { xs: "26px", md: "32px" },
                fontWeight: 700,
                color: "#D82F7A",
                letterSpacing: 1,
              }}
            >
              🌸 Certificaciones Disponibles
            </Typography>
            <Typography
              sx={{
                mt: 1,
                color: "#777",
                fontSize: "15px",
              }}
            >
              Sigue creciendo, aprendiendo y floreciendo con nosotras
            </Typography>
          </>
        ) : (
          <NoCertifications />
        )}
      </Box>

      {/* Grid */}
      <Grid container spacing={4}>
        {certifications &&
          certifications.map((c, index) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}
              key={index}
              component={motion.div}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                sx={{
                  borderRadius: "24px",
                  boxShadow: "0 8px 30px rgba(216,47,122,0.12)",
                  overflow: "hidden",
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: "0 12px 40px rgba(216,47,122,0.25)",
                  },
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component='img'
                    image={c.image}
                    alt={c.name}
                    sx={{
                      objectFit: "cover",
                    }}
                  />

                  {/* Etiqueta flotante */}
                  <Chip
                    label='Disponible'
                    sx={{
                      position: "absolute",
                      top: 16,
                      left: 16,
                      bgcolor: "#ffffffcc",
                      color: "#D82F7A",
                      fontWeight: "bold",
                      backdropFilter: "blur(6px)",
                    }}
                  />
                </Box>

                <CardContent sx={{ p: 3 }}>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "18px",
                      color: "#D82F7A",
                      mb: 1,
                    }}
                  >
                    {c.name}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#555",
                      mb: 2,
                    }}
                  >
                    <b>Disponible del:</b> {FormatDate(c.start_date)} al{" "}
                    {FormatDate(c.end_date)}
                  </Typography>
                  <Link
                    to={`/detalle-certificacion/${c.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      fullWidth
                      variant='contained'
                      sx={{
                        borderRadius: "30px",
                        py: 1,
                        fontWeight: "bold",
                        textTransform: "none",
                        fontSize: "14px",
                        background: "linear-gradient(90deg, #D82F7A, #F06292)",
                        boxShadow: "0 4px 15px rgba(216,47,122,0.4)",
                        "&:hover": {
                          background:
                            "linear-gradient(90deg, #C2185B, #E91E63)",
                        },
                      }}
                    >
                      Ver detalle
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default Certifications;
