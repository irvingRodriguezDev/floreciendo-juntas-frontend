import { Box, Typography } from "@mui/material";
import OrdersContext from "../../context/Orders/OrdersContext";
import { useContext, useEffect } from "react";
import AuthContext from "../../context/Auth/AuthContext";
import OrdersTable from "../../components/Orders/OrdersTable";
import { motion } from "framer-motion";

const PRIMARY_PINK = "#E53888";
const LIGHT_ACCENT = "#FFF8FB";

const DreamSalonSection = () => {
  const { usuario } = useContext(AuthContext);
  const { getOrdersUser, orders } = useContext(OrdersContext);

  useEffect(() => {
    getOrdersUser(usuario);
  }, []);

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        p: { xs: 3, md: 4 },
        bgcolor: LIGHT_ACCENT,
        borderRadius: "18px",
        border: `1.5px solid ${PRIMARY_PINK}`,
        boxShadow: "0 8px 24px rgba(229, 56, 136, 0.12)",
        textAlign: "center",
        mt: 3,
      }}
    >
      <Typography
        variant='h5'
        color={PRIMARY_PINK}
        sx={{
          mb: 1,
          fontWeight: 700,
          position: "relative",
          display: "inline-block",
          px: 1,
        }}
      >
        El Salón de Tus Sueños
        <Box
          sx={{
            width: "60%",
            height: "3px",
            bgcolor: PRIMARY_PINK,
            borderRadius: 2,
            mx: "auto",
            mt: 0.6,
          }}
        />
      </Typography>

      <Typography
        variant='body1'
        color='text.secondary'
        sx={{
          mb: 3,
          maxWidth: "600px",
          mx: "auto",
        }}
      >
        ¡Este espacio refleja tu visión! El éxito de tu negocio es nuestro mayor
        orgullo. Sigue creciendo y transformando vidas con tu arte.
      </Typography>

      <OrdersTable orders={orders} />
    </Box>
  );
};

export default DreamSalonSection;
