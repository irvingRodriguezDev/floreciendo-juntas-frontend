import { Avatar, Box, IconButton, Typography } from "@mui/material";
import React from "react";
import MenuOptionsStory from "./MenuOptionsStory";
import CloseIcon from "@mui/icons-material/Close";

const HeaderViewModal = ({
  storyGroup,
  onClose,
  fetchStories,
  isOwner,
  currentStory,
}) => {
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Avatar
          src={storyGroup?.profileImage || storyGroup?.profileimage}
          sx={{ width: 36, height: 36, border: "1.5px solid #C02567" }}
        >
          {storyGroup?.userName?.charAt(0)}
        </Avatar>
        <Typography
          variant='subtitle2'
          sx={{ color: "#fff", fontWeight: "bold", fontSize: "16px" }}
        >
          {storyGroup?.userName}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        {isOwner && (
          <MenuOptionsStory
            storyId={currentStory.id}
            closeModal={onClose}
            fetchStories={fetchStories}
          />
        )}
        <IconButton onClick={onClose} sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </Box>
    </>
  );
};

export default HeaderViewModal;
