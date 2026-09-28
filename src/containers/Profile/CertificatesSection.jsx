import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Tooltip,
  Divider,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AuthContext from "../../context/Auth/AuthContext";
import UserContext from "../../context/User/UserContext";
import CoursesContext from "../../context/Courses/CoursesContext";
import Pagination from "../../components/Pagination/Pagination";

const PRIMARY_PINK = "#E53888";
const CARD_BG = "#FFF4FA";
const BORDER_PINK = "#F7CDD9";

const CertificatesSection = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);

  const { completed, getCoursesCompleted, completedPagination } =
    useContext(UserContext);
  const { usuario } = useContext(AuthContext);
  const { downloadCertificate } = useContext(CoursesContext);

  const handlePageChange = (newPage) => {
    if (
      newPage >= 1 &&
      newPage <= completedPagination.totalPages &&
      newPage !== page
    ) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    if (usuario?.id) {
      getCoursesCompleted(usuario.id, page, rowsPerPage);
    }
  }, [usuario, page, rowsPerPage]);

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        borderRadius: "20px",
        bgcolor: "#fff",
      }}
    >
      <Typography
        variant='h5'
        color={PRIMARY_PINK}
        sx={{ mb: 4, fontWeight: 700, textAlign: "center" }}
      >
        🎓 Diplomas y Certificados
      </Typography>

      {completed.length === 0 ? (
        <Typography
          variant='body1'
          color={PRIMARY_PINK}
          sx={{ textAlign: "center", mt: 4 }}
        >
          Aún no tienes cursos completados 😔
        </Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {completed.map((cert) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={cert.id}>
                <Card
                  sx={{
                    borderRadius: "18px",
                    p: 2,
                    border: `2px solid ${BORDER_PINK}`,
                    background: CARD_BG,
                    boxShadow: "0 6px 16px rgba(229,56,136,0.1)",
                    transition: "transform 0.25s ease",
                    "&:hover": {
                      transform: "scale(1.03)",
                    },
                  }}
                >
                  <CardContent>
                    {/* Título del curso */}
                    <Typography
                      variant='h6'
                      sx={{
                        fontWeight: 700,
                        color: PRIMARY_PINK,
                        textAlign: "center",
                        mb: 2,
                      }}
                    >
                      {cert.title}
                    </Typography>

                    <Divider sx={{ mb: 2 }} />

                    {/* Estado */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1,
                        mb: 2,
                      }}
                    >
                      <CheckCircleIcon sx={{ color: "green", fontSize: 22 }} />
                      <Typography variant='body2' color='text.secondary'>
                        Completado
                      </Typography>
                    </Box>
                  </CardContent>

                  <CardActions sx={{ justifyContent: "center", mt: 1 }}>
                    <Tooltip title='Descargar certificado'>
                      <Button
                        variant='contained'
                        startIcon={<PictureAsPdfIcon />}
                        sx={{
                          bgcolor: PRIMARY_PINK,
                          "&:hover": { bgcolor: "#c52c77" },
                          textTransform: "none",
                          borderRadius: "10px",
                          fontWeight: 600,
                          px: 3,
                        }}
                        onClick={() =>
                          downloadCertificate(cert.id, usuario.name)
                        }
                      >
                        Descargar
                      </Button>
                    </Tooltip>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* PAGINACIÓN */}
          {completedPagination.totalPages > 1 && (
            <Box sx={{ padding: "25px 0" }}>
              <Pagination
                currentPage={completedPagination.currentPage}
                totalPages={completedPagination.totalPages}
                onPageChange={handlePageChange}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default CertificatesSection;
