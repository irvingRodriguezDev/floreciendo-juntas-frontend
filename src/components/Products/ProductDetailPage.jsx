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
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { autenticado } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();

  const { product, getOneProduct } = useContext(ProductsContext);

  useEffect(() => {
    if (id) {
      getOneProduct(id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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

  const rawProduct = product?.product;

  // Identificar si el producto actual ya se encuentra en el carrito
  const itemInCart = autenticado
    ? rawProduct && cart?.items?.find((i) => i.productId === rawProduct.id)
    : rawProduct &&
      guest_cart?.items?.find((i) => i.product.product_id === rawProduct.id);

  const handleAddGuest = (prodData) => {
    const guestItem = {
      product_id: prodData.id,
      quantity: 1,
      name: prodData.name,
      image: prodData.image?.url || prodData.image || null,
      price: Number(prodData.price),
    };
    return addItemGuest(guestItem);
  };

  const handleAddAuth = (prodData) => {
    return addItemCart({ product_id: prodData.id, quantity: 1 });
  };

  const handleClickAddCart = (prodData) => {
    if (autenticado) {
      handleAddAuth(prodData);
      enqueueSnackbar("Producto agregado al carrito 💗", {
        variant: "success",
      });
    } else {
      handleAddGuest(prodData);
      enqueueSnackbar("Producto guardado para después 💗", { variant: "info" });
    }
  };

  const handleDecrease = () => {
    if (!itemInCart || !rawProduct) return;

    const newQty = itemInCart.quantity - 1;

    if (autenticado) {
      const targetCartId = itemInCart.id;
      if (newQty < 1) {
        deleteItemCart(rawProduct.id);
        enqueueSnackbar("Producto eliminado del carrito", {
          variant: "warning",
        });
      } else {
        updateItemCart({
          cart_id: targetCartId,
          product_id: rawProduct.id,
          quantity: newQty,
        });
        enqueueSnackbar("Cantidad actualizada", { variant: "info" });
      }
    } else {
      if (newQty < 1) {
        deleteItemGuest(rawProduct.id);
        enqueueSnackbar("Producto eliminado del carrito", {
          variant: "warning",
        });
      } else {
        updateItemGuest(rawProduct.id, newQty);
        enqueueSnackbar("Cantidad actualizada", { variant: "info" });
      }
    }
  };

  const handleIncrease = () => {
    if (!rawProduct) return;

    if (!itemInCart) {
      handleClickAddCart(rawProduct);
      return;
    }

    const newQty = itemInCart.quantity + 1;

    if (autenticado) {
      updateItemCart({
        cart_id: itemInCart.id,
        product_id: rawProduct.id,
        quantity: newQty,
      });
    } else {
      updateItemGuest(rawProduct.id, newQty);
    }
    enqueueSnackbar("Cantidad actualizada 💗", { variant: "success" });
  };

  const imageUrl =
    rawProduct?.image?.url ||
    rawProduct?.image ||
    "https://placehold.co/600x600/FFF0F5/D72E79?text=Producto";

  return (
    <Layout>
      {rawProduct ? (
        <Box sx={{ pb: 8 }}>
          <Grid container spacing={2} sx={{ mt: { xs: 8, md: 10 }, mb: 4 }}>
            <Grid size={12} padding='20px'>
              <ProductDetailBanner />
            </Grid>
          </Grid>

          {/* 🌸 Ficha Principal del Producto */}
          <Grid
            container
            spacing={{ xs: 4, md: 8 }}
            sx={{
              maxWidth: "1300px",
              margin: "0 auto",
              px: { xs: 2.5, sm: 4, md: 6 },
              pb: 8,
              alignItems: "center",
            }}
          >
            {/* 🖼️ Imagen con Glass Effect */}
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
                  borderRadius: "28px",
                  overflow: "hidden",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.9)",
                  boxShadow: "0 20px 40px -15px rgba(163, 11, 93, 0.15)",
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  component='img'
                  src={imageUrl}
                  alt={rawProduct.name || "Producto"}
                  sx={{
                    width: "100%",
                    maxHeight: "420px",
                    objectFit: "contain",
                    borderRadius: "20px",
                    transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                    "&:hover": { transform: "scale(1.03)" },
                  }}
                />
              </Box>
            </Grid>

            {/* 📝 Detalles del Producto */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant='h3'
                sx={{
                  fontWeight: 900,
                  color: "#2C1820",
                  mb: 2,
                  fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.6rem" },
                  lineHeight: 1.2,
                }}
              >
                {rawProduct.name}
              </Typography>

              <Typography
                sx={{
                  color: "#616161",
                  mb: 3,
                  fontSize: { xs: "0.95rem", md: "1.05rem" },
                  lineHeight: 1.7,
                }}
              >
                {rawProduct.description ||
                  "Sin descripción disponible para este producto."}
              </Typography>

              <Divider
                sx={{ my: 3, borderColor: "rgba(215, 46, 121, 0.12)" }}
              />

              {/* 💸 Precio y Estado de Stock */}
              <Box
                display='flex'
                alignItems='baseline'
                gap={2}
                flexWrap='wrap'
                mb={3}
              >
                <Typography
                  variant='h4'
                  sx={{
                    fontWeight: 900,
                    color: "#D72E79",
                    fontSize: { xs: "2.2rem", md: "2.6rem" },
                  }}
                >
                  {formatMexicanCurrency(Number(rawProduct.price || 0))}
                </Typography>
                <Typography
                  variant='body1'
                  sx={{
                    textDecoration: "line-through",
                    color: "#A1A1AA",
                    fontWeight: 600,
                  }}
                >
                  {formatMexicanCurrency(Number(rawProduct.price || 0) * 1.25)}
                </Typography>
              </Box>

              <Divider
                sx={{ my: 3, borderColor: "rgba(215, 46, 121, 0.12)" }}
              />

              {/* 🎛️ Control de Cantidad y Acción Principal */}
              <Box sx={{ maxWidth: { xs: "100%", sm: "320px" } }}>
                {itemInCart ? (
                  <ButtonGroup
                    fullWidth
                    sx={{
                      borderRadius: "50px",
                      overflow: "hidden",
                      border: "1.5px solid #D72E79",
                      backgroundColor: "#FFF0F6",
                      p: 0.5,
                    }}
                  >
                    <Button
                      onClick={handleDecrease}
                      sx={{
                        minWidth: 48,
                        color: "#D72E79",
                        fontWeight: 900,
                        fontSize: "1.2rem",
                        border: "none",
                        "&:hover": {
                          backgroundColor: "rgba(215, 46, 121, 0.12)",
                          border: "none",
                        },
                      }}
                      aria-label='disminuir cantidad'
                    >
                      -
                    </Button>

                    <Button
                      disabled
                      sx={{
                        flexGrow: 1,
                        fontWeight: 800,
                        color: "#D72E79 !important",
                        border: "none",
                        cursor: "default",
                        backgroundColor: "transparent",
                      }}
                    >
                      {itemInCart.quantity}
                    </Button>

                    <Button
                      onClick={handleIncrease}
                      sx={{
                        minWidth: 48,
                        color: "#D72E79",
                        fontWeight: 900,
                        fontSize: "1.2rem",
                        border: "none",
                        "&:hover": {
                          backgroundColor: "rgba(215, 46, 121, 0.12)",
                          border: "none",
                        },
                      }}
                      aria-label='aumentar cantidad'
                    >
                      +
                    </Button>
                  </ButtonGroup>
                ) : (
                  <Button
                    fullWidth
                    variant='contained'
                    startIcon={<ShoppingBagOutlinedIcon />}
                    onClick={() => handleClickAddCart(rawProduct)}
                    sx={{
                      borderRadius: "50px",
                      py: 1.5,
                      fontSize: "1rem",
                      fontWeight: 800,
                      textTransform: "none",
                      background:
                        "linear-gradient(135deg, #FF4B93 0%, #D72E79 100%)",
                      boxShadow: "0 8px 25px rgba(215, 46, 121, 0.3)",
                      transition: "all 0.25s ease",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #D72E79 0%, #B81D60 100%)",
                        boxShadow: "0 12px 28px rgba(215, 46, 121, 0.4)",
                      },
                      "&:active": {
                        transform: "scale(0.98)",
                      },
                    }}
                  >
                    Agregar al carrito
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>

          {/* 🌸 Separador y Productos Relacionados */}
          <Box
            sx={{ maxWidth: "1300px", margin: "0 auto", px: { xs: 2, md: 6 } }}
          >
            <Divider sx={{ mb: 6, borderColor: "rgba(215, 46, 121, 0.15)" }}>
              <Chip
                label='🌸 Productos Relacionados'
                sx={{
                  backgroundColor: "#D72E79",
                  color: "white",
                  fontWeight: 700,
                  px: 2,
                  py: 2.2,
                  borderRadius: "50px",
                  fontSize: "0.95rem",
                  boxShadow: "0 4px 14px rgba(215, 46, 121, 0.25)",
                }}
              />
            </Divider>

            {product.related && product.related.length === 0 ? (
              <Typography
                textAlign='center'
                sx={{ color: "#71717A", py: 4, fontWeight: 500 }}
              >
                No se encontraron productos relacionados
              </Typography>
            ) : (
              <Grid
                container
                spacing={3}
                justifyContent='center'
                sx={{ mb: 4 }}
              >
                {product.related?.map((p) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={p.id}>
                    <ProductCard product={p} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Box>
      ) : (
        <Box sx={{ py: 12, textAlign: "center" }}>
          <PinkSpinner label='Cargando detalles del producto...' />
        </Box>
      )}
    </Layout>
  );
};

export default ProductDetailPage;
