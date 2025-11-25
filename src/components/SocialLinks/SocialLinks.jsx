import React from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  Stack,
  Grid,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";

import FacebookIcon from "../icons/FacebookIcon";
import InstagramIcon from "../icons/InstagramIcon";
import TiktokIcon from "../icons/TiktokIcon";

const MotionCard = motion(Card);
const MotionStack = motion(Stack);

const socialData = [
  {
    id: 1,
    name: "Facebook",
    followers: "+36K Seguidores",
    icon: <FacebookIcon width={50} />,
    link: "https://www.facebook.com/caarolinataveera",
  },
  {
    id: 2,
    name: "Instagram",
    followers: "+9K Seguidores",
    icon: <InstagramIcon width={50} />,
    link: "https://www.instagram.com/carolina_tavera1997/",
  },
  {
    id: 3,
    name: "Tiktok",
    followers: "+200K Seguidores",
    icon: <TiktokIcon width={42} />,
    link: "https://www.tiktok.com/@carolina_tavera",
  },
];

const SocialCards = () => {
  const theme = useTheme();

  return (
    <>
      {/* TÍTULO CON ANIMACIÓN */}
      <MotionStack
        alignItems='center'
        sx={{ mb: 6 }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Typography
          variant='overline'
          sx={{
            fontWeight: 600,
            textTransform: "uppercase",
            color: theme.palette.text.secondary,
            letterSpacing: "1.5px",
          }}
        >
          Síguenos en todas las
        </Typography>

        <Typography
          variant='h3'
          component='h2'
          sx={{
            fontWeight: 700,
            textAlign: "center",
            lineHeight: 1.2,
            fontSize: { xs: "2.3rem", sm: "3rem", md: "3.4rem" },
          }}
        >
          Redes{" "}
          <Box
            component='span'
            sx={{
              position: "relative",
              display: "inline-block",
              px: 0.5,
            }}
          >
            Sociales
            {/* Subrayado animado */}
            <Box
              component={motion.span}
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                height: "8px",
                backgroundColor: "#FFC5DE",
                opacity: 0.9,
                borderRadius: "4px",
                zIndex: -1,
              }}
            />
          </Box>
        </Typography>
      </MotionStack>

      {/* CARDS CON ANIMACIÓN */}
      <Grid
        container
        spacing={4}
        justifyContent='center'
        sx={{
          py: 5,
          px: 1,
          background: "linear-gradient(180deg, #fff 0%, #fff5f7 100%)",
          borderRadius: "16px",
        }}
      >
        {socialData.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <MotionCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{
                y: -6,
                boxShadow: "0 10px 32px rgba(255, 0, 128, 0.18)",
              }}
              sx={{
                p: 3,
                borderRadius: "18px",
                backgroundColor: "white",
                border: "1px solid #FFE4F0",
                boxShadow: "0 4px 20px rgba(255, 0, 128, 0.06)",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              {/* ICONO + TEXTO */}
              <Stack direction='row' alignItems='center' spacing={2}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: "14px",
                    background: "linear-gradient(145deg, #fff, #ffeef5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 3px 8px rgba(255,0,128,0.15)",
                  }}
                >
                  {item.icon}
                </Box>

                <Box>
                  <Typography variant='h6' fontWeight={700}>
                    {item.name}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {item.followers}
                  </Typography>
                </Box>
              </Stack>

              {/* BOTÓN */}
              <Box display='flex' justifyContent='flex-end' mt={2}>
                <a
                  href={item.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={`Seguir en ${item.name}`}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    variant='contained'
                    sx={{
                      backgroundColor: "#FF0080",
                      textTransform: "none",
                      borderRadius: "10px",
                      px: 2.5,
                      py: 0.8,
                      fontWeight: 600,
                      letterSpacing: "0.5px",
                      boxShadow: "0 4px 12px rgba(255, 0, 128, 0.25)",
                      "&:hover": {
                        backgroundColor: "#d6006b",
                        boxShadow: "0 5px 14px rgba(255, 0, 128, 0.35)",
                      },
                    }}
                  >
                    SEGUIR
                  </Button>
                </a>
              </Box>
            </MotionCard>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default SocialCards;
