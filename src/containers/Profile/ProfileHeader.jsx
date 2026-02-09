import "./profile.css";
import React, { useContext, useRef, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Grid,
  Paper,
  Button,
  Divider,
} from "@mui/material";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import { motion } from "framer-motion";
import AuthContext from "../../context/Auth/AuthContext";
import FormatDate from "../../utils/FormatDate";
import CancelSubscriptionDialog from "./CancelSubscriptionDialog";
import CancelingSubscription from "../../CancelingSubscription";
import { MethodPost } from "../../config/Service";
import Swal from "sweetalert2";
import ModalUpdateUser from "./ModalUpdateInformation";

const PRIMARY_PINK = "#E53888";
const TEXT_COLOR = "#4A4A4A";

const ProfileMain = () => {
  const { ChangePhoto, usuario } = useContext(AuthContext);
  const fileInputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [openUpdateUser, setOpenUpdateUser] = useState(false);
  const [cancelType, setCancelType] = useState("period_end"); // 'immediate' o 'period_end'
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
        cancelAtPeriodEnd: "period_end",
      });

      // Esperamos un poco para que la UX se sienta fluida
      setTimeout(() => {
        setCanceling(false);
        setOpen(false);

        Swal.fire({
          icon: "success",
          title: "Suscripción cancelada 💗",
          text:
            "Tu suscripción se cancelará al finalizar el periodo actual. " +
            "Podrás seguir disfrutando del contenido hasta esa fecha.",
          confirmButtonColor: "#E53888",
        });
      }, 1800);
    } catch (error) {
      console.error(error);

      setCanceling(false);

      Swal.fire({
        icon: "error",
        title: "Algo salió mal",
        text:
          "No pudimos cancelar tu suscripción en este momento. " +
          "Por favor intenta nuevamente o contáctanos.",
        confirmButtonColor: "#E53888",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {canceling === false ? (
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
              boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
              border: "1px solid #FAD0DE",
            }}
          >
            {/* Glow decorativo superior derecho */}
            <Box
              sx={{
                position: "absolute",
                top: "-40px",
                right: "-40px",
                width: "120px",
                height: "120px",
                background: "rgba(229,56,136,0.08)",
                borderRadius: "50%",
                zIndex: 0,
                filter: "blur(2px)",
              }}
            />

            {/* Glow decorativo inferior izquierdo */}
            <Box
              sx={{
                position: "absolute",
                bottom: "-30px",
                left: "-30px",
                width: "100px",
                height: "100px",
                background: "rgba(255,180,200,0.25)",
                borderRadius: "50%",
                zIndex: 0,
                filter: "blur(3px)",
              }}
            />

            <Grid
              container
              spacing={3}
              sx={{ position: "relative", zIndex: 2, justifyContent: "center" }}
            >
              {/* --- IZQUIERDA --- */}
              <Grid
                size={{ xs: 12, md: 3 }}
                sx={{ justifyItems: "center", textAlign: "center", my: "5%" }}
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className='avatar-glow'
                >
                  <Avatar
                    src={usuario?.profileImage}
                    sx={{
                      width: { xs: 140, sm: 160, md: 180, lg: 230, xl: 290 },
                      height: { xs: 140, sm: 160, md: 180, lg: 230, xl: 290 },
                      border: `4px solid ${PRIMARY_PINK}`,
                      boxShadow:
                        "0 0 20px rgba(229,56,136,0.45), 0 0 40px rgba(255,200,220,0.2)",
                    }}
                  />
                </motion.div>

                <Button
                  variant='contained'
                  onClick={() => fileInputRef.current.click()}
                  sx={{
                    mt: 2,
                    bgcolor: PRIMARY_PINK,
                    color: "white",
                    borderRadius: "30px",
                    px: 4,
                    py: 1,
                    fontWeight: 600,
                    textTransform: "none",
                    "&:hover": {
                      bgcolor: "#CF2C75",
                    },
                  }}
                >
                  {usuario?.profileImage ? "Actualizar imagen" : "Subir imagen"}
                </Button>

                <input
                  type='file'
                  accept='image/*'
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
              </Grid>

              {/* --- DERECHA --- */}
              <Grid
                size={{ xs: 12, md: 8 }}
                sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}
              >
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    onClick={() => setOpenUpdateUser(true)}
                    variant='contained'
                    sx={{ bgcolor: "#D82F7A", borderRadius: "13px" }}
                  >
                    Editar información
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: "inline-block",
                    background: "#FFE0EC",
                    px: 2,
                    py: "3px",
                    borderRadius: "20px",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: PRIMARY_PINK,
                    mb: 1,
                  }}
                >
                  🌸 Miembro Activo
                </Box>
                <Typography
                  variant='h4'
                  sx={{
                    color: PRIMARY_PINK,
                    fontWeight: "bold",
                  }}
                >
                  {usuario?.name || "Nombre del Usuario"}
                </Typography>

                {/* Badge “miembro activo” */}

                {/* Datos */}
                <Typography sx={{ color: TEXT_COLOR }}>
                  <span style={{ color: PRIMARY_PINK }}>📞</span>{" "}
                  {usuario?.phone || "No registrado"}
                </Typography>
                <Typography sx={{ color: TEXT_COLOR }}>
                  <span style={{ color: PRIMARY_PINK }}>📧</span>{" "}
                  {usuario?.email || "Correo no disponible"}
                </Typography>
                <Typography sx={{ color: TEXT_COLOR }}>
                  <span style={{ color: PRIMARY_PINK }}>🎀</span> Miembro desde:{" "}
                  {usuario?.fecha_registro || "2025"}
                </Typography>

                {/* Divider decorativo */}

                <Divider sx={{ my: 2 }} />

                <Typography
                  sx={{
                    fontStyle: "italic",
                    color: TEXT_COLOR,
                    fontSize: ".95rem",
                  }}
                >
                  “Florece cada día con tus sueños y tu esfuerzo”
                </Typography>

                {/* --- Tarjeta Suscripción --- */}
                {usuario?.subscriptionDetails && (
                  <Paper
                    elevation={0}
                    component={motion.div}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    sx={{
                      mt: 4,
                      p: 3,
                      borderRadius: "22px",
                      background:
                        "linear-gradient(135deg, #FFE6F1 0%, #FFF5FA 100%)",
                      border: "1px solid rgba(229,56,136,0.2)",
                      boxShadow:
                        "0 8px 20px rgba(229,56,136,0.16), inset 0 0 25px rgba(255,255,255,0.5)",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* DECORACIÓN SUTIL */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: -20,
                        right: -20,
                        width: 120,
                        height: 120,
                        background: "rgba(229,56,136,0.15)",
                        borderRadius: "50%",
                        filter: "blur(30px)",
                      }}
                    />

                    {/* ENCABEZADO */}
                    <Box display='flex' alignItems='center' mb={2}>
                      <SpaOutlinedIcon
                        sx={{
                          color: PRIMARY_PINK,
                          fontSize: 42,
                          mr: 1.5,
                          filter:
                            "drop-shadow(0 3px 6px rgba(229,56,136,0.25))",
                        }}
                      />

                      <Typography
                        variant='h5'
                        sx={{
                          color: PRIMARY_PINK,
                          fontWeight: 800,
                          letterSpacing: "0.5px",
                        }}
                      >
                        Tu Suscripción
                      </Typography>
                    </Box>

                    {/* ESTATUS */}
                    <Box mb={1}>
                      <Typography
                        sx={{
                          fontSize: "1rem",
                          color: TEXT_COLOR,
                          mb: 0.3,
                        }}
                      >
                        Estatus:
                      </Typography>

                      <Box
                        sx={{
                          display: "inline-block",
                          px: 2,
                          py: 0.7,
                          borderRadius: "30px",
                          bgcolor:
                            usuario.subscriptionDetails.status === "active"
                              ? "rgba(121, 212, 142, 0.25)"
                              : "rgba(255, 120, 120, 0.25)",
                          color:
                            usuario.subscriptionDetails.status === "active"
                              ? "#2D8A4E"
                              : "#A33636",
                          fontWeight: 700,
                          fontSize: "0.9rem",
                          textTransform: "uppercase",
                        }}
                      >
                        {usuario.subscriptionDetails.status === "active"
                          ? "Activa"
                          : "Inactiva"}
                      </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* TIPO */}
                    <Typography sx={{ color: TEXT_COLOR, mb: 1 }}>
                      Tipo de acceso:
                      <Box
                        component='span'
                        sx={{
                          ml: 1,
                          px: 1.3,
                          py: 0.5,
                          bgcolor: "#FFD5E7",
                          color: PRIMARY_PINK,
                          borderRadius: "6px",
                          fontWeight: 700,
                        }}
                      >
                        {usuario.subscriptionDetails.type === "ONETIME"
                          ? "Acceso 1 Mes"
                          : "Recurrente ( Cargo mensual )"}
                      </Box>
                    </Typography>

                    {/* FECHAS */}
                    <Typography sx={{ color: TEXT_COLOR }}>
                      Fecha de inicio:{" "}
                      <b>{FormatDate(usuario.subscriptionDetails.startDate)}</b>
                    </Typography>

                    {usuario.subscriptionDetails.endDate && (
                      <Typography sx={{ color: TEXT_COLOR }}>
                        Finaliza:{" "}
                        <b>{FormatDate(usuario.subscriptionDetails.endDate)}</b>
                      </Typography>
                    )}

                    {usuario.subscriptionDetails.nextRenewal && (
                      <Typography sx={{ color: TEXT_COLOR }}>
                        Próxima renovación:{" "}
                        <b>
                          {FormatDate(usuario.subscriptionDetails.nextRenewal)}
                        </b>
                      </Typography>
                    )}
                    {usuario.subscriptionDetails.will_cancel_at !== null && (
                      <Typography sx={{ color: TEXT_COLOR }}>
                        Fin de suscripción:{" "}
                        <b>
                          {FormatDate(
                            usuario.subscriptionDetails.will_cancel_at,
                          )}
                        </b>
                      </Typography>
                    )}

                    {usuario.subscriptionDetails.will_cancel_at === null && (
                      <Box sx={{ display: "flex", justifyContent: "end" }}>
                        <Button
                          variant='contained'
                          color='error'
                          sx={{ borderRadius: "16px" }}
                          onClick={() => setOpen(true)}
                        >
                          Cancelar suscripción
                        </Button>
                      </Box>
                    )}

                    <Divider sx={{ my: 2 }} />

                    {/* MENSAJE BONITO */}
                    <Typography
                      sx={{
                        color: PRIMARY_PINK,
                        fontStyle: "italic",
                        fontSize: "0.95rem",
                        textAlign: "center",
                        mt: 1,
                      }}
                    >
                      ✨ Gracias por ser parte de Floreciendo Juntas ✨
                    </Typography>
                  </Paper>
                )}
              </Grid>
            </Grid>
            <CancelSubscriptionDialog
              open={open}
              onClose={() => setOpen(false)}
              userId={usuario ? usuario.id : null}
              loading={loading}
              setLoading={setLoading}
              handleCancelSubscription={handleCancelSubscription}
            />
            <ModalUpdateUser
              open={openUpdateUser}
              onClose={() => setOpenUpdateUser(false)}
            />
          </Box>
        </motion.div>
      ) : (
        <CancelingSubscription onFinished={() => setCanceling(false)} />
      )}
    </>
  );
};

export default ProfileMain;
