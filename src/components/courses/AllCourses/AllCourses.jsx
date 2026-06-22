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

const AllCourses = ({ course }) => {
  // Nota: Cambié el nombre de la prop de "courses" a "course" porque representa un solo objeto.
  if (!course) return null;

  // Formateador sutil para los niveles
  const getLevelLabel = (level) => {
    const levels = {
      principiante: "Principiante",
      intermedio: "Intermedio",
      avanzado: "Avanzado",
    };
    return levels[level?.toLowerCase()] || "General";
  };

  return (
    <Link
      to={`/detalle-curso/${course.id}`}
      style={{ textDecoration: "none", display: "block", width: "100%" }}
    >
      <Card
        component={motion.div}
        whileHover={{
          y: -6,
          // Cambiamos a un borde rosa fino en lugar de una sombra pesada (look más plano/flat)
          borderColor: "#F472B6",
          transition: { duration: 0.2, ease: "easeInOut" },
        }}
        sx={{
          borderRadius: "24px", // Esquinas un poco más curvas y orgánicas
          width: "100%",
          cursor: "pointer",
          border: "1px solid #F3F4F6", // Gris ultra claro limpio
          overflow: "hidden",
          backgroundColor: "#fff",
          boxShadow: "none", // Eliminamos sombras por defecto para mantenerlo flat
          transition: "border-color 0.2s ease",
        }}
      >
        {/* Contenedor de Imagen con Badges Flotantes */}
        <Box sx={{ position: "relative", p: 1.5, pb: 0 }}>
          <CardMedia
            component='img'
            image={course.cover_image_url}
            alt={course.title}
            sx={{
              width: "100%",
              aspectRatio: {
                xs: "16 / 10", // Mejor proporción horizontal para móviles
                sm: "4 / 3",
                md: "1 / 1", // Cuadrado premium en desktop se ve muy editorial/revista
              },
              objectFit: "cover",
              borderRadius: "18px",
              backgroundColor: "#FFF5F7",
            }}
          />

          {/* Badge de Nivel Superior Izquierdo (Discreto y plano) */}
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

          {/* Badge de Certificado (Si aplica, esquina inferior derecha) */}
          {course.hasCertificate && (
            <Box
              sx={{
                position: "absolute",
                bottom: "12px",
                right: "24px",
                backgroundColor: "#E91E63", // Rosa fuerte insignia
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
          {/* Título del Curso */}
          <Typography
            sx={{
              fontWeight: 800, // Un poco más pesado para que resalte
              fontSize: "1.05rem",
              lineHeight: 1.35,
              color: "#1F2937", // Texto oscuro principal para legibilidad
              mb: 1.5,
              // Evita que títulos gigantes desalineen las tarjetas en la cuadrícula
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              height: "2.7rem", // Altura fija para que todas las cards midan lo mismo
            }}
          >
            {course.title}
          </Typography>

          {/* Fila de Metadatos Inferior */}
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            sx={{ pt: 1, borderTop: "1px solid #FAFAFA" }}
          >
            {/* Número de Clases/Videos */}
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

            {/* Texto de Acción sutil */}
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
