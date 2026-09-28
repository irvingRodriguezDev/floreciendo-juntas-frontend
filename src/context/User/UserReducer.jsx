import {
  ADD_SHIPPING_ADDRESS,
  CALENDAR_ERROR,
  COURSES_COMPLETED,
  COURSES_COMPLETED_USER,
  DELETE_ADDRESS_SHIPPING,
  GET_ADDRESS,
  GET_CALENDAR_LINKS,
  GET_TICKETS_BY_USER,
  UPDATE_ADDRESS_SHIPPING,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case COURSES_COMPLETED_USER:
      return {
        ...state,
        coursesCompleted: action.payload,
        cargando: true,
      };
    case COURSES_COMPLETED:
      return {
        ...state,
        completed: action.payload.completed,
        completedPagination: {
          ...action.payload.pagination,
        },
        cargando: false,
      };

    case GET_TICKETS_BY_USER:
      return {
        ...state,
        tickets: action.payload.tickets,
        ticketsPagination: {
          ...action.payload.pagination,
        },
      };
    case GET_CALENDAR_LINKS:
      return {
        ...state,
        calendarLinks: action.payload,
        calendarLoading: false,
      };

    case CALENDAR_ERROR:
      return {
        ...state,
        calendarError: action.payload,
        calendarLoading: false,
      };
    case ADD_SHIPPING_ADDRESS:
      return {
        ...state,
        address: [action.payload, ...state.address],
      };
    case UPDATE_ADDRESS_SHIPPING:
      return {
        ...state,
        address: state.address.map((add) =>
          add.id === action.payload.id ? action.payload : add
        ),
      };
    case DELETE_ADDRESS_SHIPPING:
      return {
        ...state,
        address: state.address.filter((add) => add.id !== action.payload),
      };

    case GET_ADDRESS:
      return {
        ...state,
        address: action.payload,
      };

    default:
      return state;
  }
};
