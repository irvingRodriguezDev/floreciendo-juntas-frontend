import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { motion } from "framer-motion";
import LivesBanner from "../../components/Banner/LivesBanner";
import Layout from "../../components/Layout/Layout";
import LivesContext from "../../context/Lives/LivesContext";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import petal from "../../assets/svg/petal.svg";

const LivesPage = () => {
  const { lives, getAllLives } = useContext(LivesContext);

  useEffect(() => {
    getAllLives();
  }, []);

  return (
    <Layout>
      {/* Fondo general Floreciendo Juntas */}
      <Box
        sx={{
          minHeight: "100vh",
          // background: "linear-gradient(to bottom, #fefefe 0%, #fff0f5 100%)",
          pb: 8,
        }}
      >
        {/* Banner */}
        <Grid container spacing={2}>
          <Grid size={12}>
            <LivesBanner />
          </Grid>
        </Grid>
        {lives.length === 0 && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            sx={{
              mt: 10,
              textAlign: "center",
              px: 3,
            }}
          >
            {/* Ícono / pétalo animado */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              style={{ marginBottom: 16, opacity: 0.6 }}
            >
              <img src={petal} width={70} alt='' />
            </motion.div>

            {/* Texto principal */}
            <Typography
              sx={{
                fontSize: { xs: "1.6rem", md: "2.2rem" },
                fontWeight: 900,
                color: "#9B365F",
                mb: 1,
                letterSpacing: "-0.5px",
              }}
            >
              No hay lives programados por el momento
            </Typography>

            {/* Texto secundario */}
            <Typography
              sx={{
                fontSize: "1.05rem",
                color: "#6D5A63",
                maxWidth: 520,
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              Estamos preparando nuevos espacios para crecer y florecer juntas
              🌷 Muy pronto tendrás nuevas programaciones disponibles.
            </Typography>
          </Box>
        )}
        {/* Cards */}
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          sx={{ px: { xs: 1.5, md: 12 }, py: { xs: 1.5, md: 6 } }}
        >
          {lives.map((live, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={live.id}>
              <Link
                to={`/detalle-live/${live.id}`}
                aria-label={`Ver detalle del live ${live.title}`}
                style={{ textDecoration: "none" }}
              >
                <Card
                  component={motion.article}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  whileHover={{
                    scale: { xs: 1, md: 1.05 },
                    boxShadow: "0 32px 80px rgba(232,106,146,0.35)",
                  }}
                  sx={{
                    position: "relative",
                    borderRadius: "28px",
                    overflow: "hidden",
                    background: "rgba(255, 245, 250, 0.8)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(255,180,210,0.35)",
                    boxShadow: "0 18px 45px rgba(232,106,146,0.25)",
                    transition: "transform .35s ease",
                  }}
                >
                  {/* Overlay */}
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0) 45%, rgba(255,220,235,0.55) 100%)",
                      zIndex: 2,
                      pointerEvents: "none",
                    }}
                  />

                  {/* 🌸 Pétalos decorativos */}
                  <Box
                    component={motion.div}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 9 }}
                    sx={{
                      position: "absolute",
                      bottom: 10,
                      right: 12,
                      opacity: 0.18,
                      display: { xs: "none", sm: "block" },
                      zIndex: 1,
                    }}
                  >
                    <img src={petal} width={56} alt='decoración floral' />
                  </Box>

                  <Box
                    component={motion.div}
                    animate={{ y: [0, 12, 0] }}
                    transition={{ repeat: Infinity, duration: 11 }}
                    sx={{
                      position: "absolute",
                      top: 16,
                      left: 16,
                      opacity: 0.15,
                      display: { xs: "none", sm: "block" },
                      zIndex: 1,
                    }}
                  >
                    <img src={petal} width={44} alt='decoración floral' />
                  </Box>

                  {/* Imagen */}
                  <CardMedia
                    component='img'
                    src={live.thumbnail_url}
                    alt={live.title}
                    height={220}
                    sx={{
                      objectFit: "cover",
                      filter: "brightness(0.96)",
                      transition: "transform .4s ease, filter .4s ease",
                      ".MuiCard-root:hover &": {
                        transform: "scale(1.05)",
                        filter: "brightness(1.05)",
                      },
                    }}
                  />

                  {/* Contenido */}
                  <CardContent
                    sx={{
                      px: { xs: 2.4, md: 3 },
                      pb: 3,
                      pt: 2.2,
                      position: "relative",
                      zIndex: 3,
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 900,
                        fontSize: { xs: "1.15rem", md: "1.3rem" },
                        color: "#9B365F",
                        letterSpacing: "-0.5px",
                      }}
                    >
                      {live.title}
                    </Typography>

                    <Typography
                      sx={{
                        mt: 1,
                        color: "#6D5A63",
                        fontSize: "0.9rem",
                        fontWeight: 500,
                      }}
                    >
                      {new Date(live.start_time).toLocaleString("es-MX", {
                        dateStyle: "long",
                        timeStyle: "short",
                      })}
                    </Typography>

                    {/* Estado */}
                    <Box
                      sx={{
                        mt: 2.2,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 1,
                        px: 2.2,
                        py: "6px",
                        borderRadius: "20px",
                        fontSize: "0.72rem",
                        fontWeight: 800,
                        letterSpacing: "0.4px",
                        background:
                          live.status === "live"
                            ? "linear-gradient(90deg,#E86A92,#FF8FB3)"
                            : live.status === "scheduled"
                            ? "linear-gradient(90deg,#FFD6E5,#FFB8D2)"
                            : "linear-gradient(90deg,#E0E0E0,#CFCFCF)",
                        color: live.status === "live" ? "#fff" : "#8A4A62",
                        boxShadow: "0 6px 16px rgba(232,106,146,0.4)",
                      }}
                    >
                      <Box
                        sx={{
                          width: 7,
                          height: 7,
                          borderRadius: "50%",
                          bgcolor:
                            live.status === "live"
                              ? "#fff"
                              : live.status === "scheduled"
                              ? "#9B365F"
                              : "#777",
                        }}
                      />
                      {live.status === "live" && "EN VIVO"}
                      {live.status === "scheduled" && "PRÓXIMO EVENTO"}
                      {live.status === "ended" && "FINALIZADO"}
                    </Box>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
};

export default LivesPage;
