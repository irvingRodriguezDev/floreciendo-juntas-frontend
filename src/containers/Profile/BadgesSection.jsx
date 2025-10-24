import React, { useContext, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import DiamondIcon from "@mui/icons-material/Diamond";
import UserContext from "../../context/User/UserContext";
import AuthContext from "../../context/Auth/AuthContext";
import CourseCompletedIcon from "../../components/icons/CourseCompletedIcon";
const PRIMARY_PINK = "#E53888";
const BADGE_COLOR = "#F7CDD9"; // Rosa de fondo de las insignias

const BadgesSection = () => {
  const { usuario } = useContext(AuthContext);
  const { getCoursesCompletedByUser, coursesCompleted } =
    useContext(UserContext);
  useEffect(() => {
    getCoursesCompletedByUser(usuario.id);
  }, []);
  // const badges = Array.from({ length: badgeCount }, (_, i) => ({
  //   id: i + 1,
  //   name: `Experta en Nivel ${i + 1}`,
  //   description: `Completado el módulo avanzado de Técnicas de Uñas ${i + 1}.`,
  // }));
  console.log(coursesCompleted, "los cursos completados");

  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "white",
        borderRadius: "16px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
      }}
    >
      <Typography
        variant='h5'
        color={PRIMARY_PINK}
        sx={{ mb: 3, fontWeight: 600 }}
      >
        Insignias & Logros
      </Typography>

      <Grid container spacing={3} justifyContent='center'>
        <Grid size={{ xs: 6, sm: 4, md: 2.4 }}>
          <Typography textAlign='center'>Cursos completados</Typography>
          <Box
            sx={{
              textAlign: "center",
              p: 2,
              borderRadius: "50%",
              bgcolor: BADGE_COLOR,
              border: `2px solid ${PRIMARY_PINK}`,
              width: 80,
              height: 80,
              mx: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            <CourseCompletedIcon width={50} />
          </Box>
          <Typography
            variant='caption'
            display='block'
            textAlign='center'
            sx={{ mt: 1, fontWeight: 600 }}
          >
            x {coursesCompleted.coursesCompleted}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BadgesSection;
