import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Stack,
  CircularProgress,
  Autocomplete as MUIAutocomplete,
  Tooltip,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import CloseIcons from "../../../components/icons/CloseIcons";
import { useGoogleMaps } from "../../../context/GoogleMaps/GoogleMapsProvider";
import StoresContext from "../../../context/Stores/StoresContext";

const PRIMARY_PINK = "#E53888";

const inputStyles = {
  mb: 1.5,
  "& .MuiOutlinedInput-root": {
    borderRadius: "14px",
    backgroundColor: "#FAFAFA",
    "& fieldset": { borderColor: "#E5E7EB" },
    "&:hover fieldset": { borderColor: PRIMARY_PINK },
    "&.Mui-focused fieldset": { borderColor: PRIMARY_PINK },
  },
  "& .MuiInputLabel-root": { color: "#6B7280", fontSize: "0.9rem" },
  "& .MuiInputLabel-root.Mui-focused": { color: PRIMARY_PINK, fontWeight: 700 },
};

const INITIAL_FORM = {
  name: "",
  description: "",
  address: "",
  latitude: null,
  longitude: null,
  phone: "",
  image: null,
};

const RegistroTiendaDialog = ({ open, handleClose }) => {
  const { createStoreUser } = useContext(StoresContext);
  const { isLoaded } = useGoogleMaps();

  const [formData, setFormData] = useState(INITIAL_FORM);
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const autocompleteService = useRef(null);
  const geocoder = useRef(null);

  useEffect(() => {
    if (isLoaded && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
      geocoder.current = new window.google.maps.Geocoder();
    }
  }, [isLoaded]);

  // Limpiar estados al cerrar el Modal
  useEffect(() => {
    if (!open) {
      setFormData(INITIAL_FORM);
      setPreview(null);
      setOptions([]);
      setInputValue("");
      setSelectedPlace(null);
    }
  }, [open]);

  // 🔍 Google Places Autocomplete
  const handleFetchSuggestions = (_, value) => {
    setInputValue(value);

    if (!value || value.length < 3 || !autocompleteService.current) {
      setOptions([]);
      return;
    }

    autocompleteService.current.getPlacePredictions(
      {
        input: value,
        componentRestrictions: { country: "mx" },
        types: ["establishment", "geocode"],
      },
      (predictions) => setOptions(predictions || []),
    );
  };

  const handleSelectPlace = (_, selection) => {
    setSelectedPlace(selection);
    if (!selection || !geocoder.current) {
      setFormData((prev) => ({
        ...prev,
        address: "",
        latitude: null,
        longitude: null,
      }));
      return;
    }

    geocoder.current.geocode(
      { placeId: selection.place_id },
      (results, status) => {
        if (status === "OK" && results[0]) {
          const { lat, lng } = results[0].geometry.location;

          setFormData((prev) => ({
            ...prev,
            address: results[0].formatted_address,
            latitude: lat(),
            longitude: lng(),
          }));
        }
      },
    );
  };

  // 📸 Carga de Imagen
  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleRemoveImage = () => {
    setPreview(null);
    setFormData((prev) => ({ ...prev, image: null }));
  };

  // 🚀 Formatear Teléfono y Enviar
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Limpiamos teléfono de caracteres no numéricos
      const cleanedData = {
        ...formData,
        phone: formData.phone.replace(/\D/g, ""),
      };

      await createStoreUser(cleanedData);
      handleClose();
    } catch (error) {
      console.error("Error al registrar tienda:", error);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    formData.name.trim() &&
    formData.description.trim() &&
    formData.phone.trim() &&
    formData.latitude &&
    formData.image;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth='xs'
      PaperProps={{
        sx: {
          borderRadius: "24px",
          p: 1,
          boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
        },
      }}
    >
      {/* TÍTULO */}
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              p: 1,
              borderRadius: "50%",
              backgroundColor: "#FFF1F2",
              color: PRIMARY_PINK,
              display: "flex",
            }}
          >
            <StorefrontOutlinedIcon sx={{ fontSize: 22 }} />
          </Box>
          <Typography
            variant='h6'
            sx={{ fontWeight: 800, color: "#1F2937", fontSize: "1.15rem" }}
          >
            Nueva Distribuidora
          </Typography>
        </Box>

        <IconButton
          onClick={handleClose}
          size='small'
          sx={{ color: "#9CA3AF", "&:hover": { color: PRIMARY_PINK } }}
        >
          <CloseIcons width={22} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        <Stack
          component='form'
          spacing={1.5}
          onSubmit={handleSubmit}
          sx={{ mt: 2 }}
        >
          {/* NOMBRE */}
          <TextField
            label='Nombre de la tienda / distribuidora'
            size='small'
            required
            value={formData.name}
            sx={inputStyles}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          {/* DESCRIPCIÓN */}
          <TextField
            label='Descripción del negocio'
            multiline
            rows={2}
            required
            value={formData.description}
            sx={inputStyles}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          {/* WHATSAPP */}
          <TextField
            label='Teléfono de WhatsApp'
            required
            size='small'
            placeholder='Ej. 521234567890'
            value={formData.phone}
            sx={inputStyles}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            helperText='Formato a 10 dígitos (ej. 5512345678)'
          />

          {/* AUTOCOMPLETE GOOGLE PLACES */}
          <MUIAutocomplete
            options={options}
            value={selectedPlace}
            getOptionLabel={(o) => o.description || ""}
            onInputChange={handleFetchSuggestions}
            onChange={handleSelectPlace}
            noOptionsText={
              inputValue.length < 3
                ? "Escribe al menos 3 caracteres..."
                : "No se encontraron ubicaciones"
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label='Dirección física'
                required
                size='small'
                sx={inputStyles}
                helperText={
                  formData.latitude
                    ? "✓ Ubicación geo-localizada"
                    : "Selecciona una opción de la lista"
                }
                FormHelperTextProps={{
                  sx: { color: formData.latitude ? "#059669" : "#6B7280" },
                }}
              />
            )}
          />

          {/* SUBIR IMAGEN */}
          {!preview ? (
            <Button
              variant='outlined'
              component='label'
              startIcon={<AddPhotoAlternateIcon />}
              sx={{
                borderColor: PRIMARY_PINK,
                color: PRIMARY_PINK,
                borderRadius: "14px",
                py: 1.2,
                textTransform: "none",
                fontWeight: 700,
                fontSize: "0.88rem",
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
                height: 140,
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
                    color: "#FFFFFF",
                    "&:hover": { backgroundColor: "#EF4444" },
                  }}
                >
                  <DeleteOutlineIcon fontSize='small' />
                </IconButton>
              </Tooltip>
            </Box>
          )}

          {/* BOTÓN REGISTRAR */}
          <Button
            type='submit'
            variant='contained'
            disabled={!isFormValid || loading}
            sx={{
              mt: 1,
              backgroundColor: PRIMARY_PINK,
              borderRadius: "50px",
              py: 1.2,
              fontWeight: 800,
              fontSize: "0.95rem",
              textTransform: "none",
              boxShadow: "0 4px 14px rgba(229, 56, 136, 0.25)",
              "&:hover": {
                backgroundColor: "#CF2C75",
                boxShadow: "0 6px 18px rgba(229, 56, 136, 0.35)",
              },
              "&.Mui-disabled": {
                backgroundColor: "#F3F4F6",
                color: "#9CA3AF",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} color='inherit' />
            ) : (
              "Registrar distribuidora"
            )}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default RegistroTiendaDialog;
