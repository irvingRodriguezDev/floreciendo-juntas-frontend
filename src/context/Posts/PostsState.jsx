import React, { useReducer, useEffect, useContext } from "react";
import PostsContext from "./PostsContext";
import PostsReducer from "./PostsReducer";
import MethodGet, { MethodDelete, MethodPost } from "../../config/Service";
import clienteAxios from "../../config/Axios";
import { getSocket } from "../../socket";
import AuthContext from "../Auth/AuthContext";
import {
  ADD_COMMENT,
  ADD_POST,
  DELETE_COMMENT,
  GET_REACTIONS_SUMMARY,
  GET_REACTIONS_SUMMARY_MULTIPLE,
  SET_POSTS,
  UPDATE_REACTIONS,
} from "../../types";

const PostsState = ({ children }) => {
  const initialState = {
    posts: [],
    totalPages: 0,
    currentPage: 1,
    reactionsSummary: {},
  };

  const [state, dispatch] = useReducer(PostsReducer, initialState);

  const { usuario } = useContext(AuthContext);
  const usuarioId = usuario?.id;

  // ===============================
  // 🔌 SOCKET LISTENERS
  // ===============================
  useEffect(() => {
    const socket = getSocket();
    if (!socket || !usuarioId) return;

    const handlePostCreated = (post) => {
      if (post.userId === usuarioId) return;
      dispatch({ type: ADD_POST, payload: post });
    };

    const handleCommentCreated = ({ postId, comment }) => {
      if (comment.userId === usuarioId) return;
      dispatch({
        type: ADD_COMMENT,
        payload: { postId, comment },
      });
    };

    const handleReactionUpdated = ({ postId, reactions }) => {
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
    };

    socket.on("postCreated", handlePostCreated);
    socket.on("commentCreated", handleCommentCreated);
    socket.on("reactionUpdated", handleReactionUpdated);

    return () => {
      socket.off("postCreated", handlePostCreated);
      socket.off("commentCreated", handleCommentCreated);
      socket.off("reactionUpdated", handleReactionUpdated);
    };
  }, [usuarioId]);

  // ===============================
  // 📡 API ACTIONS
  // ===============================
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

    // Optimistic update local
    dispatch({ type: ADD_POST, payload: res.data });
  };

  const createComment = async ({ postId, comment, userId }) => {
    const res = await MethodPost(`/community/comments?userId=${userId}`, {
      postId,
      content: comment,
    });

    dispatch({
      type: ADD_COMMENT,
      payload: { postId, comment: res.data },
    });

    return res.data;
  };

  const addReaction = async (data) => {
    await MethodPost(`/community/reactions/toggle`, data);
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

    dispatch({
      type: GET_REACTIONS_SUMMARY_MULTIPLE,
      payload: data,
    });
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
