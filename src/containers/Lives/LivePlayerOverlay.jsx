import { Box, Typography, CircularProgress, Fade } from "@mui/material";

const LivePlayerOverlay = ({ status, message }) => (
  <Box
    sx={{
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      bgcolor: "rgba(0,0,0,0.7)",
      backdropFilter: "blur(8px)",
      color: "#fff",
      zIndex: 10,
    }}
  >
    <Fade in={status === "loading"}>
      <CircularProgress color='inherit' size={50} thickness={2} />
    </Fade>
    <Typography
      sx={{
        mt: 3,
        fontSize: 14,
        fontWeight: 300,
        letterSpacing: 1,
        textTransform: "uppercase",
      }}
    >
      {message}
    </Typography>
  </Box>
);

export default LivePlayerOverlay;
