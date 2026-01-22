import {
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useRef, useState } from "react";
import AuthContext from "../../context/Auth/AuthContext";
import CommunityContext from "../../context/Community/CommunityContext";
import MediaPreviewItem from "./MediaPreviewItem";
import heic2any from "heic2any";

const MAX_FILES = 4;

const CommentComposer = ({ post_id }) => {
  const { usuario } = useContext(AuthContext);
  const { createCommentPostCommunity } = useContext(CommunityContext);

  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
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

    const processedFiles = [];

    for (const file of selected.slice(0, availableSlots)) {
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

  const handleSubmit = () => {
    if (!content.trim() && files.length === 0) return;

    createCommentPostCommunity(post_id, {
      content,
      files,
      user: usuario,
    });

    setContent("");
    setFiles([]);
  };

  return (
    <Box>
      <Stack direction='row' spacing={1.5} alignItems='flex-start'>
        <Avatar src={usuario?.profileImage} sx={{ width: 34, height: 34 }} />

        <Box flex={1}>
          <TextField
            fullWidth
            multiline
            minRows={1}
            maxRows={4}
            placeholder={`${usuario?.name}, escribe un comentario…`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",
                "& fieldset": {
                  borderColor: "#F971AF",
                  borderWidth: "2px",
                },
                "&:hover fieldset": { borderColor: "#F971AF" },
                "&.Mui-focused fieldset": { borderColor: "#F971AF" },
              },
            }}
          />

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

          <Stack direction='row' justifyContent='space-between' mt={1}>
            <Stack direction='row' spacing={1}>
              <IconButton
                onClick={() => fileInputRef.current.click()}
                disabled={files.length >= MAX_FILES}
              >
                <AddPhotoAlternateIcon />
              </IconButton>

              <Typography fontSize='0.75rem'>
                {files.length}/{MAX_FILES}
              </Typography>

              <input
                ref={fileInputRef}
                type='file'
                hidden
                multiple
                accept='image/*,video/*'
                onChange={handleFiles}
              />
            </Stack>

            <Button
              size='small'
              variant='contained'
              onClick={handleSubmit}
              disabled={!content.trim() && files.length === 0}
              sx={{
                borderRadius: "20px",
                px: 2.5,
                backgroundColor: "#F971AF",
                "&:hover": { backgroundColor: "#F45C9E" },
              }}
            >
              Comentar
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default CommentComposer;
