import React from "react";
import {
  Box,
  Container,
  Typography,
  Link,
  Stack,
  IconButton,
  Divider,
} from "@mui/material";
import TiktokIcon from "../icons/TiktokIcon";
import FacebookIcon from "../icons/FacebookIcon";
import InstagramIcon from "../icons/InstagramIcon";
import YoutubeIcon from "../icons/YoutubeIcon";

const Footer = () => {
  return (
    <Box
      component='footer'
      sx={{
        background: "rgba(241, 189, 206, 0.12)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(241, 189, 206, 0.2)",
        borderRadius: "20px 20px 0 0",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
        py: 4,
        mt: 5,
      }}
    >
      <Container maxWidth='lg'>
        {/* Enlaces */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent='space-between'
          alignItems='center'
          spacing={3}
          sx={{ mb: 3 }}
        >
          <Stack direction='row' spacing={4}>
            {[
              { text: "Acerca de", href: "/about" },
              { text: "Privacidad", href: "/privacy" },
              { text: "Contacto", href: "/contact" },
            ].map((item) => (
              <Link
                key={item.text}
                href={item.href}
                underline='none'
                sx={{
                  color: "#E53888",
                  fontWeight: 500,
                  fontSize: "1rem",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#ff69b4",
                    textShadow: "0 0 6px rgba(229, 56, 136, 0.6)",
                  },
                }}
              >
                {item.text}
              </Link>
            ))}
          </Stack>

          {/* Redes sociales */}
          <Stack direction='row' spacing={2}>
            {[
              {
                href: "https://facebook.com",
                icon: <FacebookIcon width={28} />,
              },
              {
                href: "https://instagram.com",
                icon: <InstagramIcon width={28} />,
              },
              {
                href: "https://tiktok.com",
                icon: <TiktokIcon width={28} />,
              },
              {
                href: "https://youtube.com",
                icon: <YoutubeIcon width={28} />,
              },
            ].map((item, index) => (
              <IconButton
                key={index}
                href={item.href}
                target='_blank'
                sx={{
                  color: "#E53888",
                  transition: "transform 0.3s ease, color 0.3s ease",
                  "&:hover": {
                    color: "#ff69b4",
                    transform: "scale(1.2)",
                  },
                }}
              >
                {item.icon}
              </IconButton>
            ))}
          </Stack>
        </Stack>

        <Divider
          sx={{
            borderColor: "rgba(241, 189, 206, 0.3)",
            mb: 2,
          }}
        />

        {/* Derechos reservados */}
        <Typography
          align='center'
          sx={{
            color: "#e53888",
            fontWeight: 600,
            fontSize: "0.95rem",
            letterSpacing: "0.5px",
            opacity: 0.9,
          }}
        >
          © {new Date().getFullYear()} Wapizima. Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
