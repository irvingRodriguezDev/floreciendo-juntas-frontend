import React from "react";
import "./TopCourses.css"; // aquí guardaremos los estilos extra

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
    <div className='top-movies-container'>
      <h2>Los cursos top</h2>
      <div className='movies-list'>
        {courses.map((movie) => (
          <div key={movie.id} className='movie-card'>
            <span className='movie-rank'>{movie.id}</span>
            <img src={movie.img} alt={movie.title} className='movie-img' />
            <p className='movie-title'>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCourses;
