import React from "react";
import { Box, Paper, Typography, Stack, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const MAIN_PINK = "#D72E79";

const BirthdayBanner = ({ userName, onClose }) => {
  // Primer nombre para mayor cercanía
  const firstName = userName ? userName.split(" ")[0] : "";

  return (
    <Box sx={{ width: "100%", px: { xs: 2, sm: 4 }, mt: 2, mb: 2 }}>
      <Paper
        elevation={0}
        sx={{
          borderRadius: "20px",
          background:
            "linear-gradient(135deg, #FFF0F6 0%, #FCE4EC 50%, #F8BBD0 100%)",
          border: `1.5px solid ${MAIN_PINK}`,
          p: { xs: 2.5, md: 3 },
          position: "relative",
          overflow: "hidden",
          boxShadow: "0px 8px 20px rgba(215, 46, 121, 0.15)",
        }}
      >
        {/* Detalle decorativo de fondo */}
        <Box
          sx={{
            position: "absolute",
            right: -20,
            bottom: -20,
            fontSize: "6rem",
            opacity: 0.15,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          🎁
        </Box>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent='space-between'
          spacing={2}
        >
          <Stack direction='row' spacing={2} alignItems='center'>
            {/* Contenedor del emoji festivo */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "transparent",
                borderRadius: "50%",
                width: 58,
                height: 58,
                fontSize: "1.6rem",
                boxShadow: "0 4px 10px rgba(215, 46, 121, 0.2)",
                flexShrink: 0,
              }}
            >
              🎉
            </Box>

            <Box>
              <Typography
                variant='h6'
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "1.05rem", sm: "1.2rem" },
                  color: MAIN_PINK,
                  lineHeight: 1.2,
                }}
              >
                ¡Feliz cumpleaños, {firstName}! 🎂✨
              </Typography>

              <Typography
                variant='body2'
                sx={{
                  color: "#4A4A4A",
                  lineHeight: 1.4,
                  fontWeight: 500,
                  fontSize: "0.92rem",
                  mt: 0.5,
                }}
              >
                Hoy la comunidad de <b>Floreciendo Juntas</b> celebra tu vida.
                Deseamos que este nuevo año esté lleno de amor, éxito y
                florecimiento continuo.
              </Typography>
            </Box>
          </Stack>

          {/* Botón opcional para cerrar el banner */}
          {onClose && (
            <IconButton
              onClick={onClose}
              size='small'
              sx={{
                color: MAIN_PINK,
                bgcolor: "rgba(255,255,255,0.6)",
                "&:hover": { bgcolor: "#fff" },
                alignSelf: { xs: "flex-end", sm: "center" },
              }}
            >
              <CloseIcon fontSize='small' />
            </IconButton>
          )}
        </Stack>
      </Paper>
    </Box>
  );
};

export default BirthdayBanner;
