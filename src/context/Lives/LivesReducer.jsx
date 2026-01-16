import {
  GET_ALL_LIVES,
  GET_LATEST_LIVES,
  GET_LIVE_BY_ID,
  LIVE_STARTED,
  LIVE_ENDED,
  LIVE_STATUS_UPDATE,
} from "../../types";

export default function LivesReducer(state, action) {
  switch (action.type) {
    case GET_ALL_LIVES:
      return {
        ...state,
        lives: action.payload.lives.data || action.payload.lives,
        totalItems: action.payload.totalItems,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
      };

    case GET_LATEST_LIVES:
      return {
        ...state,
        lives: action.payload,
      };

    case GET_LIVE_BY_ID:
      return {
        ...state,
        live: action.payload,
      };

    case LIVE_STATUS_UPDATE:
      return {
        ...state,
        live:
          state.live?.id === action.payload.id
            ? { ...state.live, status: action.payload.status }
            : state.live,
      };

    default:
      return state;
  }
}
