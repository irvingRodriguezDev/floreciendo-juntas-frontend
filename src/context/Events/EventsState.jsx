import { useReducer } from "react";
import EventsContext from "./EventsContext";
import EventsReducer from "./EventsReducer";
import MethodGet, { MethodPost } from "../../config/Service";
import {
  GET_ALL_EVENTS,
  GET_EVENT_BY_ID,
  GET_LATEST_EVENTS,
} from "../../types";
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

  const getAllEvents = () => {
    let url = `/events`;
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_ALL_EVENTS,
          payload: res.data,
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
      });
  };
  return (
    <EventsContext.Provider
      value={{
        events: state.events,
        event: state.event,
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
