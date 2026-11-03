import React, { useEffect, useState } from "react";
import { Box, Typography, Avatar, Chip, Stack, alpha } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import VerifiedIcon from "@mui/icons-material/Verified";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import MethodGet from "../../config/Service";
import NextSorteo from "./NextSorteo";

const LatestWinners = () => {
  const [winners, setWinners] = useState([]);
  const [fullMonth, setFullMonth] = useState("");

  useEffect(() => {
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth()).padStart(2, "0");
    hoy.setMonth(hoy.getMonth() - 1);
    setFullMonth(hoy.toLocaleString("es-mx", { month: "long" }));

    const formatoFinal = `${anio}-${mes}`;

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
    <>
      {winners.length > 0 ? (
        <Box
          sx={{
            width: "100%",
            background: `
              linear-gradient(135deg, #E53888 0%, #C2185B 100%),
              radial-gradient(circle at top right, rgba(255, 255, 255, 0.15), transparent 70%)
            `,
            borderRadius: "32px",
            py: { xs: 5, md: 7 },
            px: { xs: 1, sm: 2 },
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 20px 45px rgba(229, 56, 136, 0.25)",
            border: "1px solid",
            borderColor: alpha("#FFF", 0.2),
          }}
        >
          {/* Círculo decorativo ambiental */}
          <Box
            sx={{
              position: "absolute",
              top: "-20%",
              left: "-10%",
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)",
              pointerEvents: "none",
            }}
          />

          {/* CONTENEDOR PRINCIPAL */}
          <Box sx={{ position: "relative", zIndex: 1 }}>
            {/* 🌸 CABECERA EDITORIAL ELEGANTE */}
            <Stack
              alignItems='center'
              sx={{ mb: { xs: 4, md: 5 }, px: 2, textAlign: "center" }}
              component={motion.div}
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge superior minimalista */}
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  backgroundColor: "rgba(255, 255, 255, 0.18)",
                  backdropFilter: "blur(8px)",
                  color: "#FFF",
                  px: 2.2,
                  py: 0.8,
                  borderRadius: "50px",
                  fontSize: "0.8rem",
                  fontWeight: 800,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  mb: 2,
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                }}
              >
                <EmojiEventsIcon
                  sx={{ color: "#FFD700", fontSize: "1.1rem" }}
                />
                <span>Ganadoras Oficiales</span>
              </Box>

              {/* Título Principal */}
              <Typography
                variant='h3'
                component='h2'
                sx={{
                  fontWeight: 900,
                  color: "#FFFFFF",
                  lineHeight: 1.15,
                  fontSize: { xs: "1.8rem", sm: "2.6rem", md: "3.2rem" },
                  letterSpacing: "-0.02em",
                  textTransform: "uppercase",
                  textShadow: "0 4px 16px rgba(0,0,0,0.15)",
                }}
              >
                Sorteo Mes de{" "}
                <span style={{ color: "#FFD9E2", textTransform: "capitalize" }}>
                  {fullMonth}
                </span>
              </Typography>

              <Typography
                variant='body1'
                sx={{
                  color: "rgba(255, 255, 255, 0.95)",
                  mt: 1.5,
                  fontWeight: 500,
                  fontSize: { xs: "0.95rem", sm: "1.05rem" },
                  maxWidth: "580px",
                }}
              >
                ¡Mantén tu membresía activa por <b>$200 MXN/mes</b> y sé la
                próxima en celebrar! 💗
              </Typography>
            </Stack>

            {/* 🎠 MARQUEE CONTINUO PREMIUM */}
            <Marquee speed={45} pauseOnHover={true} gradient={false}>
              {winners.map((win, index) => (
                <Box
                  key={win.id || index}
                  sx={{
                    minWidth: "280px",
                    maxWidth: "310px",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "20px",
                    padding: "16px 18px",
                    margin: "8px 10px",
                    border: "1px solid",
                    borderColor: alpha("#E53888", 0.15),
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 15px 35px rgba(0, 0, 0, 0.25)",
                    },
                  }}
                >
                  <Stack direction='row' spacing={2} alignItems='center'>
                    {/* AVATAR CON BORDE DESTACADO */}
                    <Avatar
                      src={win.user?.profileImageUrl}
                      alt={win.user?.name}
                      sx={{
                        width: 54,
                        height: 54,
                        border: "3px solid #E53888",
                        boxShadow: "0 4px 12px rgba(229, 56, 136, 0.25)",
                        flexShrink: 0,
                      }}
                    />

                    {/* INFORMACIÓN DE LA GANADORA */}
                    <Box sx={{ overflow: "hidden", width: "100%" }}>
                      <Stack direction='row' alignItems='center' spacing={0.5}>
                        <Typography
                          variant='subtitle1'
                          sx={{
                            fontWeight: 800,
                            color: "#2B1B24",
                            lineHeight: 1.2,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            fontSize: "0.95rem",
                          }}
                        >
                          {win.user?.name || "Usuaria VIP"}
                        </Typography>
                        <VerifiedIcon
                          sx={{ color: "#E53888", fontSize: "0.95rem" }}
                        />
                      </Stack>

                      <Typography
                        variant='caption'
                        sx={{
                          color: "#5A4650",
                          display: "block",
                          fontWeight: 600,
                          mt: 0.3,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        🏆 Premio: {win.prize?.name || "Kit Especial"}
                      </Typography>

                      <Chip
                        label='Ganadora Oficial'
                        size='small'
                        sx={{
                          height: "20px",
                          fontSize: "0.65rem",
                          backgroundColor: "#FFE2F0",
                          color: "#C2185B",
                          fontWeight: 800,
                          mt: 0.8,
                        }}
                      />
                    </Box>
                  </Stack>
                </Box>
              ))}
            </Marquee>
          </Box>
        </Box>
      ) : (
        <NextSorteo />
      )}
    </>
  );
};

export default LatestWinners;
