import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext,
} from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import { MethodPost } from "../../config/Service";
import AuthContext from "../../context/Auth/AuthContext";
import HeaderViewModal from "./HeaderViewModal";
import ViewersFloating from "./ViewersFloating";
import ViewersCounter from "./ViewersCounter";
import BarAnswers from "./BarAnswers";
import StoriesContext from "../../context/stories/StoriesContext";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
const STORY_DURATION = 7000;
const QUICK_REACTIONS = ["❤️", "🌸", "😍", "👏", "😮"];

const StoryViewerModal = ({ open, onClose, storyGroup, fetchStories }) => {
  const { usuario } = useContext(AuthContext);

  // 2. Traer métodos del StoriesContext
  const { markStoriAsViwed, markAllStoriesAsViewed } =
    useContext(StoriesContext);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const [replyText, setReplyText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [floatingViewers, setFloatingViewers] = useState([]);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const viewedStoriesRef = useRef(new Set());

  // Historias tomadas directamente de la prop o un array vacío por seguridad
  const stories = storyGroup?.stories || [];
  const currentStory = stories[currentIndex];

  // Reiniciar visor al abrir o cambiar de grupo
  useEffect(() => {
    if (open && storyGroup) {
      setCurrentIndex(0);
      setProgress(0);
      setIsImageLoaded(false);
      setReplyText("");
      setIsTyping(false);
      setFloatingViewers([]);
      viewedStoriesRef.current.clear();
    }
  }, [open, storyGroup]);

  // Burbujas flotantes
  useEffect(() => {
    if (!open || !currentStory?.viewers?.length) {
      setFloatingViewers([]);
      return;
    }

    const maxViewers = 13;
    const staggerDelay = 400;
    const animDuration = 2400;

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

    if (currentIndex < stories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // 3. Marcar todo el grupo como visto en el Context al llegar al final
      if (storyGroup?.userId) {
        markAllStoriesAsViewed(storyGroup.userId);
      }
      onClose();
    }
  }, [
    currentIndex,
    stories.length,
    storyGroup?.userId,
    markAllStoriesAsViewed,
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

  // 4. Registrar Vista individual utilizando el Context
  useEffect(() => {
    if (!open || !currentStory) return;

    const storyId = currentStory.id;

    if (!currentStory.isSeen && !viewedStoriesRef.current.has(storyId)) {
      viewedStoriesRef.current.add(storyId);

      MethodPost(`/stories/${storyId}/view`)
        .then(() => {
          // Actualiza el Reducer global de forma optimista
          markStoriAsViwed(storyId, storyGroup.userId);
        })
        .catch((err) => {
          console.error("Error al registrar vista:", err);
          viewedStoriesRef.current.delete(storyId);
        });
    }
  }, [open, currentIndex, currentStory, storyGroup?.userId, markStoriAsViwed]);

  // Temporizador Automático
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
  const isVideo =
    currentStory?.type === "video" ||
    /\.(mp4|mov|webm)$/i.test(currentStory?.mediaUrl);
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
          {stories.map((s, index) => {
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
        {/* CONTENEDOR DE IMAGEN CON FONDO DIFUMINADO */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            bgcolor: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* 1. Imagen de Fondo (Crea el efecto Blur/Ambiental) */}
          <Box
            component='img'
            key={`bg-${currentStory.id || currentStory.mediaUrl}`}
            src={currentStory.mediaUrl}
            alt='Background blur'
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "blur(20px) brightness(0.6)",
              transform: "scale(1.1)", // Evita bordes blancos por el blur
              zIndex: 1,
            }}
          />

          {/* 2. Imagen Principal (Se muestra completa sin recortes ni zoom) */}
          {isVideo ? (
            <Box
              component='video'
              ref={videoRef}
              key={currentStory.id || currentStory.mediaUrl}
              src={currentStory.mediaUrl}
              autoPlay
              playsInline
              muted={isMuted}
              onTimeUpdate={(e) => {
                const { currentTime, duration } = e.target;
                if (duration) setProgress((currentTime / duration) * 100);
              }}
              onEnded={handleNext}
              sx={{
                position: "relative",
                zIndex: 2,
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          ) : (
            <Box
              component='img'
              key={currentStory.id || currentStory.mediaUrl}
              src={currentStory.mediaUrl}
              onLoad={() => setIsImageLoaded(true)}
              sx={{
                position: "relative",
                zIndex: 2,
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          )}
        </Box>
        {isVideo && (
          <IconButton
            onClick={() => setIsMuted(!isMuted)}
            sx={{
              position: "absolute",
              top: 70,
              right: 12,
              zIndex: 12,
              color: "white",
              bgcolor: "rgba(0, 0, 0, 0.5)",
              "&:hover": { bgcolor: "rgba(0, 0, 0, 0.7)" },
            }}
          >
            {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
          </IconButton>
        )}
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

        {/* BUBBLES Y VISTAS */}
        {isOwner && floatingViewers.length > 0 && (
          <ViewersFloating
            floatingViewers={floatingViewers}
            isTyping={isTyping}
          />
        )}

        {isOwner && <ViewersCounter currentStory={currentStory} />}

        {/* RESPUESTAS */}
        {!isOwner && (
          <BarAnswers
            QUICK_REACTIONS={QUICK_REACTIONS}
            setIsTyping={setIsTyping}
            replyText={replyText}
            handleSendReply={handleSendReply}
            setReplyText={setReplyText}
            storyGroup={storyGroup}
            sendingMessage={sendingMessage}
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
