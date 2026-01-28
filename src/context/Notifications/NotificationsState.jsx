import { useReducer, useEffect } from "react";
import MethodGet, { MethodPut } from "../../config/Service";
import NotificationsReducer from "./NotificationsReducer";
import NotificationsContext from "./NotificationsContext";
import { getSocket } from "../../socket";
import {
  COUNT_UNREAD_NOTIFICATIONS,
  GET_ALL_NOTIFICATIONS,
  MAKE_READ_NOTIFICATION,
  PUSH_NOTIFICATION,
} from "../../types";

const NotificationsState = ({ children }) => {
  const initialState = {
    notifications: [],
    notifications_unread: 0,
  };

  const [state, dispatch] = useReducer(NotificationsReducer, initialState);

  // 🔌 SOCKET: tiempo real
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    socket.on("notification:new", (notification) => {
      dispatch({
        type: PUSH_NOTIFICATION,
        payload: notification,
      });
    });

    return () => {
      socket.off("notification:new");
    };
  }, []);

  // 📡 REST
  const getAllNotifications = async () => {
    try {
      const res = await MethodGet("/notifications");

      dispatch({
        type: GET_ALL_NOTIFICATIONS,
        payload: res.data.notifications,
      });
    } catch (error) {
      console.log("❌ Error obteniendo notificaciones:", error);
    }
  };

  const getUnreadNotifications = async () => {
    try {
      const res = await MethodGet("/notifications/unread-count");

      dispatch({
        type: COUNT_UNREAD_NOTIFICATIONS,
        payload: res.data.count,
      });
    } catch (error) {
      console.log("❌ Error unread count:", error);
    }
  };

  const makeAsReadNotification = async (id) => {
    try {
      await MethodPut(`/notifications/${id}/read`);

      dispatch({
        type: MAKE_READ_NOTIFICATION,
        payload: id,
      });
    } catch (error) {
      console.log("❌ Error al marcar como leída:", error);
    }
  };

  return (
    <NotificationsContext.Provider
      value={{
        notifications: state.notifications,
        notifications_unread: state.notifications_unread,
        getAllNotifications,
        makeAsReadNotification,
        getUnreadNotifications,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export default NotificationsState;
