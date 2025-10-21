import React, { useState } from "react";
import { IconButton, Tooltip, Typography, Stack } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";

const reactionTypes = [
  { name: "like", icon: <ThumbUpIcon fontSize='small' />, color: "#1976d2" },
  { name: "love", icon: <FavoriteIcon fontSize='small' />, color: "#e91e63" },
  {
    name: "funny",
    icon: <SentimentSatisfiedAltIcon fontSize='small' />,
    color: "#ff9800",
  },
];

const ReactionButtons = ({ target }) => {
  const [reactions, setReactions] = useState(target.reactions || {});

  const handleReaction = (type) => {
    setReactions((prev) => ({
      ...prev,
      [type]: (prev[type] || 0) + 1,
    }));
  };

  return (
    <Stack direction='row' spacing={1} alignItems='center'>
      {reactionTypes.map((r) => (
        <Tooltip key={r.name} title={r.name}>
          <IconButton
            size='small'
            onClick={() => handleReaction(r.name)}
            sx={{ color: r.color }}
          >
            {r.icon}
            {reactions[r.name] > 0 && (
              <Typography variant='caption' sx={{ ml: 0.5 }}>
                {reactions[r.name]}
              </Typography>
            )}
          </IconButton>
        </Tooltip>
      ))}
    </Stack>
  );
};

export default ReactionButtons;
