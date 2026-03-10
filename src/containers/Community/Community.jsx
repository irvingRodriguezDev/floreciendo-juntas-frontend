import { useContext, useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Stack,
  Grid,
  Backdrop,
  Paper,
  Fab,
  Button,
  Tooltip,
} from "@mui/material";
import Layout from "../../components/Layout/Layout";
import AuthContext from "../../context/Auth/AuthContext";
import CreatePostModal from "../../components/Community/CreatePostCommunityModal";
import PostCard from "../../components/Community/PostCard";
import CommunityContext from "../../context/Community/CommunityContext";
import Pagination from "../../components/Pagination/Pagination";
import { Link } from "react-router-dom";
import WritePostIcon from "../../components/icons/WritePostIcon";
import CommunityRulesAccordion from "./CommunityRulesAccordeon";
import SearchCourse from "../../components/courses/SearchCourses";
import { useDebounce } from "use-debounce";
import PinkSpinner from "../../components/Loading/PinkSpinner";

const Community = () => {
  const { autenticado, usuario } = useContext(AuthContext);
  const { community_posts, getFeed, totalPages } = useContext(CommunityContext);
  const [openWritePost, setOpenWritePost] = useState(false);
  const [search, setSearch] = useState("");
  const isSuscribed = usuario ? usuario.isSubscribed : null;
  const handleClickOpenWritePost = () => setOpenWritePost(true);
  const handleCloseWritePost = () => setOpenWritePost(false);
  const [debounceSearch] = useDebounce(search, 600);
  const [loading, setLoading] = useState(false);

  // Paginación
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(30);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    // 1. Si no hay usuario autenticado, cancelamos cualquier intento de carga
    if (!autenticado) {
      setLoading(false);
      return;
    }

    // 2. Definimos la función de carga de forma asíncrona
    const fetchCommunityData = async () => {
      setLoading(true);
      try {
        if (debounceSearch.trim() === "") {
          await getFeed(page, rowsPerPage);
        } else {
          // Si hay búsqueda, reseteamos a página 1 implícitamente en el context
          await getFeed(undefined, undefined, debounceSearch);
        }
      } catch (error) {
        // El interceptor de Axios manejará el 401, aquí solo evitamos que la app rompa
        console.error("Error al obtener el feed de la comunidad:", error);
      } finally {
        // Solo quitamos el loading si el componente sigue montado
        setLoading(false);
      }
    };

    fetchCommunityData();

    // Nota: Eliminamos el timer de 600ms manual para que la UI responda
    // a la velocidad real del servidor, evitando estados de carga fantasma.
  }, [page, rowsPerPage, debounceSearch, autenticado]);

  const isAuthorized = autenticado && isSuscribed;

  return (
    <Layout>
      {/* HERO */}
      <Box
        sx={{
          textAlign: "center",
          py: 4,
          px: 2,
          mt: { xs: -2, lg: -2 },
        }}
      >
        <Typography variant='h4' fontWeight='bold' sx={{ color: "#D82E7A" }}>
          Floreciendo Juntas 🌷
        </Typography>
        <Typography
          variant='body1'
          sx={{
            color: "#777",
            maxWidth: 520,
            mx: "auto",
            mt: 1,
          }}
        >
          Un espacio seguro para compartir, aprender y crecer juntas.
        </Typography>
      </Box>

      <Grid
        container
        spacing={2}
        sx={{
          px: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* BLOQUEO */}
        {!isAuthorized && (
          <Backdrop
            open
            sx={{
              position: "absolute",
              inset: 0,
              zIndex: 5,
              background: "rgba(255,240,247,0.8)",
              backdropFilter: "blur(8px)",
              overflowY: "hidden",
              height: "100vh",
            }}
          >
            <Paper
              sx={{
                p: 4,
                borderRadius: "20px",
                maxWidth: 620,
                textAlign: "center",
              }}
            >
              <Typography
                variant='h5'
                fontWeight='bold'
                sx={{ color: "#D82E7A", mb: 1 }}
              >
                Atención 💗
              </Typography>

              <Typography variant='body1' sx={{ color: "#555" }}>
                Para ver y participar en la comunidad necesitas
                <br />
                {!autenticado && <strong> iniciar sesión</strong>}
                {autenticado && !isSuscribed && (
                  <>
                    {" "}
                    una<strong> suscripción activa</strong>
                  </>
                )}
              </Typography>

              {!autenticado ? (
                <Link to='/iniciar-sesion'>
                  <Button
                    variant='contained'
                    sx={{ bgcolor: "#D82E7A", borderRadius: "12px", mt: 2 }}
                  >
                    Iniciar sesión
                  </Button>
                </Link>
              ) : (
                <Link to='/suscribirme'>
                  <Button
                    variant='contained'
                    sx={{ bgcolor: "#D82E7A", borderRadius: "12px", mt: 2 }}
                  >
                    Suscribirme
                  </Button>
                </Link>
              )}
            </Paper>
          </Backdrop>
        )}
        <Grid
          size={12}
          sx={{ display: "flex", justifyContent: "center", mt: -5 }}
        >
          <CommunityRulesAccordion />
        </Grid>
        {/* CAJA CREAR POST */}
        <Grid
          size={12}
          sx={{ display: "flex", justifyContent: "center", mt: -3 }}
        >
          <Box sx={{ width: "100%", maxWidth: 640 }}>
            <Paper
              onClick={handleClickOpenWritePost}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 2,
                mb: 3,
                borderRadius: "16px",
                cursor: "pointer",
                boxShadow: "0 6px 20px rgba(216,46,122,0.15)",
                transition: "all .2s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 10px 25px rgba(216,46,122,0.25)",
                },
              }}
            >
              <Avatar
                sx={{ width: 50, height: 50 }}
                src={usuario?.profileImage}
              />

              <Box>
                <Typography fontWeight='bold' sx={{ color: "#D82E7A" }}>
                  {usuario?.name}
                </Typography>

                <Typography variant='body2' sx={{ color: "#909090" }}>
                  ¿Qué quieres compartir hoy con nosotras?
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>

      {/* MODAL */}
      <CreatePostModal
        open={openWritePost}
        handleClose={handleCloseWritePost}
        usuario={usuario ?? null}
      />
      {isAuthorized && (
        <Box
          sx={{
            maxWidth: 980,
            mx: "auto",
            px: 1,
            pb: 1,
            mt: -5,
          }}
        >
          <SearchCourse
            setSearch={setSearch}
            placeholder={
              "Escribe para buscar por titulo o contenido de publicación"
            }
          />
        </Box>
      )}

      {/* FEED */}
      {loading ? (
        <PinkSpinner label='Cargando posts' />
      ) : (
        <>
          {autenticado && isSuscribed && (
            <Box
              sx={{
                maxWidth: 640,
                mx: "auto",
                px: 2,
                pb: 6,
              }}
            >
              <Stack spacing={4}>
                {community_posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </Stack>
            </Box>
          )}
        </>
      )}

      {/* FAB MOBILE & PAGINATION */}
      {autenticado && isSuscribed && (
        <>
          <Fab
            onClick={handleClickOpenWritePost}
            sx={{
              position: "fixed",
              bottom: 170,
              right: { xs: 20, sm: 340 }, // Ajustado para que se vea en móvil
              background: "#D82E7A",
              color: "#fff",
              "&:hover": {
                background: "#c02567",
              },
              display: { xs: "flex", sm: "none" },
            }}
          >
            <Tooltip title='Escribir Post' placement='top'>
              <WritePostIcon width={40} />
            </Tooltip>
          </Fab>
          {totalPages > 1 && (
            <Grid container justifyContent='center' sx={{ mt: 3, pb: 12 }}>
              <Pagination
                totalPages={totalPages}
                currentPage={page}
                onPageChange={handlePageChange}
              />
            </Grid>
          )}
        </>
      )}
    </Layout>
  );
};

export default Community;
