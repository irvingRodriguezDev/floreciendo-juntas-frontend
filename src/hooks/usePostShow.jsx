// hooks/usePostShow.js
import { useEffect, useState } from "react";
import MethodGet from "../config/Service";

export const usePostShow = (postId) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!postId) return;

    const fetchPost = async () => {
      try {
        setLoading(true);
        const { data } = await MethodGet(`/posts/${postId}/show`);
        setPost(data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  return { post, loading, error };
};
