import React, { useContext, useEffect, useState } from "react";
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
  Pagination, // 👈 1. Importamos la Paginación
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AuthContext from "../../context/Auth/AuthContext";
import CommunityContext from "../../context/Community/CommunityContext";
import { useDebounce } from "use-debounce";

import CreatePostModal from "./CreatePostCommunityModal";
import PostCard from "./PostCard"; // 👈 Asegúrate de importar tu PostCard actualizado

const colors = {
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
  const { community_posts, getFeed, totalPages } = useContext(CommunityContext);
  const { usuario, autenticado } = useContext(AuthContext);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const rowsPerPage = 10;
  const [debounceSearch] = useDebounce(search, 600);

  const handleClickOpenWritePost = () => setOpenWritePost(true);
  const handleCloseWritePost = () => setOpenWritePost(false);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setPage(1);
  };

  // Handler para la Paginación con scroll suave hacia arriba
  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 80, behavior: "smooth" });
  };

  // Reset de página al buscar
  useEffect(() => {
    if (page !== 1) setPage(1);
  }, [debounceSearch]);

  // Carga unificada de Feed
  useEffect(() => {
    let active = true;

    const fetchCommunityData = async () => {
      if (!autenticado) return;
      setLoading(true);

      try {
        if (active) {
          const typeParam = selectedCategory === "all" ? "" : selectedCategory;
          await getFeed(page, rowsPerPage, debounceSearch, typeParam);
        }
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
  }, [page, debounceSearch, autenticado, selectedCategory]);

  return (
    <Box sx={{ width: "100%", pb: 6 }}>
      {/* 1. INPUT DE CREACIÓN (TARJETA RED SOCIAL) */}
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
          border: `1px solid ${colors.borderLight}`,
          boxShadow: "0 2px 12px rgba(216, 46, 122, 0.04)",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            borderColor: colors.primary,
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
            border: `2px solid ${colors.primarySoft}`,
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
              color: colors.textMuted,
              fontSize: { xs: "0.85rem", sm: "0.92rem" },
            }}
          >
            ¿Qué quieres compartir hoy,{" "}
            <b style={{ color: colors.primary }}>
              {usuario?.name?.split(" ")[0] || "creadora"}
            </b>
            ?
          </Typography>
        </Box>
      </Paper>

      {/* 2. FILTROS RÁPIDOS (CHIPS ORGÁNICOS) */}
      <Stack
        direction={{ xs: "column", sm: "row", md: "row" }}
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
                bgcolor: isSelected ? colors.primary : "#FFFFFF",
                color: isSelected ? "#FFFFFF" : "#4B5563",
                border: isSelected ? "none" : "1px solid #E5E7EB",
                boxShadow: isSelected
                  ? "0 4px 14px rgba(216, 46, 122, 0.25)"
                  : "none",
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: isSelected ? colors.primaryHover : "#F3F4F6",
                },
              }}
            />
          );
        })}
      </Stack>

      {/* 3. FEED DE PUBLICACIONES */}
      <Box sx={{ position: "relative", minHeight: 300 }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress sx={{ color: colors.primary }} />
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
      </Box>

      {/* 4. CONTROL DE PAGINACIÓN */}
      {!loading && totalPages > 1 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 4,
            pt: 2,
          }}
        >
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color='primary'
            shape='rounded'
            size='medium'
            sx={{
              "& .MuiPaginationItem-root": {
                fontWeight: 600,
                borderRadius: "10px",
              },
              "& .Mui-selected": {
                bgcolor: `${colors.primary} !important`,
                color: "#FFFFFF",
                boxShadow: "0 2px 8px rgba(216, 46, 122, 0.3)",
              },
            }}
          />
        </Box>
      )}

      {/* 5. FAB MÓVIL */}
      <Tooltip title='Crear Publicación'>
        <Fab
          color='primary'
          onClick={handleClickOpenWritePost}
          sx={{
            position: "sticky",
            bottom: 100,
            right: 24,
            bgcolor: colors.primary,
            "&:hover": { bgcolor: colors.primaryHover },
            display: { xs: "flex", md: "none" },
            zIndex: 1000,
            boxShadow: "0 8px 24px rgba(216, 46, 122, 0.4)",
          }}
        >
          <EditNoteIcon sx={{ fontSize: 28 }} />
        </Fab>
      </Tooltip>

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
