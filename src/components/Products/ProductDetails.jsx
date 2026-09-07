import React, { useState, useContext } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  Modal,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useSnackbar } from "notistack";
import { formatMexicanCurrency } from "../../utils/FormatCurrency";
import CartContext from "../../context/Cart/CartContext";
import AuthContext from "../../context/Auth/AuthContext";

const ProductDetailModal = ({ open, handleClose, product }) => {
  const [quantity, setQuantity] = useState(1);
  const { enqueueSnackbar } = useSnackbar();
  const { autenticado } = useContext(AuthContext);
  const { addItemCart, addItemGuest } = useContext(CartContext);

  if (!product) return null;

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    if (autenticado) {
      addItemCart({ product_id: product.id, quantity });
      enqueueSnackbar(`Se agregaron ${quantity} producto(s) al carrito 💗`, {
        variant: "success",
      });
    } else {
      const guestItem = {
        product_id: product.id,
        quantity,
        name: product.name,
        image: product.image?.url || product.image || null,
        price: Number(product.price),
      };
      addItemGuest(guestItem);
      enqueueSnackbar(`Se agregaron ${quantity} producto(s) al carrito 💗`, {
        variant: "info",
      });
    }
    handleClose();
  };

  const imageUrl =
    product?.image?.url ||
    product?.image ||
    "https://placehold.co/600x600/FFF0F5/D72E79?text=Producto";

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(8px)",
        p: { xs: 2, sm: 3 },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 900,
          maxHeight: "90vh",
          overflowY: "auto",
          bgcolor: "rgba(255, 255, 255, 0.96)",
          backdropFilter: "blur(16px)",
          borderRadius: "28px",
          border: "1px solid rgba(255, 255, 255, 0.8)",
          boxShadow: "0 25px 50px -12px rgba(163, 11, 93, 0.25)",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          position: "relative",
          outline: "none",
        }}
      >
        {/* ❌ BOTÓN DE CIERRE MEJORADO */}
        <IconButton
          onClick={handleClose}
          aria-label='Cerrar modal'
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            bgcolor: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(215, 46, 121, 0.15)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
            zIndex: 10,
            transition: "all 0.2s ease",
            "&:hover": {
              bgcolor: "#D72E79",
              color: "#FFFFFF",
              "& .close-icon": { color: "#FFFFFF" },
            },
          }}
        >
          <CloseIcon
            className='close-icon'
            sx={{
              fontSize: "20px",
              color: "#D72E79",
              transition: "color 0.2s",
            }}
          />
        </IconButton>

        {/* 🖼️ CONTENEDOR DE IMAGEN CON MARCO ELEGANTE */}
        <Box
          sx={{
            flex: 1,
            bgcolor: "#FFF0F5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: { xs: 3, md: 4 },
            minHeight: { xs: 260, md: 400 },
          }}
        >
          <Box
            component='img'
            src={imageUrl}
            alt={product?.name || "Producto"}
            sx={{
              width: "100%",
              maxHeight: 340,
              objectFit: "contain",
              filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.08))",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.03)",
              },
            }}
          />
        </Box>

        {/* 🌸 DETALLES Y ACCIONES */}
        <Box
          sx={{
            flex: 1.2,
            p: { xs: 3, sm: 4, md: 5 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              variant='h5'
              sx={{
                fontWeight: 800,
                color: "#2C1820",
                fontSize: { xs: "1.3rem", sm: "1.6rem" },
                mb: 1.5,
                lineHeight: 1.3,
                pr: 4, // Espacio para evitar empalme con el botón de cerrar
              }}
            >
              {product?.name}
            </Typography>

            <Typography
              variant='body2'
              sx={{
                color: "#616161",
                fontSize: "0.92rem",
                lineHeight: 1.6,
                mb: 3,
              }}
            >
              {product?.description ||
                "Sin descripción disponible para este producto."}
            </Typography>

            <Divider sx={{ mb: 3, borderColor: "rgba(215, 46, 121, 0.12)" }} />

            {/* PRECIO Y CONTADOR EN LA MISMA FILA */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 2,
                mb: 4,
              }}
            >
              <Box>
                <Typography
                  variant='caption'
                  sx={{
                    color: "#A1A1AA",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Precio unitario
                </Typography>
                <Typography
                  variant='h4'
                  sx={{ fontWeight: 900, color: "#D72E79", fontSize: "1.8rem" }}
                >
                  {formatMexicanCurrency(Number(product?.price || 0))}
                </Typography>
              </Box>

              {/* CONTADOR NEOMÓRFICO */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  border: "1.5px solid #D72E79",
                  backgroundColor: "#FFF0F6",
                  borderRadius: "50px",
                  px: 0.8,
                  py: 0.3,
                }}
              >
                <IconButton
                  onClick={handleDecrease}
                  size='small'
                  aria-label='disminuir'
                >
                  <RemoveIcon sx={{ color: "#D72E79", fontSize: 18 }} />
                </IconButton>
                <Typography
                  sx={{
                    mx: 1.5,
                    minWidth: 20,
                    textAlign: "center",
                    fontWeight: 800,
                    color: "#D72E79",
                    fontSize: "1rem",
                  }}
                >
                  {quantity}
                </Typography>
                <IconButton
                  onClick={handleIncrease}
                  size='small'
                  aria-label='aumentar'
                >
                  <AddIcon sx={{ color: "#D72E79", fontSize: 18 }} />
                </IconButton>
              </Box>
            </Box>
          </Box>

          {/* 🛒 BOTÓN DE AGREGAR */}
          <Button
            variant='contained'
            onClick={handleAddToCart}
            startIcon={<ShoppingBagOutlinedIcon />}
            sx={{
              width: "100%",
              borderRadius: "50px",
              py: 1.5,
              fontSize: "1rem",
              fontWeight: 800,
              textTransform: "none",
              background: "linear-gradient(135deg, #FF4B93 0%, #D72E79 100%)",
              boxShadow: "0 8px 25px rgba(215, 46, 121, 0.3)",
              transition: "all 0.25s ease",
              "&:hover": {
                background: "linear-gradient(135deg, #D72E79 0%, #B81D60 100%)",
                boxShadow: "0 12px 28px rgba(215, 46, 121, 0.4)",
              },
              "&:active": {
                transform: "scale(0.98)",
              },
            }}
          >
            Agregar al carrito —{" "}
            {formatMexicanCurrency(Number(product?.price || 0) * quantity)}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ProductDetailModal;
