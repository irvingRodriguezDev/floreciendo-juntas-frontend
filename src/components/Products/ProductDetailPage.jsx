import React, { useContext, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  Divider,
  TextField,
  Chip,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Layout from "../Layout/Layout";
import { useParams } from "react-router-dom";
import ProductsContext from "../../context/Products/ProductsContext";
import { formatMexicanCurrency } from "../../utils/FormatCurrency";
import ProductDetailBanner from "../Banner/ProductDetailBanner";
import PinkSpinner from "../Loading/PinkSpinner";
import ProductCard from "./ProductCard";
const ProductDetailPage = () => {
  const params = useParams();
  const { id } = params;
  const { product, getOneProduct } = useContext(ProductsContext);
  useEffect(() => {
    getOneProduct(id);
  }, [id]);

  const relatedProducts = [
    {
      id: 1,
      name: "Premium Face Serum",
      price: 199.99,
      image: {
        url: "https://template.hasthemes.com/brancy/brancy/assets/images/shop/product-details/1.webp",
      },
    },
    {
      id: 2,
      name: "Hydrating Cream",
      price: 149.99,
      image: {
        url: "https://template.hasthemes.com/brancy/brancy/assets/images/shop/8.webp",
      },
    },
    {
      id: 3,
      name: "Vitamin C Mask",
      price: 89.99,
      image: {
        url: "https://template.hasthemes.com/brancy/brancy/assets/images/shop/5.webp",
      },
    },
  ];

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
                  background:
                    "linear-gradient(135deg, rgba(255,200,220,0.5), rgba(255,240,245,0.8))",
                  p: "6px",
                }}
              >
                <Box
                  component='img'
                  src={product.image}
                  alt={product.name}
                  sx={{
                    width: "100%",
                    height: "100%",
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
                {product.name}
              </Typography>

              <Typography
                sx={{
                  color: "#584860",
                  mb: 3,
                  fontSize: { xs: "1rem", md: "1.15rem" },
                  lineHeight: 1.6,
                }}
              >
                {product.description}
              </Typography>

              <Divider sx={{ my: 4 }} />

              {/* 🔢 Control de cantidad mejorado */}
              <Box display='flex' alignItems='center' gap={2} mb={4}>
                <IconButton
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: "12px",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(200,150,170,0.4)",
                    background: "rgba(255,240,245,0.6)",
                  }}
                >
                  <Remove />
                </IconButton>

                <TextField
                  size='small'
                  value={4}
                  sx={{
                    width: 60,
                    "& .MuiOutlinedInput-root": {
                      textAlign: "center",
                      borderRadius: "12px",
                    },
                  }}
                  inputProps={{
                    style: {
                      textAlign: "center",
                      padding: "10px",
                      fontWeight: 700,
                    },
                  }}
                />

                <IconButton
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: "12px",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(200,150,170,0.4)",
                    background: "rgba(255,240,245,0.6)",
                  }}
                >
                  <Add />
                </IconButton>
              </Box>

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
                  {formatMexicanCurrency(Number(product.price))}
                </Typography>
              </Box>
              <Box>
                <Button
                  variant='contained'
                  startIcon={<ShoppingCartIcon />}
                  sx={{
                    background: "linear-gradient(90deg, #d72e7a, #e84f93)",
                    color: "#fff",
                    px: { xs: 3, md: 5 },
                    py: 1.5,
                    fontSize: "1rem",
                    borderRadius: "40px",
                    fontWeight: 700,
                    boxShadow: "0 6px 20px rgba(215,46,122,0.4)",
                    textTransform: "none",
                    "&:hover": {
                      background: "linear-gradient(90deg, #c5286f, #d03c82)",
                      boxShadow: "0 8px 22px rgba(215,46,122,0.55)",
                    },
                  }}
                >
                  Agregar al carrito
                </Button>
              </Box>
            </Grid>
          </Grid>

          <Divider>
            <Chip
              label='Productos Relacionados'
              sx={{ backgroundColor: "#d72e7a", color: "white" }}
            />
          </Divider>
          {/* 🔹 Productos relacionados */}
          <Box
            sx={{
              px: { xs: 2, md: 8 },
              pb: 10,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Grid
              container
              spacing={2}
              sx={{
                mt: 4,
                maxWidth: "1200px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {relatedProducts.map((p) => (
                <Grid size={{ xs: 12, md: 6, lg: 4 }} key={p.id}>
                  <ProductCard product={p} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      ) : (
        <PinkSpinner />
      )}
    </Layout>
  );
};

export default ProductDetailPage;
