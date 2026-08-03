import { useReducer, useEffect, useContext } from "react";
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
import AuthContext from "../Auth/AuthContext";
const NotificationsState = ({ children }) => {
  const initialState = {
    notifications: [],
    notifications_unread: 0,
  };

  const [state, dispatch] = useReducer(NotificationsReducer, initialState);

  // 1. Extraemos 'autenticado' del AuthContext
  const { autenticado } = useContext(AuthContext);

  useEffect(() => {
    // 2. Solo intentamos registrar si el usuario está autenticado
    if (!autenticado) return;

    const socket = getSocket();

    // 3. Si el socket aún no está listo, el render provocado por AuthContext lo atrapará
    if (!socket) return;

    console.log("🔔 Listener de notificaciones activado");

    const handleNewNotification = (notification) => {
      dispatch({
        type: PUSH_NOTIFICATION,
        payload: notification,
      });
    };

    socket.on("notification:new", handleNewNotification);

    return () => {
      // 4. Limpieza específica para evitar duplicados
      socket.off("notification:new", handleNewNotification);
    };

    // 💡 Depender de 'autenticado' es la clave para la sincronía
  }, [autenticado]);

  // 📡 REST
  const getAllNotifications = async () => {
    try {
      const res = await MethodGet(`/notifications?unread=${true}`);

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
