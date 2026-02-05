import { Backdrop, Button, Card, Typography, Stack } from "@mui/material";
import { Lock } from "lucide-react";
import { Link } from "react-router-dom";
import SubscriptionForm from "../Payment/SubscriptionButton";

const LiveBlocked = ({ autenticado, usuario }) => {
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
          <Lock size={52} color='#E53888' />

          <Typography
            sx={{
              fontWeight: 800,
              color: "#E53888",
              fontSize: 22,
            }}
          >
            Live exclusivo para la comunidad Floreciendo Juntas
          </Typography>

          <Typography
            sx={{
              fontSize: 15,
              color: "#6A4A5E",
              lineHeight: 1.6,
            }}
          >
            Unete a este live y forma parte de la comunidad de Floreciendo
            Juntas.
          </Typography>

          {autenticado ? (
            <>
              <SubscriptionForm userId={usuario?.id} />
            </>
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
                  background: "#E53888",
                  py: 1.3,
                  borderRadius: 3,
                  color: "#fff",
                  fontWeight: 600,
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
