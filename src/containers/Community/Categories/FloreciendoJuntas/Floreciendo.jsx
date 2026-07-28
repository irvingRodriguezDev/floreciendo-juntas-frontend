import { Alert, AlertTitle, Box, Grid, Stack } from "@mui/material";
import SearchCourse from "../../../../components/courses/SearchCourses";
import PostCard from "../../../../components/Community/PostCard";
import Pagination from "../../../../components/Pagination/Pagination";
import NoResults from "../../../../components/Community/NoResults";
import PinkSpinner from "../../../../components/Loading/PinkSpinner";

const Floreciendo = ({
  community_posts,
  setSearch,
  loading,
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
      {/* BUSCADOR */}
      <Grid size={12} sx={{ mt: -7 }}>
        <SearchCourse
          setSearch={setSearch}
          placeholder='Escribe para buscar publicaciones...'
        />
      </Grid>

      {/* FEED DE POSTS */}
      <Grid size={{ xs: 12, sm: 10, md: 8 }}>
        <Stack spacing={3} sx={{ mt: 1 }}>
          {loading ? (
            <Box sx={{ py: 6, display: "flex", justifyContent: "center" }}>
              <PinkSpinner label='Cargando publicaciones...' />
            </Box>
          ) : community_posts?.length > 0 ? (
            community_posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <NoResults debounceSearch={debounceSearch} />
          )}
        </Stack>
      </Grid>

      {/* PAGINACIÓN */}
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
  );
};

export default Floreciendo;
