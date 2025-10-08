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
import { motion } from "framer-motion";

const courses = [
  {
    id: 1,
    title: "French Lover",
    img: "https://cloud.wapizima.com.mx/production/courses/mobile/30-mobile",
  },
  {
    id: 2,
    title: "Las Guerreras Kpop",
    img: "https://cloud.wapizima.com.mx/production/courses/mobile/10-mobile",
  },
  {
    id: 3,
    title: "Rut y Booz",
    img: "https://cloud.wapizima.com.mx/production/courses/mobile/13-mobile",
  },
  {
    id: 4,
    title: "La Llorona",
    img: "https://cloud.wapizima.com.mx/production/courses/mobile/51-mobile",
  },
  {
    id: 5,
    title: "Sonic 3",
    img: "https://cloud.wapizima.com.mx/production/courses/mobile/82-mobile",
  },
  {
    id: 6,
    title: "Titanes del Pacífico",
    img: "https://cloud.wapizima.com.mx/production/courses/mobile/20-mobile",
  },
  {
    id: 7,
    title: "Titanes del Pacífico",
    img: "https://cloud.wapizima.com.mx/production/courses/mobile/90-mobile",
  },
  {
    id: 8,
    title: "Titanes del Pacífico",
    img: "https://cloud.wapizima.com.mx/production/courses/mobile/63-mobile",
  },
];

const TopCourses = () => {
  return (
    <Box className='top-movies-container'>
      <Grid container spacing={2} className='movies-list'>
        {courses.map((movie, index) => (
          <Grid
            size={{ xs: 12, md: 6, lg: 3 }}
            sx={{ borderRadius: "40px" }}
            key={index}
          >
            <Card
              key={movie.id}
              className='movie-card'
              sx={{
                backgroundColor: "rgba(241, 189, 206, 0.31)",
                borderRadius: "50px",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(5px)",
                border: "1px solid rgba(241, 189, 206, 0.3)",
                // padding: "10px",
              }}
            >
              <span className='movie-rank'>{movie.id}</span>

              <CardMedia
                component='img'
                image={movie.img}
                alt={movie.title}
                className='movie-img'
                sx={{
                  // ml: 10,
                  width: "300px",
                  height: "400px",
                  borderRadius: "16px",
                }}
              />
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <CardContent sx={{ p: 1 }}>
                  <Typography
                    variant='body1'
                    className='movie-title'
                    color='BLACK'
                    fontSize='30px'
                    fontWeight='bold'
                  >
                    {movie.title}
                  </Typography>
                </CardContent>
              </motion.div>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TopCourses;
