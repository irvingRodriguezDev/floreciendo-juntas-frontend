import React from "react";
import Layout from "../../components/Layout/Layout";
import FullScreenVideo from "../../components/FullScreenVideo";
import NewCourses from "../../components/courses/newCourses/NewCourses";
import TopCourses from "../../components/courses/topCourses/TopCourses";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Button, Grid, Typography } from "@mui/material";

import Systems from "../Systems/Systems";
const Courses = () => {
  return (
    <Layout>
      <FullScreenVideo />
      <NewCourses />
      <Grid container spacing={2}>
        <Grid
          size={12}
          sx={{
            paddingLeft: { xs: "10px", sm: "10px", mf: "0px", lg: "100px" },
          }}
        >
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
        <Grid size={12} sx={{}}>
          <Grid size={12} sx={{ paddingLeft: { xs: "12px", lg: "100px" } }}>
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
              padding: "20px",
              borderRadius: "12px",
            }}
          >
            <Systems />
            {/* {systems.map((s) => (
              <Typography sx={{ padding: "10px" }} fontWeight='bold'>
                {s.name}
              </Typography>
            ))} */}
          </Grid>
        </Grid>
        <Grid>
          <Grid size={12} sx={{ paddingLeft: { xs: "12px", lg: "100px" } }}>
            <Typography fontWeight='semibold' fontSize='45px'>
              Eventos
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
              Siempre cerca de ti
            </Typography>
          </Grid>
          <Grid size={12}>
            <TopCourses />
          </Grid>
          <Grid size={12} sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              size='large'
              variant='contained'
              startIcon={<CalendarMonthIcon />}
              sx={{ padding: "10px", mb: 5, borderRadius: "12px" }}
            >
              Ver todos los eventos
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Courses;
