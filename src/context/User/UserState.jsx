import React, { useCallback, useReducer } from "react";
import MethodGet, { MethodPost, MethodPut } from "../../config/Service";
import UserContext from "./UserContext";
import UserReducer from "./UserReducer";
import {
  CALENDAR_ERROR,
  CALENDAR_LOADING,
  COURSES_COMPLETED,
  COURSES_COMPLETED_USER,
  GET_CALENDAR_LINKS,
  GET_TICKETS_BY_USER,
} from "../../types";
import fileDownload from "js-file-download";
import clienteAxios from "../../config/Axios";
/**Importar componente token headers */

const UserState = ({ children }) => {
  const initialState = {
    coursesCompleted: 0,
    completed: [],
    tickets: 0,
    calendarLinks: null,
    calendarLoading: false,
    calendarError: null,
    completedPagination: {
      totalPages: 1,
      currentPage: 1,
      totalItems: 0,
    },
    ticketsPagination: {
      totalPages: 1,
      currentPage: 1,
      totalItems: 0,
    },
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

  const getCoursesCompleted = (userId, page, limit) => {
    const url = `/user/completedByUser?userId=${userId}&page=${page}&limit=${limit}`;
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: COURSES_COMPLETED,
          payload: {
            completed: res.data.courses,
            pagination: {
              totalPages: res.data.totalPages,
              currentPage: res.data.page,
              totalItems: res.data.total,
            },
          },
        });
      })
      .catch((error) => console.error(error));
  };

  const getTicketsByUser = (userId, page, limit) => {
    const url = `/tickets/byUser/${userId}?page=${page}&limit=${limit}`;
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_TICKETS_BY_USER,
          payload: {
            tickets: res.data.tickets,
            pagination: {
              totalPages: res.data.totalPages,
              currentPage: res.data.currentPage,
              totalItems: res.data.totalItems,
            },
          },
        });
      })
      .catch((error) => console.error(error));
  };
  const downloadTicket = (ticket, usuarioId) => {
    let url = `/tickets/download?ticketId=${ticket.id}&userId=${usuarioId}`;
    clienteAxios
      .get(url)
      .then((res) => {
        fileDownload(res.data, `Acceso-${ticket.event.title}.pdf`);
      })
      .catch((error) => {
        console.log(error, "ocurrio un error al descargar el boleto");
      });
  };
  const getCalendarLinks = async (ticketId) => {
    try {
      dispatch({
        type: CALENDAR_LOADING,
      });

      const response = await MethodGet(`/tickets/${ticketId}/calendar-links`);

      dispatch({
        type: GET_CALENDAR_LINKS,
        payload: response.data,
      });

      return response.data; // Retornar para uso inmediato
    } catch (error) {
      console.error("Error obteniendo links de calendario:", error);

      dispatch({
        type: CALENDAR_ERROR,
        payload: error.response?.data?.message || "Error al obtener calendario",
      });

      throw error;
    }
  };

  return (
    <UserContext.Provider
      value={{
        coursesCompleted: state.coursesCompleted,
        completed: state.completed,
        tickets: state.tickets,
        ticketsPagination: state.ticketsPagination,
        completedPagination: state.completedPagination,
        getCoursesCompletedByUser,
        getCoursesCompleted,
        getTicketsByUser,
        getCalendarLinks,
        downloadTicket,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
