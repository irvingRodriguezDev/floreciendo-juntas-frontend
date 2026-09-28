import { Avatar, AvatarGroup, Box, Typography } from "@mui/material";
import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";

const ViewersCounter = ({ currentStory }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 20,
        left: 16,
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        gap: 1.2,
        background: "rgba(0, 0, 0, 0.55)",
        backdropFilter: "blur(8px)",
        borderRadius: "30px",
        px: 1.5,
        py: 0.8,
        border: "1px solid rgba(255, 255, 255, 0.15)",
      }}
    >
      {/* Pila de Avatares (Viewers) */}
      {currentStory.viewers && currentStory.viewers.length > 0 && (
        <AvatarGroup
          max={3}
          sx={{
            "& .MuiAvatar-root": {
              width: 22,
              height: 22,
              fontSize: "10px",
              border: "1.5px solid #000",
            },
          }}
        >
          {currentStory.viewers.map((viewer) => (
            <Avatar
              key={viewer.id || viewer.name}
              src={viewer.profileImage}
              alt={viewer.name}
            >
              {viewer.name?.charAt(0)}
            </Avatar>
          ))}
        </AvatarGroup>
      )}

      {/* Total de Vistas */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <VisibilityIcon sx={{ color: "#E53888", fontSize: "18px" }} />
        <Typography
          variant='caption'
          sx={{ color: "white", fontWeight: 600, fontSize: "13px" }}
        >
          {currentStory.viewsCount || 0}{" "}
          <span style={{ opacity: 0.8, fontWeight: 400 }}>
            {currentStory.viewsCount === 1 ? "vista" : "vistas"}
          </span>
        </Typography>
      </Box>
    </Box>
  );
};

export default ViewersCounter;
