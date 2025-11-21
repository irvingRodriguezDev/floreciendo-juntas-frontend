import { Box, Typography } from "@mui/material";
import OrdersContext from "../../context/Orders/OrdersContext";
import { useContext, useEffect } from "react";
import AuthContext from "../../context/Auth/AuthContext";
import OrdersTable from "../../components/Orders/OrdersTable";
const PRIMARY_PINK = "#E53888";
const LIGHT_ACCENT = "#FFF8FB"; // Rosa muy claro para el fondo

const DreamSalonSection = () => {
  const { usuario } = useContext(AuthContext);
  const { getOrdersUser, orders } = useContext(OrdersContext);
  useEffect(() => {
    getOrdersUser(usuario);
  }, []);
  return (
    <Box
      sx={{
        p: 4,
        bgcolor: LIGHT_ACCENT,
        borderRadius: "12px",
        border: `2px dashed ${PRIMARY_PINK}`,
        textAlign: "center",
      }}
    >
      <Typography
        variant='h5'
        color={PRIMARY_PINK}
        sx={{ mb: 1, fontWeight: 600 }}
      >
        El Salón de Tus Sueños
      </Typography>

      <Typography variant='body1' color='text.secondary' sx={{ mb: 3 }}>
        ¡Este espacio refleja tu visión! El éxito de tu negocio es nuestro mayor
        orgullo. Sigue creciendo y transformando vidas con tu arte.
      </Typography>
      <OrdersTable orders={orders} />
    </Box>
  );
};

export default DreamSalonSection;
