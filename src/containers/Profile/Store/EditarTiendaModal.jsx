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

const EditarTiendaDialog = ({ open, handleClose, store }) => {
  const { updateStoreUser } = useContext(StoresContext);
  const { isLoaded } = useGoogleMaps();

  // --- ESTADOS ---
  const [formData, setFormData] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewFile, setPreviewFile] = useState(null); // solo para preview visual
  const [newImage, setNewImage] = useState(null); // File binario nuevo
  const [addressInput, setAddressInput] = useState("");
  // --- REFS ---
  const autocompleteService = useRef(null);
  const geocoder = useRef(null);

  // Inicializar Google Maps
  useEffect(() => {
    if (isLoaded && window.google) {
      if (!autocompleteService.current)
        autocompleteService.current =
          new window.google.maps.places.AutocompleteService();
      if (!geocoder.current)
        geocoder.current = new window.google.maps.Geocoder();
    }
  }, [isLoaded]);

  // Pre-llenar formulario cuando llega la tienda
  useEffect(() => {
    if (open && store) {
      const initial = {
        name: store.name || "",
        description: store.description || "",
        address: store.address || "",
        latitude: store.latitude || null,
        longitude: store.longitude || null,
        phone: store.phone || "",
      };
      setAddressInput(store.address || "");
      setFormData(initial);
      setOriginalData(initial);
      setPreviewFile(store.image_url || null); // URL existente para preview
      setNewImage(null);
    }
  }, [store?.id]);

  // --- GOOGLE MAPS HANDLERS ---
  const handleFetchSuggestions = (event, value) => {
    if (value.length < 4 || !autocompleteService.current) {
      // ✅ Solo limpiar si realmente hay opciones que limpiar
      if (options.length > 0) setOptions([]);
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
    const file = e.target.files[0];
    if (!file) return;
    setPreviewFile(URL.createObjectURL(file));
    setNewImage(file);
  };

  // --- PATCH: solo campos modificados ---
  const buildPatchPayload = () => {
    const patch = new FormData();
    let hasChanges = false;

    // Comparar campos de texto
    const textFields = [
      "name",
      "description",
      "address",
      "latitude",
      "longitude",
      "phone",
    ];
    textFields.forEach((key) => {
      if (formData[key] !== originalData[key]) {
        patch.append(key, formData[key]);
        hasChanges = true;
      }
    });

    // Imagen solo si se cambió
    if (newImage) {
      patch.append("image", newImage);
      hasChanges = true;
    }

    return hasChanges ? patch : null;
  };

  // --- SUBMIT ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    const patch = buildPatchPayload();

    if (!patch) {
      handleClose(); // Sin cambios, cerrar sin llamada
      return;
    }

    setLoading(true);
    try {
      await updateStoreUser(store.id, patch);
      handleClose();
    } catch (error) {
      console.error("Error al actualizar la tienda:", error);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = formData.name && formData.latitude && !loading;

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
          Editar Distribuidora
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
            value={formData.name || ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            label='Descripción'
            multiline
            rows={2}
            fullWidth
            required
            sx={inputStyles}
            value={formData.description || ""}
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
            value={formData.phone || ""}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />

          <MUIAutocomplete
            options={options}
            getOptionLabel={(o) => o.description || ""}
            onInputChange={(event, value) => {
              setAddressInput(value); // controla el input visual
              handleFetchSuggestions(event, value); // busca sugerencias
            }}
            onChange={(event, selection) => {
              handleSelectPlace(event, selection);
            }}
            // Muestra la dirección actual como valor inicial
            inputValue={formData.address || ""}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Dirección Física'
                sx={inputStyles}
                size='small'
                helperText={
                  formData.address
                    ? "Dirección actual — cambia si necesitas"
                    : "Selecciona de la lista"
                }
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
            {newImage ? "Cambiar Imagen" : "Actualizar Imagen"}
            <input
              type='file'
              hidden
              accept='image/*'
              onChange={handleChangeFile}
            />
          </Button>

          {previewFile && (
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
                src={previewFile}
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
              "Guardar cambios"
            )}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default EditarTiendaDialog;
