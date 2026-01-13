import React, { useEffect, useReducer, useContext, useRef } from "react";
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
import { initSocket } from "../../socket";
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

  // 🔌 SOCKET SINGLETON
  const socketRef = useRef(null);
  const token = localStorage.getItem("token");

  // 🚀 Inicializar socket SOLO UNA VEZ
  useEffect(() => {
    if (!token || socketRef.current) return;

    socketRef.current = initSocket(token);

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [token]);

  // 👂 Escuchar eventos
  useEffect(() => {
    const socket = socketRef.current;
    if (!socket || !usuarioId) return;

    socket.on("postCommunityCreated", (post) => {
      if (post.userId === usuarioId) return;
      dispatch({ type: CREATE_POST_COMMUNITY, payload: post });
    });

    socket.on("createCommentPostCommunity", ({ postId, comment, userId }) => {
      if (userId === usuarioId) return;
      dispatch({
        type: CREATE_COMMENT_POST_COMMUNITY,
        payload: { postId, comment },
      });
    });

    socket.on("postLikeToggled", ({ postId, userId, liked }) => {
      if (userId === usuarioId) return;

      dispatch({
        type: SOCKET_REACTION_POST_COMMUNITY,
        payload: { postId, liked },
      });
    });

    return () => {
      socket.off("postCommunityCreated");
      socket.off("createCommentPostCommunity");
      socket.off("postLikeToggled");
    };
  }, [usuarioId]);

  // 📡 FEED
  const getFeed = (page = 1, limit = 10) => {
    MethodGet(`/posts?page=${page}&limit=${limit}`)
      .then((res) => {
        dispatch({
          type: GET_POSTS_COMMUNITY,
          payload: {
            community_posts: res.data.data,
            currentPage: res.data.pagination.page,
            totalPages: res.data.pagination.totalPages,
          },
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Cuidado",
          text: `Ocurrio un error, al obtener las publicaciones ${error.response.data.message}`,
          icon: "error",
          showConfirmButton: false,
          timer: 3500,
        });
      });
  };

  // 📝 POST
  const createPostCommunity = async (data) => {
    Swal.fire({
      title: "Publicando...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
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
      });

      dispatch({
        type: CREATE_POST_COMMUNITY,
        payload: res.data.post,
      });
    } catch (error) {
      Swal.fire("Error", "No se pudo publicar", "error");
    }
  };

  // 💬 COMENTARIO (OPTIMISTIC)
  const createCommentPostCommunity = async (postId, data) => {
    const formData = new FormData();
    if (data.content) formData.append("content", data.content);

    if (data.files?.length) {
      data.files.forEach((f) => formData.append("files", f));
    }

    const tempId = `temp-${Date.now()}`;

    const optimisticComment = {
      id: tempId,
      content: data.content,
      user: data.user,
      createdAt: new Date(),
      media: data.files?.map((file) => ({
        url: URL.createObjectURL(file),
        type: file.type.startsWith("video") ? "video" : "image",
      })),
      optimistic: true,
    };

    dispatch({
      type: CREATE_COMMENT_POST_COMMUNITY,
      payload: {
        postId,
        comment: optimisticComment,
      },
    });

    try {
      const res = await clienteAxios.post(
        `/posts/${postId}/comments`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      optimisticComment.media?.forEach((m) => URL.revokeObjectURL(m.url));

      dispatch({
        type: CREATE_COMMENT_POST_COMMUNITY,
        payload: {
          postId,
          comment: res.data.data,
          replaceTemp: tempId,
        },
      });
    } catch (error) {
      dispatch({
        type: REMOVE_OPTIMISTIC_COMMENT,
        payload: { postId, tempId },
      });

      Swal.fire("Error", "No se pudo publicar el comentario", "error");
    }
  };

  //toogleReaction
  const createToogleReaction = async (postId) => {
    dispatch({
      type: TOOGLE_REACTION_POST_COMMUNITY,
      payload: { postId },
    });

    try {
      await MethodPost(`/posts/${postId}/reaction`);
    } catch (error) {
      console.error(error);
      // rollback simple
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
