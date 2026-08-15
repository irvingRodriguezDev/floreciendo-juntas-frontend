import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import clienteAxios from "../../config/Axios";
import { alerts } from "../../utils/Alerts";
const UploadStoryModal = ({ open, onClose, onStoryUploaded }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  // Manejar la selección del archivo local
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Limpiar estados al cerrar o resetear
  const handleClose = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setCaption("");
    setLoading(false);
    onClose();
  };

  // Enviar el formulario a Node.js mediante FormData
  const handleSubmit = async () => {
    if (!selectedFile) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile); // Debe coincidir con uploadS3.single('file') en el backend
    formData.append("caption", caption);

    try {
      const response = await clienteAxios.post("/stories", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 201 || response.status === 200) {
        alerts.success("Correcto", "Tu historia se publico correctamente!");
      }

      if (onStoryUploaded) {
        onStoryUploaded(); // Refresca el feed de historias en el componente padre
      }
      handleClose();
    } catch (error) {
      alerts.error(
        "Upps, hubo un problema",
        "No se logro subir tu historia, intenta de nuevo"
      );
      console.error("Error al publicar la historia:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(6px)",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: { xs: "90vw", sm: "400px" },
          maxHeight: "85vh",
          bgcolor: "background.paper",
          borderRadius: "20px",
          p: 3,
          boxShadow: "0px 10px 30px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          outline: "none",
        }}
      >
        {/* Encabezado */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant='h6' sx={{ fontWeight: 700, color: "#D82E7A" }}>
            Compartir Diseño
          </Typography>
          <IconButton onClick={handleClose} disabled={loading} size='small'>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Zona de Selección / Previsualización */}
        {!previewUrl ? (
          <Box
            component='label'
            sx={{
              height: 280,
              border: "2px dashed #D82E7A",
              borderRadius: "16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              bgcolor: "#FFF0F6",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                bgcolor: "#FCE4EC",
                transform: "scale(0.99)",
              },
            }}
          >
            <input
              type='file'
              accept='image/*'
              hidden
              onChange={handleFileChange}
            />
            <PhotoCameraIcon sx={{ fontSize: 48, color: "#D82E7A", mb: 1 }} />
            <Typography
              variant='body2'
              sx={{ fontWeight: 600, color: "#D82E7A" }}
            >
              Toca para seleccionar tu foto
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              position: "relative",
              height: 320,
              borderRadius: "16px",
              overflow: "hidden",
              mb: 2,
            }}
          >
            <Box
              component='img'
              src={previewUrl}
              alt='Preview'
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            {/* Botón para cambiar la foto si se equivocó */}
            <Button
              component='label'
              size='small'
              variant='contained'
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                bgcolor: "rgba(0,0,0,0.6)",
                color: "white",
                textTransform: "none",
                "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
              }}
            >
              Cambiar
              <input
                type='file'
                accept='image/*'
                hidden
                onChange={handleFileChange}
              />
            </Button>
          </Box>
        )}

        {/* Campo opcional de Leyenda */}
        {previewUrl && (
          <TextField
            placeholder='Añade una breve descripción a tu diseño...'
            variant='outlined'
            fullWidth
            size='small'
            multiline
            rows={2}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            inputProps={{ maxLength: 150 }}
            sx={{
              mt: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                "&.Mui-focused fieldset": { borderColor: "#D82E7A" },
              },
            }}
          />
        )}

        {/* Acciones */}
        <Box
          sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 1 }}
        >
          <Button
            onClick={handleClose}
            disabled={loading}
            sx={{ color: "text.secondary", textTransform: "none" }}
          >
            Cancelar
          </Button>
          <Button
            variant='contained'
            disabled={!selectedFile || loading}
            onClick={handleSubmit}
            sx={{
              bgcolor: "#D82E7A",
              color: "white",
              borderRadius: "12px",
              px: 3,
              textTransform: "none",
              fontWeight: 600,
              "&:hover": { bgcolor: "#B82264" },
            }}
          >
            {loading ? (
              <>
                Subiendo <CircularProgress size={24} color='inherit' />
              </>
            ) : (
              "Publicar"
            )}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UploadStoryModal;
