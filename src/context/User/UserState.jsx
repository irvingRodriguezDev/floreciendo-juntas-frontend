import React, { useCallback, useReducer } from "react";
import MethodGet, { MethodPost, MethodPut } from "../../config/Service";
import UserContext from "./UserContext";
import UserReducer from "./UserReducer";
import {
  COURSES_COMPLETED,
  COURSES_COMPLETED_USER,
  GET_TICKETS_BY_USER,
} from "../../types";
/**Importar componente token headers */

const UserState = ({ children }) => {
  const initialState = {
    coursesCompleted: 0,
    completed: [],
    tickets: 0,
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const getCoursesCompletedByUser = (userId) => {
    let url = `/user/coursesCompleted?userId=${userId}`;
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: COURSES_COMPLETED_USER,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error, "ocurrio un error al consultar los sistemas");
      });
  };

  const getCoursesCompleted = (userId) => {
    let url = `/user/completedByUser?userId=${userId}`;
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: COURSES_COMPLETED,
          payload: res.data.courses,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getTicketsByUser = (userId) => {
    let url = `/tickets/byUser/${userId}`;

    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_TICKETS_BY_USER,
          payload: res.data.tickets,
        });
      })
      .catch((error) => {
        console.log(error, "ocurrio un error");
      });
  };

  return (
    <UserContext.Provider
      value={{
        coursesCompleted: state.coursesCompleted,
        completed: state.completed,
        tickets: state.tickets,
        getCoursesCompletedByUser,
        getCoursesCompleted,
        getTicketsByUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
