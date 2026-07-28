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

  const hasOnlyImages = useMemo(() => {
    return (
      sortedMedia.length > 0 &&
      sortedMedia.every((item) => item.type === "image")
    );
  }, [sortedMedia]);

  const hasVideo = useMemo(() => {
    return sortedMedia.some((item) => item.type === "video");
  }, [sortedMedia]);

  if (sortedMedia.length === 0) return null;

  return (
    <>
      <GlobalStyles
        styles={{
          ".post-media-swiper": {
            borderRadius: "12px",
            overflow: "hidden",
            maxHeight: "480px",
          },
          ".post-media-swiper .swiper-wrapper": {
            alignItems: "center",
            transitionProperty: "transform, height",
            transitionDuration: "300ms",
            transitionTimingFunction: "ease",
          },
          ".post-media-swiper .swiper-slide": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxHeight: "480px",
            backgroundColor: "#000000",
          },
          ".post-media-swiper .swiper-pagination": {
            bottom: "8px !important",
          },
          ".post-media-swiper .swiper-pagination-bullet": {
            boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
          },
        }}
      />

      <Box
        sx={{
          width: "100%",
          my: 1.5,
          position: "relative",
          borderRadius: "12px",
          overflow: "hidden",
          "--swiper-pagination-color": "#D72E7A",
          "--swiper-pagination-bullet-inactive-color": "#FFFFFF",
          "--swiper-pagination-bullet-inactive-opacity": "0.6",
        }}
      >
        <Swiper
          className='post-media-swiper'
          modules={[Pagination]}
          pagination={{ clickable: true, dynamicBullets: true }}
          slidesPerView={1}
          spaceBetween={0}
          autoHeight={hasOnlyImages}
          style={hasVideo ? { minHeight: "280px" } : {}}
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
