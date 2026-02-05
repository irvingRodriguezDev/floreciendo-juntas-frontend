import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

const LiveCommentItem = ({ user, message }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
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
          {user}
        </Typography>

        <Typography
          sx={{
            fontSize: "0.85rem",
            color: "rgba(255,255,255,0.95)",
            wordBreak: "break-word",
          }}
        >
          {message}
        </Typography>
      </Box>
    </motion.div>
  );
};

export default React.memo(LiveCommentItem);
