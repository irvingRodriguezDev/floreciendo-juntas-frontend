import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

// Importar estilos de Swiper
import "swiper/css";
import "swiper/css/pagination";

const PostMediaSwiper = ({ media = [] }) => {
  if (!media || media.length === 0) return null;

  // Ordenar los medios antes de renderizar
  const sortedMedia = [...media].sort((a, b) => a.order - b.order);

  return (
    <Box
      sx={{
        width: "100%",
        mb: 2,
        position: "relative",
        "& .swiper-pagination-bullet": {
          backgroundColor: "#fff",
          opacity: 0.6,
        },
        "& .swiper-pagination-bullet-active": {
          backgroundColor: "#fff",
          opacity: 1,
        },
      }}
    >
      <Swiper
        modules={[Pagination]}
        pagination={{
          clickable: true,
          dynamicBullets: true, // Estilo Instagram que encoge los puntos lejanos
        }}
        slidesPerView={1}
        spaceBetween={0} // En Instagram no hay espacio entre fotos
        style={{
          width: "100%",
          borderRadius: "8px", // Instagram suele ser menos redondeado en el feed
          overflow: "hidden",
        }}
      >
        {sortedMedia.map((item) => (
          <SwiperSlide key={item.id}>
            <Box
              sx={{
                width: "100%",
                aspectRatio: "1 / 1", // Mantiene el formato cuadrado
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#000",
              }}
            >
              {item.type === "image" ? (
                <Box
                  component='img'
                  src={item.url}
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <Box
                  component='video'
                  src={item.url}
                  controls={false} // Instagram no muestra controles nativos por defecto
                  autoPlay
                  loop
                  muted
                  playsInline // Obligatorio para que funcione en iPhone/Android dentro del feed
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover", // Clave para que el video no tenga barras negras
                    backgroundColor: "#000",
                  }}
                  onClick={(e) => {
                    // Simulación de mute/unmute al hacer clic, como en IG
                    e.currentTarget.muted = !e.currentTarget.muted;
                  }}
                />
              )}
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default PostMediaSwiper;
