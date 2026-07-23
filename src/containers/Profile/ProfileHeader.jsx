import "./profile.css";
import React, { useContext, useRef, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Grid, // Compatible con MUI v6 / Grid v2
  Button,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import { motion } from "framer-motion";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AuthContext from "../../context/Auth/AuthContext";
import CancelSubscriptionDialog from "./CancelSubscriptionDialog";
import CancelingSubscription from "../../CancelingSubscription";
import { MethodPost } from "../../config/Service";
import Swal from "sweetalert2";
import ModalUpdateUser from "./ModalUpdateInformation";
import SubscriptionCard from "./Subscription/CardSubscription";

const PRIMARY_PINK = "#E53888";

const ProfileMain = () => {
  const { ChangePhoto, usuario, usuarioAutenticado } = useContext(AuthContext);
  const fileInputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [openUpdateUser, setOpenUpdateUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [canceling, setCanceling] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    ChangePhoto(file);
  };

  const handleCancelSubscription = async () => {
    setLoading(true);
    setCanceling(true);

    try {
      await MethodPost("/payment/cancel", {
        userId: usuario?.id,
      });

      await usuarioAutenticado();

      setCanceling(false);
      setOpen(false);

      Swal.fire({
        icon: "success",
        title: "¡Listo! 💗",
        text: "Tu suscripción ha sido actualizada. Podrás disfrutar del contenido hasta el fin de tu periodo pagado.",
        confirmButtonColor: PRIMARY_PINK,
      });
    } catch (error) {
      setCanceling(false);
      setOpen(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No pudimos procesar la solicitud. Intenta de nuevo más tarde.",
        confirmButtonColor: PRIMARY_PINK,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {canceling ? (
        <CancelingSubscription onFinished={() => setCanceling(false)} />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* GLOW DECORATIVO DE FONDO */}
            <Box
              sx={{
                position: "absolute",
                top: -60,
                right: -60,
                width: 200,
                height: 200,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(229, 56, 136, 0.1) 0%, rgba(229, 56, 136, 0) 70%)",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />

            <Grid
              container
              spacing={4}
              sx={{ position: "relative", zIndex: 1 }}
            >
              {/* 📸 SECCIÓN AVATAR MEJORADA */}
              <Grid
                size={{ xs: 12, md: 4 }}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  pt: { xs: 1, md: 2 },
                }}
              >
                <Box sx={{ position: "relative", display: "inline-block" }}>
                  <Avatar
                    src={usuario?.profileImage}
                    alt={usuario?.name || "Foto de Perfil"}
                    sx={{
                      width: { xs: 150, md: 200, lg: 220 },
                      height: { xs: 150, md: 200, lg: 220 },
                      border: `4px solid ${PRIMARY_PINK}`,
                      boxShadow: "0 12px 30px rgba(229, 56, 136, 0.22)",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.02)",
                      },
                    }}
                  />

                  {/* Botón flotante para cambiar la foto directamente desde el avatar */}
                  <Tooltip title='Cambiar foto de perfil' placement='top'>
                    <IconButton
                      onClick={() => fileInputRef.current.click()}
                      sx={{
                        position: "absolute",
                        bottom: 8,
                        right: 8,
                        backgroundColor: PRIMARY_PINK,
                        color: "#FFFFFF",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                        border: "3px solid #FFFFFF",
                        p: 1.2,
                        "&:hover": {
                          backgroundColor: "#C2256F",
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      <CameraAltIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                  </Tooltip>
                </Box>

                <Typography
                  variant='caption'
                  sx={{ color: "#9CA3AF", mt: 1.5, fontWeight: 500 }}
                >
                  JPG o PNG (Máx. 5MB)
                </Typography>

                <input
                  type='file'
                  accept='image/*'
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
              </Grid>

              {/* 👤 SECCIÓN INFORMACIÓN DEL USUARIO */}
              <Grid size={{ xs: 12, md: 8 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 3,
                    flexWrap: "wrap",
                    gap: 2,
                  }}
                >
                  <Box>
                    {/* Badge de Suscripción */}
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.8,
                        backgroundColor: usuario?.isSubscribed
                          ? "#F0FDF4"
                          : "#FFF1F2",
                        border: `1px solid ${
                          usuario?.isSubscribed ? "#BBF7D0" : "#FCE7F3"
                        }`,
                        px: 2,
                        py: 0.6,
                        borderRadius: "50px",
                        fontSize: "0.78rem",
                        fontWeight: 800,
                        color: usuario?.isSubscribed ? "#166534" : PRIMARY_PINK,
                        mb: 1.5,
                      }}
                    >
                      {usuario?.isSubscribed
                        ? "✦ MIEMBRO PREMIUM"
                        : "✦ CUENTA BÁSICA"}
                    </Box>

                    <Typography
                      variant='h4'
                      sx={{
                        color: "#1F2937",
                        fontWeight: 900,
                        fontSize: { xs: "1.75rem", md: "2.2rem" },
                        letterSpacing: "-0.5px",
                      }}
                    >
                      {usuario?.name || "Alumna"}
                    </Typography>
                  </Box>

                  {/* Botón Editar Perfil */}
                  <Button
                    onClick={() => setOpenUpdateUser(true)}
                    variant='outlined'
                    startIcon={<EditOutlinedIcon />}
                    sx={{
                      color: PRIMARY_PINK,
                      borderColor: "#FCE7F3",
                      backgroundColor: "#FFF5F7",
                      borderRadius: "50px",
                      px: 2.5,
                      py: 1,
                      fontWeight: 700,
                      textTransform: "none",
                      fontSize: "0.9rem",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        borderColor: PRIMARY_PINK,
                        backgroundColor: "#FCE7F3",
                      },
                    }}
                  >
                    Editar Perfil
                  </Button>
                </Box>

                {/* Grid de Datos Personales */}
                <Box
                  sx={{
                    backgroundColor: "#FAFAFA",
                    borderRadius: "20px",
                    p: 2.5,
                    border: "1px solid #F3F4F6",
                    mb: 3,
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                      <Typography
                        sx={{
                          color: "#9CA3AF",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                        }}
                      >
                        CORREO ELECTRÓNICO
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          color: "#374151",
                          fontSize: "0.95rem",
                        }}
                      >
                        {usuario?.email || "Sin correo"}
                      </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                      <Typography
                        sx={{
                          color: "#9CA3AF",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                        }}
                      >
                        TELÉFONO
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          color: "#374151",
                          fontSize: "0.95rem",
                        }}
                      >
                        {usuario?.phone || "No registrado"}
                      </Typography>
                    </Grid>

                    {/* Validación segura para TikTok */}
                    {usuario?.tiktokUsername && (
                      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Typography
                          sx={{
                            color: "#9CA3AF",
                            fontSize: "0.8rem",
                            fontWeight: 600,
                          }}
                        >
                          USUARIO TIKTOK
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            color: "#374151",
                            fontSize: "0.95rem",
                          }}
                        >
                          @{usuario.tiktokUsername}
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                </Box>

                {/* 💳 SECCIÓN FACTURACIÓN / MEMBRESÍA */}
                {usuario?.isSubscribed && (
                  <Box sx={{ mt: 2 }}>
                    <Divider sx={{ mb: 3, borderColor: "#F3F4F6" }} />
                    <Typography
                      variant='h6'
                      sx={{
                        mb: 2,
                        fontWeight: 800,
                        color: "#1F2937",
                        fontSize: "1.1rem",
                      }}
                    >
                      Membresía y Facturación
                    </Typography>

                    <SubscriptionCard
                      subscription={usuario?.subscriptionDetails}
                      userId={usuario?.id}
                      onCancelClick={() => setOpen(true)}
                      refreshUser={usuarioAutenticado}
                    />
                  </Box>
                )}
              </Grid>
            </Grid>
          </Box>
        </motion.div>
      )}

      {/* MODALES */}
      <CancelSubscriptionDialog
        open={open}
        onClose={() => setOpen(false)}
        loading={loading}
        handleCancelSubscription={handleCancelSubscription}
        expiryDate={usuario?.subscriptionDetails?.next_renewal}
      />

      <ModalUpdateUser
        open={openUpdateUser}
        onClose={() => setOpenUpdateUser(false)}
      />
    </>
  );
};

export default ProfileMain;
