import React, { useEffect, useState, useCallback, useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  Box,
  Skeleton,
  Typography,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { shopifyFetch } from "../Store/ShopifyClient";
import { ORDERS_QUERY } from "./grapql/Orders";
import AuthContext from "../../context/Auth/AuthContext";

const OrdersShopifySection = () => {
  const { logoutGlobal } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    const customerToken = localStorage.getItem("customerAccessToken");

    if (!customerToken) {
      logoutGlobal();
      return;
    }

    try {
      const response = await shopifyFetch(ORDERS_QUERY, {
        customerAccessToken: customerToken,
      });

      if (!response?.data?.customer) {
        throw new Error("Invalid Shopify session");
      }

      const cleanOrders = response.data.customer.orders.edges.map(
        (edge) => edge.node
      );

      setOrders(cleanOrders);
    } catch (error) {
      console.error("Shopify Orders Error:", error);
      logoutGlobal();
    } finally {
      setLoading(false);
    }
  }, [logoutGlobal]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleWhatsAppNotify = (order) => {
    const phoneNumber = "5215554549043";
    const message = `¡Hola! Quiero enviar el comprobante de mi pedido *#${order.orderNumber}* por un total de ${order.totalPrice.amount} ${order.totalPrice.currencyCode}.`;

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  // 🌸 Loading
  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} height={70} sx={{ mb: 2, borderRadius: 4 }} />
        ))}
      </Box>
    );
  }

  // 🌷 Sin pedidos
  if (orders.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 10 }}>
        <Typography variant='h6' color='text.secondary'>
          Aún no tienes pedidos 🌸
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Cuando realices una compra, aparecerá aquí
        </Typography>
      </Box>
    );
  }

  // 🌺 Tabla
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid #F5C2D6",
        overflowX: "auto",
      }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              background: "linear-gradient(90deg, #FADADD 0%, #F7BED3 100%)",
            }}
          >
            {["# Orden", "Fecha", "Total", "Estatus", "Acciones"].map(
              (title) => (
                <TableCell
                  key={title}
                  sx={{
                    fontWeight: 600,
                    color: "#7A1C4A",
                    textAlign: "center",
                  }}
                >
                  {title}
                </TableCell>
              )
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {orders.map((order) => {
            const isPending = order.financialStatus === "PENDING";

            return (
              <TableRow
                key={order.id}
                sx={{
                  "&:hover": {
                    backgroundColor: "#FFF1F7",
                  },
                  textAlign: "center",
                }}
              >
                <TableCell sx={{ textAlign: "center" }}>
                  <Typography fontWeight={600}>#{order.orderNumber}</Typography>
                </TableCell>

                <TableCell sx={{ textAlign: "center" }}>
                  {new Date(order.processedAt).toLocaleDateString()}
                </TableCell>

                <TableCell sx={{ textAlign: "center" }}>
                  <Typography fontWeight={500}>
                    ${order.totalPrice.amount} {order.totalPrice.currencyCode}
                  </Typography>
                </TableCell>

                <TableCell sx={{ textAlign: "center" }}>
                  <Chip
                    label={isPending ? "Esperando pago" : "Pagado"}
                    size='small'
                    sx={{
                      bgcolor: isPending ? "#FFE4EC" : "#E6F7ED",
                      color: isPending ? "#B71C5A" : "#2E7D32",
                      fontWeight: 500,
                    }}
                  />
                </TableCell>

                <TableCell sx={{ textAlign: "center" }}>
                  {isPending ? (
                    <Button
                      variant='contained'
                      startIcon={<WhatsAppIcon />}
                      onClick={() => handleWhatsAppNotify(order)}
                      sx={{
                        borderRadius: 5,
                        bgcolor: "#26D366",
                        textTransform: "none",
                        fontWeight: 500,
                        px: 2.5,
                        "&:hover": {
                          bgcolor: "#1EBE5D",
                        },
                      }}
                    >
                      Enviar comprobante
                    </Button>
                  ) : (
                    <Typography color='success.main' fontWeight={500}>
                      Completado ✨
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrdersShopifySection;
