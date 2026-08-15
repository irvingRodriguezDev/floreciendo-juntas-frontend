import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext,
} from "react";
import {
  Modal,
  Box,
  Typography,
  Avatar,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { MethodPost } from "../../config/Service";
import { DeleteIcon } from "lucide-react";
import MenuOptionsStory from "./MenuOptionsStory";
import AuthContext from "../../context/Auth/AuthContext";
const STORY_DURATION = 5000;
const QUICK_REACTIONS = ["❤️", "🌸", "😍", "👏", "😮"];

const StoryViewerModal = ({
  open,
  onClose,
  storyGroup,
  onStoryViewed,
  onAllStoriesViewed, // Callback opcional para notificar fin de grupo
  fetchStories,
}) => {
  const { usuario } = useContext(AuthContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [localStories, setLocalStories] = useState([]);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const [replyText, setReplyText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);

  const viewedStoriesRef = useRef(new Set());

  useEffect(() => {
    if (open && storyGroup?.stories) {
      setLocalStories(storyGroup.stories);
      setCurrentIndex(0);
      setProgress(0);
      setIsImageLoaded(false);
      setReplyText("");
      setIsTyping(false);
      viewedStoriesRef.current.clear();
    }
  }, [open, storyGroup]);

  const currentStory = localStories[currentIndex];

  // Avanzar a la siguiente historia (Manual y Automático)
  const handleNext = useCallback(() => {
    setProgress(0);
    setIsImageLoaded(false);
    setReplyText("");
    setIsTyping(false);

    if (currentIndex < localStories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Si era la última historia del grupo, notificamos al padre y cerramos
      if (onAllStoriesViewed && storyGroup?.userId) {
        onAllStoriesViewed(storyGroup.userId);
      }
      onClose();
    }
  }, [
    currentIndex,
    localStories.length,
    storyGroup?.userId,
    onAllStoriesViewed,
    onClose,
  ]);

  const handlePrev = useCallback(() => {
    setProgress(0);
    setIsImageLoaded(false);
    setReplyText("");
    setIsTyping(false);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
  }, []);

  // Registrar Vista individual en BD
  useEffect(() => {
    if (!open || !currentStory) return;

    const storyId = currentStory.id;

    if (!currentStory.isSeen && !viewedStoriesRef.current.has(storyId)) {
      viewedStoriesRef.current.add(storyId);

      MethodPost(`/stories/${storyId}/view`)
        .then(() => {
          setLocalStories((prev) =>
            prev.map((s) => (s.id === storyId ? { ...s, isSeen: true } : s))
          );

          if (onStoryViewed) {
            onStoryViewed(storyGroup.userId, storyId);
          }
        })
        .catch((err) => {
          console.error("Error al registrar vista:", err);
          viewedStoriesRef.current.delete(storyId);
        });
    }
  }, [open, currentIndex, currentStory, storyGroup?.userId, onStoryViewed]);

  // Temporizador Automático con soporte de Pausa (isTyping)
  useEffect(() => {
    if (!open || !currentStory || !isImageLoaded || isTyping) return;

    const startTime = Date.now() - (progress / 100) * STORY_DURATION;

    const interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const newProgress = (elapsedTime / STORY_DURATION) * 100;

      if (newProgress >= 100) {
        clearInterval(interval);
        handleNext();
      } else {
        setProgress(newProgress);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [open, currentIndex, isImageLoaded, isTyping, handleNext]);

  const handleSendReply = async (contentToSend) => {
    const message = contentToSend || replyText;
    if (!message.trim() || sendingMessage) return;

    setSendingMessage(true);

    try {
      await MethodPost("/messages/wish-birthday", {
        receiverId: storyGroup.userId,
        messageText: message,
        storyContext: {
          storyId: currentStory.id,
          mediaUrl: currentStory.mediaUrl,
        },
      });

      setReplyText("");
      setIsTyping(false);
    } catch (error) {
      console.error("Error al enviar respuesta a la historia:", error);
    } finally {
      setSendingMessage(false);
    }
  };

  if (!open || !currentStory) return null;
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(8px)",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: { xs: "100vw", sm: "420px" },
          height: { xs: "100vh", sm: "750px" },
          bgcolor: "black",
          borderRadius: { xs: 0, sm: "16px" },
          overflow: "hidden",
          outline: "none",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* BARRAS DE PROGRESO */}
        <Box
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            right: 12,
            zIndex: 10,
            display: "flex",
            gap: "4px",
          }}
        >
          {localStories.map((s, index) => {
            let widthValue = 0;
            if (index < currentIndex) widthValue = 100;
            else if (index === currentIndex) widthValue = progress;

            return (
              <Box
                key={s.id || index}
                sx={{
                  flex: 1,
                  height: 3,
                  bgcolor: "rgba(255, 255, 255, 0.4)",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    width: `${widthValue}%`,
                    height: "100%",
                    bgcolor: "white",
                    transition:
                      index === currentIndex ? "width 0.05s linear" : "none",
                  }}
                />
              </Box>
            );
          })}
        </Box>

        {/* ENCABEZADO */}
        <Box
          sx={{
            position: "absolute",
            top: 24,
            left: 12,
            right: 12,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar
              src={storyGroup?.profileImage || storyGroup?.profileimage}
              sx={{ width: 36, height: 36, border: "1.5px solid #C02567" }}
            >
              {storyGroup?.userName?.charAt(0)}
            </Avatar>
            <Typography
              variant='subtitle2'
              sx={{ color: "#fff", fontWeight: "bold", fontSize: "18px" }}
            >
              {storyGroup?.userName}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", direction: "row" }}>
            {usuario && usuario.id === storyGroup.userId && (
              <MenuOptionsStory
                storyId={currentStory.id}
                closeModal={onClose}
                fetchStories={fetchStories}
              />
            )}
            <IconButton onClick={onClose} sx={{ color: "white" }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>

        {/* IMAGEN DE LA HISTORIA */}
        <Box
          component='img'
          loading='lazy'
          key={currentStory.id || currentStory.mediaUrl}
          src={currentStory.mediaUrl}
          alt='Story content'
          onLoad={() => setIsImageLoaded(true)}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* CAPTION */}
        {currentStory.caption && (
          <Box
            sx={{
              position: "absolute",
              bottom: 110,
              left: 16,
              right: 16,
              p: 1.5,
              zIndex: 10,
              background: "rgba(0, 0, 0, 0.4)",
              borderRadius: "12px",
              backdropFilter: "blur(4px)",
              textAlign: "center",
            }}
          >
            <Typography
              variant='body2'
              sx={{ color: "white", fontWeight: 500 }}
            >
              {currentStory.caption}
            </Typography>
          </Box>
        )}

        {/* BARRA INFERIOR DE RESPUESTAS */}
        <Box
          sx={{
            position: "absolute",
            bottom: 12,
            left: 12,
            right: 12,
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              bgcolor: "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(6px)",
              borderRadius: "20px",
              py: 0.5,
            }}
          >
            {QUICK_REACTIONS.map((emoji) => (
              <Typography
                key={emoji}
                onClick={() => handleSendReply(emoji)}
                sx={{
                  fontSize: "22px",
                  cursor: "pointer",
                  transition: "transform 0.1s",
                  "&:hover": { transform: "scale(1.3)" },
                }}
              >
                {emoji}
              </Typography>
            ))}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <TextField
              fullWidth
              size='small'
              placeholder={`Responder a ${
                storyGroup?.userName || "historia"
              }...`}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              onFocus={() => setIsTyping(true)}
              onBlur={() => {
                if (!replyText) setIsTyping(false);
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  bgcolor: "rgba(0, 0, 0, 0.5)",
                  backdropFilter: "blur(6px)",
                  borderRadius: "25px",
                  "& fieldset": { borderColor: "rgba(255, 255, 255, 0.4)" },
                  "&:hover fieldset": { borderColor: "white" },
                  "&.Mui-focused fieldset": { borderColor: "#D82E7A" },
                },
              }}
              InputProps={{
                endAdornment: replyText.trim() ? (
                  <InputAdornment position='end'>
                    <IconButton
                      onClick={() => handleSendReply()}
                      disabled={sendingMessage}
                      sx={{ color: "#D82E7A" }}
                    >
                      <SendIcon fontSize='small' />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              }}
            />
          </Box>
        </Box>

        {/* ZONAS TÁCTILES */}
        <Box
          onClick={handlePrev}
          sx={{
            position: "absolute",
            top: 0,
            bottom: 120,
            left: 0,
            width: "35%",
            zIndex: 5,
            cursor: "pointer",
          }}
        />
        <Box
          onClick={handleNext}
          sx={{
            position: "absolute",
            top: 0,
            bottom: 120,
            right: 0,
            width: "65%",
            zIndex: 5,
            cursor: "pointer",
          }}
        />
      </Box>
    </Modal>
  );
};

export default StoryViewerModal;
