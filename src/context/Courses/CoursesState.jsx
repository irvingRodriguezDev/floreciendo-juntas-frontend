import React, { useCallback, useReducer } from "react";
import MethodGet, { MethodPost, MethodPut } from "../../config/Service";
import CoursesReducer from "./CoursesReducer";
import CoursesContext from "./CoursesContext";
import {
  GET_ALL_COURSES,
  GET_ALL_COURSES_PAGINATE,
  GET_COURSE_BY_ID,
  GET_COURSES_BY_SYSTEM_ID,
  GET_LATEST_COURSES,
} from "../../types";
/**Importar componente token headers */

const CoursesState = ({ children }) => {
  const initialState = {
    courses: [],
    course: {},
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
  const getLastestCourses = () => {
    let url = "/courses/lastAdded";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_LATEST_COURSES,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error, "ocurrio un error al obtener los ultimos cursos");
      });
  };
  const getCourseById = (id) => {
    let url = `/courses/${id}`;
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_COURSE_BY_ID,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error, "Ocurrio un error al obtener el curso");
      });
  };
  //obtener los cursos por sistema
  const getCoursesBySystemId = (id, page, limit, search = "") => {
    let url = `/courses/bySystem?system_id=${id}&page=${page}&limit=${limit}`;
    // Solo agregamos el parámetro si hay búsqueda
    if (search.trim() !== "") {
      url += `&search=${encodeURIComponent(search)}`;
    }
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_COURSES_BY_SYSTEM_ID,
          payload: {
            courses: res.data.courses,
            totalItems: res.data.totalItems,
            totalPages: res.data.totalPages,
            currentPage: res.data.currentPage,
          },
        });
      })
      .catch((error) => {
        console.log(error, "ocurrio un error al obtener los cursos");
      });
  };
  return (
    <CoursesContext.Provider
      value={{
        courses: state.courses,
        totalItems: state.totalItems,
        totalPages: state.totalPages,
        currentPage: state.currentPage,
        course: state.course,
        getAllCourses,
        getAllCoursesPaginate,
        getLastestCourses,
        getCourseById,
        getCoursesBySystemId,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
};

export default CoursesState;
