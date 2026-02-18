import React, { useContext, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Grid,
  IconButton,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CertificationsContext from "../../../context/Certifications/CertificationsContext";

const style = {
  width: { xs: "94%", sm: "90%", md: 850 },
  maxHeight: "90vh",
  overflowY: "auto",
  bgcolor: "rgba(255,255,255,0.9)",
  backdropFilter: "blur(20px)",
  borderRadius: "28px",
  boxShadow: "0 30px 80px rgba(216,47,122,0.15)",
  p: { xs: 3, md: 5 },
};

const UploadDeliverableModal = ({ open, onClose, moduleId, module }) => {
  const { sendEntregable } = useContext(CertificationsContext);
  const [images, setImages] = useState({
    front: null,
    side: null,
    profile: null,
  });

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    setImages((prev) => ({
      ...prev,
      [type]: {
        file,
        preview: URL.createObjectURL(file),
      },
    }));
  };

  const isValid = images.front && images.side && images.profile;

  const handleSubmit = () => {
    if (!isValid) return;
    const formData = new FormData();

    formData.append("moduleId", moduleId);
    formData.append("files", images.front.file);
    formData.append("files", images.side.file);
    formData.append("files", images.profile.file);
    sendEntregable(formData);
    onClose();
  };

  const renderUploadBox = (label, type) => (
    <Grid size={{ xs: 12, md: 6 }}>
      <Box
        component={motion.div}
        whileHover={{ y: -4 }}
        sx={{
          borderRadius: "20px",
          border: "2px dashed #F8BBD0",
          p: 2,
          textAlign: "center",
          minHeight: 200,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#fff",
          transition: "0.3s",
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            mb: 2,
            color: "#D82F7A",
          }}
        >
          {label}
        </Typography>

        {images[type] ? (
          <Box
            component='img'
            src={images[type].preview}
            alt={label}
            sx={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              borderRadius: "14px",
              mb: 2,
            }}
          />
        ) : (
          <CloudUploadIcon
            sx={{
              fontSize: 40,
              color: "#F8BBD0",
              mb: 2,
            }}
          />
        )}

        <Button
          component='label'
          variant='outlined'
          sx={{
            textTransform: "none",
            borderRadius: "30px",
            borderColor: "#D82F7A",
            color: "#D82F7A",
            fontWeight: 600,
          }}
        >
          {images[type] ? "Cambiar imagen" : "Subir imagen"}
          <input
            hidden
            type='file'
            accept='image/*'
            onChange={(e) => handleImageChange(e, type)}
          />
        </Button>
      </Box>
    </Grid>
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Box
        sx={style}
        component={motion.div}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography
            sx={{
              fontSize: "22px",
              fontWeight: 700,
              color: "#D82F7A",
            }}
          >
            Subir entregable 🌷 {module ? module.title : ""}
          </Typography>

          <IconButton onClick={onClose}>
            <CloseIcon sx={{ color: "#D82F7A" }} />
          </IconButton>
        </Box>

        <Typography sx={{ mt: 1, color: "#666" }}>
          Sube las tres fotografías requeridas para evaluar tu progreso.
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* Upload Sections */}
        <Grid container spacing={3}>
          {renderUploadBox("Foto de frente", "front")}
          {renderUploadBox("Foto de lado", "side")}
          {renderUploadBox("Foto de perfil", "profile")}
        </Grid>

        {/* Footer */}
        <Box
          mt={4}
          display='flex'
          justifyContent='flex-end'
          gap={2}
          flexWrap='wrap'
        >
          <Button
            onClick={onClose}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              color: "#999",
            }}
          >
            Cancelar
          </Button>

          <Button
            variant='contained'
            disabled={!isValid}
            onClick={handleSubmit}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "40px",
              px: 4,
              background: "linear-gradient(90deg, #D82F7A, #F06292)",
              boxShadow: "0 8px 25px rgba(216,47,122,0.35)",
              "&:disabled": {
                background: "#eee",
                color: "#aaa",
              },
            }}
          >
            Enviar entregable
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UploadDeliverableModal;
