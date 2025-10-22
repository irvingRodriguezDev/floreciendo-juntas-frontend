import { useContext, useState, useEffect } from "react";
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
  ImageListItem,
  Stack,
  Divider,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DeleteIcon from "@mui/icons-material/Delete";
import PostsContext from "../../context/Posts/PostsContext";

const CreatePostModal = ({ open, onClose, courseId }) => {
  const { createPost } = useContext(PostsContext);
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Liberar la URL anterior si existía
      if (image?.urlPhoto) URL.revokeObjectURL(image.urlPhoto);

      setImage({
        urlPhoto: URL.createObjectURL(file),
        file, // El File real para enviar
      });
    }
    e.target.value = null; // Para poder seleccionar el mismo archivo otra vez
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

  const handleSubmit = async () => {
    if (!content.trim() && !image) return;

    const formData = new FormData();
    formData.append("courseId", courseId);
    formData.append("content", content);

    if (image) {
      formData.append("attachment", image.file); // File real
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
      maxWidth='md'
      PaperProps={{
        sx: {
          borderRadius: "12px",
          background: "linear-gradient(180deg, #fff, #fff6fa)",
          boxShadow: "0px 8px 24px rgba(216, 46, 122, 0.15)",
          p: 1,
        },
      }}
    >
      <DialogTitle
        sx={{ fontWeight: 700, textAlign: "center", color: "#d82e7a", pb: 0 }}
      >
        Crear nueva publicación 💬
      </DialogTitle>

      <DialogContent sx={{ mt: 1 }}>
        <TextField
          multiline
          fullWidth
          minRows={4}
          placeholder='¿Qué estás pensando hoy?'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          variant='outlined'
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              backgroundColor: "#fff1f7",
              "& fieldset": { borderColor: "#f8bbd0" },
              "&:hover fieldset": { borderColor: "#d82e7a" },
              "&.Mui-focused fieldset": { borderColor: "#d82e7a" },
            },
          }}
        />

        <Divider sx={{ my: 2, borderColor: "#f8bbd0" }} />

        <Stack direction='row' alignItems='center' spacing={1}>
          <input
            accept='image/*'
            type='file'
            id='file-input'
            hidden
            onChange={handleChangeImage}
          />
          <label htmlFor='file-input'>
            <IconButton
              component='span'
              sx={{
                bgcolor: "#fdeaf2",
                borderRadius: "12px",
                border: "1px solid #f8bbd0",
                "&:hover": { bgcolor: "#fcd0e0" },
              }}
            >
              <AttachFileIcon sx={{ color: "#d82e7a" }} />
            </IconButton>
          </label>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{ fontStyle: "italic" }}
          >
            Adjuntar imagen
          </Typography>
        </Stack>

        {image && (
          <Box sx={{ mt: 3 }}>
            <Typography
              variant='subtitle2'
              sx={{ mb: 1, color: "#d82e7a", fontWeight: 600 }}
            >
              Vista previa
            </Typography>
            <ImageListItem
              sx={{
                position: "relative",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(216,46,122,0.15)",
                width: "100%",
                height: 250,
              }}
            >
              <img
                src={image.urlPhoto}
                alt='preview'
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <IconButton
                onClick={handleDeleteImage}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  bgcolor: "rgba(255,255,255,0.7)",
                  "&:hover": { bgcolor: "white" },
                  color: "#d82e7a",
                }}
              >
                <DeleteIcon />
              </IconButton>
            </ImageListItem>
          </Box>
        )}
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          pb: 2,
          pt: 1,
          justifyContent: "space-between",
          borderTop: "1px solid #f8bbd0",
        }}
      >
        <Button
          onClick={handleClose}
          sx={{
            color: "#d82e7a",
            fontWeight: 600,
            textTransform: "none",
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
            bgcolor: "#d82e7a",
            borderRadius: "12px",
            px: 3,
            fontWeight: 600,
            textTransform: "none",
            "&:hover": { bgcolor: "#c0276d" },
            "&.Mui-disabled": { bgcolor: "#f8bbd0", color: "#fff" },
          }}
        >
          Publicar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePostModal;
