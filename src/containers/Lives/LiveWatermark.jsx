import { Box, Typography } from "@mui/material";

const LiveWatermark = ({ text }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 12,
        right: 16,
        opacity: 0.6,
        pointerEvents: "none",
        zIndex: 4,
      }}
    >
      <Typography
        sx={{
          fontSize: 12,
          color: "#fff",
          fontWeight: 500,
          textShadow: "0 1px 3px rgba(0,0,0,0.6)",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default LiveWatermark;
