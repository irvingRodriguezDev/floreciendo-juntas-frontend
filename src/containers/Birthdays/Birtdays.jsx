import React, { useEffect, useState } from "react";
import MethodGet from "../../config/Service";
import {
  Paper,
  Avatar,
  Stack,
  Typography,
  Button,
  Box,
  Skeleton,
  Tooltip,
} from "@mui/material";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import clienteAxios from "../../config/Axios";
import { alerts } from "../../utils/Alerts";
import WishModal from "./WishModal";

const MAIN_PINK = "#D72E79";
const LIGHT_PINK = "#FFF0F6";
const BORDER_PINK = "#FCE4EC";

const Birthdays = () => {
  const [cumpleaneras, setCumpleaneras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishedUsers, setWishedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  // Al hacer clic en el botón "Felicitar" abre el modal con la usuaria seleccionada
  const handleOpenWishModal = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  // Callback cuando se envía con éxito desde el modal
  const handleWishSuccess = (userId) => {
    const updatedWishes = [...wishedUsers, userId];
    setWishedUsers(updatedWishes);
    localStorage.setItem("wishedBirthdaysToday", JSON.stringify(updatedWishes));
  };
  useEffect(() => {
    const savedWishes = JSON.parse(
      localStorage.getItem("wishedBirthdaysToday") || "[]",
    );
    setWishedUsers(savedWishes);

    const url = "/auth/cumpleaneras";
    MethodGet(url)
      .then((res) => {
        setCumpleaneras(res.data.users || []);
      })
      .catch((error) => {
        console.error("Ocurrió un error al obtener las cumpleañeras:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleWishBirthday = async (userId, userName) => {
    try {
      const updatedWishes = [...wishedUsers, userId];
      setWishedUsers(updatedWishes);
      localStorage.setItem(
        "wishedBirthdaysToday",
        JSON.stringify(updatedWishes),
      );

      await clienteAxios.post("/auth/wish-birthday", { targetUserId: userId });

      alerts.success(
        "¡Abrazo enviado! 🎉",
        `Le has enviado una felicitación de cumpleaños a ${userName.split(" ")[0]}.`,
      );
    } catch (error) {
      console.error("Error al enviar felicitación:", error);
      const reverted = wishedUsers.filter((id) => id !== userId);
      setWishedUsers(reverted);
      localStorage.setItem("wishedBirthdaysToday", JSON.stringify(reverted));
    }
  };

  if (!loading && cumpleaneras.length === 0) {
    return null;
  }

  // Si hay pocas cumpleañeras, duplicamos el array para mantener el efecto infinito de Marquee continuo
  const marqueeList =
    cumpleaneras.length > 0 && cumpleaneras.length < 10
      ? [...cumpleaneras, ...cumpleaneras, ...cumpleaneras]
      : cumpleaneras;

  return (
    <>
      {cumpleaneras && (
        <>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: "20px",
              background: `linear-gradient(135deg, #FFFFFF 0%, ${LIGHT_PINK} 100%)`,
              border: `1px solid ${BORDER_PINK}`,
              boxShadow: "0px 8px 20px rgba(215, 46, 121, 0.08)",
              mb: 3,
              overflow: "hidden", // Oculta las tarjetas que salen del contenedor
            }}
          >
            {/* Encabezado del Widget */}
            <Stack
              direction='row'
              alignItems='center'
              spacing={1.5}
              sx={{ mb: 2 }}
            >
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  bgcolor: "#FFE0ED",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: MAIN_PINK,
                }}
              >
                <CakeOutlinedIcon fontSize='small' />
              </Box>
              <Box>
                <Typography
                  variant='subtitle1'
                  sx={{ fontWeight: 800, color: MAIN_PINK, lineHeight: 1.2 }}
                >
                  Cumpleañeras de hoy 🎉
                </Typography>
                <Typography
                  variant='caption'
                  sx={{ color: "#757575", fontWeight: 500 }}
                >
                  ¡Envíales un abrazo en su día especial!
                </Typography>
              </Box>
            </Stack>

            {/* RENDER DE SKELETONS (CARGANDO) */}
            {loading ? (
              <Stack direction='row' spacing={2}>
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    variant='rounded'
                    width={260}
                    height={64}
                    sx={{ borderRadius: "14px", flexShrink: 0 }}
                  />
                ))}
              </Stack>
            ) : (
              /* CONTENEDOR MARQUEE CON PAUSA HOVER */
              <Box
                sx={{
                  width: "100%",
                  overflow: "hidden",
                  position: "relative",
                  // Degradado sutil a los lados para efecto de desvanecimiento elegante
                  maskImage:
                    "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    width: "max-content",
                    gap: 2,
                    animation: "marquee 25s linear infinite",
                    // 🔑 Pausa la animación cuando la usuaria pasa el mouse por encima
                    "&:hover": {
                      animationPlayState: "paused",
                    },
                    "@keyframes marquee": {
                      "0%": {
                        transform: "translateX(0%)",
                      },
                      "100%": {
                        transform: "translateX(-33.33%)", // Ajustado para bucle continuo
                      },
                    },
                  }}
                >
                  {marqueeList.map((user, index) => {
                    const isWished = wishedUsers.includes(user.id);
                    const displayName = user.nombre || user.name || "Usuaria";

                    return (
                      <Stack
                        key={`${user.id}-${index}`}
                        direction='row'
                        alignItems='center'
                        justifyContent='space-between'
                        spacing={2}
                        sx={{
                          minWidth: "280px", // Ancho fijo por tarjeta para alineación limpia
                          p: 1.2,
                          px: 1.8,
                          borderRadius: "14px",
                          bgcolor: "#FFFFFF",
                          border: "1px solid #F8BBD0",
                          boxShadow: "0px 2px 8px rgba(215, 46, 121, 0.05)",
                          transition: "all 0.2s ease-in-out",
                          flexShrink: 0,
                          "&:hover": {
                            transform: "scale(1.02)",
                            boxShadow: "0px 4px 12px rgba(215, 46, 121, 0.15)",
                            borderColor: MAIN_PINK,
                          },
                        }}
                      >
                        {/* Avatar y Nombre */}
                        <Stack
                          direction='row'
                          alignItems='center'
                          spacing={1.5}
                          sx={{ minWidth: 0, flex: 1 }}
                        >
                          <Avatar
                            src={
                              user.profileImage
                                ? `${user.profileImage}`
                                : `${import.meta.env.VITE_CDN_URL}/production/statics/FLOR+ROSA+CONVEN.png`
                            }
                            alt={displayName}
                            sx={{
                              width: 42,
                              height: 42,
                              border: `2px solid ${MAIN_PINK}`,
                            }}
                          />
                          <Typography
                            variant='body2'
                            noWrap
                            sx={{
                              fontWeight: 700,
                              color: "#212121",
                              maxWidth: "110px",
                            }}
                          >
                            {displayName}
                          </Typography>
                        </Stack>

                        {/* Botón de Acción */}
                        <Tooltip
                          title={
                            isWished
                              ? "Ya la felicitaste hoy"
                              : "Enviar felicitación"
                          }
                        >
                          <span>
                            <Button
                              size='small'
                              disabled={isWished}
                              startIcon={
                                isWished ? (
                                  <CheckCircleIcon />
                                ) : (
                                  <FavoriteIcon />
                                )
                              }
                              sx={{
                                borderRadius: "50px",
                                textTransform: "none",
                                fontWeight: 700,
                                fontSize: "0.78rem",
                                px: 1.8,
                                py: 0.6,
                                whiteSpace: "nowrap",
                                bgcolor: isWished ? "#E0E0E0" : MAIN_PINK,
                                color: isWished ? "#757575" : "#FFFFFF",
                                "&:hover": {
                                  bgcolor: isWished ? "#E0E0E0" : "#B82363",
                                },
                              }}
                              onClick={() => handleOpenWishModal(user)}
                            >
                              {isWished ? "Felicitada" : "Felicitar"}
                            </Button>
                          </span>
                        </Tooltip>
                      </Stack>
                    );
                  })}
                </Box>
              </Box>
            )}
            {/* 🎂 MODAL PARA ENVIAR EL MENSAJE */}
            <WishModal
              open={openModal}
              onClose={() => setOpenModal(false)}
              targetUser={selectedUser}
              onSuccess={handleWishSuccess}
            />
          </Paper>
        </>
      )}
    </>
  );
};

export default Birthdays;
