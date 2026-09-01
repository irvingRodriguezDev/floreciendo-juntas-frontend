import { useEffect, useState } from "react";
import { Box, Typography, Grid, Button, Stack, Paper } from "@mui/material";
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";

import Layout from "../../../components/Layout/Layout";
import PostCard from "../../../components/Community/PostCard";
import { usePostShow } from "../../../hooks/usePostShow";
import PinkSpinner from "../../../components/Loading/PinkSpinner";

const ShowPost = () => {
  const { postId } = useParams();
  const [searchParams] = useSearchParams();
  const commentId = searchParams.get("commentId");

  const { post, loading, error } = usePostShow(postId);
  const [highlightedCommentId, setHighlightedCommentId] = useState(null);

  // 1. Cambiar el título del documento dinámicamente
  useEffect(() => {
    if (post) {
      document.title =
        post.title || `Publicación de ${post.user?.name || "Comunidad"}`;
    }
    return () => {
      document.title = "Comunidad";
    };
  }, [post]);

  // 2. Scroll dinámico + Resaltado del comentario objetivo
  useEffect(() => {
    if (!post || !commentId) return;

    let highlightTimer;

    const timer = setTimeout(() => {
      const el = document.getElementById(`comment-${commentId}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        setHighlightedCommentId(commentId);

        highlightTimer = setTimeout(() => setHighlightedCommentId(null), 3500);
      }
    }, 400);

    return () => {
      clearTimeout(timer);
      if (highlightTimer) clearTimeout(highlightTimer);
    };
  }, [post, commentId]);

  // 🔄 Estado de carga
  if (loading) {
    return (
      <Layout>
        <PinkSpinner label='Consultando información' />
      </Layout>
    );
  }

  // ⚠️ Error de red o servidor (diferente de 404)
  if (error && error.status !== 404) {
    return (
      <Layout>
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography textAlign='center' variant='h6' color='text.secondary'>
            Ocurrió un error al cargar la publicación 😕
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              variant='outlined'
              onClick={() => window.location.reload()}
              sx={{ color: "#D72E7A", borderColor: "#D72E7A" }}
            >
              Reintentar
            </Button>
          </Box>
        </Box>
      </Layout>
    );
  }

  // 🚫 Post no encontrado (404 real)
  if (!post && error?.status === 404) {
    return <Navigate to='/not-found' replace />;
  }

  return (
    <Layout>
      <Grid
        container
        justifyContent='center'
        spacing={3}
        sx={{ px: { xs: 1, sm: 2 }, py: 2 }}
      >
        {/* Encabezado */}
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

        {/* Tarjeta Principal */}
        <Grid size={{ xs: 12, sm: 10, md: 7, lg: 6 }}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 3,
              p: { xs: 0, sm: 1 },
              bgcolor: "transparent",
            }}
          >
            <Stack spacing={3}>
              <PostCard
                post={post}
                isSingleView={true}
                highlightedCommentId={highlightedCommentId}
                hiddenShow={true}
              />

              {/* Botón Volver */}
              <Box sx={{ display: "flex", justifyContent: "center", pb: 4 }}>
                <Button
                  component={Link}
                  to='/comunidad'
                  variant='contained'
                  sx={{
                    borderRadius: "14px",
                    px: 4,
                    py: 1.2,
                    textTransform: "none",
                    fontWeight: 600,
                    bgcolor: "#D72E7A",
                    "&:hover": {
                      bgcolor: "#C2185B",
                    },
                  }}
                >
                  Volver a la comunidad
                </Button>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default ShowPost;
