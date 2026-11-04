import React from "react";
import { Box, CardMedia, Typography, alpha } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import Progress from "../../Progress/Progress";
import dayjs from "dayjs";
import "dayjs/locale/es"; // Asegúrate de tener configurado dayjs en español si lo deseas
import { useHoliday } from "../../../context/Holiday/HolidayContext";

const MotionBox = motion.create(Box);

const NewCourseCard = ({ course, hasProgress }) => {
  const { isHolidayMode } = useHoliday();

  return (
    <Link
      to={`/detalle-curso/${course.id}`}
      style={{
        textDecoration: "none",
        width: "100%",
        display: "block",
      }}
    >
      <MotionBox
        whileHover={{
          y: isHolidayMode ? null : -8,
          scale: isHolidayMode ? null : 1.02,
        }}
        transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
        sx={{
          borderRadius: "22px",
          // Cambiado a 'visible' para permitir que el gorrito sobresalga de la esquina
          overflow: "visible",
          backgroundColor: "#FFFFFF",
          border: "1px solid",
          borderColor: alpha("#E53888", 0.12),
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          boxShadow: "0 10px 30px rgba(229, 56, 136, 0.06)",
          transition: "box-shadow 0.3s ease, border-color 0.3s ease",
          "&:hover": {
            borderColor: alpha("#E53888", 0.4),
            boxShadow: "0 20px 40px rgba(229, 56, 136, 0.15)",
          },
          p: 1.5,
          position: "relative", // Clave para que el absolute del gorrito se ancle aquí
        }}
      >
        {/* 🎄 GORRITO NAVIDEÑO EN LA ESQUINA SUPERIOR IZQUIERDA DE LA CARD */}
        {isHolidayMode && (
          <Box
            component='img'
            src='https://cdn.floreciendojuntas.com/production/statics/xmas/gorro-xmas-teddy.png'
            alt='Gorro Navideño'
            sx={{
              position: "absolute",
              top: "-26px",
              left: "-24px",
              width: "80px",
              height: "80px",
              transform: "rotate(-25deg)",
              zIndex: 10,
              pointerEvents: "none",
              filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))",
            }}
          />
        )}

        {/* IMAGEN DEL CURSO CON BADGE FLOTANTE */}
        <Box
          sx={{
            width: "100%",
            position: "relative",
            overflow: "hidden",
            borderRadius: "16px",
          }}
        >
          <CardMedia
            component='img'
            image={course.cover_image_url}
            alt={course.title}
            sx={{
              width: "100%",
              aspectRatio: "1 / 1",
              objectFit: "cover",
              backgroundColor: "#FFF5F7",
              transition: "transform 0.5s ease",
              ".MuiBox-root:hover &": {
                transform: "scale(1.05)",
              },
            }}
          />

          {/* Badge Flotante de Publicación (Efecto Cristal) */}
          <Box
            sx={{
              position: "absolute",
              top: 10,
              left: 10,
              backgroundColor: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(8px)",
              borderRadius: "50px",
              px: 1.5,
              py: 0.5,
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <AccessTimeRoundedIcon
              sx={{ fontSize: "0.9rem", color: "#E53888" }}
            />
            <Typography
              component='span'
              sx={{
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "#2B1B24",
                textTransform: "capitalize",
              }}
            >
              {dayjs(course.createdAt).fromNow()}
            </Typography>
          </Box>
        </Box>

        {/* CONTENIDO DE LA TARJETA */}
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
                fontSize: "1rem",
                lineHeight: 1.4,
                color: "#2B1B24",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                minHeight: "2.8rem",
                mb: 1.5,
              }}
            >
              {course.title}
            </Typography>
          </Box>

          {/* Bloque Inferior: Lecciones y CTA Dinámico */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              pt: 1.5,
              borderTop: "1px solid",
              borderColor: alpha("#E53888", 0.08),
            }}
          >
            <Typography
              variant='caption'
              sx={{
                color: "#5A4650",
                fontWeight: 600,
                fontSize: "0.8rem",
                backgroundColor: "#FFF0F4",
                px: 1.2,
                py: 0.5,
                borderRadius: "8px",
              }}
            >
              {course.videosCount || 0} Lecciones
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                color: "#E53888",
                fontWeight: 700,
                fontSize: "0.85rem",
                transition: "transform 0.2s ease",
                "&:hover": {
                  transform: "translateX(4px)",
                },
              }}
            >
              <span>Ver curso</span>
              <ArrowForwardRoundedIcon sx={{ fontSize: "1rem" }} />
            </Box>
          </Box>
        </Box>
      </MotionBox>
    </Link>
  );
};

export default NewCourseCard;
