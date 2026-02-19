import { useState } from "react";
import { Box, IconButton, Typography, Avatar, Fade, Zoom } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const PremiumWhatsApp = ({
  phoneNumber,
  accountName,
  avatar,
  bottom = 110,
}) => {
  const [open, setOpen] = useState(false);

  const defaultMessage =
    "Hola, Tengo dudas sobre la plataforma de Floreciendo juntas";

  const handleSend = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      defaultMessage,
    )}`;
    window.open(url, "_blank");
  };

  return (
    <>
      {/* 🔘 BOTÓN FLOTANTE */}
      <Box
        sx={{
          position: "fixed",
          bottom: bottom,
          right: 20,
          zIndex: 999,
        }}
      >
        {/* Pulso animado */}
        <Box
          sx={{
            position: "absolute",
            width: 50,
            height: 50,
            borderRadius: "50%",
            backgroundColor: "rgba(37,211,102,.3)",
            animation: "pulse 2s infinite",
            "@keyframes pulse": {
              "0%": { transform: "scale(1)", opacity: 0.7 },
              "70%": { transform: "scale(1.5)", opacity: 0 },
              "100%": { opacity: 0 },
            },
          }}
        />

        <IconButton
          onClick={() => setOpen(!open)}
          sx={{
            width: 50,
            height: 50,
            background: "linear-gradient(135deg,#25D366 0%,#1ebe5d 100%)",
            color: "#fff",
            backdropFilter: "blur(10px)",
            boxShadow: "0 15px 35px rgba(0,0,0,.35)",
            transition: "all .3s ease",
            "&:hover": {
              transform: "scale(1.08)",
            },
          }}
        >
          <WhatsAppIcon sx={{ fontSize: 30 }} />
        </IconButton>
      </Box>

      {/* 💬 POPUP PREMIUM */}
      <Fade in={open}>
        <Box
          sx={{
            position: "fixed",
            bottom: bottom + 90,
            right: 20,
            width: 320,
            borderRadius: "24px",
            overflow: "hidden",
            zIndex: 999,
            backdropFilter: "blur(20px)",
            background:
              "linear-gradient(145deg, rgba(255,255,255,.65), rgba(255,255,255,.35))",
            boxShadow: "0 30px 60px rgba(0,0,0,.25)",
            border: "1px solid rgba(255,255,255,.4)",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              background: "linear-gradient(135deg,#E53888,#ff6fa5)",
              p: 2,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              color: "#fff",
            }}
          >
            <Box sx={{ position: "relative" }}>
              <Avatar src={avatar} />
              {/* Indicador online */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: "#4caf50",
                  border: "2px solid white",
                }}
              />
            </Box>

            <Box>
              <Typography fontWeight={600}>{accountName}</Typography>
              <Typography variant='caption'>
                En línea • Responde en minutos
              </Typography>
            </Box>
          </Box>

          {/* Body tipo burbuja */}
          <Box sx={{ p: 2 }}>
            <Box
              sx={{
                backgroundColor: "#fff",
                p: 1.5,
                borderRadius: "16px",
                boxShadow: "0 5px 15px rgba(0,0,0,.08)",
                fontSize: 14,
                mb: 2,
              }}
            >
              Hola 👋🏻
              <br />
              ¿En qué podemos ayudarte hoy?
            </Box>

            <Zoom in={open}>
              <Box
                onClick={handleSend}
                sx={{
                  background: "linear-gradient(135deg,#25D366,#1ebe5d)",
                  color: "#fff",
                  textAlign: "center",
                  py: 1.4,
                  borderRadius: "14px",
                  cursor: "pointer",
                  fontWeight: 600,
                  transition: "all .25s ease",
                  boxShadow: "0 10px 25px rgba(37,211,102,.4)",
                  "&:hover": {
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Continuar en WhatsApp
              </Box>
            </Zoom>
          </Box>
        </Box>
      </Fade>
    </>
  );
};

export default PremiumWhatsApp;
