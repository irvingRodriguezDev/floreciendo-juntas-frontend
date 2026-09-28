import { Box, GlobalStyles } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useState, useMemo } from "react";

import "swiper/css";
import "swiper/css/pagination";
import MediaItem from "./MediaItem";

const PostMediaSwiper = ({ media = [] }) => {
  const safeMedia = media || [];

  const sortedMedia = useMemo(() => {
    return [...safeMedia].sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [safeMedia]);

  const [activeIndex, setActiveIndex] = useState(0);

  if (sortedMedia.length === 0) return null;

  return (
    <>
      <GlobalStyles
        styles={{
          ".post-media-swiper": {
            width: "100%",
            borderRadius: "14px",
            overflow: "hidden",
          },
          ".post-media-swiper .swiper-wrapper": {
            transitionProperty: "transform, height !important",
            transitionDuration: "300ms !important",
            transitionTimingFunction: "ease !important",
            alignItems: "flex-start",
          },
          ".post-media-swiper .swiper-slide": {
            width: "100%",
            height: "auto",
            display: "block",
            backgroundColor: "transparent",
          },
          ".post-media-swiper .swiper-pagination": {
            bottom: "8px !important",
          },
          ".post-media-swiper .swiper-pagination-bullet": {
            boxShadow: "0 1px 4px rgba(0,0,0,0.4)",
          },
        }}
      />

      <Box
        sx={{
          width: "100%",
          my: 1.5,
          position: "relative",
          "--swiper-pagination-color": "#D82E7A",
          "--swiper-pagination-bullet-inactive-color": "#FFFFFF",
          "--swiper-pagination-bullet-inactive-opacity": "0.6",
        }}
      >
        <Swiper
          className='post-media-swiper'
          modules={[Pagination]}
          pagination={
            sortedMedia.length > 1
              ? { clickable: true, dynamicBullets: true }
              : false
          }
          slidesPerView={1}
          spaceBetween={0}
          autoHeight={true}
          observer={true} // Recalcula dimensiones si cambia el DOM interno
          observeParents={true} // Recalcula si cambia el contenedor padre
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
          }}
        >
          {sortedMedia.map((item, index) => (
            <SwiperSlide key={item.id || index}>
              <MediaItem item={item} isActive={activeIndex === index} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </>
  );
};

export default PostMediaSwiper;
