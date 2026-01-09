import React, { useContext, useState } from "react";
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
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import ShippingAddressModal from "./ShippingAddressModal";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Link } from "react-router-dom";
const formatCurrency = (amount) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(amount);

const OrdersTable = ({ orders }) => {
  const { addCustomPayment, downloadEdoCtaDream } = useContext(OrdersContext);
  const [open, setOpen] = useState(false);
  const handleClickOpenModalAddress = () => {
    setOpen(true);
  };
  const handleCloseAddressModal = () => {
    setOpen(false);
  };
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
    <>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "0px 6px 20px rgba(0,0,0,0.06)",
          borderRadius: 3,
          overflowX: "auto",
          "&::-webkit-scrollbar": {
            height: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#E53888",
            borderRadius: 8,
          },
        }}
      >
        <Table sx={{ minWidth: 800, overflowX: "auto" }}>
          <TableHead>
            <TableRow sx={{ bgcolor: "#FFF0F6" }}>
              {[
                "ID Pedido",
                "Monto Total",
                "Pagado",
                "Pendiente",
                "Fecha Inicio",
                "Vencimiento",
                "Estado",
                "Acciones",
              ].map((header) => (
                <TableCell
                  key={header}
                  sx={{
                    fontWeight: "bold",
                    color: "#D82F7A",
                    fontSize: "0.9rem",
                    textAlign: "center",
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.id}
                sx={{
                  "&:hover": {
                    bgcolor: "#FFF7FB",
                    boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
                  },
                  transition: "0.2s ease",
                }}
              >
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    color: "#333",
                    textAlign: "center",
                  }}
                >
                  #{order.id}
                </TableCell>

                <TableCell sx={{ textAlign: "center" }}>
                  {formatCurrency(order.totalAmount)}
                </TableCell>

                <TableCell
                  sx={{
                    color: "success.main",
                    fontWeight: 600,
                    textAlign: "center",
                  }}
                >
                  {formatCurrency(order.paidAmount)}
                </TableCell>

                <TableCell
                  sx={{
                    color: "error.main",
                    fontWeight: 600,
                    textAlign: "center",
                  }}
                >
                  {formatCurrency(order.remainingAmount)}
                </TableCell>

                <TableCell sx={{ textAlign: "center" }}>
                  {order.startDate}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {order.dueDate}
                </TableCell>

                <TableCell sx={{ textAlign: "center" }}>
                  <Typography
                    sx={{
                      display: "inline-block",
                      px: 1,
                      py: 0.5,
                      borderRadius: "10px",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      bgcolor:
                        order.status === "pendiente"
                          ? "warning.light"
                          : "success.light",
                      color:
                        order.status === "pendiente"
                          ? "warning.dark"
                          : "success.dark",
                    }}
                  >
                    {order.status.toUpperCase()}
                  </Typography>
                </TableCell>

                <TableCell align='center'>
                  <Box
                    sx={{ display: "flex", gap: 1, justifyContent: "center" }}
                  >
                    {order.status === "activo" && (
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
                        sx={{
                          textTransform: "none",
                          bgcolor: "#E53888",
                          "&:hover": { bgcolor: "#D62B78" },
                        }}
                      >
                        Abonar
                      </Button>
                    )}
                    <Link to={`/detalle-orden/${order.id}`}>
                      <Button
                        variant='outlined'
                        size='small'
                        startIcon={<RemoveRedEyeIcon />}
                        sx={{
                          textTransform: "none",
                          borderColor: "#E53888",
                          color: "#E53888",
                          bgcolor: "#FFF0F8",
                          "&:hover": {
                            borderColor: "#D62B78",
                            color: "#D62B78",
                            bgcolor: "#FFE4F1",
                          },
                        }}
                      >
                        Detalle
                      </Button>
                    </Link>
                    <Button
                      variant='outlined'
                      size='small'
                      startIcon={<CloudDownloadIcon />}
                      onClick={() => downloadEdoCtaDream(order.id)}
                      sx={{
                        textTransform: "none",
                        borderColor: "#E53888",
                        color: "#E53888",
                        bgcolor: "#FFF0F8",
                        "&:hover": {
                          borderColor: "#D62B78",
                          color: "#D62B78",
                          bgcolor: "#FFE4F1",
                        },
                      }}
                    >
                      Edo. Cta
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ShippingAddressModal open={open} onClose={handleCloseAddressModal} />
    </>
  );
};

export default OrdersTable;
