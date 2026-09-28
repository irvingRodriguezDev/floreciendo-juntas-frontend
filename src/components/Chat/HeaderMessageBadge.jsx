import React, { useContext, useEffect } from "react";
import { IconButton, Badge } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ChatContext from "../../context/Chat/ChatContext";
import ChatsIcon from "../icons/ChatsIcon";
import ForumIcon from "@mui/icons-material/Forum";
const MAIN_PINK = "#D72E79";

const HeaderMessageBadge = () => {
  const { unreadCount, getUnreadCount, toggleInboxDrawer } =
    useContext(ChatContext);

  useEffect(() => {
    getUnreadCount();
  }, []);

  return (
    <IconButton
      onClick={() => toggleInboxDrawer(true)}
      sx={{
        color: MAIN_PINK,
        "&:hover": { color: MAIN_PINK },
      }}
    >
      <Badge badgeContent={unreadCount} color='error'>
        <ForumIcon width={30} />
      </Badge>
    </IconButton>
  );
};

export default HeaderMessageBadge;
