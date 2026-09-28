import React, { useEffect, useState } from "react";
import { Box, Typography, Avatar, Chip, Stack } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import MethodGet from "../../config/Service";

const LatestWinners = () => {
  const [winners, setWinners] = useState([]);
  const [fullMonth, setFullMonth] = useState();
  useEffect(() => {
    // 🐛 FIX BUG DE FECHA: En JS, getMonth() devuelve 0-11.
    // Para el mes actual se debe sumar +1.
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth()).padStart(2, "0");
    hoy.setMonth(hoy.getMonth() - 1);
    setFullMonth(hoy.toLocaleString("es-mx", { month: "long" }));

    const formatoFinal = `${anio}-${mes}`;
    console.log(formatoFinal);

    let url = `/admin/user-winners-current-month?month=${formatoFinal}`;
    MethodGet(url)
      .then((res) => {
        setWinners(res.data.winners || []);
      })
      .catch((error) => {
        console.log(error, "ocurrió un error al obtener la lista de ganadores");
      });
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        background: `
          linear-gradient(135deg, #E53888 0%, #B82E6B 100%),
          radial-gradient(circle at top right, rgba(255, 255, 255, 0.2), transparent 60%)
        `,
        borderRadius: "32px",
        py: { xs: 6, md: 8 },
        px: { xs: 0, sm: 2 },
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 20px 50px -10px rgba(229, 56, 136, 0.35)",
      }}
    >
      {/* 💧 TEXTO DE FONDO (MARCA DE AGUA) */}
      <Typography
        variant='h1'
        sx={{
          position: "absolute",
          top: { xs: "75px", sm: "70px", md: "60px" },
          left: "50%",
          transform: "translateX(-50%)",
          fontWeight: 900,
          color: "rgba(255, 255, 255, 0.098)",
          fontSize: {
            xs: "4.5rem",
            sm: "5.5rem",
            md: "7rem",
            lg: "9rem",
            xl: "10rem",
          },
          lineHeight: 1,
          whiteSpace: "nowrap",
          zIndex: 0,
          pointerEvents: "none",
          textTransform: "uppercase",
          letterSpacing: "-4px",
        }}
      >
        GANADORAS
      </Typography>

      {/* CONTENEDOR PRINCIPAL */}
      <Box sx={{ position: "relative", zIndex: 1 }}>
        {/* 🌸 CABECERA EDITORIAL */}
        <Stack
          alignItems='center'
          sx={{ mb: { xs: 4, md: 5 }, px: 2, textAlign: "center" }}
          component={motion.div}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Chip
            icon={
              <EmojiEventsIcon
                sx={{ color: "#FFD700 !important", fontSize: "18px" }}
              />
            }
            label='COMUNIDAD FLORECIENDO JUNTAS'
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.18)",
              color: "#FFFFFF",
              fontWeight: 800,
              fontSize: "0.75rem",
              letterSpacing: "2px",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              mb: 2,
              px: 1,
            }}
          />

          <Typography
            variant='h3'
            component='h2'
            sx={{
              fontWeight: 900,
              color: "#FFFFFF",
              lineHeight: 1.15,
              fontSize: { xs: "2.1rem", sm: "2.8rem", md: "3.4rem" },
              letterSpacing: "-1px",
              textShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            🎉 Sorteo Mes de {fullMonth}
          </Typography>

          <Typography
            variant='body1'
            sx={{
              color: "rgba(255, 255, 255, 0.9)",
              mt: 1,
              fontWeight: 500,
              fontSize: { xs: "0.9rem", sm: "1rem" },
              maxWidth: "600px",
            }}
          >
            ¡Mantén tu membresía activa por $200/mes y sé la próxima en ganar!
          </Typography>
        </Stack>

        {/* 🎠 MARQUEE CONTINUO PREMIUM */}
        {winners.length > 0 ? (
          <Marquee speed={40} pauseOnHover={true} gradient={false}>
            {winners.map((win, index) => (
              <Box
                key={win.id || index}
                sx={{
                  minWidth: "280px",
                  maxWidth: "300px",
                  backgroundColor: "rgba(255, 255, 255, 0.92)",
                  backdropFilter: "blur(16px)",
                  borderRadius: "24px",
                  padding: "18px 20px",
                  margin: "10px 12px",
                  border: "1px solid rgba(255, 255, 255, 0.9)",
                  boxShadow: "0 12px 30px rgba(0, 0, 0, 0.12)",
                  transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                  "&:hover": {
                    transform: "translateY(-6px) scale(1.02)",
                    backgroundColor: "#FFFFFF",
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                <Stack direction='row' spacing={2} alignItems='center'>
                  {/* AVATAR DE IMPACTO CON BORDE DORADO/MAGENTA */}
                  <Avatar
                    src={win.user?.profileImageUrl}
                    alt={win.user?.name}
                    sx={{
                      width: 58,
                      height: 58,
                      border: "3px solid #E53888",
                      boxShadow: "0 4px 14px rgba(229, 56, 136, 0.3)",
                      flexShrink: 0,
                    }}
                  />

                  {/* INFORMACIÓN DE LA GANADORA */}
                  <Box sx={{ overflow: "hidden", width: "100%" }}>
                    <Typography
                      variant='subtitle1'
                      sx={{
                        fontWeight: 800,
                        color: "#1F2937",
                        lineHeight: 1.2,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: "0.98rem",
                      }}
                    >
                      {win.user?.name || "Usuaria VIP"}
                    </Typography>

                    <Typography
                      variant='caption'
                      sx={{
                        color: "#4B5563",
                        display: "block",
                        fontWeight: 600,
                        mt: 0.4,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      🏆 Premio: {win.prize?.name || "Kit Wapizima"}
                    </Typography>

                    <Chip
                      label='Ganadora Oficial'
                      size='small'
                      sx={{
                        height: "20px",
                        fontSize: "0.65rem",
                        backgroundColor: "rgba(229, 56, 136, 0.1)",
                        color: "#E53888",
                        fontWeight: 800,
                        letterSpacing: "0.5px",
                        mt: 1,
                        border: "1px solid rgba(229, 56, 136, 0.2)",
                      }}
                    />
                  </Box>
                </Stack>
              </Box>
            ))}
          </Marquee>
        ) : (
          <Typography
            variant='body2'
            sx={{
              textAlign: "center",
              color: "rgba(255, 255, 255, 0.8)",
              py: 2,
              fontStyle: "italic",
            }}
          >
            Cargando lista de ganadoras...
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default LatestWinners;
