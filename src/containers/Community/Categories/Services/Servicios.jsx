import { Alert, AlertTitle, Box, Grid, Stack, Typography } from "@mui/material";
import SearchCourse from "../../../../components/courses/SearchCourses";
import PostCard from "../../../../components/Community/PostCard";
import Pagination from "../../../../components/Pagination/Pagination";
import PinkSpinner from "../../../../components/Loading/PinkSpinner";

const Servicios = ({
  community_posts,
  page,
  totalPages,
  setSearch,
  debounceSearch,
  loading,
  setPage,
}) => {
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" }); // Mejora UX al cambiar página
    }
  };

  return (
    <Grid container spacing={2} sx={{ justifyContent: "center" }}>
      {/* BUSCADOR */}
      <Grid size={12} sx={{ mt: -3 }}>
        <Alert severity='info' sx={{ borderRadius: 2 }}>
          <AlertTitle sx={{ fontWeight: "bold" }}>
            Directorio de Servicios
          </AlertTitle>
          Conecta con profesionales para potenciar tu negocio: desde asesoría
          contable hasta servicios especializados de belleza.
        </Alert>
      </Grid>
      <Grid size={12} sx={{ mt: -7 }}>
        <SearchCourse
          setSearch={setSearch}
          placeholder='Escribe para buscar publicaciones...'
        />
      </Grid>
      {/* FEED DE POSTS */}
      <Grid size={{ xs: 12, sm: 10, md: 8 }}>
        <Stack spacing={4}>
          {loading ? (
            <PinkSpinner label='Cargando Posts' />
          ) : community_posts.length > 0 ? (
            community_posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <Typography textAlign='center' sx={{ py: 4, color: "#999" }}>
              No encontramos publicaciones{" "}
              {debounceSearch && `para "${debounceSearch}"`}
            </Typography>
          )}
        </Stack>

        {/* PAGINACIÓN */}
        {totalPages > 1 && !loading && (
          <Box
            sx={{ mt: 5, pb: 12, display: "flex", justifyContent: "center" }}
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

export default Servicios;
