import { Box, Typography, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MethodPost, MethodPut } from "../../config/Service";
// import { markAsRead } from "../../services/notifications";
import NotificationsContext from "../../context/Notifications/NotificationsContext";
import { useContext } from "react";
const NotificationItem = ({ notification, onClick }) => {
  const { makeAsReadNotification } = useContext(NotificationsContext);
  const navigate = useNavigate();

  const handleClick = async () => {
    if (!notification.readAt) {
      await makeAsReadNotification(notification.id);
    }

    navigate(notification.url);
    onClick?.();
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        p: 2,
        cursor: "pointer",
        bgcolor: notification.readAt ? "transparent" : "#FBECEC",
        "&:hover": { bgcolor: "#F3E5F5" },
      }}
    >
      <Typography fontWeight={notification.readAt ? "normal" : "bold"}>
        {notification.title}
      </Typography>

      <Typography variant='body2' color='text.secondary'>
        {notification.body}
      </Typography>
    </Box>
  );
};

export default NotificationItem;
