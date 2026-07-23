import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
import Swal from "sweetalert2";

import UserContext from "../../context/User/UserContext";
import ShippingAddressModal from "../../components/Orders/ShippingAddressModal";
import UpdateAddressModal from "../../components/Orders/UpdateAddressModal";

const PRIMARY_PINK = "#E53888";

// Tarjeta estilizada con borde sutil y elevación suave
const AddressCard = styled(Card)(() => ({
  borderRadius: 22,
  backgroundColor: "#FFFFFF",
  border: "1px solid #F3F4F6",
  transition: "all 0.25s ease-in-out",
  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.04)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%",
  "&:hover": {
    transform: "translateY(-4px)",
    borderColor: "#FCE7F3",
    boxShadow: "0px 12px 28px rgba(229, 56, 136, 0.12)",
  },
}));

const IconBox = styled(Box)(() => ({
  width: 44,
  height: 44,
  borderRadius: "14px",
  backgroundColor: "#FFF1F2",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: PRIMARY_PINK,
  flexShrink: 0,
}));

export default function AddressSection() {
  const { address, getAddresses, DeleteAddress } = useContext(UserContext);

  useEffect(() => {
    getAddresses();
  }, []);

  // Modal Crear
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Modal Editar
  const [openUpdateAddress, setOpenUpdateAddress] = useState(false);
  const [direction, setDirection] = useState(null);

  const openModalUpdate = (dir) => {
    setDirection(dir);
    setOpenUpdateAddress(true);
  };

  const closeModalUpdate = () => {
    setOpenUpdateAddress(false);
    setDirection(null);
  };

  // Confirmación antes de eliminar
  const handleDeleteAddress = (id) => {
    Swal.fire({
      title: "¿Eliminar dirección?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: PRIMARY_PINK,
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      customClass: {
        popup: "swal2-rounded",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        DeleteAddress(id);
        Swal.fire({
          title: "Eliminada",
          text: "La dirección ha sido removida.",
          icon: "success",
          confirmButtonColor: PRIMARY_PINK,
          timer: 1500,
        });
      }
    });
  };

  return (
    <>
      <Box sx={{ pt: 1 }}>
        {/* BOTÓN REGISTRAR DIRECCIÓN */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant='h6'
              sx={{ fontWeight: 800, color: "#1F2937", fontSize: "1.15rem" }}
            >
              Mis Direcciones de Envío
            </Typography>
            <Typography variant='body2' sx={{ color: "#6B7280" }}>
              Administra las ubicaciones donde deseas recibir tus productos e
              insumos.
            </Typography>
          </Box>

          <Button
            variant='contained'
            startIcon={<LocationOnIcon />}
            onClick={handleClickOpen}
            sx={{
              backgroundColor: PRIMARY_PINK,
              color: "#FFFFFF",
              textTransform: "none",
              borderRadius: "50px",
              px: 3,
              py: 1.1,
              fontWeight: 700,
              fontSize: "0.9rem",
              boxShadow: "0 6px 18px rgba(229, 56, 136, 0.25)",
              "&:hover": {
                backgroundColor: "#CF2C75",
                boxShadow: "0 8px 22px rgba(229, 56, 136, 0.35)",
              },
            }}
          >
            Nueva dirección
          </Button>
        </Box>

        {/* LISTADO DE DIRECCIONES */}
        <Grid container spacing={3}>
          {/* EMPTY STATE CUANDO NO HAY DIRECCIONES */}
          {(!address || address.length === 0) && (
            <Grid size={{ xs: 12 }}>
              <Box
                sx={{
                  textAlign: "center",
                  py: 6,
                  px: 2,
                  backgroundColor: "#FAFAFA",
                  borderRadius: "24px",
                  border: "1px dashed #E5E7EB",
                }}
              >
                <AddLocationAltOutlinedIcon
                  sx={{ fontSize: 48, color: "#9CA3AF", mb: 1.5 }}
                />
                <Typography
                  variant='h6'
                  sx={{ color: "#374151", fontWeight: 700, mb: 0.5 }}
                >
                  Aún no tienes direcciones guardadas
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ color: "#6B7280", mb: 3, maxWidth: 400, mx: "auto" }}
                >
                  Registra una dirección de envío para agilizar tus compras y
                  envíos futuros.
                </Typography>
                <Button
                  variant='outlined'
                  onClick={handleClickOpen}
                  sx={{
                    color: PRIMARY_PINK,
                    borderColor: PRIMARY_PINK,
                    borderRadius: "50px",
                    textTransform: "none",
                    fontWeight: 700,
                    px: 3,
                    "&:hover": {
                      borderColor: "#CF2C75",
                      backgroundColor: "#FFF1F2",
                    },
                  }}
                >
                  Agregar mi primera dirección
                </Button>
              </Box>
            </Grid>
          )}

          {/* TARJETAS DE DIRECCIÓN */}
          {address?.map((dir) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={dir.id}>
              <AddressCard>
                <CardContent sx={{ p: 2.5 }}>
                  {/* HEADER CARD */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 2,
                      mb: 2,
                    }}
                  >
                    <IconBox>
                      <HomeRoundedIcon />
                    </IconBox>

                    <Box sx={{ flexGrow: 1 }}>
                      <Typography
                        sx={{
                          fontWeight: 800,
                          color: "#1F2937",
                          fontSize: "1.05rem",
                          lineHeight: 1.2,
                        }}
                      >
                        {dir.recipientName}
                      </Typography>

                      {dir.isDefault && (
                        <Chip
                          icon={
                            <FavoriteRoundedIcon
                              sx={{
                                fontSize: "0.85rem !important",
                                color: "#FFFFFF !important",
                              }}
                            />
                          }
                          label='Predeterminada'
                          size='small'
                          sx={{
                            mt: 0.8,
                            backgroundColor: PRIMARY_PINK,
                            color: "#FFFFFF",
                            fontWeight: 700,
                            fontSize: "0.7rem",
                            height: 22,
                          }}
                        />
                      )}
                    </Box>
                  </Box>

                  {/* DETALLES DE DIRECCIÓN */}
                  <Box
                    sx={{
                      color: "#4B5563",
                      fontSize: "0.9rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: 0.4,
                      backgroundColor: "#FAFAFA",
                      p: 1.5,
                      borderRadius: "14px",
                      border: "1px solid #F3F4F6",
                    }}
                  >
                    <Typography sx={{ fontWeight: 600, color: "#1F2937" }}>
                      {dir.street} #{dir.number}
                    </Typography>
                    <Typography>Col. {dir.neighborhood}</Typography>
                    <Typography>
                      {dir.city}, {dir.state} — C.P. {dir.zipCode}
                    </Typography>

                    {dir.instructions && (
                      <Typography
                        sx={{ mt: 0.5, fontSize: "0.82rem", color: "#6B7280" }}
                      >
                        <strong>Ref:</strong> {dir.instructions}
                      </Typography>
                    )}

                    <Typography
                      sx={{ mt: 0.2, fontSize: "0.82rem", color: "#6B7280" }}
                    >
                      <strong>Tel:</strong> {dir.phoneNumber}
                    </Typography>
                  </Box>
                </CardContent>

                {/* ACCIONES */}
                <CardActions
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    px: 2.5,
                    pb: 2,
                    pt: 0,
                  }}
                >
                  <Button
                    variant='text'
                    startIcon={<EditRoundedIcon />}
                    onClick={() => openModalUpdate(dir)}
                    sx={{
                      color: "#4B5563",
                      fontWeight: 700,
                      textTransform: "none",
                      fontSize: "0.85rem",
                      borderRadius: "10px",
                      "&:hover": {
                        backgroundColor: "#F3F4F6",
                        color: PRIMARY_PINK,
                      },
                    }}
                  >
                    Editar
                  </Button>

                  <Tooltip title='Eliminar dirección'>
                    <IconButton
                      onClick={() => handleDeleteAddress(dir.id)}
                      sx={{
                        color: "#9CA3AF",
                        borderRadius: "10px",
                        "&:hover": {
                          backgroundColor: "#FFF1F2",
                          color: "#EF4444",
                        },
                      }}
                    >
                      <DeleteOutlineIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </AddressCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* MODALES */}
      <ShippingAddressModal open={open} onClose={handleClose} />
      {direction !== null && (
        <UpdateAddressModal
          open={openUpdateAddress}
          onClose={closeModalUpdate}
          dir={direction}
        />
      )}
    </>
  );
}
