import React from "react";
import { Box, Chip, IconButton } from "@mui/material";
import CloseIcons from "../icons/CloseIcons";

const MediaPreviewList = ({ media, onRemoveMedia }) => {
  if (!media || media.length === 0) return null;

  return (
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
            onClick={() => onRemoveMedia(i)}
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
  );
};

export default MediaPreviewList;
