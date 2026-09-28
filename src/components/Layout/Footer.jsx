import React from "react";
import {
  Box,
  Container,
  Typography,
  Link,
  Stack,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <Box
      component='footer'
      sx={{
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(180deg, rgba(255,240,246,0.6) 0%, rgba(241,189,206,0.2) 100%)",
        backdropFilter: "blur(10px)",
        borderTop: "1px solid rgba(241,189,206,0.3)",
        boxShadow: "0 -4px 20px rgba(229,56,136,0.15)",
        py: { xs: 4, md: 6 },
        // mt: 8,
      }}
    >
      {/* Figuras decorativas flotantes */}
      <Box
        sx={{
          position: "absolute",
          top: "-50px",
          left: "-60px",
          width: "180px",
          height: "180px",
          background:
            "radial-gradient(circle at 30% 30%, rgba(229,56,136,0.25), transparent)",
          borderRadius: "50%",
          animation: "float 8s ease-in-out infinite",
          "@keyframes float": {
            "0%, 100%": { transform: "translateY(0)" },
            "50%": { transform: "translateY(-15px)" },
          },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "-40px",
          right: "-60px",
          width: "220px",
          height: "220px",
          background:
            "radial-gradient(circle at 60% 40%, rgba(255,105,180,0.2), transparent)",
          borderRadius: "50%",
          animation: "float2 10s ease-in-out infinite",
          "@keyframes float2": {
            "0%, 100%": { transform: "translateY(0)" },
            "50%": { transform: "translateY(20px)" },
          },
        }}
      />

      <Container maxWidth='lg' sx={{ position: "relative", zIndex: 2 }}>
        {/* Enlaces */}
        {/* <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent='center'
          alignItems='center'
          spacing={4}
          sx={{ mb: 3 }}
        >
          {[
            { text: "Acerca de", href: "/about" },
            { text: "Privacidad", href: "/privacy" },
            { text: "Contacto", href: "/contact" },
          ].map((item, index) => (
            <motion.div
              key={item.text}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                href={item.href}
                underline='none'
                sx={{
                  color: "#e53888",
                  fontWeight: 600,
                  fontSize: "1rem",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#ff69b4",
                    textShadow: "0 0 8px rgba(229,56,136,0.6)",
                  },
                }}
              >
                {item.text}
              </Link>
            </motion.div>
          ))}
        </Stack> */}

        <Divider
          sx={{
            borderColor: "rgba(241,189,206,0.4)",
            mb: 3,
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
          © {new Date().getFullYear()} Floreciendo Juntas 🌸 — Todos los
          derechos reservados.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
