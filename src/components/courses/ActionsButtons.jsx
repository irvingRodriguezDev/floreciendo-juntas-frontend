import { IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import React from "react";

const ActionsButtonsCourse = ({ handlePlayPause, isPlaying }) => {
  return (
    <IconButton
      onClick={handlePlayPause}
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "rgba(255,255,255,0.85)",
        zIndex: 2,
        opacity: isPlaying ? 0 : 1,
        pointerEvents: isPlaying ? "none" : "auto",
        transition: "all 0.3s ease",
        "&:hover": { backgroundColor: "#fff" },
      }}
    >
      {isPlaying ? (
        <PauseIcon sx={{ fontSize: 42, color: "#E53888" }} />
      ) : (
        <PlayArrowIcon sx={{ fontSize: 42, color: "#E53888" }} />
      )}
    </IconButton>
  );
};

export default ActionsButtonsCourse;
