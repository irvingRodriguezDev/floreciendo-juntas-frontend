import React, { useState } from "react";
import {
  Box,
  Typography,
  Rating,
  IconButton,
  Button,
  Divider,
  Modal,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import { formatMexicanCurrency } from "../../utils/FormatCurrency";
const ProductDetailModal = ({ open, handleClose, product }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(4px)",
        p: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1100,
          bgcolor: "white",
          borderRadius: 3,
          boxShadow: 6,
          overflow: "hidden",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          position: "relative",
          outline: "none",
        }}
      >
        {/* Botón cerrar */}
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 0,
            left: -12,

            bgcolor: "rgba(255,255,255,0.9)",
            "&:hover": { bgcolor: "rgba(255,255,255,1)" },
            zIndex: 10,
          }}
        >
          <CloseIcon sx={{ fontSize: "40px", color: "#E53888" }} />
        </IconButton>

        {/* Imagen del producto */}
        <Box
          sx={{
            flex: 1,
            bgcolor: "#FCECEF",
            borderRadius: { xs: "0", md: "0 0 0 12px" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 4,
          }}
        >
          <Box
            component='img'
            src={product?.image.url}
            alt={product?.name || "Producto"}
            sx={{
              width: "100%",
              height: "350px",
              borderRadius: "18px",
              // objectFit: "contain",
            }}
          />
        </Box>

        {/* Información del producto */}
        <Box sx={{ flex: 1.2, p: { xs: 3, md: 5 } }}>
          <Typography
            variant='h4'
            fontWeight={700}
            color='#2d114d'
            sx={{ mb: 1 }}
          >
            {product?.name}
          </Typography>

          {/* Descripción */}
          <Typography
            variant='body1'
            color='text.secondary'
            sx={{ mb: 3, lineHeight: 1.7 }}
          >
            {product.description}
          </Typography>

          {/* Control de cantidad */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "2px solid #D82E7A",
              borderRadius: "30px",
              width: "fit-content",
              px: 2,
              py: 0.5,
              mb: 3,
            }}
          >
            <IconButton onClick={handleDecrease}>
              <RemoveIcon sx={{ color: "#D82E7A" }} />
            </IconButton>
            <Typography
              variant='h6'
              fontWeight={600}
              sx={{ mx: 2, minWidth: 24, textAlign: "center" }}
            >
              {quantity}
            </Typography>
            <IconButton color='error' onClick={handleIncrease}>
              <AddIcon sx={{ color: "#D82E7A" }} />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Precio y botón */}
          <Box display='flex' alignItems='center' gap={2}>
            <Typography
              variant='h4'
              fontWeight={700}
              color='#2d114d'
              sx={{ flexGrow: 1 }}
            >
              {formatMexicanCurrency(Number(product?.price))}
            </Typography>
          </Box>

          <Button
            variant='contained'
            sx={{
              bgcolor: "#D82E7A",
              color: "#fff",
              borderRadius: "25px",
              px: 3,
              py: 1.9,
              fontWeight: 600,
              mt: 10,
              justifyContent: "flex-end",
              "&:hover": { bgcolor: "#D82E7A" },
            }}
          >
            Agregar al carrito
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ProductDetailModal;
