import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Skeleton,
} from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

import LivesBanner from "../../components/Banner/LivesBanner";
import Layout from "../../components/Layout/Layout";
import LivesContext from "../../context/Lives/LivesContext";
import petal from "../../assets/svg/petal.svg";

const PRIMARY_PINK = "#E53888";

// Helper para dar formato amable a las fechas
const formatLiveDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("es-MX", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const LivesPage = () => {
  const { lives = [], getAllLives } = useContext(LivesContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLives = async () => {
      setLoading(true);
      try {
        if (getAllLives) await getAllLives();
      } catch (error) {
        console.error("Error al obtener los eventos en vivo:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLives();
  }, []);

  return (
    <Layout>
      <Box sx={{ minHeight: "100vh", pb: { xs: 8, md: 12 } }}>
        {/* 🌸 BANNER PRINCIPAL */}
        <LivesBanner />

        {/* ⏳ ESTADO DE CARGA (SKELETONS) */}
        {loading && (
          <Grid
            container
            spacing={{ xs: 2.5, md: 3 }}
            sx={{ px: { xs: 2, sm: 4, md: 8, lg: 10 }, mt: { xs: 3, md: 5 } }}
          >
            {[1, 2, 3, 4].map((item) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item}>
                <Card
                  sx={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    border: "1px solid #F3F4F6",
                    boxShadow: "none",
                  }}
                >
                  <Skeleton
                    variant='rectangular'
                    height={220}
                    animation='wave'
                  />
                  <CardContent sx={{ p: 2.5 }}>
                    <Skeleton variant='text' width='80%' height={28} />
                    <Skeleton
                      variant='text'
                      width='50%'
                      height={20}
                      sx={{ mt: 1 }}
                    />
                    <Skeleton
                      variant='rounded'
                      width={110}
                      height={28}
                      sx={{ mt: 2, borderRadius: "50px" }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* 🌷 ESTADO VACÍO */}
        {!loading && lives.length === 0 && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            sx={{
              mt: { xs: 6, md: 8 },
              textAlign: "center",
              px: 4,
              py: 7,
              backgroundColor: "#FFFFFF",
              borderRadius: "28px",
              border: "1px dashed #FCE7F3",
              maxWidth: "580px",
              mx: "auto",
              boxShadow: "0 10px 30px rgba(229, 56, 136, 0.03)",
            }}
          >
            <Box
              component={motion.div}
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              sx={{ mb: 2.5, display: "inline-block" }}
            >
              <img
                src={petal}
                width={52}
                alt='Detalle floral'
                style={{ opacity: 0.6, objectFit: "contain" }}
              />
            </Box>

            <Typography
              sx={{
                fontSize: { xs: "1.35rem", md: "1.75rem" },
                fontWeight: 900,
                color: "#1F2937",
                mb: 1.5,
                letterSpacing: "-0.5px",
              }}
            >
              No hay transmisiones programadas
            </Typography>

            <Typography
              sx={{
                fontSize: "0.95rem",
                color: "#6B7280",
                maxWidth: "420px",
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              Estamos preparando nuevas masterclasses en vivo y espacios
              exclusivos para interactuar y florecer juntas. ¡Regresa pronto!
            </Typography>
          </Box>
        )}

        {/* 🌸 GRID DE TRANSMISIONES */}
        {!loading && lives.length > 0 && (
          <Grid
            container
            spacing={{ xs: 2.5, md: 3.5 }}
            sx={{
              px: { xs: 2, sm: 4, md: 8, lg: 10 },
              mt: { xs: 3, md: 5 },
            }}
          >
            {lives.map((live, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={live.id || i}>
                <Link
                  to={`/detalle-live/${live.id}`}
                  style={{
                    textDecoration: "none",
                    display: "block",
                    height: "100%",
                  }}
                  aria-label={`Ver detalle del live ${live.title}`}
                >
                  <Card
                    component={motion.article}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      ease: "easeOut",
                      delay: i * 0.06,
                    }}
                    whileHover={{
                      y: -6,
                      boxShadow: "0 20px 40px rgba(229, 56, 136, 0.18)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    sx={{
                      height: "100%",
                      borderRadius: "22px",
                      overflow: "hidden",
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #F3F4F6",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {/* 🖼️ MINIATURA / MEDIA */}
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        pt: "75%", // Aspect Ratio 4:3 constante
                        backgroundColor: "#FFF1F2",
                        overflow: "hidden",
                      }}
                    >
                      <CardMedia
                        component='img'
                        image={
                          live.thumbnail_url ||
                          "https://placehold.co/600x400/FFF1F2/E53888?text=Floreciendo+Juntas"
                        }
                        alt={live.title}
                        loading='lazy'
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.5s ease",
                          "&:hover": {
                            transform: "scale(1.04)",
                          },
                        }}
                      />

                      {/* 🔴 BADGE EN VIVO (Con efecto Pulso) */}
                      {live.status === "live" && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 12,
                            left: 12,
                            px: 1.5,
                            py: 0.5,
                            borderRadius: "50px",
                            backgroundColor: "#DC2626",
                            color: "#FFFFFF",
                            fontSize: "0.68rem",
                            fontWeight: 900,
                            letterSpacing: "0.5px",
                            display: "flex",
                            alignItems: "center",
                            gap: 0.6,
                            boxShadow: "0 4px 14px rgba(220, 38, 38, 0.5)",
                            animation: "pulse 1.8s infinite",
                            "@keyframes pulse": {
                              "0%": {
                                boxShadow: "0 0 0 0 rgba(220, 38, 38, 0.7)",
                              },
                              "70%": {
                                boxShadow: "0 0 0 10px rgba(220, 38, 38, 0)",
                              },
                              "100%": {
                                boxShadow: "0 0 0 0 rgba(220, 38, 38, 0)",
                              },
                            },
                          }}
                        >
                          <RadioButtonCheckedIcon sx={{ fontSize: 12 }} />
                          EN VIVO
                        </Box>
                      )}
                    </Box>

                    {/* 🌷 CONTENIDO DE LA TARJETA */}
                    <CardContent
                      sx={{
                        p: 2.5,
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box>
                        {/* TÍTULO */}
                        <Typography
                          variant='h6'
                          sx={{
                            fontWeight: 800,
                            fontSize: "1.02rem",
                            color: "#1F2937",
                            lineHeight: 1.35,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            mb: 1,
                          }}
                        >
                          {live.title}
                        </Typography>

                        {/* FECHA */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.8,
                            color: "#6B7280",
                          }}
                        >
                          <CalendarTodayOutlinedIcon sx={{ fontSize: 14 }} />
                          <Typography
                            variant='body2'
                            sx={{
                              fontSize: "0.8rem",
                              textTransform: "capitalize",
                              fontWeight: 500,
                            }}
                          >
                            {formatLiveDate(live.start_time)}
                          </Typography>
                        </Box>
                      </Box>

                      {/* CHIP DE ESTADO INFERIOR */}
                      <Box sx={{ mt: 2 }}>
                        <Box
                          sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 0.8,
                            px: 1.8,
                            py: 0.5,
                            borderRadius: "50px",
                            fontSize: "0.72rem",
                            fontWeight: 800,
                            letterSpacing: "0.3px",
                            backgroundColor:
                              live.status === "live"
                                ? "#FEF2F2"
                                : live.status === "scheduled"
                                  ? "#FFF1F2"
                                  : "#F3F4F6",
                            color:
                              live.status === "live"
                                ? "#DC2626"
                                : live.status === "scheduled"
                                  ? PRIMARY_PINK
                                  : "#6B7280",
                            border: "1px solid",
                            borderColor:
                              live.status === "live"
                                ? "#FEE2E2"
                                : live.status === "scheduled"
                                  ? "#FCE7F3"
                                  : "#E5E7EB",
                          }}
                        >
                          <Box
                            sx={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              backgroundColor:
                                live.status === "live"
                                  ? "#DC2626"
                                  : live.status === "scheduled"
                                    ? PRIMARY_PINK
                                    : "#9CA3AF",
                            }}
                          />
                          {live.status === "live" && "EN VIVO AHORA"}
                          {live.status === "scheduled" && "PRÓXIMAMENTE"}
                          {live.status === "ended" && "FINALIZADO"}
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Layout>
  );
};

export default LivesPage;
