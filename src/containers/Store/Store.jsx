import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { shopifyFetch } from "./ShopifyClient";
import { PRODUCTS_QUERY } from "./grapql/productos";
import ShopifyAddToCartButton from "./ShopifyAddToCartButton";
import ShopifyProductSkeleton from "./ShopifyProductSkeleton";

const Store = () => {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      const data = await shopifyFetch(PRODUCTS_QUERY);
      setProducts(data.data.products.edges);
      setLoadingProducts(false);
    }
    loadProducts();
  }, []);

  return (
    <Layout>
      {/* 🌸 Header editorial */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          variant='h3'
          sx={{
            fontWeight: 500,
            mb: 1,
            letterSpacing: 0.5,
          }}
        >
          Tienda Floreciendo Juntas
        </Typography>

        <Typography
          variant='body1'
          sx={{ maxWidth: 520, mx: "auto", opacity: 0.75 }}
        >
          Detalles pensados con amor para acompañarte en cada momento
        </Typography>
      </Box>

      {/* 🌿 Loading */}
      {loadingProducts && (
        <Grid container spacing={4}>
          {Array.from(new Array(6)).map((_, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={i}>
              <ShopifyProductSkeleton />
            </Grid>
          ))}
        </Grid>
      )}

      {/* 🌸 Productos */}
      <Grid container spacing={4}>
        {products.map((p) => {
          const product = p.node;
          const imageUrl = product.images?.edges?.[0]?.node?.url;
          const variant = product.variants.edges[0].node;

          return (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                  transition: "all .3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 32px rgba(0,0,0,0.1)",
                  },
                }}
              >
                {imageUrl && (
                  <CardMedia
                    component='img'
                    image={imageUrl}
                    alt={product.title}
                    sx={{
                      height: 220,
                      objectFit: "cover",
                    }}
                  />
                )}

                <CardContent>
                  <Typography
                    variant='subtitle1'
                    sx={{ fontWeight: 500, mb: 0.5 }}
                  >
                    {product.title}
                  </Typography>

                  <Typography
                    variant='body2'
                    sx={{
                      opacity: 0.75,
                      mb: 1.5,
                      minHeight: 40,
                    }}
                  >
                    {product.description}
                  </Typography>

                  <Typography variant='h6' sx={{ mb: 2, fontWeight: 600 }}>
                    ${variant.price.amount} {variant.price.currencyCode}
                  </Typography>

                  <ShopifyAddToCartButton variantId={variant.id} />
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Layout>
  );
};

export default Store;
