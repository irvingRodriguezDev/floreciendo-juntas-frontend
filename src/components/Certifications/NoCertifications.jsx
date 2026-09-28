import { Box, Typography } from "@mui/material";

const NoCertifications = () => {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "30vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        px: 3,
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: "26px", md: "32px" },
          fontWeight: 700,
          color: "#D82F7A",
          letterSpacing: 1,
          mb: 2,
        }}
      >
        Por ahora no hay certificaciones disponibles, pero estamos preparando
        algo especial para que sigas creciendo y floreciendo con nosotras. ✨
      </Typography>

      <Typography
        sx={{
          fontSize: { xs: "16px", md: "18px" },
          fontWeight: 400,
          color: "#6A6A6A",
          maxWidth: "600px",
        }}
      >
        Tu crecimiento es nuestra prioridad. Muy pronto tendremos nuevas
        certificaciones disponibles. 🌸
      </Typography>
    </Box>
  );
};

export default NoCertifications;
