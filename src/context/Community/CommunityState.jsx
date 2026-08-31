import React, { useEffect, useReducer, useContext } from "react";
import CommunityContext from "./CommunityContext";
import CommunityReducer from "./CommunityReducer";
import MethodGet, { MethodPost } from "../../config/Service";
import {
  CREATE_COMMENT_POST_COMMUNITY,
  CREATE_POST_COMMUNITY,
  GET_POSTS_COMMUNITY,
  REMOVE_OPTIMISTIC_COMMENT,
  TOGGLE_COMMENT_LIKE_COMMUNITY,
  TOOGLE_REACTION_POST_COMMUNITY,
} from "../../types";
import clienteAxios from "../../config/Axios";
import { getSocket } from "../../socket";
import Swal from "sweetalert2";
import AuthContext from "../Auth/AuthContext";
import { useSound } from "../../hooks/useSound";
import notificationSound from "../../assets/sounds/A soft, bubbly pop sound for a notification popping up..wav";

const CommunityState = ({ children }) => {
  const initialState = {
    community_posts: [],
    post: {},
    totalPages: 0,
    currentPage: 1,
  };
  const playSound = useSound(notificationSound);
  const [state, dispatch] = useReducer(CommunityReducer, initialState);
  const { autenticado, usuario } = useContext(AuthContext);
  const usuarioId = usuario?.id;

  // 👂 SOCKET EVENTS
  useEffect(() => {
    if (!autenticado || !usuarioId) return;

    const socket = getSocket();
    if (!socket) return;

    // 1. Nuevo Post en vivo
    const onPostCreated = (post) => {
      if (
        String(post.userId) === String(usuarioId) ||
        String(post.user?.id) === String(usuarioId)
      )
        return;
      dispatch({ type: CREATE_POST_COMMUNITY, payload: post });
    };

    // 2. Nuevo Comentario o Respuesta en vivo
    const onCommentCreated = ({ postId, comment, userId, parentId }) => {
      if (String(userId) === String(usuarioId)) return;
      dispatch({
        type: CREATE_COMMENT_POST_COMMUNITY,
        payload: { postId: Number(postId), comment, parentId },
      });
    };

    // 3. Like a Post en vivo (recibe { postId, userId, liked, likesCount })
    const onPostLikeToggled = (payload) => {
      if (String(payload.userId) === String(usuarioId)) return;
      dispatch({
        type: TOOGLE_REACTION_POST_COMMUNITY,
        payload,
      });
    };

    // 4. Like a Comentario en vivo (recibe { commentId, postId, userId, liked, likesCount, parentId })
    const onCommentLikeToggled = (payload) => {
      if (String(payload.userId) === String(usuarioId)) return;
      dispatch({
        type: TOGGLE_COMMENT_LIKE_COMMUNITY,
        payload,
      });
    };

    socket.on("postCommunityCreated", onPostCreated);
    socket.on("createCommentPostCommunity", onCommentCreated);
    socket.on("postLikeToggled", onPostLikeToggled);
    socket.on("toggleCommentLike", onCommentLikeToggled);

    return () => {
      socket.off("postCommunityCreated", onPostCreated);
      socket.off("createCommentPostCommunity", onCommentCreated);
      socket.off("postLikeToggled", onPostLikeToggled);
      socket.off("toggleCommentLike", onCommentLikeToggled);
    };
  }, [autenticado, usuarioId]);

  // 📡 FEED
  const getFeed = (page, limit, search = "", type = "general") => {
    let url = `/posts?type=${type}&page=${page}&limit=${limit}`;
    if (search.trim() !== "") url += `&search=${encodeURIComponent(search)}`;

    return MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_POSTS_COMMUNITY,
          payload: {
            community_posts: res.data.data,
            currentPage: res.data.pagination?.page || page,
            totalPages: res.data.pagination?.totalPages || 1,
          },
        });
        return res.data;
      })
      .catch((error) => {
        console.error("Error fetching feed:", error);
        throw error;
      });
  };

  // 📝 CREAR POST
  const createPostCommunity = async (data) => {
    Swal.fire({
      title: "Publicando...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        const container = Swal.getContainer();
        if (container) container.style.zIndex = "1500";
      },
    });

    try {
      const res = await clienteAxios.post("/posts", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire({
        icon: "success",
        title: "¡Publicado!",
        timer: 2000,
        showConfirmButton: false,
        didOpen: () => {
          Swal.getContainer().style.zIndex = "1500";
        },
      });

      playSound();

      dispatch({
        type: CREATE_POST_COMMUNITY,
        payload: res.data.post,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "No se pudo publicar",
        didOpen: () => {
          Swal.getContainer().style.zIndex = "1500";
        },
      });
    }
  };

  // 💬 COMENTARIO (SOPORTA RESPUESTAS Y ANIDADOS CON OPTIMISTIC UI)
  const createCommentPostCommunity = async (postId, data) => {
    const formData = new FormData();
    if (data.content) formData.append("content", data.content);
    if (data.parentId) formData.append("parentId", data.parentId);
    if (data.replyToUserId)
      formData.append("replyToUserId", data.replyToUserId);

    if (data.files?.length) {
      data.files.forEach((file) => formData.append("files", file));
    }
    const tempId = `temp-${Date.now()}`;

    const optimisticComment = {
      id: tempId,
      content: data.content,
      user: data.user,
      parentId: data.parentId || null,
      replyToUserId: data.replyToUserId || null,
      createdAt: new Date(),
      optimistic: true,
      media: data.files?.map((file) => ({
        url: URL.createObjectURL(file),
        type: file.type.startsWith("video") ? "video" : "image",
      })),
      replies: [],
    };

    // 🚀 Optimistic UI
    dispatch({
      type: CREATE_COMMENT_POST_COMMUNITY,
      payload: { postId, comment: optimisticComment, parentId: data.parentId },
    });

    try {
      const res = await clienteAxios.post(
        `/posts/${postId}/comments`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      optimisticComment.media?.forEach((m) => URL.revokeObjectURL(m.url));

      dispatch({
        type: CREATE_COMMENT_POST_COMMUNITY,
        payload: {
          postId,
          comment: res.data.data,
          parentId: data.parentId,
          replaceTemp: tempId,
        },
      });

      playSound();
    } catch (error) {
      dispatch({
        type: REMOVE_OPTIMISTIC_COMMENT,
        payload: { postId, tempId, parentId: data.parentId },
      });

      Swal.fire({
        title: "Error",
        text:
          error.response?.data?.message ||
          "Ocurrió un problema al publicar el comentario",
        icon: "error",
        timer: 2500,
        showConfirmButton: false,
      });
    }
  };

  // ❤️ TOGGLE REACTION EN POST
  const createToogleReaction = async (postId) => {
    dispatch({
      type: TOOGLE_REACTION_POST_COMMUNITY,
      payload: { postId },
    });

    try {
      await MethodPost(`/posts/${postId}/reaction`);
      playSound();
    } catch (error) {
      dispatch({
        type: TOOGLE_REACTION_POST_COMMUNITY,
        payload: { postId },
      });
      console.error("Error toggling reaction", error);
    }
  };

  // ❤️ TOGGLE LIKE EN COMENTARIOS
  const toggleCommentLike = async (commentId) => {
    try {
      await MethodPost(`/posts/comments/${commentId}/reaction`);
    } catch (error) {
      console.error("Error toggling comment like", error);
    }
  };

  return (
    <CommunityContext.Provider
      value={{
        ...state,
        getFeed,
        createPostCommunity,
        createCommentPostCommunity,
        createToogleReaction,
        toggleCommentLike,
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
};

export default CommunityState;
