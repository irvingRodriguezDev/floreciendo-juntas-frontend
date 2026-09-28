import React, { useContext, useEffect, useState, useCallback } from "react";
import { Box, Typography, Button, Stack, Avatar } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import ForumIcon from "@mui/icons-material/Forum";
import PostCard from "./PostCard";
import CreatePostModal from "./CreatePostModal";
import PostsContext from "../../context/Posts/PostsContext";
import AuthContext from "../../context/Auth/AuthContext";
import PinkSpinner from "../Loading/PinkSpinner";
import Pagination from "../Pagination/Pagination";

const Wall = ({ courseId, isAuthenticating, isSubscribed }) => {
  const { getPosts, posts, totalPages } = useContext(PostsContext);
  const { usuario } = useContext(AuthContext);

  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // Memoizamos la función para evitar ejecuciones o ciclos infinitos en useEffect
  const fetchPosts = useCallback(async () => {
    if (!courseId || !isSubscribed) return;
    setLoading(true);
    await getPosts(courseId, page, rowsPerPage);
    setLoading(false);
  }, [courseId, page, rowsPerPage, isSubscribed, getPosts]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      setPage(newPage);
    }
  };

  // 🛡️ Callback para cuando la publicación se creó exitosamente en la API
  const handlePostCreated = async () => {
    setOpenModal(false);
    // Si estábamos en una página mayor a 1, regresamos a la primera para ver la nueva publicación
    if (page !== 1) {
      setPage(1);
    } else {
      await fetchPosts();
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "760px",
        mx: "auto",
        px: { xs: 2, sm: 3 },
        pt: 2,
        pb: 8,
      }}
    >
      <Stack spacing={3}>
        {/* 📝 BARRA DE CREACIÓN */}
        {isSubscribed && (
          <Box
            sx={{
              p: 2,
              borderRadius: "20px",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.8)",
              boxShadow: "0 10px 30px -10px rgba(163, 11, 93, 0.08)",
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Avatar
              src={usuario?.avatar_url}
              alt={usuario?.name}
              sx={{
                bgcolor: "#FFF0F5",
                color: "#D72E79",
                fontWeight: 800,
                fontSize: "14px",
                width: 42,
                height: 42,
              }}
            >
              {usuario?.name?.charAt(0).toUpperCase()}
            </Avatar>

            <Button
              fullWidth
              onClick={() => setOpenModal(true)}
              sx={{
                justifyContent: "flex-start",
                backgroundColor: "#FFF0F6",
                color: "#71717A",
                borderRadius: "50px",
                py: 1.2,
                px: 2.5,
                textTransform: "none",
                fontSize: "0.92rem",
                border: "1px solid rgba(215, 46, 121, 0.15)",
                transition: "all 0.25s ease",
                "&:hover": {
                  backgroundColor: "#FFE4EF",
                  borderColor: "rgba(215, 46, 121, 0.3)",
                  color: "#D72E79",
                },
              }}
            >
              ¿Tienes alguna duda o avance del curso? Pregunta aquí...
            </Button>

            <Button
              onClick={() => setOpenModal(true)}
              aria-label='Crear publicación'
              sx={{
                minWidth: "auto",
                width: 42,
                height: 42,
                borderRadius: "50%",
                backgroundColor: "#FFF0F6",
                color: "#D72E79",
                border: "1px solid rgba(215, 46, 121, 0.2)",
                flexShrink: 0,
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "#D72E79",
                  color: "#FFFFFF",
                },
              }}
            >
              <CreateIcon sx={{ fontSize: "18px" }} />
            </Button>
          </Box>
        )}

        {/* 🔹 SECCIÓN DE CONTENIDO PRINCIPAL */}
        <Box>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "260px",
                gap: 2,
              }}
            >
              <PinkSpinner label='Cargando muro de la comunidad...' />
            </Box>
          ) : posts.length === 0 ? (
            /* ❄️ ESTADO VACÍO (ROMPER EL HIELO) */
            <Box
              textAlign='center'
              sx={{
                py: 7,
                px: 4,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(12px)",
                borderRadius: "28px",
                border: "1.5px dashed rgba(215, 46, 121, 0.25)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  backgroundColor: "#FFF0F6",
                  color: "#D72E79",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2.5,
                  boxShadow: "0 8px 20px rgba(215, 46, 121, 0.15)",
                }}
              >
                <ForumIcon sx={{ fontSize: "28px" }} />
              </Box>

              <Typography
                variant='h6'
                sx={{
                  color: "#2C1820",
                  fontWeight: 800,
                  mb: 1,
                  fontSize: "1.2rem",
                }}
              >
                El muro de la clase está listo
              </Typography>

              <Typography
                variant='body2'
                sx={{
                  color: "#71717A",
                  maxWidth: "420px",
                  mx: "auto",
                  mb: 3,
                  lineHeight: 1.6,
                }}
              >
                Todavía no hay publicaciones aquí. Sé la primera en compartir
                tus prácticas o resolver tus dudas con las instructoras.
              </Typography>

              {isSubscribed && (
                <Button
                  variant='contained'
                  onClick={() => setOpenModal(true)}
                  sx={{
                    borderRadius: "50px",
                    px: 3.5,
                    py: 1.2,
                    fontWeight: 800,
                    textTransform: "none",
                    background:
                      "linear-gradient(135deg, #FF4B93 0%, #D72E79 100%)",
                    boxShadow: "0 8px 20px rgba(215, 46, 121, 0.25)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #D72E79 0%, #B81D60 100%)",
                    },
                  }}
                >
                  ¡Dejar la primera publicación!
                </Button>
              )}
            </Box>
          ) : (
            <>
              {/* FEED DE PUBLICACIONES */}
              <Box sx={{ width: "100%" }}>
                <PostCard posts={posts} />
              </Box>

              {/* PAGINACIÓN EDITORIAL */}
              {totalPages > 1 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 4,
                    pt: 3,
                    borderTop: "1px solid rgba(215, 46, 121, 0.1)",
                  }}
                >
                  <Pagination
                    totalPages={totalPages}
                    currentPage={page}
                    onPageChange={handlePageChange}
                  />
                </Box>
              )}
            </>
          )}
        </Box>
      </Stack>

      {/* MODAL DE CREACIÓN DE POST */}
      <CreatePostModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        courseId={courseId}
        onPostSuccess={handlePostCreated}
      />
    </Box>
  );
};

export default Wall;
