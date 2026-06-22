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
      <Box sx={{ minHeight: "100vh", pb: { xs: 6, md: 10 } }}>
        {/* 🌸 Banner */}
        <LivesBanner />

        {/* 🌷 Estado vacío */}
        {lives.length === 0 && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            sx={{
              mt: { xs: 6, md: 8 },
              textAlign: "center",
              px: 4,
              py: 6,
              backgroundColor: "#FFFFFF",
              borderRadius: "24px",
              border: "1px dashed #E5E7EB", // Borde sutil que enmarca el espacio vacío de forma limpia
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            {/* Sello o detalle flotante sutil */}
            <Box
              component={motion.div}
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              sx={{ mb: 2.5, display: "inline-block" }}
            >
              <img
                src={petal}
                width={48}
                alt='Detalle floral'
                style={{ opacity: 0.4, objectFit: "contain" }}
              />
            </Box>

            {/* Título Editorial en tono carbón premium */}
            <Typography
              sx={{
                fontSize: { xs: "1.4rem", md: "1.8rem" },
                fontWeight: 900,
                color: "#1F2937",
                mb: 1.5,
                letterSpacing: "-0.5px",
              }}
            >
              No hay transmisiones programadas
            </Typography>

            {/* Copy fluido enfocado en la marca */}
            <Typography
              sx={{
                fontSize: "0.95rem",
                color: "#4B5563",
                maxWidth: "440px",
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              Estamos preparando nuevas masterclasses en vivo y espacios
              exclusivos para interactuar y florecer juntas. Muy pronto
              anunciaremos las próximas fechas.
            </Typography>
          </Box>
        )}

        {/* 🌸 Grid de Lives */}
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          sx={{
            px: { xs: 2, sm: 4, md: 10 },
            mt: { xs: 4, md: 6 },
          }}
        >
          {lives.map((live, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 3 }} key={live.id}>
              <Link
                to={`/detalle-live/${live.id}`}
                style={{ textDecoration: "none" }}
                aria-label={`Ver detalle del live ${live.title}`}
              >
                <Card
                  component={motion.article}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.55,
                    ease: "easeOut",
                    delay: i * 0.07,
                  }}
                  whileHover={{
                    y: -4,
                    boxShadow: "0 22px 56px rgba(232,106,146,0.28)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  sx={{
                    height: "100%",
                    borderRadius: 4,
                    overflow: "hidden",
                    background: "linear-gradient(180deg,#FFF7FB 0%,#FFF 100%)",
                    border: "1px solid #F3C6DA",
                    transition: "box-shadow .25s ease",
                  }}
                >
                  {/* 🖼️ MEDIA */}
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "4 / 5",
                      overflow: "hidden",
                    }}
                  >
                    <CardMedia
                      component='img'
                      src={live.thumbnail_url}
                      alt={live.title}
                      loading='lazy'
                      sx={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        transition: "transform .6s ease",
                        aspectRatio: {
                          xs: "5 / 4",
                          sm: "4 / 3",
                          md: "3 / 2",
                          lg: "1 / 1",
                        },
                      }}
                    />

                    {/* 🔴 LIVE BADGE */}
                    {live.status === "live" && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: 12,
                          left: 12,
                          px: 1.6,
                          py: 0.6,
                          borderRadius: "999px",
                          background: "linear-gradient(90deg,#E53888,#FF7AA8)",
                          color: "#fff",
                          fontSize: "0.7rem",
                          fontWeight: 900,
                          letterSpacing: 0.6,
                          boxShadow: "0 6px 18px rgba(229,56,136,.45)",
                        }}
                      >
                        ● EN VIVO
                      </Box>
                    )}
                  </Box>

                  {/* 🌷 CONTENT */}
                  <CardContent sx={{ px: 2.5, py: 2.3 }}>
                    <Typography
                      sx={{
                        fontWeight: 900,
                        fontSize: "1.05rem",
                        color: "#9B365F",
                        lineHeight: 1.25,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textWrap: "balance",
                      }}
                    >
                      {live.title}
                    </Typography>

                    <Typography
                      sx={{
                        mt: 0.7,
                        fontSize: "0.8rem",
                        color: "#6D5A63",
                      }}
                    >
                      {new Date(live.start_time).toLocaleString("es-MX", {
                        dateStyle: "long",
                        timeStyle: "short",
                      })}
                    </Typography>

                    {/* STATUS CHIP */}
                    <Box
                      sx={{
                        mt: 1.8,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 1,
                        px: 2,
                        py: "6px",
                        borderRadius: "20px",
                        fontSize: "0.7rem",
                        fontWeight: 800,
                        letterSpacing: 0.4,
                        background:
                          live.status === "live"
                            ? "linear-gradient(90deg,#E86A92,#FF8FB3)"
                            : live.status === "scheduled"
                              ? "linear-gradient(90deg,#FFE1EC,#FFB8D2)"
                              : "#ECECEC",
                        color: live.status === "live" ? "#fff" : "#8A4A62",
                      }}
                    >
                      <Box
                        sx={{
                          width: 7,
                          height: 7,
                          borderRadius: "50%",
                          bgcolor: live.status === "live" ? "#fff" : "#9B365F",
                        }}
                      />
                      {live.status === "live" && "EN VIVO"}
                      {live.status === "scheduled" && "PRÓXIMAMENTE"}
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
