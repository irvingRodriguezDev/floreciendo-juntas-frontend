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
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import CloseIcons from "../../../components/icons/CloseIcons";
import { useGoogleMaps } from "../../../context/GoogleMaps/GoogleMapsProvider";
import StoresContext from "../../../context/Stores/StoresContext";
import FormRegistroTienda from "./FormRegistroTienda";

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

// Coordenada central por defecto (ejemplo: CDMX)
const DEFAULT_CENTER = { lat: 19.4326077, lng: -99.133208 };

const steps = ["Información General", "Ubicación en Mapa"];

const RegistroTiendaDialog = ({ open, handleClose }) => {
  const { createStoreUser } = useContext(StoresContext);
  const { isLoaded } = useGoogleMaps();

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const autocompleteService = useRef(null);
  const geocoder = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (isLoaded && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
      geocoder.current = new window.google.maps.Geocoder();
    }
  }, [isLoaded]);
  // Inicialización o re-renderizado del mapa en el Paso 1 (Ubicación)
  useEffect(() => {
    if (
      activeStep === 1 &&
      isLoaded &&
      mapContainerRef.current &&
      !mapRef.current
    ) {
      const center =
        formData.latitude && formData.longitude
          ? { lat: formData.latitude, lng: formData.longitude }
          : DEFAULT_CENTER;

      const map = new window.google.maps.Map(mapContainerRef.current, {
        center,
        zoom: formData.latitude ? 16 : 12,
        disableDefaultUI: false,
        zoomControl: true,
        styles: [
          {
            // Oculta negocios y comercios para no saturar
            featureType: "poi.business",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
          {
            // Mantiene visibles parques, escuelas y puntos gubernamentales/relevantes
            featureType: "poi.park",
            elementType: "labels",
            stylers: [{ visibility: "simplified" }],
          },
        ],
      });

      const marker = new window.google.maps.Marker({
        position: center,
        map,
        draggable: true,
        animation: window.google.maps.Animation.DROP,
      });

      // 📍 Evento al soltar el marcador arrastrado
      marker.addListener("dragend", (e) => {
        const newLat = e.latLng.lat();
        const newLng = e.latLng.lng();

        // 1. Guardar Latitud y Longitud inmediatamente
        setFormData((prev) => ({
          ...prev,
          latitude: newLat,
          longitude: newLng,
        }));

        // 2. Geocodificación Inversa: Obtener la dirección legible a partir del Pin
        if (geocoder.current) {
          geocoder.current.geocode(
            { location: { lat: newLat, lng: newLng } },
            (results, status) => {
              if (status === "OK" && results[0]) {
                const formattedAddress = results[0].formatted_address;

                setFormData((prev) => ({
                  ...prev,
                  address: formattedAddress,
                }));

                // Actualizar la etiqueta del Autocomplete para reflejar la dirección del pin
                setInputValue(formattedAddress);
              }
            },
          );
        }
      });

      mapRef.current = map;
      markerRef.current = marker;
    }
  }, [activeStep, isLoaded]);

  // Limpiar estados al cerrar el Modal
  useEffect(() => {
    if (!open) {
      setActiveStep(0);
      setFormData(INITIAL_FORM);
      setPreview(null);
      setOptions([]);
      setInputValue("");
      setSelectedPlace(null);
      mapRef.current = null;
      markerRef.current = null;
    }
  }, [open]);

  // Autocomplete Suggestions
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
    if (!selection || !geocoder.current) return;

    geocoder.current.geocode(
      { placeId: selection.place_id },
      (results, status) => {
        if (status === "OK" && results[0]) {
          const { lat, lng } = results[0].geometry.location;
          const newLat = lat();
          const newLng = lng();

          setFormData((prev) => ({
            ...prev,
            address: results[0].formatted_address,
            latitude: newLat,
            longitude: newLng,
          }));

          // Reposicionar el mapa y el marcador
          if (mapRef.current && markerRef.current) {
            const newPos = { lat: newLat, lng: newLng };
            mapRef.current.setCenter(newPos);
            mapRef.current.setZoom(16);
            markerRef.current.setPosition(newPos);
          }
        }
      },
    );
  };

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

  const handleSubmit = async () => {
    setLoading(true);
    try {
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

  const isStep0Valid =
    formData.name.trim() &&
    formData.description.trim() &&
    formData.phone.trim() &&
    formData.image;

  const isStep1Valid = formData.latitude && formData.longitude;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth='md'
      PaperProps={{
        sx: {
          borderRadius: "24px",
          p: 1.5,
          boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
        },
      }}
    >
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
        {/* STEPPER DE NAVEGACIÓN */}
        <Stepper activeStep={activeStep} sx={{ mb: 3, pt: 1 }}>
          {steps.map((label) => (
            <Step
              key={label}
              sx={{
                "& .MuiStepIcon-root.Mui-active": { color: PRIMARY_PINK },
                "& .MuiStepIcon-root.Mui-completed": { color: PRIMARY_PINK },
              }}
            >
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* PASO 0: DATOS GENERALES */}
        {activeStep === 0 && (
          <FormRegistroTienda
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            formData={formData}
            setFormData={setFormData}
            handleRemoveImage={handleRemoveImage}
            inputStyles={inputStyles}
            preview={preview}
            PRIMARY_PINK={PRIMARY_PINK}
            handleChangeFile={handleChangeFile}
            isStep0Valid={isStep0Valid}
          />
        )}

        {/* PASO 1: UBICACIÓN Y MAPA CON PIN */}
        {activeStep === 1 && (
          <Stack spacing={1.5}>
            <MUIAutocomplete
              options={options}
              value={selectedPlace}
              inputValue={inputValue}
              getOptionLabel={(o) =>
                typeof o === "string" ? o : o.description || ""
              }
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
                  label='Buscar dirección para centrar el mapa'
                  size='small'
                  sx={inputStyles}
                />
              )}
            />

            <Typography
              variant='caption'
              sx={{ color: "#6B7280", fontWeight: 500 }}
            >
              💡 Arrastra el pin rosa/rojo en el mapa para ajustar la posición
              exacta.
            </Typography>

            {/* CONTENEDOR DEL MAPA */}
            <Box
              ref={mapContainerRef}
              sx={{
                width: "100%",
                height: 460,
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid #E5E7EB",
              }}
            />

            {/* DETALLES CAPTURADOS EN FORMDATA */}
            {formData.latitude && (
              <Stack spacing={0.5}>
                <Typography
                  variant='caption'
                  sx={{ color: "#059669", fontWeight: 700 }}
                >
                  ✓ Coordenadas: {formData.latitude.toFixed(5)},{" "}
                  {formData.longitude.toFixed(5)}
                </Typography>
                {formData.address && (
                  <Typography
                    variant='caption'
                    sx={{ color: "#374151", fontWeight: 600 }}
                  >
                    📍 Dirección detectada: {formData.address}
                  </Typography>
                )}
              </Stack>
            )}

            {/* BOTONES DE NAVEGACIÓN */}
            <Stack direction='row' spacing={2} sx={{ mt: 1 }}>
              <Button
                variant='outlined'
                onClick={() => setActiveStep(0)}
                sx={{
                  flex: 1,
                  borderRadius: "50px",
                  color: "#6B7280",
                  borderColor: "#D1D5DB",
                }}
              >
                Atrás
              </Button>
              <Button
                variant='contained'
                disabled={!isStep1Valid || loading}
                onClick={handleSubmit}
                sx={{
                  flex: 2,
                  backgroundColor: PRIMARY_PINK,
                  borderRadius: "50px",
                  py: 1.2,
                  fontWeight: 800,
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#CF2C75" },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color='inherit' />
                ) : (
                  "Registrar distribuidora"
                )}
              </Button>
            </Stack>
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RegistroTiendaDialog;
