import React, { useReducer, useEffect } from "react";
import PostsContext from "./PostsContext";
import PostsReducer from "./PostsReducer";
import { io } from "socket.io-client";
import MethodGet, { MethodPost } from "../../config/Service";
import imageHeaders from "../../config/imageHeader";
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

  useEffect(() => {
    // Inicializar socket
    const socket = io(import.meta.env.VITE_API_BASE_URL, {
      path: "/api/socket.io",
    });

    dispatch({ type: SET_SOCKET, payload: socket });

    // Eventos del servidor
    socket.on("postCreated", (post) => {
      dispatch({ type: ADD_POST, payload: post });
    });

    socket.on("commentCreated", ({ postId, comment }) => {
      dispatch({ type: ADD_COMMENT, payload: { postId, comment } });
    });

    socket.on("reactionUpdated", ({ postId, reactions }) => {
      dispatch({ type: UPDATE_REACTIONS, payload: { postId, reactions } });
    });

    // Limpiar al desmontar
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
    const formData = new FormData();
    formData.append("courseId", postData.courseId);
    formData.append("content", postData.content);
    formData.append("attachments", postData.image);

    const res = await MethodPost(`/community/posts`, formData, {
      imageHeaders,
    });
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
