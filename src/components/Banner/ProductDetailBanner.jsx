import { Box, Typography } from "@mui/material";

const ProductDetailBanner = () => {
  const bannerSubtitle =
    "Da el siguiente paso para construir el salón de tus sueños ✨";

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        overflow: "hidden",
        borderRadius: "24px",
        py: { xs: 8, sm: 10, md: 12 },
        px: { xs: 3, md: 6 },
        textAlign: "center",
        background:
          "linear-gradient(135deg, #ffe0ec 0%, #fff1f8 50%, #ffffff 100%)",
        boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
      }}
    >
      {/* Círculo grande decorativo */}
      <Box
        sx={{
          position: "absolute",
          top: "-80px",
          left: "-80px",
          width: "220px",
          height: "220px",
          borderRadius: "50%",
          background: "rgba(255, 140, 180, 0.15)",
          filter: "blur(10px)",
        }}
      />

      {/* Círculo secundario decorativo */}
      <Box
        sx={{
          position: "absolute",
          bottom: "-60px",
          right: "-60px",
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          background: "rgba(230, 80, 140, 0.12)",
          filter: "blur(8px)",
        }}
      />

      {/* Estrella decorativa */}
      <Box
        sx={{
          position: "absolute",
          top: "20px",
          right: { xs: "10%", md: "15%" },
          fontSize: "2.2rem",
          color: "#e85b9c",
          opacity: 0.45,
          transform: "rotate(10deg)",
        }}
      >
        ✦
      </Box>

      {/* Estrellitas lado izquierdo */}
      <Box
        sx={{
          position: "absolute",
          bottom: "25px",
          left: { xs: "8%", md: "12%" },
          fontSize: "1.7rem",
          color: "#f2a6c7",
          opacity: 0.4,
        }}
      >
        ✧ ✧ ✧
      </Box>

      {/* Texto principal */}
      <Typography
        variant='h3'
        component='h1'
        sx={{
          position: "relative",
          zIndex: 2,
          fontWeight: 800,
          color: "#3c074d",
          fontSize: { xs: "2rem", sm: "2.3rem", md: "2.9rem" },
          textShadow: "0 2px 14px rgba(0,0,0,0.06)",
          maxWidth: "850px",
          mx: "auto",
        }}
      >
        {bannerSubtitle}
      </Typography>

      {/* Línea suave decorativa */}
      <Box
        sx={{
          mt: 2,
          height: "4px",
          width: "90px",
          mx: "auto",
          borderRadius: "6px",
          background: "linear-gradient(90deg, #e84f93, #ff8fb6)",
          boxShadow: "0 2px 10px rgba(232,79,147,0.4)",
        }}
      />
    </Box>
  );
};

export default ProductDetailBanner;
