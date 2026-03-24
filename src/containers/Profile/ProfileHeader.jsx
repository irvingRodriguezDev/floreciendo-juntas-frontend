import "./profile.css";
import React, { useContext, useRef, useState } from "react";
import { Box, Typography, Avatar, Grid, Button, Divider } from "@mui/material";
import { motion } from "framer-motion";
import AuthContext from "../../context/Auth/AuthContext";
import CancelSubscriptionDialog from "./CancelSubscriptionDialog";
import CancelingSubscription from "../../CancelingSubscription";
import { MethodPost } from "../../config/Service";
import Swal from "sweetalert2";
import ModalUpdateUser from "./ModalUpdateInformation";
import SubscriptionCard from "./Subscription/CardSubscription";

const PRIMARY_PINK = "#E53888";
const TEXT_COLOR = "#4A4A4A";

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
        userId: usuario.id,
      });

      // Refrescamos los datos del usuario DESPUÉS de la cancelación
      // para que el estado de la suscripción cambie en el frontend
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
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <Box
            sx={{
              bgcolor: "white",
              borderRadius: "26px",
              p: { xs: 2.5, md: 4 },
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              border: "1px solid #FAD0DE",
            }}
          >
            {/* Decoración de Fondo (Glows mejorados) */}
            <Box
              sx={{
                position: "absolute",
                top: -50,
                right: -50,
                width: 150,
                height: 150,
                background:
                  "radial-gradient(circle, rgba(229,56,136,0.12) 0%, rgba(229,56,136,0) 70%)",
                zIndex: 0,
              }}
            />

            <Grid
              container
              spacing={4}
              sx={{ position: "relative", zIndex: 1 }}
            >
              {/* SECCIÓN AVATAR */}
              <Grid
                size={{ xs: 12, md: 4 }}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className='avatar-glow'
                >
                  <Avatar
                    src={usuario?.profileImage}
                    sx={{
                      width: { xs: 160, md: 220, lg: 260 },
                      height: { xs: 160, md: 220, lg: 260 },
                      border: `5px solid ${PRIMARY_PINK}`,
                      boxShadow: "0 15px 35px rgba(229,56,136,0.2)",
                    }}
                  />
                </motion.div>
                <Button
                  variant='contained'
                  onClick={() => fileInputRef.current.click()}
                  sx={{
                    mt: 3,
                    bgcolor: PRIMARY_PINK,
                    borderRadius: "30px",
                    px: 4,
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": { bgcolor: "#CF2C75" },
                  }}
                >
                  Cambiar Foto
                </Button>
                <input
                  type='file'
                  accept='image/*'
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
              </Grid>

              {/* SECCIÓN INFORMACIÓN */}
              <Grid size={{ xs: 12, md: 8 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 2,
                  }}
                >
                  <Box>
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        background: usuario?.isSubscribed
                          ? "#E6F4EA"
                          : "#FFE0EC",
                        px: 2,
                        py: 0.5,
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: usuario?.isSubscribed ? "#1E8E3E" : PRIMARY_PINK,
                        mb: 1,
                      }}
                    >
                      {usuario?.isSubscribed
                        ? "✦ MIEMBRO PREMIUM"
                        : "✦ CUENTA BÁSICA"}
                    </Box>
                    <Typography
                      variant='h3'
                      sx={{
                        color: TEXT_COLOR,
                        fontWeight: 800,
                        letterSpacing: "-0.5px",
                      }}
                    >
                      {usuario?.name || "Nombre"}
                    </Typography>
                  </Box>
                  <Button
                    onClick={() => setOpenUpdateUser(true)}
                    variant='outlined'
                    sx={{
                      color: PRIMARY_PINK,
                      borderColor: PRIMARY_PINK,
                      borderRadius: "12px",
                      textTransform: "none",
                      "&:hover": {
                        borderColor: "#CF2C75",
                        bgcolor: "rgba(229,56,136,0.05)",
                      },
                    }}
                  >
                    Editar Perfil
                  </Button>
                </Box>

                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography sx={{ color: "#777", fontSize: "0.85rem" }}>
                      Correo Electrónico
                    </Typography>
                    <Typography sx={{ fontWeight: 500 }}>
                      {usuario?.email}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography sx={{ color: "#777", fontSize: "0.85rem" }}>
                      Teléfono
                    </Typography>
                    <Typography sx={{ fontWeight: 500 }}>
                      {usuario?.phone || "No registrado"}
                    </Typography>
                  </Grid>
                </Grid>

                <Divider sx={{ mb: 4, opacity: 0.6 }} />

                {/* TARJETA DE SUSCRIPCIÓN DINÁMICA */}
                {usuario.isSubscribed && (
                  <>
                    <Typography
                      variant='h6'
                      sx={{ mb: 2, fontWeight: 700, color: TEXT_COLOR }}
                    >
                      Membresía y Facturación
                    </Typography>

                    <SubscriptionCard
                      subscription={usuario?.subscriptionDetails}
                      userId={usuario?.id}
                      onCancelClick={() => setOpen(true)}
                      refreshUser={usuarioAutenticado} // Pasamos la función para reactivar
                    />
                  </>
                )}
              </Grid>
            </Grid>
          </Box>
        </motion.div>
      )}

      {/* Modales */}
      <CancelSubscriptionDialog
        open={open}
        onClose={() => setOpen(false)}
        loading={loading}
        handleCancelSubscription={handleCancelSubscription}
        // Pasamos la fecha para que el modal sea dinámico
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
