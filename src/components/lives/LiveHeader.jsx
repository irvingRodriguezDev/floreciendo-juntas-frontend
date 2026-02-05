import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const LiveHeader = ({ live }) => {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      textAlign='center'
      mb={{ xs: 3, md: 6 }}
    >
      <Typography
        sx={{
          fontWeight: 700,
          color: "#C85A8E",
          fontSize:
            live.status === "live" ? { xs: 22, md: 32 } : { xs: 28, md: 42 },
        }}
      >
        {live.title}
      </Typography>
    </MotionBox>
  );
};

export default LiveHeader;
