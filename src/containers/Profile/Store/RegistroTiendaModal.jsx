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

  const [formData, setFormData] = useState(INITIAL_FORM);
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
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

  useEffect(() => {
    if (!open) {
      setFormData(INITIAL_FORM);
      setPreview(null);
      setOptions([]);
      setInputValue("");
    }
  }, [open]);

  // 🔍 Google Places
  const handleFetchSuggestions = (_, value) => {
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

  const handleSelectPlace = (_, selection) => {
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

  // 📸 Imagen
  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  // 🚀 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createStoreUser(formData); // 👈 enviamos objeto limpio
      handleClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    formData.name &&
    formData.description &&
    formData.phone &&
    formData.latitude &&
    formData.image;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth='xs'
      PaperProps={{ sx: { borderRadius: "20px", p: 1 } }}
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography fontWeight={800}>Nueva Distribuidora</Typography>
        <IconButton onClick={handleClose}>
          <CloseIcons width={25} />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Stack
          component='form'
          spacing={2}
          onSubmit={handleSubmit}
          sx={{ mt: 1 }}
        >
          <TextField
            label='Nombre'
            size='small'
            required
            sx={inputStyles}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <TextField
            label='Descripción'
            multiline
            rows={2}
            required
            sx={inputStyles}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <TextField
            label='WhatsApp'
            required
            placeholder='52...'
            sx={inputStyles}
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
                size='small'
                sx={inputStyles}
                helperText='Selecciona de la lista'
              />
            )}
          />

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
            {preview ? "Cambiar Imagen" : "Subir Imagen del Negocio"}
            <input
              hidden
              type='file'
              accept='image/*'
              onChange={handleChangeFile}
            />
          </Button>

          {preview && (
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
                src={preview}
                alt='preview'
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
          )}

          <Button
            type='submit'
            variant='contained'
            disabled={!isFormValid || loading}
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
