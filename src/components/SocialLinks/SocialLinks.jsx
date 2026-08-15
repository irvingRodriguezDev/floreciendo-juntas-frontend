import React from "react";
import { Box, Typography, Card, Stack, Grid } from "@mui/material";
import { motion } from "framer-motion";

import FacebookIcon from "../icons/FacebookIcon";
import InstagramIcon from "../icons/InstagramIcon";
import TiktokIcon from "../icons/TiktokIcon";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

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
  return (
    <Box
      sx={{
        width: "100%",
        background: `
          linear-gradient(180deg, #FFF0F5 0%, #FFFFFF 100%),
          radial-gradient(circle at top left, rgba(255, 200, 220, 0.25), transparent 60%)
        `,
        borderRadius: "32px",
        py: { xs: 6, md: 10 },
        px: { xs: 2, sm: 4, md: 6 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 💧 TEXTO DE FONDO (MARCA DE AGUA) */}
      <Typography
        variant='h1'
        sx={{
          position: "absolute",
          top: { xs: "35px", md: "15px" },
          left: "50%",
          transform: "translateX(-50%)",
          fontWeight: 900,
          color: "rgba(229, 56, 136, 0.094)",
          fontSize: {
            xs: "3.9rem",
            sm: "6rem",
            md: "7rem",
            lg: "10rem",
            xl: "13rem",
          },

          lineHeight: 1,
          whiteSpace: "nowrap",
          zIndex: 0,
          pointerEvents: "none",
          textTransform: "uppercase",
          letterSpacing: "-4px",
        }}
      >
        REDES SOCIALES
      </Typography>

      {/* CONTENEDOR PRINCIPAL */}
      <Box
        sx={{ position: "relative", zIndex: 1, maxWidth: "1300px", mx: "auto" }}
      >
        {/* 🌸 CABECERA EDITORIAL */}
        <Stack
          alignItems='center'
          sx={{ mb: { xs: 5, md: 7 }, textAlign: "center" }}
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant='overline'
            sx={{
              color: "#E53888",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "4px",
              mb: 1,
              fontSize: { xs: "12px", md: "14px" },
              textShadow: "0 2px 4px rgba(255,255,255,0.8)",
            }}
          >
            Comunidad Wapizima
          </Typography>

          <Typography
            variant='h3'
            component='h2'
            sx={{
              fontWeight: 900,
              color: "#1F2937",
              lineHeight: 1.15,
              fontSize: { xs: "2.1rem", sm: "2.8rem", md: "3.5rem" },
              letterSpacing: "-1px",
            }}
          >
            Únete a nuestras{" "}
            <Box
              component='span'
              sx={{
                background: "linear-gradient(135deg, #E53888 0%, #B82E6B 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
              }}
            >
              Redes Sociales
            </Box>
          </Typography>
        </Stack>

        {/* 🎴 GRID DE CARDS INTERACTIVAS PREMIUM */}
        <Grid container spacing={{ xs: 2.5, md: 3.5 }} justifyContent='center'>
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
                  whileHover={{ y: -8 }}
                  elevation={0}
                  sx={{
                    p: { xs: 2.5, sm: 3 },
                    borderRadius: "24px",
                    background: "rgba(255, 255, 255, 0.85)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(255, 255, 255, 0.9)",
                    boxShadow: "0 10px 30px -10px rgba(180, 50, 110, 0.08)",
                    transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                    minHeight: "160px",
                    position: "relative",
                    overflow: "hidden",
                    "&:hover": {
                      borderColor: "rgba(229, 56, 136, 0.35)",
                      boxShadow: "0 20px 40px -12px rgba(229, 56, 136, 0.18)",
                      "& .arrow-btn": {
                        backgroundColor: "#E53888",
                        color: "#FFF",
                        transform: "translateX(4px)",
                      },
                      "& .icon-wrapper": {
                        transform: "scale(1.05)",
                        backgroundColor: "rgba(229, 56, 136, 0.12)",
                      },
                    },
                  }}
                >
                  {/* ICONO + TEXTO */}
                  <Stack direction='row' alignItems='center' spacing={2.5}>
                    <Box
                      className='icon-wrapper'
                      sx={{
                        width: 58,
                        height: 58,
                        borderRadius: "18px",
                        background: "rgba(255, 240, 247, 0.8)",
                        border: "1px solid rgba(229, 56, 136, 0.15)",
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
                          color: "#1F2937",
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
                      borderTop: "1px solid rgba(229, 56, 136, 0.08)",
                    }}
                  >
                    <Typography
                      variant='caption'
                      sx={{
                        fontWeight: 700,
                        color: "#6B7280",
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
                        backgroundColor: "rgba(255, 240, 247, 0.9)",
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
