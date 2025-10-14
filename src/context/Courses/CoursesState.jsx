import React, { useCallback, useReducer } from "react";
import MethodGet, { MethodPost, MethodPut } from "../../config/Service";
import CoursesReducer from "./CoursesReducer";
import CoursesContext from "./CoursesContext";
import { GET_ALL_COURSES, GET_ALL_COURSES_PAGINATE } from "../../types";
/**Importar componente token headers */

const CoursesState = ({ children }) => {
  const initialState = {
    courses: [],
    totalItems: 0,
    totalPages: 0,
    currentPage: 0,
  };

  const [state, dispatch] = useReducer(CoursesReducer, initialState);

  const getAllCourses = () => {
    let url = "/courses";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_ALL_COURSES,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error, "ocurrio un error al consultar los cursos");
      });
  };

  const getAllCoursesPaginate = (page, limit, search = "") => {
    let url = `/courses/paginate?page=${page}&limit=${limit}`;

    // Solo agregamos el parámetro si hay búsqueda
    if (search.trim() !== "") {
      url += `&search=${encodeURIComponent(search)}`;
    }

    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_ALL_COURSES_PAGINATE,
          payload: {
            courses: res.data.courses,
            totalItems: res.data.totalItems,
            totalPages: res.data.totalPages,
            currentPage: res.data.currentPage,
          },
        });
      })
      .catch((error) => {
        console.error("Ocurrió un error al obtener los cursos:", error);
      });
  };
  return (
    <CoursesContext.Provider
      value={{
        courses: state.courses,
        totalItems: state.totalItems,
        totalPages: state.totalPages,
        currentPage: state.currentPage,
        getAllCourses,
        getAllCoursesPaginate,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
};

export default CoursesState;
