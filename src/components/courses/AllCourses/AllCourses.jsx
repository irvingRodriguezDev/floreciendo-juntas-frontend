import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { useHoliday } from "../../../context/Holiday/HolidayContext";

const AllCourses = ({ course }) => {
  if (!course) return null;

  const getLevelLabel = (level) => {
    const levels = {
      principiante: "Principiante",
      intermedio: "Intermedio",
      avanzado: "Avanzado",
    };
    return levels[level?.toLowerCase()] || "General";
  };

  const { isHolidayMode } = useHoliday();

  return (
    <Link
      to={`/detalle-curso/${course.id}`}
      style={{ textDecoration: "none", display: "block", width: "100%" }}
    >
      <Card
        component={motion.div}
        whileHover={{
          y: isHolidayMode ? null : -6,
          borderColor: "#F472B6",
          transition: { duration: 0.2, ease: "easeInOut" },
        }}
        sx={{
          borderRadius: "24px",
          width: "100%",
          cursor: "pointer",
          border: "1px solid #F3F4F6",
          overflow: "visible", // 👈 Vital para que el gorrito sobresalga de los límites
          backgroundColor: "#fff",
          boxShadow: "none",
          position: "relative", // 👈 REQUERIDO: Fija el ancla para el absolute del gorrito
          transition: "border-color 0.2s ease",
        }}
      >
        {/* 🎄 GORRITO NAVIDEÑO */}
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

        {/* Contenedor de Imagen con Badges Flotantes */}
        <Box sx={{ position: "relative", p: 1.5, pb: 0 }}>
          <CardMedia
            component='img'
            image={course.cover_image_url}
            alt={course.title}
            sx={{
              width: "100%",
              aspectRatio: {
                xs: "16 / 10",
                sm: "4 / 3",
                md: "4 / 4",
              },
              objectFit: "cover",
              borderRadius: "18px",
              backgroundColor: "#FFF5F7",
            }}
          />

          {/* Badge de Nivel Superior Izquierdo */}
          <Box
            sx={{
              position: "absolute",
              top: "24px",
              left: "24px",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(4px)",
              padding: "4px 10px",
              borderRadius: "20px",
              border: "1px solid #FFF1F2",
            }}
          >
            <Typography
              variant='caption'
              sx={{
                fontWeight: "bold",
                color: "#1F2937",
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              {getLevelLabel(course.level)}
            </Typography>
          </Box>

          {/* Badge de Certificado */}
          {course.hasCertificate && (
            <Box
              sx={{
                position: "absolute",
                bottom: "12px",
                right: "24px",
                backgroundColor: "#E91E63",
                color: "#fff",
                padding: "4px 10px",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                boxShadow: "0 4px 12px rgba(233, 30, 99, 0.2)",
              }}
            >
              <WorkspacePremiumIcon sx={{ fontSize: "14px" }} />
              <Typography
                variant='caption'
                sx={{ fontWeight: "bold", fontSize: "10px" }}
              >
                Reconocimiento
              </Typography>
            </Box>
          )}
        </Box>

        {/* Contenido de la Tarjeta */}
        <CardContent sx={{ pt: 2, pb: "24px !important", px: 2.5 }}>
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: "1.05rem",
              lineHeight: 1.35,
              color: "#1F2937",
              mb: 1.5,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              height: "2.7rem",
            }}
          >
            {course.title}
          </Typography>

          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            sx={{ pt: 1, borderTop: "1px solid #FAFAFA" }}
          >
            <Stack
              direction='row'
              alignItems='center'
              gap={0.5}
              color='#737373'
            >
              <PlayCircleIcon sx={{ fontSize: "16px", color: "#F472B6" }} />
              <Typography
                variant='caption'
                sx={{ fontWeight: "600", fontSize: "12px" }}
              >
                {course.videos?.length || 0}{" "}
                {course.videos?.length === 1 ? "clase" : "clases"}
              </Typography>
            </Stack>

            <Typography
              variant='caption'
              sx={{
                fontWeight: "bold",
                color: "#E91E63",
                fontSize: "12px",
                transition: "transform 0.2s ease",
                "&:hover": { transform: "translateX(3px)" },
              }}
            >
              Ver ahora →
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Link>
  );
};

export default AllCourses;
