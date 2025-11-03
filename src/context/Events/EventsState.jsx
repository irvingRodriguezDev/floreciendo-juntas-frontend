import { useReducer } from "react";
import EventsContext from "./EventsContext";
import EventsReducer from "./EventsReducer";
import MethodGet, { MethodPost } from "../../config/Service";
import {
  GET_ALL_EVENTS,
  GET_EVENT_BY_ID,
  GET_LATEST_EVENTS,
} from "../../types";
import Swal from "sweetalert2";
const EventsState = ({ children }) => {
  const initialState = {
    events: [],
    event: {},
    totalItems: 0,
    totalPages: 0,
    currentPage: 0,
    topCourses: [],
  };
  const [state, dispatch] = useReducer(EventsReducer, initialState);

  const getAllEvents = (page, limit, search = "") => {
    let url = `/events?page=${page}&limit=${limit}`;

    if (search.trim() !== "") {
      url += `&search=${encodeURIComponent(search)}`; // 👈 usar +=
    }

    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_ALL_EVENTS,
          payload: {
            events: res.data.events,
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
  const getLatestEvents = () => {
    let url = "/events/latest";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_LATEST_EVENTS,
          payload: res.data.events,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getEventById = (id) => {
    let url = `/events/${id}`;
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_EVENT_BY_ID,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const buyTicket = (data) => {
    let url = `/events/buy/ticket`;
    MethodPost(url, data)
      .then((res) => {
        window.location.href = res.data.url;
      })
      .catch((error) => {
        console.log(error, "ocurrio un error");
        Swal.fire({
          title: "Error",
          text: error.response.data.message,
          icon: "error",
          timer: 2500,
          showConfirmButton: false,
        });
      });
  };
  return (
    <EventsContext.Provider
      value={{
        events: state.events,
        event: state.event,
        totalItems: state.totalItems,
        totalPages: state.totalPages,
        currentPage: state.currentPage,
        getAllEvents,
        getEventById,
        getLatestEvents,
        buyTicket,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};
export default EventsState;
