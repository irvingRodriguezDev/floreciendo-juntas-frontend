import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  Grid,
  Avatar,
  Fab,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import AuthContext from "../../context/Auth/AuthContext";
import Floreciendo from "../../containers/Community/Categories/FloreciendoJuntas/Floreciendo";
import CommunityContext from "../../context/Community/CommunityContext";
import { useDebounce } from "use-debounce";
import WritePostIcon from "../icons/WritePostIcon";
import CreatePostModal from "./CreatePostCommunityModal";
import Servicios from "../../containers/Community/Categories/Services/Servicios";
import Productos from "../../containers/Community/Categories/Products/Productos";
// Paleta Floreciendo Juntas 🌸
const colors = {
  background: "#FFF6F9",
  tabBg: "#FFE6EE",
  primary: "#D94885",
  primarySoft: "#F7C6D8",
  textDark: "#8A2E52",
  textSoft: "#AA6B7E",
};

export default function TabsTypeCommunity() {
  const [openWritePost, setOpenWritePost] = useState(false);

  const handleClickOpenWritePost = () => setOpenWritePost(true);
  const handleCloseWritePost = () => setOpenWritePost(false);
  const { community_posts, getFeed, totalPages } = useContext(CommunityContext);
  const { usuario, autenticado } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10); // Si no cambia, puedes dejarlo como constante

  const [debounceSearch] = useDebounce(search, 600);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(0);
  const [type, setType] = useState("floreciendo-juntas");
  const handleChange = (e, newValue) => {
    setValue(newValue);
    setSearch(""); // ✨ Limpia el texto de búsqueda al cambiar de tab
    setPage(1);
    // Opcional: Si quieres actualizar el 'type' aquí mismo como sugerimos antes
    const types = ["floreciendo-juntas", "servicios", "productos"];
    setType(types[newValue]);
  };

  // 🔥 Efecto para resetear página cuando se busca
  useEffect(() => {
    setPage(1);
  }, [debounceSearch]);

  useEffect(() => {
    if (!autenticado) return;

    const fetchCommunityData = async () => {
      setLoading(true);
      try {
        // Pasamos siempre los parámetros para mantener consistencia
        await getFeed(page, rowsPerPage, debounceSearch, type);
      } catch (error) {
        console.error("Error al obtener el feed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunityData();
  }, [page, rowsPerPage, debounceSearch, autenticado, type]); // getFeed suele venir de context, asegúrate que sea estable o usa useCallback en el provider
  // Animación
  const animation = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.35, ease: "easeOut" },
  };

  return (
    <Box
      sx={{
        width: "100%",
        // bgcolor: colors.background,
        borderRadius: 4,
        p: { xs: 2, md: 4 },
        // boxShadow: "0 4px 12px rgba(217, 72, 133, 0.12)",
      }}
    >
      {/* INPUT DE CREACIÓN */}
      <Grid size={12} sx={{ mt: { xs: -2, md: -6 } }}>
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
          <Avatar sx={{ width: 50, height: 50 }} src={usuario?.profileImage} />
          <Box>
            <Typography fontWeight='bold' sx={{ color: "#D82E7A" }}>
              {usuario?.name || "Comunidad"}
            </Typography>
            <Typography variant='body2' sx={{ color: "#909090" }}>
              ¿Qué quieres compartir hoy con nosotras?
            </Typography>
          </Box>
        </Paper>
      </Grid>
      {/* Tabs */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          bgcolor: colors.tabBg,
          mb: 3,
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant='scrollable'
          scrollButtons='auto'
          aria-label='scrollable auto tabs example'
          TabIndicatorProps={{
            style: { backgroundColor: "#d82e7a" },
          }}
          sx={{
            "& .MuiTab-root": {
              fontWeight: 600,
              fontSize: "1rem",
              textTransform: "none",
              color: colors.textSoft,
              px: 3,
              py: 1.5,
              fontFamily: "'Poppins', sans-serif",
            },
            "& .Mui-selected": {
              color: "#d82e7a !important",
            },
          }}
        >
          <Tab label='C. Floreciendo Juntas 🌸' />
          <Tab label='C. Servicios 💼' />
          <Tab label='C. Productos 🛍️' />
        </Tabs>
      </Paper>

      {/* Contenedor con animación */}
      <Box
        sx={{
          //   bgcolor: "#FFFFFF",
          borderRadius: 4,
          p: 3,
          minHeight: 200,
          //   boxShadow: "0 3px 8px rgba(0,0,0,0.04)",
          position: "relative",
        }}
      >
        <AnimatePresence mode='wait'>
          {value === 0 && (
            <motion.div key='t1' {...animation}>
              <Floreciendo
                community_posts={community_posts}
                setSearch={setSearch}
                search={search}
                loading={loading}
                setLoading={setLoading}
                debounceSearch={debounceSearch}
                totalPages={totalPages}
                page={page}
                setPage={setPage}
              />
            </motion.div>
          )}

          {value === 1 && (
            <motion.div key='t2' {...animation}>
              <Servicios
                community_posts={community_posts}
                setSearch={setSearch}
                search={search}
                loading={loading}
                setLoading={setLoading}
                debounceSearch={debounceSearch}
                totalPages={totalPages}
                page={page}
                setPage={setPage}
              />
            </motion.div>
          )}

          {value === 2 && (
            <motion.div key='t3' {...animation}>
              <Productos
                community_posts={community_posts}
                setSearch={setSearch}
                search={search}
                loading={loading}
                setLoading={setLoading}
                debounceSearch={debounceSearch}
                totalPages={totalPages}
                page={page}
                setPage={setPage}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
      {/* BOTÓN FLOTANTE MÓVIL */}
      <Fab
        onClick={handleClickOpenWritePost}
        sx={{
          position: "fixed",
          bottom: 170, // Ajustado: 170 era muy arriba
          right: 20,
          background: "#D82E7A",
          color: "#fff",
          "&:hover": { background: "#c02567" },
          display: { xs: "flex", sm: "none" },
          zIndex: 1000,
        }}
      >
        <WritePostIcon width={30} />
      </Fab>

      <CreatePostModal
        open={openWritePost}
        handleClose={handleCloseWritePost}
        usuario={usuario ?? null}
        defaultType={type}
      />
    </Box>
  );
}
