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
        width: "98%",
        mx: "auto", // centra horizont
        color: "white",
        mb: 3,
        py: 3,
        px: 3,
        textAlign: "center",
        background: "rgba(238, 158, 234, 0.2)",
        borderRadius: "16px",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(5px)",
        borderTop: "2px solid rgba(229, 56, 136, 0.3)",
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
            <Link href='/about' underline='hover' color='inherit'>
              Acerca de
            </Link>
            <Link href='/privacy' underline='hover' color='inherit'>
              Privacidad
            </Link>
            <Link href='/contact' underline='hover' color='inherit'>
              Contacto
            </Link>
          </Stack>

          {/* Redes sociales */}
          <Stack direction='row' spacing={1}>
            <IconButton
              color='inherit'
              href='https://facebook.com'
              target='_blank'
            >
              <FacebookIcon width={50} />
            </IconButton>
            <IconButton
              color='inherit'
              href='https://instagram.com'
              target='_blank'
            >
              <InstagramIcon width={50} />
            </IconButton>

            <IconButton
              color='inherit'
              href='https://youtube.com'
              target='_blank'
            >
              <TiktokIcon width={50} />
            </IconButton>
          </Stack>
        </Stack>

        {/* Derechos reservados */}
        <Typography variant='body2' sx={{ mt: 2, opacity: 0.7 }}>
          © 2025 Wapizima. Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
