import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const PremiumBannerBase = ({ title, subtitle, children }) => {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "32px",
        px: { xs: 3, md: 6 },
        py: { xs: 8, md: 12 },
        background: "linear-gradient(135deg, #FFE5EE 0%, #FFF7FA 100%)",
        boxShadow: "0 10px 30px rgba(229,56,136,0.12)",
        textAlign: "center",
      }}
    >
      {/* DECOR */}
      {children}

      {/* CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          sx={{
            fontWeight: 800,
            color: "#C73578",
            fontFamily: "'Poppins', sans-serif",
            fontSize: { xs: "2.1rem", md: "3.2rem" },
            mb: 1,
            position: "relative",
            zIndex: 1,
          }}
        >
          {title}
        </Typography>

        <Box
          sx={{
            width: 64,
            height: 5,
            mx: "auto",
            mb: 3,
            borderRadius: 5,
            background: "linear-gradient(90deg, #E53888, #FFB6D5)",
          }}
        />

        <Typography
          sx={{
            color: "#6A6A6A",
            fontWeight: 400,
            fontSize: { xs: "1.1rem", md: "1.4rem" },
            fontFamily: "'Poppins', sans-serif",
            position: "relative",
            zIndex: 1,
          }}
        >
          {subtitle}
        </Typography>
      </motion.div>
    </Box>
  );
};

export default PremiumBannerBase;
