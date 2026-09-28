// src/hooks/useNotificationHandler.js
import { useEffect } from "react";
import { onMessage } from "firebase/messaging";
import { messaging } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/Toast/useToast";

export const useNotificationHandler = () => {
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (!messaging) {
      console.warn("⚠️ Firebase Messaging no disponible (foreground)");
      return;
    }

    /**
     * 🔔 Mensajes SOLO cuando la app está en foreground
     */
    const unsubscribe = onMessage(messaging, (payload) => {
      const data = payload.data || {};
      const title = data.title;
      const body = data.body;

      if (!title || !body) return;

      toast.show({
        title,
        message: body,
        variant: "info",
        actionLabel: "Ver",
        onAction: () => {
          if (data.url) {
            navigate(
              data.commentId
                ? `${data.url}?commentId=${data.commentId}`
                : data.url,
            );
          }
        },
      });
    });

    return () => {
      unsubscribe();
    };
  }, [toast, navigate]);
};
