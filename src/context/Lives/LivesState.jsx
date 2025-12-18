import { useReducer } from "react";
import LivesReducer from "./LivesReducer";
import LivesContext from "./LivesContext";
import MethodGet, { MethodPost } from "../../config/Service";

import Swal from "sweetalert2";
import { GET_ALL_LIVES, GET_LATEST_LIVES, GET_LIVE_BY_ID } from "../../types";
const LivesState = ({ children }) => {
  const initialState = {
    lives: [],
    live: {},
    totalItems: 0,
    totalPages: 0,
    currentPage: 0,
    topCourses: [],
  };
  const [state, dispatch] = useReducer(LivesReducer, initialState);

  const getAllLives = (page, limit, search = "") => {
    let url = `/lives?page=${page}&limit=${limit}`;

    if (search.trim() !== "") {
      url += `&search=${encodeURIComponent(search)}`; // 👈 usar +=
    }

    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_ALL_LIVES,
          payload: {
            lives: res.data,
            totalItems: res.data.total, // ⚠ ojo, tu backend devuelve 'total'
            totalPages: res.data.totalPages,
            currentPage: res.data.currentPage,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getLatestlives = () => {
    let url = "/lives/latest";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_LATEST_LIVES,
          payload: res.data.lives,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getLiveById = (id) => {
    let url = `/lives/${id}`;
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_LIVE_BY_ID,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <LivesContext.Provider
      value={{
        lives: state.lives,
        live: state.live,
        totalItems: state.totalItems,
        totalPages: state.totalPages,
        currentPage: state.currentPage,
        getAllLives,
        getLiveById,
        getLatestlives,
      }}
    >
      {children}
    </LivesContext.Provider>
  );
};
export default LivesState;
