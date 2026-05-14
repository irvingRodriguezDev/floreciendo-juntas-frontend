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
  Grid,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import CommunityContext from "../../context/Community/CommunityContext";
import Swal from "sweetalert2";
import AuthContext from "../../context/Auth/AuthContext";
import CloseIcons from "../icons/CloseIcons";
import TimeSelectPinnedPost from "../Selects/TimeSelectPinnedPost";
import TypePostSelect from "../Selects/TypePostSelect";

const MAX_CONTENT = 1500;
const MAX_TITLE = 120;
const MAX_FILES = 4;

export default function CreatePostModal({ open, handleClose }) {
  const { createPostCommunity } = useContext(CommunityContext);
  const { usuario } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [media, setMedia] = useState([]);
  const [time, setTime] = useState("null");
  const [typePost, setTypePost] = useState("floreciendo-juntas");
  const [isPinned, setIsPinned] = useState("no");
  const [loading, setLoading] = useState(false);

  const cleanMedia = () => {
    media.forEach((m) => URL.revokeObjectURL(m.preview));
    setMedia([]);
  };

  const handleFiles = (e) => {
    const files = Array.from(e.target.files);
    if (media.length + files.length > MAX_FILES) {
      Swal.fire({
        icon: "warning",
        title: "Límite alcanzado",
        text: `Solo puedes subir hasta ${MAX_FILES} archivos`,
        timer: 2000,
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
    e.target.value = null;
  };

  const removeMedia = (index) => {
    URL.revokeObjectURL(media[index].preview);
    setMedia((prev) => prev.filter((_, i) => i !== index));
  };

  const onClose = () => {
    setTitle("");
    setContent("");
    setTypePost("floreciendo-juntas");
    cleanMedia();
    handleClose();
    setIsPinned("no");
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      Swal.fire({
        title: "Atención",
        text: "Título y contenido son obligatorios",
        icon: "warning",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("pinned", isPinned === "yes");
    formData.append("durationHours", Number(time));
    formData.append("type", typePost);

    media.forEach((m) => formData.append("files", m.file));

    try {
      await createPostCommunity(formData);
      onClose();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se pudo crear la publicación",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "95%", sm: 580 },
          maxHeight: "90vh",
          overflowY: "auto",
          outline: "none",
        }}
      >
        <Card
          sx={{
            borderRadius: 4,
            p: 3,
            boxShadow: "0 24px 54px rgba(0,0,0,0.25)",
          }}
        >
          {/* Header */}
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            mb={3}
          >
            <Box display='flex' gap={2} alignItems='center'>
              <Avatar
                src={usuario?.profileImage}
                sx={{ width: 50, height: 50, border: "2px solid #E33887" }}
              />
              <Box>
                <Typography
                  variant='h6'
                  fontWeight={800}
                  sx={{ color: "#333", lineHeight: 1.2 }}
                >
                  Crear Publicación
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  Compartiendo como <b>{usuario?.name}</b>
                </Typography>
              </Box>
            </Box>
            <IconButton
              onClick={onClose}
              sx={{
                transition: "0.3s",
                "&:hover": { transform: "rotate(90deg)" },
              }}
            >
              <CloseIcons width={28} />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            {/* Sector de Configuración (Tipo y Pinned) */}
            <Box
              sx={{
                p: 2,
                bgcolor: "rgba(216,46,122,0.03)",
                borderRadius: 3,
                border: "1px solid rgba(216,46,122,0.1)",
              }}
            >
              <Grid container spacing={2} alignItems='center'>
                <Grid size={12}>
                  <TypePostSelect
                    detectarCambiosTypePost={(val) => setTypePost(val.value)}
                  />
                </Grid>

                {usuario?.roleId === 1 && (
                  <>
                    <Grid size={12}>
                      <Divider sx={{ borderStyle: "dashed" }} />
                    </Grid>
                    <Grid size={6}>
                      <Typography
                        variant='caption'
                        fontWeight='800'
                        color='#E33887'
                        sx={{
                          display: "block",
                          mb: 0.5,
                          textTransform: "uppercase",
                        }}
                      >
                        ¿Anclar Post?
                      </Typography>
                      <RadioGroup
                        row
                        value={isPinned}
                        onChange={(e) => setIsPinned(e.target.value)}
                      >
                        <FormControlLabel
                          value='yes'
                          control={
                            <Radio
                              size='small'
                              sx={{
                                color: "#E33887",
                                "&.Mui-checked": { color: "#E33887" },
                              }}
                            />
                          }
                          label={<Typography variant='body2'>Sí</Typography>}
                        />
                        <FormControlLabel
                          value='no'
                          control={
                            <Radio
                              size='small'
                              sx={{
                                color: "#E33887",
                                "&.Mui-checked": { color: "#E33887" },
                              }}
                            />
                          }
                          label={<Typography variant='body2'>No</Typography>}
                        />
                      </RadioGroup>
                    </Grid>
                    <Grid size={6}>
                      <TimeSelectPinnedPost
                        detectarCambiosTimePinned={(val) => setTime(val.value)}
                      />
                    </Grid>
                  </>
                )}
              </Grid>
            </Box>

            {/* Area de Texto */}
            <Box>
              <TextField
                placeholder='Título impactante...'
                variant='standard'
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                inputProps={{ maxLength: MAX_TITLE }}
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: "1.3rem", fontWeight: 700, color: "#333" },
                }}
              />
              <Typography
                variant='caption'
                color={title.length >= MAX_TITLE ? "error" : "text.secondary"}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                {title.length}/{MAX_TITLE}
              </Typography>

              <TextField
                placeholder='¿Qué tienes en mente hoy?'
                multiline
                minRows={3}
                variant='standard'
                fullWidth
                value={content}
                onChange={(e) => setContent(e.target.value)}
                inputProps={{ maxLength: MAX_CONTENT }}
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: "1.05rem", mt: 1, color: "#555" },
                }}
              />
              <Typography
                variant='caption'
                color={
                  content.length >= MAX_CONTENT ? "error" : "text.secondary"
                }
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                {content.length}/{MAX_CONTENT}
              </Typography>
            </Box>
          </Box>

          {/* Previsualización de Media */}
          {media.length > 0 && (
            <Box
              sx={{
                display: "flex",
                gap: 1.5,
                mt: 2,
                overflowX: "auto",
                py: 1,
              }}
            >
              {media.map((m, i) => (
                <Box
                  key={i}
                  sx={{
                    position: "relative",
                    flexShrink: 0,
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  }}
                >
                  <Box
                    component={m.type === "image" ? "img" : "video"}
                    src={m.preview}
                    sx={{ width: 120, height: 120, objectFit: "cover" }}
                  />
                  <IconButton
                    size='small'
                    onClick={() => removeMedia(i)}
                    sx={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      bgcolor: "rgba(0,0,0,0.6)",
                      color: "white",
                      "&:hover": { bgcolor: "black" },
                    }}
                  >
                    <CloseIcons width={14} />
                  </IconButton>
                </Box>
              ))}
            </Box>
          )}

          <Divider sx={{ my: 3 }} />

          {/* Footer */}
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
          >
            <Box
              display='flex'
              alignItems='center'
              sx={{ bgcolor: "#f5f5f5", borderRadius: 10, px: 1 }}
            >
              <Tooltip title='Imagen'>
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
              </Tooltip>
              <Tooltip title='Video'>
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
              </Tooltip>
              <Box sx={{ width: 1, height: 20, bgcolor: "#ccc", mx: 1 }} />
              <Typography
                variant='caption'
                sx={{ fontWeight: "bold", color: "text.secondary", pr: 1.5 }}
              >
                {media.length}/{MAX_FILES}
              </Typography>
            </Box>

            <Button
              onClick={handleSubmit}
              disabled={!title.trim() || !content.trim() || loading}
              variant='contained'
              sx={{
                borderRadius: 20,
                px: 6,
                py: 1.2,
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: "bold",
                background: "linear-gradient(45deg, #D82E7A 30%, #E33887 90%)",
                boxShadow: "0 6px 20px rgba(216, 46, 122, 0.4)",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(216, 46, 122, 0.5)",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={26} color='inherit' />
              ) : (
                "Publicar"
              )}
            </Button>
          </Box>
        </Card>
      </Box>
    </Modal>
  );
}
