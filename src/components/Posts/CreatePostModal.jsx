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
  Typography,
  Stack,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import PostsContext from "../../context/Posts/PostsContext";

const CreatePostModal = ({ open, onClose, courseId }) => {
  const { createPost } = useContext(PostsContext);
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (image?.urlPhoto) URL.revokeObjectURL(image.urlPhoto);

      setImage({
        urlPhoto: URL.createObjectURL(file),
        file,
      });
    }
    e.target.value = null;
  };

  const handleDeleteImage = () => {
    if (image?.urlPhoto) URL.revokeObjectURL(image.urlPhoto);
    setImage(null);
  };

  const handleClose = () => {
    setContent("");
    handleDeleteImage();
    onClose();
  };

  // 🔥 Limpieza en el desmontaje para evitar fugas de memoria
  useEffect(() => {
    return () => {
      if (image?.urlPhoto) URL.revokeObjectURL(image.urlPhoto);
    };
  }, [image]);

  const handleSubmit = async () => {
    if (!content.trim() && !image) return;

    const formData = new FormData();
    formData.append("courseId", courseId);
    formData.append("content", content);

    if (image) {
      formData.append("attachment", image.file);
    }

    await createPost(formData);
    handleClose();
  };

  const isFormValid = content.trim() || image;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth='sm' // Ajustado a SM para que se vea más compacto y estético estilo app móvil de lujo
      PaperProps={{
        sx: {
          borderRadius: "24px",
          backgroundColor: "#ffffff",
          boxShadow: "none",
          border: "1px solid #F3F4F6",
          p: 1,
        },
      }}
    >
      {/* Cabecera con botón de cerrar integrado */}
      <DialogTitle
        sx={{
          fontWeight: 800,
          color: "#1F2937",
          fontSize: "1.15rem",
          pt: 2,
          pb: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span>Crear publicación</span>
        <IconButton onClick={handleClose} sx={{ color: "#9CA3AF" }}>
          <CloseIcon sx={{ fontSize: "20px" }} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ mt: 1, pb: 1 }}>
        <TextField
          multiline
          fullWidth
          minRows={4}
          maxRows={8}
          placeholder='¿Qué quieres compartir hoy con la comunidad Wapizima?...'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          variant='outlined'
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "16px",
              backgroundColor: "#F9FAFB", // Fondo gris ultra limpio en lugar de rosa saturado
              p: 2,
              fontSize: "0.95rem",
              "& fieldset": { borderColor: "#E5E7EB" },
              "&:hover fieldset": { borderColor: "#F472B6" },
              "&.Mui-focused fieldset": { borderColor: "#E53888" },
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
            onChange={handleChangeImage}
          />
          <label htmlFor='modal-file-input'>
            <Button
              component='span'
              startIcon={<AttachFileIcon sx={{ fontSize: "18px" }} />}
              sx={{
                backgroundColor: "#FFF5F7",
                color: "#E53888",
                borderRadius: "12px",
                textTransform: "none",
                fontWeight: "bold",
                fontSize: "13px",
                px: 2,
                py: 0.8,
                "&:hover": { backgroundColor: "#FCE7F3" },
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
              mt: 3,
              position: "relative",
              width: "100%",
              borderRadius: "16px",
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
                borderRadius: "16px",
                backgroundColor: "#F9FAFB",
                border: "1px solid #E5E7EB",
              }}
            />
            <IconButton
              onClick={handleDeleteImage}
              sx={{
                position: "absolute",
                top: 12,
                right: 12,
                backgroundColor: "rgba(31, 41, 55, 0.7)", // Fondo oscuro semitransparente profesional
                color: "#ffffff",
                "&:hover": { backgroundColor: "rgba(31, 41, 55, 0.9)" },
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
          pb: 2,
          pt: 2,
          justifyContent: "flex-end",
          gap: 1.5,
        }}
      >
        <Button
          onClick={handleClose}
          sx={{
            color: "#6B7280",
            fontWeight: 700,
            textTransform: "none",
            fontSize: "0.95rem",
            borderRadius: "12px",
          }}
        >
          Cancelar
        </Button>
        <Button
          variant='contained'
          onClick={handleSubmit}
          disabled={!isFormValid}
          sx={{
            backgroundColor: "#E53888",
            color: "white",
            borderRadius: "14px",
            px: 4,
            py: 1,
            fontWeight: "bold",
            textTransform: "none",
            fontSize: "0.95rem",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#C2185B",
              boxShadow: "none",
            },
            "&.Mui-disabled": {
              backgroundColor: "#F3F4F6",
              color: "#9CA3AF",
            },
          }}
        >
          Publicar en el muro
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePostModal;
