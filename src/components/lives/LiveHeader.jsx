import { Box, Typography, Stack } from "@mui/material";
import { motion } from "framer-motion";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

const MotionBox = motion(Box);

const LiveHeader = ({ live }) => {
  const isLive = live?.status === "live";

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
      sx={{
        textAlign: "center",
        mb: { xs: 4, md: 6 },
        maxWidth: 880,
        mx: "auto",
        px: 2,
      }}
    >
      <Stack alignItems='center' spacing={2}>
        {/* 🏷️ BADGE DINÁMICO (ESTADO DEL LIVE) */}
        <Box
          component={motion.div}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            px: 2.2,
            py: 0.6,
            borderRadius: "50px",
            backgroundColor: isLive
              ? "rgba(220, 38, 38, 0.08)"
              : "rgba(214, 51, 132, 0.08)",
            border: "1px solid",
            borderColor: isLive
              ? "rgba(220, 38, 38, 0.2)"
              : "rgba(214, 51, 132, 0.18)",
            backdropFilter: "blur(8px)",
          }}
        >
          {isLive ? (
            <>
              <RadioButtonCheckedIcon
                sx={{
                  fontSize: 14,
                  color: "#DC2626",
                  animation: "pulse 1.8s infinite",
                  "@keyframes pulse": {
                    "0%": { opacity: 1 },
                    "50%": { opacity: 0.4 },
                    "100%": { opacity: 1 },
                  },
                }}
              />
              <Typography
                sx={{
                  color: "#DC2626",
                  fontWeight: 900,
                  fontSize: { xs: "0.72rem", sm: "0.8rem" },
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                Transmisión En Vivo
              </Typography>
            </>
          ) : (
            <Typography
              sx={{
                color: "#D63384",
                fontWeight: 800,
                fontSize: { xs: "0.72rem", sm: "0.8rem" },
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Proximamente
            </Typography>
          )}
        </Box>

        {/* 👑 TÍTULO PRINCIPAL EDITORIAL */}
        <Typography
          component='h1'
          sx={{
            fontWeight: 900,
            color: "#2C1820",
            lineHeight: { xs: 1.2, md: 1.15 },
            fontSize: isLive
              ? { xs: "1.8rem", sm: "2.5rem", md: "3.2rem" }
              : { xs: "2rem", sm: "2.8rem", md: "3.6rem" },
            letterSpacing: "-0.02em",
            mt: 1,
          }}
        >
          {live?.title}
        </Typography>

        {/* 🌸 LÍNEA DECORATIVA SUTIL */}
        <Box
          component={motion.div}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          sx={{
            width: 60,
            height: 3,
            background: "linear-gradient(90deg, #D63384 0%, #FFB6C1 100%)",
            borderRadius: 10,
            mt: 2,
          }}
        />
      </Stack>
    </MotionBox>
  );
};

export default LiveHeader;
