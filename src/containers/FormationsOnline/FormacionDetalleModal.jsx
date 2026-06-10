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
} from "@mui/material";
import {
  Close as CloseIcon,
  CloudUpload as UploadIcon,
  CheckCircle as CheckIcon,
  HourglassEmpty as PendingIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import MethodGet from "../../config/Service";
import clienteAxios from "../../config/Axios";
import Swal from "sweetalert2";

// --- CONFIGURACIÓN DE ESTILOS GLOBALES ---
const PINK_PALETTE = {
  primary: "#D82F7A",
  light: "#FCE4EC",
  medium: "#F8BBD0",
  dark: "#880E4F",
  glassBg: "rgba(255, 255, 255, 0.7)",
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 550 },
  maxHeight: "85vh",
  bgcolor: "#FFFFFF",
  borderRadius: "24px",
  boxShadow: "0 20px 40px rgba(216, 27, 96, 0.15)",
  p: 4,
  display: "flex",
  flexDirection: "column",
  outline: "none",
  overflowY: "auto",
};

// ==========================================
// 1. SUBCOMPONENTE: StatusChip
// ==========================================
function StatusChip({ status }) {
  const config = {
    pendiente: {
      label: "Sin enviar",
      icon: <PendingIcon />,
      style: { backgroundColor: "#F5F5F5", color: "#616161" },
    },
    enviado: {
      label: "Enviado",
      icon: <PendingIcon />,
      style: { backgroundColor: "#FFF3E0", color: "#E65100" },
    },
    aceptado: {
      label: "Aceptado",
      icon: <CheckIcon />,
      style: { backgroundColor: "#E8F5E9", color: "#1B5E20" },
    },
    rechazado: {
      label: "Rechazado",
      icon: <CancelIcon />,
      style: { backgroundColor: "#FFEBEE", color: "#C62828" },
    },
  };

  const current = config[status] || config.pendiente;

  return (
    <Chip
      icon={current.icon}
      label={current.label}
      size='small'
      style={current.style}
      sx={{ fontWeight: 600, borderRadius: "8px" }}
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

  // Determinamos si el botón de adjuntar/corregir debe estar completamente oculto o deshabilitado
  // Bloqueado si está "enviado" (en revisión) o si ya fue "aceptado" (aprobado)
  const isButtonDisabled = status === "enviado" || status === "aceptado";

  // El botón solo se requiere activo si está pendiente por primera vez o si fue rechazado
  const isActionRequired = status === "pendiente" || status === "rechazado";

  return (
    <ListItem
      sx={{
        flexDirection: "column",
        alignItems: "stretch",
        backgroundColor: PINK_PALETTE.glassBg,
        backdropFilter: "blur(10px)",
        border: `1px solid ${PINK_PALETTE.medium}`,
        borderRadius: "16px",
        mb: 2,
        p: 2.5,
        boxShadow: "0 4px 12px rgba(216, 27, 96, 0.04)",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          boxShadow: "0 6px 16px rgba(216, 27, 96, 0.08)",
          borderColor: PINK_PALETTE.primary,
        },
      }}
    >
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        width='100%'
        mb={isButtonDisabled && status === "enviado" ? 0 : 2} // Quitamos margen inferior si el botón desaparece
      >
        <Typography
          sx={{ fontWeight: 700, color: "#333333", fontSize: "1.05rem" }}
        >
          {modulo.name}
        </Typography>
        <StatusChip status={status} />
      </Stack>

      {/* Solo renderizamos la sección de acciones si NO está en revisión (submitted) */}
      {status !== "enviado" && (
        <Stack
          direction='row'
          spacing={1}
          alignItems='center'
          justifyContent='flex-end'
          width='100%'
        >
          <Button
            component='label'
            variant={isActionRequired ? "contained" : "outlined"}
            size='small'
            startIcon={<UploadIcon />}
            disabled={isButtonDisabled}
            sx={{
              borderRadius: "10px",
              textTransform: "none",
              boxShadow: "none",
              backgroundColor: isActionRequired
                ? PINK_PALETTE.primary
                : "transparent",
              borderColor: PINK_PALETTE.medium,
              color: isActionRequired ? "#FFFFFF" : PINK_PALETTE.primary,
              "&:hover": {
                backgroundColor: isActionRequired
                  ? PINK_PALETTE.dark
                  : PINK_PALETTE.light,
                borderColor: PINK_PALETTE.primary,
                boxShadow: "none",
              },
              "&:disabled": {
                borderColor: "#E0E0E0",
                color: "#9E9E9E",
              },
            }}
          >
            {status === "pendiente" ? "Adjuntar" : "Corregir"}
            <input
              type='file'
              accept='image/*'
              hidden
              onChange={(e) => onFileChange(modulo.id, e)}
            />
          </Button>
        </Stack>
      )}
    </ListItem>
  );
}

