import React, { useContext, useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import {
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Divider,
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Stack,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import MethodGet from "../../config/Service";
import DownloadIcon from "@mui/icons-material/Download";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import OrdersContext from "../../context/Orders/OrdersContext";
import { formatMexicanCurrency } from "../../utils/FormatCurrency";
import ShippingAddressModal from "./ShippingAddressModal";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PinkSpinner from "../Loading/PinkSpinner";
const DetailOrders = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { downloadEdoCtaDream, addCustomPayment, payShippingCost } =
    useContext(OrdersContext);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const pinkColor = "#E53888";

  useEffect(() => {
    MethodGet(`/orders/${id}`)
      .then((res) => {
        setOrder(res.data.order);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
          <PinkSpinner label='Consultando información' />
        </Box>
      </Layout>
    );
  }

  if (!order) {
    return (
      <Layout>
        <Typography>No se encontró la orden.</Typography>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* 🌸 BANNER SUPERIOR ESTILO FLORECIENDO JUNTAS */}
      <Box
        sx={{
          width: "100%",
          py: 6,
          px: 3,
          mb: 4,
          mt: 10,
          borderRadius: "0 0 40px 40px",
          background: `linear-gradient(135deg, #FEDAEB 0%, #FEDAEB 100%)`,
          color: "white",
          textAlign: "center",
          boxShadow: "0px 10px 25px rgba(0,0,0,0.15)",
        }}
      >
        <Typography
          variant='h4'
          fontWeight='bold'
          sx={{ textShadow: "0px 2px 4px rgba(0,0,0,0.3)" }}
        >
          Detalle de la Orden #{order.id}
        </Typography>

        <Typography sx={{ mt: 1, opacity: 0.9 }}>
          Revisá tu compra, pagos, historial y estado general.
        </Typography>
      </Box>

      <Grid
        container
        spacing={3}
        sx={{
          padding: "25px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* ACCIONES */}
        <Grid size={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Stack direction='row' spacing={2}>
              <Button
                variant='contained'
                startIcon={<DownloadIcon />}
                onClick={() => downloadEdoCtaDream(id)}
                sx={{
                  background: pinkColor,
                  color: "#FFF",
                  textTransform: "none",
                  borderRadius: "12px",
                  px: 3,
                  py: 1,
                  boxShadow: "0px 4px 12px rgba(255, 138, 201, 0.45)",
                }}
              >
                Estado de Cuenta
              </Button>
              {order.paidAmount !== order.totalAmount && (
                <Button
                  variant='outlined'
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={() => addCustomPayment(id)}
                  sx={{
                    borderColor: "#E63988",
                    color: "#E63988",
                    textTransform: "none",
                    borderRadius: "12px",
                    px: 3,
                    py: 1,
                    borderWidth: 2,
                  }}
                >
                  Añadir Pago
                </Button>
              )}
              {order.paidAmount === order.totalAmount && (
                <>
                  {order.shippingCost > 0 && !order.shippingPaid && (
                    <Button
                      variant='outlined'
                      startIcon={
                        <>
                          <AttachMoneyIcon /> <LocalShippingIcon />
                        </>
                      }
                      onClick={() =>
                        payShippingCost(order.id, order.shippingCost)
                      }
                      sx={{
                        borderColor: "#E63988",
                        color: "#E63988",
                        textTransform: "none",
                        borderRadius: "12px",
                        px: 3,
                        py: 1,
                        borderWidth: 2,
                      }}
                    >
                      Pagar Envío (
                      {formatMexicanCurrency(Number(order.shippingCost))})
                    </Button>
                  )}
                </>
              )}
            </Stack>
          </Box>

          <Divider />
        </Grid>

        {/* INFO GENERAL */}
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
          <Paper
            elevation={6}
            sx={{
              p: 3,
              borderRadius: 5,
              borderLeft: `6px solid ${pinkColor}`,
              background: "white",
              boxShadow: "0px 4px 18px rgba(0,0,0,0.1)",
            }}
          >
            <Typography
              variant='h6'
              fontWeight='bold'
              sx={{ mb: 2, color: pinkColor }}
            >
              Información General
            </Typography>

            <Box sx={{ mb: 1 }}>
              <Typography>
                <strong>Estado:</strong>{" "}
                <Chip
                  label={order.status}
                  color={order.status === "activo" ? "success" : "default"}
                />
              </Typography>
            </Box>

            <Typography sx={{ mb: 1 }}>
              <strong>Fecha inicio:</strong> {order.startDate}
            </Typography>
            <Typography sx={{ mb: 1 }}>
              <strong>Fecha límite:</strong> {order.dueDate}
            </Typography>
            <Typography sx={{ mb: 1 }}>
              <strong>Costo envío:</strong>{" "}
              {formatMexicanCurrency(Number(order.shippingCost))}
            </Typography>
            <Typography sx={{ mb: 1, fontWeight: 600 }}>
              Envío pagado:
            </Typography>

            <Chip
              label={order.shippingPaid ? "Sí" : "No"}
              color={order.shippingPaid ? "success" : "error"}
              variant='filled'
              sx={{
                fontWeight: 600,
                px: 1.5,
                py: 0.5,
                fontSize: "0.9rem",
              }}
            />
          </Paper>
        </Grid>

        {/* RESUMEN */}
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
          <Paper
            elevation={6}
            sx={{
              p: 3,
              borderRadius: 5,
              borderLeft: `6px solid ${pinkColor}`,
              boxShadow: "0px 4px 18px rgba(0,0,0,0.1)",
            }}
          >
            <Typography
              variant='h6'
              fontWeight='bold'
              sx={{ mb: 2, color: pinkColor }}
            >
              Resumen de Pagos
            </Typography>

            <Typography sx={{ mb: 1 }}>
              <strong>Total de la orden:</strong>{" "}
              {formatMexicanCurrency(Number(order.totalAmount))}
            </Typography>
            <Typography sx={{ mb: 1 }}>
              <strong>Pagado:</strong>{" "}
              <span style={{ color: "green", fontWeight: "bold" }}>
                {formatMexicanCurrency(Number(order.paidAmount))}
              </span>
            </Typography>
            <Typography sx={{ mb: 1 }}>
              <strong>Restante:</strong>{" "}
              <span style={{ color: "red", fontWeight: "bold" }}>
                {formatMexicanCurrency(Number(order.remainingAmount))}
              </span>
            </Typography>
          </Paper>
        </Grid>

        {/**ENVIO */}
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
          <Paper
            elevation={6}
            sx={{
              p: 3,
              borderRadius: 5,
              borderLeft: `6px solid ${pinkColor}`,
              boxShadow: "0px 4px 18px rgba(0,0,0,0.1)",
            }}
          >
            <Typography
              variant='h6'
              fontWeight='bold'
              sx={{ mb: 2, color: pinkColor }}
            >
              Dirección de envio
            </Typography>

            <Typography sx={{ mb: 1 }}>
              <strong>Recibe:</strong> {order.address.recipientName}
            </Typography>
            <Typography sx={{ mb: 1 }}>
              <strong>Direccion:</strong>{" "}
              <span>
                {order.address.street + " " + order.address.number},{" "}
                {order.address.city}, {order.address.state},{" "}
                {order.address.neighborhood}, {order.address.zipCode},{" "}
                {order.address.instructions}
              </span>
            </Typography>
            <Box>
              <Typography
                variant='h6'
                fontWeight='bold'
                sx={{ mb: 2, color: pinkColor }}
              >
                Detalles de envio
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                  <Typography>
                    <strong>Nº Guia:</strong> {order.trackingNumber}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                  <strong>Paqueteria:</strong> {order.carrier}
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                  <Link
                    to={order.trackingUrl}
                    target='__blank'
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      variant='contanied'
                      fullWidth
                      size='small'
                      sx={{
                        bgcolor: "#E53888",
                        borderRadius: "16px",
                        color: "white",
                      }}
                    >
                      Rastrear
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>

        {/* PRODUCTOS */}
        <Grid size={12}>
          <Paper
            elevation={6}
            sx={{
              p: 3,
              borderRadius: 5,
              mt: 2,
              boxShadow: "0px 4px 18px rgba(0,0,0,0.1)",
              overflow: "hidden",
              borderLeft: `6px solid ${pinkColor}`,
            }}
          >
            <Typography
              variant='h6'
              fontWeight='bold'
              sx={{
                mb: 2,
                color: pinkColor,
              }}
            >
              Productos Comprados
            </Typography>

            <TableContainer
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }}
            >
              <Table>
                <TableHead>
                  <TableRow
                    sx={{
                      background: `${pinkColor}22`,
                    }}
                  >
                    <TableCell sx={{ fontWeight: "bold", color: pinkColor }}>
                      Producto
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: pinkColor }}>
                      Cantidad
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: pinkColor }}>
                      Unitario
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: pinkColor }}>
                      Subtotal
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {order.items.map((item, index) => (
                    <TableRow
                      key={item.id}
                      sx={{
                        background: index % 2 === 0 ? "white" : "#fff6fb",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          background: "#ffe0f0",
                          transform: "scale(1.01)",
                          boxShadow: "0 4px 12px rgba(255, 100, 180, 0.25)",
                        },
                      }}
                    >
                      <TableCell>
                        <Typography fontWeight='bold'>
                          {item.product.name}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={item.quantity}
                          sx={{
                            background: `${pinkColor}33`,
                            color: pinkColor,
                            fontWeight: "bold",
                          }}
                        />
                      </TableCell>

                      <TableCell sx={{ fontWeight: "bold" }}>
                        {formatMexicanCurrency(Number(item.unitPrice))}
                      </TableCell>

                      <TableCell sx={{ fontWeight: "bold", color: pinkColor }}>
                        {formatMexicanCurrency(Number(item.subtotal))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* 🌸 HISTORIA VISUAL / TIMELINE */}
        <Grid size={12}>
          <Paper
            elevation={6}
            sx={{
              p: 3,
              borderRadius: 5,
              mt: 4,
              boxShadow: "0px 4px 18px rgba(0,0,0,0.1)",
            }}
          >
            <Typography
              variant='h6'
              fontWeight='bold'
              sx={{
                mb: 3,
                color: pinkColor,
              }}
            >
              Historial de Pagos
            </Typography>

            <Grid container spacing={3}>
              {order.payments.map((pago) => (
                <Grid
                  size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 3 }}
                  key={pago.id}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      p: 2.5,
                      borderRadius: 4,
                      display: "flex",
                      gap: 2,
                      alignItems: "center",
                      background: "#FEE8F3",
                      borderLeft: `6px solid ${pinkColor}`,
                      boxShadow: "0 4px 14px rgba(0,0,0,0.07)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 6px 20px rgba(255, 130, 190, 0.22)",
                      },
                    }}
                  >
                    {/* Icono floral */}

                    {/* Información */}
                    <Box>
                      <Typography
                        fontWeight='bold'
                        sx={{ color: pinkColor, fontSize: "1.1rem" }}
                      >
                        Pago de: {formatMexicanCurrency(Number(pago.amount))}
                      </Typography>

                      <Typography variant='body2'>
                        Fecha: {pago.paymentDate}
                      </Typography>
                      <Typography variant='body2'>
                        Método: {pago.paymentMethod}
                      </Typography>
                      <Typography variant='body2'>
                        Ref: {pago.reference}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <ShippingAddressModal open={open} onClose={handleClose} />
    </Layout>
  );
};

export default DetailOrders;
