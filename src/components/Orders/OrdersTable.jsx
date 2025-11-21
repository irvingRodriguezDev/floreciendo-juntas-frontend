import React, { useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography,
} from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import OrdersContext from "../../context/Orders/OrdersContext";
// Simulación de funciones de manejo de acciones

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(amount);
};
const OrdersTable = ({ orders }) => {
  const { addCustomPayment, downloadEdoCtaDream } = useContext(OrdersContext);
  if (!orders || orders.length === 0) {
    return (
      <Typography
        variant='h6'
        color='text.secondary'
        sx={{ p: 3, textAlign: "center" }}
      >
        No hay pedidos disponibles.
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
      <Table sx={{ minWidth: 700 }} aria-label='tabla de pedidos'>
        {/* Encabezados de la Tabla */}
        <TableHead>
          <TableRow sx={{ bgcolor: "#f5f5f5" }}>
            <TableCell>ID Pedido</TableCell>
            <TableCell>Monto Total</TableCell>
            <TableCell>Pagado</TableCell>
            <TableCell>Pendiente</TableCell>
            <TableCell>Fecha Inicio</TableCell>
            <TableCell>Vencimiento</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell align='center'>Acciones</TableCell>
          </TableRow>
        </TableHead>

        {/* Cuerpo de la Tabla */}
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component='th' scope='row' sx={{ fontWeight: "bold" }}>
                #{order.id}
              </TableCell>
              <TableCell>{formatCurrency(order.totalAmount)}</TableCell>
              <TableCell sx={{ color: "success.main" }}>
                {formatCurrency(order.paidAmount)}
              </TableCell>
              <TableCell sx={{ color: "error.main", fontWeight: "bold" }}>
                {formatCurrency(order.remainingAmount)}
              </TableCell>
              <TableCell>{order.startDate}</TableCell>
              <TableCell>{order.dueDate}</TableCell>
              <TableCell>
                <Typography
                  variant='caption'
                  sx={{
                    bgcolor:
                      order.status === "pendiente"
                        ? "warning.light"
                        : "success.light",
                    color:
                      order.status === "pendiente"
                        ? "warning.dark"
                        : "success.dark",
                    borderRadius: 1,
                    p: 0.5,
                    fontWeight: "bold",
                  }}
                >
                  {order.status.toUpperCase()}
                </Typography>
              </TableCell>

              {/* Columna de Acciones */}
              <TableCell align='center'>
                <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                  <Button
                    variant='contained'
                    size='small'
                    startIcon={<PaymentIcon />}
                    onClick={() =>
                      addCustomPayment(
                        order.id,
                        order.totalAmount,
                        order.paidAmount,
                        order.remainingAmount
                      )
                    }
                    sx={{ textTransform: "none", bgcolor: "#D82F7A" }}
                  >
                    Abonar
                  </Button>
                  <Button
                    variant='outlined'
                    size='small'
                    startIcon={<CloudDownloadIcon />}
                    onClick={() => downloadEdoCtaDream(order.id)}
                    sx={{
                      textTransform: "none",
                      borderColor: "#D82F7A",
                      bgcolor: "#FDE6F0",
                      color: "#D82F7A",
                    }}
                  >
                    Edo. Cuenta
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrdersTable;
