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
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcons from "../../../components/icons/CloseIcons";
import { useGoogleMaps } from "../../../context/GoogleMaps/GoogleMapsProvider";
import StoresContext from "../../../context/Stores/StoresContext";
const inputStyles = {
  mb: 2,
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    "& fieldset": { borderColor: "rgba(216,46,136,0.3)" },
    "&:hover fieldset": { borderColor: "#D82E7A" },
    "&.Mui-focused fieldset": { borderColor: "#D82E7A" },
  },
  "& .MuiInputBase-input": { color: "black" },
  "& .MuiInputLabel-root": { color: "#D82E7A" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#D82E7A" },
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

  // --- ESTADOS ---
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [options, setOptions] = useState([]); // Sugerencias de Google
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  // --- REFS ---
  const autocompleteService = useRef(null);
  const geocoder = useRef(null);

  // Inicializar Google Maps Services
  useEffect(() => {
    if (isLoaded && window.google) {
      if (!autocompleteService.current)
        autocompleteService.current =
          new window.google.maps.places.AutocompleteService();
      if (!geocoder.current)
        geocoder.current = new window.google.maps.Geocoder();
    }
  }, [isLoaded]);

  // Limpiar formulario al cerrar
  useEffect(() => {
    if (!open) {
      setFormData(INITIAL_FORM);
      setFile(null);
      setOptions([]);
      setInputValue("");
    }
  }, [open]);

  // --- HANDLERS GOOGLE MAPS ---
  const handleFetchSuggestions = (event, value) => {
    setInputValue(value);
    if (value.length < 4 || !autocompleteService.current) {
      setOptions([]);
      return;
    }

    autocompleteService.current.getPlacePredictions(
      {
        input: value,
        componentRestrictions: { country: "mx" },
        types: ["address"],
      },
      (predictions) => setOptions(predictions || []),
    );
  };

  const handleSelectPlace = (event, selection) => {
    if (!selection || !geocoder.current) return;

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
  const handleChangeFile = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // --- SUBMIT ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("address", formData.address);
      data.append("latitude", formData.latitude);
      data.append("longitude", formData.longitude);
      data.append("phone", formData.phone);
      data.append("image", formData.image); // ← File binario real

      await createStoreUser(data);
      handleClose();
    } catch (error) {
      console.error("Error al crear la tienda:", error);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = formData.latitude && formData.name && file && !loading;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth='xs'
      PaperProps={{ sx: { borderRadius: "20px", p: 1 } }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant='subtitle' fontWeight={800}>
          Nueva Distribuidora
        </Typography>
        <IconButton onClick={handleClose}>
          <CloseIcons width={25} />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Stack
          spacing={2}
          component='form'
          onSubmit={handleSubmit}
          sx={{ mt: 1 }}
        >
          <TextField
            label='Nombre'
            fullWidth
            required
            size='small'
            sx={inputStyles}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            label='Descripción'
            multiline
            rows={2}
            fullWidth
            required
            sx={inputStyles}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <TextField
            label='WhatsApp'
            fullWidth
            required
            sx={inputStyles}
            placeholder='52...'
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />

          <MUIAutocomplete
            options={options}
            getOptionLabel={(o) => o.description || ""}
            onInputChange={handleFetchSuggestions}
            onChange={handleSelectPlace}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Dirección Física'
                required
                sx={inputStyles}
                size='small'
                helperText='Selecciona de la lista'
              />
            )}
          />

          {/* Subida de Imagen al Final */}
          <Button
            variant='outlined'
            component='label'
            startIcon={<AddPhotoAlternateIcon />}
            sx={{
              borderColor: "#D82E7A",
              color: "#D82E7A",
              borderRadius: "12px",
            }}
          >
            {file ? "Cambiar Imagen" : "Subir Imagen del Negocio"}
            <input
              type='file'
              hidden
              accept='image/*'
              onChange={handleChangeFile}
            />
          </Button>

          {file !== null && (
            <Box
              sx={{
                width: "100%",
                height: 120,
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid #ddd",
              }}
            >
              <img
                src={file}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                alt='Preview'
              />
            </Box>
          )}

          <Button
            type='submit'
            variant='contained'
            disabled={!isFormValid}
            sx={{
              bgcolor: "#FF4081",
              borderRadius: "12px",
              py: 1.5,
              fontWeight: 700,
            }}
          >
            {loading ? (
              <CircularProgress size={24} color='inherit' />
            ) : (
              "Registrar ahora"
            )}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default RegistroTiendaDialog;
