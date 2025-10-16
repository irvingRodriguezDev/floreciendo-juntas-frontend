import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";

const PRIMARY_PINK = "#E53888";
const CERT_COLOR = "#F7CDD9"; // Rosa suave para el borde

const CertificatesSection = ({ certCount }) => {
  const certificates = Array.from({ length: certCount }, (_, i) => ({
    id: i + 1,
    name: `Certificado ${i + 1}`,
  }));

  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "white",
        borderRadius: "16px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
      }}
    >
      <Typography
        variant='h5'
        color={PRIMARY_PINK}
        sx={{ mb: 3, fontWeight: 600 }}
      >
        Diplomas y Certificados
      </Typography>

      <Grid container spacing={3} justifyContent='center'>
        {certificates.map((cert) => (
          <Grid item xs={6} sm={4} md={3} key={cert.id}>
            <Box
              sx={{
                width: "100%",
                paddingTop: "75%", // 4:3 Aspect Ratio (simulando un diploma)
                position: "relative",
                bgcolor: CERT_COLOR,
                borderRadius: "8px",
                border: `4px solid ${PRIMARY_PINK}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "box-shadow 0.3s",
                "&:hover": {
                  boxShadow: `0 0 10px ${PRIMARY_PINK}`,
                },
              }}
            >
              <SchoolIcon
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: PRIMARY_PINK,
                  fontSize: 50,
                  opacity: 0.5,
                }}
              />
            </Box>
            <Typography
              variant='caption'
              display='block'
              textAlign='center'
              sx={{ mt: 1 }}
            >
              {cert.name}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CertificatesSection;
