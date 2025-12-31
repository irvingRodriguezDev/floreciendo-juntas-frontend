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
  Chip,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import VideoModal from "./VideoModal";
import image from "../../assets/images/caro.jpg";
import GerberaImg from "../../assets/images/Gerbera Daisy -7.png";
import GerberaImg2 from "../../assets/images/FLOR ROSA 2.png";
import GerberaImg3 from "../../assets/images/GERBERA MAGENTA.png";
import GerberaImg4 from "../../assets/images/GERBERA MAGENTA desenfoque.png";
import GerberaImg5 from "../../assets/images/FLOR ROSA CONVEN.png";
import firmacaro from "../../assets/images/logo_carolina_tavera.png";
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
        background: "linear-gradient(135deg, #F971AF 100%, #FFF 100%)",
        padding: 4,
        position: "relative",
        overflow: "hidden",
        borderRadius: "16px",
      }}
    >
      {/* --- ELEMENTOS DECORATIVOS --- */}

      {/* Aros grandes derechos */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          right: "5%",
          width: 650,
          height: 650,
          borderRadius: "50%",
          border: "3px solid #F971AF",
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
          border: "3px solid #F971AF",
          opacity: 0.3,
          zIndex: 0,
          display: { xs: "none", md: "block" },
        }}
      />

      {/* Líneas curvas inferiores */}
      <Box
        sx={{
          position: "absolute",
          bottom: "15%",
          left: "-5%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          border: "1px solid #F971AF",
          opacity: 0.9,
          filter: "blur(1px)",
          transform: "rotate(15deg)",
          display: { xs: "none", md: "block" },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "12%",
          left: "0%",
          width: 350,
          height: 350,
          borderRadius: "50%",
          border: "1px solid #F971AF",
          opacity: 0.8,
          filter: "blur(1px)",
          transform: "rotate(25deg)",
          display: { xs: "none", md: "block" },
        }}
      />

      {/* Flor minimalista */}
      <Box
        sx={{
          position: "absolute",
          top: "12%",
          left: "6%",
          width: 18,
          height: 18,
          borderRadius: "50%",
          backgroundColor: "#F971AF",
          opacity: 0.6,
          display: { xs: "none", md: "block" },
        }}
      />

      {[0, 1, 2, 3].map((i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            top: "12%",
            left: "6%",
            width: 12,
            height: 12,
            borderRadius: "50%",
            backgroundColor: "#F971AF",
            opacity: 0.4,
            transform: `translate(
          ${Math.cos(i * 90 * (Math.PI / 180)) * 18}px,
          ${Math.sin(i * 90 * (Math.PI / 180)) * 18}px
        )`,
            display: { xs: "none", md: "block" },
          }}
        />
      ))}

      {/* Sparkles distribuidos vertical derecha */}
      {Array.from({ length: 8 }).map((_, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            top: `${20 + i * 5}%`,
            right: `${5 + (i % 3) * 3}%`,
            width: 6,
            height: 6,
            borderRadius: "50%",
            backgroundColor: "#F971AF",
            opacity: 0.3,
            display: { xs: "none", md: "block" },
          }}
        />
      ))}

      {/* Glow vertical suave */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: "50%",
          width: "250px",
          height: "100%",
          background:
            "linear-gradient(90deg, transparent, rgba(249,113,175,0.10), transparent)",
          filter: "blur(10px)",
          display: { xs: "none", md: "block" },
          pointerEvents: "none",
        }}
      />

      {/* Oval aura */}
      <Box
        sx={{
          position: "absolute",
          top: "60%",
          right: "20%",
          width: 260,
          height: 120,
          borderRadius: "50%",
          border: "2px solid #F971AF",
          opacity: 0.12,
          transform: "rotate(-20deg)",
          display: { xs: "none", md: "block" },
        }}
      />

      {/* Aro pequeño extra */}
      <Box
        sx={{
          position: "absolute",
          top: "30%",
          right: "21%",
          width: 150,
          height: 150,
          borderRadius: "50%",
          border: "3px solid #F971AF",
          opacity: 0.3,
          display: { xs: "none", md: "block" },
        }}
      />

      {/* Diamante rotado */}
      <Box
        sx={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          width: 200,
          height: 200,
          backgroundImage: `url(${GerberaImg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          // backgroundColor: "#F971AF",
          transform: "rotate(45deg)",
          opacity: 0.8,
          display: { xs: "none", md: "block" },
        }}
      />

      {/* Cuadro rosado flotante */}
      <Box
        sx={{
          position: "absolute",
          top: "1%",
          left: "95%",
          transform: "translate(-50%, -50%) rotate(35deg)",
          width: "350px",
          height: "350px",
          backgroundImage: `url(${GerberaImg5})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          // backgroundColor: "#F971AF",
          opacity: 0.9,
          display: { xs: "none", md: "block" },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "30%",
          transform: "translate(-50%, -50%) rotate(15deg)",
          width: "350px",
          height: "350px",
          backgroundImage: `url(${GerberaImg2})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          // backgroundColor: "#F971AF",
          opacity: 0.9,
          display: { xs: "none", md: "block" },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "55%",
          transform: "translate(-50%, -50%) rotate(15deg)",
          width: "350px",
          height: "350px",
          backgroundImage: `url(${GerberaImg3})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          // backgroundColor: "#F971AF",
          opacity: 0.9,
          display: { xs: "none", md: "block" },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "90%",
          left: "5%",
          transform: "translate(-50%, -50%) rotate(15deg)",
          width: "350px",
          height: "350px",
          backgroundImage: `url(${GerberaImg4})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          // backgroundColor: "#F971AF",
          opacity: 0.9,
          display: { xs: "none", md: "block" },
        }}
      />
      {/* 3 puntos rosados */}
      {[
        { top: "40%", left: "10%" },
        { top: "42%", left: "11%" },
        { top: "40%", left: "12%" },
      ].map((pos, idx) => (
        <Box
          key={idx}
          sx={{
            position: "absolute",
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: "#F971AF",
            opacity: 0.4,
            display: { xs: "none", md: "block" },
            ...pos,
          }}
        />
      ))}

      {/* ---- CONTENIDO IZQUIERDO ---- */}
      <Box
        sx={{
          flex: 1,
          textAlign: { xs: "center", md: "left" },
          marginRight: { md: theme.spacing(4) },
          zIndex: 1,
        }}
      >
        <Typography variant='body2' color='white' sx={{ mb: 1 }}>
          Tu Camino al Éxito en Uñas
        </Typography>

        <Typography
          variant='h3'
          component='h1'
          color='white'
          sx={{
            fontWeight: 700,
            mb: 2,
            lineHeight: 1.2,
            fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
          }}
        >
          Conviértete en una artista de uñas y adquiere <br />
          <span style={{ position: "relative", display: "inline-block" }}>
            Nuevos conocimientos
            <Box
              component='span'
              sx={{
                position: "absolute",
                left: 0,
                bottom: 0,
                width: "100%",
                height: "8px",
                backgroundColor: "#F8CDDA",
                zIndex: -1,
                opacity: 0.7,
                borderRadius: "4px",
              }}
            />
          </span>
          <br />y{" "}
          <span style={{ position: "relative", display: "inline-block" }}>
            Habilidades
            <Box
              component='span'
              sx={{
                position: "absolute",
                left: 0,
                bottom: 0,
                width: "100%",
                height: "8px",
                backgroundColor: "#F971AF",
                zIndex: -1,
                opacity: 0.7,
                borderRadius: "4px",
              }}
            />
          </span>
        </Typography>

        <Typography
          variant='body1'
          color='white'
          sx={{ mb: 4, maxWidth: 500, padding: 4 }}
          textAlign='justify'
        >
          Somos la comunidad "Floreciendo Juntas", el impulso que necesitas para
          transformar tu pasión en un negocio exitoso. ¡Únete a nosotras y haz
          tus sueños realidad!
        </Typography>

        {/* <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          justifyContent={{ xs: "center", md: "flex-start" }}
        >
          <Chip
            variant='contained'
            sx={{
              backgroundColor: "#F971AF",
              color: "#fff",
              "&:hover": { backgroundColor: "#F971AF" },
              fontWeight: "bold",
              padding: "20px 25px",
              borderRadius: "12px",
              fontSize: "20px",
            }}
            label='¡Quiero empezar a florecer!'
          />
        </Stack> */}

        <Box
          component='img'
          src={firmacaro}
          alt='caro'
          sx={{
            width: "100%",
            maxWidth: { xs: 300, sm: 400, md: 500 },
            height: "auto",
            borderRadius: "50%",
            objectFit: "cover",
            position: "relative",
            zIndex: 1,
          }}
        />
      </Box>

      {/* ---- CONTENIDO DERECHO ---- */}
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
          src={image}
          alt='caro'
          sx={{
            width: "100%",
            maxWidth: { xs: 300, sm: 400, md: 500 },
            height: "auto",
            borderRadius: "50%",
            objectFit: "cover",
            position: "relative",
            zIndex: 1,
          }}
        />
        <Box position='absolute' sx={{ zIndex: 10 }}>
          <VideoModal buttonText='Ver nuestro video' videoUrl={videoSource} />
        </Box>
        {/* Floating Card */}
        <Box
          sx={{
            position: "absolute",
            top: { xs: "-60px", md: "10px" },
            right: { xs: "30px", md: "20px" },
            backgroundColor: "white",
            borderRadius: "12px",
            padding: theme.spacing(1.5, 2),
            boxShadow: theme.shadows[3],
            display: { xs: "none", md: "none", lg: "flex" },
            alignItems: "center",
            gap: theme.spacing(1),
            zIndex: 2,
            border: "1px solid #e0e0e0",
          }}
        >
          <Avatar sx={{ bgcolor: "#F971AF", width: 32, height: 32 }}>
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
