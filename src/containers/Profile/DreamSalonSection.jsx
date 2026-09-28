import React, { useContext, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import OrdersContext from "../../context/Orders/OrdersContext";
import AuthContext from "../../context/Auth/AuthContext";
import OrdersTable from "../../components/Orders/OrdersTable";

const PRIMARY_PINK = "#E53888";

const DreamSalonSection = () => {
  const { usuario } = useContext(AuthContext);
  const { getOrdersUser, orders } = useContext(OrdersContext);

  // Carga de órdenes cuando el ID del usuario esté disponible
  useEffect(() => {
    if (usuario?.id) {
      getOrdersUser(usuario);
    }
  }, [usuario?.id]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Box
        sx={{
          p: { xs: 1, md: 2 },
          textAlign: "center",
        }}
      >
        {/* ÍCONO Y ENCABEZADO */}
        <Box
          sx={{
            display: "inline-flex",
            p: 1.5,
            borderRadius: "50%",
            backgroundColor: "#FFF1F2",
            color: PRIMARY_PINK,
            mb: 1.5,
          }}
        >
          <StorefrontOutlinedIcon sx={{ fontSize: 32 }} />
        </Box>

        <Typography
          variant='h5'
          sx={{
            mb: 1,
            fontWeight: 800,
            color: "#1F2937",
            fontSize: { xs: "1.35rem", md: "1.6rem" },
            letterSpacing: "-0.3px",
          }}
        >
          El Salón de Tus Sueños
        </Typography>

        {/* LÍNEA DIVISORA DECORATIVA */}
        <Box
          sx={{
            width: 40,
            height: 3,
            bgcolor: PRIMARY_PINK,
            borderRadius: 2,
            mx: "auto",
            mb: 2,
          }}
        />

        <Typography
          variant='body1'
          sx={{
            mb: 4,
            maxWidth: "580px",
            mx: "auto",
            color: "#4B5563",
            fontSize: { xs: "0.95rem", md: "1rem" },
            lineHeight: 1.6,
          }}
        >
          ¡Este espacio refleja tu visión! El éxito de tu negocio es nuestro
          mayor orgullo. Consulta aquí el historial de tus pedidos e insumos
          para seguir haciendo crecer tu arte. 💅✨
        </Typography>

        {/* TABLA DE PEDIDOS */}
        <Box
          sx={{
            backgroundColor: "#FAFAFA",
            borderRadius: "20px",
            p: { xs: 1.5, sm: 3 },
            border: "1px solid #F3F4F6",
          }}
        >
          <OrdersTable orders={orders} />
        </Box>
      </Box>
    </motion.div>
  );
};

export default DreamSalonSection;
