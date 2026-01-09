import React, { useEffect, useState, useCallback } from "react";
import Layout from "../../components/Layout/Layout";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  TextField,
  Avatar,
  Button,
  CircularProgress,
} from "@mui/material";
import PinkSpinner from "../../components/Loading/PinkSpinner";
// 🌸 Swiper para imágenes
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { shopifyFetch } from "./ShopifyClient";
import { PRODUCTS_QUERY } from "./grapql/productos";
import ShopifyAddToCartButton from "./ShopifyAddToCartButton";
import ShopifyProductSkeleton from "./ShopifyProductSkeleton";

const Store = () => {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [quantities, setQuantities] = useState({});

  // Estados de paginación
  const [cursor, setCursor] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(false);

  // Función de carga de productos (15 por página, con stock y best sellers)
  const loadProducts = useCallback(async (afterCursor = null) => {
    if (afterCursor) setLoadingMore(true);
    else setLoadingProducts(true);

    const variables = {
      first: 15,
      after: afterCursor,
    };

    try {
      const data = await shopifyFetch(PRODUCTS_QUERY, variables);

      if (data?.data?.products) {
        const newEdges = data.data.products.edges;
        const pageInfo = data.data.products.pageInfo;

        setProducts((prev) =>
          afterCursor ? [...prev, ...newEdges] : newEdges
        );
        setCursor(pageInfo.endCursor);
        setHasNextPage(pageInfo.hasNextPage);
      }
    } catch (error) {
      console.error("Error cargando productos:", error);
    } finally {
      setLoadingProducts(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleQtyChange = (variantId, qty) => {
    setQuantities((prev) => ({
      ...prev,
      [variantId]: Math.max(0, parseInt(qty) || 0),
    }));
  };

  return (
    <Layout>
      {/* 🌸 Header Editorial */}
      <Box
        sx={{
          textAlign: "center",
          mt: { xs: 14, md: 14 },
          mb: { xs: 6, md: 10 },
        }}
      >
        <Typography
          variant='h2'
          sx={{
            fontWeight: 300,
            color: "#4A2C3A",
            mb: 2,
            fontFamily: "'Playfair Display', serif",
          }}
        >
          Tienda Floreciendo Juntas
        </Typography>
        <Typography
          variant='body2'
          sx={{ opacity: 0.6, letterSpacing: 3, textTransform: "uppercase" }}
        >
          Los más vendidos • Disponibles ahora
        </Typography>
      </Box>

      <Box sx={{ maxWidth: 1400, mx: "auto", px: { xs: 2, md: 4 } }}>
        {loadingProducts ? (
          <Grid container spacing={4}>
            {[1, 2, 3, 4].map((i) => (
              <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={i}>
                <ShopifyProductSkeleton />
              </Grid>
            ))}
          </Grid>
        ) : (
          <>
            <Grid container spacing={4}>
              {products // ✅ FILTRO 1: Solo productos que tengan al menos UNA variante con stock
                .filter((p) =>
                  p.node.variants.edges.some((v) => v.node.availableForSale)
                )
                .map((p) => {
                  const product = p.node;
                  const images = product.images?.edges || [];

                  // ✅ FILTRO 2: Creamos una lista limpia solo con las variantes que SI tienen stock
                  const sellableVariants = product.variants.edges.filter(
                    (v) => v.node.availableForSale
                  );

                  return (
                    <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={product.id}>
                      <Card
                        elevation={0}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          height: "100%",
                          borderRadius: 6,
                          border: "1px solid #F6E6EF",
                          backgroundColor: "#FFF",
                          overflow: "hidden",
                          transition: "0.4s ease-in-out",
                          "&:hover": {
                            boxShadow: "0 15px 35px rgba(232,161,196,0.12)",
                            transform: "translateY(-5px)",
                          },
                        }}
                      >
                        {/* 🖼️ Slider de Imágenes (Superior) */}
                        <Box sx={{ p: 1, position: "relative" }}>
                          <Swiper
                            modules={[Autoplay, Pagination, Navigation]}
                            autoplay={{
                              delay: 2500,
                              disableOnInteraction: false,
                            }}
                            pagination={{
                              clickable: true,
                              dynamicBullets: true,
                            }}
                            navigation={false}
                            style={{
                              height: 350,
                              borderRadius: "20px",
                              "--swiper-navigation-color": "#E8A1C4",
                              "--swiper-pagination-color": "#E8A1C4",
                            }}
                          >
                            {images.map((img, index) => (
                              <SwiperSlide key={index}>
                                <Box
                                  component='img'
                                  src={img.node.url}
                                  sx={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                    p: 2,
                                  }}
                                />
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        </Box>

                        {/* 📝 Contenido y Variantes (Inferior) */}
                        <CardContent
                          sx={{
                            p: { xs: 3, md: 4 },
                            display: "flex",
                            flexDirection: "column",
                            flexGrow: 1,
                          }}
                        >
                          <Typography
                            variant='h5'
                            sx={{
                              fontWeight: 600,
                              color: "#4A2C3A",
                              mb: 1,
                              minHeight: "60px",
                            }}
                          >
                            {product.title}
                          </Typography>

                          <Divider sx={{ mb: 2, opacity: 0.5 }} />

                          <List
                            sx={{
                              flexGrow: 1,
                              maxHeight: 300,
                              overflowY: "auto",
                              mb: 3,
                              pr: 1,
                              "::-webkit-scrollbar": { width: "4px" },
                              "::-webkit-scrollbar-thumb": {
                                background: "#F6E6EF",
                                borderRadius: "10px",
                              },
                            }}
                          >
                            {sellableVariants.map((v) => {
                              const variant = v.node;
                              const isSelected = quantities[variant.id] > 0;
                              return (
                                <ListItem
                                  key={variant.id}
                                  disableGutters
                                  sx={{
                                    py: 1.5,
                                    borderBottom: "1px solid #FAF4F7",
                                  }}
                                >
                                  <Avatar
                                    sx={{
                                      width: 8,
                                      height: 8,
                                      bgcolor: isSelected
                                        ? "#E8A1C4"
                                        : "#F6E6EF",
                                      mr: 2,
                                    }}
                                    children=''
                                  />
                                  <Box sx={{ flex: 1 }}>
                                    <Typography
                                      variant='body2'
                                      sx={{
                                        fontWeight: 600,
                                        color: isSelected
                                          ? "#DE8CB6"
                                          : "#634A56",
                                      }}
                                    >
                                      {variant.title}
                                    </Typography>
                                    <Typography
                                      variant='caption'
                                      sx={{ color: "#9E7B8B" }}
                                    >
                                      ${variant.price.amount}{" "}
                                      {variant.price.currencyCode}
                                    </Typography>
                                  </Box>
                                  <TextField
                                    type='number'
                                    size='small'
                                    placeholder='0'
                                    sx={{
                                      width: 65,
                                      "& .MuiOutlinedInput-root": {
                                        borderRadius: 2,
                                        bgcolor: "#FFF7FB",
                                        fontSize: "0.85rem",
                                      },
                                    }}
                                    value={quantities[variant.id] || ""}
                                    onChange={(e) =>
                                      handleQtyChange(
                                        variant.id,
                                        e.target.value
                                      )
                                    }
                                  />
                                </ListItem>
                              );
                            })}
                          </List>

                          <Box sx={{ mt: "auto" }}>
                            <ShopifyAddToCartButton
                              allQuantities={quantities}
                              productVariants={product.variants.edges}
                            />
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
            </Grid>

            {/* 🌸 Botón Cargar Más */}
            {hasNextPage && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 8,
                  mb: 10,
                }}
              >
                <Button
                  onClick={() => loadProducts(cursor)}
                  disabled={loadingMore}
                  variant='outlined'
                  sx={{
                    px: 8,
                    py: 2,
                    borderRadius: 999,
                    color: "#4A2C3A",
                    borderColor: "#F6E6EF",
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": { borderColor: "#E8A1C4", bgcolor: "#E8A1C4" },
                  }}
                >
                  {loadingMore ? (
                    <PinkSpinner label='Cargando productos' />
                  ) : (
                    "Descubrir más productos ✨"
                  )}
                </Button>
              </Box>
            )}
          </>
        )}
      </Box>
    </Layout>
  );
};

export default Store;
