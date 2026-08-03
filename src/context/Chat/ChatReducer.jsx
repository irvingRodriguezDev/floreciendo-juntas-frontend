// context/Chat/ChatReducer.js

import {
  ADD_MESSAGE,
  SET_ACTIVE_CONVERSATION,
  SET_CONVERSATIONS,
  SET_LOADING,
  SET_MESSAGES,
  SET_UNREAD_COUNT,
  TOGGLE_INBOX_DRAWER,
} from "../../types";

export const chatInitialState = {
  conversations: [],
  activeConversation: null, // Objeto de la conversación seleccionada
  messages: [], // Mensajes de la conversación activa
  unreadCount: 0,
  openInboxDrawer: false,
  loading: false,
};

export const ChatReducer = (state, action) => {
  switch (action.type) {
    case SET_CONVERSATIONS:
      return {
        ...state,
        conversations: action.payload,
      };

    case SET_ACTIVE_CONVERSATION:
      return {
        ...state,
        activeConversation: action.payload,
      };

    case SET_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };

    case ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
        // Actualizamos también el último mensaje en la lista de conversaciones
        conversations: state.conversations.map((conv) =>
          conv.id === action.payload.conversationId
            ? {
                ...conv,
                lastMessage: action.payload.body,
                lastMessageAt: action.payload.createdAt || new Date(),
              }
            : conv,
        ),
      };

    case SET_UNREAD_COUNT:
      return {
        ...state,
        unreadCount: action.payload,
      };

    case TOGGLE_INBOX_DRAWER:
      return {
        ...state,
        openInboxDrawer: action.payload ?? !state.openInboxDrawer,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};
