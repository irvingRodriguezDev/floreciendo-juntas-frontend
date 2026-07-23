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
    followers: "+66K seguidores",
    icon: <FacebookIcon width={36} />,
    link: "https://www.facebook.com/caarolinataveera",
  },
  {
    id: 2,
    name: "Instagram",
    followers: "+17K Seguidores",
    icon: <InstagramIcon width={36} />,
    link: "https://www.instagram.com/carolina_tavera1997/",
  },
  {
    id: 3,
    name: "TikTok",
    followers: "+254K Seguidores",
    icon: <TiktokIcon width={30} />,
    link: "https://www.tiktok.com/@carolina_tavera",
  },
];

const SocialCards = () => {
  return (
    <Box
      sx={{
        width: "100%",
        background: "linear-gradient(180deg, #FFF0F5 0%, #FFFFFF 100%)",
        borderRadius: "32px",
        py: { xs: 6, md: 8 },
        px: { xs: 2, sm: 4, md: 6 },
        overflow: "hidden",
      }}
    >
      <Grid
        container
        spacing={4}
        justifyContent='center'
        sx={{ maxWidth: "1300px", margin: "0 auto" }}
      >
        {/* TÍTULO EDITORIAL */}
        <Grid size={{ xs: 12 }}>
          <Stack alignItems='center' sx={{ mb: 4, textAlign: "center" }}>
            <Typography
              variant='caption'
              sx={{
                color: "#E53888",
                fontWeight: "800",
                textTransform: "uppercase",
                letterSpacing: "2px",
                mb: 1,
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
                lineHeight: 1.2,
                fontSize: { xs: "2.2rem", sm: "2.8rem", md: "3.4rem" },
              }}
            >
              Únete a nuestras{" "}
              <Box
                component='span'
                sx={{
                  color: "#E53888",
                  display: "inline-block",
                }}
              >
                Redes Sociales
              </Box>
            </Typography>
          </Stack>
        </Grid>

        {/* CARDS PLANAS INTERACTIVAS */}
        {socialData.map((item) => (
          <Grid
            size={{ xs: 12, md: 4, lg: 4 }}
            sx={{ display: "flex", justifyContent: "center" }}
            key={item.id}
          >
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
              }}
            >
              <MotionCard
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                whileHover={{
                  y: -6,
                  borderColor: "#F472B6",
                }}
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: "24px",
                  backgroundColor: "white",
                  border: "1px solid #F3F4F6",
                  transition: "all 0.2s ease-in-out",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "150px",
                  "&:hover .arrow-btn": {
                    backgroundColor: "#E53888",
                    color: "#fff",
                    transform: "translateX(4px)",
                  },
                }}
              >
                {/* ICONO + TEXTO */}
                <Stack direction='row' alignItems='center' spacing={2.5}>
                  <Box
                    sx={{
                      width: 54,
                      height: 54,
                      borderRadius: "16px",
                      background: "#FFF5F7",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </Box>

                  <Box>
                    <Typography
                      variant='subtitle1'
                      sx={{
                        fontWeight: "800",
                        color: "#1F2937",
                        lineHeight: 1.2,
                        mb: 0.5,
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      variant='caption'
                      sx={{
                        fontWeight: "700",
                        color: "#F472B6",
                        textTransform: "uppercase",
                        fontSize: "11px",
                      }}
                    >
                      {item.followers}
                    </Typography>
                  </Box>
                </Stack>

                {/* BOTÓN / LLAMADO A LA ACCIÓN PLANO */}
                <Stack
                  direction='row'
                  alignItems='center'
                  justifyContent='space-between'
                  sx={{ mt: 3, pt: 2, borderTop: "1px solid #FAFAFA" }}
                >
                  <Typography
                    variant='caption'
                    sx={{
                      fontWeight: "bold",
                      color: "#4B5563",
                      fontSize: "12px",
                    }}
                  >
                    Seguir comunidad
                  </Typography>

                  <Box
                    className='arrow-btn'
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      backgroundColor: "#FFF5F7",
                      color: "#E53888",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s ease-in-out",
                    }}
                  >
                    <ArrowForwardIcon sx={{ fontSize: "16px" }} />
                  </Box>
                </Stack>
              </MotionCard>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SocialCards;
