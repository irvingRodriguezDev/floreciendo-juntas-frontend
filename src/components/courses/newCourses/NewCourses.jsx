import React from "react";
import { Card, CardMedia, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import "./swipperCustom.css";
const NewCourses = () => {
  const cursos = [
    {
      name: "curso1",
      image:
        "https://images.pexels.com/photos/7470497/pexels-photo-7470497.jpeg",
    },
    {
      name: "curso2",
      image:
        "https://images.pexels.com/photos/5429781/pexels-photo-5429781.jpeg",
    },
    {
      name: "curso3",
      image:
        "https://images.pexels.com/photos/10396658/pexels-photo-10396658.jpeg",
    },
    {
      name: "curso3",
      image:
        "https://images.pexels.com/photos/10396658/pexels-photo-10396658.jpeg",
    },
    {
      name: "curso3",
      image:
        "https://images.pexels.com/photos/10396658/pexels-photo-10396658.jpeg",
    },
    {
      name: "curso3",
      image:
        "https://images.pexels.com/photos/10396658/pexels-photo-10396658.jpeg",
    },
    {
      name: "curso3",
      image:
        "https://images.pexels.com/photos/10396658/pexels-photo-10396658.jpeg",
    },
    {
      name: "curso3",
      image:
        "https://images.pexels.com/photos/10396658/pexels-photo-10396658.jpeg",
    },
    {
      name: "curso3",
      image:
        "https://images.pexels.com/photos/10396658/pexels-photo-10396658.jpeg",
    },
    {
      name: "curso3",
      image:
        "https://images.pexels.com/photos/10396658/pexels-photo-10396658.jpeg",
    },
  ];

  return (
    <>
      <Typography
        sx={{
          color: "white",
          fontWeight: "bold",
          fontSize: "30px",
          textAlign: "left",
          position: "absolute",
          ml: 5,
          mt: -15,
        }}
      >
        Recien Subidos
      </Typography>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={3}
        navigation
        loop={true}
        // pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1440: { slidesPerView: 4 },
        }}
        style={{ padding: "40px", marginTop: -100 }}
      >
        {cursos.map((c, index) => (
          <SwiperSlide key={index}>
            <Card sx={{ borderRadius: "8px" }}>
              <CardMedia
                component='img'
                height='194'
                image={c.image}
                alt={c.name}
              />
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default NewCourses;
