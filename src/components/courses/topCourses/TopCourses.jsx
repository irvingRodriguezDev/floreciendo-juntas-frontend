import React from "react";
import "./TopCourses.css"; // aquí guardaremos los estilos extra
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

const courses = [
  {
    id: 1,
    title: "French Lover",
    img: "https://images.pexels.com/photos/7470497/pexels-photo-7470497.jpeg",
  },
  {
    id: 2,
    title: "Las Guerreras Kpop",
    img: "https://images.pexels.com/photos/7470497/pexels-photo-7470497.jpeg",
  },
  {
    id: 3,
    title: "Rut y Booz",
    img: "https://images.pexels.com/photos/7470497/pexels-photo-7470497.jpeg",
  },
  {
    id: 4,
    title: "La Llorona",
    img: "https://images.pexels.com/photos/7470497/pexels-photo-7470497.jpeg",
  },
  {
    id: 5,
    title: "Sonic 3",
    img: "https://images.pexels.com/photos/7470497/pexels-photo-7470497.jpeg",
  },
  {
    id: 6,
    title: "Titanes del Pacífico",
    img: "https://images.pexels.com/photos/7470497/pexels-photo-7470497.jpeg",
  },
  {
    id: 7,
    title: "Titanes del Pacífico",
    img: "https://images.pexels.com/photos/7470497/pexels-photo-7470497.jpeg",
  },
  {
    id: 8,
    title: "Titanes del Pacífico",
    img: "https://images.pexels.com/photos/7470497/pexels-photo-7470497.jpeg",
  },
];

const TopCourses = () => {
  return (
    <Box className='top-movies-container'>
      <Typography variant='h5' className='title'>
        Los cursos top
      </Typography>

      <Grid container spacing={2} className='movies-list'>
        {courses.map((movie) => (
          <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
            <Card
              key={movie.id}
              className='movie-card'
              sx={{ backgroundColor: "transparent" }}
            >
              <span className='movie-rank'>{movie.id}</span>

              <CardMedia
                component='img'
                image={movie.img}
                alt={movie.title}
                className='movie-img'
                sx={{ ml: 20, borderRadius: "20px" }}
              />

              <CardContent sx={{ p: 1 }}>
                <Typography
                  variant='body1'
                  className='movie-title'
                  color='white'
                  fontSize='30px'
                  fontWeight='bold'
                >
                  {movie.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TopCourses;
