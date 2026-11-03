import React, { useContext } from "react";
import {
  Box,
  Typography,
  Grid,
  Stack,
  Paper,
  Button,
  alpha,
} from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import AuthContext from "../../context/Auth/AuthContext";
import Marquee from "react-fast-marquee";

export default function RifaSalonPro() {
  const { usuario, autenticado } = useContext(AuthContext);

  // Sincronizado con el estado de tu autenticación
  const isSubscribed = Boolean(usuario?.isSubscribed || usuario?.roleId === 3);

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
        px: { xs: 3, sm: 6, md: 8 },
        overflow: "hidden",
        border: "1px solid",
        borderColor: alpha("#E53888", 0.08),
        boxShadow: "0 20px 40px rgba(232, 62, 140, 0.04)",
        position: "relative",
      }}
    >
      {/* 🎀 BANNER DE MARQUEE EDITORIAL SUPERIOR */}
      <Box
        sx={{
          mb: { xs: 5, md: 7 },
          width: "100%",
          backgroundColor: alpha("#E53888", 0.08),
          py: 1.5,
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <Marquee speed={45} gradient={false}>
          <Typography
            variant='h6'
            sx={{
              fontWeight: 900,
              color: "#E53888",
              letterSpacing: "1.5px",
              mx: 4,
              fontSize: { xs: "1.1rem", md: "1.3rem" },
              textTransform: "uppercase",
            }}
          >
            🎁 ¡Gana el salón de tus sueños equipado por Wapizima! 🎁
          </Typography>
          <Typography
            variant='h6'
            sx={{
              fontWeight: 900,
              color: "#2B1B24",
              letterSpacing: "1.5px",
              mx: 4,
              fontSize: { xs: "1.1rem", md: "1.3rem" },
              textTransform: "uppercase",
            }}
          >
            • Rifa exclusiva con tu membresía activa •
          </Typography>
        </Marquee>
      </Box>

      <Grid
        container
        spacing={{ xs: 5, md: 8 }}
        alignItems='center'
        justifyContent='center'
        sx={{ maxWidth: "1300px", margin: "0 auto" }}
      >
        {/* Columna Izquierda: Mensaje de Beneficios */}
        <Grid size={{ xs: 12, md: 6 }}>
          {/* Badge superior minimalista */}
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
              mb: 2,
            }}
          >
            <EmojiEventsIcon sx={{ fontSize: "1rem" }} />
            <span>Sorteo Mensual Oficial Wapizima</span>
          </Box>

          <Typography
            variant='h2'
            sx={{
              fontWeight: 900,
              mb: 2.5,
              lineHeight: 1.15,
              color: "#2B1B24",
              fontSize: { xs: "2rem", sm: "2.6rem", md: "3.2rem" },
              letterSpacing: "-0.02em",
            }}
          >
            Tu pasaporte para El Salón de tus Sueños{" "}
            <Box component='span' sx={{ color: "#E53888" }}>
              cada mes
            </Box>
          </Typography>

          <Typography
            variant='body1'
            sx={{
              mb: 4,
              color: "#5A4650",
              lineHeight: 1.7,
              fontSize: "1.05rem",
            }}
          >
            Solo por mantener tu <b>suscripción activa</b> en nuestra
            plataforma, entras automáticamente al sorteo para llevarte{" "}
            <b>El Salón de tus Sueños</b> cortesía de <b>Wapizima</b>, equipado
            con todo lo necesario para escalar tu negocio al máximo nivel
            profesional.
          </Typography>

          {/* Listado de Beneficios en Tarjetas Limpias */}
          <Stack spacing={2.5}>
            {[
              {
                icon: (
                  <WorkspacePremiumIcon
                    sx={{ color: "#E53888", fontSize: 24 }}
                  />
                ),
                title:
                  "Gran Premio: El Salón de tus Sueños equipado por Wapizima",
              },
              {
                icon: (
                  <CardGiftcardIcon sx={{ color: "#E53888", fontSize: 24 }} />
                ),
                title:
                  "Colecciones exclusivas y mobiliario premium de alto valor",
              },
              {
                icon: (
                  <VolunteerActivismIcon
                    sx={{ color: "#E53888", fontSize: 24 }}
                  />
                ),
                title:
                  "Participación automática e inmediata con tu membresía activa",
              },
              {
                icon: (
                  <EmojiEventsIcon sx={{ color: "#E53888", fontSize: 24 }} />
                ),
                title: "Sorteos mensuales en vivo con total transparencia",
              },
            ].map((item, i) => (
              <Stack
                key={i}
                direction='row'
                spacing={2}
                alignItems='center'
                sx={{
                  backgroundColor: "#FFFFFF",
                  p: 2,
                  borderRadius: "16px",
                  border: "1px solid",
                  borderColor: alpha("#E53888", 0.08),
                  boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
                }}
              >
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: "12px",
                    backgroundColor: alpha("#E53888", 0.1),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </Box>
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "#2B1B24",
                    fontSize: "0.95rem",
                  }}
                >
                  {item.title}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Grid>

        {/* Columna Derecha: Tarjeta de Suscripción de Alta Conversión */}
        <Grid size={{ xs: 12, md: 6 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Paper
              elevation={0}
              sx={{
                borderRadius: "28px",
                p: { xs: 4, md: 5 },
                backgroundColor: "#FFFFFF",
                border: "2px solid",
                borderColor: alpha("#E53888", 0.2),
                maxWidth: 500,
                margin: "0 auto",
                boxShadow: "0 15px 35px rgba(229, 56, 136, 0.1)",
              }}
            >
              <Typography
                variant='h5'
                sx={{
                  fontWeight: 900,
                  mb: 2,
                  color: "#2B1B24",
                }}
              >
                Mantén tu membresía activa 🚀
              </Typography>

              <Typography
                sx={{
                  mb: 3.5,
                  color: "#5A4650",
                  fontSize: "0.98rem",
                  lineHeight: 1.6,
                }}
              >
                Con tu <b>suscripción activa</b> obtienes acceso ilimitado a
                todo nuestro catálogo de educación, masterclasses exclusivas, y
                tu pase directo y asegurado para la rifa mensual de{" "}
                <b>El Salón de tus Sueños</b>.
              </Typography>

              {/* Lista de viñetas limpia */}
              <Stack spacing={2} sx={{ mb: 4 }}>
                {[
                  "Pase asegurado al sorteo El Salón de tus Sueños",
                  "Membresía activa con acceso total e ilimitado",
                  "Lanzamientos exclusivos de colecciones Wapizima",
                  "Comunidad privada y soporte profesional diario",
                ].map((text, i) => (
                  <Stack
                    key={i}
                    direction='row'
                    spacing={1.5}
                    alignItems='flex-start'
                  >
                    <Box
                      sx={{
                        backgroundColor: alpha("#E53888", 0.1),
                        color: "#E53888",
                        borderRadius: "50%",
                        width: 20,
                        height: 20,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.75rem",
                        fontWeight: "bold",
                        flexShrink: 0,
                        mt: 0.2,
                      }}
                    >
                      ✓
                    </Box>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color: "#374151",
                        fontSize: "0.95rem",
                      }}
                    >
                      {text}
                    </Typography>
                  </Stack>
                ))}
              </Stack>

              {/* Lógica de botones homologada */}
              {autenticado && !isSubscribed ? (
                <Link to='/suscribirme' style={{ textDecoration: "none" }}>
                  <Button
                    variant='contained'
                    fullWidth
                    startIcon={<LocalActivityIcon />}
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      backgroundColor: "#E53888",
                      color: "white",
                      borderRadius: "50px",
                      py: 1.8,
                      fontWeight: 800,
                      fontSize: "1rem",
                      boxShadow: "0 8px 25px rgba(229, 56, 136, 0.35)",
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "#C2256F",
                        transform: "translateY(-2px)",
                        boxShadow: "0 12px 30px rgba(229, 56, 136, 0.45)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Activar mi Membresía ($200/mes)
                  </Button>
                </Link>
              ) : !autenticado ? (
                <Link to='/suscribirme' style={{ textDecoration: "none" }}>
                  <Button
                    variant='contained'
                    fullWidth
                    startIcon={<LocalActivityIcon />}
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      backgroundColor: "#E53888",
                      color: "white",
                      borderRadius: "50px",
                      py: 1.8,
                      fontWeight: 800,
                      fontSize: "1rem",
                      boxShadow: "0 8px 25px rgba(229, 56, 136, 0.35)",
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "#C2256F",
                        transform: "translateY(-2px)",
                        boxShadow: "0 12px 30px rgba(229, 56, 136, 0.45)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Unirme y Participar por $200/mes
                  </Button>
                </Link>
              ) : (
                // Estado para alumnas con suscripción activa
                <Box
                  sx={{
                    p: 2.5,
                    borderRadius: "20px",
                    backgroundColor: alpha("#E53888", 0.06),
                    border: "2px solid",
                    borderColor: alpha("#E53888", 0.3),
                    textAlign: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 800,
                      color: "#E53888",
                      fontSize: "0.95rem",
                      lineHeight: 1.4,
                    }}
                  >
                    ✨ ¡Tu suscripción está activa! Ya estás participando por El
                    Salón de tus Sueños. 💖
                  </Typography>
                </Box>
              )}
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
}
