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
      }}
    >
      <Container maxWidth='lg'>
        {/* Enlaces */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent='center'
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
