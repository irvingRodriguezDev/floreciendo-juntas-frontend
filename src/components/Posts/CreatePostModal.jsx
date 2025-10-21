import React, { useState } from "react";
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
  ImageList,
  ImageListItem,
  Stack,
  Divider,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DeleteIcon from "@mui/icons-material/Delete";

const CreatePostModal = ({ open, onClose, onSubmit }) => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (content.trim() || images.length > 0) {
      onSubmit({ content, images });
      setContent("");
      setImages([]);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
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
        sx={{
          fontWeight: 700,
          textAlign: "center",
          color: "#d82e7a",
          pb: 0,
        }}
      >
        Crear nueva publicación 💬
      </DialogTitle>

      <DialogContent sx={{ mt: 1 }}>
        {/* Campo de texto */}
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

        {/* Línea divisoria con clip */}
        <Divider sx={{ my: 2, borderColor: "#f8bbd0" }} />

        {/* Botón para adjuntar imagen */}
        <Stack direction='row' alignItems='center' spacing={1}>
          <input
            accept='image/*'
            type='file'
            id='file-input'
            multiple
            hidden
            onChange={handleImageChange}
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
            Adjuntar imágenes
          </Typography>
        </Stack>

        {/* Vista previa de imágenes */}
        {images.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography
              variant='subtitle2'
              sx={{ mb: 1, color: "#d82e7a", fontWeight: 600 }}
            >
              Vista previa de imágenes
            </Typography>
            <ImageList cols={3} gap={10}>
              {images.map((img, index) => (
                <ImageListItem
                  key={index}
                  sx={{
                    position: "relative",
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 2px 8px rgba(216,46,122,0.15)",
                  }}
                >
                  <img
                    src={img.preview}
                    alt={`preview-${index}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "12px",
                    }}
                  />
                  <IconButton
                    size='small'
                    onClick={() => handleRemoveImage(index)}
                    sx={{
                      position: "absolute",
                      top: 6,
                      right: 6,
                      bgcolor: "rgba(216,46,122,0.8)",
                      color: "white",
                      "&:hover": { bgcolor: "rgba(216,46,122,1)" },
                    }}
                  >
                    <DeleteIcon fontSize='small' />
                  </IconButton>
                </ImageListItem>
              ))}
            </ImageList>
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
          onClick={onClose}
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
          disabled={!content.trim() && images.length === 0}
          sx={{
            bgcolor: "#d82e7a",
            borderRadius: "12px",
            px: 3,
            fontWeight: 600,
            textTransform: "none",
            "&:hover": { bgcolor: "#c0276d" },
            "&.Mui-disabled": {
              bgcolor: "#f8bbd0",
              color: "#fff",
            },
          }}
        >
          Publicar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePostModal;
