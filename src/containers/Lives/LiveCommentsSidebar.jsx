import React, { useState, useRef, useEffect } from "react";
import { Box, TextField, IconButton, Typography } from "@mui/material";
import { Send } from "@mui/icons-material";

const LiveCommentsSidebar = ({
  liveId,
  comments,
  sendComment,
  isFullscreen = false,
  commentsVisible = true,
}) => {
  const [message, setMessage] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current && commentsVisible) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [comments, commentsVisible]);

  const handleSend = () => {
    if (!message.trim()) return;
    sendComment(message.trim());
    setMessage("");
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
    // Ocultar en mobile aunque estemos en fullscreen
    "@media (max-width: 600px)": { display: "none !important" },
  };

  // ── Normal: columna sólida del grid ─────────────────────────────────────
  const normalSx = {
    display: "flex",
    flexDirection: "column",
    bgcolor: "#1a1a1a",
    minHeight: { xs: 300, md: "100%" },
    maxHeight: { xs: 300, xl: 630 },
  };

  return (
    <Box
      className='comments-sidebar'
      sx={isFullscreen ? fullscreenSx : normalSx}
    >
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
              bgcolor: "#e53888",
            }}
          />
        </Box>
      </Box>

      {/* ── Lista ── */}
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
        {comments?.map((c, i) => (
          <Box
            key={i}
            sx={{
              bgcolor: isFullscreen
                ? "rgba(255,255,255,0.09)"
                : "rgba(255,255,255,0.06)",
              borderRadius: "10px",
              px: 1.5,
              py: 1,
            }}
          >
            <Typography
              sx={{
                color: "#e53888",
                fontWeight: 600,
                fontSize: "0.75rem",
                mb: 0.3,
              }}
            >
              {c.user_name}
            </Typography>
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
        ))}
      </Box>

      {/* ── Input ── */}
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
            placeholder='Comentar...'
            value={message}
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
          disabled={!message.trim()}
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
