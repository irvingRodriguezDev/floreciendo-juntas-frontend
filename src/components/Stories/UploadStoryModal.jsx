import React, { useState, useContext, useEffect } from "react";
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
import { alerts } from "../../utils/Alerts";
import { convertHeicToJpeg } from "../../utils/ConvertHeicToJpeg";
import StoriesContext from "../../context/stories/StoriesContext";
import InputStyles from "../../utils/InputStyles";
const MAX_VIDEO_DURATION = 45; // Segundos máximos permitidos

const UploadStoryModal = ({ open, onClose }) => {
  const { addStoriContent } = useContext(StoriesContext);

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [mediaType, setMediaType] = useState("image"); // "image" | "video"
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  // Limpieza de ObjectURL al desmontar o cambiar preview
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Resetear el input para permitir seleccionar el mismo archivo si se desea
    e.target.value = "";

    // Limpiar preview anterior si existía
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }

    const isVideo =
      file.type.startsWith("video/") || /\.(mov|mp4|webm)$/i.test(file.name);
    const isHeicImage =
      file.type === "image/heic" ||
      file.type === "image/heif" ||
      /\.(heic|heif)$/i.test(file.name);

    if (isVideo) {
      // Validar duración del video en el navegador
      const tempVideoUrl = URL.createObjectURL(file);
      const videoElement = document.createElement("video");
      videoElement.preload = "metadata";
      videoElement.src = tempVideoUrl;

      videoElement.onloadedmetadata = () => {
        URL.revokeObjectURL(tempVideoUrl); // Liberar la URL temporal de validación

        if (videoElement.duration > MAX_VIDEO_DURATION + 0.9) {
          handleClose();
          alerts.error(
            "Video muy largo",
            `Las historias pueden durar máximo ${MAX_VIDEO_DURATION} segundos.`,
          );
          return;
        }

        setSelectedFile(file);
        setMediaType("video");
        setPreviewUrl(URL.createObjectURL(file)); // URL final para la vista previa
      };

      videoElement.onerror = () => {
        URL.revokeObjectURL(tempVideoUrl);
        alerts.error(
          "Error de video",
          "No se pudo procesar el archivo de video. Intenta con otro formato.",
        );
      };
    } else if (isHeicImage) {
      try {
        const converted = await convertHeicToJpeg(file);
        setSelectedFile(converted);
        setMediaType("image");
        setPreviewUrl(URL.createObjectURL(converted));
      } catch (error) {
        console.error("Error al convertir la imagen HEIC:", error);
        alerts.error("Error", "No se pudo procesar la imagen HEIC.");
      }
    } else {
      setSelectedFile(file);
      setMediaType("image");
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleClose = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setPreviewUrl(null);
    setMediaType("image");
    setCaption("");
    setLoading(false);
    onClose();
  };

  const handleSubmit = async () => {
    if (!selectedFile || loading) return;

    setLoading(true);

    try {
      await addStoriContent(selectedFile, caption, mediaType);
      handleClose();
    } catch (error) {
      alerts.error(
        "Upps, hubo un problema",
        "No se logró subir tu historia, intenta de nuevo",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box
        sx={{
          width: { xs: "90vw", sm: "400px" },
          bgcolor: "background.paper",
          borderRadius: "20px",
          p: 3,
          outline: "none",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant='h6' sx={{ fontWeight: 700, color: "#D82E7A" }}>
            Compartir Historia
          </Typography>
          <IconButton
            onClick={handleClose}
            disabled={loading}
            size='small'
            sx={{ color: "#d82e7a" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

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
            }}
          >
            <input
              type='file'
              accept='image/*,video/mp4,video/quicktime,video/webm'
              hidden
              onChange={handleFileChange}
            />
            <PhotoCameraIcon sx={{ fontSize: 48, color: "#D82E7A", mb: 1 }} />
            <Typography
              variant='body2'
              sx={{ fontWeight: 600, color: "#D82E7A" }}
            >
              Selecciona una foto o video
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
              bgcolor: "black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {mediaType === "video" ? (
              <Box
                component='video'
                src={previewUrl}
                controls
                autoPlay
                loop
                muted
                playsInline
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            ) : (
              <Box
                component='img'
                src={previewUrl}
                alt='Preview'
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            )}
            <Button
              component='label'
              size='small'
              variant='contained'
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                bgcolor: "rgba(0,0,0,0.6)",
                "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
              }}
            >
              Cambiar
              <input
                type='file'
                accept='image/*,video/mp4,video/quicktime,video/webm'
                hidden
                onChange={handleFileChange}
              />
            </Button>
          </Box>
        )}

        {previewUrl && (
          <TextField
            placeholder='Añade una descripción...'
            fullWidth
            size='small'
            multiline
            rows={2}
            value={caption}
            sx={InputStyles}
            onChange={(e) => setCaption(e.target.value)}
          />
        )}

        <Box
          sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 1 }}
        >
          <Button
            onClick={handleClose}
            disabled={loading}
            color='error'
            variant='contained'
          >
            Cancelar
          </Button>
          <Button
            variant='contained'
            disabled={!selectedFile || loading}
            onClick={handleSubmit}
            sx={{ bgcolor: "#D82E7A", color: "white" }}
          >
            {loading ? (
              <CircularProgress size={20} color='inherit' />
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
