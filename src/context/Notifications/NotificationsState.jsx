import { useReducer, useEffect } from "react";
import MethodGet, { MethodPut } from "../../config/Service";
import NotificationsReducer from "./NotificationsReducer";
import NotificationsContext from "./NotificationsContext";
import {
  COUNT_UNREAD_NOTIFICATIONS,
  GET_ALL_NOTIFICATIONS,
  MAKE_READ_NOTIFICATION,
} from "../../types";

const NotificationsState = ({ children }) => {
  const initialState = {
    notifications: [],
    notifications_unread: 0,
  };

  const [state, dispatch] = useReducer(NotificationsReducer, initialState);

  // 📡 REST (sin cambios)
  const getAllNotifications = () => {
    let url = `/notifications`;

    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_ALL_NOTIFICATIONS,
          payload: res.data.notifications,
        });
      })
      .catch((error) => {
        console.log(error, "ocurrio un error al obtener las notificaciones");
      });
  };

  const getUnreadNotifications = () => {
    let url = "/notifications/unread-count";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: COUNT_UNREAD_NOTIFICATIONS,
          payload: res.data.count,
        });
      })
      .catch((error) => {
        console.log(error, "ocurrio un error al obtener los datos");
      });
  };

  const makeAsReadNotification = (id) => {
    let url = `/notifications/${id}/read`;
    MethodPut(url)
      .then((res) => {
        dispatch({
          type: MAKE_READ_NOTIFICATION,
          payload: id,
        });
        getAllNotifications();
        console.log("se marca como leida, la notificacion");
      })

      .catch((error) => {
        console.log(
          error,
          "Ocurrio un error al marcar como leida la notificacion",
        );
      });
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
