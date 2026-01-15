import { useContext, useEffect, useState } from "react";
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
import { Link, useParams, useNavigate } from "react-router-dom";

import AuthContext from "../../context/Auth/AuthContext";
import LivesContext from "../../context/Lives/LivesContext";
import Layout from "../../components/Layout/Layout";
import PinkSpinner from "../../components/Loading/PinkSpinner";
import SubscriptionForm from "../../components/Payment/SubscriptionButton";
import PlayerCliente from "./PlayerClient";
import LogoFJ from "../../assets/images/LOGOTIPO FLORECIENDO JUNTAS rosa.png";
import LiveCountdown from "../../components/lives/Counter";
import LiveEndedOverlay from "../../components/lives/LiveEndedOverlay";
import { getSocket } from "../../socket";

const MotionBox = motion(Box);

/* 🎬 TikTok-style animation */
const videoVariants = {
  live: {
    scale: 1,
    filter: "blur(0px) brightness(1)",
  },
  ending: {
    scale: 1.06,
    filter: "blur(12px) brightness(0.65)",
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const LiveDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getLiveById, live } = useContext(LivesContext);
  const { usuario, isAuthenticating, autenticado } = useContext(AuthContext);

  const [livePhase, setLivePhase] = useState("live");
  // live | ending | ended

  /* 📥 Obtener live */
  useEffect(() => {
    getLiveById(id);
  }, [id]);

  /* 🔴 Escuchar fin del live */
  useEffect(() => {
    const socket = getSocket();
    if (!socket || !live?.id) return;

    const handleLiveEnd = ({ liveId }) => {
      if (liveId !== live.id) return;

      setLivePhase("ending");

      setTimeout(() => {
        setLivePhase("ended");
      }, 900); // TikTok timing
    };

    socket.on("live_end", handleLiveEnd);

    return () => socket.off("live_end", handleLiveEnd);
  }, [live]);

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
          background: "#FFF7FA",
          pt: { xs: 8, md: 14 },
          pb: 10,
          px: { xs: 1.5, sm: 4, md: 8 },
        }}
      >
        {/* HEADER */}
        <MotionBox
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          textAlign='center'
          mb={{ xs: 3, md: 6 }}
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
              fontWeight: 700,
              color: "#C85A8E",
              fontSize:
                live.status === "live"
                  ? { xs: 22, md: 32 }
                  : { xs: 28, md: 42 },
            }}
          >
            {live.title}
          </Typography>
        </MotionBox>

        {/* CONTENIDO */}
        {live.status === "scheduled" ? (
          <LiveCountdown startTime={live.start_time} />
        ) : (
          <Grid container spacing={{ xs: 3, md: 6 }}>
            {/* PLAYER */}
            <Grid size={{ xs: 12, md: 8 }}>
              <MotionBox
                sx={{
                  position: "relative",
                  borderRadius: { xs: 3, md: 5 },
                  overflow: "hidden",
                  background: "#000",
                  boxShadow: {
                    xs: "0 12px 30px rgba(232,106,146,0.25)",
                    md: "0 30px 80px rgba(232,106,146,0.35)",
                  },
                }}
              >
                {/* 🔴 EN VIVO */}
                {live.status === "live" && livePhase === "live" && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 16,
                      left: 16,
                      px: 2,
                      py: "6px",
                      borderRadius: 20,
                      fontSize: 12,
                      fontWeight: 800,
                      background: "linear-gradient(90deg,#E53888,#FF8FB3)",
                      color: "#fff",
                      zIndex: 6,
                    }}
                  >
                    🔴 EN VIVO
                  </Box>
                )}

                {/* PLAYER + ANIMACIÓN */}
                {live.status === "live" &&
                  live.aws_playback_url &&
                  isSubscribed && (
                    <motion.div animate={livePhase} variants={videoVariants}>
                      <PlayerCliente
                        usuario={usuario}
                        liveId={live.id}
                        playbackUrl={live.aws_playback_url}
                        posterImage={LogoFJ}
                      />
                    </motion.div>
                  )}

                {/* 🔒 BLOQUEO */}
                {live.status === "live" && !isSubscribed && (
                  <Backdrop
                    open
                    sx={{
                      position: "absolute",
                      inset: 0,
                      zIndex: 5,
                      background: "rgba(255,240,247,0.75)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <Card
                      sx={{
                        p: { xs: 2.5, md: 4 },
                        borderRadius: 4,
                        textAlign: "center",
                        maxWidth: 420,
                        mx: "auto",
                      }}
                    >
                      <LockIcon sx={{ fontSize: 52, color: "#E53888" }} />
                      <Typography
                        sx={{
                          mt: 2,
                          fontWeight: 700,
                          color: "#E53888",
                          fontSize: 22,
                        }}
                      >
                        Contenido exclusivo
                      </Typography>

                      {autenticado ? (
                        <SubscriptionForm userId={usuario.id} />
                      ) : (
                        <Button
                          component={Link}
                          to='/iniciar-sesion'
                          fullWidth
                          sx={{
                            mt: 2,
                            background: "#C85A8E",
                            py: 1.3,
                            borderRadius: 3,
                            color: "#fff",
                          }}
                        >
                          Inicia sesión
                        </Button>
                      )}
                    </Card>
                  </Backdrop>
                )}

                {/* 🧠 LIVE FINALIZADO */}
                {livePhase === "ended" && (
                  <LiveEndedOverlay
                    onReplay={() => navigate(`/live/${live.id}/replay`)}
                    onGoHome={() => navigate("/")}
                  />
                )}
              </MotionBox>
            </Grid>

            {/* INFO */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Card
                sx={{
                  borderRadius: 4,
                  p: { xs: 2.5, md: 4 },
                  background: "#FFF7FA",
                }}
              >
                <CardContent>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: "#C85A8E",
                      fontSize: { xs: 20, md: 24 },
                      mb: 1.5,
                    }}
                  >
                    Lo que aprenderás
                  </Typography>

                  <Typography
                    sx={{
                      color: "#5A4A57",
                      fontSize: { xs: 14, md: 16 },
                      lineHeight: 1.7,
                    }}
                  >
                    {live.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Box>
    </Layout>
  );
};

export default LiveDetalle;
