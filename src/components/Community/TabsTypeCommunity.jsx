import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  Avatar,
  Fab,
  InputBase,
  Container,
} from "@mui/material";
import AuthContext from "../../context/Auth/AuthContext";
import CommunityContext from "../../context/Community/CommunityContext";
import { useDebounce } from "use-debounce";

// Sub-componentes
import Floreciendo from "../../containers/Community/Categories/FloreciendoJuntas/Floreciendo";
import Servicios from "../../containers/Community/Categories/Services/Servicios";
import Productos from "../../containers/Community/Categories/Products/Productos";
import CreatePostModal from "./CreatePostCommunityModal";
import WritePostIcon from "../icons/WritePostIcon";

// Paleta Floreciendo Juntas 🌸
const colors = {
  primary: "#D82E7A",
  primaryHover: "#C02567",
  primarySoft: "rgba(216, 46, 122, 0.08)",
  textDark: "#2C2C2C",
  textMuted: "#757575",
  borderLight: "rgba(216, 46, 122, 0.12)",
};

const TAB_TYPES = ["floreciendo-juntas", "servicios", "productos"];

export default function TabsTypeCommunity() {
  const [openWritePost, setOpenWritePost] = useState(false);
  const { community_posts, getFeed, totalPages } = useContext(CommunityContext);
  const { usuario, autenticado } = useContext(AuthContext);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(0);
  const [type, setType] = useState(TAB_TYPES[0]);

  const rowsPerPage = 10;
  const [debounceSearch] = useDebounce(search, 600);

  const handleClickOpenWritePost = () => setOpenWritePost(true);
  const handleCloseWritePost = () => setOpenWritePost(false);

  const handleChange = (e, newValue) => {
    setValue(newValue);
    setSearch("");
    setPage(1);
    setType(TAB_TYPES[newValue]);
  };

  // Reset de página al buscar
  useEffect(() => {
    if (page !== 1) setPage(1);
  }, [debounceSearch]);

  // Carga de Feed
  useEffect(() => {
    let active = true;

    const fetchCommunityData = async () => {
      if (!autenticado) return;
      setLoading(true);

      try {
        if (active) {
          await getFeed(page, rowsPerPage, debounceSearch, type);
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
  }, [page, debounceSearch, autenticado, type]);

  // Props compartidas entre las 3 pestañas
  const sharedCategoryProps = {
    community_posts,
    setSearch,
    search,
    loading,
    debounceSearch,
    totalPages,
    page,
    setPage,
  };

  return (
    <Box sx={{ width: "100%", pb: 6 }}>
      {/* 1. INPUT DE CREACIÓN (CARD ESTILO RED SOCIAL) */}
      <Paper
        elevation={0}
        onClick={handleClickOpenWritePost}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          p: { xs: 1.5, sm: 2 },
          mb: 3,
          borderRadius: "16px",
          cursor: "pointer",
          bgcolor: "#FFFFFF",
          border: `1px solid ${colors.borderLight}`,
          boxShadow: "0 4px 20px rgba(216, 46, 122, 0.06)",
          transition: "all 0.25s ease-in-out",
          "&:hover": {
            borderColor: colors.primary,
            boxShadow: "0 6px 24px rgba(216, 46, 122, 0.12)",
            transform: "translateY(-1px)",
          },
        }}
      >
        <Avatar
          src={usuario?.profileImage}
          alt={usuario?.name || "Usuario"}
          sx={{
            width: { xs: 42, sm: 48 },
            height: { xs: 42, sm: 48 },
            border: `2px solid ${colors.primarySoft}`,
          }}
        />

        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "#F9FAFB",
            borderRadius: "30px",
            px: 2.5,
            py: 1.2,
            border: "1px solid #E5E7EB",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            variant='body2'
            sx={{
              color: colors.textMuted,
              fontWeight: 400,
              fontSize: { xs: "0.875rem", sm: "0.95rem" },
            }}
          >
            ¿Qué quieres compartir hoy con nosotras,{" "}
            <b style={{ color: colors.primary }}>
              {usuario?.name?.split(" ")[0] || "creadora"}
            </b>
            ?
          </Typography>
        </Box>
      </Paper>

      {/* 2. TABS MODERNOS (TIPO SEGMENTED CONTROL) */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: "14px",
          bgcolor: "#FFFFFF",
          p: 0.8,
          mb: 3,
          border: `1px solid ${colors.borderLight}`,
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant='scrollable'
          scrollButtons='auto'
          allowScrollButtonsMobile
          TabIndicatorProps={{ style: { display: "none" } }} // Ocultamos la barra inferior tradicional
          sx={{
            minHeight: "44px",
            "& .MuiTab-root": {
              fontWeight: 600,
              fontSize: { xs: "0.875rem", sm: "0.95rem" },
              textTransform: "none",
              color: colors.textMuted,
              minHeight: "42px",
              borderRadius: "10px",
              px: { xs: 2, sm: 3 },
              transition: "all 0.2s ease",
            },
            "& .Mui-selected": {
              color: `${colors.primary} !important`,
              bgcolor: colors.primarySoft,
            },
          }}
        >
          <Tab label='🌸 Comunidad Juntas' />
          <Tab label='💼 Servicios' />
          <Tab label='🛍️ Productos' />
        </Tabs>
      </Paper>

      {/* 3. CONTENEDOR DEL FEED */}
      <Box sx={{ position: "relative", minHeight: 300 }}>
        {value === 0 && <Floreciendo {...sharedCategoryProps} />}
        {value === 1 && <Servicios {...sharedCategoryProps} />}
        {value === 2 && <Productos {...sharedCategoryProps} />}
      </Box>

      {/* 4. BOTÓN FLOTANTE MÓVIL (FAB) */}

      {/* MODAL */}
      <CreatePostModal
        open={openWritePost}
        handleClose={handleCloseWritePost}
        usuario={usuario ?? null}
        defaultType={type}
      />
    </Box>
  );
}
