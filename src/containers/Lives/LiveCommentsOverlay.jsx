import React, { useState, useRef, useEffect } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import { Send, Visibility, VisibilityOff } from "@mui/icons-material";
import { useLiveComments } from "../../hooks/useLiveComments";

const LiveCommentsOverlay = ({ liveId, isMobile }) => {
  const [message, setMessage] = useState("");
  const [isHidden, setIsHidden] = useState(false);
  const { comments, sendComment } = useLiveComments(liveId);
  const scrollRef = useRef(null);

  // Auto-scroll al recibir mensajes nuevos
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [comments]);

  const handleSend = () => {
    if (!message.trim()) return;
    sendComment(message.trim());
    setMessage("");
  };

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        pointerEvents: "none", // El contenedor base no bloquea
      }}
    >
      {!isHidden && (
        <Box
          ref={scrollRef}
          sx={{
            p: 2,
            // Altura máxima para que el scroll se active
            maxHeight: isMobile ? "60%" : "250px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 1,
            pointerEvents: "auto", // IMPORTANTE: Esto reactiva el scroll táctil
            WebkitOverflowScrolling: "touch", // Suavidad en iOS
            "&::-webkit-scrollbar": { display: "none" }, // Ocultar barra fea
          }}
        >
          {comments?.map((c, i) => (
            <Box
              key={i}
              sx={{
                bgcolor: "rgba(0,0,0,0.15)",
                p: "8px 12px",
                borderRadius: "15px",
                width: "fit-content",
                maxWidth: "90%",
                boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
              }}
            >
              <span
                style={{
                  color: "#e53888",
                  fontWeight: "bold",
                  fontSize: isMobile ? "0.8rem" : "1.2rem",
                  display: "block",
                }}
              >
                {c.user_name}
              </span>
              <span
                style={{
                  color: "white",
                  fontSize: isMobile ? "0.9rem" : "1.3rem",
                  wordBreak: "break-word",
                }}
              >
                {c.message}
              </span>
            </Box>
          ))}
        </Box>
      )}

      {/* Input de mensajes */}
      <Box sx={{ p: 2, display: "flex", gap: 1, pointerEvents: "auto" }}>
        <IconButton
          onClick={() => setIsHidden(!isHidden)}
          sx={{ color: "white", bgcolor: "rgba(0,0,0,0.4)" }}
        >
          {isHidden ? <Visibility /> : <VisibilityOff />}
        </IconButton>

        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            bgcolor: "rgba(255,255,255,0.15)",
            borderRadius: "25px",
            px: 2,
            alignItems: "center",
            backdropFilter: "blur(10px)",
          }}
        >
          <TextField
            fullWidth
            variant='standard'
            placeholder='Comentar...'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            InputProps={{ disableUnderline: true, sx: { color: "white" } }}
          />
          <IconButton onClick={handleSend} sx={{ color: "#e53888" }}>
            <Send />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default LiveCommentsOverlay;
