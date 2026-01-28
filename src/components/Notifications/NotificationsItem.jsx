import { Box, Typography, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NotificationsContext from "../../context/Notifications/NotificationsContext";
import { useContext } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

dayjs.extend(relativeTime);
dayjs.locale("es");

const NotificationItem = ({ notification, onClick }) => {
  const { makeAsReadNotification } = useContext(NotificationsContext);
  const navigate = useNavigate();

  const unread = !notification.readAt;

  const handleClick = () => {
    // 🔹 Marcar como leída (optimista, no bloquea navegación)
    if (unread) {
      makeAsReadNotification(notification.id);
    }

    // 🔹 Navegar solo si hay URL
    if (notification.url) {
      navigate(notification.url);
    }

    onClick?.();
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        display: "flex",
        gap: 2,
        p: "3px",
        mb: 1,
        borderRadius: "16px",
        cursor: "pointer",

        /* 🌸 GLASS EFFECT */
        background: unread
          ? "rgba(255, 182, 193, 0.35)"
          : "rgba(255, 255, 255, 0.25)",

        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",

        border: unread
          ? "1px solid rgba(255, 105, 180, 0.4)"
          : "1px solid rgba(255, 255, 255, 0.3)",

        boxShadow: unread
          ? "0 8px 24px rgba(216, 46, 136, 0.25)"
          : "0 6px 18px rgba(0,0,0,0.12)",

        transition: "all .25s ease",

        "&:hover": {
          transform: "translateY(-1px)",
          background: "rgba(255, 105, 180, 0.45)",
        },
      }}
    >
      {/* 🔔 Avatar / indicador */}
      <Avatar
        sx={{
          width: 40,
          height: 40,
          bgcolor: unread ? "#E53888" : "#BDBDBD",
          fontSize: 18,
        }}
      >
        🔔
      </Avatar>

      <Box flex={1}>
        <Typography fontWeight={unread ? 700 : 500} sx={{ color: "#3A0D25" }}>
          {notification.title}
        </Typography>

        <Typography
          variant='body2'
          sx={{
            mt: 0.5,
            color: unread ? "#5E1B3A" : "text.secondary",
          }}
        >
          {notification.body}
        </Typography>

        <Typography
          variant='caption'
          color='text.secondary'
          textAlign='right'
          sx={{ mr: "6px" }}
        >
          {dayjs(notification.createdAt).fromNow()}
        </Typography>
      </Box>
    </Box>
  );
};

export default NotificationItem;
