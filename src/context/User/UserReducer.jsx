import {
  COURSES_COMPLETED,
  COURSES_COMPLETED_USER,
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

    default:
      return state;
  }
};
