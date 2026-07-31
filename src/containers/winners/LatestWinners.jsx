import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import FormatDate from "../../utils/FormatDate";
import MethodGet from "../../config/Service";
import Marquee from "react-fast-marquee";
import { Avatar, Box, Card, CardContent, Chip, Stack } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
const LatestWinners = () => {
  const hoy = new Date();

  const anio = hoy.getFullYear();
  const mes = String(hoy.getMonth()).padStart(2, "0");
  const formatoFinal = `${anio}-${mes}`;

  const [winners, setWinners] = useState([]);
  useEffect(() => {
    let url = `/admin/user-winners-current-month?month=${formatoFinal}`;
    MethodGet(url)
      .then((res) => {
        setWinners(res.data.winners);
      })
      .catch((error) => {
        console.log(error, "ocurrio un error al obtener la lista de ganadores");
      });
  }, []);

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #F971AF 0%, #E83E8C 100%)",
        borderRadius: "20px",
        padding: { xs: "20px 0px", md: "30px 0px" },
        boxShadow: "0px 10px 30px rgba(249, 113, 175, 0.3)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Encabezado Principal */}
      <Box textAlign='center' mb={3}>
        <Chip
          icon={<EmojiEventsIcon sx={{ color: "#FFD700 !important" }} />}
          label='COMUNIDAD FLORECIENDO JUNTAS'
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            color: "#FFF",
            fontWeight: "bold",
            fontSize: "0.75rem",
            letterSpacing: "1px",
            backdropFilter: "blur(5px)",
            mb: 1,
          }}
        />
        <Typography
          variant='h4'
          sx={{
            color: "#FFF",
            fontWeight: 800,
            fontSize: { xs: "1.5rem", md: "2rem" },
            textShadow: "0px 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          🎉 Ganadoras del Sorteo Pasado
        </Typography>
        <Typography
          variant='body2'
          fontFamily='monospace'
          sx={{ color: "rgba(255, 255, 255, 0.9)", mt: 0.5 }}
        >
          ¡Mantén tu membresía activa por $200/mes y sé la próxima en ganar!
        </Typography>
      </Box>

      {/* Marquee Continuo */}
      <Marquee speed={45} pauseOnHover={true} gradient={false}>
        {winners.map((win, index) => (
          <Box
            key={win.id || index}
            sx={{
              minWidth: "260px",
              maxWidth: "280px",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              borderRadius: "16px",
              padding: "16px",
              margin: "0 12px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
              border: "1px solid rgba(255, 255, 255, 0.6)",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
              },
            }}
          >
            <Stack direction='row' spacing={2} alignItems='center'>
              {/* Avatar con borde destacado */}
              <Avatar
                src={win.user?.profileImageUrl}
                alt={win.user?.name}
                sx={{
                  width: 56,
                  height: 56,
                  border: "3px solid #F971AF",
                  boxShadow: "0 4px 10px rgba(249, 113, 175, 0.3)",
                }}
              />

              {/* Información de la Ganadora */}
              <Box sx={{ overflow: "hidden" }}>
                <Typography
                  variant='subtitle1'
                  sx={{
                    fontWeight: "bold",
                    color: "#2C2C2C",
                    lineHeight: 1.2,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {win.user?.name || "Usuaria VIP"}
                </Typography>

                <Typography
                  variant='caption'
                  sx={{
                    color: "#666",
                    display: "block",
                    fontWeight: 500,
                    mt: 0.3,
                  }}
                >
                  🏆 Premio: {win.prize?.name || "Kit Wapizima"}
                </Typography>

                <Chip
                  label='Ganadora Oficial'
                  size='small'
                  sx={{
                    height: "18px",
                    fontSize: "0.65rem",
                    backgroundColor: "#FFF0F5",
                    color: "#E83E8C",
                    fontWeight: "bold",
                    mt: 0.8,
                  }}
                />
              </Box>
            </Stack>
          </Box>
        ))}
      </Marquee>
    </Box>
  );
};

export default LatestWinners;
