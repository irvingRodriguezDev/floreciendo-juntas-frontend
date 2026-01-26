// src/hooks/useNotificationHandler.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { messaging } from "../firebase";
import { onMessage } from "firebase/messaging";

export const useNotificationHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("🔔 Notificación recibida:", payload);

      const url = payload?.data?.url;
      const commentId = payload?.data?.commentId;

      if (!url) return;

      // 👇 si viene comentario, lo pasamos como query
      if (commentId) {
        navigate(`${url}?commentId=${commentId}`);
      } else {
        navigate(url);
      }
    });

    return () => unsubscribe();
  }, [navigate]);
};
