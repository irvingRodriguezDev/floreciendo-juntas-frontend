import React, { useEffect, useState } from "react";
import MethodGet from "../../config/Service";
import clienteAxios from "../../config/Axios";
import {
  Box,
  Button,
  Grid,
  Typography,
  Tooltip,
  Skeleton,
  Chip,
  Card,
  LinearProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import FormacionDetalleModal from "./FormacionDetalleModal";
import Swal from "sweetalert2";
import fileDownload from "js-file-download";

const PRIMARY_PINK = "#E53888";

/* ── Helpers de validación de diploma ── */
const canDownloadDiploma = (formation) => {
  if (!formation?.diploma) return false;
  const modules = formation.modules_formations ?? [];
  if (modules.length === 0) return false;

  return modules.every((mod) => {
    const deliveries = mod.deliveries ?? [];
    return deliveries.some((d) => d.accepted === true);
  });
};

const getModuleProgress = (formation) => {
  const modules = formation?.modules_formations ?? [];
  if (modules.length === 0) return { completed: 0, total: 0, percent: 0 };

  const completed = modules.filter((mod) => {
    const deliveries = mod.deliveries ?? [];
    return deliveries.some((d) => d.accepted === true);
  }).length;

  return {
    completed,
    total: modules.length,
    percent: Math.round((completed / modules.length) * 100),
  };
};

const disabledReason = (formation) => {
  if (!formation?.diploma)
    return "Esta formación aún no cuenta con diploma disponible.";

  const modules = formation.modules_formations ?? [];
  if (modules.length === 0) return "La formación no tiene módulos registrados.";

  const pending = modules.filter((mod) => {
    const deliveries = mod.deliveries ?? [];
    return !deliveries.some((d) => d.accepted === true);
  });

  if (pending.length > 0) {
    return `Tienes ${pending.length} módulo(s) pendiente(s) de aprobación.`;
  }

  return "";
};

const FormationsOnline = () => {
  const [formations, setFormations] = useState([]);
  const [progressMap, setProgressMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [formationId, setFormationId] = useState(null);

  const handleOpenModal = (id) => {
    setFormationId(id);
    setModalOpen(true);
  };

  /* ── 1. Cargar lista de formaciones activas ── */
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    MethodGet("/formations/active")
      .then((res) => {
        if (isMounted) {
          const list = res.data.data || [];
          setFormations(list);
          if (list.length === 0) setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error al obtener formaciones online:", error);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  /* ── 2. Por cada formación, cargar su progreso ── */
  useEffect(() => {
    if (!formations.length) return;

    let isMounted = true;
    const fetchPromises = formations.map((f) =>
      MethodGet(`/formations/formation-progress/${f.id}`)
        .then((res) => ({ id: f.id, data: res.data }))
        .catch(() => ({ id: f.id, data: null })),
    );

    Promise.all(fetchPromises).then((results) => {
      if (!isMounted) return;
      const newMap = {};
      results.forEach((item) => {
        if (item.data) newMap[item.id] = item.data;
      });
      setProgressMap(newMap);
      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [formations]);

  /* ── Descargar diploma con nombre personalizado ── */
  const handleDownloadDiploma = async (formation) => {
    const { value: nombreDiploma, isConfirmed } = await Swal.fire({
      title: "Personaliza tu Diploma",
      text: "Ingresa el nombre que aparecerá impreso (máx. 25 caracteres):",
      input: "text",
      inputPlaceholder: "Nombre y Apellido",
      showCancelButton: true,
      confirmButtonText: "Descargar Diploma",
      cancelButtonText: "Cancelar",
      confirmButtonColor: PRIMARY_PINK,
      cancelButtonColor: "#6B7280",
      customClass: {
        popup: "swal2-rounded",
      },
      inputAttributes: {
        maxlength: 25,
        autocomplete: "off",
        autocapitalize: "words",
      },
      footer: '<b id="char-count">25</b> caracteres restantes',
      didOpen: () => {
        const input = Swal.getInput();
        const footer = document.getElementById("char-count");
        if (input && footer) {
          footer.innerText = 25 - input.value.length;
          input.addEventListener("input", () => {
            footer.innerText = 25 - input.value.length;
          });
        }
      },
      inputValidator: (value) => {
        if (!value || !value.trim()) {
          return "El nombre es obligatorio";
        }
        const soloLetras = /^[a-zA-ZÀ-ÿ\s]+$/;
        if (!soloLetras.test(value)) {
          return "Solo se permiten letras y espacios";
        }
      },
    });

    if (!isConfirmed || !nombreDiploma) return;

    Swal.fire({
      title: "Generando diploma...",
      text: "Preparando tu archivo PDF en alta definición.",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const url = `/formations/download-diploma?formationId=${formation.id}&userName=${encodeURIComponent(nombreDiploma.trim())}`;
      const res = await clienteAxios.get(url, { responseType: "blob" });

      const fileName = `Diploma-${nombreDiploma.trim().replace(/ /g, "_")}.pdf`;
      fileDownload(res.data, fileName);

      Swal.fire({
        icon: "success",
        title: "¡Felicidades!",
        text: "Tu diploma ha sido generado y descargado con éxito.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: PRIMARY_PINK,
      });
    } catch (error) {
      console.error("Error al descargar el diploma:", error);
      Swal.fire({
        icon: "error",
        title: "Error al generar el diploma",
        text: "Ocurrió un problema al procesar la descarga. Por favor intenta de nuevo.",
        confirmButtonText: "Cerrar",
      });
    }
  };

  return (
    <Box sx={{ pt: 1, pb: 4 }}>
      {/* TÍTULO */}
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
          <SchoolOutlinedIcon sx={{ fontSize: 32 }} />
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
          Formaciones Online
        </Typography>

        <Typography
          variant='body2'
          sx={{
            mt: 0.5,
            color: "#6B7280",
            fontSize: { xs: "0.9rem", md: "0.95rem" },
          }}
        >
          Accede a tus módulos, sube tus prácticas y descarga tu certificación
          oficial.
        </Typography>
      </Box>

      {/* LISTADO DE FORMACIONES */}
      <Grid container spacing={2.5}>
        {/* SKELETON LOADING */}
        {loading &&
          [1, 2].map((n) => (
            <Grid size={{ xs: 12 }} key={n}>
              <Skeleton
                variant='rounded'
                height={110}
                sx={{ borderRadius: "20px" }}
              />
            </Grid>
          ))}

        {/* SIN FORMACIONES */}
        {!loading && formations.length === 0 && (
          <Grid size={{ xs: 12 }}>
            <Box
              sx={{
                textAlign: "center",
                py: 6,
                backgroundColor: "#FAFAFA",
                borderRadius: "24px",
                border: "1px dashed #E5E7EB",
              }}
            >
              <Typography
                variant='h6'
                sx={{ color: "#374151", fontWeight: 700 }}
              >
                Aún no estás inscrita en ninguna formación
              </Typography>
              <Typography variant='body2' sx={{ color: "#6B7280", mt: 0.5 }}>
                Explora el catálogo de cursos y acelera tu carrera profesional.
              </Typography>
            </Box>
          </Grid>
        )}

        {/* TARJETAS DE FORMACIÓN */}
        {!loading &&
          formations.map((f, index) => {
            const progress = progressMap[f.id];
            const enabled = progress ? canDownloadDiploma(progress) : false;
            const tooltip = progress
              ? disabledReason(progress)
              : "Cargando avance...";
            const stats = getModuleProgress(progress);

            return (
              <Grid size={{ xs: 12 }} key={f.id}>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.06 }}
                >
                  <Card
                    sx={{
                      p: { xs: 2.5, md: 3 },
                      borderRadius: "20px",
                      border: "1px solid #F3F4F6",
                      boxShadow: "0 4px 18px rgba(0,0,0,0.03)",
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                      justifyContent: "space-between",
                      alignItems: { xs: "stretch", md: "center" },
                      gap: 2.5,
                      transition: "all 0.25s ease",
                      "&:hover": {
                        borderColor: "#FCE7F3",
                        boxShadow: "0 8px 25px rgba(229, 56, 136, 0.1)",
                      },
                    }}
                  >
                    {/* INFO Y AVANCE DE LA FORMACIÓN */}
                    <Box sx={{ flexGrow: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          mb: 1,
                          flexWrap: "wrap",
                        }}
                      >
                        <Typography
                          variant='h6'
                          sx={{
                            fontWeight: 800,
                            color: "#1F2937",
                            fontSize: "1.15rem",
                          }}
                        >
                          {f.name}
                        </Typography>

                        {enabled && (
                          <Chip
                            icon={
                              <WorkspacePremiumOutlinedIcon
                                sx={{
                                  fontSize: "0.9rem !important",
                                  color: "#FFFFFF !important",
                                }}
                              />
                            }
                            label='Diploma listo'
                            size='small'
                            sx={{
                              backgroundColor: "#10B981",
                              color: "#FFFFFF",
                              fontWeight: 700,
                              fontSize: "0.72rem",
                              height: 24,
                            }}
                          />
                        )}
                      </Box>

                      {/* BARRITA DE PROGRESO */}
                      {progress && (
                        <Box sx={{ maxWidth: 360, mt: 1.5 }}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              mb: 0.5,
                            }}
                          >
                            <Typography
                              variant='caption'
                              sx={{ color: "#6B7280", fontWeight: 600 }}
                            >
                              Avance de módulos
                            </Typography>
                            <Typography
                              variant='caption'
                              sx={{ color: PRIMARY_PINK, fontWeight: 700 }}
                            >
                              {stats.completed} de {stats.total} (
                              {stats.percent}%)
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant='determinate'
                            value={stats.percent}
                            sx={{
                              height: 6,
                              borderRadius: 3,
                              backgroundColor: "#F3F4F6",
                              "& .MuiLinearProgress-bar": {
                                backgroundColor: PRIMARY_PINK,
                                borderRadius: 3,
                              },
                            }}
                          />
                        </Box>
                      )}
                    </Box>

                    {/* BOTONES DE ACCIÓN */}
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1.5,
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: "center",
                      }}
                    >
                      <Button
                        variant='outlined'
                        startIcon={<VisibilityOutlinedIcon />}
                        onClick={() => handleOpenModal(f.id)}
                        fullWidth={{ xs: true, sm: false }}
                        sx={{
                          borderRadius: "50px",
                          px: 2.5,
                          py: 1,
                          textTransform: "none",
                          fontWeight: 700,
                          fontSize: "0.88rem",
                          color: "#374151",
                          borderColor: "#E5E7EB",
                          "&:hover": {
                            borderColor: PRIMARY_PINK,
                            color: PRIMARY_PINK,
                            backgroundColor: "#FFF1F2",
                          },
                        }}
                      >
                        Ver detalles
                      </Button>

                      <Tooltip
                        title={!enabled ? tooltip : ""}
                        arrow
                        disableHoverListener={enabled}
                      >
                        <Box
                          component='span'
                          sx={{ width: { xs: "100%", sm: "auto" } }}
                        >
                          <Button
                            variant='contained'
                            disabled={!enabled}
                            startIcon={<WorkspacePremiumOutlinedIcon />}
                            onClick={() => handleDownloadDiploma(f)}
                            fullWidth={{ xs: true, sm: false }}
                            sx={{
                              borderRadius: "50px",
                              px: 2.5,
                              py: 1,
                              textTransform: "none",
                              fontWeight: 700,
                              fontSize: "0.88rem",
                              backgroundColor: PRIMARY_PINK,
                              color: "#FFFFFF",
                              boxShadow: "0 4px 14px rgba(229, 56, 136, 0.22)",
                              "&:hover": {
                                backgroundColor: "#CF2C75",
                                boxShadow:
                                  "0 6px 18px rgba(229, 56, 136, 0.32)",
                              },
                              "&.Mui-disabled": {
                                backgroundColor: "#F3F4F6",
                                color: "#9CA3AF",
                              },
                            }}
                          >
                            Descargar diploma
                          </Button>
                        </Box>
                      </Tooltip>
                    </Box>
                  </Card>
                </motion.div>
              </Grid>
            );
          })}
      </Grid>

      {/* MODAL DETALLE */}
      {formationId && (
        <FormacionDetalleModal
          open={modalOpen}
          handleClose={() => setModalOpen(false)}
          id={formationId}
        />
      )}
    </Box>
  );
};

export default FormationsOnline;
