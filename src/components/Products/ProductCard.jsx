import React, { useContext, useState } from "react";
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
import { useNavigate } from "react-router-dom"; // 👈 Para mantener PWA Fullscreen
import { shortenText } from "../../utils/ShortText";
import { formatMexicanCurrency } from "../../utils/FormatCurrency";
import ProductDetailModal from "./ProductDetails";
import CartContext from "../../context/Cart/CartContext";
import AuthContext from "../../context/Auth/AuthContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
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

  const handleClickClose = () => {
    setProd(null);
    setOpen(false);
  };

  // NAVEGACIÓN PWA SEGURA SIN TAGS <a>
  const handleNavigateDetail = (e) => {
    e.stopPropagation();
    navigate(`/detalle-producto/${product.id}`);
  };

  // Detectar si está en carrito
  const itemInCart = autenticado
    ? cart?.items?.find((i) => i.productId === product.id)
    : guest_cart.items?.find((i) => i.product.product_id === product.id);

  // Helper para agregar al guest
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

  // Helper para agregar autenticado
  const handleAddAuth = () => {
    return addItemCart({ product_id: product.id, quantity: 1 });
  };

  // Handler para "Agregar al carrito"
  const handleClickAddCart = (product) => {
    if (autenticado) {
      handleAddAuth(product);
      enqueueSnackbar("Producto agregado al carrito 💗", {
        variant: "success",
      });
    } else {
      handleAddGuest(product);
      enqueueSnackbar("Producto guardado en carrito local 💗", {
        variant: "info",
      });
    }
  };

  // Controles de decremento / incremento
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
      return;
    }

    const newQty = itemInCart.quantity + 1;

    if (autenticado) {
      updateItemCart({
        cart_id: item.id,
        product_id: product.id,
        quantity: newQty,
      });
    } else {
      updateItemGuest(product.id, newQty);
    }
    enqueueSnackbar("Cantidad actualizada 💗", { variant: "success" });
  };

  return (
    <>
      <Card
        sx={{
          width: "100%",
          borderRadius: "24px",
          overflow: "hidden",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.9)",
          boxShadow:
            "0 10px 30px -10px rgba(163, 11, 93, 0.08), 0 4px 12px rgba(0, 0, 0, 0.03)",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",

          "&:hover": {
            backgroundColor: "#FFFFFF",
            boxShadow:
              "0 22px 45px -12px rgba(215, 46, 121, 0.18), 0 8px 20px rgba(0, 0, 0, 0.04)",
            borderColor: "rgba(215, 46, 121, 0.25)",
            transform: { md: "translateY(-6px)" },
          },
          "&:active": {
            transform: "scale(0.98)",
          },
          "&:hover .card-media-img": {
            transform: "scale(1.06)",
          },
        }}
      >
        {/* 🖼️ IMAGEN DE PRODUCTO */}
        <Box
          onClick={handleNavigateDetail}
          sx={{
            position: "relative",
            cursor: "pointer",
            overflow: "hidden",
            backgroundColor: "#FFF0F5",
            pt: "85%", // Aspect ratio cuadrado estilizado
          }}
        >
          <CardMedia
            className='card-media-img'
            component='img'
            image={
              product.image?.url ||
              product.image ||
              "https://placehold.co/600x600/FFF0F5/D72E79?text=Producto"
            }
            alt={product.name}
            loading='lazy'
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        </Box>

        {/* 🌷 DETALLES DEL PRODUCTO */}
        <CardContent
          sx={{
            p: 2.5,
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              onClick={handleNavigateDetail}
              variant='subtitle1'
              sx={{
                fontWeight: 800,
                fontSize: "1.02rem",
                color: "#2C1820",
                lineHeight: 1.3,
                mb: 0.6,
                cursor: "pointer",
                transition: "color 0.2s",
                "&:hover": { color: "#D72E79" },
              }}
            >
              {shortenText(product.name || "", 35)}
            </Typography>

            <Typography
              variant='body2'
              sx={{
                color: "#71717A",
                fontSize: "0.82rem",
                lineHeight: 1.4,
                mb: 1.5,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {product.description || "Sin descripción disponible"}
            </Typography>

            {/* PRECIO CON DESCUENTO SUTIL */}
            <Box display='flex' alignItems='baseline' gap={1} sx={{ mb: 2 }}>
              <Typography
                variant='h6'
                sx={{ fontWeight: 900, color: "#D72E79", fontSize: "1.25rem" }}
              >
                {formatMexicanCurrency(Number(product.price))}
              </Typography>
              <Typography
                variant='body2'
                sx={{
                  textDecoration: "line-through",
                  color: "#A1A1AA",
                  fontSize: "0.82rem",
                  fontWeight: 500,
                }}
              >
                {formatMexicanCurrency(Number(product.price) * 1.25)}
              </Typography>
            </Box>
          </Box>

          {/* 🎛️ CONTROLES Y ACCIONES (GLASS BUTTONS) */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
            {itemInCart ? (
              <ButtonGroup
                fullWidth
                sx={{
                  borderRadius: "50px",
                  overflow: "hidden",
                  border: "1.5px solid #D72E79",
                  backgroundColor: "#FFF0F6",
                }}
              >
                <Button
                  onClick={handleDecrease}
                  sx={{
                    minWidth: 42,
                    color: "#D72E79",
                    fontWeight: 900,
                    fontSize: "1.1rem",
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
                  onClick={() => handleIncrease(itemInCart, product)}
                  sx={{
                    minWidth: 42,
                    color: "#D72E79",
                    fontWeight: 900,
                    fontSize: "1.1rem",
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
                onClick={() => handleClickAddCart(product)}
                sx={{
                  borderRadius: "50px",
                  py: 1,
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "0.88rem",
                  background:
                    "linear-gradient(135deg, #FF4B93 0%, #D72E79 100%)",
                  boxShadow: "0 6px 18px rgba(215, 46, 121, 0.28)",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #D72E79 0%, #B81D60 100%)",
                    boxShadow: "0 8px 22px rgba(215, 46, 121, 0.38)",
                  },
                  "&:active": {
                    transform: "scale(0.96)",
                  },
                }}
              >
                Agregar al carrito
              </Button>
            )}

            {/* BOTÓN MÁS DETALLE */}
            <IconButton
              onClick={handleNavigateDetail}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderRadius: "50%",
                border: "1px solid rgba(215, 46, 121, 0.15)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "#D72E79",
                  color: "#FFFFFF",
                  "& .zoom-icon": { color: "#FFFFFF" },
                },
              }}
              aria-label='ver detalle'
            >
              <ZoomOutMapIcon
                className='zoom-icon'
                sx={{
                  color: "#D72E79",
                  fontSize: 18,
                  transition: "color 0.2s",
                }}
              />
            </IconButton>
          </Box>
        </CardContent>
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
