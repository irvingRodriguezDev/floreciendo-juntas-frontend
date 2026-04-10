// src/components/MyStoreCard.jsx
import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Chip,
  Skeleton,
  Grid,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import StoresContext from "../../../context/Stores/StoresContext";
import EditarTiendaDialog from "./EditarTiendaModal";
const MyStoreCard = ({ store }) => {
  const { deleteStore } = useContext(StoresContext);
  // ── Card con datos ─────────────────────────────────────────────────────────
  const { name, description, address, phone, imageUrl, isActive, id } = store;
  const [openEdit, setOpenEdit] = useState(false);
  const [shop, setShop] = useState(null);
  const handleOpenEdit = (infoShop) => {
    setOpenEdit(true);
    setShop(infoShop);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
    setShop(null);
  };
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "16px",
        border: "0.5px solid",
        borderColor: "divider",
        overflow: "hidden",
        maxWidth: 480,
      }}
    >
      {/* Imagen con badge de estado */}
      <Box sx={{ position: "relative", height: 160, bgcolor: "grey.100" }}>
        {imageUrl ? (
          <Box
            component='img'
            src={imageUrl}
            alt={name}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : (
          <Box sx={{ width: "100%", height: "100%", bgcolor: "grey.200" }} />
        )}
        <Chip
          label={isActive ? "Activa" : "Inactiva"}
          size='small'
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            fontWeight: 600,
            fontSize: 12,
            bgcolor: isActive ? "#EAF3DE" : "#F1EFE8",
            color: isActive ? "#27500A" : "#444441",
            border: "none",
          }}
        />
      </Box>

      <Box sx={{ p: 2.5 }}>
        {/* Nombre + botón editar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 1,
            mb: 0.5,
          }}
        >
          <Typography
            variant='h6'
            sx={{ fontWeight: 700, fontSize: 17, color: "text.primary" }}
          >
            {name}
          </Typography>
          <Button
            size='small'
            startIcon={
              <EditOutlinedIcon sx={{ fontSize: "14px !important" }} />
            }
            onClick={() => handleOpenEdit(store)}
            sx={{
              flexShrink: 0,
              fontSize: 12,
              textTransform: "none",
              borderRadius: "8px",
              color: "#D82F7A",
              border: "0.5px solid ",
              borderColor: "#D82F7A",
              px: 1.5,
              py: 0.5,
              "&:hover": { bgcolor: "#FFE6EE", borderColor: "#D82F7A" },
            }}
          >
            Editar
          </Button>
        </Box>

        {/* Descripción */}
        <Typography
          variant='body2'
          sx={{ color: "text.secondary", mb: 2, lineHeight: 1.5 }}
        >
          {description}
        </Typography>

        {/* Dirección y teléfono */}
        <Box
          sx={{
            borderTop: "0.5px solid",
            borderColor: "divider",
            pt: 1.75,
            display: "flex",
            flexDirection: "column",
            gap: 1.25,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
            <LocationOnOutlinedIcon
              sx={{
                fontSize: 16,
                color: "text.secondary",
                mt: "2px",
                flexShrink: 0,
              }}
            />
            <Typography
              variant='body2'
              sx={{ color: "text.secondary", lineHeight: 1.5 }}
            >
              {address}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <WhatsAppIcon
              sx={{ fontSize: 16, color: "text.secondary", flexShrink: 0 }}
            />
            <Typography
              component='a'
              href={`https://wa.me/${phone}`}
              target='_blank'
              rel='noreferrer'
              variant='body2'
              sx={{
                color: "info.main",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              {phone}
            </Typography>
          </Box>
        </Box>

        {/* Dar de baja */}
        <Button
          fullWidth
          onClick={() => deleteStore(id)}
          sx={{
            mt: 2,
            fontSize: 13,
            textTransform: "none",
            color: "error.main",
            border: "0.5px solid",
            borderColor: "error.light",
            borderRadius: "10px",
            py: 1,
            "&:hover": { bgcolor: "error.50" },
          }}
        >
          Dar de baja tienda
        </Button>
      </Box>
      {shop !== null && (
        <EditarTiendaDialog
          open={openEdit}
          handleClose={handleCloseEdit}
          store={shop}
        />
      )}
    </Paper>
  );
};

export default MyStoreCard;
