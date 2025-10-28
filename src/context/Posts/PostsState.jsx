import React, { useReducer, useEffect, useContext } from "react";
import PostsContext from "./PostsContext";
import PostsReducer from "./PostsReducer";
import MethodGet, { MethodDelete, MethodPost } from "../../config/Service";
import clienteAxios from "../../config/Axios";
import { initSocket } from "../../socket"; // socket global
import AuthContext from "../Auth/AuthContext";
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

const PostsState = ({ children }) => {
  const initialState = {
    posts: [],
    totalPages: 0,
    currentPage: 1,
    reactionsSummary: {},
    socket: null,
  };

  const [state, dispatch] = useReducer(PostsReducer, initialState);

  // 🔹 Obtener usuario actual del AuthContext
  const { usuario } = useContext(AuthContext);
  const usuarioId = usuario?.id;

  // 🔹 Inicializar socket global
  const token = localStorage.getItem("token"); // JWT del usuario
  const socket = initSocket(token);

  useEffect(() => {
    if (!socket) return;

    // Guardar socket en el state
    dispatch({ type: SET_SOCKET, payload: socket });

    // ---- Escuchar eventos del backend ----
    socket.on("postCreated", (post) => {
      if (post.userId === usuarioId) return; // ignorar posts creados por el usuario actual
      dispatch({ type: ADD_POST, payload: post });
    });

    socket.on("commentCreated", ({ postId, comment }) => {
      if (comment.userId === usuarioId) return; // ignorar comentarios creados por el usuario actual
      dispatch({
        type: ADD_COMMENT,
        payload: { postId, comment },
      });
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
        type: UPDATE_REACTIONS,
        payload: { postId, summary, userReaction },
      });
    });

    // ---- Cleanup: remover listeners al desmontar ----
    return () => {
      socket.off("postCreated");
      socket.off("commentCreated");
      socket.off("reactionUpdated");
    };
  }, [socket, usuarioId]);

  // 🔹 Funciones para manejar posts y comentarios
  const getPosts = async (id, page = 1, rowsPerPage = 10) => {
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

  const createPost = async (data) => {
    const res = await clienteAxios.post(`/community/posts`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // Actualizar estado local inmediatamente
    dispatch({ type: ADD_POST, payload: res.data });

    // Emitir evento socket para otros usuarios
    state.socket?.emit("postCreated", res.data);
  };

  const createComment = async ({ postId, comment, userId }) => {
    const res = await MethodPost(`/community/comments?userId=${userId}`, {
      postId,
      content: comment,
    });

    // Actualiza estado local
    dispatch({
      type: ADD_COMMENT,
      payload: { postId, comment: res.data },
    });

    // Emitir evento socket para otros usuarios
    state.socket?.emit("commentCreated", { postId, comment: res.data });

    return res.data;
  };

  const addReaction = async (data) => {
    const res = await MethodPost(`/community/reactions/toggle`, data);

    state.socket?.emit("reactionUpdated", {
      postId: data.postId,
      reactions: res.data.reactions,
    });
  };

  const deleteComment = async (commentId) => {
    await MethodDelete(`/community/comments/${commentId}`);
    dispatch({ type: DELETE_COMMENT, payload: commentId });
  };

  const getReactions = async (postId) => {
    const { data } = await MethodGet(
      `/community/reactions/summary?postId=${postId}`
    );
    dispatch({
      type: GET_REACTIONS_SUMMARY,
      payload: { postId, reactions: data },
    });
  };

  const getReactionsForPosts = async (postIds) => {
    const idsParam = postIds.join(",");
    const { data } = await MethodGet(
      `/community/reactions/summary/multiple?postIds=${idsParam}&userId=${usuarioId}`
    );
    dispatch({ type: GET_REACTIONS_SUMMARY_MULTIPLE, payload: data });
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
