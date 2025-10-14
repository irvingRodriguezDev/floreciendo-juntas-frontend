import { GET_ALL_COURSES, GET_ALL_COURSES_PAGINATE } from "../../types";

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

    default:
      return state;
  }
};
