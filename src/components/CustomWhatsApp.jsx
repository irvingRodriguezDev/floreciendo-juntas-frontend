import { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  Avatar,
  Fade,
  Zoom,
  Divider,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const PremiumWhatsApp = ({
  contacts = [
    {
      name: "Alondra",
      phone: "+525514960787",
      avatar: "https://floreciendojuntas.com/foto.png",
    },
    {
      name: "Viridiana",
      phone: "+527221334367",
      avatar: "https://floreciendojuntas.com/foto.png",
    },
  ],
  accountName = "Equipo de Soporte",
  bottom = 110,
}) => {
  const [open, setOpen] = useState(false);
  const defaultMessage =
    "Hola, Tengo dudas sobre la plataforma de Floreciendo juntas";

  // Validar horario (Lunes a Sábado 9 AM - 5 PM)
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const isOpen = day >= 1 && day <= 6 && hour >= 9 && hour < 17;

  const handleContact = (phone) => {
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(url, "_blank");
  };

  return (
    <>
      {/* 🔘 BOTÓN FLOTANTE */}
      <Box sx={{ position: "fixed", bottom: bottom, right: 20, zIndex: 999 }}>
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
            boxShadow: "0 15px 35px rgba(0,0,0,.35)",
            transition: "all .3s ease",
            "&:hover": { transform: "scale(1.08)" },
          }}
        >
          <WhatsAppIcon sx={{ fontSize: 30 }} />
        </IconButton>
      </Box>

      {/* 💬 POPUP DE SELECCIÓN */}
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
              "linear-gradient(145deg, rgba(255,255,255,.85), rgba(255,255,255,.65))",
            boxShadow: "0 30px 60px rgba(0,0,0,.25)",
            border: "1px solid rgba(255,255,255,.4)",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              background: "linear-gradient(135deg,#E53888,#ff6fa5)",
              p: 2,
              color: "#fff",
            }}
          >
            <Typography fontWeight={600} fontSize={16}>
              {accountName}
            </Typography>
            <Typography variant='caption' display='block'>
              {isOpen ? "🟢 Disponible ahora" : "🔴 Fuera de horario"}
            </Typography>
            <Typography variant='caption' sx={{ opacity: 0.8 }}>
              Lunes a Sábado 9AM – 5PM
            </Typography>
          </Box>

          {/* Body */}
          <Box sx={{ p: 2 }}>
            <Box
              sx={{
                backgroundColor: "#fff",
                p: 1.5,
                borderRadius: "16px",
                boxShadow: "0 5px 15px rgba(0,0,0,.08)",
                fontSize: 13,
                mb: 2,
                color: "#333",
              }}
            >
              Hola 👋🏻 Elige a qué asesora deseas escribirle hoy:
            </Box>

            {/* Listado de Asesoras */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {contacts.map((contact, index) => (
                <Zoom
                  in={open}
                  key={index}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Box
                    onClick={() => isOpen && handleContact(contact.phone)}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      p: 1.2,
                      borderRadius: "14px",
                      background: isOpen ? "#fff" : "#f5f5f5",
                      cursor: isOpen ? "pointer" : "default",
                      pointerEvents: isOpen ? "auto" : "none",
                      opacity: isOpen ? 1 : 0.6,
                      boxShadow: "0 4px 12px rgba(0,0,0,.05)",
                      transition: "all .2s ease",
                      border: "1px solid rgba(229, 56, 136, 0.15)",
                      "&:hover": isOpen
                        ? {
                            transform: "translateY(-2px)",
                            borderColor: "#E53888",
                            boxShadow: "0 6px 15px rgba(229, 56, 136, 0.15)",
                          }
                        : {},
                    }}
                  >
                    <Avatar
                      src={contact.avatar}
                      sx={{ width: 40, height: 40 }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography fontWeight={600} fontSize={14} color='#333'>
                        {contact.name}
                      </Typography>
                      <Typography variant='caption' color='text.secondary'>
                        Asesora Floreciendo Juntas
                      </Typography>
                    </Box>
                    <WhatsAppIcon sx={{ color: "#25D366", fontSize: 22 }} />
                  </Box>
                </Zoom>
              ))}
            </Box>
          </Box>
        </Box>
      </Fade>
    </>
  );
};

export default PremiumWhatsApp;
