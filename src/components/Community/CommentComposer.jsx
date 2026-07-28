import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useContext, useRef, useState } from "react";
import AuthContext from "../../context/Auth/AuthContext";
import CommunityContext from "../../context/Community/CommunityContext";
import MediaPreviewItem from "./MediaPreviewItem";
import heic2any from "heic2any";
import Swal from "sweetalert2";

const MAX_FILES = 4;
const MAX_FILE_SIZE_MB = 25;

const CommentComposer = ({ post_id }) => {
  const { usuario } = useContext(AuthContext);
  const { createCommentPostCommunity } = useContext(CommunityContext);

  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const convertHeicToJpeg = async (file) => {
    const convertedBlob = await heic2any({
      blob: file,
      toType: "image/jpeg",
      quality: 0.9,
    });

    return new File([convertedBlob], file.name.replace(/\.heic$/i, ".jpg"), {
      type: "image/jpeg",
    });
  };

  const handleFiles = async (e) => {
    const selected = Array.from(e.target.files || []);
    const availableSlots = MAX_FILES - files.length;

    if (selected.length > availableSlots) {
      Swal.fire({
        icon: "warning",
        title: "Límite superado",
        text: `Solo puedes adjuntar hasta ${MAX_FILES} archivos por comentario.`,
        confirmButtonColor: "#D72E7A",
      });
    }

    const processedFiles = [];

    for (const file of selected.slice(0, availableSlots)) {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        Swal.fire({
          icon: "error",
          title: "Archivo muy pesado",
          text: `El archivo ${file.name} supera el límite de ${MAX_FILE_SIZE_MB}MB.`,
          confirmButtonColor: "#D72E7A",
        });
        continue;
      }

      if (
        file.type === "image/heic" ||
        file.name.toLowerCase().endsWith(".heic")
      ) {
        try {
          const converted = await convertHeicToJpeg(file);
          processedFiles.push(converted);
        } catch (err) {
          console.error("Error convirtiendo HEIC:", err);
        }
      } else {
        processedFiles.push(file);
      }
    }

    setFiles((prev) => [...prev, ...processedFiles]);
    e.target.value = "";
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if ((!content.trim() && files.length === 0) || isSubmitting) return;

    try {
      setIsSubmitting(true);

      await createCommentPostCommunity(post_id, {
        content,
        files,
        user: usuario,
      });

      setContent("");
      setFiles([]);
    } catch (error) {
      console.error("Error al publicar comentario:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Permitir enviar con Ctrl + Enter / Cmd + Enter
  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Box sx={{ mt: 1.5 }}>
      <Stack direction='row' spacing={1.2} alignItems='flex-start'>
        {/* AVATAR DEL USUARIO ACTUAL CON FALLBACK */}
        <Avatar
          src={usuario?.profileImage}
          alt={usuario?.name || "Usuario"}
          sx={{
            width: 34,
            height: 34,
            mt: 0.5,
            border: "1px solid rgba(215, 46, 122, 0.15)",
          }}
        >
          {usuario?.name ? usuario.name.charAt(0).toUpperCase() : "U"}
        </Avatar>

        <Box flex={1}>
          {/* CAMPO DE TEXTO */}
          <TextField
            fullWidth
            multiline
            minRows={1}
            maxRows={4}
            placeholder={`${usuario?.name ? usuario.name.split(" ")[0] : "Hola"}, escribe un comentario…`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isSubmitting}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",
                backgroundColor: "#FAF8F9",
                fontSize: "0.88rem",
                "& fieldset": {
                  borderColor: "rgba(0,0,0,0.06)",
                },
                "&:hover fieldset": { borderColor: "#D72E7A" },
                "&.Mui-focused fieldset": {
                  borderColor: "#D72E7A",
                  borderWidth: "1.5px",
                },
              },
            }}
          />

          {/* VISTA PREVIA DE ARCHIVOS ADJUNTOS */}
          {files.length > 0 && (
            <Stack direction='row' spacing={1} mt={1} flexWrap='wrap'>
              {files.map((file, index) => (
                <MediaPreviewItem
                  key={index}
                  file={file}
                  onRemove={() => removeFile(index)}
                />
              ))}
            </Stack>
          )}

          {/* BARRA DE ACCIONES ABAJO DEL INPUT */}
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            mt={1}
          >
            <Stack direction='row' spacing={1} alignItems='center'>
              <Tooltip title='Adjuntar foto o video'>
                <span>
                  <IconButton
                    onClick={() => fileInputRef.current?.click()}
                    disabled={files.length >= MAX_FILES || isSubmitting}
                    size='small'
                    sx={{
                      color:
                        files.length >= MAX_FILES ? "text.disabled" : "#D72E7A",
                      backgroundColor: "rgba(215, 46, 122, 0.06)",
                      "&:hover": {
                        backgroundColor: "rgba(215, 46, 122, 0.12)",
                      },
                    }}
                  >
                    <AddPhotoAlternateIcon sx={{ fontSize: "19px" }} />
                  </IconButton>
                </span>
              </Tooltip>

              {files.length > 0 && (
                <Typography
                  fontSize='0.75rem'
                  color='text.secondary'
                  fontWeight={600}
                >
                  {files.length}/{MAX_FILES}
                </Typography>
              )}

              <input
                ref={fileInputRef}
                type='file'
                hidden
                multiple
                accept='image/*,video/*'
                onChange={handleFiles}
              />
            </Stack>

            {/* BOTÓN ENVIAR */}
            <Button
              size='small'
              variant='contained'
              onClick={handleSubmit}
              disabled={(!content.trim() && files.length === 0) || isSubmitting}
              startIcon={
                isSubmitting ? (
                  <CircularProgress size={14} color='inherit' />
                ) : null
              }
              sx={{
                borderRadius: "20px",
                px: 2.2,
                py: 0.5,
                textTransform: "none",
                fontWeight: 700,
                fontSize: "0.82rem",
                backgroundColor: "#D72E7A",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#B82365",
                  boxShadow: "0 2px 8px rgba(215, 46, 122, 0.3)",
                },
                "&.Mui-disabled": { backgroundColor: "#E0E0E0" },
              }}
            >
              {isSubmitting ? "Enviando..." : "Comentar"}
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default CommentComposer;
