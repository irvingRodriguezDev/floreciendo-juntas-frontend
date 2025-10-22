import React, { useReducer, useEffect } from "react";
import PostsContext from "./PostsContext";
import PostsReducer from "./PostsReducer";
import { io } from "socket.io-client";
import MethodGet, { MethodPost } from "../../config/Service";
import {
  ADD_COMMENT,
  ADD_POST,
  SET_POSTS,
  SET_SOCKET,
  UPDATE_REACTIONS,
} from "../../types";
const PostsState = ({ children }) => {
  const initialState = {
    posts: [],
    totalPages: 0,
    currentPage: 1,
    socket: null,
  };

  const [state, dispatch] = useReducer(PostsReducer, initialState);

  // 🧠 Inicializar socket.io cuando el contexto se monta
  useEffect(() => {
    const socket = io(import.meta.env.VITE_SOCKET_URL);
    dispatch({ type: SET_SOCKET, payload: socket });

    // Escuchar eventos del servidor
    socket.on("postCreated", (post) => {
      dispatch({ type: ADD_POST, payload: post });
    });

    socket.on("commentCreated", (data) => {
      dispatch({
        type: ADD_COMMENT,
        payload: { postId: data.postId, comment: data.comment },
      });
    });

    socket.on("reactionUpdated", (data) => {
      dispatch({
        type: UPDATE_REACTIONS,
        payload: { postId: data.postId, reactions: data.reactions },
      });
    });

    // Cerrar conexión al desmontar
    return () => {
      socket.disconnect();
    };
  }, []);

  // 🔹 Obtener posts del backend
  const getPosts = async (id, page, rowsPerPage) => {
    const res = await MethodGet(
      `/community/posts/course/${id}?page=${page}&limit=${rowsPerPage}`
    );

    dispatch({
      type: SET_POSTS,
      payload: {
        posts: res.data.posts,
        currentPage: res.data.page,
        totalPages: res.data.total,
      },
    });
  };

  // 🔹 Crear un nuevo post
  const createPost = async (postData) => {
    const res = await MethodPost(`/community/posts`, postData);
    // Emitir el evento por socket
    state.socket.emit("newPost", res.data);
    dispatch({ type: ADD_POST, payload: res.data });
  };

  // 🔹 Crear un comentario
  const createComment = async (postId, content) => {
    const res = await MethodPost(`/community/posts/${postId}/comments`, {
      content,
    });
    state.socket.emit("newComment", { postId, comment: res.data });
  };

  // 🔹 Agregar una reacción
  const addReaction = async (postId, type) => {
    const res = await MethodPost(`/community/posts/${postId}/reactions`, {
      type,
    });
    state.socket.emit("newReaction", { postId, reactions: res.data.reactions });
  };

  return (
    <PostsContext.Provider
      value={{
        posts: state.posts,
        totalPages: state.totalPages,
        currentPage: state.currentPage,
        getPosts,
        createPost,
        createComment,
        addReaction,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export default PostsState;
