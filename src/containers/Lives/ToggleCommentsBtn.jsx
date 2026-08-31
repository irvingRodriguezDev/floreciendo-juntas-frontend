import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

const ToggleCommentsBtn = ({ commentsVisible, onToggleComments, hudBtn }) => {
  return (
    <Tooltip
      title={commentsVisible ? "Ocultar comentarios" : "Mostrar comentarios"}
      placement='right'
    >
      <IconButton
        onClick={onToggleComments}
        size='small'
        sx={{
          ...hudBtn,
          position: "absolute",
          top: 58,
          left: 12,
          zIndex: 1200,
          ...(commentsVisible && {
            bgcolor: "rgba(229, 56, 136, 0.8)",
            borderColor: "rgba(255, 255, 255, 0.4)",
          }),
        }}
      >
        {commentsVisible ? (
          <ChatBubbleIcon sx={{ fontSize: 16 }} />
        ) : (
          <ChatBubbleOutlineIcon sx={{ fontSize: 16 }} />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default ToggleCommentsBtn;
