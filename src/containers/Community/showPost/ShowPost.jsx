// pages/PostShowPage.jsx
import { useEffect } from "react";
import { Box, Typography, Grid, Button, Stack, Paper } from "@mui/material";
import { Link, useParams, useSearchParams } from "react-router-dom";

import Layout from "../../../components/Layout/Layout";
import PostCard from "../../../components/Community/PostCard";
import { usePostShow } from "../../../hooks/usePostShow";
import PinkSpinner from "../../../components/Loading/PinkSpinner";

const ShowPost = () => {
  const { postId } = useParams();
  const [searchParams] = useSearchParams();
  const commentId = searchParams.get("commentId");

  const { post, loading, error } = usePostShow(postId);

  // 🔽 Scroll automático al comentario (cuando viene desde notificación)
  useEffect(() => {
    if (!post || !commentId) return;

    const timeout = setTimeout(() => {
      const el = document.getElementById(`comment-${commentId}`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 300);

    return () => clearTimeout(timeout);
  }, [post, commentId]);

  // 🔄 Loading
  if (loading) {
    return (
      <Layout>
        <PinkSpinner label='Consultando información' />
      </Layout>
    );
  }

  // ❌ Error
  if (error) {
    return (
      <Layout>
        <Typography color='error' textAlign='center'>
          Ocurrió un error al cargar la publicación 😥
        </Typography>
      </Layout>
    );
  }

  // 🚫 No encontrado
  if (!post) {
    return (
      <Layout>
        <Typography textAlign='center'>Publicación no encontrada</Typography>
      </Layout>
    );
  }

  return (
    <Layout>
      <Grid
        container
        justifyContent='center'
        spacing={3}
        sx={{ px: { xs: 1, sm: 2 } }}
      >
        {/* Título */}
        <Grid size={12}>
          <Typography
            variant='h6'
            textAlign='center'
            fontWeight='bold'
            color='#D72E7A'
          >
            Detalle de publicación
          </Typography>
        </Grid>

        {/* Contenido */}
        <Grid size={{ xs: 12, sm: 8, md: 6 }}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 3,
              p: { xs: 1, sm: 2 },
              bgcolor: "transparent",
            }}
          >
            <Stack spacing={3}>
              <PostCard post={post} />

              {/* Botón volver */}
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Link to='/comunidad' style={{ textDecoration: "none" }}>
                  <Button
                    variant='contained'
                    sx={{
                      borderRadius: "14px",
                      px: 4,
                      bgcolor: "#D72E7A",
                      "&:hover": {
                        bgcolor: "#C2185B",
                      },
                    }}
                  >
                    Volver a la comunidad
                  </Button>
                </Link>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default ShowPost;
