import React, { useState, useRef, useEffect, useContext } from "react";
import { Box, TextField, IconButton, Typography, Chip } from "@mui/material";
import { Send, Close, Reply } from "@mui/icons-material";
import AuthContext from "../../context/Auth/AuthContext";

const LiveCommentsSidebar = ({
  liveId,
  comments,
  sendComment,
  isConnected = true,
  isFullscreen = false,
  commentsVisible = true,
}) => {
  const [message, setMessage] = useState("");
  const [replyTo, setReplyTo] = useState(null); // { userName, userId }
  const [notification, setNotification] = useState(null); // Alerta flotante corta
  const scrollRef = useRef(null);

  const { usuario } = useContext(AuthContext); // Usuario actual logueado

  useEffect(() => {
    if (scrollRef.current && commentsVisible) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }

    // Alerta estilo TikTok si le responden al usuario actual
    const lastComment = comments?.[comments.length - 1];
    if (
      lastComment &&
      lastComment.replyToUserId &&
      String(lastComment.replyToUserId) === String(usuario?.id)
    ) {
      setNotification(`${lastComment.user_name} te ha respondido`);
      const timer = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [comments, commentsVisible, usuario?.id]);

  // Click en un comentario para responder
  const handleCommentClick = (comment) => {
    const targetName = comment.user_name || "Alumna";
    setReplyTo({
      userName: targetName,
      userId: comment.user_id || comment.userId,
    });

    if (!message.startsWith(`@${targetName}`)) {
      setMessage(`@${targetName} `);
    }
  };

  // Enviar mensaje
  const handleSend = () => {
    if (!message.trim()) return;
    sendComment(message.trim(), replyTo);
    setMessage("");
    setReplyTo(null);
  };

  // ── En fullscreen: overlay flotante con slide ────────────────────────────
  const fullscreenSx = {
    position: "absolute",
    top: 0,
    right: commentsVisible ? 0 : "-320px",
    width: "300px",
    height: "100%",
    zIndex: 150,
    bgcolor: "rgba(10,10,10,0.65)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    borderLeft: "1px solid rgba(255,255,255,0.08)",
    transition: "right 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    display: "flex",
    flexDirection: "column",
    "@media (max-width: 600px)": { display: "none !important" },
  };

  // ── Normal: columna sólida del grid limitando la altura ────────────────
  const normalSx = {
    display: "flex",
    flexDirection: "column",
    bgcolor: "#1a1a1a",
    borderRadius: "12px",
    minHeight: { xs: 300, md: "100%" },
    maxHeight: { xs: 300, xl: 630 },
    height: "100%",
    position: "relative",
    overflow: "hidden",
  };

  return (
    <Box
      className='comments-sidebar'
      sx={isFullscreen ? fullscreenSx : normalSx}
    >
      {/* ── ALERTA FLOTANTE ESTILO TIKTOK (FadeUp + 4s Auto-Hide) ── */}
      {notification && (
        <Box
          sx={{
            position: "absolute",
            top: 20,
            left: "50%",
            bgcolor: "#e03886b5",
            color: "white",
            px: 2,
            py: 0.8,
            borderRadius: "20px",
            zIndex: 200,
            boxShadow: "0 6px 16px rgba(229, 56, 136, 0.9)",
            display: "flex",
            alignItems: "center",
            gap: 1,
            pointerEvents: "none",
            // 🎯 Ajustamos la curva 'ease-out' para que el frenado sea súper progresivo
            animation: "fadeUpAndOut 8s ease-out forwards",
            "@keyframes fadeUpAndOut": {
              "0%": {
                opacity: 0,
                transform: "translate(-50%, 120px)", // Reducimos un poco el recorrido para que no flote desenfrenado
              },
              "30%": {
                // 👈 Le damos hasta el 30% del tiempo (2.4 segundos) para que la subida sea pausada
                opacity: 1,
                transform: "translate(-50%, 0)", // Llega a su posición
              },
              "80%": {
                opacity: 1,
                transform: "translate(-50%, 0)", // Se mantiene visible
              },
              "100%": {
                opacity: 0,
                transform: "translate(-50%, -15px)", // Se desvanece suavemente
              },
            },
          }}
        >
          <Reply sx={{ fontSize: 16 }} />
          <Typography
            sx={{ fontSize: "0.75rem", fontWeight: 600, whiteSpace: "nowrap" }}
          >
            {notification}
          </Typography>
        </Box>
      )}
      {/* ── Header ── */}
      <Box
        sx={{
          px: 2,
          py: 1.5,
          borderBottom: "0.5px solid rgba(255,255,255,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <Typography
          sx={{ color: "white", fontWeight: 500, fontSize: "0.9rem" }}
        >
          Comentarios
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              bgcolor: isConnected ? "#e53888" : "#ff9800",
            }}
          />
        </Box>
      </Box>

      {/* ── Lista de Comentarios con Scroll Interno ── */}
      <Box
        ref={scrollRef}
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 1.5,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          "&::-webkit-scrollbar": { width: 3 },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: "rgba(255,255,255,0.12)",
            borderRadius: 2,
          },
        }}
      >
        {comments?.map((c, i) => {
          const authorName = c.user_name || "Alumna";
          const isMentioningMe =
            String(c.replyToUserId) === String(usuario?.id);
          const replyToUser = c.replyToUser;

          return (
            <Box
              key={c.id || i}
              onClick={() => handleCommentClick(c)}
              sx={{
                bgcolor: isMentioningMe
                  ? "rgba(229, 56, 136, 0.2)"
                  : isFullscreen
                    ? "rgba(255,255,255,0.09)"
                    : "rgba(255,255,255,0.06)",
                border: isMentioningMe
                  ? "1px solid rgba(229, 56, 136, 0.4)"
                  : "none",
                borderRadius: "10px",
                px: 1.5,
                py: 1,
                cursor: "pointer",
                transition: "all 0.2s",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.12)",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.8,
                  mb: 0.3,
                }}
              >
                <Typography
                  sx={{
                    color: "#e53888",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                  }}
                >
                  {authorName}
                </Typography>
              </Box>
              {replyToUser && (
                <span>
                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.4)",
                      fontSize: "0.7rem",
                    }}
                  >
                    respondió a{" "}
                    <span style={{ color: "#e53888" }}>@{replyToUser}</span>
                  </Typography>
                </span>
              )}

              <Typography
                sx={{
                  color: isFullscreen
                    ? "rgba(255,255,255,0.95)"
                    : "rgba(255,255,255,0.85)",
                  fontSize: "0.85rem",
                  lineHeight: 1.4,
                  wordBreak: "break-word",
                }}
              >
                {c.message}
              </Typography>
            </Box>
          );
        })}
      </Box>

      {/* ── Tag de "Respondiendo a..." encima del Input ── */}
      {replyTo && (
        <Box
          sx={{
            px: 2,
            pt: 1,
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexShrink: 0,
          }}
        >
          <Chip
            size='small'
            label={`Respondiendo a @${replyTo.userName}`}
            onDelete={() => setReplyTo(null)}
            deleteIcon={
              <Close
                sx={{ fontSize: "12px !important", color: "white !important" }}
              />
            }
            sx={{
              bgcolor: "rgba(229, 56, 136, 0.2)",
              color: "#e53888",
              fontWeight: 500,
              fontSize: "0.75rem",
              border: "1px solid rgba(229, 56, 136, 0.3)",
            }}
          />
        </Box>
      )}

      {/* ── Input Fijo al Pie ── */}
      <Box
        sx={{
          p: 1.5,
          borderTop: "0.5px solid rgba(255,255,255,0.1)",
          display: "flex",
          gap: 1,
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flex: 1,
            bgcolor: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "20px",
            px: 2,
            alignItems: "center",
            "&:focus-within": {
              borderColor: "rgba(229,56,136,0.45)",
              bgcolor: "rgba(255,255,255,0.11)",
            },
            transition: "all 0.2s",
          }}
        >
          <TextField
            fullWidth
            variant='standard'
            placeholder={
              replyTo ? `Responde a @${replyTo.userName}...` : "Comentar..."
            }
            value={message}
            disabled={!isConnected}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            InputProps={{
              disableUnderline: true,
              sx: {
                color: "white",
                fontSize: "0.85rem",
                "& input::placeholder": { color: "rgba(255,255,255,0.3)" },
              },
            }}
          />
        </Box>
        <IconButton
          onClick={handleSend}
          disabled={!message.trim() || !isConnected}
          size='small'
          sx={{
            bgcolor: "#e53888",
            color: "white",
            width: 36,
            height: 36,
            flexShrink: 0,
            "&:hover": { bgcolor: "#c4306f" },
            "&.Mui-disabled": {
              bgcolor: "rgba(229,56,136,0.25)",
              color: "rgba(255,255,255,0.3)",
            },
          }}
        >
          <Send sx={{ fontSize: 16 }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default LiveCommentsSidebar;
