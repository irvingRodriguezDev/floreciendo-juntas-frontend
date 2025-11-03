import React, { useContext, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import UserContext from "../../context/User/UserContext";
import AuthContext from "../../context/Auth/AuthContext";
import CoursesContext from "../../context/Courses/CoursesContext";

const PRIMARY_PINK = "#E53888";
const SECONDARY_PINK = "#F7CDD9";

const CertificatesSection = () => {
  const { completed, getCoursesCompleted } = useContext(UserContext);
  const { usuario } = useContext(AuthContext);
  const { downloadCertificate } = useContext(CoursesContext);

  useEffect(() => {
    if (usuario?.id) getCoursesCompleted(usuario.id);
  }, [usuario]);

  return (
    <Box
      sx={{
        p: 4,
        // bgcolor: "#fff0f6",
        borderRadius: "20px",
        boxShadow: "0 6px 20px rgba(229,56,136,0.2)",
      }}
    >
      <Typography
        variant='h5'
        color={PRIMARY_PINK}
        sx={{ mb: 4, fontWeight: 700, textAlign: "center" }}
      >
        🎓 Diplomas y Certificados
      </Typography>

      <Grid container spacing={4} justifyContent='center'>
        {completed.length === 0 && (
          <Typography
            variant='body1'
            color={PRIMARY_PINK}
            sx={{ textAlign: "center", width: "100%", mt: 4 }}
          >
            Aún no tienes cursos completados 😔
          </Typography>
        )}

        {completed.map((cert) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 3 }} key={cert.id}>
            <Card
              sx={{
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(229,56,136,0.3)",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 10px 20px rgba(229,56,136,0.4)",
                },
              }}
            >
              <CardMedia
                component='img'
                image={cert.cover_image_url}
                alt={cert.title}
                sx={{
                  height: 200,
                  objectFit: "cover",
                  transition: "transform 0.5s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              />
              <CardContent
                sx={{
                  bgcolor: SECONDARY_PINK,
                  textAlign: "center",
                  py: 2,
                }}
              >
                <Typography
                  variant='subtitle1'
                  sx={{ fontWeight: 600, mb: 1, color: PRIMARY_PINK }}
                >
                  {cert.title}
                </Typography>
                <Button
                  variant='contained'
                  fullWidth
                  sx={{
                    bgcolor: PRIMARY_PINK,
                    "&:hover": { bgcolor: "#c52c77" },
                    fontWeight: 600,
                    mt: 1,
                    borderRadius: "12px",
                  }}
                  onClick={() => downloadCertificate(cert.id, usuario.name)}
                >
                  Descargar Certificado
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CertificatesSection;
