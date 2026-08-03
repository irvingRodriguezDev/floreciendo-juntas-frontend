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
import AuthContext from "../../context/Auth/AuthContext";
const NotificationsBell = () => {
  const { autenticado } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const {
    notifications,
    getAllNotifications,
    getUnreadNotifications,
    notifications_unread,
  } = useContext(NotificationsContext);
  useEffect(() => {
    if (autenticado) {
      getAllNotifications({ unread: true });
      getUnreadNotifications();
    }
  }, [autenticado]);
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
            background: "rgba(255, 255, 255, 0.37)",
            boxShadow: " 0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(6.5px)",
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
