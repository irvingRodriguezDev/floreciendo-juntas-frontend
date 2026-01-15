// src/components/products/ProductCard.jsx
import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Button,
  ButtonGroup,
} from "@mui/material";
import { useSnackbar } from "notistack";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import { Link } from "react-router-dom";
import { shortenText } from "../../utils/ShortText";
import { formatMexicanCurrency } from "../../utils/FormatCurrency";
import ProductDetailModal from "./ProductDetails";
import CartContext from "../../context/Cart/CartContext";
import AuthContext from "../../context/Auth/AuthContext";

const ProductCard = ({ product }) => {
  const { enqueueSnackbar } = useSnackbar();

  const { autenticado } = useContext(AuthContext);

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
  const [open, setOpen] = useState(false);
  const [prod, setProd] = useState(null);

  // Reservar espacio para botones: si no queda, no mostrar cortado
  // width responsive handled by sx
  const handleClickOpen = (p) => {
    setOpen(true);
    setProd(p);
  };
  const handleClickClose = () => {
    setProd(null);
    setOpen(false);
  };

  // Detectar si está en carrito (elige la fuente según autenticado)
  const itemInCart = autenticado
    ? cart.items?.find((i) => i.productId === product.id)
    : guest_cart.items?.find((i) => i.product.product_id === product.id);

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
    return addItemCart({ product_id: product.id, quantity: 1 });
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
        deleteItemGuest(itemInCart.product_id);
        enqueueSnackbar("Producto eliminado del carrito", {
          variant: "warning",
        });
      } else {
        updateItemGuest(itemInCart.product_id, newQty);
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
    <>
      <Card
        sx={{
          width: "100%",
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: 3,
          position: "relative",
          transition: "transform 0.25s ease, box-shadow 0.25s ease",
          // hover only on md+
          "&:hover": {
            transform: { md: "translateY(-8px)" },
            boxShadow: { md: 6 },
          },
          "&:hover .card-content-inner": {
            transform: { md: "translateY(-18px)" },
          },
          "&:hover .card-buttons": {
            opacity: { md: 1 },
            visibility: { md: "visible" },
          },
        }}
      >
        {/* Imagen */}
        <Box sx={{ position: "relative", zIndex: 0 }}>
          <CardMedia
            component='img'
            width='100%'
            image={product.image?.url || product.image || ""}
            alt={product.name}
            sx={{
              aspectRatio: {
                xs: "5 / 4",
                sm: "4 / 3",
                md: "3 / 2",
                lg: "1 / 1",
              },
            }}
          />
        </Box>

        {/* Contenido: añadimos pb para evitar solapamiento con botones */}
        <Box
          className='card-content-inner'
          sx={{
            zIndex: 10,
            bgcolor: "white",
            borderRadius: "16px",
            transition: { md: "transform 0.3s ease" },
          }}
        >
          <CardContent sx={{ pt: 2, pb: { xs: 10, md: 3 } }}>
            <Link
              to={`/detalle-producto/${product.id}`}
              style={{ textDecoration: "none" }}
            >
              <Typography
                variant='subtitle1'
                fontWeight='bold'
                color='#D82E7A'
                sx={{ mb: 0.5 }}
              >
                {shortenText(product.name || "", 35)}
              </Typography>
            </Link>

            <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
              {shortenText(product.description || "", 50)}
            </Typography>

            <Box display='flex' alignItems='center' sx={{ mb: 5 }}>
              <Typography variant='h6' fontWeight={800} mr={1}>
                {formatMexicanCurrency(Number(product.price))}
              </Typography>
              <Typography
                variant='body2'
                color='text.secondary'
                sx={{ textDecoration: "line-through" }}
              >
                {formatMexicanCurrency(Number(product.price) * 1.3)}
              </Typography>
            </Box>

            {/* Buttons container: visible on xs, hidden on md until hover */}
            <Box
              className='card-buttons'
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 1,
                mt: 1,
                // visible on mobile, hidden on desktop by default (desktop shows on hover)
                opacity: { xs: 1, md: 0 },
                visibility: { xs: "visible", md: "hidden" },
                transition: "opacity 0.25s ease, visibility 0.25s ease",
                position: "absolute",
                left: 16,
                right: 16,
                bottom: 12,
                // ensure background doesn't overlap text on very small cards
                background: { xs: "transparent", md: "transparent" },
              }}
            >
              {/* If item exists -> show ButtonGroup */}
              {itemInCart ? (
                <ButtonGroup
                  fullWidth
                  variant='outlined'
                  sx={{
                    borderRadius: 3,
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
                    onClick={() => handleIncrease(itemInCart, product)}
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
              ) : (
                <Button
                  fullWidth
                  variant='contained'
                  onClick={() => handleClickAddCart(product)}
                  sx={{
                    borderRadius: 2,
                    py: 1.1,
                    textTransform: "none",
                    fontWeight: 700,
                    background: "linear-gradient(135deg,#ff69b4,#d82e7a)",
                    boxShadow: "0 8px 20px rgba(216,46,136,0.12)",
                    "&:hover": {
                      boxShadow: "0 12px 30px rgba(216,46,136,0.18)",
                    },
                  }}
                >
                  Agregar al carrito
                </Button>
              )}

              {/* Detalle */}
              <Link to={`/detalle-producto/${product.id}`}>
                <IconButton
                  sx={{
                    bgcolor: "white",
                    borderRadius: 2,
                    boxShadow: "0 6px 16px rgba(0,0,0,0.06)",
                  }}
                  aria-label='ver detalle'
                >
                  <ZoomOutMapIcon sx={{ color: "#D82E7A" }} />
                </IconButton>
              </Link>
            </Box>
          </CardContent>
        </Box>
      </Card>

      {/* Modal detalle */}
      {prod && (
        <ProductDetailModal
          open={open}
          handleClose={handleClickClose}
          product={prod}
        />
      )}
    </>
  );
};

export default ProductCard;
