import React, { useContext, useEffect } from "react";
import { IconButton, Badge } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ChatContext from "../../context/Chat/ChatContext";
import ChatsIcon from "../icons/ChatsIcon";

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
        color: "#424242",
        "&:hover": { color: MAIN_PINK },
      }}
    >
      <Badge badgeContent={unreadCount} color='error'>
        <ChatsIcon width={30} />
      </Badge>
    </IconButton>
  );
};

export default HeaderMessageBadge;
