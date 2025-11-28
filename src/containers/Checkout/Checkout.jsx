import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import Layout from "../../components/Layout/Layout";
import CartContext from "../../context/Cart/CartContext";
import AuthContext from "../../context/Auth/AuthContext";
import OrdersContext from "../../context/Orders/OrdersContext";
import AddressSelect from "../SelectOptions/AddressSelect";
import BagIcon from "../../components/icons/BagIcon";
import { formatMexicanCurrency } from "../../utils/FormatCurrency";
// IMPORTA TU CONTEXTO REAL
export default function Checkout() {
  const {
    cart,
    guest_cart,
    getUserCart,
    clearCart,
    increase,
    decrease,
    removeItem,
  } = useContext(CartContext);
  const { autenticado } = useContext(AuthContext);
  const { createOrder } = useContext(OrdersContext);
  const [address, setAddress] = useState(null);
  const detectarCambiosAddress = (value) => {
    setAddress(value.value);
  };

  // ejemplo temporal (bórralo cuando conectes tu contexto)
  useEffect(() => {
    if (autenticado) {
      getUserCart();
    }
  }, [autenticado]);
  // Seleccionar carrito correcto
  const activeCart = autenticado ? cart : guest_cart;

  // Calcular total
  const total = useMemo(() => {
    if (!activeCart || !Array.isArray(activeCart.items)) return 0;

    return activeCart.items.reduce((sum, item) => {
      const price = Number(item.unitPrice || item.product?.price || 0);
      return sum + price * item.quantity;
    }, 0);
  }, [activeCart]);

  return (
    <Layout>
      <Grid
        sx={{
          width: "100%",
          backgroundColor: "#fde7ef",
          pt: { xs: 12, md: 4, lg: 12 },
          pl: { xs: 2, md: 3, lg: 12 },
          pr: { xs: 2, md: 3, lg: 12 },
          pb: { xs: 2, md: 3, lg: 12 },
        }}
      >
        {/* ENCABEZADO */}
        <Grid size={12} textAlign='center' mb={2}>
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <BagIcon width={80} />
          </motion.div>

          <Typography
            variant='h4'
            sx={{
              fontWeight: "bold",
              color: "#d63384",
              mt: 1,
            }}
          >
            Tu Carrito
          </Typography>

          <Typography sx={{ color: "#6c757d", mt: 1 }}>
            Revisa tus productos antes de finalizar tu compra 🌸
          </Typography>
        </Grid>

        <Grid container spacing={2}>
          {/* LISTA DEL CARRITO */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Card
              sx={{
                borderRadius: "18px",
                boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
              }}
            >
              <CardContent>
                {activeCart?.items?.length === 0 ? (
                  <Typography
                    align='center'
                    sx={{
                      py: 6,
                      fontSize: 18,
                      color: "#6c757d",
                    }}
                  >
                    Tu carrito está vacío.
                  </Typography>
                ) : (
                  activeCart &&
                  activeCart.items.map((item) => (
                    <Box key={item.id}>
                      <Grid container spacing={2} alignItems='center' py={2}>
                        <Grid size={{ xs: 12, sm: 4, xl: 3 }}>
                          <CardMedia
                            component='img'
                            image={item.product.image.url}
                            sx={{
                              width: "100%",
                              height: 150,
                              objectFit: "cover",
                              borderRadius: 3,
                            }}
                          />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 8, xl: 6 }}>
                          <Typography
                            sx={{
                              fontWeight: "bold",
                              color: "#d63384",
                              fontSize: 18,
                            }}
                          >
                            {item.product.name}
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: "",
                              color: "gray",
                              fontSize: 12,
                            }}
                          >
                            {item.product.description}
                          </Typography>
                          <Typography
                            sx={{
                              color: "#6c757d",
                              mt: 0.5,
                            }}
                          >
                            P.U: {formatMexicanCurrency(Number(item.unitPrice))}
                          </Typography>

                          {/* BOTONES CANTIDAD */}
                          <Box
                            mt={2}
                            display='flex'
                            alignItems='center'
                            gap={1}
                          >
                            <IconButton
                              size='small'
                              sx={{
                                border: "1px solid #d63384",
                                color: "#d63384",
                              }}
                              onClick={() =>
                                decrease(
                                  item.id,
                                  autenticado
                                    ? item.productId
                                    : item.product.product_id,
                                  autenticado
                                )
                              }
                              disabled={item.quantity <= 1}
                            >
                              <RemoveIcon />
                            </IconButton>

                            <Typography>{item.quantity}</Typography>

                            <IconButton
                              size='small'
                              sx={{
                                border: "1px solid #d63384",
                                color: "#d63384",
                              }}
                              onClick={() =>
                                increase(
                                  item.id,
                                  autenticado
                                    ? item.productId
                                    : item.product.product_id,
                                  autenticado
                                )
                              }
                            >
                              <AddIcon />
                            </IconButton>
                          </Box>
                        </Grid>

                        {/* PRECIO / ELIMINAR */}
                        <Grid size={{ xs: 12, lg: 3 }} textAlign='right'>
                          <Typography
                            sx={{
                              fontWeight: "bold",
                              color: "#d63384",
                            }}
                          >
                            {formatMexicanCurrency(
                              Number(item.unitPrice * item.quantity)
                            )}
                          </Typography>

                          <IconButton
                            color='error'
                            onClick={() =>
                              removeItem(
                                item.id,
                                autenticado
                                  ? item.productId
                                  : item.product.product_id,
                                autenticado
                              )
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      </Grid>

                      <Divider />
                    </Box>
                  ))
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* RESUMEN */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                borderRadius: 4,
                padding: 3,
                boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
              }}
            >
              <Typography
                variant='h6'
                sx={{ fontWeight: "bold", color: "#d63384", mb: 2 }}
              >
                Resumen de pago
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box>
                <Typography>Direccion de envio:</Typography>
                <AddressSelect
                  detectarCambiosAddress={detectarCambiosAddress}
                />
              </Box>
              <Divider sx={{ my: 2 }} />

              <Box display='flex' justifyContent='space-between' sx={{ mb: 2 }}>
                <Typography sx={{ color: "#6c757d" }}>Subtotal</Typography>
                <Typography>{formatMexicanCurrency(Number(total))}</Typography>
              </Box>

              <Box display='flex' justifyContent='space-between' sx={{ mb: 2 }}>
                <Typography sx={{ color: "#6c757d" }}>Envío</Typography>
                <Typography sx={{ color: "#6c757d" }}>
                  Se calcula al concluir el plan de pagos
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box display='flex' justifyContent='space-between' mb={3}>
                <Typography variant='h6' sx={{ fontWeight: "bold" }}>
                  Total
                </Typography>
                <Typography variant='h6' sx={{ fontWeight: "bold" }}>
                  {formatMexicanCurrency(Number(total))}
                </Typography>
              </Box>

              <Button
                fullWidth
                onClick={async () => {
                  await createOrder(address); // espera a que termine
                }}
                variant='contained'
                sx={{
                  backgroundColor: "#d63384",
                  ":hover": { backgroundColor: "#bf2b76" },
                  paddingY: 1.5,
                  borderRadius: 3,
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Proceder al pago
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}
