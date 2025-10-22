import React, { useState } from "react";
import {
  IconButton,
  Typography,
  Stack,
  Popper,
  Paper,
  Box,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
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

const ReactionButtonsFB = ({ target }) => {
  const [selectedReaction, setSelectedReaction] = useState(
    target.userReaction || null
  );
  const [counts, setCounts] = useState(target.reactions || {});
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  // Abrir menú de reacciones
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  // Cerrar menú
  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  // Seleccionar reacción
  const handleSelectReaction = (type) => {
    const prevType = selectedReaction;

    if (prevType) {
      setCounts((prev) => ({
        ...prev,
        [prevType]: prev[prevType] - 1,
      }));
    }

    setSelectedReaction(type);

    setCounts((prev) => ({
      ...prev,
      [type]: (prev[type] || 0) + 1,
    }));

    handleCloseMenu();
  };

  return (
    <Stack direction='row' spacing={1} alignItems='center'>
      {/* Botón principal */}
      <IconButton
        size='small'
        onMouseEnter={handleOpenMenu}
        onClick={handleOpenMenu} // click para móviles
        sx={{
          color: selectedReaction
            ? reactionTypes.find((r) => r.name === selectedReaction).color
            : "inherit",
          transition: "color 0.2s",
        }}
      >
        {selectedReaction ? (
          reactionTypes.find((r) => r.name === selectedReaction).icon
        ) : (
          <ThumbUpIcon fontSize='small' />
        )}
        {selectedReaction && (
          <Typography variant='caption' sx={{ ml: 0.5 }}>
            {counts[selectedReaction]}
          </Typography>
        )}
      </IconButton>

      {/* Popper animado */}
      <Popper
        open={openMenu}
        anchorEl={anchorEl}
        placement='top'
        sx={{ zIndex: 1000 }}
      >
        <AnimatePresence>
          {openMenu && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <Paper
                sx={{
                  display: "flex",
                  p: 1,
                  borderRadius: 4,
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  gap: 1,
                }}
              >
                {reactionTypes.map((r) => (
                  <motion.div
                    key={r.name}
                    whileHover={{ scale: 1.4 }}
                    whileTap={{ scale: 1.2 }}
                  >
                    <IconButton
                      size='small'
                      onClick={() => handleSelectReaction(r.name)}
                      sx={{ color: r.color }}
                    >
                      {r.icon}
                    </IconButton>
                  </motion.div>
                ))}
              </Paper>
            </motion.div>
          )}
        </AnimatePresence>
      </Popper>

      {/* Contadores de todas las reacciones */}
      <Stack direction='row' spacing={0.5}>
        {reactionTypes.map((r) =>
          counts[r.name] > 0 ? (
            <Box
              key={r.name}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.3,
              }}
            >
              {r.icon}
              <Typography variant='caption'>{counts[r.name]}</Typography>
            </Box>
          ) : null
        )}
      </Stack>
    </Stack>
  );
};

export default ReactionButtonsFB;
