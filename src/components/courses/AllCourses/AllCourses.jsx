import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AllCourses = ({ courses }) => {
  return (
    <Link
      to={`/detalle-curso/${courses.id}`}
      style={{ textDecoration: "none" }}
    >
      <Card
        component={motion.div}
        whileHover={{
          y: -4,
          boxShadow: "0 16px 32px rgba(0,0,0,0.12)",
          transition: { duration: 0.3 },
        }}
        sx={{
          borderRadius: "20px",
          width: "100%",
          cursor: "pointer",
          border: "1px solid #f2f2f2",
          overflow: "hidden",
          backgroundColor: "#fff",
        }}
      >
        {/* Imagen */}
        <Box sx={{ position: "relative", p: 1.5 }}>
          <CardMedia
            component='img'
            image={courses.cover_image_url}
            alt={courses.title}
            sx={{
              width: "100%",
              aspectRatio: {
                xs: "5 / 4",
                sm: "4 / 3",
                md: "3 / 2",
                lg: "1 / 1",
              },
              objectFit: "cover",
              borderRadius: { xs: "16px", lg: "12px" },
              backgroundColor: "#f5f5f5",
              filter: "saturate(0.95)",
            }}
          />

          {/* Nivel */}
        </Box>

        {/* Contenido */}
        <CardContent sx={{ pt: 1.5, pb: 2 }}>
          {/* Título */}
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "1rem",
              lineHeight: 1.4,
              color: "#2E2E2E",
              mb: 0.5,
            }}
          >
            {courses.title}
          </Typography>

          {/* Meta info */}
          <Typography
            sx={{
              fontSize: "0.8rem",
              color: "#888",
            }}
          >
            Curso • Nivel {courses.level}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default AllCourses;
