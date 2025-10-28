import { COURSES_COMPLETED, COURSES_COMPLETED_USER } from "../../types";

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

    default:
      return state;
  }
};
