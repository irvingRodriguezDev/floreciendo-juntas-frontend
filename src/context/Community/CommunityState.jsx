import React, { useEffect, useReducer, useContext } from "react";
import CommunityContext from "./CommunityContext";
import CommunityReducer from "./CommunityReducer";
import MethodGet, { MethodPost } from "../../config/Service";
import {
  CREATE_COMMENT_POST_COMMUNITY,
  CREATE_POST_COMMUNITY,
  GET_POSTS_COMMUNITY,
  REMOVE_OPTIMISTIC_COMMENT,
  TOOGLE_REACTION_POST_COMMUNITY,
} from "../../types";
import clienteAxios from "../../config/Axios";
import { getSocket } from "../../socket";
import Swal from "sweetalert2";
import AuthContext from "../Auth/AuthContext";

const CommunityState = ({ children }) => {
  const initialState = {
    community_posts: [],
    totalPages: 0,
    currentPage: 1,
  };

  const [state, dispatch] = useReducer(CommunityReducer, initialState);

  const { usuario } = useContext(AuthContext);
  const usuarioId = usuario?.id;

  // 👂 SOCKET EVENTS (SIN MANEJAR CONEXIÓN)
  useEffect(() => {
    const socket = getSocket();
    if (!socket || !usuarioId) return;

    const onPostCreated = (post) => {
      if (post.userId === usuarioId) return;
      dispatch({ type: CREATE_POST_COMMUNITY, payload: post });
    };

    const onCommentCreated = ({ postId, comment, userId }) => {
      if (userId === usuarioId) return;
      dispatch({
        type: CREATE_COMMENT_POST_COMMUNITY,
        payload: { postId, comment },
      });
    };

    const onReactionToggled = ({ postId, userId, liked }) => {
      if (userId === usuarioId) return;
      dispatch({
        type: TOOGLE_REACTION_POST_COMMUNITY,
        payload: { postId, liked },
      });
    };

    socket.on("postCommunityCreated", onPostCreated);
    socket.on("createCommentPostCommunity", onCommentCreated);
    socket.on("postLikeToggled", onReactionToggled);

    return () => {
      socket.off("postCommunityCreated", onPostCreated);
      socket.off("createCommentPostCommunity", onCommentCreated);
      socket.off("postLikeToggled", onReactionToggled);
    };
  }, [usuarioId]);

  // 📡 FEED
  const getFeed = (page, limit, search = "") => {
    let url = `/posts?page=${page}&limit=${limit}`;
    if (search.trim() !== "") {
      url += `&search=${encodeURIComponent(search)}`;
    }

    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_POSTS_COMMUNITY,
          payload: {
            community_posts: res.data.data,
            currentPage: res.data.pagination?.page,
            totalPages: res.data.pagination?.totalPages,
          },
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Cuidado",
          text: `Ocurrió un error al obtener publicaciones: ${
            error.response?.data?.message || "Error desconocido"
          }`,
          icon: "error",
          showConfirmButton: false,
          timer: 3500,
        });
      });
  };

  // 📝 CREAR POST
  const createPostCommunity = async (data) => {
    Swal.fire({
      title: "Publicando...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
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
      });

      dispatch({
        type: CREATE_POST_COMMUNITY,
        payload: res.data.post,
      });
    } catch (error) {
      Swal.fire("Error", "No se pudo publicar", "error");
    }
  };

  // 💬 COMENTARIO (OPTIMISTIC UI)
  const createCommentPostCommunity = async (postId, data) => {
    const formData = new FormData();
    if (data.content) formData.append("content", data.content);

    if (data.files?.length) {
      data.files.forEach((file) => formData.append("files", file));
    }

    const tempId = `temp-${Date.now()}`;

    const optimisticComment = {
      id: tempId,
      content: data.content,
      user: data.user,
      createdAt: new Date(),
      optimistic: true,
      media: data.files?.map((file) => ({
        url: URL.createObjectURL(file),
        type: file.type.startsWith("video") ? "video" : "image",
      })),
    };

    // 🚀 Optimistic UI
    dispatch({
      type: CREATE_COMMENT_POST_COMMUNITY,
      payload: { postId, comment: optimisticComment },
    });

    // 🔄 Swal loading
    Swal.fire({
      title: "Publicando comentario",
      text: "Por favor espera…",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
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

      Swal.close(); // ✅ cerrar spinner

      dispatch({
        type: CREATE_COMMENT_POST_COMMUNITY,
        payload: {
          postId,
          comment: res.data.data,
          replaceTemp: tempId,
        },
      });
      Swal.fire({
        title: "Publicado",
        text: "El comentario, se ha publicado exitosamente!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.close(); // ✅ cerrar spinner incluso si falla

      dispatch({
        type: REMOVE_OPTIMISTIC_COMMENT,
        payload: { postId, tempId },
      });

      Swal.fire("Error", "No se pudo publicar el comentario", "error");
    }
  };

  // ❤️ TOGGLE REACTION
  const createToogleReaction = async (postId) => {
    dispatch({
      type: TOOGLE_REACTION_POST_COMMUNITY,
      payload: { postId },
    });

    try {
      await MethodPost(`/posts/${postId}/reaction`);
    } catch (error) {
      console.error(error);
      // rollback
      dispatch({
        type: TOOGLE_REACTION_POST_COMMUNITY,
        payload: { postId },
      });
    }
  };

  return (
    <CommunityContext.Provider
      value={{
        community_posts: state.community_posts,
        totalPages: state.totalPages,
        currentPage: state.currentPage,
        getFeed,
        createPostCommunity,
        createCommentPostCommunity,
        createToogleReaction,
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
};

export default CommunityState;
