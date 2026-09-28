import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Chip,
  Stack,
  Fab,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AuthContext from "../../context/Auth/AuthContext";
import CommunityContext from "../../context/Community/CommunityContext";
import { useDebounce } from "use-debounce";
import CreatePostModal from "./CreatePostCommunityModal";
import PostCard from "./PostCard";
import Birtdays from "../../containers/Birthdays/Birtdays";
import Stories from "../../containers/Stories/Stories";

// Limite recomendado de 6 elementos para evitar saturación de RAM en móviles
const ROWS_PER_PAGE = 6;

const COLORS = {
  primary: "#D82E7A",
  primaryHover: "#C02567",
  primarySoft: "rgba(216, 46, 122, 0.08)",
  textMuted: "#6B7280",
  borderLight: "rgba(216, 46, 122, 0.12)",
};

const CATEGORIES = [
  { id: "all", label: "Todos", icon: "🌸" },
  { id: "floreciendo-juntas", label: "General y Charlas", icon: "💬" },
  { id: "servicios", label: "Servicios", icon: "💼" },
  { id: "productos", label: "Productos", icon: "🛍️" },
];

export default function CommunityFeed() {
  const [openWritePost, setOpenWritePost] = useState(false);
  const { community_posts, getFeed, totalPages, currentPage } =
    useContext(CommunityContext);
  const { usuario, autenticado } = useContext(AuthContext);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fetchingMore, setFetchingMore] = useState(false);

  const [debounceSearch] = useDebounce(search, 600);
  const observerRef = useRef(null);

  const handleClickOpenWritePost = () => setOpenWritePost(true);
  const handleCloseWritePost = () => setOpenWritePost(false);

  // 1. Cambio de categoría: Resetea paginación
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setPage(1);
  };

  // 2. Carga inicial / Reset por búsqueda o cambio de categoría
  useEffect(() => {
    let active = true;

    const fetchCommunityData = async () => {
      if (!autenticado) return;
      setLoading(true);

      try {
        const typeParam = selectedCategory === "all" ? "" : selectedCategory;
        setPage(1);
        await getFeed(1, ROWS_PER_PAGE, debounceSearch, typeParam);
      } catch (error) {
        console.error("Error al cargar la comunidad:", error);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchCommunityData();

    return () => {
      active = false;
    };
  }, [debounceSearch, selectedCategory, autenticado]);

  // 3. Cargar más publicaciones al hacer Scroll
  const loadMorePosts = useCallback(async () => {
    if (loading || fetchingMore || page >= totalPages || !autenticado) return;

    setFetchingMore(true);
    const nextPage = page + 1;
    const typeParam = selectedCategory === "all" ? "" : selectedCategory;

    try {
      await getFeed(nextPage, ROWS_PER_PAGE, debounceSearch, typeParam);
      setPage(nextPage);
    } catch (error) {
      console.error("Error al cargar más publicaciones:", error);
    } finally {
      setFetchingMore(false);
    }
  }, [
    loading,
    fetchingMore,
    page,
    totalPages,
    autenticado,
    selectedCategory,
    debounceSearch,
    getFeed,
  ]);

  // 4. Observer Callback para centinela al final de la pantalla
  const lastPostElementRef = useCallback(
    (node) => {
      if (loading || fetchingMore) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && page < totalPages) {
          loadMorePosts();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading, fetchingMore, page, totalPages, loadMorePosts],
  );

  return (
    <Box sx={{ width: "100%", pb: 6 }}>
      {/* 1. SECCIONES SUPERIORES */}
      <Birtdays />
      <Stories />

      {/* 2. CREAR PUBLICACIÓN (TRIGGER) */}
      <Paper
        elevation={0}
        onClick={handleClickOpenWritePost}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          p: { xs: 1.2, sm: 1.8 },
          mb: 2.5,
          borderRadius: "18px",
          cursor: "pointer",
          bgcolor: "#FFFFFF",
          border: `1px solid ${COLORS.borderLight}`,
          boxShadow: "0 2px 12px rgba(216, 46, 122, 0.04)",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            borderColor: COLORS.primary,
            boxShadow: "0 4px 18px rgba(216, 46, 122, 0.1)",
            transform: "translateY(-1px)",
          },
        }}
      >
        <Avatar
          src={usuario?.profileImage}
          alt={usuario?.name || "Usuario"}
          sx={{
            width: { xs: 40, sm: 44 },
            height: { xs: 40, sm: 44 },
            border: `2px solid ${COLORS.primarySoft}`,
          }}
        />

        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "#F9FAFB",
            borderRadius: "30px",
            px: 2.5,
            py: 1,
            border: "1px solid #E5E7EB",
          }}
        >
          <Typography
            variant='body2'
            sx={{
              color: COLORS.textMuted,
              fontSize: { xs: "0.85rem", sm: "0.92rem" },
            }}
          >
            ¿Qué quieres compartir hoy,{" "}
            <Box
              component='b'
              sx={{
                color: COLORS.primary,
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              {usuario?.name?.split(" ")[0] || "creadora"}
            </Box>
            ?
          </Typography>
        </Box>
      </Paper>

      {/* 3. FILTROS RÁPIDOS */}
      <Stack
        direction='row'
        spacing={1}
        sx={{
          mb: 3,
          overflowX: "auto",
          py: 0.5,
          "::-webkit-scrollbar": { display: "none" },
        }}
      >
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <Chip
              key={cat.id}
              label={`${cat.icon} ${cat.label}`}
              onClick={() => handleCategoryChange(cat.id)}
              clickable
              sx={{
                fontWeight: 600,
                fontSize: { xs: "0.8rem", sm: "0.88rem" },
                px: 1,
                py: 2.2,
                borderRadius: "12px",
                bgcolor: isSelected ? COLORS.primary : "#FFFFFF",
                color: isSelected ? "#FFFFFF" : "#4B5563",
                border: isSelected ? "none" : "1px solid #E5E7EB",
                boxShadow: isSelected
                  ? "0 4px 14px rgba(216, 46, 122, 0.25)"
                  : "none",
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: isSelected ? COLORS.primaryHover : "#F3F4F6",
                },
              }}
            />
          );
        })}
      </Stack>

      {/* 4. FEED DE PUBLICACIONES */}
      <Box sx={{ position: "relative", minHeight: 300 }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress sx={{ color: COLORS.primary }} />
          </Box>
        ) : community_posts && community_posts.length > 0 ? (
          <Stack spacing={2.5}>
            {community_posts.map((post) => (
              <PostCard key={post.id || post._id} post={post} />
            ))}
          </Stack>
        ) : (
          <Paper
            elevation={0}
            sx={{
              p: 4,
              textAlign: "center",
              borderRadius: "16px",
              bgcolor: "#F9FAFB",
              border: "1px dashed #E5E7EB",
            }}
          >
            <Typography variant='body1' color='text.secondary'>
              No se encontraron publicaciones en esta categoría.
            </Typography>
          </Paper>
        )}

        {/* INDICADOR DE CARGA SUCESIVA (SCROLL) */}
        {fetchingMore && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress size={30} sx={{ color: COLORS.primary }} />
          </Box>
        )}

        {/* CENTINELA INVISIBLE PARA INTERSECTION OBSERVER */}
        {!loading && page < totalPages && (
          <Box ref={lastPostElementRef} sx={{ height: 20, my: 1 }} />
        )}

        {/* MENSAJE DE FIN DE CONTENIDO */}
        {!loading && page >= totalPages && community_posts?.length > 0 && (
          <Typography
            variant='body2'
            color='text.secondary'
            align='center'
            sx={{ mt: 4, mb: 2, fontWeight: 500 }}
          >
            🌸 ¡Has llegado al final de las publicaciones!
          </Typography>
        )}
      </Box>

      {/* 5. FAB MÓVIL */}
      {autenticado && (
        <Tooltip title='Crear Publicación'>
          <Fab
            color='primary'
            onClick={handleClickOpenWritePost}
            sx={{
              position: "fixed",
              bottom: 24,
              right: 24,
              bgcolor: COLORS.primary,
              "&:hover": { bgcolor: COLORS.primaryHover },
              display: { xs: "flex", md: "none" },
              zIndex: 1000,
              boxShadow: "0 8px 24px rgba(216, 46, 122, 0.4)",
            }}
          >
            <EditNoteIcon sx={{ fontSize: 28 }} />
          </Fab>
        </Tooltip>
      )}

      {/* MODAL DE CREACIÓN */}
      <CreatePostModal
        open={openWritePost}
        handleClose={handleCloseWritePost}
        usuario={usuario ?? null}
        defaultType={
          selectedCategory === "all" ? "floreciendo-juntas" : selectedCategory
        }
      />
    </Box>
  );
}
