import { useEffect, useState } from "react";
import MethodGet from "../config/Service";
import { getSocket, initSocket } from "../socket"; // 👈 Asegúrate de importar initSocket

export const usePostShow = (postId) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!postId) return;

    let isMounted = true;

    // 1. Carga inicial vía API
    const fetchPost = async () => {
      try {
        setLoading(true);
        const { data } = await MethodGet(`/posts/${postId}/show`);
        if (isMounted) {
          setPost(data.data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPost();

    // 2. Obtener o asegurar la instancia del socket de manera segura
    let socket = getSocket();
    if (!socket) {
      // Si por alguna razón el socket global aún no existe, lo inicializamos
      socket = initSocket();
    }

    const handleNewComment = (payload) => {
      const commentPostId = payload.postId || payload.comment?.postId;

      if (String(commentPostId) === String(postId)) {
        setPost((prevPost) => {
          if (!prevPost) return null;

          const newComment = payload.comment || payload;

          const exists = prevPost.comments?.some((c) => c.id === newComment.id);
          if (exists) return prevPost;

          return {
            ...prevPost,
            comments: [...(prevPost.comments || []), newComment],
            commentsCount: (prevPost.commentsCount || 0) + 1,
          };
        });
      }
    };

    if (socket) {
      socket.on("new_comment", handleNewComment);
    }

    // 3. Limpieza al desmontar
    return () => {
      isMounted = false;
      if (socket) {
        socket.off("new_comment", handleNewComment);
      }
    };
  }, [postId]);

  return { post, setPost, loading, error };
};
