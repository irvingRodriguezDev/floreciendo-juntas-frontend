import {
  alpha,
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import AuthContext from "../../../context/Auth/AuthContext";
const ColumnRigth = ({ isSubscribed }) => {
  const { autenticado } = useContext(AuthContext);
  return (
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
            Con tu <b>suscripción activa</b> obtienes acceso ilimitado a todo
            nuestro catálogo de educación, masterclasses exclusivas, y tu pase
            directo y asegurado para la rifa mensual de{" "}
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
  );
};

export default ColumnRigth;
