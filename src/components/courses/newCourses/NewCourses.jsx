import React from "react";
import { Card, CardMedia, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import "./swipperCustom.css";
import { motion } from "framer-motion";
const NewCourses = () => {
  const cursos = [
    {
      name: "curso1",
      image:
        "https://cloud.wapizima.com.mx/production/courses/mobile/114-mobile",
    },
    {
      name: "curso2",
      image:
        "https://cloud.wapizima.com.mx/production/courses/mobile/112-mobile",
    },
    {
      name: "curso3",
      image:
        "https://cloud.wapizima.com.mx/production/courses/mobile/111-mobile",
    },
    {
      name: "curso3",
      image:
        "https://cloud.wapizima.com.mx/production/courses/mobile/110-mobile",
    },
    {
      name: "curso3",
      image:
        "https://cloud.wapizima.com.mx/production/courses/mobile/109-mobile",
    },
    {
      name: "curso3",
      image:
        "https://cloud.wapizima.com.mx/production/courses/mobile/68-mobile",
    },
    {
      name: "curso3",
      image:
        "https://cloud.wapizima.com.mx/production/courses/mobile/67-mobile",
    },
    {
      name: "curso3",
      image:
        "https://cloud.wapizima.com.mx/production/courses/mobile/63-mobile",
    },
    {
      name: "curso3",
      image:
        "https://cloud.wapizima.com.mx/production/courses/mobile/60-mobile",
    },
    {
      name: "curso3",
      image:
        "https://cloud.wapizima.com.mx/production/courses/mobile/55-mobile",
    },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
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
      </motion.div>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={2}
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
                width='100%'
                height='250'
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
