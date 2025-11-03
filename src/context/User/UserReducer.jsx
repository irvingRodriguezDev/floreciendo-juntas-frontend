import {
  CALENDAR_ERROR,
  COURSES_COMPLETED,
  COURSES_COMPLETED_USER,
  GET_CALENDAR_LINKS,
  GET_TICKETS_BY_USER,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case COURSES_COMPLETED_USER:
      return {
        ...state,
        coursesCompleted: action.payload,
        cargando: true,
      };
    case COURSES_COMPLETED:
      return {
        ...state,
        completed: action.payload,
        cargando: true,
      };
    case GET_TICKETS_BY_USER:
      return {
        ...state,
        tickets: action.payload,
      };
    case GET_CALENDAR_LINKS:
      return {
        ...state,
        calendarLinks: action.payload,
        calendarLoading: false,
      };

    case CALENDAR_ERROR:
      return {
        ...state,
        calendarError: action.payload,
        calendarLoading: false,
      };

    default:
      return state;
  }
};
