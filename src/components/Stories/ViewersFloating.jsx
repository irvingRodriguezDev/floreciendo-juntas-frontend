import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

const ViewersFloating = ({ floatingViewers, isTyping }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 60,
        left: 16,
        zIndex: 9,
        pointerEvents: "none",
      }}
    >
      {floatingViewers.map((viewer) => (
        <Box
          key={viewer.floatId}
          sx={{
            position: "absolute",
            display: "flex",
            alignItems: "center",
            gap: 1,
            background: "rgba(0, 0, 0, 0.65)",
            backdropFilter: "blur(6px)",
            borderRadius: "20px",
            py: 0.5,
            px: 1,
            border: "1px solid rgba(255, 255, 255, 0.2)",
            animation: `floatUp 2.4s ease-out forwards`,
            animationDelay: `${viewer.delay}ms`,
            animationPlayState: isTyping ? "paused" : "running",
            opacity: 0,
            transform: `translateX(${viewer.offsetX}px)`,
            "@keyframes floatUp": {
              "0%": {
                opacity: 0,
                transform: `translateY(0px) translateX(${viewer.offsetX}px) scale(0.8)`,
              },
              "20%": {
                opacity: 1,
                transform: `translateY(-40px) translateX(${viewer.offsetX}px) scale(1)`,
              },
              "80%": {
                opacity: 0.8,
              },
              "100%": {
                opacity: 0,
                transform: `translateY(-280px) translateX(${
                  viewer.offsetX * 1.5
                }px) scale(0.95)`,
              },
            },
          }}
        >
          <Avatar
            src={viewer.profileImage}
            sx={{ width: 22, height: 22, fontSize: "10px" }}
          >
            {viewer.name?.charAt(0)}
          </Avatar>
          <Typography
            variant='caption'
            sx={{
              color: "white",
              fontWeight: 600,
              fontSize: "11px",
              whiteSpace: "nowrap",
            }}
          >
            {viewer.name}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ViewersFloating;
