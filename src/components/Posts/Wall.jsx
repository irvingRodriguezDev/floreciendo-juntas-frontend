import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, Button, Stack, Grid, Paper } from "@mui/material";
import PostCard from "./PostCard";
import CreatePostModal from "./CreatePostModal";
import PostsContext from "../../context/Posts/PostsContext";
import IceIcon from "../icons/IceIcon";
import PinkSpinner from "../Loading/PinkSpinner";
import Pagination from "../Pagination/Pagination";
const Wall = ({ courseId }) => {
  const { getPosts, posts, totalPages } = useContext(PostsContext);

  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // 🔹 Cargar posts al montar o cuando cambia el curso o página
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      await getPosts(courseId, page, rowsPerPage);
      setLoading(false);
    };
    if (courseId) fetchPosts();
  }, [courseId, page, rowsPerPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      setPage(newPage);
    }
  };
  const handleCreatePost = () => setOpenModal(false);

  return (
    <Box
      sx={{
        maxWidth: "900px",
        mx: "auto",
        pt: 4,
        pb: 6,
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: "16px",
          backgroundColor: "#fff",
        }}
      >
        <Stack spacing={3} alignItems='center'>
          {/* 🔹 Botón de crear publicación */}
          <Button
            variant='contained'
            sx={{
              bgcolor: "#D82E7A",
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 600,
              px: 4,
              py: 1,
              "&:hover": { bgcolor: "#c4276e" },
            }}
            onClick={() => setOpenModal(true)}
          >
            Crear publicación
          </Button>

          <CreatePostModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            courseId={courseId}
            onSubmit={handleCreatePost}
          />

          {/* 🔹 Estado de carga */}
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <PinkSpinner />
            </Box>
          ) : (
            <>
              {/* 🔹 Estado vacío */}
              {posts.length === 0 ? (
                <Box textAlign='center' sx={{ mt: 4 }}>
                  <Typography variant='body1' color='text.secondary'>
                    No hay publicaciones todavía.
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <IceIcon width={60} />
                  </Box>
                  <Typography
                    variant='subtitle2'
                    sx={{ color: "#D82E7A", mt: 1, fontWeight: 500 }}
                  >
                    ¡Rompe el hielo y crea la primera publicación!
                  </Typography>
                </Box>
              ) : (
                <>
                  {/* 🔹 Lista de posts */}
                  <Grid size={12}>
                    <PostCard posts={posts} />
                  </Grid>
                  {/* 🔹 Paginación */}
                  {totalPages > 1 && (
                    <Grid
                      container
                      justifyContent='center'
                      sx={{ mt: 3, pb: 2 }}
                    >
                      <Pagination
                        totalPages={totalPages}
                        currentPage={page}
                        onPageChange={handlePageChange}
                      />
                    </Grid>
                  )}
                </>
              )}
            </>
          )}
        </Stack>
      </Paper>
    </Box>
  );
};

export default Wall;
