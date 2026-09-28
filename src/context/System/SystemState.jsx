import React, { useCallback, useReducer } from "react";
import MethodGet, { MethodPost, MethodPut } from "../../config/Service";
import SystemContext from "./SystemContext";
import SystemReducer from "./SystemReducer";
import { GET_ALL_SYSTEMS } from "../../types";
/**Importar componente token headers */

const SystemState = ({ children }) => {
  const initialState = {
    systems: [],
  };

  const [state, dispatch] = useReducer(SystemReducer, initialState);

  const getAllSystems = () => {
    let url = "/systems";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_ALL_SYSTEMS,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error, "ocurrio un error al consultar los sistemas");
      });
  };
  return (
    <SystemContext.Provider
      value={{
        systems: state.systems,
        getAllSystems,
      }}
    >
      {children}
    </SystemContext.Provider>
  );
};

export default SystemState;
