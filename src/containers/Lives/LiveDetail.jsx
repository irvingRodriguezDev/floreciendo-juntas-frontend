import React, { useContext, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Backdrop,
  Button,
  Grid,
  Chip,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";

import AuthContext from "../../context/Auth/AuthContext";
import LivesContext from "../../context/Lives/LivesContext";
import Layout from "../../components/Layout/Layout";
import PinkSpinner from "../../components/Loading/PinkSpinner";
import SubscriptionForm from "../../components/Payment/SubscriptionButton";
import PlayerCliente from "./PlayerClient";
import LogoFJ from "../../assets/images/LOGOTIPO FLORECIENDO JUNTAS rosa.png";
import LiveCountdown from "../../components/lives/Counter";
import LiveCommentsOverlay from "./LiveCommentsOverlay";
import LivePlayerOverlay from "./LivePlayerOverlay";

const MotionBox = motion(Box);

const LiveDetalle = () => {
  const { id } = useParams();
  const { getLiveById, live } = useContext(LivesContext);
  const { usuario, isAuthenticating, autenticado } = useContext(AuthContext);

  useEffect(() => {
    getLiveById(id);
  }, [id, getLiveById]);

  if (isAuthenticating || !live) {
    return (
      <PinkSpinner
        label={
          isAuthenticating
            ? "Verificando tu acceso…"
            : "Cargando información del live…"
        }
      />
    );
  }

  const isSubscribed = Boolean(usuario?.isSubscribed);

  return (
    <Layout>
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(180deg, #FFF0F6 0%, #FFFFFF 60%)",
          pt: { xs: 10, md: 14 },
          pb: 10,
          px: { xs: 2, sm: 4, md: 8 },
        }}
      >
        {/* HEADER */}
        <MotionBox
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          textAlign='center'
          mb={{ xs: 4, md: 6 }}
        >
          <Chip
            icon={<FavoriteIcon sx={{ color: "#E43888" }} />}
            label='Live exclusivo'
            sx={{
              mb: 2,
              background: "#F8C1D9",
              color: "#8A2C5D",
              fontWeight: 600,
            }}
          />
          <Typography
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              color: "#C85A8E",
              fontSize: { xs: 28, md: 42 },
            }}
          >
            {live.title}
          </Typography>
        </MotionBox>

        {/* CONTENIDO */}
        {live.status === "scheduled" ? (
          <LiveCountdown startTime={live.start_time} />
        ) : (
          <Grid container spacing={{ xs: 4, md: 6 }} justifyContent='center'>
            {/* PLAYER */}
            <Grid size={{ xs: 12, md: 8, lg: 9 }}>
              <MotionBox
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                sx={{ position: "relative" }}
              >
                {/* PLAYER */}
                {live.status === "live" &&
                  live.aws_playback_url &&
                  isSubscribed && (
                    <PlayerCliente
                      usuario={usuario}
                      liveId={live.id}
                      playbackUrl={live.aws_playback_url}
                      posterImage={LogoFJ}
                    />
                  )}

                {/* BLOQUEO POR SUSCRIPCIÓN */}
                {live.status === "live" && !isSubscribed && (
                  <Backdrop
                    open
                    sx={{
                      position: "absolute",
                      inset: 0,
                      zIndex: 5,
                      background: "rgba(255,240,247,0.75)",
                      backdropFilter: "blur(8px)",
                      borderRadius: 4,
                    }}
                  >
                    <Card
                      sx={{
                        p: { xs: 3, md: 4 },
                        borderRadius: 4,
                        textAlign: "center",
                        boxShadow: "0 12px 32px rgba(0,0,0,0.18)",
                        mt: 30,
                      }}
                    >
                      <LockIcon sx={{ fontSize: 56, color: "#E53888" }} />
                      <Typography
                        sx={{
                          mt: 2,
                          fontFamily: "'Playfair Display', serif",
                          fontWeight: 700,
                          color: "#E53888",
                          fontSize: 24,
                        }}
                      >
                        Contenido exclusivo
                      </Typography>
                      <Typography sx={{ mt: 1.5, mb: 3, color: "#555" }}>
                        Suscríbete para desbloquear este live y acceder a todos
                        los beneficios.
                      </Typography>

                      {autenticado ? (
                        <SubscriptionForm userId={usuario.id} />
                      ) : (
                        <Button
                          component={Link}
                          to='/iniciar-sesion'
                          variant='contained'
                          fullWidth
                          sx={{
                            background: "#C85A8E",
                            py: 1.4,
                            borderRadius: 3,
                            fontSize: 15,
                            "&:hover": { background: "#b34f7f" },
                          }}
                        >
                          Inicia sesión para suscribirte
                        </Button>
                      )}
                    </Card>
                  </Backdrop>
                )}
              </MotionBox>
            </Grid>

            <Grid size={{ xs: 12, md: 4, lg: 3 }}>
              <MotionBox
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card
                  sx={{
                    borderRadius: 5,
                    p: { xs: 3, sm: 4 },
                    boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                  }}
                >
                  <CardContent>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: "#C85A8E",
                        fontSize: { xs: 22, md: 26 },
                        mb: 2,
                      }}
                    >
                      Lo que aprenderás
                    </Typography>

                    <Typography
                      sx={{
                        color: "#5A4A57",
                        fontSize: { xs: 14, md: 16 },
                        lineHeight: 1.7,
                        textAlign: "justify",
                      }}
                    >
                      {live.description}
                    </Typography>
                  </CardContent>
                </Card>
              </MotionBox>
            </Grid>
          </Grid>
        )}
      </Box>
    </Layout>
  );
};

export default LiveDetalle;
