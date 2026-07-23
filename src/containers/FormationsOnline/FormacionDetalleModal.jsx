import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Button,
  List,
  ListItem,
  Chip,
  Stack,
  Divider,
  Skeleton,
  Tooltip,
} from "@mui/material";
import {
  Close as CloseIcon,
  CloudUpload as UploadIcon,
  CheckCircle as CheckIcon,
  HourglassEmpty as PendingIcon,
  Cancel as CancelIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import MethodGet from "../../config/Service";
import clienteAxios from "../../config/Axios";
import Swal from "sweetalert2";

const PRIMARY_PINK = "#E53888";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "92%", sm: 580 },
  maxHeight: "88vh",
  bgcolor: "#FFFFFF",
  borderRadius: "24px",
  boxShadow: "0 20px 50px rgba(0, 0, 0, 0.15)",
  p: { xs: 2.5, sm: 3.5 },
  display: "flex",
  flexDirection: "column",
  outline: "none",
};

// ==========================================
// 1. SUBCOMPONENTE: StatusChip
// ==========================================
function StatusChip({ status }) {
  const config = {
    pendiente: {
      label: "Sin enviar",
      icon: <PendingIcon sx={{ fontSize: "16px !important" }} />,
      style: { backgroundColor: "#F3F4F6", color: "#6B7280" },
    },
    enviado: {
      label: "En revisión",
      icon: <PendingIcon sx={{ fontSize: "16px !important" }} />,
      style: { backgroundColor: "#FEF3C7", color: "#D97706" },
    },
    aceptado: {
      label: "Aceptado",
      icon: <CheckIcon sx={{ fontSize: "16px !important" }} />,
      style: { backgroundColor: "#D1FAE5", color: "#059669" },
    },
    rechazado: {
      label: "Rechazado",
      icon: <CancelIcon sx={{ fontSize: "16px !important" }} />,
      style: { backgroundColor: "#FEE2E2", color: "#DC2626" },
    },
  };

  const current = config[status] || config.pendiente;

  return (
    <Chip
      icon={current.icon}
      label={current.label}
      size='small'
      style={current.style}
      sx={{ fontWeight: 700, borderRadius: "8px", fontSize: "0.75rem" }}
    />
  );
}

// ==========================================
// 2. SUBCOMPONENTE: ModuloItem
// ==========================================
function ModuloItem({ modulo, onFileChange }) {
  const delivery = modulo?.deliveries?.[0];

  let status = "pendiente";
  if (delivery) {
    if (delivery.status === "submitted") status = "enviado";
    else if (delivery.status === "rejected") status = "rechazado";
    else if (delivery.accepted || delivery.status === "accepted")
      status = "aceptado";
  }

  const isButtonDisabled = status === "enviado" || status === "aceptado";
  const isActionRequired = status === "pendiente" || status === "rechazado";

  // Función para ver el preview de la imagen enviada
  const handleViewDelivery = () => {
    if (!delivery?.urlDelivery) return;
    Swal.fire({
      imageUrl: delivery.urlDelivery,
      imageAlt: "Evidencia enviada",
      title: "Evidencia adjuntada",
      confirmButtonText: "Cerrar",
      confirmButtonColor: PRIMARY_PINK,
      customClass: { popup: "swal2-rounded" },
    });
  };

  return (
    <ListItem
      sx={{
        flexDirection: "column",
        alignItems: "stretch",
        backgroundColor: "#FAFAFA",
        border: "1px solid #F3F4F6",
        borderRadius: "18px",
        mb: 2,
        p: 2,
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          borderColor: "#FCE7F3",
          boxShadow: "0 6px 18px rgba(229, 56, 136, 0.08)",
        },
      }}
    >
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        width='100%'
        mb={1.5}
      >
        <Typography
          sx={{ fontWeight: 800, color: "#1F2937", fontSize: "0.98rem" }}
        >
          {modulo.name}
        </Typography>
        <StatusChip status={status} />
      </Stack>

      {/* ACCIONES DEL MÓDULO */}
      <Stack
        direction='row'
        spacing={1}
        alignItems='center'
        justifyContent='space-between'
        width='100%'
        sx={{ pt: 1, borderTop: "1px dashed #E5E7EB" }}
      >
        {/* Ver evidencia subida si existe */}
        {delivery?.urlDelivery ? (
          <Tooltip title='Ver imagen de evidencia subida'>
            <Button
              size='small'
              startIcon={<VisibilityIcon />}
              onClick={handleViewDelivery}
              sx={{
                textTransform: "none",
                color: "#6B7280",
                fontSize: "0.82rem",
                fontWeight: 600,
                "&:hover": { color: PRIMARY_PINK, backgroundColor: "#FFF1F2" },
              }}
            >
              Ver envío
            </Button>
          </Tooltip>
        ) : (
          <Typography variant='caption' sx={{ color: "#9CA3AF" }}>
            Sin evidencia adjunta
          </Typography>
        )}

        {/* Botón de subir / corregir */}
        {status !== "enviado" && (
          <Button
            component='label'
            variant={isActionRequired ? "contained" : "outlined"}
            size='small'
            startIcon={<UploadIcon />}
            disabled={isButtonDisabled}
            sx={{
              borderRadius: "50px",
              textTransform: "none",
              px: 2,
              py: 0.6,
              fontSize: "0.82rem",
              fontWeight: 700,
              boxShadow: isActionRequired
                ? "0 4px 12px rgba(229, 56, 136, 0.2)"
                : "none",
              backgroundColor: isActionRequired ? PRIMARY_PINK : "transparent",
              borderColor: PRIMARY_PINK,
              color: isActionRequired ? "#FFFFFF" : PRIMARY_PINK,
              "&:hover": {
                backgroundColor: isActionRequired ? "#CF2C75" : "#FFF1F2",
                borderColor: PRIMARY_PINK,
              },
              "&:disabled": {
                borderColor: "#E5E7EB",
                color: "#9CA3AF",
              },
            }}
          >
            {status === "pendiente" ? "Adjuntar práctica" : "Corregir"}
            <input
              type='file'
              accept='image/*'
              hidden
              onChange={(e) => onFileChange(modulo.id, e)}
            />
          </Button>
        )}
      </Stack>
    </ListItem>
  );
}

