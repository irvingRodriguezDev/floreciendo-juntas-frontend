import { Box, IconButton, Stack, Typography } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";

const MediaPreviewItem = ({ file, onRemove }) => {
  const isVideo = file.type.startsWith("video");
  const [error, setError] = useState(false);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  if (!url) return null;

  return (
    <Box
      sx={{
        width: 72,
        height: 72,
        borderRadius: "12px",
        overflow: "hidden",
        position: "relative",
        backgroundColor: "#eee",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isVideo ? (
        <video
          src={url}
          muted
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : !error ? (
        <img
          src={url}
          alt=''
          onError={() => setError(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            imageOrientation: "from-image",
          }}
        />
      ) : (
        <Stack alignItems='center' spacing={0.5}>
          <AddPhotoAlternateIcon sx={{ fontSize: 28, color: "#999" }} />
          <Typography fontSize='0.65rem' color='text.secondary'>
            Imagen
          </Typography>
        </Stack>
      )}

      <IconButton
        size='small'
        onClick={onRemove}
        sx={{
          position: "absolute",
          top: 2,
          right: 2,
          backgroundColor: "rgba(0,0,0,0.5)",
          color: "#fff",
        }}
      >
        <CloseIcon fontSize='inherit' />
      </IconButton>
    </Box>
  );
};

export default MediaPreviewItem;
