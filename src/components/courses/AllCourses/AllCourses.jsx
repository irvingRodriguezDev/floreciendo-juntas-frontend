import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MenuBookIcon from "@mui/icons-material/MenuBook";
const AllCourses = ({ courses }) => {
  return (
    <>
      <Link
        to={`/detalle-curso/${courses.id}`}
        style={{ textDecoration: "none" }}
      >
        <Card
          component={motion.div}
          whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
          sx={{
            borderRadius: "20px",
            width: "100%",
            boxShadow: "12px 12px 20px rgba(0,0,0,0.08)",
            cursor: "pointer",
            border: "1px solid #f3f3f3",
            overflow: "hidden",
            backgroundColor: "#fff",
            transition: "all 0.3s ease-in-out",
          }}
        >
          {/* Imagen del curso */}
          <Box sx={{ position: "relative", padding: "10px" }}>
            <CardMedia
              component='img'
              image={courses.cover_image_url}
              // image={
              //   "https://cloud.wapizima.com.mx/production/courses/mobile/112-mobile"
              // }
              alt={courses.name}
              sx={{
                objectFit: "cover",
                width: "100%",
                borderRadius: "16px",
              }}
            />

            {/* Precio flotante */}
            <Chip
              label={`${courses.level}`}
              sx={{
                position: "absolute",
                bottom: 12,
                right: 12,
                backgroundColor: "#D82E7A",
                color: "white",
                fontWeight: "bold",
                fontSize: "0.9rem",
                paddingX: "6px",
              }}
            />
          </Box>

          {/* Contenido del curso */}
          <CardContent sx={{ padding: 2 }}>
            {/* Instructor */}
            {/* <Stack direction='row' spacing={1} alignItems='center'>
              <Avatar
                src={courses.instructor_image}
                sx={{ width: 28, height: 28 }}
              />
              <Typography variant='body2' color='text.secondary'>
                {courses.instructor_name}
              </Typography>
              <Stack
                direction='row'
                spacing={0.5}
                alignItems='center'
                sx={{ ml: "auto" }}
              >
                <StarIcon sx={{ color: "#FFD700", fontSize: 18 }} />
                <Typography variant='body2' fontWeight={600}>
                  {courses.rating}
                </Typography>
              </Stack>
            </Stack> */}

            {/* Nombre del curso */}
            <Typography
              variant='subtitle1'
              sx={{
                fontWeight: 700,
                marginTop: 1.5,
                lineHeight: 1.3,
              }}
            >
              {courses.title}
            </Typography>

            {/* Información de estudiantes y lecciones */}
          </CardContent>
        </Card>
      </Link>
    </>
  );
};

export default AllCourses;
