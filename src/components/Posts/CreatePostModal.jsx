import React, { useContext, useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Box,
  Stack,
  CircularProgress,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { useSnackbar } from "notistack";
import PostsContext from "../../context/Posts/PostsContext";
import { convertImageToWebp } from "../../utils/convertImageToWebP";

const CreatePostModal = ({ open, onClose, courseId, onPostSuccess }) => {
  const { createPost } = useContext(PostsContext);
  const { enqueueSnackbar } = useSnackbar();

  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // 🛡️ BLOQUEO DE DUPLICADOS

  const handleChangeImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // Convierte cualquier JPG/PNG/HEIC a WebP optimizado
        console.log("convirtiendo");

        const webpFile = await convertImageToWebp(file, {
          maxWidth: 1920,
          maxHeight: 1920,
          quality: 0.85,
        });

        if (image?.urlPhoto) URL.revokeObjectURL(image.urlPhoto);

        setImage({
          urlPhoto: URL.createObjectURL(webpFile),
          file: webpFile,
        });
        console.log(" se ha convertido");
      } catch (err) {
        console.error("Error optimizando imagen:", err);
      }
    }
    e.target.value = null;
  };

  const handleDeleteImage = () => {
    if (image?.urlPhoto) URL.revokeObjectURL(image.urlPhoto);
    setImage(null);
  };

  const handleClose = () => {
    if (isSubmitting) return; // Evita cerrar el modal mientras se envía
    setContent("");
    handleDeleteImage();
    onClose();
  };

  useEffect(() => {
    return () => {
      if (image?.urlPhoto) URL.revokeObjectURL(image.urlPhoto);
    };
  }, [image]);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if ((!content.trim() && !image) || isSubmitting) return;

    setIsSubmitting(true); // 🔒 1. Bloqueo inmediato contra doble clic

    try {
      const formData = new FormData();
      formData.append("courseId", courseId);
      formData.append("content", content.trim());

      if (image) {
        formData.append("attachment", image.file);
      }
      handleClose();
      await createPost(formData);
      enqueueSnackbar("Publicación compartida en el muro 💗", {
        variant: "success",
      });

      handleClose();

      // 🔄 2. Notificar al componente Wall para refrescar la lista una sola vez
      if (onPostSuccess) {
        onPostSuccess();
      }
    } catch (error) {
      enqueueSnackbar(
        "Ocurrió un error al compartir tus dudas/avances. Inténtalo de nuevo.",
        {
          variant: "error",
        },
      );
    } finally {
      setIsSubmitting(false); // 🔓 Desbloqueo al finalizar
    }
  };

  const isFormValid = (content.trim() || image) && !isSubmitting;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth='sm'
      PaperProps={{
        sx: {
          borderRadius: "28px",
          backgroundColor: "rgba(255, 255, 255, 0.98)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 25px 50px -12px rgba(163, 11, 93, 0.25)",
          border: "1px solid rgba(255, 255, 255, 0.8)",
          p: 1,
        },
      }}
    >
      {/* Cabecera */}
      <DialogTitle
        sx={{
          fontWeight: 800,
          color: "#2C1820",
          fontSize: "1.2rem",
          pt: 2,
          pb: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span>Crear publicación</span>
        <IconButton
          onClick={handleClose}
          disabled={isSubmitting}
          sx={{ color: "#71717A" }}
        >
          <CloseIcon sx={{ fontSize: "20px" }} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ mt: 1, pb: 1 }}>
        <TextField
          multiline
          fullWidth
          disabled={isSubmitting}
          minRows={4}
          maxRows={8}
          placeholder='Comparte dudas y/o avances en el curso'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          variant='outlined'
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
              backgroundColor: "#FFF0F6",
              p: 2,
              fontSize: "0.95rem",
              color: "#2C1820",
              "& fieldset": { borderColor: "rgba(215, 46, 121, 0.15)" },
              "&:hover fieldset": { borderColor: "rgba(215, 46, 121, 0.3)" },
              "&.Mui-focused fieldset": { borderColor: "#D72E79" },
            },
          }}
        />

        {/* Zona Adjuntos e Imágenes */}
        <Stack
          direction='row'
          alignItems='center'
          spacing={1.5}
          sx={{ mt: 2.5 }}
        >
          <input
            accept='image/*'
            type='file'
            id='modal-file-input'
            hidden
            disabled={isSubmitting}
            onChange={handleChangeImage}
          />
          <label htmlFor='modal-file-input'>
            <Button
              component='span'
              disabled={isSubmitting}
              startIcon={<AttachFileIcon sx={{ fontSize: "18px" }} />}
              sx={{
                backgroundColor: "#FFF0F6",
                color: "#D72E79",
                borderRadius: "50px",
                textTransform: "none",
                fontWeight: 800,
                fontSize: "13px",
                px: 2.5,
                py: 0.8,
                border: "1px solid rgba(215, 46, 121, 0.2)",
                "&:hover": { backgroundColor: "#FFE4EF" },
              }}
            >
              Foto de práctica
            </Button>
          </label>
        </Stack>

        {/* Vista previa tipo Galería */}
        {image && (
          <Box
            sx={{
              mt: 2.5,
              position: "relative",
              width: "100%",
              borderRadius: "20px",
              overflow: "hidden",
            }}
          >
            <Box
              component='img'
              src={image.urlPhoto}
              alt='Preview'
              sx={{
                width: "100%",
                maxHeight: "300px",
                objectFit: "cover",
                borderRadius: "20px",
                backgroundColor: "#FFF0F6",
                border: "1px solid rgba(215, 46, 121, 0.15)",
              }}
            />
            <IconButton
              onClick={handleDeleteImage}
              disabled={isSubmitting}
              sx={{
                position: "absolute",
                top: 12,
                right: 12,
                backgroundColor: "rgba(44, 24, 32, 0.75)",
                color: "#ffffff",
                "&:hover": { backgroundColor: "rgba(44, 24, 32, 0.9)" },
                width: 32,
                height: 32,
              }}
            >
              <DeleteIcon sx={{ fontSize: "16px" }} />
            </IconButton>
          </Box>
        )}
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          pb: 2.5,
          pt: 1.5,
          justifyContent: "flex-end",
          gap: 1.5,
        }}
      >
        <Button
          onClick={handleClose}
          disabled={isSubmitting}
          sx={{
            color: "#71717A",
            fontWeight: 700,
            textTransform: "none",
            fontSize: "0.95rem",
            borderRadius: "50px",
          }}
        >
          Cancelar
        </Button>
        <Button
          variant='contained'
          onClick={handleSubmit}
          disabled={!isFormValid}
          startIcon={
            isSubmitting ? (
              <CircularProgress size={18} color='inherit' />
            ) : (
              <SendIcon sx={{ fontSize: 16 }} />
            )
          }
          sx={{
            borderRadius: "50px",
            px: 3.5,
            py: 1,
            fontWeight: 800,
            textTransform: "none",
            fontSize: "0.95rem",
            background: "linear-gradient(135deg, #FF4B93 0%, #D72E79 100%)",
            boxShadow: "0 6px 18px rgba(215, 46, 121, 0.28)",
            transition: "all 0.25s ease",
            "&:hover": {
              background: "linear-gradient(135deg, #D72E79 0%, #B81D60 100%)",
              boxShadow: "0 8px 22px rgba(215, 46, 121, 0.38)",
            },
            "&.Mui-disabled": {
              backgroundColor: "#E4E4E7",
              color: "#A1A1AA",
            },
          }}
        >
          {isSubmitting ? "Publicando..." : "Publicar en el muro"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePostModal;
