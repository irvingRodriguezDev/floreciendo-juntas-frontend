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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import UserContext from "../../context/User/UserContext";
import ShippingAddressModal from "../../components/Orders/ShippingAddressModal";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import UpdateAddressModal from "../../components/Orders/UpdateAddressModal";
import DeleteIcon from "@mui/icons-material/Delete";
const AddressCard = styled(Card)(({ theme }) => ({
  borderRadius: 20,
  background: "#fff5fa",
  border: "2px solid #ffd6e8",
  transition: "all 0.3s ease",
  boxShadow: "0px 4px 18px rgba(214, 51, 132, 0.15)",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0px 8px 22px rgba(214, 51, 132, 0.25)",
  },
}));

const IconBox = styled(Box)(({ theme }) => ({
  width: 42,
  height: 42,
  borderRadius: "14px",
  backgroundColor: "#ffd6e8",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#d63384",
}));

export default function AddressSection() {
  const { address, getAddresses, DeleteAddress } = useContext(UserContext);

  useEffect(() => {
    getAddresses();
  }, []);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //modal update
  const [openUpdateAddress, setOpenUpdateAddress] = useState(false);
  const [direction, setDirection] = useState(null);
  const openModalUpdate = (dir) => {
    setOpenUpdateAddress(true);
    setDirection(dir);
  };
  const closeModalUpdate = () => {
    setOpenUpdateAddress(false);
    setDirection(null);
  };

  return (
    <>
      <Box sx={{ mt: 2 }}>
        <Grid size={12} sx={{ display: "flex", justifyContent: "end", mb: 4 }}>
          <Button
            variant='outlined'
            startIcon={<LocationOnIcon />}
            onClick={handleClickOpen}
            sx={{
              borderColor: "#E63988",
              color: "#E63988",
              textTransform: "none",
              borderRadius: "12px",
              px: 3,
              py: 1,
              borderWidth: 2,
            }}
          >
            Registrar nueva dirección de envío
          </Button>
        </Grid>

        <Grid container spacing={3}>
          {address?.length === 0 && (
            <Grid size={12}>
              <Typography sx={{ textAlign: "center", color: "#b82a6f" }}>
                No tienes direcciones guardadas todavía.
              </Typography>
            </Grid>
          )}

          {address?.map((dir) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={dir.id}>
              <AddressCard>
                <CardContent>
                  {/* HEADER */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <IconBox>
                      <HomeRoundedIcon />
                    </IconBox>

                    <Box>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          color: "#d63384",
                          fontSize: "1.1rem",
                        }}
                      >
                        {dir.recipientName}
                      </Typography>

                      {dir.isDefault && (
                        <Chip
                          icon={<FavoriteRoundedIcon />}
                          label='Predeterminada'
                          size='small'
                          sx={{
                            mt: 0.5,
                            backgroundColor: "#d63384",
                            color: "#fff",
                            fontWeight: "bold",
                          }}
                        />
                      )}
                    </Box>
                  </Box>

                  {/* DETAILS */}
                  <Box sx={{ mt: 2, color: "#7a406b" }}>
                    <Typography>
                      {dir.street} {dir.number}, {dir.neighborhood}
                    </Typography>
                    <Typography>
                      {dir.city}, {dir.state}
                    </Typography>
                    <Typography>C.P. {dir.zipCode}</Typography>
                    <Typography sx={{ mt: 1, fontSize: ".9rem" }}>
                      <strong>Referencia:</strong> {dir.instructions}
                    </Typography>
                    <Typography sx={{ mt: 0.5, fontSize: ".9rem" }}>
                      <strong>Tel:</strong> {dir.phoneNumber}
                    </Typography>
                  </Box>
                </CardContent>

                {/* ACTIONS */}
                <CardActions
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    px: 2,
                    pb: 2,
                  }}
                >
                  {/* <Button
                    variant='contained'
                    sx={{
                      backgroundColor: "#d63384",
                      borderRadius: "12px",
                      fontWeight: "bold",
                      "&:hover": { backgroundColor: "#b82a6f" },
                    }}
                  >
                    Usar esta dirección
                  </Button> */}

                  <Button
                    variant='text'
                    startIcon={<EditRoundedIcon />}
                    onClick={() => openModalUpdate(dir)}
                    sx={{
                      color: "#d63384",
                      fontWeight: "bold",
                      textTransform: "none",
                    }}
                  >
                    Editar
                  </Button>

                  <Button
                    variant='text'
                    startIcon={<DeleteIcon />}
                    onClick={() => DeleteAddress(dir.id)}
                    sx={{
                      color: "#d63384",
                      fontWeight: "bold",
                      textTransform: "none",
                    }}
                  >
                    Eliminar
                  </Button>
                </CardActions>
              </AddressCard>
            </Grid>
          ))}
        </Grid>
      </Box>
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
