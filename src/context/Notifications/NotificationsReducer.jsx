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
        notifications: state.notifications.map((n) =>
          n.id === action.payload
            ? { ...n, readAt: new Date().toISOString() }
            : n,
        ),
        notifications_unread: Math.max(state.notifications_unread - 1, 0),
      };

    default:
      return state;
  }
}
