import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { Box, Typography, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { motion, AnimatePresence } from "framer-motion";

/**
 * LiveCommentsOverlay
 * TikTok Live Style | Mobile-first | Ultra-Optimizado
 */
const LiveCommentsOverlay = ({ comments = [], onSend }) => {
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [commentsHidden, setCommentsHidden] = useState(false);
  const [cooldown, setCooldown] = useState(false);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  const isMobile = window.innerWidth < 768;

  /* ==============================
   * PERFORMANCE
   * ============================== */
  const visibleComments = useMemo(() => comments.slice(-30), [comments]);

  /* ==============================
   * AUTO SCROLL (TikTok style)
   * ============================== */
  useEffect(() => {
    if (!commentsHidden) {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [visibleComments, commentsHidden]);

  /* ==============================
   * AUTO FOCUS (mobile only)
   * ============================== */
  useEffect(() => {
    if (!commentsHidden && isMobile) {
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [commentsHidden, isMobile]);

  /* ==============================
   * SEND MESSAGE
   * ============================== */
  const handleSend = useCallback(() => {
    if (!message.trim() || cooldown) return;

    const tempMessage = message.trim();
    setMessage(""); // 🔥 limpia ANTES

    onSend(tempMessage);

    setCooldown(true);
    setTimeout(() => setCooldown(false), 2200);
  }, [message, cooldown, onSend]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

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
          top: 14,
          right: 14,
          zIndex: 30,
          pointerEvents: "auto",
        }}
      >
        <IconButton
          aria-label={
            commentsHidden ? "Mostrar comentarios" : "Ocultar comentarios"
          }
          onClick={() => setCommentsHidden((prev) => !prev)}
          sx={{
            width: 38,
            height: 38,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(10px)",
            color: "#FFF",
            "&:hover": {
              background: "rgba(0,0,0,0.7)",
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
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.25 }}
          >
            <Box
              sx={{
                maxHeight: { xs: 150, md: 220 },
                overflowY: "auto",
                mb: 2,
                pointerEvents: "auto",
                pr: 1,

                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { width: "2px" },

                maskImage:
                  "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
              }}
            >
              <AnimatePresence>
                {visibleComments.map((c, index) => (
                  <motion.div
                    key={c.id || `${c.user_id}-${c.created_at}-${index}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Box
                      sx={{
                        mb: 0.8,
                        px: 2,
                        py: 1,
                        borderRadius: "14px",
                        backdropFilter: "blur(6px)",
                        background:
                          "linear-gradient(135deg, rgba(0,0,0,0.45), rgba(0,0,0,0.2))",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: "0.78rem",
                          color: "rgba(255,255,255,0.9)",
                        }}
                      >
                        {c.user_name}
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: "0.85rem",
                          lineHeight: 1.35,
                          color: "rgba(255,255,255,0.95)",
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
          backdropFilter: "blur(16px)",
          background: "rgba(255,255,255,0.92)",
          borderRadius: "999px",
          px: 2,
          py: 1,
          mb: isFocused ? "env(safe-area-inset-bottom)" : 0,
          transition: "all 0.25s ease",
          border: isFocused
            ? "1px solid rgba(254,44,85,0.4)"
            : "1px solid transparent",
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
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          InputProps={{
            disableUnderline: true,
          }}
          disabled={cooldown}
        />

        <IconButton
          aria-label='Enviar comentario'
          onClick={handleSend}
          disabled={cooldown || !message.trim()}
          sx={{
            transform: message.trim() ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.15s ease",
          }}
        >
          <SendIcon
            sx={{
              color: cooldown ? "rgba(0,0,0,0.25)" : "#FE2C55",
            }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export default React.memo(LiveCommentsOverlay);
