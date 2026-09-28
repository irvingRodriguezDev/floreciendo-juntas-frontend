import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Swal from "sweetalert2";

import StoresContext from "../../../context/Stores/StoresContext";
import EditarTiendaDialog from "./EditarTiendaModal";

const PRIMARY_PINK = "#E53888";

const MyStoreCard = ({ store }) => {
  const { deleteStore } = useContext(StoresContext);
  const { name, description, address, phone, imageUrl, isActive, id } = store;

  const [openEdit, setOpenEdit] = useState(false);
  const [shop, setShop] = useState(null);

  const handleOpenEdit = (infoShop) => {
    setShop(infoShop);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setShop(null);
  };

  // Limpiar número telefónico para enlace de WhatsApp seguro
  const cleanPhone = phone ? phone.replace(/\D/g, "") : "";

  // Confirmación antes de dar de baja la tienda
  const handleDeleteStore = () => {
    Swal.fire({
      title: "¿Dar de baja esta tienda?",
      text: `Se deshabilitará "${name}" de la plataforma.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: PRIMARY_PINK,
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Sí, dar de baja",
      cancelButtonText: "Cancelar",
      customClass: {
        popup: "swal2-rounded",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        deleteStore(id);
        Swal.fire({
          title: "Tienda dada de baja",
          text: "Los cambios han sido guardados.",
          icon: "success",
          confirmButtonColor: PRIMARY_PINK,
          timer: 1500,
        });
      }
    });
  };

  return (
    <>
      <Card
        sx={{
          borderRadius: "22px",
          border: "1px solid #F3F4F6",
          backgroundColor: "#FFFFFF",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
          overflow: "hidden",
          transition: "all 0.25s ease-in-out",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          maxWidth: 480,
          "&:hover": {
            transform: "translateY(-4px)",
            borderColor: "#FCE7F3",
            boxShadow: "0 12px 28px rgba(229, 56, 136, 0.12)",
          },
        }}
      >
        <Box sx={{ position: "relative" }}>
          {/* BANNER / FOTO DE LA TIENDA */}
          <Box
            sx={{
              position: "relative",
              height: 170,
              backgroundColor: "#FFF1F2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {imageUrl ? (
              <Box
                component='img'
                src={imageUrl}
                alt={name}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <StorefrontOutlinedIcon
                sx={{ fontSize: 56, color: "#F43F5E", opacity: 0.3 }}
              />
            )}

            {/* CHIP DE ESTADO */}
            <Chip
              label={isActive ? "Activa" : "Inactiva"}
              size='small'
              sx={{
                position: "absolute",
                top: 14,
                right: 14,
                fontWeight: 800,
                fontSize: "0.72rem",
                height: 24,
                borderRadius: "8px",
                backgroundColor: isActive ? "#D1FAE5" : "#F3F4F6",
                color: isActive ? "#059669" : "#6B7280",
                border: "1px solid",
                borderColor: isActive ? "#A7F3D0" : "#E5E7EB",
              }}
            />
          </Box>

          {/* CONTENIDO DE LA TARJETA */}
          <Box sx={{ p: 2.5 }}>
            {/* NOMBRE Y BOTÓN EDITAR */}
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 1.5,
                mb: 1,
              }}
            >
              <Typography
                variant='h6'
                sx={{
                  fontWeight: 800,
                  fontSize: "1.1rem",
                  color: "#1F2937",
                  lineHeight: 1.3,
                }}
              >
                {name}
              </Typography>

              <Button
                size='small'
                startIcon={
                  <EditOutlinedIcon sx={{ fontSize: "15px !important" }} />
                }
                onClick={() => handleOpenEdit(store)}
                sx={{
                  flexShrink: 0,
                  fontSize: "0.8rem",
                  textTransform: "none",
                  fontWeight: 700,
                  borderRadius: "50px",
                  color: PRIMARY_PINK,
                  backgroundColor: "#FFF1F2",
                  border: "1px solid #FCE7F3",
                  px: 2,
                  py: 0.5,
                  "&:hover": {
                    backgroundColor: PRIMARY_PINK,
                    color: "#FFFFFF",
                    borderColor: PRIMARY_PINK,
                  },
                }}
              >
                Editar
              </Button>
            </Box>

            {/* DESCRIPCIÓN */}
            <Typography
              variant='body2'
              sx={{
                color: "#6B7280",
                mb: 2,
                fontSize: "0.88rem",
                lineHeight: 1.5,
                minHeight: 40,
              }}
            >
              {description || "Sin descripción disponible."}
            </Typography>

            {/* DIRECCIÓN Y CONTACTO */}
            <Box
              sx={{
                backgroundColor: "#FAFAFA",
                border: "1px solid #F3F4F6",
                borderRadius: "14px",
                p: 1.5,
                display: "flex",
                flexDirection: "column",
                gap: 1.2,
                mb: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <LocationOnOutlinedIcon
                  sx={{
                    fontSize: 18,
                    color: PRIMARY_PINK,
                    mt: "2px",
                    flexShrink: 0,
                  }}
                />
                <Typography
                  variant='body2'
                  sx={{
                    color: "#374151",
                    fontWeight: 500,
                    fontSize: "0.85rem",
                    lineHeight: 1.4,
                  }}
                >
                  {address || "Dirección no registrada"}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <WhatsAppIcon
                  sx={{ fontSize: 18, color: "#25D366", flexShrink: 0 }}
                />
                {phone ? (
                  <Typography
                    component='a'
                    href={`https://wa.me/${cleanPhone}`}
                    target='_blank'
                    rel='noreferrer'
                    variant='body2'
                    sx={{
                      color: "#111827",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      textDecoration: "none",
                      "&:hover": {
                        color: PRIMARY_PINK,
                        textDecoration: "underline",
                      },
                    }}
                  >
                    {phone}
                  </Typography>
                ) : (
                  <Typography
                    variant='body2'
                    sx={{ color: "#9CA3AF", fontSize: "0.85rem" }}
                  >
                    Sin teléfono registrado
                  </Typography>
                )}
              </Box>
            </Box>

            {/* BOTÓN DAR DE BAJA TIENDA */}
            <Button
              fullWidth
              startIcon={<DeleteOutlineIcon />}
              onClick={handleDeleteStore}
              sx={{
                fontSize: "0.83rem",
                fontWeight: 700,
                textTransform: "none",
                color: "#EF4444",
                backgroundColor: "#FEF2F2",
                border: "1px solid #FEE2E2",
                borderRadius: "12px",
                py: 0.9,
                "&:hover": {
                  backgroundColor: "#DC2626",
                  color: "#FFFFFF",
                  borderColor: "#DC2626",
                },
              }}
            >
              Dar de baja tienda
            </Button>
          </Box>
        </Box>
      </Card>

      {/* MODAL EDITAR TIENDA */}
      {shop !== null && (
        <EditarTiendaDialog
          open={openEdit}
          handleClose={handleCloseEdit}
          store={shop}
        />
      )}
    </>
  );
};

export default MyStoreCard;
