import React from "react";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";

const StripePaymentError = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/checkout"); // vuelve al checkout o a la pantalla deseada
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#FDE6F0",
        px: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 400,
          width: "100%",
          borderRadius: 3,
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          textAlign: "center",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Icono de error */}
          <ErrorOutlineIcon
            sx={{
              fontSize: 60,
              color: "#E53888",
              mb: 2,
            }}
          />

          {/* Título */}
          <Typography variant='h5' fontWeight='bold' gutterBottom>
            ¡Pago Fallido!
          </Typography>

          {/* Mensaje descriptivo */}
          <Typography
            variant='body1'
            color='text.secondary'
            sx={{ mb: 4, lineHeight: 1.5 }}
          >
            Hubo un problema procesando tu pago con Stripe. Por favor, verifica
            tu información y vuelve a intentarlo.
          </Typography>

          {/* Botón para volver */}
          <Button
            variant='contained'
            sx={{
              bgcolor: "#E53888",
              color: "white",
              textTransform: "none",
              borderRadius: 2,
              px: 4,
              py: 1.5,
              "&:hover": {
                bgcolor: "#D32F71",
              },
            }}
            onClick={handleGoBack}
          >
            Volver al pago
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default StripePaymentError;
