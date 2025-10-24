import React, { useContext, useState, useEffect } from "react";
import { Stack, IconButton, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import { motion } from "framer-motion";
import PostsContext from "../../context/Posts/PostsContext";

const reactionTypes = [
  {
    name: "Me gusta",
    icon: <ThumbUpIcon fontSize='small' />,
    color: "#1976d2",
  },
  {
    name: "Me encanta",
    icon: <FavoriteIcon fontSize='small' />,
    color: "#e91e63",
  },
  {
    name: "Me divierte",
    icon: <SentimentSatisfiedAltIcon fontSize='small' />,
    color: "#ff9800",
  },
];

const ReactionButtons = ({ target }) => {
  const { addReaction } = useContext(PostsContext);

  // Inicializamos estados usando las reacciones del backend
  const initialSummary = target.reactionsSummary?.summary || {};
  const initialUserReaction = target.reactionsSummary?.userReaction || null;

  const [selectedReaction, setSelectedReaction] = useState(initialUserReaction);
  const [counts, setCounts] = useState(initialSummary);

  // Esto asegura que si target cambia (ej: via WebSocket), actualizamos los estados
  useEffect(() => {
    setCounts(target.reactionsSummary?.summary || {});
    setSelectedReaction(target.reactionsSummary?.userReaction || null);
  }, [target.reactionsSummary]);

  const handleSelectReaction = (type) => {
    if (selectedReaction === type) return;

    setCounts((prev) => ({
      ...prev,
      [selectedReaction]: selectedReaction
        ? Math.max(0, (prev[selectedReaction] || 1) - 1)
        : 0,
      [type]: (prev[type] || 0) + 1,
    }));

    setSelectedReaction(type);

    // Llamada a la API para guardar la reacción
    addReaction({ postId: target.id, type });
  };

  return (
    <Stack direction='row' spacing={2} alignItems='center'>
      {reactionTypes.map((r) => {
        const isSelected = selectedReaction === r.name;
        const count = counts[r.name] || 0;

        return (
          <motion.div
            key={r.name}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <Stack direction='row' spacing={0.5} alignItems='center'>
              <IconButton
                size='small'
                onClick={() => handleSelectReaction(r.name)}
                sx={{
                  color: isSelected ? r.color : "inherit",
                  bgcolor: isSelected ? "rgba(0,0,0,0.05)" : "transparent",
                  "&:hover": { bgcolor: "rgba(0,0,0,0.08)" },
                  borderRadius: "8px",
                  transition: "all 0.2s",
                }}
              >
                {r.icon}
              </IconButton>
              {count > 0 && (
                <Typography
                  variant='caption'
                  sx={{ fontWeight: isSelected ? 600 : 400 }}
                >
                  {count}
                </Typography>
              )}
            </Stack>
          </motion.div>
        );
      })}
    </Stack>
  );
};

export default ReactionButtons;
