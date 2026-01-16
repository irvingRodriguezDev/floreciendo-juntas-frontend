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

const videoVariants = {
  live: { scale: 1, filter: "blur(0px)" },
  ending: {
    scale: 1.05,
    filter: "blur(10px) brightness(0.7)",
    transition: { duration: 0.9 },
  },
};

const LiveDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getLiveById, live } = useContext(LivesContext);
  const { usuario, autenticado, isAuthenticating } = useContext(AuthContext);

  const [livePhase, setLivePhase] = useState("live");

  useEffect(() => {
    getLiveById(id);
  }, [id]);

  /* SOCKET: LIVE END */
  useEffect(() => {
    const socket = getSocket();
    if (!socket || !live?.id) return;

    const handleLiveEnd = ({ liveId }) => {
      if (liveId !== live.id) return;
      setLivePhase("ending");
      setTimeout(() => setLivePhase("ended"), 900);
    };

    socket.on("live_end", handleLiveEnd);
    return () => socket.off("live_end", handleLiveEnd);
  }, [live]);

  /* LOADING */
  if (isAuthenticating || !live) {
    return <PinkSpinner label='Cargando live…' />;
  }

  const isSubscribed = usuario?.isSubscribed;

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
        <MotionBox textAlign='center' mb={5}>
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
              fontSize: { xs: 22, md: 34 },
            }}
          >
            {live.title}
          </Typography>
        </MotionBox>

        {/* 1️⃣ PROGRAMADO */}
        {live.status === "scheduled" && (
          <LiveCountdown startTime={live.start_time} />
        )}

        {/* 2️⃣ LIVE */}
        {live.status === "live" && (
          <Grid container spacing={5}>
            <Grid size={{ xs: 12, md: 8 }}>
              {/* TAG LIVE */}
              {livePhase === "live" && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    zIndex: 3,
                    px: 2,
                    py: "6px",
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 800,
                    background: "linear-gradient(90deg,#E53888,#FF8FB3)",
                    color: "#fff",
                  }}
                >
                  🔴 EN VIVO
                </Box>
              )}

              {/* 4️⃣ PLAYER (solo con acceso) */}
              {autenticado && isSubscribed && (
                <motion.div animate={livePhase} variants={videoVariants}>
                  <PlayerCliente
                    playbackUrl={live.aws_playback_url}
                    posterImage={LogoFJ}
                  />
                </motion.div>
              )}

              {/* 2️⃣ LOGIN REQUIRED */}
              {live.status === "live" && !autenticado && (
                <>
                  <Backdrop
                    open
                    sx={{
                      position: "absolute",
                      inset: 0,
                      zIndex: 400,
                      background: "rgba(255,240,247,0.75)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <Card sx={{ p: 4, borderRadius: 4 }}>
                      <LockIcon
                        sx={{
                          fontSize: 52,
                          color: "#E53888",
                          textAlign: "center",
                        }}
                      />
                      <Typography
                        sx={{
                          mt: 2,
                          fontWeight: 700,
                          color: "#E53888",
                          fontSize: 22,
                        }}
                      >
                        Inicia sesión para ver el live
                      </Typography>

                      <Button
                        component={Link}
                        to='/iniciar-sesion'
                        fullWidth
                        sx={{
                          mt: 3,
                          background: "#C85A8E",
                          color: "#fff",
                        }}
                      >
                        Iniciar sesión
                      </Button>
                    </Card>
                  </Backdrop>
                </>
              )}

              {/* 3️⃣ NO SUSCRIPCIÓN */}
              {autenticado && !isSubscribed && (
                <Backdrop
                  open
                  sx={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 4,
                    background: "rgba(255,240,247,0.75)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <Card sx={{ p: 4, borderRadius: 4 }}>
                    <Typography textAlign='center'>
                      <LockIcon sx={{ fontSize: 52, color: "#E53888" }} />
                    </Typography>
                    <Typography
                      sx={{
                        mt: 2,
                        fontWeight: 700,
                        color: "#E53888",
                        fontSize: 22,
                        textAlign: "center",
                        mb: 2,
                      }}
                    >
                      Contenido exclusivo
                    </Typography>

                    <SubscriptionForm userId={usuario.id} />
                  </Card>
                </Backdrop>
              )}

              {/* 5️⃣ LIVE TERMINADO */}
              {livePhase === "ended" && (
                <LiveEndedOverlay
                  onReplay={() => navigate(`/live/${live.id}/replay`)}
                  onGoHome={() => navigate("/")}
                />
              )}
            </Grid>

            {/* INFO */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Card sx={{ borderRadius: 4, p: 3 }}>
                <CardContent>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: "#C85A8E",
                      mb: 1,
                    }}
                  >
                    Lo que aprenderás
                  </Typography>
                  <Typography sx={{ lineHeight: 1.7 }}>
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
