import React from "react";
import {
  COUNT_UNREAD_NOTIFICATIONS,
  GET_ALL_NOTIFICATIONS,
  MAKE_READ_NOTIFICATION,
} from "../../types";

export default function NotificationsReducer(state, action) {
  switch (action.type) {
    case GET_ALL_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
      };
    case COUNT_UNREAD_NOTIFICATIONS:
      return {
        ...state,
        notifications_unread: action.payload,
      };
    case MAKE_READ_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          (n) => n.id !== action.payload,
        ),
      };
    default:
      return state;
  }
}
