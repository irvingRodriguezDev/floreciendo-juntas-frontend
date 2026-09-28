import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import React from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
const FormRegistroTienda = ({
  setFormData,
  setActiveStep,
  formData,
  inputStyles,
  preview,
  PRIMARY_PINK,
  handleChangeFile,
  isStep0Valid,
  handleRemoveImage,
}) => {
  return (
    <Stack spacing={1.5}>
      <TextField
        label='Nombre de la tienda / distribuidora'
        size='small'
        required
        autoComplete='off'
        value={formData.name}
        sx={inputStyles}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <TextField
        label='Descripción del negocio'
        multiline
        rows={2}
        required
        autoComplete='off'
        value={formData.description}
        sx={inputStyles}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />
      <TextField
        label='Teléfono de WhatsApp'
        required
        size='small'
        autoComplete='off'
        placeholder='Ej. 5512345678'
        value={formData.phone}
        sx={inputStyles}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        helperText='Formato a 10 dígitos'
      />

      {!preview ? (
        <Button
          variant='outlined'
          component='label'
          autoComplete='off'
          startIcon={<AddPhotoAlternateIcon />}
          sx={{
            borderColor: PRIMARY_PINK,
            color: PRIMARY_PINK,
            borderRadius: "14px",
            py: 1.2,
            textTransform: "none",
            fontWeight: 700,
            "&:hover": {
              backgroundColor: "#FFF1F2",
              borderColor: PRIMARY_PINK,
            },
          }}
        >
          Subir Imagen del Negocio
          <input
            hidden
            type='file'
            accept='image/*'
            onChange={handleChangeFile}
          />
        </Button>
      ) : (
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: 130,
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid #E5E7EB",
          }}
        >
          <img
            src={preview}
            alt='vista previa'
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <Tooltip title='Eliminar imagen'>
            <IconButton
              size='small'
              onClick={handleRemoveImage}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                color: "#FFF",
                "&:hover": { backgroundColor: "#EF4444" },
              }}
            >
              <DeleteOutlinedIcon fontSize='small' />
            </IconButton>
          </Tooltip>
        </Box>
      )}

      <Button
        variant='contained'
        disabled={!isStep0Valid}
        onClick={() => setActiveStep(1)}
        sx={{
          mt: 1,
          backgroundColor: PRIMARY_PINK,
          borderRadius: "50px",
          py: 1.2,
          fontWeight: 800,
          textTransform: "none",
          "&:hover": { backgroundColor: "#CF2C75" },
        }}
      >
        Siguiente: Ubicación
      </Button>
    </Stack>
  );
};

export default FormRegistroTienda;
