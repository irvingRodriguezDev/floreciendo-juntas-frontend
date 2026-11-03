import { Backdrop, Button, Card, Typography, Stack, Box } from "@mui/material";
import { Lock, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import SubscriptionForm from "../Payment/SubscriptionButton";

const PRIMARY_PINK = "#E53888";

const LiveBlocked = ({
  autenticado,
  usuario,
  isPastDue,
  handleUpdatePayment,
  loadingPortal,
}) => {
  return (
    <Backdrop
      open
      sx={{
        position: "absolute",
        inset: 0,
        zIndex: 10,
        background: "rgba(255,240,247,0.78)",
        backdropFilter: "blur(80px)",
      }}
    >
      <Card
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 4,
          textAlign: "center",
          maxWidth: 420,
          mx: "auto",
          boxShadow: "0 20px 50px rgba(229,56,136,0.25)",
        }}
      >
        <Stack spacing={2} alignItems='center'>
          <Lock size={52} color={PRIMARY_PINK} />

          <Typography
            sx={{
              fontWeight: 800,
              color: PRIMARY_PINK,
              fontSize: 22,
            }}
          >
            {isPastDue
              ? "Actualización de pago pendiente"
              : "Live exclusivo para la comunidad Floreciendo Juntas"}
          </Typography>

          <Typography
            sx={{
              fontSize: 15,
              color: "#6A4A5E",
              lineHeight: 1.6,
            }}
          >
            {isPastDue ? (
              <>
                Tu último pago de renovación no pudo procesarse. Actualiza tus
                datos para recuperar el acceso inmediato a este live y
                transmisiones en vivo.
              </>
            ) : (
              "Únete a este live y forma parte de la comunidad de Floreciendo Juntas."
            )}
          </Typography>

          {autenticado ? (
            <Box sx={{ width: "100%", mt: 1 }}>
              {isPastDue ? (
                <Button
                  onClick={handleUpdatePayment}
                  disabled={loadingPortal}
                  fullWidth
                  startIcon={<CreditCard size={18} />}
                  sx={{
                    background: PRIMARY_PINK,
                    py: 1.4,
                    borderRadius: 3,
                    color: "#fff",
                    fontWeight: 700,
                    textTransform: "none",
                    fontSize: "0.95rem",
                    boxShadow: "0 4px 12px rgba(229, 56, 136, 0.25)",
                    "&:hover": {
                      background: "#D12E78",
                    },
                  }}
                >
                  {loadingPortal
                    ? "Abriendo portal..."
                    : "Actualizar mi tarjeta"}
                </Button>
              ) : (
                <SubscriptionForm userId={usuario?.id} />
              )}
            </Box>
          ) : (
            <>
              <Typography
                sx={{
                  fontSize: 14,
                  color: "#8A5A75",
                }}
              >
                Inicia sesión para ver el live y participar en este espacio de
                aprendizaje y acompañamiento.
              </Typography>

              <Button
                component={Link}
                to='/iniciar-sesion'
                fullWidth
                sx={{
                  mt: 1,
                  background: PRIMARY_PINK,
                  py: 1.3,
                  borderRadius: 3,
                  color: "#fff",
                  fontWeight: 600,
                  textTransform: "none",
                  "&:hover": {
                    background: "#D12E78",
                  },
                }}
              >
                Iniciar sesión
              </Button>
            </>
          )}
        </Stack>
      </Card>
    </Backdrop>
  );
};

export default LiveBlocked;
