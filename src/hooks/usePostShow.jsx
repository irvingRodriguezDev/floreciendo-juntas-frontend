import { useEffect, useState } from "react";
import MethodGet from "../config/Service";
import { getSocket } from "../socket"; // 👈 Tu instancia global de socket.io

export const usePostShow = (postId) => {
  const socket = getSocket();
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

    // 2. Escuchar el evento de nuevo comentario (mismo nombre que usas en el Feed)
    const handleNewComment = (payload) => {
      // payload suele traer { postId, comment } o similar
      const commentPostId = payload.postId || payload.comment?.postId;

      // Solo actualizamos si el comentario pertenece a la publicación actual
      if (String(commentPostId) === String(postId)) {
        setPost((prevPost) => {
          if (!prevPost) return null;

          const newComment = payload.comment || payload;

          // Evitar duplicados por si la API REST y el Socket coinciden
          const exists = prevPost.comments?.some((c) => c.id === newComment.id);
          if (exists) return prevPost;

          return {
            ...prevPost,
            comments: [...(prevPost.comments || []), newComment], // Inserta al final o inicio según tu orden
            commentsCount: (prevPost.commentsCount || 0) + 1,
          };
        });
      }
    };

    // Sustituye "new_comment" por el nombre exacto de evento que emite tu backend (ej. "comment_created", "new_post_comment")
    socket.on("new_comment", handleNewComment);

    // 3. Limpieza al desmontar
    return () => {
      isMounted = false;
      socket.off("new_comment", handleNewComment);
    };
  }, [postId]);

  return { post, setPost, loading, error };
};
