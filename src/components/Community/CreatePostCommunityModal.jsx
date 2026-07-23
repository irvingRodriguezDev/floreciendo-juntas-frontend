import React, { useContext, useState, useMemo } from "react";
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
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
  Tooltip,
  Chip,
  Fade,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import CommunityContext from "../../context/Community/CommunityContext";
import AuthContext from "../../context/Auth/AuthContext";
import CloseIcons from "../icons/CloseIcons";
import TimeSelectPinnedPost from "../Selects/TimeSelectPinnedPost";
import TypePostSelect from "../Selects/TypePostSelect";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { colors } from "../../utils/QuillModules";
import { alerts } from "../../utils/Alerts";

// Link personalizado para Quill
const Link = ReactQuill.Quill.import("formats/link");
class CustomLink extends Link {
  static create(value) {
    const node = super.create(value);
    node.setAttribute("target", "_blank");
    node.setAttribute("rel", "noopener noreferrer");
    return node;
  }
}
ReactQuill.Quill.register(CustomLink, true);

const MAX_CONTENT = 1500;
const MAX_TITLE = 120;
const MAX_FILES = 4;

const themeColors = {
  primary: "#D82E7A",
  primaryHover: "#C02567",
  primarySoft: "rgba(216, 46, 122, 0.08)",
  borderLight: "rgba(216, 46, 122, 0.12)",
  textDark: "#1F2937",
  textMuted: "#6B7280",
};

