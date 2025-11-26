import React, { useContext, useEffect } from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { motion } from "framer-motion";
import UserContext from "../../context/User/UserContext";
import AuthContext from "../../context/Auth/AuthContext";
import CourseCompletedIcon from "../../components/icons/CourseCompletedIcon";

const PRIMARY_PINK = "#E53888";
const BADGE_BG = "#FFE6F1";

const BadgesSection = () => {
  const { usuario } = useContext(AuthContext);
  const { getCoursesCompletedByUser, coursesCompleted } =
    useContext(UserContext);

  useEffect(() => {
    if (usuario?.id) {
      getCoursesCompletedByUser(usuario.id);
    }
  }, []);

  return (
    <Paper
      elevation={0}
      component={motion.div}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      sx={{
        p: 3,
        borderRadius: "20px",
        background: "linear-gradient(135deg,#FFF4F9 0%, #FFEAF1 100%)",
        border: "1px solid rgba(229,56,136,0.15)",
        boxShadow:
          "0 6px 16px rgba(229,56,136,0.12), inset 0 0 20px rgba(255,255,255,0.6)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* DECORACIÓN */}
      <Box
        sx={{
          position: "absolute",
          top: -20,
          left: -20,
          width: 120,
          height: 120,
          background: "rgba(229,56,136,0.12)",
          borderRadius: "50%",
          filter: "blur(35px)",
        }}
      />

      <Typography
        variant='h5'
        sx={{
          mb: 3,
          fontWeight: 700,
          color: PRIMARY_PINK,
          textAlign: "center",
        }}
      >
        Insignias & Logros 🌸
      </Typography>

      <Grid container spacing={4} justifyContent='center'>
        {/* BADGE - Cursos completados */}
        <Grid size={{ xs: 6, sm: 4, md: 3 }} textAlign='center'>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Box
              sx={{
                mx: "auto",
                width: 100,
                height: 100,
                borderRadius: "50%",
                bgcolor: BADGE_BG,
                border: `3px solid ${PRIMARY_PINK}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                boxShadow:
                  "0 4px 14px rgba(229,56,136,0.25), inset 0 0 20px rgba(255,255,255,0.6)",
              }}
            >
              {/* Icono */}
              <CourseCompletedIcon width={58} height={58} />
            </Box>

            {/* Título */}
            <Typography
              variant='subtitle2'
              sx={{ mt: 1, fontWeight: 600, color: PRIMARY_PINK }}
            >
              Cursos completados
            </Typography>

            {/* Contador */}
            <Typography
              variant='body1'
              sx={{
                mt: 0.5,
                fontWeight: 700,
                color: "#4A4A4A",
                fontSize: "1.1rem",
              }}
            >
              ✨ x {coursesCompleted?.coursesCompleted || 0}
            </Typography>
          </motion.div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BadgesSection;
