import { useReducer, useEffect, useContext } from "react";
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
import AuthContext from "../Auth/AuthContext";

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
  const { autenticado } = useContext(AuthContext);

  useEffect(() => {
    // 2. Si no está autenticado, ni nos molestamos en buscar el socket
    if (!autenticado) return;

    const socket = getSocket();

    // 3. Si por un microsegundo el socket no está listo (aunque esté autenticado)
    // Simplemente no registramos nada y esperamos al siguiente render
    if (!socket) return;

    console.log(
      "🔌 Socket listo y usuario autenticado. Registrando eventos...",
    );

    const onLiveStarted = (data) => {
      dispatch({
        type: LIVE_STATUS_UPDATE,
        payload: { id: data.liveId, status: "live" },
      });
    };

    const onLiveEnded = (data) => {
      dispatch({
        type: LIVE_STATUS_UPDATE,
        payload: { id: data.liveId, status: "ended" },
      });
    };
    const onLiveError = (data) => {
      dispatch({
        type: LIVE_STATUS_UPDATE,
        payload: { id: data.liveId, status: "error" },
      });
    };

    socket.on("live_started", onLiveStarted);
    socket.on("live_ended", onLiveEnded);
    socket.on("live_error", onLiveError);

    return () => {
      socket.off("live_started", onLiveStarted);
      socket.off("live_ended", onLiveEnded);
      socket.off("live_error", onLiveError);
    };

    // 💡 ESTA es la clave:
    // Cada vez que 'autenticado' pase de false a true, este efecto se ejecuta.
  }, [autenticado]);

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
