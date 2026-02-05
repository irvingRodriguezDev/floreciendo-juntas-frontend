import { useReducer, useEffect } from "react";
import LivesReducer from "./LivesReducer";
import LivesContext from "./LivesContext";
import MethodGet from "../../config/Service";
import { getSocket } from "../../socket";

import {
  GET_ALL_LIVES,
  GET_LATEST_LIVES,
  GET_LIVE_BY_ID,
  LIVE_STATUS_UPDATE,
} from "../../types";

const LivesState = ({ children }) => {
  const initialState = {
    lives: [],
    live: null, // 👈 live activo (o null)
    isLiveActive: false, // 👈 flag global
    totalItems: 0,
    totalPages: 0,
    currentPage: 0,
  };

  const [state, dispatch] = useReducer(LivesReducer, initialState);

  // 🔌 SOCKET GLOBAL (una sola vez)
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const onLiveStarted = ({ liveId, status }) => {
      dispatch({
        type: LIVE_STATUS_UPDATE,
        payload: { id: liveId, status },
      });
    };

    const onLiveEnded = ({ liveId }) => {
      dispatch({
        type: LIVE_STATUS_UPDATE,
        payload: { id: liveId, status: "ended" },
      });
    };

    socket.on("live_started", onLiveStarted);
    socket.on("live_ended", onLiveEnded);

    return () => {
      socket.off("live_started", onLiveStarted);
      socket.off("live_ended", onLiveEnded);
    };
  }, []);

  // 📡 REST (sin cambios)
  const getAllLives = (page, limit, search = "") => {
    let url = `/lives?page=${page}&limit=${limit}`;
    if (search.trim() !== "") {
      url += `&search=${encodeURIComponent(search)}`;
    }

    MethodGet(url).then((res) => {
      dispatch({
        type: GET_ALL_LIVES,
        payload: {
          lives: res.data,
          totalItems: res.data.total,
          totalPages: res.data.totalPages,
          currentPage: res.data.currentPage,
        },
      });
    });
  };

  const getLatestlives = () => {
    MethodGet("/lives/latest").then((res) => {
      dispatch({
        type: GET_LATEST_LIVES,
        payload: res.data.lives,
      });
    });
  };

  const getLiveById = (id) => {
    MethodGet(`/lives/${id}`).then((res) => {
      dispatch({
        type: GET_LIVE_BY_ID,
        payload: res.data,
      });
    });
  };

  return (
    <LivesContext.Provider
      value={{
        lives: state.lives,
        live: state.live,
        isLiveActive: state.isLiveActive,
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
