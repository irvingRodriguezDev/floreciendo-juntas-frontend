import { useEffect, useState, useRef, useContext, useCallback } from "react";
import MethodGet, { MethodPost } from "../config/Service";
import AuthContext from "../context/Auth/AuthContext";

export const useLiveComments = (liveId, roomArn, tokenAuth) => {
  const { usuario } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [viewers, setViewers] = useState(0);
  const [health, setHealth] = useState(null);

  const socketRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const isMountedRef = useRef(true);
  const retryCountRef = useRef(0);

  // 1. Cargar el historial inicial desde la Base de Datos
  useEffect(() => {
    if (!liveId) return;

    const fetchInitialComments = async () => {
      try {
        const response = await MethodGet(`/lives/comments/${liveId}`);
        if (response?.data) {
          const sortedComments = [...response.data].reverse();
          setComments(sortedComments);
        }
      } catch (error) {
        console.error("❌ Error cargando comentarios de la BD:", error);
      }
    };

    fetchInitialComments();
  }, [liveId, tokenAuth]);

  // 2. Conectar a Amazon IVS Chat con Reconexión Automática & Fetch de Token Dinámico
  useEffect(() => {
    if (!liveId || !roomArn || !tokenAuth) return;

    isMountedRef.current = true;

    const connectIvsChat = async () => {
      // Si ya hay un socket conectando/abierto, evitamos duplicados
      if (
        socketRef.current &&
        (socketRef.current.readyState === WebSocket.CONNECTING ||
          socketRef.current.readyState === WebSocket.OPEN)
      ) {
        return;
      }

      try {
        // Pedir Token Fresco a la API de Node.js
        const res = await MethodPost("/lives/chat-token", { roomArn: roomArn });

        if (!res?.data?.token) {
          console.warn("⚠️ No se obtuvo token de IVS Chat");
          scheduleReconnect();
          return;
        }

        if (!isMountedRef.current) return;

        const endpoint = "wss://edge.ivschat.us-east-1.amazonaws.com";
        const ws = new WebSocket(endpoint, [res.data.token]);

        ws.onopen = () => {
          if (!isMountedRef.current) return;
          console.log("🌸 Conectado al IVS Chat de Floreciendo Juntas");
          setIsConnected(true);
          retryCountRef.current = 0; // Reiniciar contador tras conexión exitosa
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);

            if (data.Type === "MESSAGE") {
              const attributes = data.Attributes || {};

              const newComment = {
                id: data.Id,
                user_name:
                  attributes.username ||
                  data.Sender?.Attributes?.username ||
                  "Alumna",
                user_id: attributes.userId || data.Sender?.UserId,
                message: data.Content,
                replyToUser: attributes.replyToUser || null,
                replyToUserId: attributes.replyToUserId || null,
                createdAt: data.SendTime,
              };

              setComments((prev) => {
                const exists = prev.some((c) => c.id === newComment.id);
                if (exists) return prev;
                return [...prev, newComment].slice(-50);
              });
            }

            if (data.Type === "DELETE_MESSAGE") {
              const deletedId = data.Attributes?.MessageId;
              setComments((prev) =>
                prev.filter((comment) => comment.id !== deletedId),
              );
            }
          } catch (err) {
            console.error("Error parseando mensaje de IVS Chat:", err);
          }
        };

        ws.onclose = () => {
          if (!isMountedRef.current) return;
          setIsConnected(false);
          console.warn("⚠️ Conexión IVS Chat cerrada. Reintentando...");
          scheduleReconnect();
        };

        ws.onerror = (err) => {
          console.error("❌ Error en IVS Chat WebSocket:", err);
          // onerror es seguido por onclose, por lo que onclose maneja la reconexión
        };

        socketRef.current = ws;
      } catch (error) {
        console.error("🔥 Error iniciando IVS Chat:", error);
        if (isMountedRef.current) {
          scheduleReconnect();
        }
      }
    };

    // Programar reintento exponencial (Backoff: 2s, 4s, 8s, max 10s)
    const scheduleReconnect = () => {
      if (reconnectTimeoutRef.current)
        clearTimeout(reconnectTimeoutRef.current);

      const delay = Math.min(1000 * Math.pow(2, retryCountRef.current), 10000);
      retryCountRef.current += 1;

      reconnectTimeoutRef.current = setTimeout(() => {
        if (isMountedRef.current) {
          connectIvsChat();
        }
      }, delay);
    };

    connectIvsChat();

    return () => {
      isMountedRef.current = false;
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (socketRef.current) {
        // Desvincular handlers antes de cerrar para evitar llamadas tras desmontar
        socketRef.current.onclose = null;
        socketRef.current.onerror = null;
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, [liveId, roomArn, tokenAuth]);

  // ✉️ Función para enviar un comentario (Optimizada con useCallback)
  const sendComment = useCallback(
    async (message, replyTo = null) => {
      if (!message?.trim()) return;

      const trimmedMessage = message.trim();
      const currentUserName = usuario?.name || "Alumna";

      // A) Enviar por IVS Chat si está conectado
      if (
        socketRef.current &&
        socketRef.current.readyState === WebSocket.OPEN
      ) {
        const payload = {
          Action: "SEND_MESSAGE",
          Content: trimmedMessage,
          Attributes: {
            username: currentUserName,
            replyToUser: replyTo?.userName || "",
            replyToUserId: replyTo?.userId ? String(replyTo.userId) : "",
          },
        };

        socketRef.current.send(JSON.stringify(payload));
      }

      // B) Respaldar en BD en segundo plano
      try {
        await MethodPost(`/lives/create-comment/${liveId}`, {
          message: trimmedMessage,
          replyToUser: replyTo?.userName || null,
          replyToUserId: replyTo?.userId || null,
        });
      } catch (error) {
        console.error("⚠️ Error respaldando comentario en BD:", error);
      }
    },
    [liveId, usuario?.name],
  );

  return {
    comments,
    sendComment,
    isConnected,
    viewers,
    health,
  };
};
