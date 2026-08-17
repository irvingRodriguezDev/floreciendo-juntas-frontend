import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext,
} from "react";
import { Modal, Box, Typography } from "@mui/material";
import { MethodPost } from "../../config/Service";
import AuthContext from "../../context/Auth/AuthContext";
import HeaderViewModal from "./HeaderViewModal";
import ViewersFloating from "./ViewersFloating";
import ViewersCounter from "./ViewersCounter";
import BarAnswers from "./BarAnswers";

const STORY_DURATION = 7000;
const QUICK_REACTIONS = ["❤️", "🌸", "😍", "👏", "😮"];

const StoryViewerModal = ({
  open,
  onClose,
  storyGroup,
  onStoryViewed,
  onAllStoriesViewed,
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

  // Estado para controlar las burbujas flotantes temporales
  const [floatingViewers, setFloatingViewers] = useState([]);

  const viewedStoriesRef = useRef(new Set());

  useEffect(() => {
    if (open && storyGroup?.stories) {
      setLocalStories(storyGroup.stories);
      setCurrentIndex(0);
      setProgress(0);
      setIsImageLoaded(false);
      setReplyText("");
      setIsTyping(false);
      setFloatingViewers([]);
      viewedStoriesRef.current.clear();
    }
  }, [open, storyGroup]);

  const currentStory = localStories[currentIndex];

  // Disparar las burbujas flotantes al cambiar de historia si hay espectadores
  useEffect(() => {
    if (!open || !currentStory?.viewers?.length) {
      setFloatingViewers([]);
      return;
    }

    const maxViewers = 13;
    const staggerDelay = 400; // Delay entre cada espectador
    const animDuration = 2400; // Duración de la animación CSS floatUp

    const viewersToFloat = currentStory.viewers
      .slice(0, maxViewers)
      .map((viewer, index) => ({
        ...viewer,
        floatId: `float-${viewer.id || index}-${Date.now()}-${Math.random()
          .toString(36)
          .substring(2, 6)}`,
        delay: index * staggerDelay,
        offsetX: Math.floor(Math.random() * 40) - 20,
      }));

    setFloatingViewers(viewersToFloat);

    // Cálculo dinámico para esperar a que la última burbuja complete su ciclo de animación
    const totalDuration =
      (viewersToFloat.length - 1) * staggerDelay + animDuration;

    const cleanupTimer = setTimeout(() => {
      setFloatingViewers([]);
    }, totalDuration);

    return () => clearTimeout(cleanupTimer);
  }, [open, currentIndex, currentStory?.id]);

  // Avanzar a la siguiente historia
  const handleNext = useCallback(() => {
    setProgress(0);
    setIsImageLoaded(false);
    setReplyText("");
    setIsTyping(false);
    setFloatingViewers([]);

    if (currentIndex < localStories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
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
    setFloatingViewers([]);
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
            prev.map((s) => (s.id === storyId ? { ...s, isSeen: true } : s)),
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

  // Temporizador Automático con pausa
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

  const isOwner = usuario && usuario.id === storyGroup.userId;

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
          <HeaderViewModal
            storyGroup={storyGroup}
            onClose={onClose}
            fetchStories={fetchStories}
            isOwner={isOwner}
            currentStory={currentStory}
          />
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
              bottom: isOwner ? 70 : 120,
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

        {/* CAPA DE ESPECTADORES FLOTANTES (EFECTO FLY-UP HASTA 40%) */}
        {isOwner && floatingViewers.length > 0 && (
          <ViewersFloating
            floatingViewers={floatingViewers}
            isTyping={isTyping}
          />
        )}

        {/* CONTEO DE VISTAS ESTÁTICO ESTILO TIKTOK */}
        {isOwner && <ViewersCounter currentStory={currentStory} />}

        {/* BARRA INFERIOR DE RESPUESTAS (Oculta si es el propietario) */}
        {!isOwner && (
          <BarAnswers
            QUICK_REACTIONS={QUICK_REACTIONS}
            setIsTyping={setIsTyping}
            replyText={replyText}
            handleSendReply={handleSendReply}
            setReplyText={setReplyText}
          />
        )}

        {/* ZONAS TÁCTILES */}
        <Box
          onClick={handlePrev}
          sx={{
            position: "absolute",
            top: 0,
            bottom: isOwner ? 60 : 120,
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
            bottom: isOwner ? 60 : 120,
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
