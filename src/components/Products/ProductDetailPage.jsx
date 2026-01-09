import { useContext, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Divider,
  Chip,
  ButtonGroup,
} from "@mui/material";
import Layout from "../Layout/Layout";
import { useParams } from "react-router-dom";
import ProductsContext from "../../context/Products/ProductsContext";
import { formatMexicanCurrency } from "../../utils/FormatCurrency";
import ProductDetailBanner from "../Banner/ProductDetailBanner";
import PinkSpinner from "../Loading/PinkSpinner";
import ProductCard from "./ProductCard";
import CartContext from "../../context/Cart/CartContext";
import AuthContext from "../../context/Auth/AuthContext";
import { useSnackbar } from "notistack";
const ProductDetailPage = () => {
  const params = useParams();
  const { id } = params;
  const { autenticado } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();

  const { product, getOneProduct } = useContext(ProductsContext);
  useEffect(() => {
    getOneProduct(id);
  }, [id]);
  const {
    cart = [],
    guest_cart = [],
    addItemCart,
    updateItemCart,
    deleteItemCart,
    addItemGuest,
    updateItemGuest,
    deleteItemGuest,
  } = useContext(CartContext);
  const itemInCart = autenticado
    ? product && cart.items.find((i) => i.productId === product.product.id)
    : product &&
      guest_cart.items.find((i) => i.product.product_id === product.product.id);

  // Helper para agregar al guest: mandamos objeto completo para localStorage/preview
  const handleAddGuest = (product) => {
    const guestItem = {
      product_id: product.id,
      quantity: 1,
      name: product.name,
      image: product.image?.url || product.image || null,
      price: Number(product.price),
    };
    return addItemGuest(guestItem);
  };

  // Helper para agregar cuando autenticado (API)
  const handleAddAuth = () => {
    return addItemCart({ product_id: product.product.id, quantity: 1 });
  };

  // Handler para click en "Agregar"
  const handleClickAddCart = (product) => {
    if (autenticado) {
      handleAddAuth(product);
      enqueueSnackbar("Producto agregado al carrito 💗", {
        variant: "success",
      });
    } else {
      handleAddGuest(product);
      enqueueSnackbar("Producto guardado para después 💗", {
        variant: "info",
      });
    }
  };

  // Decrement / Increment handlers (works for both guest and auth)
  const handleDecrease = () => {
    if (!itemInCart) return;

    const newQty = itemInCart.quantity - 1;

    if (autenticado) {
      if (newQty < 1) {
        deleteItemCart(itemInCart.product_id);
        enqueueSnackbar("Producto eliminado del carrito", {
          variant: "warning",
        });
      } else {
        updateItemCart({
          cart_id: itemInCart.id,
          product_id: product.id,
          quantity: newQty,
        });
        enqueueSnackbar("Cantidad actualizada", { variant: "info" });
      }
    } else {
      if (newQty < 1) {
        deleteItemGuest(itemInCart.product.product_id);
        enqueueSnackbar("Producto eliminado del carrito", {
          variant: "warning",
        });
      } else {
        updateItemGuest(itemInCart.product.product_id, newQty);
        enqueueSnackbar("Cantidad actualizada", { variant: "info" });
      }
    }
  };

  const handleIncrease = (item, product) => {
    if (!itemInCart) {
      handleClickAddCart(product);
      enqueueSnackbar("Producto agregado al carrito", { variant: "success" });
      return;
    }

    const newQty = itemInCart.quantity + 1;

    if (autenticado) {
      updateItemCart({
        cart_id: item.id,
        product_id: product.id,
        quantity: newQty,
      });
      enqueueSnackbar("Cantidad Actualizada", { variant: "success" });
    } else {
      updateItemGuest(product.id, newQty);
      enqueueSnackbar("Cantidad Actualizada", { variant: "success" });
    }
  };
  return (
    <Layout>
      {product ? (
        <Box>
          <Grid container spacing={2} sx={{ mt: 12, mb: 5 }}>
            <Grid size={12} padding='20px'>
              {/* 🔹 Banner superior */}
              <ProductDetailBanner />
            </Grid>
          </Grid>

          {/* 🔹 Sección principal */}
          <Grid
            container
            spacing={8}
            sx={{
              px: { xs: 2, md: 10 },
              pb: 10,
              alignItems: "center",
            }}
          >
            {/* 🖼️ Imagen del producto */}
            <Grid
              size={{ xs: 12, md: 6 }}
              display='flex'
              justifyContent='center'
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "480px",
                  borderRadius: "24px",
                  overflow: "hidden",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
                  background: "#D72E7A",
                  p: "6px",
                }}
              >
                <Box
                  component='img'
                  src={product.product.image}
                  alt={product.product.name}
                  sx={{
                    width: "100%",
                    height: "350px",
                    objectFit: "cover",
                    borderRadius: "20px",
                    transition: "transform .5s ease",
                    "&:hover": { transform: "scale(1.04)" },
                  }}
                />
              </Box>
            </Grid>

            {/* 📝 Información del producto */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant='h3'
                fontWeight={800}
                sx={{
                  color: "#2d0b45",
                  mb: 2,
                  fontSize: { xs: "1.8rem", md: "2.4rem" },
                }}
              >
                {product.product.name}
              </Typography>

              <Typography
                sx={{
                  color: "#584860",
                  mb: 3,
                  fontSize: { xs: "1rem", md: "1.15rem" },
                  lineHeight: 1.6,
                }}
              >
                {product.product.description}
              </Typography>

              <Divider sx={{ my: 4 }} />
              {/* 💸 Precio + botón */}
              <Box
                display='flex'
                alignItems='center'
                gap={3}
                flexWrap='wrap'
                mb={4}
              >
                <Typography
                  variant='h4'
                  fontWeight={800}
                  sx={{
                    color: "#2d0b45",
                    fontSize: { xs: "2rem", md: "2.4rem" },
                  }}
                >
                  {formatMexicanCurrency(Number(product.product.price))}
                </Typography>
              </Box>
              <Divider sx={{ my: 4 }} />

              {/* 🔢 Control de cantidad mejorado */}
              {itemInCart ? (
                <Box width='30%'>
                  <ButtonGroup
                    fullWidth
                    variant='outlined'
                    sx={{
                      borderRadius: "18px",
                      padding: "5px",
                      overflow: "hidden",
                      borderColor: "#d82e7a",
                      // bgcolor: "#FFE4EF", // Rosa pastel suave
                      "& .MuiButton-root": {
                        borderColor: "#d82e7a",
                      },
                    }}
                  >
                    <Button
                      onClick={handleDecrease}
                      sx={{
                        minWidth: 48,
                        color: "#d82e7a",
                        fontWeight: 800,
                        "&:hover": {
                          bgcolor: "#FFD6E8", // hover mas notable
                        },
                      }}
                      aria-label='disminuir cantidad'
                    >
                      -
                    </Button>

                    <Button
                      disabled
                      sx={{
                        fontWeight: 800,
                        color: "#d82e7a",
                        bgcolor: "#FFF0F6",
                        cursor: "default",
                      }}
                    >
                      {itemInCart.quantity}
                    </Button>

                    <Button
                      onClick={() =>
                        handleIncrease(itemInCart, product.product)
                      }
                      sx={{
                        minWidth: 48,
                        color: "#d82e7a",
                        fontWeight: 800,
                        "&:hover": {
                          bgcolor: "#FFD6E8",
                        },
                      }}
                      aria-label='aumentar cantidad'
                    >
                      +
                    </Button>
                  </ButtonGroup>
                </Box>
              ) : (
                <Button
                  fullWidth
                  variant='contained'
                  onClick={() => handleClickAddCart(product.product)}
                  sx={{
                    borderRadius: 2,
                    py: 1.1,
                    textTransform: "none",
                    fontWeight: 700,
                    background: "#D72E7A",
                    boxShadow: "0 8px 20px rgba(216,46,136,0.12)",
                    "&:hover": {
                      boxShadow: "0 12px 30px rgba(216,46,136,0.18)",
                    },
                  }}
                >
                  Agregar al carrito
                </Button>
              )}
            </Grid>
          </Grid>

          <Divider>
            <Chip
              label='Productos Relacionados'
              sx={{ backgroundColor: "#d72e7a", color: "white" }}
            />
          </Divider>
          {/* 🔹 Productos relacionados */}

          <Grid
            container
            spacing={2}
            sx={{
              mt: 4,
              maxWidth: "1200px",
              display: "flex",
              justifyContent: "center",
              mb: 7,
            }}
          >
            {product && product.related.length === 0 ? (
              <Typography>
                No se encontraron productos relacionados con este producto
              </Typography>
            ) : (
              product.related.map((p) => (
                <Grid size={{ xs: 12, md: 6, lg: 4 }} key={p.id}>
                  <ProductCard product={p} />
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      ) : (
        <PinkSpinner />
      )}
    </Layout>
  );
};

export default ProductDetailPage;
