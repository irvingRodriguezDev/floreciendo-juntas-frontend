import { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import MethodGet from "../../../config/Service";
import PinkSpinner from "../../Loading/PinkSpinner";
import UploadDeliverableModal from "../Details/UploadDeliverableModal";
const statusConfig = {
  not_started: { label: "No iniciado", color: "default" },
  reviewing: { label: "En revisión", color: "warning" },
  approved: { label: "Aprobado", color: "success" },
  rejected: { label: "Requiere corrección", color: "error" },
};
const ModuleDetail = () => {
  const { idModule } = useParams();

  //modal entregable
  const [openModalEntregable, setOpenModalEntregable] = useState(false);
  const handleClickOpenModal = () => {
    setOpenModalEntregable(true);
  };
  const HandleClickCloseModal = () => {
    setOpenModalEntregable(false);
  };

  const [detail, setDetail] = useState(null);
  useEffect(() => {
    let url = `/certifications/module/detail/${idModule}`;
    MethodGet(url)
      .then((res) => {
        setDetail(res.data);
      })
      .catch((error) => {
        console.log(error, "ocurrio un error al consultar la informacion");
      });
  }, [idModule]);
  const evaluationScores = (detail && detail.evaluation?.scores) || [];

  // 🔥 Unimos criterio + score
  const criteriaWithScores =
    detail &&
    detail.criteria?.map((criterion) => {
      const scoreFound = evaluationScores.find(
        (s) => s.criterionId === criterion.id,
      );

      return {
        ...criterion,
        score: scoreFound?.score ?? null,
        maxPoints: criterion.max_score,
      };
    });

  // 🔥 Calcular totales
  const totalObtained = evaluationScores.reduce((sum, s) => sum + s.score, 0);

  const maxScore =
    detail?.criteria?.reduce((sum, c) => sum + c.max_score, 0) ?? 0;

  const progressPercentage =
    maxScore === 0 ? 0 : Math.round((totalObtained / maxScore) * 100);

  return (
    <Layout>
      {!detail ? (
        <Box display='flex' justifyContent='center' mt={10}>
          <PinkSpinner />
        </Box>
      ) : (
        <Box maxWidth='1100px' mx='auto' px={3} py={6}>
          {/* HEADER HERO */}
          <Box
            sx={{
              borderRadius: 4,
              p: 5,
              mb: 6,
              background: "linear-gradient(135deg, #fdf2f8 0%, #ffffff 60%)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
            }}
          >
            <Stack
              direction={{ xs: "column", md: "row" }}
              justifyContent='space-between'
              alignItems={{ xs: "flex-start", md: "center" }}
              spacing={2}
            >
              <Box>
                <Typography
                  variant='overline'
                  sx={{ letterSpacing: 2, color: "text.secondary" }}
                >
                  Detalle del módulo
                </Typography>

                <Typography
                  variant='h3'
                  fontWeight='700'
                  sx={{
                    mt: 1,
                    wordBreak: "break-word",
                  }}
                >
                  {detail.title}
                </Typography>
              </Box>
            </Stack>

            <Box mt={4}>
              <LinearProgress
                variant='determinate'
                value={progressPercentage}
                sx={{
                  height: 12,
                  borderRadius: 10,
                  backgroundColor: "#f1f1f1", // fondo gris

                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#da327c", // 🔥 color real de la barra
                    borderRadius: 10,
                  },
                }}
              />

              <Stack direction='row' justifyContent='space-between' mt={1.5}>
                <Typography variant='body2' color='text.secondary'>
                  Progreso obtenido
                </Typography>
                <Typography variant='body2' fontWeight='600'>
                  {totalObtained} / {maxScore} pts
                </Typography>
              </Stack>
              <Stack direction='row' justifyContent='space-between' mt={1.5}>
                <Typography variant='body2' color='text.secondary'>
                  FeedBack:
                </Typography>
                <br />
              </Stack>
              <Stack direction='row' justifyContent='space-between' mt={1.5}>
                <Typography variant='body2' fontWeight='600'>
                  {detail && detail.evaluation?.general_feedback}
                </Typography>
              </Stack>
            </Box>
          </Box>

          {/* CRITERIOS */}
          <Card
            elevation={0}
            sx={{
              borderRadius: 4,
              border: "1px solid #f0f0f0",
              boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              mb: 6,
            }}
          >
            <CardContent sx={{ p: 5 }}>
              {detail.status === "not_started" && (
                <Box sx={{ display: "flex", justifyContent: "end" }}>
                  <Button
                    variant='contained'
                    onClick={handleClickOpenModal}
                    sx={{ borderRadius: "12px", bgcolor: "#E43888" }}
                  >
                    Subir Entregable
                  </Button>
                </Box>
              )}
              <Typography variant='h5' fontWeight='600' mb={4}>
                Criterios de evaluación
              </Typography>

              {criteriaWithScores?.map((criterion, index) => (
                <Box key={criterion.id}>
                  <Stack
                    direction='row'
                    justifyContent='space-between'
                    alignItems='center'
                    py={2}
                  >
                    <Typography variant='body1' sx={{ fontSize: 16 }}>
                      {criterion.title}
                    </Typography>

                    <Typography
                      variant='body1'
                      fontWeight='700'
                      sx={{
                        fontSize: 16,
                        color: criterion.score
                          ? "text.primary"
                          : "text.disabled",
                      }}
                    >
                      {criterion.score ?? "-"} / {criterion.maxPoints}
                    </Typography>
                  </Stack>

                  {index !== (detail.criteria?.length ?? 0) - 1 && (
                    <Divider sx={{ opacity: 0.4 }} />
                  )}
                </Box>
              ))}
            </CardContent>
          </Card>

          {/* FEEDBACK */}
          {detail.evaluation?.feedback && (
            <Card
              elevation={0}
              sx={{
                borderRadius: 4,
                border: "1px solid #f0f0f0",
                background: "linear-gradient(180deg, #ffffff 0%, #fafafa 100%)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                mb: 6,
              }}
            >
              <CardContent sx={{ p: 5 }}>
                <Typography variant='h5' fontWeight='600' mb={3}>
                  Retroalimentación
                </Typography>

                <Typography
                  variant='body1'
                  sx={{
                    fontSize: 16,
                    lineHeight: 1.7,
                    color: "text.secondary",
                  }}
                >
                  {detail.evaluation.feedback}
                </Typography>
              </CardContent>
            </Card>
          )}

          {/* GALERÍA */}
          {detail.submission && (
            <Box>
              <Typography variant='h5' fontWeight='600' mb={3}>
                Evidencias enviadas
              </Typography>

              <Grid container spacing={3}>
                {detail.submission.photo_1 && (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Box
                      component='img'
                      src={detail.submission.photo_1}
                      alt='evidencia'
                      sx={{
                        width: "100%",
                        height: 260,
                        objectFit: "cover",
                        borderRadius: 4,
                        boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
                        transition: "all .3s ease",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
                        },
                      }}
                    />
                  </Grid>
                )}
                {detail.submission.photo_2 && (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Box
                      component='img'
                      src={detail.submission.photo_2}
                      alt='evidencia'
                      sx={{
                        width: "100%",
                        height: 260,
                        objectFit: "cover",
                        borderRadius: 4,
                        boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
                        transition: "all .3s ease",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
                        },
                      }}
                    />
                  </Grid>
                )}
                {detail.submission.photo_3 && (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Box
                      component='img'
                      src={detail.submission.photo_3}
                      alt='evidencia'
                      sx={{
                        width: "100%",
                        height: 260,
                        objectFit: "cover",
                        borderRadius: 4,
                        boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
                        transition: "all .3s ease",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
                        },
                      }}
                    />
                  </Grid>
                )}
              </Grid>
            </Box>
          )}
        </Box>
      )}
      {idModule && (
        <UploadDeliverableModal
          moduleId={idModule}
          open={openModalEntregable}
          onClose={HandleClickCloseModal}
          module={detail}
        />
      )}
    </Layout>
  );
};

export default ModuleDetail;
