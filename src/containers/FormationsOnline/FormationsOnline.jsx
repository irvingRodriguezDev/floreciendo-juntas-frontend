import React, { useEffect, useState } from "react";
import MethodGet from "../../config/Service";
import clienteAxios from "../../config/Axios";
import { Box, Button, Grid, Paper, Tooltip, Typography } from "@mui/material";
import FormacionDetalleModal from "./FormacionDetalleModal";
import Swal from "sweetalert2";
import fileDownload from "js-file-download";

/* ─────────────────────────────────────────────
   Helper: decide si el diploma se puede bajar
   Condiciones:
     1. La formación tiene diploma
     2. Todos los módulos tienen al menos una
        entrega con accepted === true
───────────────────────────────────────────── */
const canDownloadDiploma = (formation) => {
  if (!formation?.diploma) return false;

  const modules = formation.modules_formations ?? [];
  if (modules.length === 0) return false;

  return modules.every((mod) => {
    const deliveries = mod.deliveries ?? [];
    return deliveries.some((d) => d.accepted === true);
  });
};

const disabledReason = (formation) => {
  if (!formation?.diploma) return "Esta formación aún no tiene diploma disponible.";

  const modules = formation.modules_formations ?? [];
  if (modules.length === 0) return "La formación no tiene módulos registrados.";

  const pending = modules.filter((mod) => {
    const deliveries = mod.deliveries ?? [];
    return !deliveries.some((d) => d.accepted === true);
  });

  if (pending.length > 0) {
    return `Tienes ${pending.length} módulo(s) pendiente(s) de aceptación.`;
  }

  return "";
};

const FormationsOnline = () => {
  const [formations, setFormations] = useState([]);
  const [progressMap, setProgressMap] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [formationId, setFormationId] = useState(null);

  const handleOpenModal = (id) => {
    setFormationId(id);
    setModalOpen(true);
  };

  /* ── 1. Cargar lista de formaciones activas ── */
  useEffect(() => {
    MethodGet("/formations/active")
      .then((res) => setFormations(res.data.data))
      .catch((error) =>
        console.log(error, "Ocurrió un error al obtener las formaciones online")
      );
  }, []);

  /* ── 2. Por cada formación, cargar su progreso ── */
  useEffect(() => {
    if (!formations.length) return;

    formations.forEach((f) => {
      MethodGet(`/formations/formation-progress/${f.id}`)
        .then((res) => {
          const progress = res.data;
          setProgressMap((prev) => ({ ...prev, [f.id]: progress }));
        })
        .catch((err) =>
          console.log(err, `Error al obtener progreso de formación ${f.id}`)
        );
    });
  }, [formations]);

  /* ── Descargar diploma con nombre personalizado ── */
  const handleDownloadDiploma = async (formation) => {
    // Obtener nombre del usuario desde el token/contexto si lo tienes,
    // o dejamos vacío para que lo escriba manualmente
    const userNameDefault = "";

    // 1️⃣ Swal para personalizar el nombre
    const { value: nombreDiploma, isConfirmed } = await Swal.fire({
      title: "Personaliza tu Diploma",
      text: "Ingresa el nombre que aparecerá (máximo 25 caracteres):",
      input: "text",
      inputValue: userNameDefault,
      inputPlaceholder: "Nombre y Apellido",
      showCancelButton: true,
      confirmButtonText: "Descargar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#D82F7A",
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

    // 2️⃣ Spinner de carga
    Swal.fire({
      title: "Generando diploma...",
      text: "Por favor espera un momento.",
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
        title: "¡Diploma generado!",
        text: "Tu diploma ha sido descargado con éxito.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#D82F7A",
      });
    } catch (error) {
      console.error("Error al descargar el diploma:", error);
      Swal.fire({
        icon: "error",
        title: "Error al generar el diploma",
        text: "Ocurrió un problema al descargar el diploma. Intenta nuevamente.",
        confirmButtonText: "Cerrar",
      });
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid size={12} sx={{ display: "flex", justifyContent: "center" }}>
        <Typography sx={{ color: "#D82F7A", fontWeight: "bold" }} variant="h4">
          💅🏻 Formaciones Online 📝
        </Typography>
      </Grid>

      <Grid size={12}>
        <Paper
          elevation={0}
          sx={{ padding: 3, borderRadius: 2, bgcolor: "#FFE6EE" }}
        >
          <Grid container spacing={2}>
            {formations.map((f) => {
              const progress = progressMap[f.id];
              const enabled = progress ? canDownloadDiploma(progress) : false;
              const tooltip = progress ? disabledReason(progress) : "Cargando progreso...";

              return (
                <Grid
                  key={f.id}
                  size={12}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 2,
                    borderRadius: 2,
                    bgcolor: "#F7C6D8",
                  }}
                >
                  <Typography variant="h5" sx={{ color: "#D82F7A" }}>
                    {f.name}
                  </Typography>

                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: "#D82F7A",
                        borderRadius: 2,
                        "&:hover": { bgcolor: "#D82F7A" },
                      }}
                      onClick={() => handleOpenModal(f.id)}
                    >
                      Ver Detalles
                    </Button>

                    <Tooltip
                      title={!enabled ? tooltip : ""}
                      arrow
                      disableHoverListener={enabled}
                    >
                      <span>
                        <Button
                          variant="outlined"
                          disabled={!enabled}
                          sx={{
                            bgcolor: enabled ? "#f4e9ee" : "#f0f0f0",
                            color: enabled ? "#D82F7A" : "#aaa",
                            borderColor: enabled ? "#D82F7A" : "#ccc",
                            borderRadius: 2,
                            "&:hover": {
                              bgcolor: enabled ? "#FFF0F7" : "#f0f0f0",
                              borderColor: enabled ? "#D82F7A" : "#ccc",
                            },
                            "&.Mui-disabled": {
                              color: "#aaa",
                              borderColor: "#ccc",
                              bgcolor: "#f0f0f0",
                            },
                          }}
                          onClick={() => handleDownloadDiploma(f)}
                        >
                          Descargar Diploma
                        </Button>
                      </span>
                    </Tooltip>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Paper>
      </Grid>

      {formationId && (
        <FormacionDetalleModal
          open={modalOpen}
          handleClose={() => setModalOpen(false)}
          id={formationId}
        />
      )}
    </Grid>
  );
};

export default FormationsOnline;