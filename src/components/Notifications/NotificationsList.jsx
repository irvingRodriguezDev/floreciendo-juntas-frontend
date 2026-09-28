import { Box, Typography } from "@mui/material";
import NotificationsItem from "./NotificationsItem";

const NotificationsList = ({ notifications, onClose }) => {
  if (!notifications.length) {
    return (
      <Box p={2}>
        <Typography color='text.secondary'>
          No tienes notificaciones actualmente
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 1 }}>
      {notifications.map((n) => (
        <NotificationsItem key={n.id} notification={n} onClick={onClose} />
      ))}
    </Box>
  );
};

export default NotificationsList;
