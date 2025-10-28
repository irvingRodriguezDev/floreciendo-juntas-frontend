import React, { use, useContext, useRef, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Grid,
  Paper,
  Divider,
  Chip,
  Button,
} from "@mui/material";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FormatDate from "../../utils/FormatDate";
import AuthContext from "../../context/Auth/AuthContext";
const PRIMARY_PINK = "#E53888";
const LIGHT_PINK = "#FBE3ED";
const TEXT_COLOR = "#4A4A4A";

const ProfileMain = ({ usuario }) => {
  const { ChangePhoto } = useContext(AuthContext);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Vista previa local instantánea

    ChangePhoto(file); // Subir al servidor
  };
  return (
    <Box
      sx={{
        mt: 4,
        px: { xs: 2, md: 6 },
        py: 4,
        bgcolor: "white",
        borderRadius: "24px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
        overflow: "hidden",
      }}
    >
      <Grid container spacing={4}>
        {/* SECCIÓN PRINCIPAL */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Grid
            container
            spacing={2}
            alignItems='center'
            justifyContent='center'
          >
            {/* Imagen */}
            <Grid
              size={{ xs: 12, md: 5 }}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                mb: { xs: 2, md: 0 },
              }}
            >
              <Avatar
                src={usuario?.profileImage}
                alt={usuario?.name}
                sx={{
                  width: { xs: 140, sm: 180, md: 280 },
                  height: { xs: 140, sm: 180, md: 280 },
                  border: `5px solid ${PRIMARY_PINK}`,
                  boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                }}
              />

              {/* Botón para subir o actualizar imagen */}
              <Button
                variant='contained'
                onClick={() => fileInputRef.current.click()}
                sx={{
                  mt: 2,
                  bgcolor: PRIMARY_PINK,
                  color: "white",
                  borderRadius: "20px",
                  px: 3,
                  py: 1,
                  fontWeight: 600,
                  textTransform: "none",
                  boxShadow: "0 4px 10px rgba(229, 56, 136, 0.3)",
                  "&:hover": {
                    bgcolor: "#d12d77",
                    boxShadow: "0 4px 14px rgba(229, 56, 136, 0.4)",
                  },
                }}
              >
                {usuario?.profileImage ? "Actualizar imagen" : "Cargar imagen"}
              </Button>

              {/* Input oculto */}
              <input
                type='file'
                accept='image/*'
                ref={fileInputRef}
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </Grid>

            {/* Información */}
            <Grid
              size={{ xs: 12, md: 7 }}
              sx={{
                textAlign: { xs: "center", md: "left" },
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Typography
                variant='h3'
                sx={{
                  color: PRIMARY_PINK,
                  fontWeight: "bold",
                  fontSize: { xs: "2rem", md: "3.4rem" },
                  lineHeight: 1.2,
                }}
              >
                {usuario?.name || "Nombre del Usuario"}
              </Typography>

              <Typography color={TEXT_COLOR} sx={{ mt: 1 }}>
                📞 {usuario?.telefono || "Sin número registrado"}
              </Typography>
              <Typography color={TEXT_COLOR}>
                📧 {usuario?.email || "Correo no disponible"}
              </Typography>
              <Typography color={TEXT_COLOR}>
                🎀 Miembro desde: {usuario?.fecha_registro || "2025"}
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography
                variant='body1'
                sx={{
                  color: TEXT_COLOR,
                  fontStyle: "italic",
                  maxWidth: 600,
                  mx: { xs: "auto", md: 0 },
                  textAlign: "justify",
                }}
              >
                “Florece cada día con tus sueños y tu esfuerzo.”
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        {/* SECCIÓN LATERAL */}
        {usuario?.subscriptionDetails && (
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: "16px",
                bgcolor: "#FFF0F4",
                textAlign: "center",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "inset 0 0 20px rgba(229, 56, 136, 0.1)",
              }}
            >
              <SpaOutlinedIcon
                sx={{
                  fontSize: 52,
                  color: PRIMARY_PINK,
                  mb: 1,
                }}
              />
              <Typography
                variant='h6'
                sx={{
                  color: PRIMARY_PINK,
                  fontWeight: 600,
                  mb: 1,
                }}
              >
                Suscripción {usuario.subscriptionDetails.status}
              </Typography>
              <Typography color={TEXT_COLOR} sx={{ mb: 2 }}>
                Tipo:{" "}
                <strong>
                  {usuario.subscriptionDetails.type === "ONETIME"
                    ? "Acceso 1 Mes"
                    : "Cargo Recurrente"}
                </strong>
              </Typography>
              <Typography color={TEXT_COLOR} sx={{ mb: 2 }}>
                Hasta:{" "}
                <strong>
                  {FormatDate(usuario.subscriptionDetails.endDate)}
                </strong>
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ProfileMain;
