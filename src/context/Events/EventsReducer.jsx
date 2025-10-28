import {
  GET_ALL_EVENTS,
  GET_EVENT_BY_ID,
  GET_LATEST_EVENTS,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case GET_ALL_EVENTS:
      return {
        ...state,
        events: action.payload,
        cargando: true,
      };
    case GET_EVENT_BY_ID:
      return {
        ...state,
        event: action.payload,
      };
    case GET_LATEST_EVENTS:
      return {
        ...state,
        events: action.payload,
      };
    default:
      return state;
  }
};
