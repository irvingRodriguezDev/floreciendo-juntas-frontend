import React from "react";
import { Box, CardMedia, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Progress from "../../Progress/Progress";

const NewCourseCard = ({ course, hasProgress }) => {
  return (
    <Link
      to={`/detalle-curso/${course.id}`}
      style={{
        textDecoration: "none",
        width: "100%",
        display: "block",
      }}
    >
      <Box
        component={motion.div}
        whileHover={{
          y: -6,
          borderColor: "#F472B6",
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        sx={{
          borderRadius: "24px",
          overflow: "hidden",
          backgroundColor: "#fff",
          border: "1px solid #F3F4F6",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          boxShadow: "none",
          transition: "border-color 0.2s ease",
          p: 1.5,
        }}
      >
        {/* Imagen del Curso */}
        <Box sx={{ width: "100%", position: "relative" }}>
          <CardMedia
            component='img'
            image={course.cover_image_url}
            alt={course.title}
            sx={{
              width: "100%",
              aspectRatio: "3 / 4",
              objectFit: "cover",
              borderRadius: "16px",
              backgroundColor: "#FFF5F7",
            }}
          />
        </Box>

        {/* Contenido de la Tarjeta */}
        <Box
          sx={{
            p: 1.5,
            pt: 2,
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            justifyContent: "space-between",
          }}
        >
          {/* Bloque Superior: Progreso y Título */}
          <Box>
            {hasProgress && (
              <Box sx={{ width: "100%", mb: 1.5 }}>
                <Progress progress={course?.user_progress_percentage ?? 0} />
              </Box>
            )}

            <Typography
              sx={{
                fontWeight: 800,
                fontSize: "0.95rem",
                lineHeight: 1.35,
                color: "#1F2937",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                minHeight: "2.6rem",
              }}
            >
              {course.title}
            </Typography>
          </Box>

          {/* Bloque Inferior: Lecciones y CTA */}
          <Typography
            variant='caption'
            sx={{
              color: "#E91E63",
              fontWeight: "bold",
              mt: 1.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>{course.videosCount || 0} Lecciones</span>
            <span>Ver →</span>
          </Typography>
        </Box>
      </Box>
    </Link>
  );
};

export default NewCourseCard;
