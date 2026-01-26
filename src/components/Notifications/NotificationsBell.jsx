import {
  Badge,
  IconButton,
  Menu,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useContext, useEffect, useState } from "react";
import NotificationsList from "./NotificationsList";
import NotificationsContext from "../../context/Notifications/NotificationsContext";

const NotificationsBell = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const {
    notifications,
    getAllNotifications,
    getUnreadNotifications,
    notifications_unread,
  } = useContext(NotificationsContext);
  useEffect(() => {
    getAllNotifications();
    getUnreadNotifications();
  }, []);
  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <Badge color='error' badgeContent={notifications_unread}>
          <NotificationsIcon sx={{ color: "#d72e7a" }} />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          sx: {
            width: 360,
            maxHeight: 500,
            borderRadius: "12px",
            overflowY: "auto",
          },
        }}
      >
        <Box px={2} py={1}>
          <Typography fontWeight='bold'>Notificaciones</Typography>
        </Box>

        <Divider />

        <NotificationsList
          notifications={notifications}
          onClose={() => setAnchorEl(null)}
        />
      </Menu>
    </>
  );
};

export default NotificationsBell;
