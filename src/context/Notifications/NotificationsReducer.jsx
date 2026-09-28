import {
  COUNT_UNREAD_NOTIFICATIONS,
  GET_ALL_NOTIFICATIONS,
  MAKE_READ_NOTIFICATION,
  PUSH_NOTIFICATION,
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
          n.id === action.payload ? { ...n, readAt: new Date() } : n,
        ),
        notifications_unread: Math.max(state.notifications_unread - 1, 0),
      };

    case PUSH_NOTIFICATION:
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
        notifications_unread: state.notifications_unread + 1,
      };

    default:
      return state;
  }
}
