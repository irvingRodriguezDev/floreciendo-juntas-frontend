import React, { useState, useRef, useEffect, useMemo } from "react";
import { Box, Typography, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { motion, AnimatePresence } from "framer-motion";

/**
 * LiveCommentsOverlay
 * Mobile-first | Optimizado | UX Premium
 */
const LiveCommentsOverlay = ({ comments = [], onSend }) => {
  const [message, setMessage] = useState("");
  const [commentsHidden, setCommentsHidden] = useState(false);
  const [cooldown, setCooldown] = useState(false);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  /* ==============================
   * PERFORMANCE
   * ============================== */
  const visibleComments = useMemo(() => comments.slice(-50), [comments]);

  /* ==============================
   * AUTO SCROLL
   * ============================== */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visibleComments]);

  /* ==============================
   * AUTO FOCUS (mobile-first)
   * ============================== */
  useEffect(() => {
    if (!commentsHidden) {
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [commentsHidden]);

  /* ==============================
   * SEND MESSAGE
   * ============================== */
  const handleSend = () => {
    if (!message.trim() || cooldown) return;

    onSend(message.trim());
    setMessage("");

    // Anti-spam UX (client side)
    setCooldown(true);
    setTimeout(() => setCooldown(false), 2500);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        p: 2,
        pb: "env(safe-area-inset-bottom)",
        zIndex: 20,
        pointerEvents: "none",
      }}
    >
      {/* TOGGLE CHAT */}
      <Box
        sx={{
          position: "absolute",
          top: 12,
          right: 12,
          zIndex: 30,
          pointerEvents: "auto",
        }}
      >
        <IconButton
          onClick={() => setCommentsHidden((prev) => !prev)}
          sx={{
            width: 36,
            height: 36,
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(8px)",
            color: "#FFF",
            "&:hover": {
              background: "rgba(0,0,0,0.65)",
            },
          }}
        >
          {commentsHidden ? (
            <ChatBubbleOutlineIcon fontSize='small' />
          ) : (
            <VisibilityOffIcon fontSize='small' />
          )}
        </IconButton>
      </Box>

      {/* COMMENTS LIST */}
      <AnimatePresence>
        {!commentsHidden && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
          >
            <Box
              sx={{
                maxHeight: { xs: 140, md: 200 },
                overflowY: "auto",
                mb: 2,
                pointerEvents: "auto",

                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { width: "2px" },
                "&::-webkit-scrollbar-thumb": {
                  background: "rgba(255,255,255,0.15)",
                  borderRadius: "10px",
                },

                maskImage:
                  "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
              }}
            >
              <AnimatePresence>
                {visibleComments.map((c) => (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Box
                      sx={{
                        mb: 1,
                        px: 2,
                        py: 1,
                        borderRadius: "14px",
                        backdropFilter: "blur(6px)",
                        background:
                          "linear-gradient(135deg, rgba(229,56,136,0.35), rgba(229,56,136,0.15))",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: "0.78rem",
                          color: "rgba(255,255,255,0.95)",
                        }}
                      >
                        {c.user_name}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.85rem",
                          lineHeight: 1.35,
                          color: "rgba(255,255,255,0.9)",
                          wordBreak: "break-word",
                        }}
                      >
                        {c.message}
                      </Typography>
                    </Box>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={bottomRef} />
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      {/* INPUT */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          pointerEvents: "auto",
          backdropFilter: "blur(14px)",
          background: "rgba(255,255,255,0.88)",
          borderRadius: "999px",
          px: 2,
          py: 1,
        }}
      >
        <TextField
          inputRef={inputRef}
          fullWidth
          variant='standard'
          placeholder={
            cooldown ? "Espera un momento…" : "Escribe un comentario…"
          }
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          InputProps={{ disableUnderline: true }}
          disabled={cooldown}
        />

        <IconButton onClick={handleSend} disabled={cooldown || !message.trim()}>
          <SendIcon sx={{ color: "#E53888" }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default React.memo(LiveCommentsOverlay);
