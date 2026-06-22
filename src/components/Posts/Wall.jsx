import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Grid,
  useTheme,
  useMediaQuery,
  Avatar,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import ForumIcon from "@mui/icons-material/Forum";
import PostCard from "./PostCard";
import CreatePostModal from "./CreatePostModal";
import PostsContext from "../../context/Posts/PostsContext";
import AuthContext from "../../context/Auth/AuthContext"; // Importado para el avatar de la alumna
import PinkSpinner from "../Loading/PinkSpinner";
import Pagination from "../Pagination/Pagination";

const Wall = ({ courseId, isAuthenticating, isSubscribed }) => {
  const { getPosts, posts, totalPages } = useContext(PostsContext);
  const { usuario } = useContext(AuthContext);
  const theme = useTheme();

  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (!courseId || !isSubscribed) return;

    const fetchPosts = async () => {
      setLoading(true);
      await getPosts(courseId, page, rowsPerPage);
      setLoading(false);
    };

    fetchPosts();
  }, [courseId, page, rowsPerPage, isSubscribed]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      setPage(newPage);
    }
  };

  const handleCreatePost = () => setOpenModal(false);

  return (
    <Box
      sx={{
        maxWidth: "760px", // Ancho óptimo de lectura tipo feed editorial
        mx: "auto",
        px: { xs: 2, sm: 3 },
        pt: 2,
        pb: 8,
      }}
    >
      <Stack spacing={3}>
        {/* 📝 BARRA DE CREACIÓN ESTILO SOCIAL PREMIUM */}
        {isSubscribed && (
          <Box
            sx={{
              p: 2,
              borderRadius: "20px",
              backgroundColor: "#fff",
              border: "1px solid #F3F4F6",
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Avatar
              src={usuario?.avatar_url}
              alt={usuario?.name}
              sx={{
                bgcolor: "#FFF5F7",
                color: "#E53888",
                fontWeight: "bold",
                fontSize: "14px",
                width: 40,
                height: 40,
              }}
            >
              {usuario?.name?.charAt(0).toUpperCase()}
            </Avatar>

            <Button
              fullWidth
              onClick={() => setOpenModal(true)}
              sx={{
                justifyContent: "flex-start",
                backgroundColor: "#F9FAFB",
                color: "#9CA3AF",
                borderRadius: "14px",
                py: 1.2,
                px: 2,
                textTransform: "none",
                fontSize: "0.95rem",
                border: "1px solid #F3F4F6",
                "&:hover": {
                  backgroundColor: "#FFF5F7",
                  borderColor: "#FCE7F3",
                  color: "#E53888",
                },
              }}
            >
              ¿Tienes alguna duda o avance del curso? Pregunta aquí...
            </Button>

            <Button
              onClick={() => setOpenModal(true)}
              sx={{
                minWidth: "auto",
                width: 42,
                height: 42,
                borderRadius: "12px",
                backgroundColor: "#FFF5F7",
                color: "#E53888",
                flexShrink: 0,
                "&:hover": { backgroundColor: "#FCE7F3" },
              }}
            >
              <CreateIcon sx={{ fontSize: "18px" }} />
            </Button>
          </Box>
        )}

        {/* 🔹 SECCIÓN DE CONTENIDO PRINCIPAL (FEED / LOADER) */}
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
              <PinkSpinner />
              <Typography
                variant='caption'
                sx={{ color: "#9CA3AF", fontWeight: 600 }}
              >
                Cargando el muro de la comunidad...
              </Typography>
            </Box>
          ) : posts.length === 0 ? (
            /* ❄️ COMPONENTE ROMPER EL HIELO INTEGRADO Y PREMIUM */
            <Box
              textAlign='center'
              sx={{
                py: 8,
                px: 4,
                backgroundColor: "#fff",
                borderRadius: "24px",
                border: "1px dashed #E5E7EB",
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
                  backgroundColor: "#FFF5F7",
                  color: "#E53888",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2.5,
                }}
              >
                <ForumIcon sx={{ fontSize: "28px" }} />
              </Box>

              <Typography
                variant='h6'
                sx={{
                  color: "#1F2937",
                  fontWeight: 800,
                  mb: 1,
                  fontSize: "1.15rem",
                }}
              >
                El muro de la clase está listo
              </Typography>

              <Typography
                variant='body2'
                sx={{
                  color: "#6B7280",
                  maxW: "420px",
                  mx: "auto",
                  mb: 3,
                  lineHeight: 1.5,
                }}
              >
                Todavía no hay publicaciones aquí. Sé la primera en compartir
                tus prácticas o resolver tus dudas con las instructoras de
                Wapizima.
              </Typography>

              {isSubscribed && (
                <Button
                  variant='outlined'
                  onClick={() => setOpenModal(true)}
                  sx={{
                    borderColor: "#E53888",
                    color: "#E53888",
                    borderRadius: "12px",
                    px: 3,
                    py: 1,
                    fontWeight: "bold",
                    textTransform: "none",
                    "&:hover": {
                      borderColor: "#C2185B",
                      backgroundColor: "#FFF5F7",
                    },
                  }}
                >
                  ¡Dejar la primera publicación!
                </Button>
              )}
            </Box>
          ) : (
            <>
              {/* Feed con PostCard Limpio */}
              <Box sx={{ width: "100%" }}>
                <PostCard posts={posts} />
              </Box>

              {/* Contenedor de Paginación Editorial */}
              {totalPages > 1 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 4,
                    pt: 2,
                    borderTop: "1px solid #F3F4F6",
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

      {/* Modales */}
      <CreatePostModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        courseId={courseId}
        onSubmit={handleCreatePost}
      />
    </Box>
  );
};

export default Wall;
