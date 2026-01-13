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
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            sx={{
              mt: { xs: 8, md: 10 },
              textAlign: "center",
              px: 3,
            }}
          >
            <motion.img
              src={petal}
              width={64}
              alt=''
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              style={{ opacity: 0.6, marginBottom: 16 }}
            />

            <Typography
              sx={{
                fontSize: { xs: "1.6rem", md: "2.2rem" },
                fontWeight: 900,
                color: "#D82E7A",
                mb: 1,
              }}
            >
              No hay lives programados
            </Typography>

            <Typography
              sx={{
                fontSize: "1rem",
                color: "#6D5A63",
                maxWidth: 520,
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              Estamos creando nuevos espacios para compartir, aprender y
              florecer juntas 🌷 Muy pronto habrá novedades.
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
            <Grid item xs={12} sm={6} md={4} lg={3} key={live.id}>
              <Link
                to={`/detalle-live/${live.id}`}
                style={{ textDecoration: "none" }}
              >
                <Card
                  component={motion.article}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  whileHover={{
                    y: -6,
                    boxShadow: "0 24px 60px rgba(232,106,146,0.3)",
                  }}
                  sx={{
                    borderRadius: "24px",
                    overflow: "hidden",
                    background: "#FFF7FB",
                    border: "1px solid #F3C6DA",
                    height: "100%",
                  }}
                >
                  {/* 🖼️ Imagen con aspect-ratio */}
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "1 / 1",
                      overflow: "hidden",
                    }}
                  >
                    <CardMedia
                      component='img'
                      src={live.thumbnail_url}
                      alt={live.title}
                      sx={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />

                    {/* Overlay suave */}
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(180deg, rgba(255,255,255,0) 55%, rgba(255,220,235,0.7) 100%)",
                      }}
                    />
                  </Box>

                  {/* 🌷 Contenido */}
                  <CardContent sx={{ px: 2.5, py: 2.2 }}>
                    <Typography
                      sx={{
                        fontWeight: 900,
                        fontSize: "1.15rem",
                        color: "#9B365F",
                        lineHeight: 1.3,
                      }}
                    >
                      {live.title}
                    </Typography>

                    <Typography
                      sx={{
                        mt: 0.8,
                        fontSize: "0.85rem",
                        color: "#6D5A63",
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
                        mt: 2,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 1,
                        px: 2,
                        py: "6px",
                        borderRadius: "20px",
                        fontSize: "0.72rem",
                        fontWeight: 800,
                        background:
                          live.status === "live"
                            ? "linear-gradient(90deg,#E86A92,#FF8FB3)"
                            : live.status === "scheduled"
                            ? "linear-gradient(90deg,#FFE1EC,#FFB8D2)"
                            : "#E0E0E0",
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
