// context/Chat/ChatState.jsx
import React, { useReducer, useContext } from "react";
import ChatContext from "./ChatContext";
import { ChatReducer, chatInitialState } from "./ChatReducer";
import AuthContext from "../Auth/AuthContext";
import MethodGet, { MethodPut } from "../../config/Service";
import {
  SET_ACTIVE_CONVERSATION,
  SET_CONVERSATIONS,
  SET_LOADING,
  SET_MESSAGES,
  SET_UNREAD_COUNT,
  TOGGLE_INBOX_DRAWER,
} from "../../types";

const ChatState = ({ children }) => {
  const [state, dispatch] = useReducer(ChatReducer, chatInitialState);
  const { autenticado } = useContext(AuthContext);

  // 1. Cargar lista de conversaciones
  const getConversations = async () => {
    if (!autenticado) return;
    try {
      dispatch({ type: SET_LOADING, payload: true });
      const { data } = await MethodGet("/messages/conversations");
      dispatch({
        type: SET_CONVERSATIONS,
        payload: data.conversations || [],
      });
    } catch (error) {
      console.error("Error al obtener conversaciones:", error);
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };

  // 2. Cargar mensajes de una conversación
  const getMessagesByConversation = async (conversationId) => {
    try {
      dispatch({ type: SET_LOADING, payload: true });
      const { data } = await MethodGet(
        `/messages/conversations/${conversationId}`,
      );
      dispatch({
        type: SET_MESSAGES,
        payload: data.messages || [],
      });

      // Marcar como leídos
      await markAsRead(conversationId);
    } catch (error) {
      console.error("Error al obtener mensajes:", error);
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };

  // 3. Marcar conversación como leída
  const markAsRead = async (conversationId) => {
    try {
      await MethodPut(`/messages/read/${conversationId}`);
      getUnreadCount(); // Recargar conteo global
    } catch (error) {
      console.error("Error al marcar como leídos:", error);
    }
  };

  // 4. Obtener conteo de mensajes no leídos
  const getUnreadCount = async () => {
    if (!autenticado) return;
    try {
      const { data } = await MethodGet("/messages/unread-count");
      dispatch({
        type: SET_UNREAD_COUNT,
        payload: data.unreadCount || 0,
      });
    } catch (error) {
      console.error("Error al obtener contador no leídos:", error);
    }
  };

  // 5. Seleccionar Conversación Activa
  const setActiveConversation = (conversation) => {
    dispatch({
      type: SET_ACTIVE_CONVERSATION,
      payload: conversation,
    });
    if (conversation) {
      getMessagesByConversation(conversation.id);
    } else {
      dispatch({ type: SET_MESSAGES, payload: [] });
    }
  };

  // 6. Abrir / Cerrar Drawer del Chat
  const toggleInboxDrawer = (open) => {
    dispatch({ type: TOGGLE_INBOX_DRAWER, payload: open });
  };

  return (
    <ChatContext.Provider
      value={{
        conversations: state.conversations,
        activeConversation: state.activeConversation,
        messages: state.messages,
        unreadCount: state.unreadCount,
        openInboxDrawer: state.openInboxDrawer,
        loading: state.loading,
        getConversations,
        getMessagesByConversation,
        getUnreadCount,
        setActiveConversation,
        toggleInboxDrawer,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatState;
