import { useEffect, useState } from "react";
import MethodGet from "../config/Service";
export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    const { data } = await MethodGet("/notifications");

    setNotifications(data.notifications);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter((n) => !n.readAt).length;

  return {
    notifications,
    unreadCount,
    refresh: fetchNotifications,
  };
};
