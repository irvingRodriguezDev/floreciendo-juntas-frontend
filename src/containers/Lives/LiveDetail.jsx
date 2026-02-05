import React, { useContext, useEffect, useState } from "react";
import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";

// Contexts & Hooks
import AuthContext from "../../context/Auth/AuthContext";
import LivesContext from "../../context/Lives/LivesContext";
import { useLiveComments } from "../../hooks/useLiveComments";

// Components
import Layout from "../../components/Layout/Layout";
import PinkSpinner from "../../components/Loading/PinkSpinner";
import PlayerCliente from "./PlayerClient";
import LiveCountdown from "../../components/lives/Counter";
import LiveEndedOverlay from "../../components/lives/LiveEndedOverlay";
import LiveHeader from "../../components/lives/LiveHeader";
import LiveInfoCard from "../../components/lives/LiveInfoCard";
import LiveBlocked from "../../components/lives/LiveBlocked";

const videoVariants = {
  live: { scale: 1, filter: "blur(0px)" },
  ending: {
    scale: 1.05,
    filter: "blur(15px) brightness(0.7)",
    transition: { duration: 0.8 },
  },
  ended: {
    scale: 1.05,
    filter: "blur(20px) brightness(0.5)",
  },
};

const LiveDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { getLiveById, live } = useContext(LivesContext);
  const { usuario, isAuthenticating, autenticado } = useContext(AuthContext);

  const [livePhase, setLivePhase] = useState("live");

  useEffect(() => {
    if (id) getLiveById(id);
  }, [id]);

  useEffect(() => {
    // Si el live pasa a ended, iniciamos la secuencia de cierre
    if (live?.status === "ended") {
      setLivePhase("ending");
      const timer = setTimeout(() => setLivePhase("ended"), 900);
      return () => clearTimeout(timer);
    } else if (live?.status === "live") {
      setLivePhase("live");
    }
  }, [live?.status]);

  useLiveComments(live?.id);

  if (isAuthenticating || !live) {
    return (
      <PinkSpinner
        label={isAuthenticating ? "Verificando acceso..." : "Cargando live..."}
      />
    );
  }

  const isSubscribed = Boolean(usuario?.isSubscribed);

  return (
    <Layout>
      <Container
        maxWidth='lg'
        disableGutters={isMobile}
        sx={{ py: { xs: 0, sm: 2 } }}
      >
        {/* 1. Header */}
        <Box sx={{ px: isMobile ? 2 : 0, mt: isMobile ? 2 : 0 }}>
          <LiveHeader live={live} />
        </Box>

        <Box
          sx={{
            mt: isMobile ? 2 : 3,
            position: "relative",
            width: "100%",
            borderRadius: isMobile ? 0 : 4,
            overflow: "hidden",
            bgcolor: "#transparent", // Fondo negro base
          }}
        >
          {/* ESTADO: PROGRAMADO */}
          {live.status === "scheduled" && (
            <Box sx={{ py: 8, display: "flex", justifyContent: "center" }}>
              <LiveCountdown startTime={live.start_time} />
            </Box>
          )}

          {/* ESTADO: EN VIVO O FINALIZADO (Mantenemos el bloque vivo para el Overlay) */}
          {(live.status === "live" || live.status === "ended") && (
            <Box
              sx={{
                position: "relative",
                width: "100%",
              }}
            >
              {/* PLAYER SIEMPRE MONTADO */}
              <motion.div
                animate={livePhase}
                variants={videoVariants}
                style={{ position: "relative", width: "100%" }}
              >
                <PlayerCliente
                  usuario={usuario}
                  liveId={live.id}
                  playbackUrl={live.aws_playback_url}
                />
              </motion.div>

              {/* BLOQUEADOR */}
              {live.status === "live" && (!autenticado || !isSubscribed) && (
                <LiveBlocked autenticado={autenticado} usuario={usuario} />
              )}

              {/* OVERLAY FINAL */}
              <AnimatePresence>
                {(livePhase === "ended" || livePhase === "ending") && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      zIndex: 10000,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(0,0,0,0.6)",
                    }}
                  >
                    <LiveEndedOverlay onGoHome={() => navigate("/lives")} />
                  </motion.div>
                )}
              </AnimatePresence>
            </Box>
          )}
        </Box>

        {/* INFORMACIÓN EXTRA */}
        <Box sx={{ mt: 4, px: isMobile ? 2 : 0, pb: 4 }}>
          <LiveInfoCard
            title='Qué aprenderás en este live'
            html={live.description}
          />
        </Box>
      </Container>
    </Layout>
  );
};

export default LiveDetalle;
