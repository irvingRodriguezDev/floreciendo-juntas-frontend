import React from "react";
import { Box, Button, Typography, Card, Stack, Grid } from "@mui/material";
import FacebookIcon from "../icons/FacebookIcon";
import InstagramIcon from "../icons/InstagramIcon";
import TiktokIcon from "../icons/TiktokIcon";
const socialData = [
  {
    id: 1,
    name: "Facebook",
    followers: "3.5K Seguidores",
    icon: <FacebookIcon width={50} />,
  },
  {
    id: 2,
    name: "Instagram",
    followers: "3.9K Seguidores",
    icon: <InstagramIcon width={50} />,
  },
  {
    id: 3,
    name: "Tiktok",
    followers: "95.9K Seguidores",
    icon: <TiktokIcon width={42} />,
  },
];

const SocialCards = () => {
  return (
    <>
      <Stack alignItems='center' sx={{ mb: 6 }}>
        <Typography
          variant='overline'
          sx={{
            color: "",
            fontWeight: 600,
            textTransform: "uppercase",
          }}
        >
          Siguenos en todas las
        </Typography>

        <Typography
          variant='h3'
          component='h2'
          sx={{
            fontWeight: 700,
            lineHeight: 1.2,
            textAlign: "center",
            fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
          }}
        >
          Redes{" "}
          <span
            style={{
              position: "relative",
              display: "inline-block",
              textDecoration: "none",
            }}
          >
            Sociales
            <Box
              component='span'
              sx={{
                position: "absolute",
                left: 0,
                bottom: 0,
                width: "100%",
                height: "8px",
                backgroundColor: "", // Resaltado amarillo
                zIndex: -1,
                opacity: 0.7,
                borderRadius: "4px",
              }}
            />
          </span>
        </Typography>
      </Stack>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
          py: 5,
          background: "linear-gradient(180deg, #fff 0%, #fff5f7 100%)",
          borderRadius: "16px",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {socialData.map((item) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 4, lg: 4 }}
              sx={{ backgroundColor: "transparent" }}
            >
              <Card
                key={item.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: 3,
                  py: 2,
                  width: "100%",
                  borderRadius: "16px",
                  boxShadow: "0 4px 20px rgba(255, 0, 128, 0.05)",
                  backgroundColor: "transparent",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 6px 24px rgba(255, 0, 128, 0.08)",
                  },
                }}
              >
                {/* Icono + Texto */}
                <Stack direction='row' alignItems='center' spacing={1.5}>
                  <Box
                    sx={{
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </Box>

                  <Box sx={{ paddingLeft: 3, paddingRight: 3 }}>
                    <Typography
                      variant='subtitle1'
                      fontWeight={700}
                      color='text.primary'
                    >
                      {item.name}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {item.followers}
                    </Typography>
                  </Box>
                </Stack>

                {/* Botón */}
                <Button
                  variant='contained'
                  sx={{
                    backgroundColor: "#FF0080",
                    textTransform: "none",
                    borderRadius: "8px",
                    px: 2.5,
                    py: 0.6,
                    fontWeight: 600,
                    boxShadow: "0 2px 4px rgba(255, 0, 128, 0.3)",
                    "&:hover": {
                      backgroundColor: "#d6006b",
                      boxShadow: "0 3px 6px rgba(255, 0, 128, 0.4)",
                    },
                  }}
                >
                  SEGUIR
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default SocialCards;
