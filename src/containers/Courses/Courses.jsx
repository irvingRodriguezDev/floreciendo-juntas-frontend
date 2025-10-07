import React from "react";
import Layout from "../../components/Layout/Layout";
import FullScreenVideo from "../../components/FullScreenVideo";

import NewCourses from "../../components/courses/newCourses/NewCourses";
import TopCourses from "../../components/courses/topCourses/TopCourses";
import SearchCourses from "../../components/courses/SearchCourses";
import AllCourses from "../../components/courses/AllCourses/AllCourses";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import NailIconOne from "../../components/icons/NailIconOne";
import NailIconTwo from "../../components/icons/NailIconTwo";
import NailIconThree from "../../components/icons/NailIconThree";
const Courses = () => {
  const systems = [
    { icon: <NailIconOne width={100} />, name: "Uñas uno" },
    { icon: <NailIconTwo width={100} />, name: "Uñas dos" },
    { icon: <NailIconThree width={100} />, name: "Uñas Tres" },
    { icon: <NailIconOne width={100} />, name: "Uñas cuatro" },
  ];
  return (
    <Layout>
      <FullScreenVideo />
      <NewCourses />
      <Grid container spacing={2}>
        <Grid size={12} sx={{ paddingLeft: "100px" }}>
          <Typography fontWeight='semibold' fontSize='45px'>
            Explora
          </Typography>
          <Typography
            fontWeight='bold'
            fontSize='70px'
            fontFamily='sans-serif'
            sx={{
              textShadow:
                "2px 2px 4px rgba(0,0,0,0.5), -1px -1px 2px rgba(255,0,0,0.3)",
            }}
          >
            Nuestros Cursos Populares
          </Typography>
        </Grid>
        <TopCourses />
        <Grid size={12} sx={{ bgcolor: "#F7F6FA" }}>
          <Grid size={12} sx={{ paddingLeft: "100px" }}>
            <Typography fontWeight='semibold' fontSize='45px'>
              Encuentra
            </Typography>
            <Typography
              fontWeight='bold'
              fontSize='70px'
              fontFamily='sans-serif'
              sx={{
                textShadow:
                  "2px 2px 4px rgba(0,0,0,0.5), -1px -1px 2px rgba(255,0,0,0.3)",
              }}
            >
              El curso ideal para ti
            </Typography>
          </Grid>
          <Grid
            size={12}
            sx={{
              display: "flex",
              justifyContent: "end",
              paddingRight: "20px",
            }}
          >
            {systems.map((s) => (
              <Typography sx={{ padding: "10px" }} fontWeight='bold'>
                {s.name}
              </Typography>
            ))}
          </Grid>
          <TopCourses />
        </Grid>
      </Grid>
      <SearchCourses />
      <AllCourses />
    </Layout>
  );
};

export default Courses;
