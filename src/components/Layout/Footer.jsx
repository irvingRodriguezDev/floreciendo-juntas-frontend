import React from "react";
import {
  Box,
  Container,
  Typography,
  Link,
  Stack,
  IconButton,
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
        backgroundColor: "rgba(241, 189, 206, 0.31)",
        borderRadius: "16px",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(5px)",
        border: "1px solid rgba(241, 189, 206, 0.3)",
      }}
    >
      <Container maxWidth='lg'>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent='space-between'
          alignItems='center'
          spacing={2}
        >
          {/* Enlaces */}
          <Stack direction='row' spacing={3}>
            <Link href='/about' underline='hover' color='#E53888'>
              Acerca de
            </Link>
            <Link href='/privacy' underline='hover' color='#E53888'>
              Privacidad
            </Link>
            <Link href='/contact' underline='hover' color='#E53888'>
              Contacto
            </Link>
          </Stack>

          {/* Redes sociales */}
          <Stack direction='row' spacing={2} sx={{ padding: 5 }}>
            <IconButton
              color='#E53888'
              href='https://facebook.com'
              target='_blank'
            >
              <FacebookIcon width={50} />
            </IconButton>
            <IconButton
              color='#E53888'
              href='https://instagram.com'
              target='_blank'
            >
              <InstagramIcon width={50} />
            </IconButton>

            <IconButton
              color='#E53888'
              href='https://youtube.com'
              target='_blank'
            >
              <TiktokIcon width={50} />
            </IconButton>
          </Stack>
        </Stack>

        {/* Derechos reservados */}
        <Typography
          color='#e53888'
          fontWeight='bold'
          sx={{ mt: 1, opacity: 0.9, mb: 3 }}
        >
          © 2025 Wapizima. Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