// ==========================================
// 3. COMPONENTE PRINCIPAL: FormacionDetalleModal
// ==========================================
export default function FormacionDetalleModal({ open, handleClose, id }) {
  const [formationData, setFormationData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Carga inicial de datos
  useEffect(() => {
    if (!id || !open) return;

    setLoading(true);
    let url = `/formations/formation-progress/${id}`;
    MethodGet(url)
      .then((res) => {
        setFormationData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar detalle de formación:", error);
        setLoading(false);
        handleClose();
      });
  }, [id, open]);

  // Manejador del envío de evidencias
  const handleFileChange = async (moduloId, event) => {
    const file = event.target.files[0];
    if (!file) return;

    const localPreviewUrl = URL.createObjectURL(file);

    // 1. Actualización visual optimista
    setFormationData((prev) => {
      if (!prev) return prev;

      const updatedModules = prev.modules_formations.map((mod) => {
        if (mod.id === moduloId) {
          return {
            ...mod,
            deliveries: [
              {
                id: "temp-id",
                urlDelivery: localPreviewUrl,
                status: "submitted",
                accepted: false,
                submitDate: new Date(),
              },
            ],
          };
        }
        return mod;
      });

      return { ...prev, modules_formations: updatedModules };
    });

    // 2. Preparación de FormData y envío al servidor
    const formData = new FormData();
    formData.append("evidence", file);
    formData.append("moduleFormationId", moduloId);

    Swal.fire({
      title: "Subiendo evidencia...",
      text: "Por favor espera un momento.",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      let url = `/formations/submit-delivery/${moduloId}`;
      const response = await clienteAxios.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire({
        title: "¡Evidencia enviada!",
        text: "Tu práctica se ha subido correctamente para ser revisada.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      const savedDelivery = response.data.delivery;

      // 3. Confirmar datos reales recibidos
      setFormationData((prev) => {
        if (!prev) return prev;

        const updatedModules = prev.modules_formations.map((mod) => {
          if (mod.id === moduloId) {
            return {
              ...mod,
              deliveries: [savedDelivery],
            };
          }
          return mod;
        });

        return { ...prev, modules_formations: updatedModules };
      });
    } catch (error) {
      console.error("Error al subir evidencia:", error);
      Swal.fire({
        title: "Error al subir",
        text: "Ocurrió un inconveniente con el archivo. Intenta nuevamente.",
        icon: "error",
        confirmButtonText: "Aceptar",
        confirmButtonColor: PRIMARY_PINK,
      });

      // 4. Revertir cambios en caso de error
      let fallbackUrl = `/formations/formation-progress/${id}`;
      MethodGet(fallbackUrl)
        .then((res) => setFormationData(res.data))
        .catch(() => handleClose());
    }
  };

  return (
    <Modal open={open} onClose={handleClose} closeAfterTransition>
      <Box sx={modalStyle}>
        {/* ENCABEZADO */}
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          mb={1}
        >
          {loading ? (
            <Skeleton width='60%' height={32} />
          ) : (
            <Typography
              variant='h6'
              component='h2'
              sx={{
                fontWeight: 800,
                color: "#1F2937",
                fontSize: { xs: "1.15rem", sm: "1.35rem" },
              }}
            >
              {formationData?.name || "Detalle de Formación"}
            </Typography>
          )}

          <IconButton
            onClick={handleClose}
            size='small'
            sx={{
              color: "#9CA3AF",
              "&:hover": { backgroundColor: "#FFF1F2", color: PRIMARY_PINK },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <Typography variant='body2' sx={{ color: "#6B7280", mb: 2.5 }}>
          Sube la evidencia práctica de cada módulo para que tus instructoras
          puedan evaluarla y liberar tu certificación.
        </Typography>

        <Divider sx={{ mb: 2.5, borderColor: "#F3F4F6" }} />

        {/* LISTA CON SKELETON O MÓDULOS */}
        <Box sx={{ flexGrow: 1, overflowY: "auto", pr: 0.5, maxH: "50vh" }}>
          {loading ? (
            <Stack spacing={2}>
              <Skeleton
                variant='rounded'
                height={80}
                sx={{ borderRadius: "16px" }}
              />
              <Skeleton
                variant='rounded'
                height={80}
                sx={{ borderRadius: "16px" }}
              />
            </Stack>
          ) : (
            <List disablePadding>
              {formationData?.modules_formations?.map((modulo) => (
                <ModuloItem
                  key={modulo.id}
                  modulo={modulo}
                  onFileChange={handleFileChange}
                />
              ))}
            </List>
          )}
        </Box>

        {/* PIE DE MODAL */}
        <Box mt={3} display='flex' justifyContent='flex-end'>
          <Button
            variant='contained'
            onClick={handleClose}
            sx={{
              borderRadius: "50px",
              px: 4,
              py: 1,
              textTransform: "none",
              fontWeight: 700,
              backgroundColor: PRIMARY_PINK,
              boxShadow: "0 4px 14px rgba(229, 56, 136, 0.25)",
              "&:hover": {
                backgroundColor: "#CF2C75",
                boxShadow: "0 6px 18px rgba(229, 56, 136, 0.35)",
              },
            }}
          >
            Listo
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
