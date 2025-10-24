import React, { useReducer, useEffect } from "react";
import PostsContext from "./PostsContext";
import PostsReducer from "./PostsReducer";
import { io } from "socket.io-client";
import MethodGet, { MethodDelete, MethodPost } from "../../config/Service";
import headerConfig from "../../config/imageHeader";
import {
  ADD_COMMENT,
  ADD_POST,
  DELETE_COMMENT,
  GET_REACTIONS_SUMMARY,
  GET_REACTIONS_SUMMARY_MULTIPLE,
  SET_POSTS,
  SET_SOCKET,
  UPDATE_REACTIONS,
} from "../../types";
import clienteAxios from "../../config/Axios";
const PostsState = ({ children }) => {
  const initialState = {
    posts: [],
    totalPages: 0,
    currentPage: 1,
    reactionsSummary: {},
    socket: null,
  };

  const [state, dispatch] = useReducer(PostsReducer, initialState);

  useEffect(() => {
    // Inicializar socket
    const socket = io(import.meta.env.VITE_API_BASE_URL, {
      path: "/api/socket.io",
      transports: ["websocket", "polling"],
    });

    dispatch({ type: SET_SOCKET, payload: socket });

    // Eventos del servidor
    socket.on("postCreated", (post) => {
      dispatch({ type: ADD_POST, payload: post });
    });

    socket.on("commentCreated", ({ postId, comment }) => {
      dispatch({ type: ADD_COMMENT, payload: { postId, comment } });
    });

    socket.on("reactionUpdated", (data) => {
      const { postId, reactions } = data;

      const summary = reactions.reduce((acc, r) => {
        acc[r.type] = (acc[r.type] || 0) + 1;
        return acc;
      }, {});

      const userReaction =
        reactions.find((r) => r.userId === usuarioId)?.type || null;

      dispatch({
        type: "UPDATE_REACTIONS",
        payload: { postId, summary, userReaction },
      });
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
        totalPages: res.data.totalPages,
      },
    });
  };

  // 🔹 Crear un nuevo post
  const createPost = async (data) => {
    const res = await clienteAxios.post(`/community/posts`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // Emitir evento socket
    state.socket.emit("newPost", res.data);
    dispatch({ type: ADD_POST, payload: res.data });
  };
  // 🔹 Crear un comentario
  const createComment = async (data) => {
    try {
      const { userId, postId } = data; // 👈 lo extraes del body

      const res = await MethodPost(
        `/community/comments?userId=${userId}`, // lo usas en la URL
        {
          postId,
          content: data.comment,
        }
      );

      // Actualiza el estado local inmediatamente
      dispatch({
        type: ADD_COMMENT,
        payload: {
          postId,
          comment: res.data,
        },
      });

      // Emite el evento socket
      state.socket.emit("newComment", { postId, comment: res.data });

      return res;
    } catch (error) {
      console.error("Error al crear comentario:", error);
    }
  };

  // 🔹 Agregar una reacción
  const addReaction = async (data) => {
    const res = await MethodPost(`/community/reactions/toggle`, data);
    state.socket.emit("reactionUpdated", {
      postId: data.postId,
      reactions: res.data.reactions,
    });
  };

  const deleteComment = async (commentId) => {
    try {
      await MethodDelete(`/community/comments/${commentId}`);

      dispatch({
        type: DELETE_COMMENT,
        payload: commentId,
      });
    } catch (error) {
      console.error("Error al eliminar comentario:", error);
    }
  };

  const getReactions = async (postId) => {
    try {
      await MethodGet(`/community/reactions/summary?postId=${postId}`);
      dispatch({
        type: GET_REACTIONS_SUMMARY,
        payload: postId,
      });
    } catch (error) {
      console.error("Error al obtener las reacciones", error);
    }
  };
  const getReactionsForPosts = async (postIds, userId) => {
    try {
      const idsParam = postIds.join(",");
      const { data } = await MethodGet(
        `/community/reactions/summary/multiple?postIds=${idsParam}&userId=${userId}`
      );

      dispatch({
        type: GET_REACTIONS_SUMMARY_MULTIPLE,
        payload: data,
      });
    } catch (err) {
      console.error("Error al obtener reacciones", err);
    }
  };

  return (
    <PostsContext.Provider
      value={{
        posts: state.posts,
        totalPages: state.totalPages,
        currentPage: state.currentPage,
        reactionsSummary: state.reactionsSummary,
        getPosts,
        createPost,
        createComment,
        addReaction,
        deleteComment,
        getReactions,
        getReactionsForPosts,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export default PostsState;
