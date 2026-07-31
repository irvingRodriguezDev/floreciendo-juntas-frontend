import { useEffect, useState, useRef, useContext } from "react";
import MethodGet, { MethodPost } from "../config/Service";
import AuthContext from "../context/Auth/AuthContext";

export const useLiveComments = (liveId, roomArn, tokenAuth) => {
  const { usuario } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [viewers, setViewers] = useState(0);
  const [health, setHealth] = useState(null);
  const socketRef = useRef(null);

  // 1. Cargar el historial inicial desde la Base de Datos Node.js / Sequelize
  useEffect(() => {
    if (!liveId) return;

    const fetchInitialComments = async () => {
      try {
        const response = await MethodGet(`/lives/comments/${liveId}`);

        if (response?.data) {
          // 💡 .reverse() invierte el arreglo DESC para que quede en orden cronológico ASC
          // (del más antiguo arriba al más reciente abajo pegado al input)
          const sortedComments = [...response.data].reverse();
          setComments(sortedComments);
        }
      } catch (error) {
        console.error("❌ Error cargando comentarios de la BD:", error);
      }
    };

    fetchInitialComments();
  }, [liveId, tokenAuth]);

  // 2. Conectar a Amazon IVS Chat para mensajes en tiempo real
  useEffect(() => {
    // 💡 La validación va DENTRO del useEffect para no alterar los Hooks
    if (!liveId || !roomArn || !tokenAuth) return;

    let ws = null;

    const connectIvsChat = async () => {
      try {
        // Petición del Token IVS a la API
        const res = await MethodPost("/lives/chat-token", { roomArn: roomArn });

        if (!res?.data.token) {
          console.warn("⚠️ No se obtuvo el token de IVS Chat");
          return;
        }

        // Conexión al WebSocket de IVS
        const endpoint = "wss://edge.ivschat.us-east-1.amazonaws.com";
        ws = new WebSocket(endpoint, [res.data?.token]);

        ws.onopen = () => {
          console.log("🌸 Conectado al IVS Chat de Floreciendo Juntas");
          setIsConnected(true);
        };

        ws.onmessage = (event) => {
          const data = JSON.parse(event.data);

          if (data.Type === "MESSAGE") {
            // 💡 Declaramos la variable 'attributes' primero
            const attributes = data.Attributes || {};

            const newComment = {
              id: data.Id,
              user_name:
                attributes.username ||
                data.Sender?.Attributes?.username ||
                "Alumna",
              user_id: attributes.userId || data.Sender?.UserId,
              message: data.Content,

              // 🔑 Leer las menciones enviadas en los Attributes de IVS Chat
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
        };

        ws.onclose = () => {
          setIsConnected(false);
        };

        ws.onerror = (err) => {
          console.error("❌ Error en IVS Chat WebSocket:", err);
        };

        socketRef.current = ws;
      } catch (error) {
        console.error("🔥 Error iniciando IVS Chat:", error);
      }
    };

    connectIvsChat();

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [liveId, roomArn, tokenAuth]);

  // ✉️ Función para enviar un comentario
  const sendComment = async (message, replyTo = null) => {
    if (!message?.trim()) return;

    const trimmedMessage = message.trim();
    const currentUserName = usuario?.name || "Alumna";

    // A) Enviar por IVS Chat
    if (socketRef.current && isConnected) {
      const payload = {
        Action: "SEND_MESSAGE",
        Content: trimmedMessage,
        Attributes: {
          username: currentUserName,
          // Mandamos la mención en los atributos de AWS IVS
          replyToUser: replyTo?.userName || "",
          replyToUserId: replyTo?.userId ? String(replyTo.userId) : "",
        },
      };

      socketRef.current.send(JSON.stringify(payload));
    }

    // B) Guardar en BD en segundo plano
    try {
      await MethodPost(`/lives/create-comment/${liveId}`, {
        message: trimmedMessage,
        replyToUser: replyTo?.userName || null,
        replyToUserId: replyTo?.userId || null,
      });
    } catch (error) {
      console.error("⚠️ Error respaldando comentario:", error);
    }
  };
  return {
    comments,
    sendComment,
    isConnected,
    viewers,
    health,
  };
};
