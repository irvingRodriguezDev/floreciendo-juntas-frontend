import React, { useEffect, useReducer, useContext, use } from "react";
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

  // 👂 SOCKET EVENTS (SIN MANEJAR CONEXIÓN)

  useEffect(() => {
    // Solo intentamos conectar si el usuario está autenticado
    if (!autenticado || !usuarioId) return;

    const socket = getSocket();

    // Si por un microsegundo no hay socket, el siguiente render lo atrapará
    if (!socket) return;

    console.log("📝 Socket vinculado a la Comunidad");

    const onPostCreated = (post) => {
      // Si el post lo creé yo, mi reducer ya lo gestionó localmente (optimistic update)
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

    // Registrar eventos
    socket.on("postCommunityCreated", onPostCreated);
    socket.on("createCommentPostCommunity", onCommentCreated);
    socket.on("postLikeToggled", onReactionToggled);

    // Limpieza
    return () => {
      socket.off("postCommunityCreated", onPostCreated);
      socket.off("createCommentPostCommunity", onCommentCreated);
      socket.off("postLikeToggled", onReactionToggled);
    };

    // 💡 Depender de 'autenticado' asegura que cuando el login se complete,
    // este efecto se ejecute con el socket ya inicializado.
  }, [autenticado, usuarioId]);

  // 📡 FEED
  const getFeed = (page, limit, search = "") => {
    let url = `/posts?page=${page}&limit=${limit}`;
    if (search.trim() !== "") url += `&search=${encodeURIComponent(search)}`;

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
      .catch((error) => console.error(error));
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

      playSound();

      dispatch({
        type: CREATE_POST_COMMUNITY,
        payload: res.data.post,
      });
    } catch (error) {
      Swal.close();

      const message =
        error.response?.data?.message || "No se pudo publicar el post";

      Swal.fire({
        icon: "error",
        title: "Error",
        text: message,
      });
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
      playSound();
    } catch (error) {
      Swal.close(); // ✅ cerrar spinner incluso si falla

      dispatch({
        type: REMOVE_OPTIMISTIC_COMMENT,
        payload: { postId, tempId },
      });

      Swal.fire({
        title: "Error",
        text:
          error.response.data.message ||
          "Ocurrio un problema al publicar el comentario",
        icon: "error",
        timer: 2500,
        showConfirmButton: false,
      });
    }
  };

  // ❤️ TOGGLE REACTION
  const createToogleReaction = async (postId) => {
    // UI Optimista inmediata
    dispatch({
      type: TOOGLE_REACTION_POST_COMMUNITY,
      payload: { postId },
    });

    try {
      const res = await MethodPost(`/posts/${postId}/reaction`);
      // Si el server nos confirma el estado, podrías usar res.data.liked
      // pero por ahora solo activamos sonido si todo sale bien
      playSound();
    } catch (error) {
      // Rollback si falla la red
      dispatch({
        type: TOOGLE_REACTION_POST_COMMUNITY,
        payload: { postId },
      });
      console.error("Error toggling reaction", error);
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
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
};

export default CommunityState;
