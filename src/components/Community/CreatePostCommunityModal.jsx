import React, { useContext, useState } from "react";
import {
  Box,
  Card,
  Avatar,
  TextField,
  Typography,
  IconButton,
  Button,
  Divider,
  Modal,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import CloseIcon from "@mui/icons-material/Close";
import CommunityContext from "../../context/Community/CommunityContext";
import Swal from "sweetalert2";
import AuthContext from "../../context/Auth/AuthContext";
import CloseIcons from "../icons/CloseIcons";
export default function CreatePostModal({ open, handleClose }) {
  const { createPostCommunity } = useContext(CommunityContext);
  const { usuario } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [media, setMedia] = useState([]);
  const MAX_CONTENT = 1500;
  /* 📎 Manejo de archivos (máx 4) */
  const handleFiles = (e) => {
    const files = Array.from(e.target.files);

    if (media.length + files.length > 4) {
      Swal.fire({
        icon: "warning",
        title: "Límite alcanzado",
        text: "Solo puedes subir hasta 4 archivos",
        timer: 2500,
        showConfirmButton: false,
      });
      return;
    }

    const previews = files.map((file) => ({
      file,
      type: file.type.startsWith("video") ? "video" : "image",
      preview: URL.createObjectURL(file),
    }));

    setMedia((prev) => [...prev, ...previews]);
  };
  const getTitleCounterColor = (length) => {
    if (length < 80) return "success.main";
    if (length <= 100) return "warning.main";
    return "error.main";
  };
  const getContentCounterColor = (length) => {
    if (length < 1100) return "success.main";
    if (length <= 1350) return "warning.main";
    return "error.main";
  };
  const removeMedia = (index) => {
    setMedia((prev) => prev.filter((_, i) => i !== index));
  };

  /* 🚀 Submit */
  const handleSubmit = () => {
    if (!title || !content) {
      Swal.fire({
        title: "Atención",
        text: "Todos los campos son obligatorios",
        icon: "warning",
        showConfirmButton: false,
        timer: 2500,
      });
      return;
    }
    if (title.length > 120) {
      Swal.fire({
        icon: "warning",
        title: "Título muy largo",
        text: "El título no puede superar los 120 caracteres",
        timer: 2500,
        showConfirmButton: false,
      });
      return;
    }

    if (content.length > 3000) {
      Swal.fire({
        icon: "warning",
        title: "Contenido muy largo",
        text: "El contenido no puede superar los 3000 caracteres",
        timer: 2500,
        showConfirmButton: false,
      });
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    media.forEach((m) => {
      formData.append("files", m.file);
    });

    createPostCommunity(formData);

    // Limpieza
    setTitle("");
    setContent("");
    setMedia([]);
    handleClose();
  };

  const onClose = () => {
    setTitle("");
    setContent("");
    setMedia([]);
    handleClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 520 },
          outline: "none",
        }}
      >
        <Card
          sx={{
            borderRadius: 3,
            p: 2,
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          }}
        >
          {/* 🧑 Header */}
          <Box display='flex' justifyContent='space-between' mb={2}>
            <Box display='flex' gap={2}>
              <Avatar src={usuario?.profileImage} />
              <Box>
                <Typography fontWeight={700}>{usuario?.name}</Typography>
                <Typography variant='caption' color='text.secondary'>
                  Publicar en Floreciendo Juntas
                </Typography>
              </Box>
            </Box>

            <IconButton onClick={onClose}>
              <CloseIcons width={40} />
            </IconButton>
          </Box>

          {/* 🏷️ Título */}
          <TextField
            placeholder='Título'
            variant='standard'
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value.slice(0, 120))}
            inputProps={{ maxLength: 120 }}
            InputProps={{
              disableUnderline: true,
              sx: {
                color: title.length > 100 ? "error.main" : "text.primary",
              },
            }}
            sx={{ mb: 0.5 }}
          />
          <Typography
            variant='caption'
            sx={{
              mt: -1,
              color: getTitleCounterColor(title.length),
              fontWeight: 600,
              transition: "color 0.2s ease",
            }}
          >
            {title.length}/120
          </Typography>

          {/* ✍️ Contenido */}
          <TextField
            placeholder='Comparte algo con la comunidad...'
            multiline
            minRows={3}
            variant='standard'
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value.slice(0, MAX_CONTENT))}
            inputProps={{ maxLength: MAX_CONTENT }}
            InputProps={{ disableUnderline: true }}
          />

          <Typography
            variant='caption'
            sx={{
              color: getContentCounterColor(title.length),
              fontWeight: 600,
              transition: "color 0.2s ease",
            }}
          >
            {content.length}/{MAX_CONTENT}
          </Typography>

          {/* 🖼 Preview media */}
          {media.length > 0 && (
            <Box
              sx={{
                display: "flex",
                gap: 2,
                mt: 2,
                overflowX: "auto",
                pb: 1,
              }}
            >
              {media.map((m, i) => (
                <Box key={i} sx={{ position: "relative" }}>
                  {m.type === "image" ? (
                    <Box
                      component='img'
                      src={m.preview}
                      alt=''
                      sx={{
                        width: 180,
                        height: 180,
                        borderRadius: 2,
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <video
                      src={m.preview}
                      controls
                      style={{
                        width: 220,
                        height: 180,
                        borderRadius: 12,
                        objectFit: "cover",
                      }}
                    />
                  )}

                  <IconButton
                    size='small'
                    onClick={() => removeMedia(i)}
                    sx={{
                      position: "absolute",
                      top: 6,
                      right: 6,
                      bgcolor: "rgba(0,0,0,0.6)",
                      color: "white",
                      "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
                    }}
                  >
                    <CloseIcon fontSize='small' />
                  </IconButton>
                </Box>
              ))}
            </Box>
          )}

          <Divider sx={{ my: 2 }} />

          {/* ⚙️ Acciones */}
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
          >
            <Box>
              <IconButton component='label'>
                <ImageIcon sx={{ color: "#d72e7a" }} />
                <input
                  type='file'
                  hidden
                  multiple
                  accept='image/*'
                  onChange={handleFiles}
                />
              </IconButton>

              <IconButton component='label'>
                <VideocamIcon sx={{ color: "#d72e7a" }} />
                <input
                  type='file'
                  hidden
                  multiple
                  accept='video/*'
                  onChange={handleFiles}
                />
              </IconButton>

              <Typography variant='caption' color='text.secondary' ml={1}>
                {media.length}/4
              </Typography>
            </Box>

            <Button
              onClick={handleSubmit}
              disabled={!title || !content}
              variant='contained'
              sx={{
                borderRadius: 20,
                px: 4,
                textTransform: "none",
                background: "#D82E7A",
                "&:disabled": {
                  opacity: 0.5,
                },
              }}
            >
              Publicar
            </Button>
          </Box>
        </Card>
      </Box>
    </Modal>
  );
}
