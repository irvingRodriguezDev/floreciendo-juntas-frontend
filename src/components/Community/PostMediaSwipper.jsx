import { Box, GlobalStyles } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useEffect, useState } from "react";

import "swiper/css";
import "swiper/css/pagination";
import MediaItem from "./MediaItem";

const PostMediaSwiper = ({ media = [] }) => {
  if (!media.length) return null;

  const sortedMedia = [...media].sort((a, b) => a.order - b.order);

  return (
    <>
      {/* 🌿 Transición suave de altura */}
      <GlobalStyles
        styles={{
          ".post-media-swiper .swiper-wrapper": {
            transitionProperty: "transform, height",
            transitionDuration: "300ms",
            transitionTimingFunction: "ease",
          },
        }}
      />

      <Box
        sx={{
          width: "100%",
          mb: 2,
          "--swiper-pagination-color": "#EC407A",
          "--swiper-pagination-bullet-inactive-color": "#F48FB1",
          "--swiper-pagination-bullet-inactive-opacity": "0.5",
        }}
      >
        <Swiper
          className='post-media-swiper'
          modules={[Pagination]}
          pagination={{ clickable: true, dynamicBullets: true }}
          slidesPerView={1}
          spaceBetween={0}
          autoHeight
          loop
          onSlideChange={(swiper) => {
            window.dispatchEvent(
              new CustomEvent("slideChange", {
                detail: swiper.realIndex,
              }),
            );
          }}
        >
          {sortedMedia.map((item, index) => (
            <SwiperSlide key={item.id}>
              <MediaItem item={item} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </>
  );
};

export default PostMediaSwiper;
