import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Avatar,
  Tooltip,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AuthContext from "../../context/Auth/AuthContext";
import UserContext from "../../context/User/UserContext";
import CoursesContext from "../../context/Courses/CoursesContext";
import Pagination from "../../components/Pagination/Pagination";

const PRIMARY_PINK = "#E53888";
const SECONDARY_PINK = "#F7CDD9";

const CertificatesSection = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  const { completed, getCoursesCompleted, completedPagination } =
    useContext(UserContext);
  const { usuario } = useContext(AuthContext);
  const { downloadCertificate } = useContext(CoursesContext);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
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
        boxShadow: "0 8px 24px rgba(229,56,136,0.15)",
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
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 4px 16px rgba(229,56,136,0.1)",
          }}
        >
          <Table>
            <TableHead sx={{ bgcolor: PRIMARY_PINK }}>
              <TableRow>
                <TableCell
                  sx={{ color: "#fff", fontWeight: 700, textAlign: "center" }}
                >
                  Curso
                </TableCell>
                <TableCell
                  sx={{ color: "#fff", fontWeight: 700, textAlign: "center" }}
                >
                  Estado
                </TableCell>
                <TableCell
                  sx={{ color: "#fff", fontWeight: 700, textAlign: "center" }}
                >
                  Certificado
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {completed.map((cert) => (
                <TableRow
                  key={cert.id}
                  hover
                  sx={{
                    "&:hover": {
                      backgroundColor: SECONDARY_PINK,
                    },
                    transition: "background-color 0.3s ease",
                  }}
                >
                  <TableCell>
                    <Typography
                      variant='subtitle1'
                      sx={{
                        fontWeight: 600,
                        color: PRIMARY_PINK,
                        textAlign: "center",
                      }}
                    >
                      {cert.title}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <CheckCircleIcon sx={{ color: "green", fontSize: 20 }} />
                      <Typography variant='body2' color='text.secondary'>
                        Completado
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell sx={{ display: "flex", justifyContent: "center" }}>
                    <Tooltip title='Descargar certificado'>
                      <Button
                        variant='contained'
                        startIcon={<PictureAsPdfIcon />}
                        sx={{
                          bgcolor: PRIMARY_PINK,
                          "&:hover": { bgcolor: "#c52c77" },
                          borderRadius: "10px",
                          textTransform: "none",
                          fontWeight: 600,
                        }}
                        onClick={() =>
                          downloadCertificate(cert.id, usuario.name)
                        }
                      >
                        Descargar
                      </Button>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {completedPagination.totalPages > 1 && (
            <Box sx={{ padding: "20px" }}>
              <Pagination
                currentPage={completedPagination.currentPage}
                totalPages={completedPagination.totalPages}
                onPageChange={handlePageChange}
              />
            </Box>
          )}
        </TableContainer>
      )}
    </Box>
  );
};

export default CertificatesSection;
