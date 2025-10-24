import React, { useCallback, useReducer } from "react";
import MethodGet, { MethodPost, MethodPut } from "../../config/Service";
import UserContext from "./UserContext";
import UserReducer from "./UserReducer";
import { COURSES_COMPLETED_USER } from "../../types";
/**Importar componente token headers */

const UserState = ({ children }) => {
  const initialState = {
    coursesCompleted: 0,
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
  return (
    <UserContext.Provider
      value={{
        coursesCompleted: state.coursesCompleted,
        getCoursesCompletedByUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
