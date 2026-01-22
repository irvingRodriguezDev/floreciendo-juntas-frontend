import { Box, GlobalStyles } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useState, useMemo } from "react";

import "swiper/css";
import "swiper/css/pagination";
import MediaItem from "./MediaItem";

const PostMediaSwiper = ({ media = [] }) => {
  if (!media.length) return null;

  const sortedMedia = [...media].sort((a, b) => a.order - b.order);
  const [activeIndex, setActiveIndex] = useState(0);

  // 🔥 Detectar si todos los medios son imágenes
  const hasOnlyImages = useMemo(() => {
    return sortedMedia.every((item) => item.type === "image");
  }, [sortedMedia]);

  // 🔥 Detectar si hay al menos un video
  const hasVideo = useMemo(() => {
    return sortedMedia.some((item) => item.type === "video");
  }, [sortedMedia]);

  return (
    <>
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
          autoHeight={hasOnlyImages} // ✅ Solo si todas son imágenes
          style={hasVideo ? { minHeight: "300px" } : {}} // ✅ Altura mínima solo si hay videos
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
          }}
        >
          {sortedMedia.map((item, index) => (
            <SwiperSlide key={item.id}>
              <MediaItem item={item} isActive={activeIndex === index} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </>
  );
};

export default PostMediaSwiper;
