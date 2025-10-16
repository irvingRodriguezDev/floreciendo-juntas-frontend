import {
  GET_ALL_COURSES,
  GET_ALL_COURSES_PAGINATE,
  GET_COURSE_BY_ID,
  GET_LATEST_COURSES,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case GET_ALL_COURSES:
      return {
        ...state,
        courses: action.payload,
        cargando: true,
      };
    case GET_ALL_COURSES_PAGINATE:
      return {
        ...state,
        courses: action.payload.courses,
        totalItems: action.payload.totalItems,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
        cargando: true,
      };
    case GET_LATEST_COURSES:
      return {
        ...state,
        courses: action.payload,
      };
    case GET_COURSE_BY_ID:
      return {
        ...state,
        course: action.payload,
      };
    default:
      return state;
  }
};