export default function CreatePostModal({ open, handleClose, defaultType }) {
  const { createPostCommunity } = useContext(CommunityContext);
  const { usuario } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [media, setMedia] = useState([]);
  const [time, setTime] = useState("null");
  const [typePost, setTypePost] = useState(defaultType || "floreciendo-juntas");
  const [isPinned, setIsPinned] = useState("no");
  const [loading, setLoading] = useState(false);

  const cleanMedia = () => {
    media.forEach((m) => URL.revokeObjectURL(m.preview));
    setMedia([]);
  };

  const quillModules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "blockquote"],
        [{ color: colors }, { background: colors }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "clean"],
      ],
    }),
    [],
  );

  const plainContent = content
    .replace(/<(.|\n)*?>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();

  const contentLength = plainContent.length;

  const handleFiles = (e) => {
    const files = Array.from(e.target.files);
    if (media.length + files.length > MAX_FILES) {
      alerts.error(
        "Límite alcanzado",
        `Solo puedes subir hasta ${MAX_FILES} archivos por publicación.`,
      );
      return;
    }

    const validFiles = [];
    for (const file of files) {
      const isVideo = file.type.startsWith("video");
      const maxSize = isVideo ? 50 * 1024 * 1024 : 10 * 1024 * 1024;

      if (file.size > maxSize) {
        alerts.error(
          "Archivo muy pesado",
          `${file.name} supera el peso máximo permitido (${isVideo ? "50MB" : "10MB"}).`,
        );
        continue;
      }

      validFiles.push({
        file,
        type: isVideo ? "video" : "image",
        preview: URL.createObjectURL(file),
      });
    }

    setMedia((prev) => [...prev, ...validFiles]);
    e.target.value = null;
  };

  const removeMedia = (index) => {
    URL.revokeObjectURL(media[index].preview);
    setMedia((prev) => prev.filter((_, i) => i !== index));
  };

  const onClose = () => {
    setTitle("");
    setContent("");
    setTypePost(defaultType || "floreciendo-juntas");
    cleanMedia();
    setIsPinned("no");
    handleClose();
  };

  const handleSubmit = async () => {
    if (!title.trim() || plainContent.length === 0) {
      alerts.error(
        "Campos incompletos",
        "El título y el contenido son obligatorios.",
      );
      return;
    }

    if (plainContent.length > MAX_CONTENT) {
      alerts.error("Límite excedido", "Has superado el máximo de caracteres.");
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
      alerts.success("¡Publicado!", "Tu post ya está visible en la comunidad.");
      onClose();
    } catch (error) {
      alerts.error("Ocurrió un error", "No se pudo crear la publicación.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Fade in={open}>
        <Box
          sx={{
            width: { xs: "92%", sm: 600 },
            maxHeight: "90vh",
            overflowY: "auto",
            outline: "none",
          }}
        >
          <Card
            elevation={0}
            sx={{
              borderRadius: "28px",
              p: { xs: 2.5, sm: 3.5 },
              bgcolor: "#FFFFFF",
              boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
              border: `1px solid ${themeColors.borderLight}`,
            }}
          >
            {/* Header */}
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              mb={2.5}
            >
              <Box display='flex' gap={1.8} alignItems='center'>
                <Avatar
                  src={usuario?.profileImage}
                  alt={usuario?.name}
                  sx={{
                    width: 48,
                    height: 48,
                    border: `2px solid ${themeColors.primarySoft}`,
                  }}
                />
                <Box>
                  <Typography
                    variant='h6'
                    fontWeight={800}
                    sx={{ color: themeColors.textDark, fontSize: "1.1rem" }}
                  >
                    Crear Publicación
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Publicando como <b>{usuario?.name?.split(" ")[0]}</b>
                  </Typography>
                </Box>
              </Box>

              <IconButton
                onClick={onClose}
                sx={{
                  bgcolor: "#F9FAFB",
                  "&:hover": { bgcolor: "#F3F4F6", transform: "rotate(90deg)" },
                  transition: "all 0.2s ease",
                }}
              >
                <CloseIcons width={20} />
              </IconButton>
            </Box>

            {/* Selector de Categoría (Estilo Badge/Selector) */}
            <Box sx={{ mb: 2 }}>
              <TypePostSelect
                value={typePost}
                detectarCambiosTypePost={(val) => setTypePost(val.value)}
              />
            </Box>

            {/* Opciones de Anclaje para Administradores */}
            {usuario?.roleId === 1 && (
              <Box
                sx={{
                  p: 2,
                  mb: 2.5,
                  bgcolor: "rgba(216,46,122,0.04)",
                  borderRadius: "16px",
                  border: `1px solid ${themeColors.borderLight}`,
                }}
              >
                <Grid container spacing={2} alignItems='center'>
                  <Grid size={6}>
                    <Typography
                      variant='caption'
                      fontWeight='800'
                      sx={{
                        color: themeColors.primary,
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        textTransform: "uppercase",
                      }}
                    >
                      <PushPinOutlinedIcon sx={{ fontSize: 16 }} /> ¿Anclar
                      Post?
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
                              color: themeColors.primary,
                              "&.Mui-checked": { color: themeColors.primary },
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
                              color: themeColors.primary,
                              "&.Mui-checked": { color: themeColors.primary },
                            }}
                          />
                        }
                        label={<Typography variant='body2'>No</Typography>}
                      />
                    </RadioGroup>
                  </Grid>
                  {isPinned === "yes" && (
                    <Grid size={6}>
                      <TimeSelectPinnedPost
                        detectarCambiosTimePinned={(val) => setTime(val.value)}
                      />
                    </Grid>
                  )}
                </Grid>
              </Box>
            )}

            {/* Inputs de Título y Contenido */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <TextField
                placeholder='Escribe un título llamativo...'
                variant='standard'
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                inputProps={{ maxLength: MAX_TITLE }}
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: themeColors.textDark,
                  },
                }}
              />
              <Typography
                variant='caption'
                color={title.length >= MAX_TITLE ? "error" : "text.secondary"}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                {title.length}/{MAX_TITLE}
              </Typography>

              {/* Editor ReactQuill */}
              <Box
                sx={{
                  "& .ql-toolbar": {
                    borderRadius: "14px 14px 0 0",
                    borderColor: "#E5E7EB",
                    bgcolor: "#F9FAFB",
                  },
                  "& .ql-container": {
                    borderRadius: "0 0 14px 14px",
                    borderColor: "#E5E7EB",
                    minHeight: "180px",
                    fontFamily: "inherit",
                  },
                  "& .ql-editor": {
                    minHeight: "180px",
                    fontSize: "0.95rem",
                    color: "#374151",
                  },
                }}
              >
                <ReactQuill
                  theme='snow'
                  value={content}
                  modules={quillModules}
                  placeholder='¿Qué quieres compartir hoy con la comunidad?'
                  onChange={(val) => setContent(val)}
                />
              </Box>

              <Typography
                variant='caption'
                color={
                  contentLength >= MAX_CONTENT ? "error" : "text.secondary"
                }
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                {contentLength}/{MAX_CONTENT}
              </Typography>
            </Box>

            {/* Previsualización de Archivos Subidos */}
            {media.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  gap: 1.5,
                  mt: 1.5,
                  overflowX: "auto",
                  pb: 1,
                }}
              >
                {media.map((m, i) => (
                  <Box
                    key={i}
                    sx={{
                      position: "relative",
                      flexShrink: 0,
                      borderRadius: "14px",
                      overflow: "hidden",
                      border: "1px solid #E5E7EB",
                    }}
                  >
                    <Box
                      component={m.type === "image" ? "img" : "video"}
                      src={m.preview}
                      muted
                      preload='metadata'
                      sx={{ width: 100, height: 100, objectFit: "cover" }}
                    />
                    <Chip
                      label={m.type === "image" ? "Foto" : "Video"}
                      size='small'
                      sx={{
                        position: "absolute",
                        bottom: 4,
                        left: 4,
                        height: 18,
                        fontSize: "0.65rem",
                        bgcolor: "rgba(0,0,0,0.6)",
                        color: "#fff",
                      }}
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
                        padding: "3px",
                        "&:hover": { bgcolor: "black" },
                      }}
                    >
                      <CloseIcons width={12} />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            )}

            <Divider sx={{ my: 2.5, borderColor: "#F3F4F6" }} />

            {/* Footer / Acciones */}
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <Box
                display='flex'
                alignItems='center'
                sx={{
                  bgcolor: "#F9FAFB",
                  borderRadius: "30px",
                  px: 1,
                  py: 0.5,
                  border: "1px solid #E5E7EB",
                }}
              >
                <Tooltip title='Subir Imagen'>
                  <IconButton component='label' size='small'>
                    <ImageIcon
                      sx={{ color: themeColors.primary, fontSize: 22 }}
                    />
                    <input
                      type='file'
                      hidden
                      multiple
                      accept='image/*'
                      onChange={handleFiles}
                    />
                  </IconButton>
                </Tooltip>

                <Tooltip title='Subir Video'>
                  <IconButton component='label' size='small'>
                    <VideocamIcon
                      sx={{ color: themeColors.primary, fontSize: 22 }}
                    />
                    <input
                      type='file'
                      hidden
                      multiple
                      accept='video/*'
                      onChange={handleFiles}
                    />
                  </IconButton>
                </Tooltip>

                <Box sx={{ width: 1, height: 18, bgcolor: "#E5E7EB", mx: 1 }} />

                <Typography
                  variant='caption'
                  sx={{
                    fontWeight: 700,
                    color: themeColors.textMuted,
                    pr: 1.5,
                  }}
                >
                  {media.length}/{MAX_FILES}
                </Typography>
              </Box>

              <Button
                onClick={handleSubmit}
                disabled={
                  !title.trim() ||
                  plainContent.length === 0 ||
                  contentLength > MAX_CONTENT ||
                  loading
                }
                variant='contained'
                disableElevation
                sx={{
                  borderRadius: "14px",
                  px: 4,
                  py: 1.2,
                  textTransform: "none",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  bgcolor: themeColors.primary,
                  color: "#FFFFFF",
                  boxShadow: "0 8px 20px rgba(216, 46, 122, 0.25)",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: themeColors.primaryHover,
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={22} color='inherit' />
                ) : (
                  "Publicar 🌸"
                )}
              </Button>
            </Box>
          </Card>
        </Box>
      </Fade>
    </Modal>
  );
}
