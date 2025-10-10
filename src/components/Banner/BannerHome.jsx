import React from "react";
import {
  Box,
  Button,
  Typography,
  Avatar,
  Stack,
  useTheme,
  IconButton,
  Tooltip,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import VideoModal from "./VideoModal";
import image from "../../assets/images/FB_IMG_1760128916351.jpg";
const BannerHome = () => {
  const theme = useTheme();
  const videoSource =
    "https://floreciendo.s3.us-east-2.amazonaws.com/INTROPLATAFORMAHORIZONTAL";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        background: "#FFF0F0",
        padding: theme.spacing(4),
        position: "relative",
        overflow: "hidden", // Para contener los elementos decorativos
        borderRadius: "16px",
      }}
    >
      {/* Elementos decorativos de fondo */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          right: "5%",
          width: 650,
          height: 650,
          borderRadius: "50%",
          border: "3px solid #D72E79", // Amarillo
          opacity: 0.9,
          zIndex: 1,
          display: { xs: "none", md: "block" },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "25%",
          right: "8%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          border: "3px solid #D72E79",
          opacity: 0.3,
          zIndex: 0,
          display: { xs: "none", md: "block" },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "30%",
          right: "21%",
          width: 150,
          height: 150,
          borderRadius: "50%",
          border: "3px solid #D72E79",
          opacity: 0.3,
          zIndex: 0,
          display: { xs: "none", md: "block" },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          width: 30,
          height: 30,
          backgroundColor: "#D72E79",
          transform: "rotate(45deg)",
          opacity: 0.5,
          display: { xs: "none", md: "block" },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "30%",
          transform: "translate(-50%, -50%) rotate(15deg)",
          width: "50px",
          height: "50px",
          backgroundColor: "#D72E79",
          opacity: 0.2,
          display: { xs: "none", md: "block" },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "40%",
          left: "10%",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          backgroundColor: "#D72E79",
          opacity: 0.4,
          display: { xs: "none", md: "block" },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "42%",
          left: "11%",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          backgroundColor: "#D72E79",
          opacity: 0.4,
          display: { xs: "none", md: "block" },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "40%",
          left: "12%",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          backgroundColor: "#D72E79",
          opacity: 0.4,
          display: { xs: "none", md: "block" },
        }}
      />

      {/* Sección Izquierda - Contenido de texto y botones */}
      <Box
        sx={{
          flex: 1,
          textAlign: { xs: "center", md: "left" },
          marginRight: { md: theme.spacing(4) },
          zIndex: 1, // Asegura que el contenido esté por encima de los decorativos
        }}
      >
        <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
          Tu Camino al Éxito en Uñas
        </Typography>
        <Typography
          variant='h3'
          component='h1'
          sx={{
            fontWeight: 700,
            mb: 2,
            lineHeight: 1.2,
            fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
          }}
        >
          Conviértete en una artista de uñas y adquiere <br />
          <span
            style={{
              position: "relative",
              display: "inline-block",
              textDecoration: "none",
            }}
          >
            Nuevos conocimientos
            <Box
              component='span'
              sx={{
                position: "absolute",
                left: 0,
                bottom: 0,
                width: "100%",
                height: "8px",
                backgroundColor: "#D72E79", // Amarillo
                zIndex: -1,
                opacity: 0.7,
                borderRadius: "4px",
              }}
            />
          </span>{" "}
          <br />y{" "}
          <span
            style={{
              position: "relative",
              display: "inline-block",
              textDecoration: "none",
            }}
          >
            Habilidades
            <Box
              component='span'
              sx={{
                position: "absolute",
                left: 0,
                bottom: 0,
                width: "100%",
                height: "8px",
                backgroundColor: "#D72E79", // Amarillo
                zIndex: -1,
                opacity: 0.7,
                borderRadius: "4px",
              }}
            />
          </span>
        </Typography>
        <Typography
          variant='body1'
          color='text.secondary'
          sx={{ mb: 4, maxWidth: 500 }}
        >
          Somos la comunidad "Floreciendo Juntas", el impulso que necesitas para
          transformar tu pasión en un negocio exitoso. ¡Únete a nosotras y haz
          tus sueños realidad!
        </Typography>
        <Stack
          direction='row'
          spacing={2}
          justifyContent={{ xs: "center", md: "flex-start" }}
        >
          <Button
            variant='contained'
            sx={{
              backgroundColor: "#D72E79", // Amarillo
              color: "#fff",
              "&:hover": {
                backgroundColor: "#D72E79", // Un tono más oscuro de amarillo
              },
              fontWeight: 600,
              padding: "10px 25px",
              borderRadius: "8px",
            }}
          >
            ¡Quiero Empezar a Florecer!
          </Button>
          <VideoModal buttonText='Ver nuestro video' videoUrl={videoSource} />
        </Stack>
        <Box
          component='img'
          src='https://floreciendo.wapizima.com.mx/static/media/firma_caro_negra.2d934595178c23de9acb.png' // Reemplaza con la URL de tu imagen
          alt='caro'
          sx={{
            width: "100%",
            maxWidth: { xs: 300, sm: 400, md: 500 },
            height: "auto",
            borderRadius: "50%", // Si la imagen tiene bordes redondeados
            objectFit: "cover",
            position: "relative",
            zIndex: 1,
          }}
        />
      </Box>

      {/* Sección Derecha - Imagen y estadísticas */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          marginTop: { xs: theme.spacing(6), md: 0 },
          zIndex: 1,
        }}
      >
        <Box
          component='img'
          src={image} // Reemplaza con la URL de tu imagen
          alt='caro'
          sx={{
            width: "100%",
            maxWidth: { xs: 300, sm: 400, md: 500 },
            height: "auto",
            borderRadius: "50%", // Si la imagen tiene bordes redondeados
            objectFit: "cover",
            position: "relative",
            zIndex: 1,
          }}
        />

        {/* Floating Card: Total Active Students */}
        <Box
          sx={{
            position: "absolute",
            top: { xs: "-30px", md: "10px" },
            right: { xs: "30px", md: "20px" },
            backgroundColor: "white",
            borderRadius: "12px",
            padding: theme.spacing(1.5, 2),
            boxShadow: theme.shadows[3],
            display: "flex",
            alignItems: "center",
            gap: theme.spacing(1),
            zIndex: 2,
            border: "1px solid #e0e0e0",
          }}
        >
          <Avatar sx={{ bgcolor: "#F1D5E1", width: 32, height: 32 }}>
            {" "}
            {/* Verde */}
            <CheckCircleOutlineIcon sx={{ fontSize: 18 }} />
          </Avatar>
          <Box>
            <Typography variant='h6' sx={{ fontWeight: 700, lineHeight: 1 }}>
              +25K
            </Typography>
            <Typography variant='caption' color='text.secondary'>
              Mujeres Empoderadas
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BannerHome;
