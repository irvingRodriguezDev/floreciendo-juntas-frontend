import React, { useContext, useEffect, useState } from "react";
import { Paper, Stack, Skeleton, Box } from "@mui/material";
import StoriesAvatar from "../../components/Stories/StoriesAvatar";
import MethodGet from "../../config/Service";
import StoryViewerModal from "../../components/Stories/StoryViewerModal";
import UploadStoryModal from "../../components/Stories/UploadStoryModal";
import AuthContext from "../../context/Auth/AuthContext";

const LIGHT_PINK = "#FFF0F6";
const BORDER_PINK = "#FCE4EC";

const Stories = () => {
  const { usuario } = useContext(AuthContext);
  const currentUser = usuario;
  const [storiesFeed, setStoriesFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const fetchStories = async () => {
    try {
      const res = await MethodGet("/stories/feed");
      setStoriesFeed(res.data || []);
    } catch (error) {
      console.error("Error al traer el feed de historias:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchStories();
  }, []);

  const handleSelectStoryGroup = (group) => {
    setSelectedGroup(group);
    setIsViewerOpen(true);
  };
  const handleStoryViewed = (userId, storyId) => {
    setStoriesFeed((prevFeed) =>
      prevFeed.map((group) => {
        if (group.userId === userId) {
          const updatedStories = group.stories.map((s) =>
            s.id === storyId ? { ...s, isSeen: true } : s
          );
          const hasUnseen = updatedStories.some((s) => !s.isSeen);
          return { ...group, stories: updatedStories, hasUnseen };
        }
        return group;
      })
    );
  };

  // 2. Marca todo el grupo como visto al finalizar
  const handleAllStoriesViewed = (userId) => {
    setStoriesFeed((prevFeed) =>
      prevFeed.map((group) => {
        if (group.userId === userId) {
          const updatedStories = group.stories.map((s) => ({
            ...s,
            isSeen: true,
          }));
          return { ...group, stories: updatedStories, hasUnseen: false };
        }
        return group;
      })
    );
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: "20px",
        background: `linear-gradient(135deg, #FFFFFF 0%, ${LIGHT_PINK} 100%)`,
        border: `1px solid ${BORDER_PINK}`,
        boxShadow: "0px 8px 20px rgba(215, 46, 121, 0.08)",
        mb: 3,
      }}
    >
      <Stack
        direction='row'
        alignItems='center'
        spacing={2}
        sx={{
          overflowX: "auto",
          py: 0.5,
          // Custom Scrollbar estilizada y sutil
          "&::-webkit-scrollbar": { height: 4 },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#F48FB1",
            borderRadius: 4,
          },
          "&::-webkit-scrollbar-track": { backgroundColor: "transparent" },
          // Scroll suave en móviles (iOS/Android)
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* 1. Botón fijo en 1ª Posición: "Tu diseño / Subir" */}
        <StoriesAvatar
          isAddButton
          story={{
            userName: currentUser?.name?.charAt(0)?.toUpperCase(),
            profileimage: currentUser?.profileImage,
          }}
          onClick={() => setIsUploadOpen(true)}
        />

        {/* 2. Skeletons durante el estado de carga */}
        {loading
          ? Array.from(new Array(4)).map((_, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Skeleton variant='circular' width={60} height={60} />
                <Skeleton
                  variant='text'
                  width={50}
                  height={15}
                  sx={{ mt: 1 }}
                />
              </Box>
            ))
          : /* 3. Lista de historias activas de las usuarias */
            storiesFeed.map((group) => (
              <StoriesAvatar
                key={group.userId}
                story={group}
                onClick={() => handleSelectStoryGroup(group)}
              />
            ))}
      </Stack>
      <UploadStoryModal
        open={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onStoryUploaded={fetchStories} // Vuelve a cargar el feed cuando publica exitosamente
      />
      <StoryViewerModal
        open={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        storyGroup={selectedGroup}
        onStoryViewed={handleStoryViewed}
        onAllStoriesViewed={handleAllStoriesViewed}
        fetchStories={fetchStories}
      />
    </Paper>
  );
};

export default Stories;