// ==========================================
// 3. COMPONENTE PRINCIPAL: FormacionDetalleModal
// ==========================================
export default function FormacionDetalleModal({ open, handleClose, id }) {
  const [formationData, setFormationData] = useState(null);

  // Carga inicial de datos
  useEffect(() => {
    if (!id || !open) return;

    let url = `/formations/formation-progress/${id}`;
    MethodGet(url)
      .then((res) => {
        setFormationData(res.data);
      })
      .catch((error) => {
        console.error("Ocurrió un error al cargar la información:", error);
        handleClose();
      });
  }, [id, open]);

  // Manejador del envío de evidencias
  const handleFileChange = async (moduloId, event) => {
    const file = event.target.files[0];
    if (!file) return;

    const localPreviewUrl = URL.createObjectURL(file);

    // 1. Actualización visual optimista instantánea
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
                status: "submitted", // Alineado con el Backend
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

    // 2. Preparación y envío del FormData
    const formData = new FormData();
    formData.append("evidence", file); // Coincide con tu Multer del backend
    formData.append("moduleFormationId", moduloId);

    try {
      handleClose();
      let url = `/formations/submit-delivery/${moduloId}`;
      Swal.fire({
        title: "Subiendo evidencia...",
        text: "Por favor, espera un momento.",
        allowOutsideClick: false, // Evita que den clic afuera para cerrarlo
        allowEscapeKey: false, // Evita que lo cierren con la tecla Esc
        allowEnterKey: false, // Evita que lo cierren con Enter
        didOpen: () => {
          Swal.showLoading(); // Muestra el spinner animado nativo de SweetAlert
        },
      });
      const response = await clienteAxios.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      Swal.fire({
        title: "Éxito",
        text: "La evidencia se ha subido correctamente.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      const savedDelivery = response.data.delivery;

      // 3. Reemplazar estado temporal por datos reales del servidor
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
      console.error("Error al subir la evidencia al servidor:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo subir tu evidencia. Por favor, intenta de nuevo.",
        icon: "error",
        confirmButtonText: "Aceptar",
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
          <Typography
            variant='h5'
            component='h2'
            sx={{
              fontWeight: 800,
              color: PINK_PALETTE.primary,
              letterSpacing: "-0.5px",
            }}
          >
            {formationData?.name || "Detalle de Formación"}
          </Typography>
          <IconButton
            onClick={handleClose}
            sx={{ color: PINK_PALETTE.primary }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <Typography variant='body2' color='text.secondary' mb={3}>
          Sube tus evidencias prácticas de cada módulo para que tus instructoras
          puedan evaluarlas y obtener tu certificación.
        </Typography>

        <Divider sx={{ mb: 2, borderColor: PINK_PALETTE.light }} />

        {/* LISTA DE MÓDULOS REFACTORIZADA */}
        <List sx={{ flexGrow: 1, overflowY: "auto", pr: 0.5 }}>
          {formationData?.modules_formations?.map((modulo) => (
            <ModuloItem
              key={modulo.id}
              modulo={modulo}
              onFileChange={handleFileChange}
            />
          ))}
        </List>

        {/* PIE DE MODAL */}
        <Box mt={3} display='flex' justifyContent='flex-end'>
          <Button
            variant='contained'
            onClick={handleClose}
            sx={{
              borderRadius: "12px",
              px: 4,
              py: 1,
              textTransform: "none",
              fontWeight: 600,
              backgroundColor: PINK_PALETTE.primary,
              boxShadow: "0 4px 12px #D82F7A",
              "&:hover": {
                backgroundColor: PINK_PALETTE.dark,
                boxShadow: "0 6px 16px #D82F7A",
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
