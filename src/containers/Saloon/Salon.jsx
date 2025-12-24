import Layout from "../../components/Layout/Layout";
import { Box, Grid, Typography } from "@mui/material";
import DreamSalonSlider from "../../components/Banner/DreamSaloonBanner";
import DreamSalonFeatures from "../../components/Sections/DreamSaloonFeautures";
import { motion } from "framer-motion";
import ProductCard from "../../components/Products/ProductCard";
import ProductsContext from "../../context/Products/ProductsContext";
import { useContext, useEffect, useState } from "react";
import SearchCourse from "../../components/courses/SearchCourses";
import Pagination from "../../components/Pagination/Pagination";
import { useDebounce } from "use-debounce";
const Salon = () => {
  const { products, getAllProducts, currentPage, totalPages } =
    useContext(ProductsContext);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [debouncedSearch] = useDebounce(search, 500);
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      await getAllProducts(
        debouncedSearch.trim() === "" ? page : undefined,
        debouncedSearch.trim() === "" ? rowsPerPage : undefined,
        debouncedSearch
      );
      setLoading(false);
    };
    fetchProducts();
  }, [page, rowsPerPage, debouncedSearch]);
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Layout>
      <Grid container spacing={2} sx={{ padding: "20px" }}>
        <Grid size={12} sx={{ marginTop: { xs: "90px", md: "90px" } }}>
          <DreamSalonSlider />
        </Grid>
        <Grid size={12}>
          <DreamSalonFeatures />
        </Grid>
        <Grid size={12} sx={{ marginBottom: -15 }}>
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            sx={{
              textAlign: "center",
              py: { xs: 6, md: 8 },
              px: { xs: 3, md: 6 },
            }}
          >
            <Typography
              variant='h4'
              sx={{
                fontWeight: 700,
                color: "#351C43",
                mb: 1,
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              }}
            >
              🌸 Mejores{" "}
              <Box component='span' sx={{ color: "#c94f7c" }}>
                productos
              </Box>
            </Typography>

            <Typography
              sx={{
                color: "#5e4c63",
                fontSize: { xs: "1rem", md: "1.1rem" },
                maxWidth: 600,
                mx: "auto",
                lineHeight: 1.6,
                textAlign: "justify",
              }}
            >
              Descubre nuestros productos más populares — seleccionados por su
              calidad, diseño y resultados excepcionales. 🌷 Crea el ambiente
              perfecto con los mejores elementos para tu salón ideal.
            </Typography>

            <Box
              component='div'
              sx={{
                width: 180,
                height: 3,
                backgroundColor: "#c94f7c",
                borderRadius: "2px",
                mx: "auto",
                mt: 3,
                opacity: 0.8,
              }}
            />
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={3}
        justifyContent='center'
        sx={{
          maxWidth: { xs: "100%", lg: "1400px" },
          margin: "0 auto",
          paddingY: 4,
        }}
      >
        <Grid size={12}>
          <SearchCourse
            setSearch={setSearch}
            title={
              "El salón de tus sueños empieza aquí: encuentra el mueble perfecto 🛋️✨"
            }
            placeholder={"Ej: Esmaltero teddy"}
          />
        </Grid>
        {products.map((p) => (
          <Grid
            size={{ xs: 12, md: 6, lg: 4, xl: 3 }}
            sx={{ padding: { xs: "20px" } }}
            key={p.id}
          >
            <ProductCard product={p} />
          </Grid>
        ))}
      </Grid>
      {search === "" && (
        <Grid container justifyContent='center' sx={{ paddingBottom: 5 }}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Grid>
      )}
    </Layout>
  );
};

export default Salon;
