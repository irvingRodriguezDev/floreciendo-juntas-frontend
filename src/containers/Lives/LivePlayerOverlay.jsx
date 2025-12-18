import { Box, Typography, CircularProgress } from "@mui/material";

const LivePlayerOverlay = ({ status, message }) => {
  return (
    <Box
      sx={{
        inset: 0,
        zIndex: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(6px)",
        borderRadius: 2,
        color: "#fff",
        textAlign: "center",
        px: 2,
      }}
    >
      {status === "loading" && <CircularProgress color='inherit' />}
      <Typography sx={{ mt: 2, fontSize: 16, fontWeight: 500 }}>
        {message}
      </Typography>
    </Box>
  );
};

export default LivePlayerOverlay;
