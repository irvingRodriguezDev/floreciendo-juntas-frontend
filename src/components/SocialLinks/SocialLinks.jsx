import React from "react";
import { Box, Typography, Card, Stack, Grid, alpha } from "@mui/material";
import { motion } from "framer-motion";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import FacebookIcon from "../icons/FacebookIcon";
import InstagramIcon from "../icons/InstagramIcon";
import TiktokIcon from "../icons/TiktokIcon";
import { useHoliday } from "../../context/Holiday/HolidayContext";

const MotionCard = motion.create(Card);

const socialData = [
  {
    id: 1,
    name: "Facebook",
    followers: "+68K seguidores",
    icon: <FacebookIcon width={34} />,
    link: "https://www.facebook.com/caarolinataveera",
  },
  {
    id: 2,
    name: "Instagram",
    followers: "+18K Seguidores",
    icon: <InstagramIcon width={34} />,
    link: "https://www.instagram.com/carolina_tavera1997/",
  },
  {
    id: 3,
    name: "TikTok",
    followers: "+258K Seguidores",
    icon: <TiktokIcon width={28} />,
    link: "https://www.tiktok.com/@carolina_tavera",
  },
];

const SocialCards = () => {
  const { isHolidayMode } = useHoliday();
  return (
    <Box
      sx={{
        width: "100%",
        background: `
          linear-gradient(180deg, #FFFFFF 0%, #FFF0F5 100%),
          radial-gradient(circle at top left, rgba(232,62,140,0.06), transparent 70%)
        `,
        borderRadius: "32px",
        py: { xs: 6, md: 10 },
        px: { xs: 2, sm: 4, md: 6 },
        position: "relative",
        overflow: "hidden",
        border: "1px solid",
        borderColor: alpha("#E53888", 0.08),
        boxShadow: "0 20px 40px rgba(232, 62, 140, 0.04)",
      }}
    >
      {/* CONTENEDOR PRINCIPAL */}
      <Box
        sx={{ position: "relative", zIndex: 1, maxWidth: "1300px", mx: "auto" }}
      >
        {/* 🌸 CABECERA MODERNA Y ELEGANTE */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          sx={{
            textAlign: "center",
            mb: { xs: 5, md: 7 },
            px: 2,
          }}
        >
          {/* Badge superior minimalista */}
          <Stack
            direction='row'
            spacing={1}
            alignItems='center'
            justifyContent='center'
            sx={{ mb: 1.5 }}
          >
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                backgroundColor: alpha("#E53888", 0.1),
                color: "#E53888",
                px: 2,
                py: 0.6,
                borderRadius: "50px",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              <ShareRoundedIcon sx={{ fontSize: "1rem" }} />
              <span>Comunidad Wapizima</span>
            </Box>
          </Stack>

          {/* Título Principal Limpio y Potente */}
          <Typography
            variant='h2'
            component='h2'
            sx={{
              color: "#2B1B24",
              fontWeight: 900,
              fontSize: { xs: "2rem", sm: "2.8rem", md: "3.5rem" },
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              lineHeight: 1.1,
              mb: 1.5,
            }}
          >
            Únete a nuestras{" "}
            <Box
              component='span'
              sx={{
                color: "#E53888",
                position: "relative",
              }}
            >
              Redes Sociales
            </Box>
          </Typography>

          {/* Línea decorativa sutil */}
          <Box
            sx={{
              width: "60px",
              height: "4px",
              backgroundColor: "#E53888",
              margin: "0 auto",
              borderRadius: "2px",
              opacity: 0.8,
            }}
          />
        </Box>

        {/* 🎴 GRID DE CARDS INTERACTIVAS PREMIUM */}
        <Grid
          container
          spacing={{ xs: 2.5, md: 3.5 }}
          sx={{ justifyContent: "center" }}
        >
          {socialData.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
              <Box
                component='a'
                href={item.link}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={`Seguir en ${item.name}`}
                sx={{
                  textDecoration: "none",
                  width: "100%",
                  display: "block",
                  height: "100%",
                }}
              >
                <MotionCard
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: isHolidayMode ? null : -6 }}
                  elevation={0}
                  sx={{
                    p: { xs: 2.5, sm: 3 },
                    borderRadius: "24px",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid",
                    borderColor: alpha("#E53888", 0.12),
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.04)",
                    transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                    minHeight: "160px",
                    position: "relative",
                    // Cambiado a 'visible' o 'initial' para permitir que el gorrito sobresalga estéticamente de la esquina
                    overflow: "visible",
                    "&:hover": {
                      borderColor: alpha("#E53888", 0.4),
                      boxShadow: "0 20px 40px rgba(229, 56, 136, 0.12)",
                      "& .arrow-btn": {
                        backgroundColor: "#E53888",
                        color: "#FFF",
                        transform: "translateX(4px)",
                      },
                      "& .icon-wrapper": {
                        transform: "scale(1.05)",
                        backgroundColor: alpha("#E53888", 0.15),
                      },
                    },
                  }}
                >
                  {/* 🎄 GORRITO NAVIDEÑO POSICIONADO EXACTAMENTE EN LA ESQUINA SUPERIOR IZQUIERDA */}
                  {isHolidayMode && (
                    <Box
                      component='img'
                      src='https://cdn.floreciendojuntas.com/production/statics/xmas/gorro-xmas-teddy.png'
                      alt='Gorro Navideño'
                      sx={{
                        position: "absolute",
                        top: "-26px",
                        left: "-24px",
                        width: "80px",
                        height: "80px",
                        transform: "rotate(-25deg)",
                        zIndex: 10,
                        pointerEvents: "none",
                        filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))",
                      }}
                    />
                  )}

                  {/* ICONO + TEXTO */}
                  <Stack direction='row' alignItems='center' spacing={2.5}>
                    <Box
                      className='icon-wrapper'
                      sx={{
                        width: 58,
                        height: 58,
                        borderRadius: "18px",
                        backgroundColor: alpha("#E53888", 0.08),
                        border: "1px solid",
                        borderColor: alpha("#E53888", 0.15),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        transition: "all 0.3s ease",
                      }}
                    >
                      {item.icon}
                    </Box>

                    <Box>
                      <Typography
                        variant='h6'
                        sx={{
                          fontWeight: 800,
                          color: "#2B1B24",
                          lineHeight: 1.2,
                          fontSize: "1.1rem",
                          mb: 0.5,
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        variant='caption'
                        sx={{
                          fontWeight: 800,
                          color: "#E53888",
                          letterSpacing: 1,
                          textTransform: "uppercase",
                          fontSize: "11px",
                        }}
                      >
                        {item.followers}
                      </Typography>
                    </Box>
                  </Stack>

                  {/* LLAMADO A LA ACCIÓN (CTA BOTTOM) */}
                  <Stack
                    direction='row'
                    alignItems='center'
                    justifyContent='space-between'
                    sx={{
                      mt: 3,
                      pt: 2,
                      borderTop: "1px solid",
                      borderColor: alpha("#E53888", 0.08),
                    }}
                  >
                    <Typography
                      variant='caption'
                      sx={{
                        fontWeight: 700,
                        color: "#5A4650",
                        fontSize: "12px",
                        letterSpacing: 0.5,
                      }}
                    >
                      Seguir comunidad
                    </Typography>

                    <Box
                      className='arrow-btn'
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        backgroundColor: alpha("#E53888", 0.08),
                        color: "#E53888",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    >
                      <ArrowForwardIcon sx={{ fontSize: "18px" }} />
                    </Box>
                  </Stack>
                </MotionCard>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default SocialCards;
