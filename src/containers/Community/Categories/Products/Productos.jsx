import React from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Grid,
  Stack,
  Typography,
  Paper,
} from "@mui/material";
import SearchOffOutlinedIcon from "@mui/icons-material/SearchOffOutlined";
import SearchCourse from "../../../../components/courses/SearchCourses";
import PostCard from "../../../../components/Community/PostCard";
import Pagination from "../../../../components/Pagination/Pagination";
import PinkSpinner from "../../../../components/Loading/PinkSpinner";

const Productos = ({
  community_posts = [],
  loading,
  setSearch,
  debounceSearch,
  totalPages,
  page,
  setPage,
}) => {
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Grid container spacing={3} justifyContent='center' sx={{ pb: 6 }}>
      {/* 2. BUSCADOR */}
      <Grid size={12} sx={{ mt: -7 }}>
        <SearchCourse
          setSearch={setSearch}
          placeholder='Escribe para buscar productos o insumos...'
        />
      </Grid>

      {/* 3. FEED DE POSTS */}
      <Grid size={{ xs: 12, sm: 10, md: 8 }}>
        <Stack spacing={3}>
          {loading ? (
            <Box sx={{ py: 8, display: "flex", justifyContent: "center" }}>
              <PinkSpinner label='Cargando productos...' />
            </Box>
          ) : community_posts && community_posts.length > 0 ? (
            community_posts.map((post, index) => (
              <PostCard key={post.id || `product-post-${index}`} post={post} />
            ))
          ) : (
            /* EMPTY STATE MEJORADO */
            <Paper
              elevation={0}
              sx={{
                py: 6,
                px: 3,
                textAlign: "center",
                borderRadius: "20px",
                bgcolor: "#F9FAFB",
                border: "1px dashed #E5E7EB",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <SearchOffOutlinedIcon sx={{ fontSize: 48, color: "#9CA3AF" }} />
              <Typography
                variant='h6'
                fontWeight={700}
                sx={{ color: "#374151" }}
              >
                Sin productos encontrados
              </Typography>
              <Typography
                variant='body2'
                sx={{ color: "#6B7280", maxWidth: 400 }}
              >
                {debounceSearch
                  ? `No encontramos productos relacionados con "${debounceSearch}". Intenta con otro término.`
                  : "Aún no se han publicado productos en esta sección."}
              </Typography>
            </Paper>
          )}
        </Stack>

        {/* 4. PAGINACIÓN */}
        {!loading && totalPages > 1 && (
          <Box
            sx={{
              mt: 6,
              pb: 4,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              onPageChange={handlePageChange}
            />
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default Productos;
